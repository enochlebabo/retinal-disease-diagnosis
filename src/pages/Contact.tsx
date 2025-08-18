import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our platform? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">Get in Touch</h2>
              
              <div className="space-y-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:phone" className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-foreground">Phone Support</h3>
                        <p className="text-lg font-medium text-primary mb-1">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-medical rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:email" className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-foreground">Email Support</h3>
                        <p className="text-lg font-medium text-medical mb-1">support@retinal-ai.com</p>
                        <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:map-marker" className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 text-foreground">Office Address</h3>
                        <p className="text-muted-foreground">
                          123 Healthcare Technology Blvd<br />
                          Medical District, CA 90210<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Send us a Message</h3>
                  <p className="text-muted-foreground mb-6">
                    Have questions about our platform? We'd love to hear from you.
                  </p>
                  
                  <form className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your full name" 
                        className="mt-2 bg-background border-border"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="mt-2 bg-background border-border"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-foreground">Subject</Label>
                      <Input 
                        id="subject" 
                        placeholder="What is this regarding?" 
                        className="mt-2 bg-background border-border"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-foreground">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..." 
                        rows={5}
                        className="mt-2 bg-background border-border resize-none"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg">
                      <Icon icon="mdi:send" className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;