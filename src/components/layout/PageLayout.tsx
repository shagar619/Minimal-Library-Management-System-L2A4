import Footer from '@/elements/Footer';
import Navbar from '@/elements/Navbar';
import type { ReactNode } from 'react';



interface PageLayoutProps {
     children: ReactNode;
     title?: string;
     description?: string;
}

const PageLayout = ({ children, title, description }: PageLayoutProps) => {
return (
     <div className="min-h-screen flex flex-col">
     <Navbar />
     <main className="flex-1">
     {(title || description) && (
          <div className="border-b bg-gradient-subtle">
          <div className="container py-8">
          <div className="space-y-2">
               {title && (
               <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {title}
               </h1>
               )}
               {description && (
               <p className="text-lg text-muted-foreground">
                    {description}
               </p>
               )}
          </div>
          </div>
          </div>
     )}
     <div className="container py-8 animate-fade-in">
          {children}
     </div>
     </main>
     <Footer />
     </div>
);
};

export default PageLayout;