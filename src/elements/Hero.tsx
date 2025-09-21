import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, BookOpen, Database, Plus, Users } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export default function Hero() {

const navigate = useNavigate();

  // Add error boundary to catch navigation issues
useEffect(() => {
     console.log('Index component mounted with navigation available');
}, []);

const features = [
     {
     icon: BookOpen,
     title: 'Book Management',
     description: 'Add, edit, and manage your entire book collection with detailed information.',
     color: 'text-primary',
     bg: 'bg-primary-light'
     },
     {
     icon: Users,
     title: 'Easy Borrowing',
     description: 'Simple borrowing system with quantity tracking and due date management.',
     color: 'text-accent',
     bg: 'bg-accent-light'
     },
     {
     icon: BarChart3,
     title: 'Analytics & Reports',
     description: 'Track borrowing patterns and get insights into popular books.',
     color: 'text-success',
     bg: 'bg-success-light'
     },
     {
     icon: Database,
     title: 'Real-time Updates',
     description: 'All changes are reflected instantly across the entire system.',
     color: 'text-warning',
     bg: 'bg-warning-light'
     }
     ];

return (
     <div>
      {/* Hero Section */}
     <section className="container py-24">
     <div className="text-center space-y-8 max-w-4xl mx-auto">
     <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          Modern Library 
          <span 
          className="bg-gradient-to-br from-[hsl(173,58%,39%)] to-[hsl(173,58%,32%)] bg-clip-text text-transparent"> Management</span>
          </h1>
          <p className="text-xl text-[hsl(215_20.2%_65.1%)] max-w-2xl mx-auto leading-relaxed">
          Streamline your library operations with our intuitive book management system. 
          Track inventory, manage borrowing, and gain insights—all in one place.
          </p>
     </div>

     <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
          size="lg"
          onClick={() => navigate('/books')}
          className="bg-gradient-to-br from-[hsl(173,58%,39%)] to-[hsl(173,58%,32%)] hover:opacity-90 transition-all duration-200 text-lg px-8 py-6"
          >
          <BookOpen className="mr-2 h-5 w-5" />
               Browse Books
          </Button>
          <Button 
          size="lg"
          variant="outline"
          onClick={() => navigate('/create-book')}
          className="text-lg px-8 py-6 hover:bg-[hsl(173,58%,32%)] hover:text-white border-2"
          >
          <Plus className="mr-2 h-5 w-5" />
               Add New Book
          </Button>
          </div>
     </div>
     </section>

      {/* Features Section */}
     <section className="container py-16">
     <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">
               Everything you need to manage your library efficiently
          </p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
          <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-6 space-y-4">
               <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
               </div>
               <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
               </div>
               </CardContent>
               </Card>
          );
          })}
     </div>
     </section>

     {/* Quick Actions Section */}
     <section className="container py-16">
     <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl bg-gradient-subtle border-2">
          <CardContent className="p-8">
          <div className="text-center space-y-6">
               <div className="space-y-2">
               <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
               <p className="text-lg text-muted-foreground">
                    Begin managing your library with our comprehensive suite of tools
               </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <Button 
                    onClick={() => navigate('/books')}
                    className="bg-gradient-primary hover:opacity-90 transition-all duration-200 py-6"
               >
                    <BookOpen className="mr-2 h-5 w-5" />
                    View All Books
               </Button>
               <Button 
                    onClick={() => navigate('/create-book')}
                    variant="outline"
                    className="hover:bg-primary-light border-2 py-6"
               >
                    <Plus className="mr-2 h-5 w-5" />
                    Add First Book
               </Button>
               <Button 
                    onClick={() => navigate('/borrow-summary')}
                    variant="outline"
                    className="hover:bg-accent-light border-2 py-6"
               >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Analytics
               </Button>
               </div>
               </div>
          </CardContent>
          </Card>
     </div>
     </section>
</div>
);
}
