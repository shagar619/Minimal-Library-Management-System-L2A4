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
          <div className='mt-18'>
          <div className="py-8">
          <div className="space-y-2">
               {title && (
               <h1 className="text-5xl text-center sm:text-6xl font-bold tracking-tight bg-gradient-to-br from-[hsl(173,58%,39%)] to-[hsl(173,58%,32%)] bg-clip-text text-transparent pb-2">
                    {title}
               </h1>
               )}
               {description && (
               <p className="text-xl text-center text-[hsl(215_13.8%_55.1%)]">
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