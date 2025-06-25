import streamlit as st
import google.generativeai as genai
import base64
import os
from dotenv import load_dotenv

# Load .env file for API key
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# Validate API key
if not API_KEY:
    st.error("GEMINI_API_KEY not found in environment variables.")
    st.stop()

# Configure Gemini
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

st.set_page_config(page_title="Chest X-ray Analyzer", layout="centered")
st.title("🩻 Chest X-ray Analyzer")

# File uploader
uploaded_file = st.file_uploader("Upload a chest X-ray image", type=["png", "jpg", "jpeg"])

# Hidden default prompt (used unless user enters their own)
default_prompt = (
    "Analyze this chest X-ray image and provide a detailed medical report.\n\n"
    "First, provide a structured summary with each item on a new line in the following format:\n"
    "- Enlarged Cardiomediastinum: Present or Absent\n"
    "- Cardiomegaly: Present or Absent\n"
    "- Lung Opacity: Present or Absent\n"
    "- Lung Lesion: Present or Absent\n"
    "- Edema: Present or Absent\n"
    "- Consolidation: Present or Absent\n"
    "- Pneumonia: Present or Absent\n"
    "- Atelectasis: Present or Absent\n"
    "- Pneumothorax: Present or Absent\n"
    "- Pleural Effusion: Present or Absent\n"
    "- Pleural Other: Present or Absent\n"
    "- Fracture: Present or Absent\n"
    "- Support Devices: Present or Absent\n"
    "- No Finding: Present or Absent\n\n"
    "Then provide a clearly written medical report paragraph summarizing the findings. "
    "Do not include any AI disclaimers or notes."
)

# Optional: Let user customize the prompt
use_custom_prompt = st.checkbox("Customize Prompt")

if use_custom_prompt:
    custom_prompt = st.text_area("Enter your custom prompt:", height=200)
else:
    custom_prompt = ""

# Final prompt logic
final_prompt = custom_prompt.strip() if custom_prompt.strip() else default_prompt

# If an image is uploaded
if uploaded_file:
    st.image(uploaded_file, caption="Uploaded X-ray Image", use_column_width=True)

    if st.button("Analyze Image"):
        with st.spinner("Analyzing image... please wait"):
            try:
                # Encode image
                image_data = uploaded_file.read()
                base64_image = base64.b64encode(image_data).decode('utf-8')
                mime_type = uploaded_file.type

                # Prepare input for Gemini
                image_part = {
                    "inline_data": {
                        "mime_type": mime_type,
                        "data": base64_image
                    }
                }
                prompt_part = {"text": final_prompt}

                # Generate content using Gemini
                response = model.generate_content([image_part, prompt_part])

                # Filter out AI disclaimers
                raw_text = response.text
                filtered_lines = [
                    line for line in raw_text.splitlines()
                    if "I am an AI" not in line
                    and "educational purposes" not in line
                    and "qualified radiologist" not in line
                    and "should review" not in line
                    and "Important Note" not in line
                    and "not a substitute" not in line
                    and "recommendations for further management" not in line
                ]
                clean_output = "\n".join(filtered_lines)

                # Show analysis
                st.markdown("### 🧾 Analysis Summary:")
                st.write(clean_output)

                # Optional: Show metadata/candidates safely
                try:
                    if hasattr(response, 'candidates') and response.candidates:
                        with st.expander("📋 Detailed Candidates / Metadata"):
                            for idx, candidate in enumerate(response.candidates):
                                display_text = getattr(candidate, "display_text", None)
                                if display_text:
                                    st.write(f"**Candidate {idx+1}:** {display_text}")
                except Exception as meta_error:
                    st.warning(f"Could not fetch additional metadata: {meta_error}")

            except Exception as e:
                st.error(f"Error during analysis: {e}")
else:
    st.info("Please upload a chest X-ray image to begin.")
