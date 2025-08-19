import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { AIAssistant } from "@/components/AIAssistant";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-50/50 to-blue-50/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - AI Assistant Chat */}
          <div className="space-y-6 order-2 lg:order-1">
            <AIAssistant />
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
              <Link to="/dashboard">
                <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 text-base">
                  Get Started
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-base">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:check-circle" className="h-5 w-5 text-medical" />
                <span className="text-sm text-slate-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:check-circle" className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-slate-600">FDA Guidelines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon icon="mdi:account-group" className="h-5 w-5 text-amber-600" />
                <span className="text-sm text-slate-600">500+ Clinics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};