import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Icon icon="mdi:eye" className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Retinal-AI</span>
                <p className="text-xs text-slate-400">Advanced Eye Care Platform</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering healthcare professionals and patients with AI-powered retinal analysis and comprehensive eye care management solutions.
            </p>
            <div className="flex space-x-3">
              <Icon icon="mdi:twitter" className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Icon icon="mdi:linkedin" className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Icon icon="mdi:github" className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Icon icon="mdi:email" className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Health Education</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
          
          {/* Certifications */}
          <div>
            <h4 className="font-semibold text-white mb-4">Certifications</h4>
            <div className="space-y-2">
              <Badge variant="outline" className="bg-medical/10 text-medical border-medical/20">
                🏥 Healthcare Grade
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                🔒 Secure
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                🤖 AI-Powered
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© 2025 Retinal-AI. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>HIPAA Compliant</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Secure</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>AI-Powered</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};