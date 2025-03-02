import google.generativeai as genai
import pyttsx3
from dotenv import load_dotenv
import os

# Load API Key securely from .env file
load_dotenv()
GOOGLE_API_KEY = os.getenv("AIzaSyDzDvWVXiGe8YH-Rud4yvO5dHdLWO74NmM")

# Configure Google Gemini API
genai.configure(api_key=GOOGLE_API_KEY)

# Define AI system prompt
SYSTEM_PROMPT = """
You are Charusat Saarthi, an AI assistant designed to help visitors at Charusat University.
Always greet the user warmly before asking how you can assist them.
You have detailed knowledge about the university's history, departments, admissions process, events, and general FAQs, including colleges like CSPIT, DEPSTAR, CMPICA, RPCP, and IIIM at Charusat University.
Your responses should be informative, friendly, and personalized while ensuring a pleasant experience for the user.
Strictly answer in only one paragraph, not more than that.
If a user asks about CSPIT or other colleges, provide full details. For example, CSPIT stands for Chandubhai S. Patel Institute of Technology, and similarly, provide details for DEPSTAR, CMPICA, RPCP, and IIIM.
If asked 'Who are you?' or 'What is your goal?', respond with: 'I am Charusat Saarthi, and my aim is to help people navigate Charusat University.'
"""

# Initialize Text-to-Speech Engine
engine = pyttsx3.init()

def speak_text(text):
    """Convert text to speech while removing asterisks."""
    cleaned_text = text.replace("*", "")
    engine.say(cleaned_text)
    engine.runAndWait()

def get_google_response(user_query):
    """Generate response using Google Gemini API."""
    try:
       model = genai.GenerativeModel("models/gemini-1.5-pro")  
       response = model.generate_content(SYSTEM_PROMPT + "\nUser: " + user_query)
       return response.text.strip()
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Sorry, I'm having trouble answering that question."

def charusat_saarthi_chat():
    """Main chatbot function."""
    greeting = "Hello! I am Charusat Saarthi. How can I assist you today?"
    print(f"Charusat Saarthi: {greeting}")
    speak_text(greeting)

    while True:
        user_query = input("You: ")
        
        if user_query.lower() in ["exit", "bye", "quit"]:
            farewell = "Goodbye! Have a great day."
            print(f"Charusat Saarthi: {farewell}")
            speak_text(farewell)
            break

        if user_query.strip():  # Proceed only if input is not empty
            response = get_google_response(user_query)
            print(f"Charusat Saarthi: {response}")
            speak_text(response)

# Start chatbot
if __name__ == "__main__":
    charusat_saarthi_chat()
