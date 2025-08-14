import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Retinal-AI</span>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Auth Card */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Welcome Back</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your credentials to access your account
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="login-email" className="text-foreground">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="doctor@example.com"
                        className="mt-2 bg-background border-border"
                        defaultValue="doctor@example.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password" className="text-foreground">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        className="mt-2 bg-background border-border"
                      />
                    </div>
                    
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Create Account</h2>
                  <p className="text-sm text-muted-foreground">
                    Join Retinal-AI to access advanced diagnostic tools
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name" className="text-foreground">First Name</Label>
                        <Input
                          id="first-name"
                          placeholder="Dr. John"
                          className="mt-2 bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name" className="text-foreground">Last Name</Label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          className="mt-2 bg-background border-border"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="doctor@hospital.com"
                        className="mt-2 bg-background border-border"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        className="mt-2 bg-background border-border"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirm-password" className="text-foreground">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="mt-2 bg-background border-border"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;