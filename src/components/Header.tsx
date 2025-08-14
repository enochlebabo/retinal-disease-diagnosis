import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Eye className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold text-foreground">Retinal-AI</span>
            <p className="text-xs text-muted-foreground">Medical Grade AI Diagnostics</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/education" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Education
          </Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/chatbot" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                AI Assistant
              </Link>
            </>
          )}
        </nav>
        
        {/* Auth Section */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
                className="text-sm"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" className="text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            <Link to="/about" className="block py-2 text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/features" className="block py-2 text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link to="/education" className="block py-2 text-sm text-muted-foreground hover:text-foreground">
              Education
            </Link>
            <Link to="/contact" className="block py-2 text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
                <Link to="/chatbot" className="block py-2 text-sm text-muted-foreground hover:text-foreground">
                  AI Assistant
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};