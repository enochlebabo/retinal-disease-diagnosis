import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const diseases = [
  {
    title: "Diabetic Retinopathy",
    description: "A diabetes complication that affects the eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). Early detection and treatment can prevent vision loss."
  },
  {
    title: "Age-Related Macular Degeneration (AMD)",
    description: "A disease that blurs the sharp, central vision needed for activities like reading and driving. It affects the part of the eye that allows you to see fine detail (macula)."
  },
  {
    title: "Glaucoma",
    description: "A group of eye diseases that can cause vision loss and blindness by damaging the optic nerve. Often called the \"silent thief of sight\" because it usually has no early symptoms."
  },
  {
    title: "Drusen",
    description: "Yellow deposits under the retina that may be an early sign of macular degeneration. Regular monitoring is important for early intervention."
  }
];

const preventionTips = [
  {
    icon: Eye,
    title: "Regular Eye Exams",
    tips: [
      "Annual comprehensive eye exams",
      "Early detection saves vision",
      "Age-appropriate screening schedules", 
      "Family history considerations"
    ]
  },
  {
    icon: Heart,
    title: "Diabetes Management",
    tips: [
      "Control blood sugar levels",
      "Maintain healthy blood pressure",
      "Regular HbA1c monitoring",
      "Medication compliance"
    ]
  },
  {
    icon: Shield,
    title: "Lifestyle Factors",
    tips: [
      "Quit smoking",
      "Maintain healthy weight",
      "Regular exercise",
      "Balanced nutrition"
    ]
  },
  {
    icon: Sun,
    title: "UV Protection",
    tips: [
      "Wear UV-blocking sunglasses",
      "Use wide-brimmed hats",
      "Avoid peak sun hours",
      "Regular UV exposure assessment"
    ]
  }
];

const Education = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Eye Health Education</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about retinal diseases, prevention strategies, and maintaining optimal eye health throughout your life.
            </p>
          </div>

          {/* Understanding Retinal Diseases */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon icon="mdi:book-open" className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Understanding Retinal Diseases</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {diseases.map((disease, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{disease.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{disease.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Prevention and Care Tips */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-medical rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Prevention and Care Tips</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {preventionTips.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {category.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                            {tip}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Educational Resources */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-foreground">Educational Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon icon="mdi:file-document" className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Retinal Health Guide</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive guide covering all aspects of retinal health and disease prevention.</p>
                  <Button variant="outline" className="w-full">PDF Download</Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-medical rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Educational Videos</h3>
                  <p className="text-muted-foreground mb-4">Watch expert explanations of retinal conditions and prevention strategies.</p>
                  <Button variant="outline" className="w-full">Video Library</Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Research Papers</h3>
                  <p className="text-muted-foreground mb-4">Access the latest scientific literature on retinal diseases and AI diagnostics.</p>
                  <Button variant="outline" className="w-full">Scientific Literature</Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Education;