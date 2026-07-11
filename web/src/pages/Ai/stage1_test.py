# stage1_test.py - Test the trained phoneme model
import os
import numpy as np
import librosa
import soundfile as sf
import torch
import torch.nn as nn
from torch.utils.data import Dataset
import warnings
warnings.filterwarnings('ignore')

class SimplePhonemeModel(nn.Module):
    def __init__(self, input_size=162, hidden_size=128, num_letters=1):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, num_letters)
        )
    
    def forward(self, x):
        return self.network(x)

class PhonemeTester:
    def __init__(self, model_path='best_phoneme_model.pth'):
        self.model_path = model_path
        self.model = None
        self.feature_size = 162
        self.phoneme_map = {'أ': 0}
        self.load_model()
    
    def load_model(self):
        """Load the trained model"""
        if not os.path.exists(self.model_path):
            print(f"❌ Model file '{self.model_path}' not found!")
            return False
            
        try:
            checkpoint = torch.load(self.model_path, map_location='cpu')
            self.model = SimplePhonemeModel(
                input_size=checkpoint['feature_size'],
                hidden_size=128,
                num_letters=len(checkpoint['phoneme_map'])
            )
            self.model.load_state_dict(checkpoint['model_state_dict'])
            self.model.eval()
            print("✅ Model loaded successfully!")
            return True
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            return False
    
    def extract_features(self, audio_path):
        """Extract features from audio file (same as training)"""
        try:
            y, sr = librosa.load(audio_path, sr=22050)
            if len(y) == 0:
                return np.zeros(self.feature_size)
            
            # Remove silence
            try:
                intervals = librosa.effects.split(y, top_db=25)
                if len(intervals) > 0:
                    y = np.concatenate([y[start:end] for start, end in intervals])
            except:
                pass
            
            if len(y) == 0:
                return np.zeros(self.feature_size)
            
            # Pad/trim audio
            if len(y) > 4000:
                y = y[:4000]
            else:
                y = np.pad(y, (0, max(0, 4000 - len(y))), mode='constant')
            
            # Extract features
            features = {}
            
            # MFCCs
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            mfcc_flat = mfcc.T.flatten()
            features['mfcc'] = mfcc_flat[:50] if len(mfcc_flat) >= 50 else np.pad(mfcc_flat, (0, 50 - len(mfcc_flat)))
            
            # Mel-spectrogram
            mel_spec = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=64)
            mel_flat = mel_spec.T.flatten()
            features['mel'] = mel_flat[:50] if len(mel_flat) >= 50 else np.pad(mel_flat, (0, 50 - len(mel_flat)))
            
            # Chroma features
            chroma = librosa.feature.chroma_stft(y=y, sr=sr)
            chroma_flat = chroma.T.flatten()
            features['chroma'] = chroma_flat[:24] if len(chroma_flat) >= 24 else np.pad(chroma_flat, (0, 24 - len(chroma_flat)))
            
            # Spectral features
            spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
            spectral_combined = np.concatenate([spectral_centroid.flatten()[:5], spectral_rolloff.flatten()[:5]])
            features['spectral'] = spectral_combined[:10] if len(spectral_combined) >= 10 else np.pad(spectral_combined, (0, 10 - len(spectral_combined)))
            
            # Pitch features
            try:
                f0, voiced_flag, voiced_probs = librosa.pyin(y, fmin=80, fmax=400, sr=sr)
                pitch_features = np.nan_to_num(f0, nan=0.0)
                features['pitch'] = pitch_features[:20] if len(pitch_features) >= 20 else np.pad(pitch_features, (0, 20 - len(pitch_features)))
            except:
                features['pitch'] = np.zeros(20)
            
            # Zero crossing rate
            zcr = librosa.feature.zero_crossing_rate(y)
            zcr_flat = zcr.flatten()
            features['zcr'] = zcr_flat[:8] if len(zcr_flat) >= 8 else np.pad(zcr_flat, (0, 8 - len(zcr_flat)))
            
            # Combine all features
            all_features = np.concatenate([
                features['mfcc'], features['mel'], features['chroma'],
                features['spectral'], features['pitch'], features['zcr']
            ])
            
            return all_features
            
        except Exception as e:
            print(f"❌ Error processing {audio_path}: {e}")
            return np.zeros(self.feature_size)
    
    def predict_phoneme(self, audio_path):
        """Predict which phoneme is in the audio"""
        if self.model is None:
            print("❌ Model not loaded!")
            return None
        
        features = self.extract_features(audio_path)
        
        if np.all(features == 0):
            print("❌ Could not extract features from audio")
            return None
        
        # Convert to tensor and predict
        features_tensor = torch.FloatTensor(features).unsqueeze(0)  # Add batch dimension
        with torch.no_grad():
            output = self.model(features_tensor)
            confidence = torch.softmax(output, dim=1)
            predicted_class = output.argmax(dim=1).item()
        
        # Convert back to letter
        predicted_letter = list(self.phoneme_map.keys())[list(self.phoneme_map.values()).index(predicted_class)]
        confidence_score = confidence[0][predicted_class].item()
        
        return predicted_letter, confidence_score
    
    def test_existing_samples(self):
        """Test the model on the training samples"""
        print("\n🧪 Testing on training samples...")
        data_dir = 'egyptian_phonemes/أ'
        
        if not os.path.exists(data_dir):
            print("❌ No test data found!")
            return
        
        wav_files = [f for f in os.listdir(data_dir) if f.endswith('.wav')]
        
        for wav_file in wav_files:
            audio_path = os.path.join(data_dir, wav_file)
            result = self.predict_phoneme(audio_path)
            
            if result:
                predicted_letter, confidence = result
                print(f"📄 {wav_file}: Predicted '{predicted_letter}' with {confidence:.1%} confidence")
            else:
                print(f"📄 {wav_file}: Prediction failed")
    
    def record_and_test(self):
        """Record new audio and test it"""
        from stage1 import AudioRecorder  # Import from your main file
        
        recorder = AudioRecorder()
        test_file = 'test_recording.wav'
        
        print("\n🎤 Recording new test sample...")
        input("Press Enter to start recording...")
        recorder.record_audio(test_file, duration=2)
        
        print("\n🔍 Testing the new recording...")
        result = self.predict_phoneme(test_file)
        
        if result:
            predicted_letter, confidence = result
            print(f"🎯 Prediction: '{predicted_letter}' with {confidence:.1%} confidence!")
            
            if confidence > 0.7:
                print("✅ Good recognition!")
            else:
                print("⚠️  Low confidence - try recording again")
        else:
            print("❌ Prediction failed")
        
        # Clean up
        if os.path.exists(test_file):
            os.remove(test_file)

def main():
    print("=" * 60)
    print("🎵 Egyptian Arabic Phoneme Testing - Stage 1")
    print("=" * 60)
    
    tester = PhonemeTester()
    
    if tester.model is None:
        return
    
    while True:
        print("\n🔍 Testing Options:")
        print("1. Test on existing training samples")
        print("2. Record new audio and test")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == '1':
            tester.test_existing_samples()
        elif choice == '2':
            tester.record_and_test()
        elif choice == '3':
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()