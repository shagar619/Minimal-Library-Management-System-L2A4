import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
     Form,
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from '@/components/ui/form';

import { ArrowLeft, BookMarked, AlertCircle, Calendar, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGetBookQuery } from '@/redux/api/bookApi';
import PageLayout from '@/components/layout/PageLayout';
import { useBorrowBookMutation } from '@/redux/api/borrowApi';

const formSchema = z.object({
     quantity: z.number().min(1, 'Quantity must be at least 1'),
     dueDate: z.string().min(1, 'Due date is required').refine((date) => {
const selectedDate = new Date(date);
const today = new Date();
     today.setHours(0, 0, 0, 0);
     return selectedDate >= today;
     }, 'Due date must be today or in the future'),
});

type FormData = z.infer<typeof formSchema>;

const BorrowBookPage = () => {

const { bookId } = useParams<{ bookId: string }>();
const navigate = useNavigate();

// const { toast } = useToast();

const { data: book, isLoading: bookLoading, error } = useGetBookQuery(bookId!);
const [borrowBook, { isLoading: borrowLoading }] = useBorrowBookMutation();

// Set minimum date to today
const today = new Date();
const minDate = today.toISOString().split('T')[0];

// Set default due date to 2 weeks from today
const defaultDueDate = new Date();
defaultDueDate.setDate(defaultDueDate.getDate() + 14);
const defaultDueDateString = defaultDueDate.toISOString().split('T')[0];

const form = useForm<FormData>({
     resolver: zodResolver(formSchema),
     defaultValues: {
     quantity: 1,
     dueDate: defaultDueDateString,
},
});

const handleBorrow = async (data: FormData) => {
     try {
     if (!book) return;

     if (data.quantity > book.copies) {

     // toast({
     //      title: "Invalid quantity",
     //      description: `Only ${book.copies} copies are available.`,
     //      variant: "destructive",
     // });

     alert(`Only ${book.copies} copies are available.`);

     return;
     }

     await borrowBook({
          bookId: book._id,
          quantity: data.quantity,
          dueDate: data.dueDate,
     }).unwrap();

     // toast({
     //      title: "Book borrowed successfully",
     //      description: `You have borrowed ${data.quantity} copy(ies) of "${book.title}".`,
     // });

     alert(`You have borrowed ${data.quantity} copy(ies) of "${book.title}".`);

     navigate('/borrow-summary');
     } catch (error) {

     // toast({
     //      title: "Error borrowing book",
     //      description: "Please try again later.",
     //      variant: "destructive",
     // });

     alert(`${error} Please try again later.`)

     }
};

if (bookLoading) {
return (
     <PageLayout>
     <div className="max-w-2xl mx-auto">
          <Card className="p-8">
          <div className="text-center space-y-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
               <p className="text-muted-foreground">Loading book details...</p>
          </div>
          </Card>
     </div>
     </PageLayout>
     );
}

if (error || !book) {
return (
     <PageLayout>
     <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
          <div className="space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <div>
               <h3 className="text-lg font-semibold">Book not found</h3>
               <p className="text-muted-foreground">The book you're trying to borrow doesn't exist.</p>
          </div>
          <Button onClick={() => navigate('/books')}>
               Back to Books
          </Button>
          </div>
          </Card>
     </div>
     </PageLayout>
     );
}

if (!book.available || book.copies === 0) {
return (
     <PageLayout title="Borrow Book">
     <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
          <div className="space-y-4">
          <BookMarked className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
               <h3 className="text-lg font-semibold">Book not available</h3>
               <p className="text-muted-foreground">
                    "{book.title}" is currently not available for borrowing.
               </p>
          </div>
          <Button onClick={() => navigate('/books')}>
               Browse Other Books
          </Button>
          </div>
          </Card>
     </div>
     </PageLayout>
     );
}

return (
     <PageLayout 
          title="Borrow Book" 
          description="Fill in the details to borrow this book">
     <div className="max-w-2xl mx-auto space-y-6">
     {/* Header */}
     <div className="flex items-center justify-between">
          <Button
               variant="ghost"
               onClick={() => navigate(`/books/${bookId}`)}
               className="hover:bg-accent-light"
          >
          <ArrowLeft className="h-4 w-4 mr-2" />
               Back to Book Details
          </Button>
     </div>

     {/* Book Summary */}
     <Card className="shadow-md">
          <CardHeader className="bg-gradient-subtle">
          <CardTitle className="flex items-center space-x-2">
          <BookMarked className="h-5 w-5 text-primary" />
          <span>Book Details</span>
          </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
          <div className="space-y-4">
          <div>
               <h3 className="text-xl font-bold">{book.title}</h3>
               <p className="text-muted-foreground">by {book.author}</p>
          </div>

          <div className="flex items-center space-x-4">
               <Badge variant="secondary">{book.genre}</Badge>
          <div className="flex items-center space-x-2">
               <Hash className="h-4 w-4 text-muted-foreground" />
               <span className="font-mono text-sm">{book.isbn}</span>
          </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
               <span className="text-sm font-medium">Available Copies</span>
               <Badge 
                    variant={book.copies > 5 ? "default" : "secondary"}
                    className="text-sm"
               >
                    {book.copies}
               </Badge>
          </div>
          </div>
          </CardContent>
     </Card>

     {/* Borrow Form */}
     <Card className="shadow-lg">
          <CardHeader className="bg-gradient-subtle">
          <CardTitle>Borrowing Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(handleBorrow)} className="space-y-6">
                {/* Quantity */}
               <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
               <FormItem>
                    <FormLabel>Quantity *</FormLabel>
               <FormControl>
                    <Input 
                         type="number" 
                         min="1" 
                         max={book.copies}
                         placeholder="1" 
                         {...field}
                         onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                         className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
               </FormControl>
               <FormDescription>
                    How many copies would you like to borrow? (Max: {book.copies})
               </FormDescription>
               <FormMessage />
               </FormItem>
               )}
               />

               {/* Due Date */}
               <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
               <FormItem>
               <FormLabel className="flex items-center space-x-2">
               <Calendar className="h-4 w-4" />
                        <span>Due Date *</span>
               </FormLabel>
               <FormControl>
                    <Input 
                         type="date" 
                         min={minDate}
                         {...field}
                         className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
               </FormControl>
               <FormDescription>
                         When do you plan to return the book?
               </FormDescription>
               <FormMessage />
               </FormItem>
               )}
               />

               {/* Submit Button */}
               <div className="flex justify-end space-x-4 pt-4">
               <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/books/${bookId}`)}
               >
                    Cancel
               </Button>
               <Button
                    type="submit"
                    disabled={borrowLoading}
                    className="bg-gradient-primary hover:opacity-90 transition-all duration-200 px-8"
               >
                    {borrowLoading && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent" />}
                    Borrow Book
               </Button>
               </div>
          </form>
          </Form>
          </CardContent>
     </Card>
     </div>
     </PageLayout>
);
};

export default BorrowBookPage;