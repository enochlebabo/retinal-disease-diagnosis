import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "95.1%",
    label: "Diagnostic Accuracy",
    subtitle: "Validated across 10,000+ cases",
    color: "text-medical",
  },
  {
    value: "2,000+",
    label: "Cases Analyzed Monthly",
    subtitle: "Growing 30% each quarter",
    color: "text-primary",
  },
  {
    value: "500+",
    label: "Healthcare Providers",
    subtitle: "Across 25 countries",
    color: "text-warning",
  },
  {
    value: "98.8%",
    label: "User Satisfaction",
    subtitle: "Based on physician feedback",
    color: "text-violet-600",
  },
];

export const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">Trusted by Healthcare Professionals Worldwide</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our AI diagnostic platform delivers clinical-grade accuracy with measurable results
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 bg-white border-slate-100">
              <CardContent className="p-8">
                <div className={`text-5xl lg:text-6xl font-bold mb-3 ${stat.color}`}>
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{stat.label}</h3>
                <p className="text-sm text-slate-600">{stat.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};