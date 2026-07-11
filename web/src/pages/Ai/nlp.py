import re
import os
import pandas as pd
import numpy as np
import pyttsx3
from typing import Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings('ignore')

class MedicalAssistant:
    def __init__(self):
        self.tts_engine = pyttsx3.init()
        self.qa_dataset = None
        self.vectorizer = None
        self.qa_vectors = None
        self.setup_voice_engine()
        
    def setup_voice_engine(self):
        """Configure text-to-speech engine"""
        print("🔊 Setting up voice engine...")
        try:
            voices = self.tts_engine.getProperty('voices')
            if len(voices) > 0:
                self.tts_engine.setProperty('voice', voices[0].id)
            self.tts_engine.setProperty('rate', 160)
            self.tts_engine.setProperty('volume', 1.0)
            print("✅ Voice engine configured successfully")
        except Exception as e:
            print(f"❌ Error setting up voice engine: {e}")
        
    def load_and_train_model(self, filepath: str = "medquad.csv"):
        """Load the QA dataset and train the model"""
        print("📚 Loading and training model...")
        
        try:
            self.qa_dataset = pd.read_csv(filepath)
            print(f"✅ Loaded {len(self.qa_dataset)} QA pairs")
            
            # Preprocess questions and answers
            self.qa_dataset['processed_question'] = self.qa_dataset['question'].apply(self.preprocess_text)
            self.qa_dataset['processed_answer'] = self.qa_dataset['answer'].apply(self.preprocess_text)
            
            # Clean data
            initial_count = len(self.qa_dataset)
            self.qa_dataset = self.qa_dataset.dropna(subset=['question', 'answer'])
            self.qa_dataset = self.qa_dataset[(self.qa_dataset['question'].str.len() > 0) & 
                                             (self.qa_dataset['answer'].str.len() > 0)]
            
            print(f"📊 After cleaning: {len(self.qa_dataset)} QA pairs")
            
            # Train TF-IDF vectorizer
            print("🤖 Training model...")
            self.vectorizer = TfidfVectorizer(
                max_features=10000, 
                stop_words='english',
                ngram_range=(1, 2),
                min_df=2,
                max_df=0.8
            )
            
            self.qa_vectors = self.vectorizer.fit_transform(self.qa_dataset['processed_question'])
            
            print(f"✅ Model trained! Vocabulary: {len(self.vectorizer.vocabulary_)} words")
            return True
            
        except Exception as e:
            print(f"❌ Error: {e}")
            return False
    
    def preprocess_text(self, text: str) -> str:
        """Preprocess text for similarity matching"""
        if pd.isna(text):
            return ""
        text = str(text).lower()
        text = re.sub(r'[^\w\s]', '', text)
        text = re.sub(r'\d+', '', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
    
    def find_best_answer(self, question: str, threshold: float = 0.2) -> Tuple[str, float]:
        """Find the best matching answer using cosine similarity"""
        if self.vectorizer is None:
            return "Model not trained yet.", 0.0
        
        processed_question = self.preprocess_text(question)
        
        if len(processed_question) < 3:
            return "Please ask a more detailed question.", 0.0
        
        try:
            question_vector = self.vectorizer.transform([processed_question])
            similarities = cosine_similarity(question_vector, self.qa_vectors)
            best_match_idx = np.argmax(similarities)
            best_similarity = similarities[0][best_match_idx]
            
            if best_similarity > threshold:
                return self.qa_dataset.iloc[best_match_idx]['answer'], best_similarity
            else:
                return self.generate_fallback_response(question), best_similarity
                
        except Exception as e:
            return f"Error: {e}", 0.0
    
    def generate_fallback_response(self, question: str) -> str:
        """Generate a fallback response"""
        question_lower = question.lower()
        medical_keywords = {
            'cancer': "cancer", 'diabetes': "diabetes", 'heart': "heart conditions",
            'blood': "blood disorders", 'pain': "pain management", 'treatment': "treatments",
            'symptom': "symptoms", 'medicine': "medications", 'disease': "diseases"
        }
        
        for keyword, topic in medical_keywords.items():
            if keyword in question_lower:
                return f"I have information about {topic}. Please ask a more specific question."
        
        return "I'm trained on medical information. Please ask about medical topics."
    
    def speak_text(self, text: str):
        """Convert text to speech"""
        print(f"\n🤖 Answer: {text}")
        print("🔊 Speaking now...")
        
        try:
            clean_text = text.strip()
            if not clean_text.endswith(('.', '!', '?')):
                clean_text += '.'
            
            self.tts_engine.say(clean_text)
            self.tts_engine.runAndWait()
            print("✅ Finished speaking")
            
        except Exception as e:
            print(f"❌ Speech error: {e}")

    def interactive_session(self):
        """Start interactive session with text input"""
        print("\n" + "="*60)
        print("🚀 Medical Assistant Ready!")
        print("="*60)
        print("💬 Type your medical questions and I'll speak the answers!")
        print("📝 Type 'exit' to quit")
        print("="*60)
        
        # Test voice
        self.speak_text("Hello! I am your medical assistant. Type your medical questions and I will speak the answers.")
        
        while True:
            print(f"\n{'='*40}")
            user_input = input("\n💭 Your question: ").strip()
            
            if user_input.lower() in ['exit', 'quit', 'bye']:
                self.speak_text("Goodbye! Stay healthy!")
                break
            elif user_input.lower() == 'help':
                print("💡 Ask medical questions like: What is diabetes? How is cancer treated? What are flu symptoms?")
                continue
            elif not user_input:
                continue
            
            print("🔍 Searching for answer...")
            answer, confidence = self.find_best_answer(user_input)
            
            # Add disclaimer for low confidence
            if confidence < 0.3:
                answer += " Note: I'm an AI assistant. Consult a doctor for medical advice."
            
            # SPEAK THE ANSWER
            self.speak_text(answer)
            print(f"📊 Confidence: {confidence:.3f}")

def main():
    """Main function"""
    print("🎯 Starting Medical Assistant...")
    
    assistant = MedicalAssistant()
    
    try:
        success = assistant.load_and_train_model("medquad.csv")
        if not success:
            return
    except FileNotFoundError:
        print("❌ medquad.csv not found!")
        return
    
    # Test with sample questions
    print("\n🧪 Testing with sample questions...")
    test_questions = [
        "What is diabetes?",
        "What are the symptoms of flu?",
        "How is cancer treated?"
    ]
    
    for question in test_questions:
        print(f"\n📋 Question: {question}")
        answer, confidence = assistant.find_best_answer(question)
        print(f"✅ Found answer (confidence: {confidence:.3f})")
        assistant.speak_text(answer)
    
    # Start interactive session
    assistant.interactive_session()

if __name__ == "__main__":
    if not os.path.exists("medquad.csv"):
        print("❌ medquad.csv not found in current directory!")
    else:
        main()