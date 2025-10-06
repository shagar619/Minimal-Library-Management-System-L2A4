import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
// import { useToast } from '@/hooks/use-toast';
// import { Book } from '@/store/api/booksApi';
import { Eye, Edit, Trash2, BookMarked, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDeleteBookMutation, type Book } from '@/redux/api/bookApi';

interface BookTableProps {
     books: Book[];
     isLoading?: boolean;
}

const BookTable = ({ books, isLoading }: BookTableProps) => {
const navigate = useNavigate();
// const { toast } = useToast();
const [deleteBook] = useDeleteBookMutation();
const [deletingId, setDeletingId] = useState<string | null>(null);

const handleDelete = async (bookId: string, bookTitle: string) => {
try {
     setDeletingId(bookId);
     await deleteBook(bookId).unwrap();

     alert(`${bookTitle} Book deleted successfully!`);

     // toast({
     //      title: "Book deleted successfully",
     //      description: `"${bookTitle}" has been removed from the library.`,
     // });

     } catch (error) {

     alert(`Error deleting book.Please try again later. ${error}`);

     // toast({
     //      title: "Error deleting book",
     //      description: "Please try again later.",
     //      variant: "destructive",
     // });

     } finally {
     setDeletingId(null);
}
};

const copyISBN = (isbn: string) => {
     navigator.clipboard.writeText(isbn);
     alert("ISBN has been copied to clipboard.");

//      toast({
//      title: "ISBN copied",
//      description: "ISBN has been copied to clipboard.",
// });

};

if (isLoading) {
return (
     <div className="rounded-lg border">
     <div className="p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading books...</p>
     </div>
     </div>
);
}

if (!books?.length) {
return (
     <div className="rounded-lg border bg-card">
     <div className="p-8 text-center space-y-4">
          <BookMarked className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
          <h3 className="text-lg font-semibold">No books found</h3>
          <p className="text-muted-foreground">Start by adding your first book to the library.</p>
          </div>
          <Button onClick={() => navigate('/create-book')} className="bg-gradient-primary">
               Add Your First Book
          </Button>
     </div>
     </div>
);
}

return (
<div className=" bg-[hsl(0_0%_100%)] overflow-hidden">
     <Table>
     <TableHeader>
          <TableRow className="bg-muted/50">
          <TableHead className="font-semibold"></TableHead>
          <TableHead className="font-semibold">Title</TableHead>
          <TableHead className="font-semibold">Author</TableHead>
          <TableHead className="font-semibold">Genre</TableHead>
          <TableHead className="font-semibold">ISBN</TableHead>
          <TableHead className="text-center font-semibold">Copies</TableHead>
          <TableHead className="text-center font-semibold">Status</TableHead>
          <TableHead className="text-center font-semibold">Actions</TableHead>
          </TableRow>
     </TableHeader>
     <TableBody>
          {books.map((book, index:number) => (
          <TableRow key={book._id} className="hover:bg-[hsl(210_20%_96%)]/50 transition-colors">
          <TableCell>{index + 1}</TableCell>
          <TableCell>
               <div className="space-y-1">
               <div className="font-medium text-[hsl(215_27.9%_16.9%)] line-clamp-1">
                    {book.title}
               </div>
                    {book.description && (
               <div className="text-sm text-[hsl(215_13.8%_55.1%)] line-clamp-1">
                    {book.description}
               </div>
               )}
               </div>
          </TableCell>
          <TableCell className="text-[hsl(215_13.8%_55.1%)]">{book.author}</TableCell>
          <TableCell>
               <Badge variant="secondary" className="text-xs">
                    {book.genre}
               </Badge>
          </TableCell>
          <TableCell>
               <div className="flex items-center space-x-2">
               <span className="font-mono text-sm">{book.isbn}</span>
               <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyISBN(book.isbn)}
               >
                    <Copy className="h-3 w-3" />
               </Button>
               </div>
          </TableCell>
          <TableCell className="text-center">
               <Badge 
                    variant={book.copies > 5 ? "default" : book.copies > 0 ? "secondary" : "destructive"}
                    className="text-xs"
               >
                    {book.copies}
               </Badge>
          </TableCell>
          <TableCell className="text-center">
               <Badge 
                    variant={book.available ? "default" : "destructive"}
                    className={cn(
                    "text-xs",
                    book.available ? "bg-[hsl(142_76%_50%)] text-[hsl(0_0%_100%)]" : ""
               )}
               >
                    {book.available ? 'Available' : 'Unavailable'}
               </Badge>
          </TableCell>

          <TableCell>
               <div className="flex items-center justify-center space-x-2">
               
               {/* Book Detail page Button */}
               <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-[#34656D] hover:bg-[#334443] text-white hover:text-white cursor-pointer"
                    onClick={() => navigate(`/books/${book._id}`)}
               >
                    <Eye className="h-4 w-4" />
               </Button>

               {/* Edit Book page Button */}
               <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer hover:opacity-90 transition-all bg-amber-500 text-white hover:text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-400"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
               >
                    <Edit className="h-4 w-4" />
               </Button>

               {/* Borrow Book page Button */}
               <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-[hsl(173_58%_39%)] text-white hover:bg-slate-700 hover:text-white cursor-pointer"
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    disabled={!book.available || book.copies === 0}
               >
                    <BookMarked className="h-4 w-4" />
               </Button>
               <AlertDialog>
                    <AlertDialogTrigger asChild>

                    {/* Delete Book page Button */}
                    <Button
                         variant="ghost"
                         size="icon"
                         className="h-8 w-8 cursor-pointer hover:opacity-90 transition-all bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 hover:text-white"
                         disabled={deletingId === book._id}
                    >
                         <Trash2 className="h-4 w-4" />
                    </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Delete Book</AlertDialogTitle>
                    <AlertDialogDescription>
                         Are you sure you want to delete "{book.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                         onClick={() => handleDelete(book._id, book.title)}
                         className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                         Delete
                    </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
               </AlertDialog>
               </div>
          </TableCell>
          </TableRow>
          ))}
     </TableBody>
     </Table>
     </div>
);
};

export default BookTable;