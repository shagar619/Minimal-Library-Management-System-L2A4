import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, BarChart3, Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
const location = useLocation();
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const navItems = [
     { href: '/books', label: 'All Books', icon: BookOpen },
     { href: '/create-book', label: 'Add Book', icon: Plus },
     { href: '/borrow-summary', label: 'Borrow Summary', icon: BarChart3 },
     ];

const isActivePath = (path: string) => location.pathname === path;

return (
     <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
     <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
     <Link to="/books" className="flex items-center space-x-2 ml-12">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
               <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">LibraryHub</span>
     </Link>

     {/* Desktop Navigation */}
     <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
          const Icon = item.icon;
          return (
          <Button
               key={item.href}
               variant={isActivePath(item.href) ? "default" : "ghost"}
               asChild
               className={cn(
               "transition-all duration-200",
               isActivePath(item.href) && "bg-gradient-primary shadow-md"
               )}
          >
          <Link to={item.href} className="flex items-center space-x-2">
               <Icon className="h-4 w-4" />
               <span>{item.label}</span>
               </Link>
          </Button>
          );
          })}
     </div>

     {/* Mobile Menu Button */}
     <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
     >
          {mobileMenuOpen ? (
          <X className="h-5 w-5" />
          ) : (
          <Menu className="h-5 w-5" />
          )}
     </Button>
     </div>

      {/* Mobile Navigation */}
     {mobileMenuOpen && (
     <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-2">
               {navItems.map((item) => {
               const Icon = item.icon;
          return (
               <Button
                    key={item.href}
                    variant={isActivePath(item.href) ? "default" : "ghost"}
                    asChild
                    className={cn(
                    "w-full justify-start transition-all duration-200",
                    isActivePath(item.href) && "bg-gradient-primary shadow-md"
               )}
                    onClick={() => setMobileMenuOpen(false)}
               >
               <Link to={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
               </Link>
               </Button>
          );
          })}
          </div>
     </div>
     )}
</nav>
);
};

export default Navbar;