import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Upload, MessageSquare, CheckCircle, Users, Award } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-50/50 to-blue-50/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - AI Assistant Chat */}
          <div className="space-y-6 order-2 lg:order-1">
            <Card className="p-6 bg-card/95 backdrop-blur border-blue-100 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Vision Assistant</h3>
                  <p className="text-sm text-muted-foreground">Medical-Grade Analysis • GPT-4.1 Vision</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Upload retinal images for professional AI analysis or ask questions about eye health conditions
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                <p className="text-sm text-blue-900">
                  Hello! I'm your AI Vision Assistant. Upload a retinal image for professional analysis or ask me about eye health.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">What is CNV?</Badge>
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">How to prevent diabetic retinopathy?</Badge>
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">What does Drusen indicate?</Badge>
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">Signs of glaucoma?</Badge>
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">Normal retinal appearance</Badge>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <div className="flex-1 flex items-center space-x-2 border border-blue-200 rounded-lg px-3 py-2 bg-white">
                  <Upload className="h-4 w-4 text-blue-500" />
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground flex-1">Ask about retinal health conditions...</span>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <strong>Medical Disclaimer:</strong> This AI tool provides educational analysis only and is not a substitute for professional medical diagnosis. Always consult with a qualified ophthalmologist for medical advice and treatment decisions.
                </p>
              </div>
            </Card>
          </div>
          
          {/* Right side - Main content */}
          <div className="space-y-6 order-1 lg:order-2">
            <Badge className="bg-medical text-medical-foreground inline-flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Medical Grade AI • 95%+ Accuracy</span>
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
              AI-Powered Retinal Health at Your{" "}
              <span className="text-medical">Fingertips</span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              Advanced deep learning technology for early detection of diabetic retinopathy, glaucoma, AMD, and other retinal conditions. Trusted by healthcare professionals worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 text-base">
                Start Analysis
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-base">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-medical" />
                <span className="text-sm text-slate-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-slate-600">FDA Guidelines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-amber-600" />
                <span className="text-sm text-slate-600">500+ Clinics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};