import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Upload, MessageSquare, CheckCircle, Users, Award } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - AI Assistant Chat */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/95 backdrop-blur">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Vision Assistant</h3>
                  <p className="text-sm text-muted-foreground">Medical-Grade Analysis • GPT-4.1 Vision</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Upload retinal images for professional AI analysis or ask questions about eye health conditions
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm">
                  Hello! I'm your AI Vision Assistant. Upload a retinal image for professional analysis or ask me about eye health.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs">What is CNV?</Badge>
                <Badge variant="outline" className="text-xs">How to prevent diabetic retinopathy?</Badge>
                <Badge variant="outline" className="text-xs">What does Drusen indicate?</Badge>
                <Badge variant="outline" className="text-xs">Signs of glaucoma?</Badge>
                <Badge variant="outline" className="text-xs">Normal retinal appearance</Badge>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1 flex items-center space-x-2 border rounded-lg px-3 py-2">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground flex-1">Ask about retinal health conditions...</span>
                </div>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-xs text-warning-foreground">
                  <strong>Medical Disclaimer:</strong> This AI tool provides educational analysis only and is not a substitute for professional medical diagnosis.
                </p>
              </div>
            </Card>
          </div>
          
          {/* Right side - Main content */}
          <div className="space-y-6">
            <Badge className="bg-medical text-medical-foreground">
              Medical Grade AI • 95%+ Accuracy
            </Badge>
            
            <h1 className="text-5xl font-bold leading-tight">
              AI-Powered Retinal Health at Your{" "}
              <span className="text-medical">Fingertips</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Advanced deep learning technology for early detection of diabetic retinopathy, glaucoma, AMD, and other retinal conditions. Trusted by healthcare professionals worldwide.
            </p>
            
            <div className="flex space-x-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Analysis
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-medical" />
                <span className="text-sm text-muted-foreground">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-medical" />
                <span className="text-sm text-muted-foreground">FDA Guidelines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-warning" />
                <span className="text-sm text-muted-foreground">500+ Clinics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};