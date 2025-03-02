# import google.generativeai as genai
# import pyttsx3
# from dotenv import load_dotenv
# import os

# # Load API Key securely from .env file
# load_dotenv()
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# # Configure Google Gemini API
# genai.configure(api_key=GOOGLE_API_KEY)

# # Define AI system prompt
# SYSTEM_PROMPT = """
# You are an AI assistant specialized in lung cancer detection and report generation.
# Your primary goal is to assist patients, doctors, and researchers with detailed knowledge about lung cancer.
# You provide information on:
# - Symptoms of lung cancer
# - Diagnosis methods like CT scans, PET scans, and biopsies
# - Treatment options (chemotherapy, immunotherapy, radiation therapy, and surgery)
# - Preventive measures to reduce the risk of lung cancer
# - Interpretation of lung cancer test reports, explaining findings in simple terms
# - Guidance on when to consult an oncologist
# Always provide clear and well-structured responses, focusing on accuracy and medical insights.
# If asked 'Who are you?' or 'What is your goal?', respond with: 'I am a Lung Cancer AI Assistant, here to provide guidance on lung cancer detection, treatment, and report analysis.'
# """

# # Initialize Text-to-Speech Engine
# engine = pyttsx3.init()

# def speak_text(text):
#     """Convert text to speech while removing asterisks."""
#     cleaned_text = text.replace("*", "")
#     engine.say(cleaned_text)
#     engine.runAndWait()

# def get_google_response(user_query):
#     """Generate response using Google Gemini API."""
#     try:
#         model = genai.GenerativeModel("models/gemini-1.5-pro")
#         response = model.generate_content(SYSTEM_PROMPT + "\nUser: " + user_query)
#         return response.text.strip()
#     except Exception as e:
#         print(f"Error generating response: {e}")
#         return "Sorry, I'm having trouble answering that question."

# def lung_cancer_chat():
#     """Main chatbot function."""
#     greeting = "Hello! I am your Lung Cancer AI Assistant. How can I assist you today?"
#     print(f"Assistant: {greeting}")
#     speak_text(greeting)

#     while True:
#         user_query = input("You: ")
        
#         if user_query.lower() in ["exit", "bye", "quit"]:
#             farewell = "Goodbye! Stay healthy and consult a doctor if needed."
#             print(f"Assistant: {farewell}")
#             speak_text(farewell)
#             break

#         if user_query.strip():  # Proceed only if input is not empty
#             response = get_google_response(user_query)
#             print(f"Assistant: {response}")
#             speak_text(response)

# # Start chatbot
# if __name__ == "__main__":
#     lung_cancer_chat()
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load API Key securely from .env file
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure Google Gemini API
genai.configure(api_key=GOOGLE_API_KEY)

# # Define AI system prompt
# SYSTEM_PROMPT = """
# You are an AI assistant specialized in lung cancer detection and report generation.
# Your primary goal is to assist patients, doctors, and researchers with detailed knowledge about lung cancer.
# You provide information on:
# - Symptoms of lung cancer
# - Diagnosis methods like CT scans, PET scans, and biopsies
# - Treatment options (chemotherapy, immunotherapy, radiation therapy, and surgery)
# - Preventive measures to reduce the risk of lung cancer
# - Interpretation of lung cancer test reports, explaining findings in simple terms
# - Guidance on when to consult an oncologist
# Always provide clear and well-structured responses, focusing on accuracy and medical insights.
# If asked 'Who are you?' or 'What is your goal?', respond with: 'I am a Lung Cancer AI Assistant, here to provide guidance on lung cancer detection, treatment, and report analysis.'
# """

SYSTEM_PROMPT = """
You are an AI assistant specialized in lung cancer detection and report generation.
Your primary goal is to assist patients, doctors, and researchers with detailed knowledge about lung cancer.
You provide information on:
- Symptoms of lung cancer
- Diagnosis methods like CT scans, PET scans, and biopsies
- Treatment options (chemotherapy, immunotherapy, radiation therapy, and surgery)
- Preventive measures to reduce the risk of lung cancer
- Interpretation of lung cancer test reports, explaining findings in simple terms
- Guidance on when to consult an oncologist

### **Response Formatting Instructions:**
1. **Always format responses in a structured, point-wise manner.**
2. **Each bullet point should be on a new line** for better readability.
3. **Use proper spacing** between different sections.
4. **Avoid writing long paragraphs; break content into clear, distinct lines.**
5. **Use bold (`**bold**`) for headings and key terms** to highlight important details.
6. **Provide step-by-step or numbered responses** where applicable.

### **Example Response Format:**
**Types of Lung Cancer:**
- **1. Non-Small Cell Lung Cancer (NSCLC)**
  - **Adenocarcinoma:** Common in smokers and non-smokers; starts in outer lungs.
  - **Squamous Cell Carcinoma:** Begins in central airways; linked to smoking.
  - **Large Cell Carcinoma:** Fast-growing, can appear in any lung region.

- **2. Small Cell Lung Cancer (SCLC)**
  - Rapid-growing cancer, found mostly in smokers.
  - Also called "oat cell cancer" due to cell shape.

Always follow this structured format in your responses.
"""

# Function to get response from Google Gemini API
def get_google_response(user_query):
    """Generate response using Google Gemini API."""
    try:
        model = genai.GenerativeModel("models/gemini-1.5-pro")
        response = model.generate_content(SYSTEM_PROMPT + "\nUser: " + user_query)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Sorry, I'm having trouble answering that question."

def lung_cancer_chat():
    """Main chatbot function."""
    greeting = "Hello! I am your Lung Cancer AI Assistant. How can I assist you today?"
    print(f"Assistant: {greeting}")
    # speak_text(greeting)  # Commented out voice output

    while True:
        user_query = input("You: ")
        
        if user_query.lower() in ["exit", "bye", "quit"]:
            farewell = "Goodbye! Stay healthy and consult a doctor if needed."
            print(f"Assistant: {farewell}")
            # speak_text(farewell)  # Commented out voice output
            break

        if user_query.strip():  # Proceed only if input is not empty
            response = get_google_response(user_query)
            print(f"Assistant: {response}")
            # speak_text(response)  # Commented out voice output

# Start chatbot
if __name__ == "__main__":
    lung_cancer_chat()
