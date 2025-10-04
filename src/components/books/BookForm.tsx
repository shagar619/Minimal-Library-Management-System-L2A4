import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
     Form,
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from '@/components/ui/form';
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, BookOpen } from 'lucide-react';
import type { Book, CreateBookRequest } from '@/redux/api/bookApi';

const formSchema = z.object({
     title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
     author: z.string().min(1, 'Author is required').max(100, 'Author must be less than 100 characters'),
     genre: z.string().min(1, 'Genre is required'),
     isbn: z.string().min(10, 'ISBN must be at least 10 characters').max(17, 'ISBN must be less than 17 characters'),
     description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
     copies: z.number().min(0, 'Copies must be 0 or greater').max(1000, 'Copies must be less than 1000'),
     available: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface BookFormProps {
     initialData?: Book;
     onSubmit: (data: CreateBookRequest) => Promise<void>;
     isLoading?: boolean;
     submitText?: string;
}

const genres = [
     'Fiction',
     'Non-Fiction',
     'Science Fiction',
     'Fantasy',
     'Mystery',
     'Romance',
     'Thriller',
     'Horror',
     'Biography',
     'History',
     'Science',
     'Technology',
     'Self-Help',
     'Health',
     'Travel',
     'Cooking',
     'Art',
     'Music',
     'Sports',
     'Children',
];

const BookForm = ({ initialData, onSubmit, isLoading, submitText = 'Save Book' }: BookFormProps) => {
const form = useForm<FormData>({
     resolver: zodResolver(formSchema),
     defaultValues: {
     title: initialData?.title || '',
     author: initialData?.author || '',
     genre: initialData?.genre || '',
     isbn: initialData?.isbn || '',
     description: initialData?.description || '',
     copies: initialData?.copies || 1,
     available: initialData?.available ?? true,
     },
});

const handleSubmit = async (data: FormData) => {
const submitData: CreateBookRequest = {
     title: data.title,
     author: data.author,
     genre: data.genre,
     isbn: data.isbn,
     description: data.description,
     copies: data.copies,
     available: data.available,
     };
     await onSubmit(submitData);
};

return (
     <Card className="shadow-lg">
     <CardHeader className="bg-gradient-subtle">
     <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>{initialData ? 'Edit Book' : 'Add New Book'}</span>
     </CardTitle>
     </CardHeader>
     <CardContent className="p-6">
     <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
          <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
               <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                    <Input 
                         placeholder="Enter book title" 
                         {...field} 
                         className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    </FormControl>
                    <FormMessage />
               </FormItem>
               )}
          />

          {/* Author */}
          <FormField
               control={form.control}
               name="author"
               render={({ field }) => (
               <FormItem>
                    <FormLabel>Author *</FormLabel>
                    <FormControl>
                    <Input 
                         placeholder="Enter author name" 
                         {...field} 
                         className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    </FormControl>
                    <FormMessage />
          </FormItem>
          )}/>

          {/* Genre */}
          <FormField
               control={form.control}
               name="genre"
               render={({ field }) => (
               <FormItem>
                    <FormLabel>Genre *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                         <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                         {genres.map((genre) => (
                         <SelectItem key={genre} value={genre}>
                              {genre}
                         </SelectItem>
                    ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
               </FormItem>
               )}/>

          {/* ISBN */}
          <FormField
               control={form.control}
               name="isbn"
               render={({ field }) => (
               <FormItem>
                    <FormLabel>ISBN *</FormLabel>
                    <FormControl>
                    <Input 
                         placeholder="978-0123456789" 
                         {...field} 
                         className="font-mono transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    </FormControl>
                    <FormDescription>
                         Enter the 10 or 13 digit ISBN
                    </FormDescription>
                    <FormMessage />
               </FormItem>
               )}/>

          {/* Copies */}
          <FormField
               control={form.control}
               name="copies"
               render={({ field }) => (
               <FormItem>
                    <FormLabel>Number of Copies *</FormLabel>
                    <FormControl>
                    <Input 
                         type="number" 
                         min="0" 
                         max="1000"
                         placeholder="1" 
                         {...field}
                         onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                         className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                    </FormControl>
                    <FormMessage />
               </FormItem>
               )}/>

          {/* Available */}
          <FormField
               control={form.control}
               name="available"
               render={({ field }) => (
               <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                    <FormLabel className="text-base">Available for borrowing</FormLabel>
                    <FormDescription>
                         Mark this book as available for users to borrow
                    </FormDescription>
                    </div>
                    <FormControl>
                    <Switch
                         checked={field.value}
                         onCheckedChange={field.onChange}
                    />
                    </FormControl>
               </FormItem>
               )}/>
          </div>

          {/* Description */}
          <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
               <FormItem>
               <FormLabel>Description</FormLabel>
               <FormControl>
                    <Textarea 
                         placeholder="Enter book description (optional)" 
                         className="min-h-[100px] transition-all focus:ring-2 focus:ring-primary/20"
                         {...field} 
                    />
               </FormControl>
               <FormDescription>
                    Provide a brief description of the book's content
               </FormDescription>
               <FormMessage />
               </FormItem>
               )}/>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
          <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[linear-gradient(135deg,hsl(173_58%_39%),hsl(173_58%_32%))] hover:opacity-90 transition-all duration-200 px-8">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {submitText}
          </Button>
          </div>
          </form>
     </Form>
     </CardContent>
</Card>
);
};

export default BookForm;