import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';


const contactSchema = z.object({
     name: z.string().min(2, 'Name must be at least 2 characters').max(100),
     email: z.string().email('Invalid email address').max(255),
     subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
     message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {

// const { toast } = useToast();

const {
     register,
     handleSubmit,
     reset,
     formState: { errors, isSubmitting },
     } = useForm<ContactFormData>({
     resolver: zodResolver(contactSchema),
});

const onSubmit = async (data: ContactFormData) => {
// Simulate API call
await new Promise((resolve) => setTimeout(resolve, 1000));

     // toast({
     // title: 'Message Sent Successfully!',
     // description: 'We\'ll get back to you as soon as possible.',
     // });

     alert(`We'll get back to you as soon as possible.`)

     reset();
};

return (
     <PageLayout
          title="Contact Us"
          description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
     >
     <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Information Cards */}
     <div className="space-y-6">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="pb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-2">
               <Mail className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-lg">Email Us</CardTitle>
          <CardDescription>
               Send us an email anytime
          </CardDescription>
          </CardHeader>
          <CardContent>
          <a 
               href="mailto:library@example.com" 
               className="text-primary hover:underline font-medium"
          >
               library@example.com
               </a>
          </CardContent>
          </Card>

     <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="pb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-2">
               <Phone className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-lg">Call Us</CardTitle>
          <CardDescription>
               Mon-Fri from 8am to 5pm
          </CardDescription>
          </CardHeader>
          <CardContent>
          <a 
               href="tel:+1234567890" 
               className="text-primary hover:underline font-medium"
          >
               +1 (234) 567-890
               </a>
          </CardContent>
     </Card>

     <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader className="pb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-2">
               <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-lg">Visit Us</CardTitle>
          <CardDescription>
               Come say hello at our office
          </CardDescription>
          </CardHeader>
          <CardContent>
               <p className="text-foreground">
                    123 Library Street<br />
                    Booktown, BK 12345
               </p>
          </CardContent>
          </Card>
     </div>

     {/* Contact Form */}
     <Card className="lg:col-span-2 border-primary/20">
          <CardHeader>
          <CardTitle className="text-2xl">Send Us a Message</CardTitle>
          <CardDescription>
               Fill out the form below and we'll get back to you shortly
          </CardDescription>
          </CardHeader>
          <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
               <Input
                    id="name"
                    placeholder="Your name"
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
               />
                    {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
               )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
               <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
               />
                    {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
               )}
               </div>
          </div>

          <div className="space-y-2">
               <Label htmlFor="subject">Subject *</Label>
               <Input
                    id="subject"
                    placeholder="What is this regarding?"
                    {...register('subject')}
                    className={errors.subject ? 'border-destructive' : ''}
               />
                    {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject.message}</p>
               )}
          </div>

          <div className="space-y-2">
               <Label htmlFor="message">Message *</Label>
               <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    {...register('message')}
                    className={errors.message ? 'border-destructive' : ''}
               />
                    {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
               )}
          </div>

          <Button 
               type="submit" 
               className="w-full md:w-auto"
               disabled={isSubmitting}
               >
               {isSubmitting ? (
                    'Sending...'
               ) : (
               <>
               <Send className="w-4 h-4 mr-2" />
                    Send Message
               </>
               )}
          </Button>
          </form>
     </CardContent>
     </Card>
     </div>
</PageLayout>
);
};

export default ContactPage;