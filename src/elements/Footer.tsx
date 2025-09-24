import { BookOpen, Heart } from "lucide-react";
import { Link } from "react-router";


const Footer = () => {
return (
     <footer className="border-t bg-gradient-subtle">
     <div className="container py-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        {/* Logo */}
     <Link to="/books" className="flex items-center space-x-2 ml-12">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(173,58%,39%)] to-[hsl(173,58%,32%)]">
               <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-[hsl(215_27.9%_16.9%)]">LibraryHub</span>
     </Link>

          {/* Copyright */}
          <div className="flex items-center space-x-1 text-sm text-[hsl(215_13.8%_55.1%)]">
               <span>Made with</span>
               <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
               <span>for book lovers everywhere</span>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-[hsl(215_13.8%_55.1%)]">
               © 2024 LibraryHub. All rights reserved.
          </div>
          </div>
     </div>
     </footer>
);
};

export default Footer;