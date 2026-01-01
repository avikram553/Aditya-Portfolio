# Llama 3.1 8B Chatbot Integration Guide

## 🎉 Setup Complete!

Your portfolio now has a fully functional AI chatbot powered by **Llama 3.1 8B** using **LangChain** and **Hugging Face**.

---

## 🚀 Current Status

### ✅ Backend (Python + FastAPI + LangChain)
- **Running on**: http://localhost:8000
- **Model**: meta-llama/Llama-3.1-8B-Instruct
- **Framework**: LangChain + Hugging Face Hub
- **API Key**: Configured in `/backend/.env`

### ✅ Frontend (React + TypeScript + Vite)
- **Running on**: http://localhost:8081
- **UI Component**: ChatWindowLlama.tsx
- **Status Indicator**: Shows backend connection status
- **Auto-reconnect**: Checks backend every 10 seconds

---

## 📁 Project Structure

```
Aditya-Portfolio-main/
├── backend/
│   ├── app.py                 # FastAPI + LangChain + Llama 3.1
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Hugging Face API key
│
├── src/
│   └── components/
│       └── Chatbot/
│           ├── ChatbotContainer.tsx   # Main container
│           ├── ChatButton.tsx         # Floating button
│           ├── ChatWindowLlama.tsx    # Chat UI with Llama
│           └── MessageBubble.tsx      # Message display
```

---

## 🏃 How to Run

### Start Backend (Terminal 1)
```bash
cd /Users/adityavikram/Downloads/Aditya-Portfolio-main/backend
/Users/adityavikram/Downloads/Aditya-Portfolio-main/.venv/bin/python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### Start Frontend (Terminal 2)
```bash
cd /Users/adityavikram/Downloads/Aditya-Portfolio-main
export PATH="/opt/homebrew/bin:$PATH"
npm run dev
```

### Open in Browser
Navigate to: **http://localhost:8081**

---

## 🤖 Chatbot Features

### AI Capabilities
- **Powered by**: Llama 3.1 8B Instruct (via Hugging Face)
- **Framework**: LangChain for conversation management
- **Response Time**: 
  - First message: 20-30 seconds (model loading)
  - Subsequent messages: 2-5 seconds
- **Knowledge**: Comprehensive information about Aditya Vikram
  - Work experience (Bosch, Star Performer awards)
  - Technical skills (Python, FastAPI, ML/AI, Cloud)
  - Projects (30% downtime reduction, VS Code extensions)
  - Education (TU Chemnitz, NSEC India)
  - Contact details

### UI Features
- **Backend Status Indicator**: 
  - 🟡 Checking... (initial connection)
  - 🟢 Connected to Llama 3.1 8B
  - 🔴 Backend Offline
- **Auto-reconnect**: Checks backend every 10 seconds
- **Error Handling**: Clear messages if backend is down
- **Conversation History**: Maintains context across messages
- **Typing Indicator**: Shows when AI is thinking
- **Auto-scroll**: Automatically scrolls to latest message

---

## 🔑 API Key Configuration

Your Hugging Face API key is already configured in `/backend/.env`:
```
HUGGINGFACE_API_KEY=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
```

To get a new API key:
1. Go to https://huggingface.co/settings/tokens
2. Create a new token (read access is sufficient)
3. Update the key in `/backend/.env`

---

## 📝 System Prompt

The chatbot is configured with a comprehensive system prompt containing:
- Aditya's full professional profile
- Work experience at Bosch (3.5+ years, Star Performer every quarter)
- Technical skills (Python 90%, FastAPI 90%, ML/AI 90%, AWS/Azure 85%)
- Key projects (predictive maintenance with 30% downtime reduction)
- Education (Master's at TU Chemnitz, B.Tech in ECE)
- Contact information (vkrm.aditya553@gmail.com, +49 015510469686)

---

## 🛠️ Tech Stack

### Backend
- **Python**: 3.9.6
- **FastAPI**: 0.115.6
- **LangChain**: 0.3.13
- **LangChain Community**: 0.3.13
- **Hugging Face Hub**: 0.27.0
- **Uvicorn**: 0.34.0

### Frontend
- **React**: 18.3.1
- **TypeScript**: 5.6.2
- **Vite**: 7.2.2
- **Tailwind CSS**: 3.4.17
- **Shadcn UI**: Custom components

### AI Model
- **Model**: meta-llama/Llama-3.1-8B-Instruct
- **Provider**: Hugging Face Inference API
- **Framework**: LangChain
- **Temperature**: 0.7
- **Max Tokens**: 512

---

## 🧪 Testing the Chatbot

Try these questions:
1. "What is Aditya's experience?"
2. "Tell me about his achievements at Bosch"
3. "What are his technical skills?"
4. "What projects has he worked on?"
5. "How can I contact him?"
6. "What is his educational background?"

---

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check if port 8000 is already in use
lsof -ti:8000 | xargs kill -9

# Restart backend
cd backend
/Users/adityavikram/Downloads/Aditya-Portfolio-main/.venv/bin/python -m uvicorn app:app --reload
```

### Frontend Shows "Backend Offline"
1. Check if backend is running: http://localhost:8000
2. Should return JSON with status: "online"
3. If not, restart the backend

### Model Loading Issues
- First response takes 20-30 seconds (normal for model loading)
- If it takes longer, check Hugging Face API status
- Alternative: Try Mistral-7B by changing MODEL_NAME in app.py

### Import Errors in app.py
```bash
# Reinstall dependencies
cd backend
/Users/adityavikram/Downloads/Aditya-Portfolio-main/.venv/bin/pip install -r requirements.txt
```

---

## 🔄 Alternative Models

If Llama 3.1 has issues, you can try other models:

### In `/backend/app.py`, change line 29:
```python
# Current:
MODEL_NAME = "meta-llama/Llama-3.1-8B-Instruct"

# Alternative 1: Mistral 7B (faster, more reliable)
MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"

# Alternative 2: Llama 2 7B
MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"

# Alternative 3: Falcon 7B
MODEL_NAME = "tiiuae/falcon-7b-instruct"
```

---

## 📊 Performance Notes

### Response Times
- **Model Loading**: 20-30 seconds (first message only)
- **Subsequent Messages**: 2-5 seconds
- **Backend Status Check**: Every 10 seconds

### Rate Limits (Hugging Face Free Tier)
- **Requests**: Varies by model, typically sufficient for development
- **If Rate Limited**: Wait a few minutes or upgrade to Hugging Face Pro

---

## 🎨 UI Customization

### Colors
The chatbot uses gradient colors matching your portfolio:
- **Primary**: Blue (#3B82F6) to Purple (#9333EA)
- **User Messages**: Blue gradient
- **AI Messages**: White with border
- **Status Indicator**: 🟢 Green (online), 🔴 Red (offline), 🟡 Yellow (checking)

### Styling
All styles are in `/src/components/Chatbot/ChatWindowLlama.tsx`
- Uses Tailwind CSS classes
- Shadcn UI components for consistency
- Responsive design (fixed width: 384px)

---

## 🚦 Next Steps

### Recommended Enhancements
1. **Add Conversation Memory**: Store chat history in localStorage
2. **Add More Context**: Include links to projects/resume in responses
3. **Add Voice Input**: Integrate Web Speech API
4. **Add Analytics**: Track popular questions
5. **Add Typing Animation**: Show text appearing character by character

### Deployment
1. **Backend**: Deploy to Railway, Render, or Heroku
2. **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
3. **Update CORS**: Add your production domain to `allow_origins` in app.py

---

## 📞 Support

If you encounter issues:
1. Check both terminal outputs for errors
2. Verify Hugging Face API key is valid
3. Ensure both servers are running on correct ports
4. Check browser console for frontend errors

---

## ✨ Features Implemented

✅ Llama 3.1 8B integration with LangChain  
✅ FastAPI backend with CORS support  
✅ React frontend with TypeScript  
✅ Backend status indicator (🟢/🔴/🟡)  
✅ Conversation history management  
✅ Error handling and user feedback  
✅ Auto-scroll to latest message  
✅ Typing indicator during AI response  
✅ Comprehensive system prompt with Aditya's info  
✅ Professional UI with gradient styling  

---

## 🎉 You're All Set!

Your AI-powered portfolio chatbot is now live at **http://localhost:8081**

The chatbot will intelligently answer questions about Aditya using the Llama 3.1 8B model via LangChain!
