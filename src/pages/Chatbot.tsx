import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, Upload, Paperclip, Send, AlertTriangle } from "lucide-react";

const suggestedQuestions = [
  "What is CNV?",
  "How to prevent diabetic retinopathy?", 
  "What does Drusen indicate?",
  "Signs of glaucoma?",
  "Normal retinal appearance"
];

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">AI Vision Assistant</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload retinal images for AI analysis or ask questions about eye health
            </p>
          </div>

          {/* AI Assistant Card */}
          <Card className="border-border bg-card mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">AI Vision Assistant</h2>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary">Medical-Grade Analysis</Badge>
                    <Badge variant="outline">GPT-4.1 Vision</Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Upload retinal images for professional AI analysis or ask questions about eye health conditions
              </p>

              {/* Chat Interface */}
              <div className="bg-background rounded-lg border border-border p-6 mb-6 min-h-[400px] flex flex-col">
                {/* AI Message */}
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <p className="text-foreground text-sm">
                      Hello! I'm your AI Vision Assistant. Upload a retinal image for professional analysis or ask me about eye health.
                    </p>
                  </div>
                </div>

                {/* Suggested Questions */}
                <div className="mt-auto">
                  <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedQuestions.map((question, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-8"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input 
                  placeholder="Ask about retinal health conditions..." 
                  className="flex-1 bg-background border-border"
                />
                <Button size="icon" className="flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Alert className="border-warning/20 bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning-foreground">
              <strong>Medical Disclaimer:</strong> This AI tool provides educational analysis only and is not a substitute for professional medical diagnosis. Always consult with a qualified ophthalmologist for medical advice and treatment decisions.
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chatbot;