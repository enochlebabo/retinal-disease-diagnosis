import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">About Retinal-AI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing early detection and prevention of retinal diseases through cutting-edge artificial intelligence technology.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Retinal-AI is dedicated to revolutionizing early detection and prevention of retinal diseases through cutting-edge artificial intelligence technology. We believe that everyone deserves access to advanced diagnostic tools that can help preserve vision and improve quality of life.
            </p>
          </section>

          {/* Technology Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Technology</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our platform leverages GPT-4.1 Vision technology and advanced deep learning algorithms to analyze retinal images with 95%+ accuracy. We specialize in detecting:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Diabetic Retinopathy
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Choroidal Neovascularization (CNV)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Diabetic Macular Edema (DME)
                </li>
              </ul>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Drusen deposits
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Glaucoma indicators
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Age-related Macular Degeneration
                </li>
              </ul>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Team</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a team of ophthalmologists, AI researchers, and healthcare technology experts committed to making advanced retinal diagnostics accessible to healthcare providers and patients worldwide. Our interdisciplinary approach ensures that our technology meets the highest standards of medical accuracy and usability.
            </p>
          </section>

          {/* Values Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-foreground">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:brain" className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Accuracy</h3>
                  </div>
                  <p className="text-muted-foreground">
                    We maintain the highest standards of diagnostic precision through continuous AI model improvement and validation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-medical rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:eye" className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Accessibility</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Making advanced retinal screening available to healthcare providers regardless of location or resources.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:shield-check" className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Privacy</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Protecting patient data with enterprise-grade security and HIPAA compliance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Icon icon="mdi:account-group" className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Innovation</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Continuously advancing AI technology to improve diagnostic capabilities and patient outcomes.
                  </p>
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

export default About;