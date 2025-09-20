import { BookOpen, Heart } from "lucide-react";


const Footer = () => {
return (
     <footer className="border-t bg-gradient-subtle">
     <div className="container py-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
               <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">LibraryHub</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
               <span>Made with</span>
               <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
               <span>for book lovers everywhere</span>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-muted-foreground">
               © 2024 LibraryHub. All rights reserved.
          </div>
          </div>
     </div>
     </footer>
);
};

export default Footer;