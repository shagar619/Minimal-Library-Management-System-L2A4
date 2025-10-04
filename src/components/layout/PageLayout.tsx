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
          <div className="bg-gradient-subtle">
          <div className="py-8">
          <div className="space-y-2">
               {title && (
               <h1 className="text-3xl text-center font-bold tracking-tight text-foreground">
                    {title}
               </h1>
               )}
               {description && (
               <p className="text-lg text-center text-muted-foreground">
                    {description}
               </p>
               )}
          </div>
          </div>
          </div>
     )}
     <div className="mx-6 md:w-10/12 md:mx-auto pb-36 animate-fade-in">
          {children}
     </div>
     </main>
     <Footer />
     </div>
);
};

export default PageLayout;