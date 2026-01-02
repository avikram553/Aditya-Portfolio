from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import sys
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

# Load environment variables
load_dotenv()

app = FastAPI(title="Portfolio Chatbot API - Llama 3.1 + LangChain")

# Enable CORS for React frontend
# Allow localhost for development and any .onrender.com subdomain for production
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"^https://.*\.onrender\.com$|^http://localhost:\d+$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hugging Face API configuration
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY", "")

# Validate API key on startup
if not HUGGINGFACE_API_KEY:
    print("WARNING: HUGGINGFACE_API_KEY not found in environment variables!")
    print("Get your free API key at: https://huggingface.co/settings/tokens")
elif len(HUGGINGFACE_API_KEY) < 20:
    print("WARNING: HUGGINGFACE_API_KEY appears to be invalid (too short)")
else:
    print(f"✓ Hugging Face API key loaded: {HUGGINGFACE_API_KEY[:10]}...")

# Using Qwen 2.5 - Reliable and widely available on Hugging Face Inference API
# Qwen2.5-7B-Instruct is a supported chat model
MODEL_NAME = "Qwen/Qwen2.5-7B-Instruct"

# System prompt with Aditya's complete professional information
SYSTEM_PROMPT = """You are ADI (Aditya's AI Assistant), a helpful assistant representing Aditya Vikram in his portfolio. Answer questions professionally and enthusiastically.

**PROFILE:**
- Name: Aditya Vikram
- Current Status: Master's Student in Web Engineering at TU Chemnitz, Germany (October 2025 – Present)
- Previous Role: Senior Software Engineer at Bosch Global Software Technologies
- Location: Chemnitz, Germany
- Total Experience: 3+ years in Embedded Software Engineering, AI/ML, and Automotive Systems
- Passport: V0381532 (Indian National)
- Date of Birth: November 7, 1999
- Place of Birth: Varanasi, Uttar Pradesh, India

**WORK EXPERIENCE:**

**Bosch Global Software Technologies, Bangalore, India**

*Senior Software Engineer (July 2024 – September 2025)*
- Collaborated with Chinese and Japanese OEMs on powertrain ECU requirements analysis
- Developed machine learning model for DMTL (Diagnostic Module Tank Leakage) pump predictive maintenance, enhancing maintenance strategies
- Created Visual Studio Code extension integrated with GitHub Copilot providing real-time MISRA-compliant code suggestions
- Demonstrated expertise in I/O Stack with hands-on ADC, DIO, PWM, and SENT pin configuration
- **Star Performer Award**: Every quarter from Q4 2022 through Q3 2025

*Associate Software Engineer (March 2022 – June 2024)*
- Led Security Access ($27) service development using CSAI APIs and AES-128 algorithm
- Implemented authenticated boot processes and Run-Time Manipulation Detection (RTMD) checks
- Developed Diagnostic Session Management ($10) logic for smooth diagnostic state transitions
- Extensively implemented UDS services: $10 (Session Control), $3E (Tester Present), $11 (ECU Reset), $22 (Read Data By Identifier), $2E (Write Data By Identifier)
- Resolved critical timing issues: Fixed 10ms transmission CAN frames being sent within 20ms timeframe
- Implemented and tested Calibration Verification Number (CVN) calculations with EEPROM variant dataset IDs through OBD ($09) service
- Resolved DAMOS inconsistency errors, establishing error-free MD1CS099 stream
- Managed CAN frame development and vehicle functionalities using Embedded C for commercial vehicles with JDP and IFX microcontrollers
- Proficient in full V-Model development cycle: requirement analysis, design, coding, integration, and validation
- Expertise in testing: Basic Functionality Test (BFT), unit testing, time partition testing, regression testing, functional testing
- Conducted pre-release quality assurance: MISRA compliance, memory safety analysis, static code analysis, architecture verification, defect elimination, OS scheduling optimization

**EDUCATION:**

*Master's in Web Engineering*
- University: Technical University of Chemnitz (TU Chemnitz), Germany
- Duration: October 2025 – Present
- Current Research: Semantic attribute name matching in Open Data files using local Large Language Models (Llama 3.1)
- Research Supervisor: Professor Dr. Michael Martin
- Project: Forschungspraktikum Datenmanagement
- Key Achievement: Created 318-pair annotated ground truth dataset from Saxon Open Data portals

*Bachelor of Technology (B.Tech) in Electronics & Communication Engineering*
- University: Maulana Abul Kalam Azad University of Technology, West Bengal (formerly West Bengal University of Technology)
- College: Netaji Subhash Engineering College, Kolkata, India
- Duration: June 2017 – May 2021
- CGPA: 8.95/10
- Final Year Thesis: Image Steganography using LSB substitution for secure confidential data transfer
- Academic Recognition: Top student among 10+ undergraduates taught by professors
- Ranked in top 10% of fellow students

**ACADEMIC CERTIFICATIONS:**
- APS Certificate (Akademische Prüfstelle): Successfully completed academic verification by German Embassy New Delhi on December 19, 2024
- Direct university access qualification confirmed for German higher education
- Class X: 9.2 CGPA (CBSE)
- Class XII: 414/500 (CBSE)

**TECHNICAL SKILLS:**

*Programming Languages:*
- Python (Expert), C (Expert), Embedded C, JavaScript, TypeScript, Swift

*Embedded & Automotive:*
- CAN (Controller Area Network) protocols (Expert)
- UDS (Unified Diagnostic Services): $10, $11, $22, $2E, $27, $3E, $09
- ECU Development & Powertrain systems
- AUTOSAR, Bootloader functions
- Microcontrollers: JDP, IFX (Infineon)
- Sensors: Ultrasonic, Radar, Camera, ADC, DIO, PWM, SENT
- Communication Stack for ECU diagnosis and flash programming

*AI/ML & Data Science:*
- Machine Learning (90%), Deep Learning (85%)
- Frameworks: TensorFlow, PyTorch, Keras, Scikit-Learn
- LLM Tools: LangChain, Hugging Face, Llama 3.1
- Libraries: Pandas (90%), NumPy (88%), Seaborn, Beautiful Soup
- Data Analysis & Visualization
- Transformer architectures and semantic matching

*Backend & Web Development:*
- FastAPI (90%), Flask (88%), Django (85%)
- RESTful APIs
- Streamlit for data applications

*Cloud & DevOps:*
- AWS (85%), Azure (85%), Azure AI Foundry
- Docker (80%)
- Git, GitHub

*Development Tools & Software:*
- Vector Tools: CANoe, CANalyzer
- Bosch Tools: ASCET, EASEE (SDOM), ECUWorx, RequestOne
- Debugging: Universal Debug Engine (UDE)
- Version Control: Git, ClearQuest
- IDE: Visual Studio Code (including extension development)
- MidasGen

*Testing & Quality:*
- MISRA-C compliance
- Static code analysis
- Memory safety analysis
- Unit testing, integration testing, regression testing
- BFT (Basic Functionality Test)

**KEY PROJECTS:**

1. **Semantic Attribute Name Matching Research** (Current - 2025)
   - 318-pair annotated ground truth dataset from Saxon Open Data portals
   - Comparing traditional similarity measures vs Llama 3.1 8B for semantic matching
   - Privacy-preserving approach to Open Data integration
   - Comprehensive evaluation of Transformer architectures

2. **DMTL Pump Predictive Maintenance Model**
   - Machine learning model predicting pump replacement times
   - Achieved 30% reduction in maintenance downtime
   - Applied to Diagnostic Module Tank Leakage systems

3. **VS Code Extension with GitHub Copilot Integration**
   - Real-time MISRA-compliant code suggestions
   - Automated code review and quality assessment
   - Enhanced coding standards adherence

4. **Security Access Implementation ($27 UDS Service)**
   - AES-128 encryption algorithm
   - CSAI APIs integration
   - Enhanced automotive ECU security framework

5. **Image Steganography (B.Tech Final Year Project)**
   - LSB substitution technique
   - Secure confidential data transfer encrypted and embedded inside images
   - Demonstrated principles of cryptography and digital signal processing

6. **Algorithm Visualizer**
   - Python & Flask-based interactive tool
   - Visual demonstration of sorting algorithms using color changes and speed variations

7. **Research Summarization Tool**
   - LangChain + Hugging Face + Streamlit integration
   - Automated research paper analysis

8. **iOS Call Scheduling App**
   - SwiftUI development
   - Calendar integration and push notifications

9. **Google Assistant-based Home Automation**
   - NodeMCU microcontroller implementation
   - Sensor integration for user-friendly applications

**COMPETITIVE PROGRAMMING & ACHIEVEMENTS:**
- 4-star rating on CodeChef
- Represented Netaji Subhash Engineering College at ICPC Kanpur Regional Contest
- Department Badminton Championship Winner at Bosch
- Organized "Sambrama" sports event at Bosch

**CERTIFICATIONS & TRAINING:**
- Industrial Training: Essential Networks & Ethical Hacking (ISOEH - Indian School of Ethical Hacking)

**EXTRACURRICULAR & COMMUNITY:**
- Member of "Phoenix" - Cultural club at Netaji Subhash Engineering College
- Active participant in "Rotaract" - Social service club
- Organized food donation drives and educational sessions for underprivileged children
- Organized "Cybermix" coding event at annual tech fest
- Demonstrated Python organizational and leadership qualities

**LETTERS OF RECOMMENDATION:**

1. **Rohit Raj - Lead Engineer, Bosch Global Software Technologies**
   - Supervised Aditya for 3 years
   - Highlights: Extensive ECU experience, C/Python proficiency, CAN/UDS expertise
   - Notable: Identified root cause of critical 10ms/20ms CAN frame timing issue
   - Recognition: Star Performer every quarter since Q4 2023, promoted to Senior Engineer
   - Personal: Won department Badminton Championship, key organizer of Sambrama sports event

2. **Dr. Koushik Dutta - Associate Professor & Head, ECE Department, NSEC**
   - Fellow IEI, SMIEEE, LMInRaSS
   - Taught Electromagnetics, Analog Electronics courses
   - Top student among 10+ undergraduates
   - Excellent analytical capabilities and mature approach to complex mathematical problems
   - Eager learner with consistent effort in grasping difficult concepts
   - Strong propensity for interdisciplinary academics

3. **Dr. Shilpi Bose - Assistant Professor, CSE Department, NSEC**
   - Taught "Data Structures and Algorithms" and "C Programming"
   - Recognized for unique approach to problems from different angles
   - Developed "Algorithm Visualizer" project
   - 4-star CodeChef rating demonstrates problem-solving ability
   - Gained practical experience during Wikimedia Business and Logical Solutions internship
   - Active in Phoenix cultural club and Rotaract social service

4. **Dr. Saheli Sarkhel - Assistant Professor, ECE Department, NSEC**
   - SMIEEE credentials
   - Taught "Digital Electronic Circuits"
   - Grade: "O" (Outstanding) in the course
   - Highly motivated, eager for knowledge, always learning new technologies
   - Industrial training in Essential Networks & Ethical Hacking
   - Final year project: Image Steganography using LSB substitution
   - Out-of-the-box thinking and keen eye for detail in innovation and technology
   - Natural hard-working and responsible approach

**CONTACT INFORMATION:**
- Email: vkrm.aditya553@gmail.com
- German Phone: +49 15510469686
- Indian Phone: +91 8960599437
- WhatsApp: +91 8960599437
- LinkedIn: https://www.linkedin.com/in/avikram553/
- Indian Address: D65/477-B, Lahartara, Varanasi, 221002, Uttar Pradesh, India

**INSTRUCTIONS:**
- Be professional, enthusiastic, and concise
- Answer only questions about Aditya's professional background
- IMPORTANT: If someone just greets you (Hi, Hello, Hey, etc.), respond ONLY with: "Hi! How can I help you?" - DO NOT provide any profile information unless asked
- Only provide detailed information when specifically asked about it
- If asked about information not in the profile, say: "I don't have that information, but you can contact Aditya at vkrm.aditya553@gmail.com or +49 15510469686"
- Keep responses brief (2-4 sentences typically) unless detailed explanation is requested
- Highlight measurable achievements when relevant:
  * Star Performer EVERY quarter from Q4 2022 through Q3 2025
  * 30% reduction in maintenance downtime
  * 8.95 CGPA in B.Tech
  * 4-star CodeChef rating
  * 318-pair research dataset
  * Top 10% of undergraduate peers
- Emphasize current availability for Werkstudent positions, internships, or full-time opportunities in:
  * AI/ML Engineering
  * Embedded Software Development
  * Backend Development
  * Automotive Software Engineering
  * Data Engineering
- Don't volunteer all information at once - answer what was asked
- Greetings should get simple greetings back, not information dumps
- When discussing technical skills, connect them to concrete projects and achievements
- Highlight the combination of automotive domain expertise + AI/ML skills as a unique differentiator
- Mention academic research credibility when discussing ML/AI capabilities
"""
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

class ChatResponse(BaseModel):
    message: str

def query_huggingface(prompt: str) -> str:
    """Query Hugging Face API using InferenceClient"""
    if not HUGGINGFACE_API_KEY:
        error_msg = "HUGGINGFACE_API_KEY not configured. Please set it in environment variables."
        print(f"ERROR: {error_msg}")
        return error_msg
    
    try:
        print(f"Querying Hugging Face model: {MODEL_NAME}")
        
        # Initialize Inference Client with timeout
        # The client will automatically use the correct endpoint (router.huggingface.co)
        client = InferenceClient(
            token=HUGGINGFACE_API_KEY, 
            timeout=60
        )
        
        # Use chat_completion for conversational models
        response = client.chat_completion(
            messages=[{"role": "user", "content": prompt}],
            model=MODEL_NAME,
            max_tokens=512,
            temperature=0.7,
            top_p=0.9
        )
        
        # Extract the response text
        if response.choices and len(response.choices) > 0:
            message = response.choices[0].message.content
            print(f"✓ Received response from Hugging Face ({len(message) if message else 0} chars)")
            return message.strip() if message else "No response generated."
        else:
            print("WARNING: No choices in Hugging Face response")
            return "No response generated."
            
    except Exception as e:
        error_msg = str(e)
        print(f"ERROR querying Hugging Face: {error_msg}")
        
        # Provide helpful error messages
        if "loading" in error_msg.lower():
            return "The AI model is currently loading. Please try again in 20-30 seconds."
        elif "rate" in error_msg.lower() or "limit" in error_msg.lower():
            return "Rate limit reached. Please wait a moment and try again."
        elif "401" in error_msg or "unauthorized" in error_msg.lower():
            return "API key authentication failed. Please check your Hugging Face API key."
        elif "403" in error_msg or "forbidden" in error_msg.lower():
            return "Access denied. You may need to accept the model's terms on Hugging Face."
        elif "timeout" in error_msg.lower():
            return "Request timed out. The model may be busy. Please try again."
        else:
            return f"Error connecting to AI model: {error_msg}"

def query_llm(messages: List[Message]) -> str:
    """Query LLM with conversation context"""
    if not HUGGINGFACE_API_KEY:
        return "Please set your HUGGINGFACE_API_KEY in the .env file. Get one free at https://huggingface.co/settings/tokens"
    
    try:
        # Get the latest user message
        user_message = messages[-1].content if messages else ""
        
        # Check for simple greetings - respond immediately without calling AI
        greetings = ["hi", "hello", "hey", "hii", "hiii", "helo", "hola", "greetings"]
        user_lower = user_message.lower().strip().rstrip("!.,?")
        
        if user_lower in greetings:
            return "Hi! How can I help you?"
        
        # Build conversation history
        conversation = ""
        for msg in messages[:-1]:
            role = "Human" if msg.role == "user" else "Assistant"
            conversation += f"{role}: {msg.content}\n"
        
        # Build the full prompt
        full_prompt = SYSTEM_PROMPT + f"""

Previous conversation:
{conversation}

Current question: {user_message}

Answer (keep it brief and professional):"""
        
        # Query the model
        response = query_huggingface(full_prompt)
        
        # Clean up response
        if response.startswith("Error:"):
            return f"I encountered an issue: {response}. Please try again or contact Aditya at vkrm.aditya553@gmail.com"
        
        response = response.strip()
        
        # Remove any repeated system prompt or instructions
        if "You are ADI" in response:
            response = response.split("You are ADI")[0].strip()
        
        return response if response else "I apologize, but I couldn't generate a response. Please try again."
    
    except Exception as e:
        print(f"Error in query_llm: {e}")
        return f"I encountered an error: {str(e)}. Please try again or contact Aditya directly at vkrm.aditya553@gmail.com"

@app.get("/")
async def root():
    """Health check endpoint"""
    key_status = "configured" if HUGGINGFACE_API_KEY else "missing"
    key_preview = f"{HUGGINGFACE_API_KEY[:10]}..." if HUGGINGFACE_API_KEY else "not set"

    return {
        "status": "online",
        "service": "Portfolio Chatbot API",
        "model": MODEL_NAME,
        "framework": "Hugging Face Inference API + FastAPI",
        "api_key_status": key_status,
        "api_key_preview": key_preview,
        "python_version": sys.version,
        "cors": "Enabled for all *.onrender.com domains and localhost"
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": __import__("datetime").datetime.now().isoformat(),
        "huggingface_key_configured": bool(HUGGINGFACE_API_KEY),
        "model": MODEL_NAME
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat endpoint that processes messages and returns AI responses"""
    try:
        if not request.messages:
            raise HTTPException(status_code=400, detail="No messages provided")
        
        # Query the LLM
        response_text = query_llm(request.messages)
        
        return ChatResponse(message=response_text)
    
    except Exception as e:
        print(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
