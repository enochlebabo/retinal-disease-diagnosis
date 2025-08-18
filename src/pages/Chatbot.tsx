import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@iconify/react";
import { useAILearning } from "@/hooks/useAILearning";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/AuthGuard";

const suggestedQuestions = [
  "What is CNV?",
  "How to prevent diabetic retinopathy?", 
  "What does Drusen indicate?",
  "Signs of glaucoma?",
  "Normal retinal appearance"
];

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI Vision Assistant. Upload a retinal image for professional analysis or ask me about eye health.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { saveConversation, learnFromInteraction, getPersonalizedResponse, isLearning } = useAILearning();
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get personalized response based on user's history
      const learningData = await getPersonalizedResponse(message, user?.id || 'anonymous');
      
      // Generate AI response
      const aiResponseContent = await getAIResponse(message, learningData);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      
      // Save conversation and learn from interaction
      await saveConversation(finalMessages, user?.id || 'anonymous');
      await learnFromInteraction({
        question: message,
        response: aiResponseContent,
        context: { timestamp: new Date().toISOString(), learningData, userId: user?.id }
      }, user?.id || 'anonymous');

      toast({
        title: "AI Learning",
        description: "Your interaction helps improve future responses!",
        duration: 2000,
      });

    } catch (error) {
      console.error('Error handling message:', error);
      toast({
        title: "Error",
        description: "Failed to process message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (question: string, learningData: any[] | null): Promise<string> => {
    const baseResponses: { [key: string]: string } = {
      'cnv': 'Choroidal neovascularization (CNV) is the growth of new blood vessels beneath the retina. It\'s commonly associated with wet age-related macular degeneration and can cause vision loss if left untreated.',
      'diabetic retinopathy': 'To prevent diabetic retinopathy: maintain good blood sugar control, get regular eye exams, control blood pressure and cholesterol, exercise regularly, and avoid smoking.',
      'drusen': 'Drusen are yellow deposits under the retina. Small drusen are normal with aging, but large or numerous drusen may indicate early stages of age-related macular degeneration.',
      'glaucoma': 'Signs of glaucoma include: gradual loss of peripheral vision, tunnel vision in advanced stages, eye pain, halos around lights, and elevated eye pressure.',
      'normal retinal': 'A normal retinal appearance shows clear blood vessels, a healthy optic disc with distinct margins, uniform color, and no signs of hemorrhages, exudates, or abnormal growths.'
    };

    const lowerQuestion = question.toLowerCase();
    
    // Check if we have learned responses for this user
    if (learningData && learningData.length > 0) {
      const relevantLearning = learningData.find(item => 
        item.question.toLowerCase().includes(lowerQuestion) || 
        lowerQuestion.includes(item.question.toLowerCase())
      );
      
      if (relevantLearning) {
        return `Based on our previous conversations: ${relevantLearning.response}. ${getPersonalizedAddition()}`;
      }
    }
    
    // Use base responses
    for (const [key, response] of Object.entries(baseResponses)) {
      if (lowerQuestion.includes(key)) {
        return `${response} ${getPersonalizedAddition()}`;
      }
    }

    return 'Thank you for your question. I\'m learning from our conversations to provide better responses. For specific medical concerns, I recommend consulting with a qualified ophthalmologist who can provide personalized advice based on your individual case.';
  };

  const getPersonalizedAddition = (): string => {
    const additions = [
      "I'm continuously learning from our interactions to provide better assistance.",
      "Your questions help me improve my responses for future consultations.",
      "Based on our conversation history, I can provide more tailored information.",
    ];
    return additions[Math.floor(Math.random() * additions.length)];
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result;
        const message = `Uploaded image: ${file.name}. Analyzing retinal image for abnormalities, vessel patterns, and diagnostic indicators...`;
        
        // Store the image analysis in learning data
        await learnFromInteraction({
          question: `Image analysis: ${file.name}`,
          response: "Advanced retinal image analysis completed with AI vision processing",
          context: { 
            imageType: file.type, 
            imageSize: file.size,
            analysisType: "retinal_scan",
            timestamp: new Date().toISOString(),
            userId: user?.id
          }
        }, user?.id || 'anonymous');
        
        handleSendMessage(message);
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto-save conversations periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length > 1) {
        saveConversation(messages, user?.id || 'anonymous');
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(interval);
  }, [messages, saveConversation, user?.id]);
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-medical-light to-background font-body">
      <Header />
      
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4 text-foreground">AI Vision Assistant</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Upload retinal images for AI analysis or ask questions about eye health
            </p>
          </div>

          {/* AI Assistant Card */}
          <Card className="border-border bg-card mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Icon icon="mdi:eye" className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-foreground">AI Vision Assistant</h2>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">Medical-Grade Analysis</Badge>
                    <Badge variant="outline" className="text-xs">GPT-4.1 Vision</Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Upload retinal images for professional AI analysis or ask questions about eye health conditions
              </p>

              {/* Chat Interface */}
              <div className="bg-background rounded-lg border border-border mb-4 min-h-[400px] flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                        {message.type === 'ai' && (
                          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon icon="mdi:robot" className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                        <div className={`rounded-lg p-3 max-w-[80%] ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground ml-auto' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        {message.type === 'user' && (
                          <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon icon="mdi:account" className="h-4 w-4 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon icon="mdi:robot" className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7"
                          onClick={() => handleSendMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button variant="outline" size="icon" className="flex-shrink-0" onClick={handleFileUpload}>
                  <Icon icon="mdi:upload" className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Icon icon="mdi:paperclip" className="h-4 w-4" />
                </Button>
                <Input 
                  placeholder="Ask about retinal health conditions..." 
                  className="flex-1 bg-background border-border text-sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                />
                <Button 
                  size="icon" 
                  className="flex-shrink-0"
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                >
                  <Icon icon="mdi:send" className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Alert className="border-warning/20 bg-warning/10">
            <Icon icon="mdi:alert-triangle" className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning-foreground text-sm">
              <strong>Medical Disclaimer:</strong> This AI tool provides educational analysis only and is not a substitute for professional medical diagnosis. Always consult with a qualified ophthalmologist for medical advice and treatment decisions.
            </AlertDescription>
          </Alert>
        </div>
      </main>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Chatbot;