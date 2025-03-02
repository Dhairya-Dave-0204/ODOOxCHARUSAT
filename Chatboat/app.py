from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load API Key securely from .env file
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Check if the API key is loaded correctly
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found. Make sure you have set it in the .env file.")

# Configure Google Gemini API
genai.configure(api_key=GOOGLE_API_KEY)

# Define AI system prompt
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

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend interaction

# Function to get AI response
def get_google_response(user_query):
    """Generate response using Google Gemini API."""
    try:
        model = genai.GenerativeModel("models/gemini-1.5-pro")  # Updated to correct model name
        response = model.generate_content(SYSTEM_PROMPT + "\nUser: " + user_query)
        
        # Ensure a valid response is returned
        if hasattr(response, 'text'):
            return response.text.strip()
        else:
            return "I couldn't process your request. Please try again."
    except Exception as e:
        return f"Error: {e}"

# API route for chatbot
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_query = data.get("message", "")
    
    if not user_query:
        return jsonify({"response": "Please provide a valid input."})
    
    response = get_google_response(user_query)
    return jsonify({"response": response})

# Run Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)



# apply this in postman with post method
# http://127.0.0.1:5000/chat
# and in body->jason->{
#     "message": "What are the symptoms of lung cancer?"
# }
# put this code 