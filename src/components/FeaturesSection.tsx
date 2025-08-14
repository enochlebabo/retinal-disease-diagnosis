import { Card, CardContent } from "@/components/ui/card";
import { Camera, Brain, Upload, BarChart3, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Real-Time Capture",
    description: "Professional-grade camera integration with optimized controls for high-quality retinal imaging on any device",
    color: "bg-primary",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced deep learning models trained on thousands of cases for accurate detection of CNV, DME, Drusen, and more",
    color: "bg-medical",
  },
  {
    icon: Upload,
    title: "Seamless Upload",
    description: "Intuitive drag-and-drop interface with instant preview, batch processing, and cloud integration",
    color: "bg-violet-500",
  },
  {
    icon: BarChart3,
    title: "Clinical Reports",
    description: "Comprehensive diagnostic reports with confidence scores, recommendations, and shareable PDF exports",
    color: "bg-warning",
  },
  {
    icon: Shield,
    title: "Medical-Grade Security",
    description: "HIPAA-compliant infrastructure with end-to-end encryption and enterprise-level data protection",
    color: "bg-red-500",
  },
  {
    icon: Users,
    title: "Patient Management",
    description: "Complete EMR integration with patient tracking, appointment scheduling, and clinical workflow optimization",
    color: "bg-blue-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Advanced Medical AI Diagnostic Features</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Our cutting-edge technology combines GPT-4.1 Vision with specialized medical AI to deliver professional-grade retinal analysis with unparalleled accuracy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-slate-100 bg-white">
                <CardContent className="p-8 text-center">
                  <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};