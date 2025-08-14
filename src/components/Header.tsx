import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Eye className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold text-foreground">Retinal-AI</span>
            <p className="text-xs text-muted-foreground">Medical Grade AI Diagnostics</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="/education" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Education
          </a>
          <a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
          <a href="/chatbot" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            AI Assistant
          </a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-sm" asChild>
            <a href="/auth">Login</a>
          </Button>
          <Button className="text-sm" asChild>
            <a href="/auth">Sign Up</a>
          </Button>
        </div>
      </div>
    </header>
  );
};