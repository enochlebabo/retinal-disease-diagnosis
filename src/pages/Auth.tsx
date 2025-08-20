import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  
  const { signIn, signUp, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await signIn(email, password)
    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    
    if (!agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    if (!role) {
      alert("Please select your role")
      return
    }
    
    setIsLoading(true)
    
    // Sign up the user
    const { data, error } = await signUp(email, password, {
      display_name: fullName
    })
    
    // If signup successful and user is created, insert role into user_roles table
    if (data?.user && !error) {
      const roleMapping = {
        "Patient/User": "user",
        "Healthcare Provider": "clinician", 
        "Administrator": "admin"
      }
      
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: data.user.id,
          role: roleMapping[role as keyof typeof roleMapping]
        })
      
      if (roleError) {
        console.error('Error setting user role:', roleError)
      }
    }
    
    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
    
    if (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Icon icon="mdi:eye" className="h-6 w-6 text-primary-foreground" />
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
                <form onSubmit={handleLogin} className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Welcome Back</h2>
                  <p className="text-sm text-muted-foreground">
                    Sign in to access your retinal analysis dashboard
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="login-email" className="text-foreground">Email Address</Label>
                      <div className="relative mt-2">
                        <Icon icon="mdi:email" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-background border-border"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password" className="text-foreground">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        className="mt-2 bg-background border-border"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">OR CONTINUE WITH</span>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <Icon icon="mdi:google" className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Create Account</h2>
                  <p className="text-sm text-muted-foreground">
                    Join our platform to start analyzing retinal images
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full-name" className="text-foreground">Full Name</Label>
                      <Input
                        id="full-name"
                        placeholder="Dr. John Smith"
                        className="mt-2 bg-background border-border"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="john.smith@hospital.com"
                        className="mt-2 bg-background border-border"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-foreground">Role</Label>
                      <Select value={role} onValueChange={setRole} required>
                        <SelectTrigger className="mt-2 bg-background border-border">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Patient/User">
                            <div className="flex items-center gap-2">
                              <Icon icon="mdi:account" className="h-4 w-4" />
                              Patient/User
                            </div>
                          </SelectItem>
                          <SelectItem value="Healthcare Provider">
                            <div className="flex items-center gap-2">
                              <Icon icon="mdi:stethoscope" className="h-4 w-4" />
                              Healthcare Provider
                            </div>
                          </SelectItem>
                          <SelectItem value="Administrator">
                            <div className="flex items-center gap-2">
                              <Icon icon="mdi:shield-account" className="h-4 w-4" />
                              Administrator
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        className="mt-2 bg-background border-border"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirm-password" className="text-foreground">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="mt-2 bg-background border-border"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label 
                          htmlFor="terms"
                          className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isLoading || !agreeToTerms}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">OR CONTINUE WITH</span>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <Icon icon="mdi:google" className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                </form>
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
            <Icon icon="mdi:arrow-left" className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;