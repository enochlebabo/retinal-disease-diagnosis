import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: string;
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Vision Assistant. Upload a retinal image for professional analysis or ask me about eye health conditions.',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(Date.now().toString());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const commonQuestions = [
    "What is CNV?",
    "How to prevent diabetic retinopathy?", 
    "What does Drusen indicate?",
    "Signs of glaucoma?",
    "Normal retinal appearance"
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        toast.success('Image selected for analysis');
      } else {
        toast.error('Please select an image file');
      }
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const sendMessage = async (messageText?: string) => {
    const message = messageText || inputMessage.trim();
    if (!message && !selectedFile) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message || 'Please analyze this retinal image.',
      image: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      let imageData = null;
      if (selectedFile) {
        imageData = await convertFileToBase64(selectedFile);
      }

      const { data, error } = await supabase.functions.invoke('ai-vision-assistant', {
        body: {
          message,
          image: imageData,
          sessionId
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again or contact support if the problem persists.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="p-6 bg-card/95 backdrop-blur border-blue-100 shadow-lg h-full max-h-[600px] flex flex-col">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Icon icon="mdi:eye" className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI Vision Assistant</h3>
          <p className="text-sm text-muted-foreground">Medical-Grade Analysis • GPT-4.1 Vision</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[200px] max-h-[350px]">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-blue-50 border border-blue-100'
            }`}>
              <div className="flex items-start gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-primary-foreground/20' : 'bg-primary'
                }`}>
                  <Icon 
                    icon={message.role === 'user' ? 'mdi:account' : 'mdi:robot'} 
                    className={`h-4 w-4 ${
                      message.role === 'user' ? 'text-primary-foreground' : 'text-primary-foreground'
                    }`} 
                  />
                </div>
                <div className="flex-1">
                  {message.image && (
                    <img 
                      src={message.image} 
                      alt="Uploaded retinal image" 
                      className="max-w-full h-auto rounded mb-2 max-h-32 object-cover"
                    />
                  )}
                  <p className={`text-sm ${
                    message.role === 'user' ? 'text-primary-foreground' : 'text-blue-900'
                  }`}>
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Icon icon="mdi:robot" className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {commonQuestions.map((question, index) => (
          <Badge 
            key={index}
            variant="outline" 
            className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => sendMessage(question)}
          >
            {question}
          </Badge>
        ))}
      </div>

      {/* File Upload Area */}
      {selectedFile && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:image" className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">Image ready for analysis: {selectedFile.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedFile(null)}
              className="h-6 w-6 p-0"
            >
              <Icon icon="mdi:close" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex space-x-2">
        <div className="flex-1 flex items-center space-x-2 border border-blue-200 rounded-lg px-3 py-2 bg-white">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => fileInputRef.current?.click()}
            className="p-1"
          >
            <Icon icon="mdi:upload" className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1"
          >
            <Icon icon="mdi:paperclip" className="h-4 w-4" />
          </Button>
          <input
            type="text"
            placeholder="Ask about retinal health conditions..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-sm"
            disabled={isLoading}
          />
        </div>
        <Button 
          onClick={() => sendMessage()}
          disabled={isLoading || (!inputMessage.trim() && !selectedFile)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Icon icon="mdi:send" className="h-4 w-4" />
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-800">
          <strong>Medical Disclaimer:</strong> This AI tool provides educational analysis only and is not a substitute for professional medical diagnosis. Always consult with a qualified ophthalmologist for medical advice and treatment decisions.
        </p>
      </div>
      
      {!user && (
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">
            <Icon icon="mdi:information" className="h-3 w-3 inline mr-1" />
            Sign in to save your conversation history
          </p>
        </div>
      )}
    </Card>
  );
};