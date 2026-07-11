# simple_speech_synthesis.py - Clear Egyptian Speech Synthesis
import os
import numpy as np
import librosa
import pygame
import pyaudio
import wave
import time
from scipy.io import wavfile
from scipy import signal
import warnings
warnings.filterwarnings('ignore')

class SimpleVoiceSynthesizer:
    """Simple but effective speech synthesis that actually works"""
    
    def __init__(self):
        self.target_sr = 22050
        self.voice_library = {}
        pygame.mixer.init()
    
    def load_voice_samples(self):
        """Load all recorded voice samples"""
        print("📁 Loading voice samples...")
        
        if not os.path.exists('egyptian_voices'):
            print("❌ No voice samples found! Please record some first.")
            return False
        
        for letter in os.listdir('egyptian_voices'):
            letter_dir = os.path.join('egyptian_voices', letter)
            if os.path.isdir(letter_dir):
                for file in os.listdir(letter_dir):
                    if file.endswith('.wav'):
                        audio_path = os.path.join(letter_dir, file)
                        try:
                            # Load audio and ensure consistent sample rate
                            audio, sr = librosa.load(audio_path, sr=self.target_sr)
                            
                            # Clean and normalize the audio
                            audio = self.clean_audio(audio)
                            
                            # Store the clean audio
                            if letter not in self.voice_library:
                                self.voice_library[letter] = []
                            
                            self.voice_library[letter].append(audio)
                            print(f"   ✅ Loaded '{letter}' from {file}")
                            
                        except Exception as e:
                            print(f"   ❌ Error loading {file}: {e}")
        
        print(f"📊 Loaded {len(self.voice_library)} letters")
        return len(self.voice_library) > 0
    
    def clean_audio(self, audio):
        """Clean and normalize audio for consistent quality"""
        # Remove silence from beginning and end
        audio_trimmed, _ = librosa.effects.trim(audio, top_db=20)
        
        if len(audio_trimmed) > 0:
            audio = audio_trimmed
        
        # Normalize volume
        max_volume = np.max(np.abs(audio))
        if max_volume > 0:
            audio = audio / max_volume * 0.8
        
        # Light filtering to remove noise
        b, a = signal.butter(3, 100/(self.target_sr/2), btype='high')
        audio = signal.filtfilt(b, a, audio)
        
        return audio
    
    def synthesize_word_clearly(self, word):
        """Synthesize words that are actually understandable"""
        print(f"\n🎵 Synthesizing: '{word}'")
        
        letters = list(word.strip())
        audio_segments = []
        
        for i, letter in enumerate(letters):
            if letter not in self.voice_library:
                print(f"   ⚠️ No sample for '{letter}', adding pause")
                # Add a short pause for missing letters
                pause = np.zeros(int(0.15 * self.target_sr))
                audio_segments.append(pause)
                continue
            
            # Get the best sample for this letter
            letter_audio = self.voice_library[letter][0].copy()
            
            # Adjust duration based on position in word
            base_duration = len(letter_audio) / self.target_sr
            
            if i == 0:  # First letter - full length
                target_duration = base_duration
            elif i == len(letters) - 1:  # Last letter - full length
                target_duration = base_duration
            else:  # Middle letters - slightly shorter
                target_duration = base_duration * 0.8
            
            # Apply duration adjustment
            if target_duration != base_duration:
                stretch_ratio = base_duration / target_duration
                adjusted_audio = librosa.effects.time_stretch(letter_audio, rate=stretch_ratio)
                # Ensure correct length
                target_samples = int(target_duration * self.target_sr)
                if len(adjusted_audio) > target_samples:
                    adjusted_audio = adjusted_audio[:target_samples]
                else:
                    adjusted_audio = np.pad(adjusted_audio, (0, target_samples - len(adjusted_audio)))
                letter_audio = adjusted_audio
            
            # Add smooth fade in/out to each letter
            letter_audio = self.add_fades(letter_audio)
            audio_segments.append(letter_audio)
            
            print(f"   ✅ Added '{letter}' ({target_duration:.2f}s)")
        
        if not audio_segments:
            print("❌ No audio to combine")
            return None
        
        # Combine with smooth transitions
        combined_audio = audio_segments[0]
        for next_audio in audio_segments[1:]:
            combined_audio = self.smooth_join(combined_audio, next_audio)
        
        # Final cleanup
        combined_audio = self.normalize_volume(combined_audio)
        
        # Save the result
        output_dir = 'clear_speech'
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"{word}.wav")
        
        wavfile.write(output_path, self.target_sr, 
                     (combined_audio * 32767).astype(np.int16))
        
        print(f"💾 Saved: {output_path}")
        return output_path
    
    def add_fades(self, audio, fade_duration=0.05):
        """Add smooth fade in and out to prevent clicks"""
        fade_samples = int(fade_duration * self.target_sr)
        
        if len(audio) > fade_samples * 2:
            # Fade in
            fade_in = np.linspace(0, 1, fade_samples)
            audio[:fade_samples] = audio[:fade_samples] * fade_in
            
            # Fade out
            fade_out = np.linspace(1, 0, fade_samples)
            audio[-fade_samples:] = audio[-fade_samples:] * fade_out
        
        return audio
    
    def smooth_join(self, audio1, audio2, crossfade_duration=0.08):
        """Smoothly join two audio segments"""
        crossfade_samples = int(crossfade_duration * self.target_sr)
        
        # Ensure we have enough samples for crossfade
        if len(audio1) < crossfade_samples or len(audio2) < crossfade_samples:
            return np.concatenate([audio1, audio2])
        
        # Create crossfade
        fade_out = np.linspace(1, 0, crossfade_samples)
        fade_in = np.linspace(0, 1, crossfade_samples)
        
        # Apply crossfade
        end_of_first = audio1[-crossfade_samples:] * fade_out
        start_of_second = audio2[:crossfade_samples] * fade_in
        
        # Combine
        crossfade_segment = end_of_first + start_of_second
        
        result = np.concatenate([
            audio1[:-crossfade_samples],
            crossfade_segment,
            audio2[crossfade_samples:]
        ])
        
        return result
    
    def normalize_volume(self, audio):
        """Normalize the final audio volume"""
        max_volume = np.max(np.abs(audio))
        if max_volume > 0:
            return audio / max_volume * 0.9  # Leave some headroom
        return audio
    
    def play_audio(self, filepath):
        """Play audio file"""
        try:
            pygame.mixer.music.load(filepath)
            pygame.mixer.music.play()
            
            while pygame.mixer.music.get_busy():
                time.sleep(0.1)
            return True
        except Exception as e:
            print(f"❌ Error playing audio: {e}")
            return False

class SimpleRecorder:
    """Simple voice recorder"""
    
    def __init__(self):
        self.chunk = 1024
        self.format = pyaudio.paInt16
        self.channels = 1
        self.rate = 22050
        pygame.mixer.init()
    
    def record_letter(self, letter, duration=2):
        """Record a single letter"""
        letter_dir = f'egyptian_voices/{letter}'
        os.makedirs(letter_dir, exist_ok=True)
        
        filename = f'{letter}.wav'
        filepath = os.path.join(letter_dir, filename)
        
        print(f"\n🎤 Recording '{letter}'...")
        print("   Speak clearly when ready...")
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
        
        # Play back for verification
        print("   Playing back...")
        self.play_recording(filepath)
        
        return filepath
    
    def play_recording(self, filepath):
        """Play a recording"""
        try:
            pygame.mixer.music.load(filepath)
            pygame.mixer.music.play()
            while pygame.mixer.music.get_busy():
                time.sleep(0.1)
            return True
        except Exception as e:
            print(f"   ❌ Error playing: {e}")
            return False

class SimpleEgyptianSpeechSystem:
    """Simple system that actually produces clear speech"""
    
    def __init__(self):
        self.recorder = SimpleRecorder()
        self.synthesizer = SimpleVoiceSynthesizer()
    
    def record_letters(self):
        """Record Arabic letters"""
        print("\n" + "="*50)
        print("🎤 Record Egyptian Arabic Letters")
        print("="*50)
        print("We'll record common letters for clear speech synthesis")
        
        # Common Egyptian Arabic letters
        letters = ['س', 'ل', 'ا', 'م', 'ب', 'ت', 'ك', 'ي']
        
        for letter in letters:
            self.recorder.record_letter(letter)
            
            if letter != letters[-1]:
                cont = input("\nRecord next letter? (y/n): ").strip().lower()
                if cont != 'y':
                    break
    
    def synthesize_speech(self):
        """Synthesize clear, understandable speech"""
        if not self.synthesizer.load_voice_samples():
            return
        
        print("\n" + "="*50)
        print("🔊 Clear Speech Synthesis")
        print("="*50)
        
        # Common words that should work well
        test_words = [
            "سلام",      # Peace
            "باب",       # Door  
            "كتاب",      # Book
            "مدرسة",     # School
            "بيت",       # House
            "سكة",       # Street
            "كلام",      # Speech
            "لبن",       # Yogurt
            "تم",        # Done
        ]
        
        while True:
            print("\nChoose a word to synthesize:")
            for i, word in enumerate(test_words, 1):
                print(f"{i}. {word}")
            print(f"{len(test_words) + 1}. Custom word")
            print(f"{len(test_words) + 2}. Back to menu")
            
            try:
                choice = int(input("\nEnter choice: "))
                
                if 1 <= choice <= len(test_words):
                    word = test_words[choice - 1]
                    self._synthesize_and_play(word)
                elif choice == len(test_words) + 1:
                    word = input("Enter Arabic word: ").strip()
                    if word:
                        self._synthesize_and_play(word)
                    else:
                        print("❌ Please enter a word")
                elif choice == len(test_words) + 2:
                    break
                else:
                    print("❌ Invalid choice")
                    
            except ValueError:
                print("❌ Please enter a number")
    
    def _synthesize_and_play(self, word):
        """Synthesize word and play it"""
        try:
            output_path = self.synthesizer.synthesize_word_clearly(word)
            if output_path and os.path.exists(output_path):
                print(f"\n🔊 Playing: '{word}'")
                self.synthesizer.play_audio(output_path)
                
                # Ask if user wants to hear it again
                while True:
                    again = input("\nPlay again? (y/n): ").strip().lower()
                    if again == 'y':
                        self.synthesizer.play_audio(output_path)
                    else:
                        break
            else:
                print("❌ Failed to synthesize audio")
                
        except Exception as e:
            print(f"❌ Error: {e}")

def main():
    print("="*60)
    print("🎵 SIMPLE Egyptian Speech Synthesis")
    print("="*60)
    print("This system creates CLEAR, UNDERSTANDABLE speech")
    print("No complex AI - just clean audio processing")
    
    system = SimpleEgyptianSpeechSystem()
    
    while True:
        print("\n🏠 Main Menu:")
        print("1. Record Letters (Start here)")
        print("2. Synthesize Speech (Create words)")
        print("3. Exit")
        
        choice = input("\nEnter choice (1-3): ").strip()
        
        if choice == '1':
            system.record_letters()
        elif choice == '2':
            system.synthesize_speech()
        elif choice == '3':
            print("👋 مع السلامة! (Goodbye!)")
            break
        else:
            print("❌ Invalid choice")

if __name__ == "__main__":
    # Create directory
    os.makedirs('egyptian_voices', exist_ok=True)
    os.makedirs('clear_speech', exist_ok=True)
    
    # Check for required packages
    try:
        import librosa
        import pygame
        import pyaudio
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("Please install: pip install librosa pygame pyaudio scipy")
        exit(1)
    
    main()