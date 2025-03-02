

# ***********************************1**************************************

# import streamlit as st
# import fitz  # PyMuPDF for PDF processing
# import matplotlib.pyplot as plt
# import pandas as pd
# import seaborn as sns
# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# # Load API Key
# load_dotenv()
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# if GOOGLE_API_KEY:
#     genai.configure(api_key=GOOGLE_API_KEY)
# else:
#     st.error("GOOGLE_API_KEY is missing. Please set it in your .env file.")

# # Define medical terms
# medical_terms = ["Cardiomegaly", "Lung Opacity", "Lung Lesion", "Edema", "Pleural Effusion"]

# # Function to extract text from PDFs
# def extract_text_from_pdf(pdf_file):
#     doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
#     return "\n".join(page.get_text("text") for page in doc)

# # AI-based report comparison
# def compare_reports_with_gemini(text1, text2):
#     model = genai.GenerativeModel("models/gemini-1.5-pro")
#     prompt = f"""
#     Compare the following medical reports and highlight the key differences.
    
#     **Report 1:**  
#     {text1}

#     **Report 2:**  
#     {text2}

#     - Identify key medical conditions.
#     - State whether each condition has improved, worsened, or remained the same.
#     - Provide a summary in simple language.

#     Format the response clearly.
#     """
#     response = model.generate_content(prompt)
#     return response.text

# # Analyze medical conditions manually
# def analyze_medical_terms(text):
#     return {term: "Present" if term.lower() in text.lower() else "Absent" for term in medical_terms}

# # UI Setup
# st.set_page_config(page_title="Medical Report Comparison", layout="wide")
# st.title("🩺 AI-Powered Medical Report Analyzer")
# st.markdown("### Upload two medical reports to compare their findings.")

# # Sidebar for file upload
# st.sidebar.header("Upload Reports")
# pdf1 = st.sidebar.file_uploader("Upload Report 1 (PDF)", type="pdf")
# pdf2 = st.sidebar.file_uploader("Upload Report 2 (PDF)", type="pdf")

# if pdf1 and pdf2:
#     st.sidebar.success("✅ Both files uploaded successfully!")
    
#     # Extract text
#     text1 = extract_text_from_pdf(pdf1)
#     text2 = extract_text_from_pdf(pdf2)

#     # AI Analysis
#     st.subheader("📊 AI-Generated Report Comparison")
#     with st.spinner("Analyzing reports using AI..."):
#         ai_analysis = compare_reports_with_gemini(text1, text2)
#     st.markdown("### 📝 AI Insights")
#     st.write(ai_analysis)

#     # Manual Analysis
#     report1_analysis = analyze_medical_terms(text1)
#     report2_analysis = analyze_medical_terms(text2)

#     # Compare conditions
#     comparison_results = []
#     worsened, improved = 0, 0
    
#     for condition in medical_terms:
#         status1 = report1_analysis.get(condition, "Unknown")
#         status2 = report2_analysis.get(condition, "Unknown")

#         if status1 == "Absent" and status2 == "Present":
#             change = "⚠️ Worsened"
#             worsened += 1
#         elif status1 == "Present" and status2 == "Absent":
#             change = "✅ Improved"
#             improved += 1
#         else:
#             change = "No Change"
        
#         comparison_results.append([condition, status1, status2, change])

#     # Show Comparison Table
#     st.subheader("📋 Condition Comparison Table")
#     df_comparison = pd.DataFrame(comparison_results, columns=["Condition", "Report 1", "Report 2", "Change"])
#     st.dataframe(df_comparison, height=250)

#     # Pie Chart
#     st.subheader("📈 Overall Condition Change")
#     if worsened == 0 and improved == 0:
#         st.info("No significant changes detected.")
#     else:
#         fig1, ax1 = plt.subplots()
#         ax1.pie([worsened, improved], labels=["Worsened", "Improved"], autopct="%1.1f%%", colors=["red", "green"])
#         ax1.set_title("Condition Changes Between Reports")
#         st.pyplot(fig1)
    
#     # Heatmap Visualization
#     st.subheader("🔬 Condition Presence Heatmap")
#     df_heatmap = pd.DataFrame({
#         "Condition": medical_terms,
#         "Report 1": [1 if report1_analysis[t] == "Present" else 0 for t in medical_terms],
#         "Report 2": [1 if report2_analysis[t] == "Present" else 0 for t in medical_terms]
#     }).set_index("Condition")
    
#     fig2, ax2 = plt.subplots(figsize=(6, 4))
#     sns.heatmap(df_heatmap, annot=True, cmap="coolwarm", cbar=False, ax=ax2)
#     ax2.set_title("Condition Presence in Reports")
#     st.pyplot(fig2)

# else:
#     st.warning("⚠️ Please upload both medical reports to analyze.")



# ************************************2*********************************************

# import streamlit as st
# import fitz  # PyMuPDF for PDF processing
# import matplotlib.pyplot as plt
# import pandas as pd
# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# # Load API Key
# load_dotenv()
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# if GOOGLE_API_KEY:
#     genai.configure(api_key=GOOGLE_API_KEY)
# else:
#     st.error("GOOGLE_API_KEY is missing. Please set it in your .env file.")

# # Define medical terms
# medical_terms = ["Cardiomegaly", "Lung Opacity", "Lung Lesion", "Edema", "Pleural Effusion"]

# # Function to extract text from PDFs
# def extract_text_from_pdf(pdf_file):
#     doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
#     return "\n".join(page.get_text("text") for page in doc)

# # AI-based report comparison
# def compare_reports_with_gemini(text1, text2):
#     model = genai.GenerativeModel("models/gemini-1.5-pro")
#     prompt = f"""
#     Compare the following medical reports and highlight the key differences.
    
#     **Report 1:**  
#     {text1}

#     **Report 2:**  
#     {text2}

#     - Identify key medical conditions.
#     - State whether each condition has improved, worsened, or remained the same.
#     - Provide a summary in simple language.

#     Format the response clearly.
#     """
#     response = model.generate_content(prompt)
#     return response.text


# # Analyze medical conditions manually
# def analyze_medical_terms(text):
#     return {term: "Present" if term.lower() in text.lower() else "Absent" for term in medical_terms}

# # UI Setup
# st.set_page_config(page_title="Medical Report Comparison", layout="wide")
# st.title("🩺 AI-Powered Medical Report Analyzer")
# st.markdown("### Upload two medical reports to compare their findings.")

# # Sidebar for file upload
# st.sidebar.header("Upload Reports")
# pdf1 = st.sidebar.file_uploader("Upload Report 1 (PDF)", type="pdf")
# pdf2 = st.sidebar.file_uploader("Upload Report 2 (PDF)", type="pdf")

# if pdf1 and pdf2:
#     st.sidebar.success("✅ Both files uploaded successfully!")
    
#     # Extract text
#     text1 = extract_text_from_pdf(pdf1)
#     text2 = extract_text_from_pdf(pdf2)

#     # AI Analysis
#     st.subheader("📊 AI-Generated Report Comparison")
#     with st.spinner("Analyzing reports using AI..."):
#         ai_analysis = compare_reports_with_gemini(text1, text2)
#     st.markdown("### 📝 AI Insights")
#     st.write(ai_analysis)

#     # Manual Analysis
#     report1_analysis = analyze_medical_terms(text1)
#     report2_analysis = analyze_medical_terms(text2)

#     # Compare conditions
#     comparison_results = []
#     worsened, improved = 0, 0
    
#     for condition in medical_terms:
#         status1 = report1_analysis.get(condition, "Unknown")
#         status2 = report2_analysis.get(condition, "Unknown")

#         if status1 == "Absent" and status2 == "Present":
#             change = "⚠️ Worsened"
#             worsened += 1
#         elif status1 == "Present" and status2 == "Absent":
#             change = "✅ Improved"
#             improved += 1
#         else:
#             change = "No Change"
        
#         comparison_results.append([condition, status1, status2, change])

#     # Show Comparison Table
#     st.subheader("📋 Condition Comparison Table")
#     df_comparison = pd.DataFrame(comparison_results, columns=["Condition", "Report 1", "Report 2", "Change"])
#     st.dataframe(df_comparison, height=250)

#     # Pie Chart
#     st.subheader("📈 Condition Changes Overview")
#     if worsened == 0 and improved == 0:
#         st.info("No significant changes detected.")
#     else:
#         fig, ax = plt.subplots()
#         labels = ["Worsened", "Improved"]
#         sizes = [worsened, improved]
#         colors = ["red", "green"]
#         ax.pie(sizes, labels=labels, autopct="%1.1f%%", colors=colors, startangle=90)
#         ax.axis("equal")  # Equal aspect ratio ensures the pie chart is circular.
#         ax.set_title("Overall Condition Changes")
#         st.pyplot(fig)
# else:
#     st.warning("⚠️ Please upload both medical reports to analyze.")

# ************************************3*********************************************



# import streamlit as st
# import fitz  # PyMuPDF for PDF processing
# import matplotlib.pyplot as plt
# import seaborn as sns
# import pandas as pd
# import google.generativeai as genai
# import os
# from dotenv import load_dotenv

# # Load API Key
# load_dotenv()
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# if GOOGLE_API_KEY:
#     genai.configure(api_key=GOOGLE_API_KEY)
# else:
#     st.error("GOOGLE_API_KEY is missing. Please set it in your .env file.")

# # Define medical terms
# medical_terms = ["Cardiomegaly", "Lung Opacity", "Lung Lesion", "Edema", "Pleural Effusion", "Fracture", "Pneumothorax"]

# # Function to extract text from PDFs
# def extract_text_from_pdf(pdf_file):
#     doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
#     return "\n".join(page.get_text("text") for page in doc)

# # AI-based report comparison
# def compare_reports_with_gemini(text1, text2):
#     model = genai.GenerativeModel("models/gemini-1.5-pro")
#     prompt = f"""
#     Compare the following medical reports and highlight the key differences.
    
#     **Report 1:**  
#     {text1}

#     **Report 2:**  
#     {text2}

#     - Identify key medical conditions.
#     - State whether each condition has improved, worsened, or remained the same.
#     - Provide a summary in simple language.

#     Format the response clearly.
#     """
#     response = model.generate_content(prompt)
#     return response.text

# # Analyze medical conditions manually
# def analyze_medical_terms(text):
#     return {term: "Present" if term.lower() in text.lower() else "Absent" for term in medical_terms}

# # UI Setup
# st.set_page_config(page_title="Medical Report Comparison", layout="wide")
# st.title("🩺 AI-Powered Medical Report Analyzer")
# st.markdown("### Upload two medical reports to compare their findings.")

# # Sidebar for file upload
# st.sidebar.header("Upload Reports")
# pdf1 = st.sidebar.file_uploader("Upload Report 1 (PDF)", type="pdf")
# pdf2 = st.sidebar.file_uploader("Upload Report 2 (PDF)", type="pdf")

# if pdf1 and pdf2:
#     st.sidebar.success("✅ Both files uploaded successfully!")
    
#     # Extract text
#     text1 = extract_text_from_pdf(pdf1)
#     text2 = extract_text_from_pdf(pdf2)

#     # AI Analysis
#     st.subheader("📊 AI-Generated Report Comparison")
#     with st.spinner("Analyzing reports using AI..."):
#         ai_analysis = compare_reports_with_gemini(text1, text2)
#     st.markdown("### 📝 AI Insights")
#     st.write(ai_analysis)

#     # Manual Analysis
#     report1_analysis = analyze_medical_terms(text1)
#     report2_analysis = analyze_medical_terms(text2)

#     # Compare conditions
#     comparison_results = []
#     worsened, improved = 0, 0
#     condition_changes = []

#     for condition in medical_terms:
#         status1 = report1_analysis.get(condition, "Unknown")
#         status2 = report2_analysis.get(condition, "Unknown")

#         if status1 == "Absent" and status2 == "Present":
#             change = "⚠️ Worsened"
#             worsened += 1
#             condition_changes.append(1)
#         elif status1 == "Present" and status2 == "Absent":
#             change = "✅ Improved"
#             improved += 1
#             condition_changes.append(-1)
#         else:
#             change = "No Change"
#             condition_changes.append(0)
        
#         comparison_results.append([condition, status1, status2, change])

#     # Show Comparison Table
#     st.subheader("📋 Condition Comparison Table")
#     df_comparison = pd.DataFrame(comparison_results, columns=["Condition", "Report 1", "Report 2", "Change"])
#     st.dataframe(df_comparison, height=250)

#     # Summary in Simple Language
#     st.subheader("📖 Summary in Simple Language")
#     summary_text = (
#         f"Both reports indicate that the patient's **heart and lungs are generally okay**, with no major changes in conditions like lung opacity or edema.\n\n"
#         f"**However, significant findings include:**\n"
#         f"- {worsened} conditions **worsened** (e.g., new fractures or lung issues).\n"
#         f"- {improved} conditions **improved** (e.g., reduced lung opacity or pleural effusion).\n\n"
#         f"Overall, this suggests possible new complications or improvements based on the latest report."
#     )
#     st.info(summary_text)

#     # Heatmap for Visualization
#     st.subheader("🌡️ Heatmap of Condition Changes")
#     df_heatmap = pd.DataFrame([condition_changes], columns=medical_terms, index=["Condition Change"])
    
#     plt.figure(figsize=(10, 1))
#     sns.heatmap(df_heatmap, annot=True, cmap="coolwarm", center=0, cbar=False, linewidths=1, linecolor="black")
#     st.pyplot(plt)

#     # Pie Chart
#     st.subheader("📈 Condition Changes Overview")
#     if worsened == 0 and improved == 0:
#         st.info("No significant changes detected.")
#     else:
#         fig, ax = plt.subplots()
#         labels = ["Worsened", "Improved"]
#         sizes = [worsened, improved]
#         colors = ["red", "green"]
#         ax.pie(sizes, labels=labels, autopct="%1.1f%%", colors=colors, startangle=90)
#         ax.axis("equal")  # Equal aspect ratio ensures the pie chart is circular.
#         ax.set_title("Overall Condition Changes")
#         st.pyplot(fig)
# else:
#     st.warning("⚠️ Please upload both medical reports to analyze.")


# *********************multiple input pdf **********************************************
import streamlit as st
import fitz  # PyMuPDF for PDF processing
import matplotlib.pyplot as plt
import pandas as pd
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API Key
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
else:
    st.error("GOOGLE_API_KEY is missing. Please set it in your .env file.")

# Define medical terms
medical_terms = ["Cardiomegaly", "Lung Opacity", "Lung Lesion", "Edema", "Pleural Effusion"]

# Function to extract text from PDFs
def extract_text_from_pdf(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    return "\n".join(page.get_text("text") for page in doc)

# AI-based report comparison
def compare_reports_with_gemini(report_texts):
    model = genai.GenerativeModel("models/gemini-1.5-pro")
    
    prompt = "**Compare the following medical reports and highlight the key differences:**\n\n"
    
    for i, text in enumerate(report_texts):
        prompt += f"**Report {i+1}:**\n{text}\n\n"
    
    prompt += """
    - Identify key medical conditions.
    - State whether each condition has improved, worsened, or remained the same.
    - Provide a summary in simple language.
    
    Format the response clearly.
    """
    
    response = model.generate_content(prompt)
    return response.text

# Analyze medical conditions manually
def analyze_medical_terms(text):
    return {term: "Present" if term.lower() in text.lower() else "Absent" for term in medical_terms}

# UI Setup
st.set_page_config(page_title="Medical Report Comparison", layout="wide")
st.title("🩺 AI-Powered Medical Report Analyzer")
st.markdown("### Upload multiple medical reports to compare their findings.")

# Sidebar for file upload
st.sidebar.header("Upload Reports")
pdf_files = st.sidebar.file_uploader("Upload Medical Reports (PDF)", type="pdf", accept_multiple_files=True)

if pdf_files and len(pdf_files) >= 2:
    st.sidebar.success(f"✅ {len(pdf_files)} files uploaded successfully!")

    # Extract text from all PDFs
    report_texts = [extract_text_from_pdf(pdf) for pdf in pdf_files]

    # AI Analysis
    st.subheader("📊 AI-Generated Report Comparison")
    with st.spinner("Analyzing reports using AI..."):
        ai_analysis = compare_reports_with_gemini(report_texts)
    st.markdown("### 📝 AI Insights")
    st.write(ai_analysis)

    # Manual Condition Analysis
    condition_results = [analyze_medical_terms(text) for text in report_texts]

    # Generate comparison table
    comparison_data = []
    
    for condition in medical_terms:
        row = [condition]
        for report in condition_results:
            row.append(report.get(condition, "Unknown"))
        comparison_data.append(row)

    # Show comparison table
    st.subheader("📋 Condition Comparison Table")
    column_names = ["Condition"] + [f"Report {i+1}" for i in range(len(pdf_files))]
    df_comparison = pd.DataFrame(comparison_data, columns=column_names)
    st.dataframe(df_comparison, height=250)

    # Analyze changes across reports
    worsened, improved = 0, 0
    for i in range(len(condition_results) - 1):
        for condition in medical_terms:
            status1 = condition_results[i].get(condition, "Unknown")
            status2 = condition_results[i + 1].get(condition, "Unknown")

            if status1 == "Absent" and status2 == "Present":
                worsened += 1
            elif status1 == "Present" and status2 == "Absent":
                improved += 1

    # Pie Chart
    st.subheader("📈 Condition Changes Overview")
    if worsened == 0 and improved == 0:
        st.info("No significant changes detected.")
    else:
        fig, ax = plt.subplots()
        labels = ["Worsened", "Improved"]
        sizes = [worsened, improved]
        colors = ["red", "green"]
        ax.pie(sizes, labels=labels, autopct="%1.1f%%", colors=colors, startangle=90)
        ax.axis("equal")  # Equal aspect ratio ensures the pie chart is circular.
        ax.set_title("Overall Condition Changes")
        st.pyplot(fig)
else:
    st.warning("⚠️ Please upload at least two medical reports to analyze.")






