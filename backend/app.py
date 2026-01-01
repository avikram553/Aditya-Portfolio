from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

# Load environment variables
load_dotenv()

app = FastAPI(title="Portfolio Chatbot API - Llama 3.1 + LangChain")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8081", "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hugging Face API configuration
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY", "")

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
- If someone greets you (Hi, Hello, Hey), respond with a warm greeting and ask what they'd like to know
- Only provide detailed information when specifically asked
- If asked about information not in the profile, say: "I don't have that information, but you can contact Aditya at vkrm.aditya553@gmail.com"
- Keep responses brief (2-4 sentences typically)
- Highlight measurable achievements and impact (30% reduction, Star Performer awards, etc.) when relevant
- Be encouraging about his availability for opportunities
- Don't volunteer all information at once - answer what was asked
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
        return "Please set your HUGGINGFACE_API_KEY in the .env file."
    
    try:
        # Initialize Inference Client
        client = InferenceClient(token=HUGGINGFACE_API_KEY)
        
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
            return message.strip() if message else "No response generated."
        else:
            return "No response generated."
            
    except Exception as e:
        error_msg = str(e)
        print(f"Error querying Hugging Face: {error_msg}")
        
        # Check if it's a model loading error
        if "loading" in error_msg.lower():
            return "The AI model is currently loading. Please try again in a moment (usually takes 20-30 seconds)."
        elif "rate" in error_msg.lower() or "limit" in error_msg.lower():
            return "Rate limit reached. Please wait a moment and try again."
        else:
            return f"Error: {error_msg}"

def query_llm(messages: List[Message]) -> str:
    """Query LLM with conversation context"""
    if not HUGGINGFACE_API_KEY:
        return "Please set your HUGGINGFACE_API_KEY in the .env file. Get one free at https://huggingface.co/settings/tokens"
    
    try:
        # Build conversation history
        conversation = ""
        for msg in messages[:-1]:
            role = "Human" if msg.role == "user" else "Assistant"
            conversation += f"{role}: {msg.content}\n"
        
        # Get the latest user message
        user_message = messages[-1].content if messages else ""
        
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
    return {
        "status": "online",
        "service": "Portfolio Chatbot API",
        "model": MODEL_NAME,
        "framework": "Hugging Face Inference API + FastAPI",
        "api_key_configured": bool(HUGGINGFACE_API_KEY)
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
