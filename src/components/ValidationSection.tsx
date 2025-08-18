import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";

const validations = [
  {
    icon: "mdi:check-circle",
    title: "Peer Reviewed",
    description: "Published in leading ophthalmology journals with clinical validation",
    color: "bg-medical",
  },
  {
    icon: "mdi:shield-check",
    title: "FDA Compliant",
    description: "Meets FDA guidelines for AI/ML-based medical device software",
    color: "bg-primary",
  },
  {
    icon: "mdi:trophy",
    title: "Award Winning",
    description: "Recognition from international medical AI and innovation awards",
    color: "bg-warning",
  },
];

export const ValidationSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Clinical Evidence & Validation</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {validations.map((validation, index) => {
            return (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-slate-100 group hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`${validation.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon icon={validation.icon} className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">{validation.title}</h3>
                  <p className="text-slate-600">{validation.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};