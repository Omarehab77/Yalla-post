# stage1.py - Egyptian Voice Recording & Learning System
import os
import numpy as np
import librosa
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import pygame
import pyaudio
import wave
import time
import warnings
warnings.filterwarnings('ignore')

class VoiceRecorder:
    """Records voice samples for each letter"""
    def __init__(self):
        self.chunk = 1024
        self.format = pyaudio.paInt16
        self.channels = 1
        self.rate = 22050
        pygame.mixer.init()
    
    def record_letter(self, letter, sample_number=1, duration=2):
        """Record a voice sample for a specific letter"""
        # Create directory for the letter
        letter_dir = f'egyptian_voices/{letter}'
        os.makedirs(letter_dir, exist_ok=True)
        
        filename = f'{letter}_voice{sample_number}.wav'
        filepath = os.path.join(letter_dir, filename)
        
        print(f"\n🎤 Recording '{letter}' - Sample {sample_number}")
        print("   Speak the letter clearly when ready...")
        input("   Press Enter to start recording...")
        
        # Record audio
        p = pyaudio.PyAudio()
        stream = p.open(format=self.format,
                       channels=self.channels,
                       rate=self.rate,
                       input=True,
                       frames_per_buffer=self.chunk)
        
        print("   🔴 Recording...")
        frames = []
        for i in range(0, int(self.rate / self.chunk * duration)):
            data = stream.read(self.chunk)
            frames.append(data)
        
        print("   ✅ Recording complete!")
        
        stream.stop_stream()
        stream.close()
        p.terminate()
        
        # Save as WAV file
        wf = wave.open(filepath, 'wb')
        wf.setnchannels(self.channels)
        wf.setsampwidth(p.get_sample_size(self.format))
        wf.setframerate(self.rate)
        wf.writeframes(b''.join(frames))
        wf.close()
        
        print(f"   💾 Saved: {filename}")
        return filepath
    
    def play_recording(self, filepath):
        """Play a recorded voice sample"""
        try:
            pygame.mixer.music.load(filepath)
            pygame.mixer.music.play()
            
            while pygame.mixer.music.get_busy():
                time.sleep(0.1)
            return True
        except Exception as e:
            print(f"   ❌ Error playing: {e}")
            return False

class EgyptianVoiceAnalyzer:
    """Analyzes and extracts voice tone characteristics"""
    def __init__(self):
        self.voice_profiles = {}
        self.target_sr = 22050
    
    def analyze_voice_tone(self, audio_path):
        """Extract detailed voice tone characteristics"""
        try:
            y, sr = librosa.load(audio_path, sr=self.target_sr)
            
            if len(y) == 0:
                return None
            
            voice_profile = {}
            
            # 1. Fundamental frequency (pitch) analysis
            f0, voiced_flag, voiced_probs = librosa.pyin(
                y, 
                fmin=80, 
                fmax=400,
                sr=sr,
                frame_length=2048
            )
            f0_clean = f0[~np.isnan(f0)]
            
            if len(f0_clean) > 0:
                voice_profile['pitch_mean'] = np.mean(f0_clean)
                voice_profile['pitch_std'] = np.std(f0_clean)
                voice_profile['pitch_min'] = np.min(f0_clean)
                voice_profile['pitch_max'] = np.max(f0_clean)
            
            # 2. Spectral characteristics (voice color)
            spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
            voice_profile['brightness'] = np.mean(spectral_centroid)
            
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
            voice_profile['spectral_rolloff'] = np.mean(spectral_rolloff)
            
            # 3. MFCCs (vocal tract characteristics)
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13, n_fft=2048, hop_length=512)
            voice_profile['mfccs'] = np.mean(mfccs, axis=1)  # Average over time
            
            # 4. Energy and loudness
            rms = librosa.feature.rms(y=y)
            voice_profile['energy'] = np.mean(rms)
            
            # 5. Harmonic characteristics
            harmonic = librosa.effects.harmonic(y)
            percussive = librosa.effects.percussive(y)
            voice_profile['harmonic_ratio'] = np.std(harmonic) / (np.std(harmonic) + np.std(percussive))
            
            # 6. Formant-like features (simplified)
            spectral_contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
            voice_profile['spectral_contrast'] = np.mean(spectral_contrast, axis=1)
            
            # 7. Voice quality features
            zcr = librosa.feature.zero_crossing_rate(y)
            voice_profile['zcr_mean'] = np.mean(zcr)
            
            print(f"   ✅ Analyzed voice tone: {os.path.basename(audio_path)}")
            return voice_profile
            
        except Exception as e:
            print(f"   ❌ Error analyzing voice: {e}")
            return None
    
    def build_voice_profiles(self):
        """Build voice profiles from all recorded samples"""
        print("\n🎵 Analyzing Voice Tones...")
        
        if not os.path.exists('egyptian_voices'):
            return False
        
        for letter in os.listdir('egyptian_voices'):
            letter_dir = os.path.join('egyptian_voices', letter)
            if os.path.isdir(letter_dir):
                self.voice_profiles[letter] = []
                
                for file in os.listdir(letter_dir):
                    if file.endswith('.wav'):
                        audio_path = os.path.join(letter_dir, file)
                        voice_profile = self.analyze_voice_tone(audio_path)
                        if voice_profile:
                            voice_profile['audio_path'] = audio_path
                            self.voice_profiles[letter].append(voice_profile)
                
                if self.voice_profiles[letter]:
                    print(f"   {letter}: {len(self.voice_profiles[letter])} voice profiles")
        
        return len(self.voice_profiles) > 0
    
    def get_letter_voice_features(self, letter):
        """Get training features for a specific letter"""
        if letter not in self.voice_profiles:
            return None
        
        # Use the first voice profile for training
        profile = self.voice_profiles[letter][0]
        
        # Extract features for training
        features = []
        
        # Pitch features
        features.extend([
            profile.get('pitch_mean', 0),
            profile.get('pitch_std', 0),
            profile.get('pitch_min', 0),
            profile.get('pitch_max', 0)
        ])
        
        # Spectral features
        features.extend([
            profile.get('brightness', 0),
            profile.get('spectral_rolloff', 0),
            profile.get('energy', 0),
            profile.get('harmonic_ratio', 0),
            profile.get('zcr_mean', 0)
        ])
        
        # MFCC features (first 8 coefficients)
        mfccs = profile.get('mfccs', np.zeros(13))
        features.extend(mfccs[:8])
        
        # Spectral contrast (first 4 bands)
        spectral_contrast = profile.get('spectral_contrast', np.zeros(7))
        features.extend(spectral_contrast[:4])
        
        return np.array(features)

class VoiceDataset(Dataset):
    """Dataset for training letter recognition"""
    def __init__(self, voice_analyzer):
        self.voice_analyzer = voice_analyzer
        self.samples = []
        self.phoneme_map = {}
        self.feature_size = 21  # Total features extracted
        self.prepare_dataset()
    
    def prepare_dataset(self):
        """Prepare training data from voice profiles"""
        print("\n📊 Preparing Training Data...")
        
        # Create letter mapping
        letters = list(self.voice_analyzer.voice_profiles.keys())
        self.phoneme_map = {letter: idx for idx, letter in enumerate(letters)}
        
        # Create training samples
        for letter in letters:
            features = self.voice_analyzer.get_letter_voice_features(letter)
            if features is not None:
                self.samples.append({
                    'features': features,
                    'letter': letter,
                    'letter_id': self.phoneme_map[letter]
                })
        
        print(f"   Created {len(self.samples)} training samples")
        print(f"   Letters: {list(self.phoneme_map.keys())}")
        print(f"   Feature size: {self.feature_size}")
    
    def __len__(self):
        return len(self.samples)
    
    def __getitem__(self, idx):
        sample = self.samples[idx]
        return {
            'features': torch.FloatTensor(sample['features']),
            'letter': sample['letter'],
            'letter_id': torch.tensor(sample['letter_id'], dtype=torch.long)
        }

class LetterRecognitionModel(nn.Module):
    """Neural network for Egyptian letter recognition"""
    def __init__(self, input_size, num_letters):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, num_letters)
        )
    
    def forward(self, x):
        return self.network(x)

class EgyptianVoiceTrainer:
    """Main trainer class"""
    def __init__(self):
        self.recorder = VoiceRecorder()
        self.analyzer = EgyptianVoiceAnalyzer()
        self.model = None
        self.phoneme_map = {}
    
    def record_training_data(self):
        """Record voice samples for training"""
        print("\n" + "="*50)
        print("🎤 Recording Egyptian Voice Samples")
        print("="*50)
        
        while True:
            print("\n📝 Record New Letter:")
            print("1. Record letter 'أ' (Alif)")
            print("2. Record letter 'ب' (Ba)")
            print("3. Record letter 'ت' (Ta)") 
            print("4. Record custom letter")
            print("5. Finish recording")
            
            choice = input("\nChoose option (1-5): ").strip()
            
            if choice == '1':
                self.record_letter_samples('أ')
            elif choice == '2':
                self.record_letter_samples('ب')
            elif choice == '3':
                self.record_letter_samples('ت')
            elif choice == '4':
                letter = input("Enter Arabic letter: ").strip()
                if letter:
                    self.record_letter_samples(letter)
                else:
                    print("❌ Please enter a valid letter")
            elif choice == '5':
                break
            else:
                print("❌ Invalid choice")
    
    def record_letter_samples(self, letter):
        """Record 2 samples for a letter"""
        print(f"\n📝 Recording 2 samples for '{letter}'")
        
        # Record first sample
        file1 = self.recorder.record_letter(letter, 1)
        print("   Playing back sample 1...")
        self.recorder.play_recording(file1)
        
        # Record second sample  
        file2 = self.recorder.record_letter(letter, 2)
        print("   Playing back sample 2...")
        self.recorder.play_recording(file2)
        
        print(f"✅ Completed recording for '{letter}'")
    
    def train_model(self):
        """Train the recognition model"""
        print("\n" + "="*50)
        print("🧠 Training Egyptian Letter Recognition")
        print("="*50)
        
        # Analyze voice tones
        if not self.analyzer.build_voice_profiles():
            print("❌ No voice samples found! Please record some first.")
            return False
        
        # Prepare dataset
        dataset = VoiceDataset(self.analyzer)
        
        if len(dataset) == 0:
            print("❌ No training data available")
            return False
        
        self.phoneme_map = dataset.phoneme_map
        
        # Create and train model
        self.model = LetterRecognitionModel(
            input_size=dataset.feature_size,
            num_letters=len(self.phoneme_map)
        )
        
        optimizer = optim.Adam(self.model.parameters(), lr=0.001)
        criterion = nn.CrossEntropyLoss()
        
        # Training
        self.model.train()
        print(f"\n🤖 Training on {len(dataset.samples)} voice samples...")
        
        for epoch in range(25):
            total_loss = 0
            correct = 0
            total = 0
            
            for i in range(len(dataset)):
                sample = dataset[i]
                features = sample['features'].unsqueeze(0)
                target = sample['letter_id'].unsqueeze(0)
                
                optimizer.zero_grad()
                output = self.model(features)
                loss = criterion(output, target)
                loss.backward()
                optimizer.step()
                
                total_loss += loss.item()
                _, predicted = output.max(1)
                total += target.size(0)
                correct += predicted.eq(target).sum().item()
            
            accuracy = 100. * correct / total
            if (epoch + 1) % 5 == 0:
                print(f"   Epoch {epoch+1}/25 - Loss: {total_loss/len(dataset):.4f} - Acc: {accuracy:.1f}%")
        
        print("✅ Training completed!")
        return True
    
    def demonstrate_learning(self):
        """Demonstrate what the model learned"""
        if not self.model:
            print("❌ Model not trained yet!")
            return
        
        print("\n" + "="*50)
        print("🎯 Demonstration - Model Recognition")
        print("="*50)
        
        print("The model has learned to recognize these letters from voice tones:")
        
        for letter in self.phoneme_map.keys():
            features = self.analyzer.get_letter_voice_features(letter)
            if features is not None:
                self.model.eval()
                with torch.no_grad():
                    features_tensor = torch.FloatTensor(features).unsqueeze(0)
                    output = self.model(features_tensor)
                    _, predicted = output.max(1)
                    confidence = torch.softmax(output, dim=1)[0][predicted].item()
                
                print(f"   '{letter}': {confidence:.1%} confidence")
                
                # Play a sample
                if self.analyzer.voice_profiles[letter]:
                    sample_path = self.analyzer.voice_profiles[letter][0]['audio_path']
                    print(f"      Playing sample...")
                    self.recorder.play_recording(sample_path)
                    time.sleep(1)

def main():
    print("="*60)
    print("🎵 Egyptian Arabic Voice Learning System")
    print("="*60)
    
    trainer = EgyptianVoiceTrainer()
    
    while True:
        print("\n🏠 Main Menu:")
        print("1. Record Voice Samples (2 samples per letter)")
        print("2. Train Model (Learn from recordings)") 
        print("3. Demonstrate Learning (Show recognition)")
        print("4. Exit")
        
        choice = input("\nEnter choice (1-4): ").strip()
        
        if choice == '1':
            trainer.record_training_data()
            
        elif choice == '2':
            if trainer.train_model():
                print("✅ Model trained successfully!")
                
        elif choice == '3':
            trainer.demonstrate_learning()
            
        elif choice == '4':
            print("👋 مع السلامة! (Goodbye!)")
            break
            
        else:
            print("❌ Invalid choice")

if __name__ == "__main__":
    # Create main directory
    os.makedirs('egyptian_voices', exist_ok=True)
    main()