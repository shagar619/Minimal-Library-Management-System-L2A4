import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
     ArrowLeft, 
     Edit, 
     BookMarked, 
     Copy, 
     Calendar, 
     User, 
     Hash,
     BookOpen,
     AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGetBookQuery } from '@/redux/api/bookApi';
import PageLayout from '@/components/layout/PageLayout';

const BookDetailPage = () => {
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();
// const { toast } = useToast();
const { data: book, isLoading, error } = useGetBookQuery(id!);

const copyISBN = (isbn: string) => {
navigator.clipboard.writeText(isbn);

     // toast({
     // title: "ISBN copied",
     // description: "ISBN has been copied to clipboard.",
     // });

     alert(`ISBN has been copied to clipboard.`)

};

if (isLoading) {
return (
     <PageLayout>
     <div className="max-w-4xl mx-auto">
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
     <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
     <div className="space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <div>
               <h3 className="text-lg font-semibold">Book not found</h3>
               <p className="text-muted-foreground">The book you're looking for doesn't exist.</p>
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

return (
<PageLayout>
     <div className="max-w-4xl mx-auto space-y-6">
     {/* Header */}
     <div className="flex items-center justify-between">
          <Button
               variant="ghost"
               onClick={() => navigate('/books')}
               className="hover:bg-accent-light"
          >
          <ArrowLeft className="h-4 w-4 mr-2" />
               Back to Books
          </Button>

          <div className="flex items-center space-x-2">
          <Button
               variant="outline"
               onClick={() => navigate(`/edit-book/${book._id}`)}
               className="hover:bg-primary-light"
          >
          <Edit className="h-4 w-4 mr-2" />
               Edit Book
          </Button>
          <Button
               onClick={() => navigate(`/borrow/${book._id}`)}
               disabled={!book.available || book.copies === 0}
               className="bg-gradient-primary hover:opacity-90"
          >
               <BookMarked className="h-4 w-4 mr-2" />
               Borrow Book
          </Button>
          </div>
     </div>

     {/* Main Content */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
          <CardHeader className="bg-gradient-subtle">
               <div className="flex items-start justify-between">
               <div className="space-y-2">
                    <CardTitle className="text-2xl">{book.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-lg">by {book.author}</span>
               </div>
               </div>
               <Badge 
                    variant="secondary" 
                    className="text-sm px-3 py-1"
               >
                    {book.genre}
               </Badge>
     </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
                {/* ISBN */}
               <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
               <div className="flex items-center space-x-3">
                    <Hash className="h-5 w-5 text-muted-foreground" />
               <div>
                    <p className="text-sm font-medium text-muted-foreground">ISBN</p>
                    <p className="font-mono text-lg">{book.isbn}</p>
                    </div>
               </div>
               <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyISBN(book.isbn)}
                    className="hover:bg-accent-light"
               >
                    <Copy className="h-4 w-4" />
               </Button>
               </div>

               {/* Description */}
               {book.description && (
          <>
               <Separator />
                    <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                         Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                         {book.description}
                    </p>
               </div>
          </>
               )}

                {/* Metadata */}
               <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
               <div>
                    <p className="text-sm font-medium text-muted-foreground">Added on</p>
                    <p className="text-sm">
                         {new Date(book.createdAt).toLocaleDateString()}
                    </p>
          </div>
          </div>
               <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">Last updated</p>
                    <p className="text-sm">
                         {new Date(book.updatedAt).toLocaleDateString()}
                    </p>
                    </div>
               </div>
               </div>
          </CardContent>
          </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
          {/* Availability Card */}
          <Card className="shadow-md">
          <CardHeader>
               <CardTitle className="text-lg">Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="text-center">
          <div className="text-3xl font-bold mb-2">{book.copies}</div>
               <p className="text-sm text-muted-foreground">Total Copies</p>
          </div>

          <div className="flex items-center justify-center">
               <Badge 
                    variant={book.available ? "default" : "destructive"}
                    className={cn(
                    "text-sm px-4 py-2",
                    book.available ? "bg-success text-success-foreground" : ""
                    )}
               >
                    {book.available ? 'Available for Borrowing' : 'Currently Unavailable'}
               </Badge>
          </div>

               {book.available && book.copies > 0 && (
               <Button
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    className="w-full bg-gradient-primary hover:opacity-90"
               >
               <BookMarked className="h-4 w-4 mr-2" />
                    Borrow This Book
               </Button>
               )}
          </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-md">
          <CardHeader>
               <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
               <Button
                    variant="outline"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="w-full justify-start hover:bg-primary-light"
               >
               <Edit className="h-4 w-4 mr-2" />
                    Edit Book Details
               </Button>
               <Button
                    variant="outline"
                    onClick={() => copyISBN(book.isbn)}
                    className="w-full justify-start hover:bg-accent-light"
               >
               <Copy className="h-4 w-4 mr-2" />
                    Copy ISBN
               </Button>
          </CardContent>
          </Card>
          </div>
     </div>
     </div>
     </PageLayout>
);
};

export default BookDetailPage;