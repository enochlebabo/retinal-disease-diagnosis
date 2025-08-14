import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Brain, Upload, BarChart3, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Real-Time Camera Capture",
    description: "Instant retinal image capture with optimized camera controls for mobile devices",
    details: [
      "Touch-friendly camera interface",
      "Automatic image optimization", 
      "Cross-platform compatibility",
      "High-resolution capture"
    ],
    color: "bg-primary"
  },
  {
    icon: Brain,
    title: "GPT-4.1 Vision Analysis", 
    description: "Advanced AI analysis for CNV, DME, Drusen, and normal retinal conditions",
    details: [
      "95%+ diagnostic accuracy",
      "Confidence scoring",
      "Multiple condition detection", 
      "Real-time processing"
    ],
    color: "bg-medical"
  },
  {
    icon: Upload,
    title: "Easy Image Upload",
    description: "Drag-and-drop interface with preview and high-quality processing", 
    details: [
      "Multiple file format support",
      "Batch processing capability",
      "Image preview and editing",
      "Cloud storage integration"
    ],
    color: "bg-violet-500"
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Comprehensive analysis reports with confidence scores and recommendations",
    details: [
      "PDF report generation", 
      "Historical trend analysis",
      "Clinical recommendations",
      "Shareable results"
    ],
    color: "bg-warning"
  },
  {
    icon: Shield,
    title: "Medical-Grade Security",
    description: "HIPAA-compliant data handling with appropriate medical disclaimers",
    details: [
      "End-to-end encryption",
      "HIPAA compliance", 
      "Secure data transmission",
      "Privacy controls"
    ],
    color: "bg-red-500"
  },
  {
    icon: Users,
    title: "Patient Management", 
    description: "Comprehensive patient tracking and history management for healthcare providers",
    details: [
      "Patient database management",
      "Appointment scheduling",
      "Progress tracking",
      "Clinical workflow integration"
    ],
    color: "bg-blue-500"
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Platform Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the comprehensive suite of AI-powered diagnostic tools designed for medical professionals and researchers.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card">
                  <CardContent className="p-8">
                    <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Features;