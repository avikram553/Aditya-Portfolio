import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MessageBubble } from './MessageBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowLlamaProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindowLlama: React.FC<ChatWindowLlamaProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm ADI, Aditya's AI assistant. Ask me anything about Aditya's experience, skills, projects, or achievements! 🚀"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Backend URL - use environment variable in production, localhost in development
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  // Log backend URL on mount for debugging
  useEffect(() => {
    console.log('Chatbot - Backend URL:', BACKEND_URL);
    console.log('Chatbot - Environment:', import.meta.env.MODE);
  }, []);

  // Check backend status
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/`);
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (error) {
        setBackendStatus('offline');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [BACKEND_URL]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to:', `${BACKEND_URL}/api/chat`);
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || "I apologize, but I couldn't generate a response. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      let errorContent = "I'm having trouble connecting to the AI backend.";

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorContent = `Cannot connect to backend at ${BACKEND_URL}. This might be a CORS issue or the backend is not accessible. Please check the browser console for details.`;
      } else if (error instanceof Error && error.message.includes('status')) {
        errorContent = `Backend returned an error: ${error.message}. Please check the backend logs for details.`;
      }

      errorContent += " You can contact Aditya directly at vkrm.aditya553@gmail.com";

      const errorMessage: Message = {
        role: 'assistant',
        content: errorContent,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setBackendStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">ADI - Aditya's AI Assistant</h3>
          <p className="text-xs flex items-center gap-2">
            {backendStatus === 'checking' && '🟡 Checking...'}
            {backendStatus === 'online' && '🟢 Connected to Qwen 2.5 AI'}
            {backendStatus === 'offline' && '🔴 Backend Offline'}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <MessageBubble key={index} role={message.role} content={message.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl px-4 py-3 max-w-[85%] shadow-md">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">ADI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        {backendStatus === 'offline' && (
          <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
            ⚠️ Backend offline. Start it with: <code className="bg-red-100 px-1 rounded">cd backend && uvicorn app:app --reload</code>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Aditya..."
            disabled={isLoading || backendStatus === 'offline'}
            className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim() || backendStatus === 'offline'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindowLlama;
