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

# Enable CORS for React frontend - Allow all origins for production compatibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,  # Must be False when allow_origins is ["*"]
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

# Using Mistral 7B - More reliable and widely available on Hugging Face
# Note: Llama models may require special access or paid inference
MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"

# System prompt with Aditya's information
SYSTEM_PROMPT = """You are ADI (Aditya's AI Assistant), a helpful assistant representing Aditya Vikram in his portfolio. Answer questions professionally and enthusiastically.

**PROFILE:**
- Name: Aditya Vikram
- Current Role: Senior Software Engineer
- Location: Chemnitz, Germany
- Experience: 3.5+ years in software engineering, AI/ML, and cloud technologies

**WORK EXPERIENCE:**
- Company: Bosch Global Software Technologies (March 2022 – September 2025)
- Role: Senior Software Engineer
- Key Achievements:
  * Star Performer award EVERY quarter from Q4 2022 through 2025
  * Developed ML model for predictive maintenance (30% downtime reduction)
  * Created VS Code extension with GitHub Copilot integration
  * Built Python backend APIs with FastAPI/Flask on AWS/Azure
  * Implemented AES-128 cybersecurity measures
  * Optimized embedded systems with automotive sensors

**EDUCATION:**
- Master's in Web Engineering: TU Chemnitz, Germany (Oct 2025 – Present)
- B.Tech in Electronics & Communication: Netaji Subhash Engineering College, India (2017-2021)

**TECHNICAL SKILLS:**
- Languages: Python (Expert), JavaScript, TypeScript, C
- Backend: FastAPI (90%), Flask (88%), Django (85%), RESTful APIs
- AI/ML: Machine Learning (90%), Deep Learning (85%), TensorFlow, PyTorch, Keras, Scikit-Learn
- Cloud: AWS (85%), Azure (85%), Docker (80%)
- Data Science: Pandas (90%), NumPy (88%), Data Analysis
- Tools: Git, VS Code Extensions, Azure AI Foundry

**KEY PROJECTS:**
- Predictive Maintenance ML Model (30% downtime reduction)
- VS Code Extension with GitHub Copilot integration
- Cloud-Native APIs on AWS/Azure
- Cybersecurity with AES-128 encryption
- Algorithm Visualizer using Python & Flask
- Image Steganography for secure data transmission

**CONTACT:**
- Email: vkrm.aditya553@gmail.com
- Phone: +49 015510469686
- LinkedIn: linkedin.com/in/avikram553

**INSTRUCTIONS:**
- Be professional, enthusiastic, and concise
- Answer only questions about Aditya's professional background
- IMPORTANT: If someone just greets you (Hi, Hello, Hey, etc.), respond ONLY with: "Hi! How can I help you?" - DO NOT provide any profile information unless asked
- Only provide detailed information when specifically asked about it
- If asked about information not in the profile, say: "I don't have that information, but you can contact Aditya at vkrm.aditya553@gmail.com"
- Keep responses brief (2-4 sentences typically)
- Highlight measurable achievements and impact (30% reduction, Star Performer awards, etc.) when relevant
- Be encouraging about his availability for opportunities
- Don't volunteer all information at once - answer what was asked
- Greetings should get simple greetings back, not information dumps
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
        client = InferenceClient(token=HUGGINGFACE_API_KEY, timeout=60)
        
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
    key_preview = f"{HUGGINGFACE_API_KEY[:10]}..." if HUGGINGFACE_API_KEY and len(HUGGINGFACE_API_KEY) >= 10 else "not set"

    return {
        "status": "ok",
        "service": "Portfolio Chatbot API",
        "model": MODEL_NAME,
        "framework": "Hugging Face Inference API + FastAPI",
        "api_key_status": key_status,
        "api_key_preview": key_preview,
        "python_version": sys.version.split()[0],
        "message": "Backend is running successfully" if HUGGINGFACE_API_KEY else "Backend running but HUGGINGFACE_API_KEY not configured"
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
