import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useGetBookQuery, useUpdateBookMutation, type CreateBookRequest } from '@/redux/api/bookApi';
import PageLayout from '@/components/layout/PageLayout';
import BookForm from '@/components/books/BookForm';

const EditBookPage = () => {

const { id } = useParams<{ id: string }>();
const navigate = useNavigate();

// const { toast } = useToast();

const { data: book, isLoading: bookLoading, error } = useGetBookQuery(id!);

const [updateBook, { isLoading: updateLoading }] = useUpdateBookMutation();

const handleUpdateBook = async (data: CreateBookRequest) => {
try {
     await updateBook({ id: id!, ...data}).unwrap();

     // toast({
     //      title: "Book updated successfully",
     //      description: `"${data.title}" has been updated.`,
     // });

     alert(`${data.title} ✅updated successfully!`);

     navigate(`/books/${id}`);
     } catch (error) {

     // toast({
     //      title: "Error updating book",
     //      description: "Please check your information and try again.",
     //      variant: "destructive",
     // });
     console.log(error);

     alert(`${error} ❌ Update failed!`);
}
};

if (bookLoading) {
return (
     <PageLayout title="Edit Book">
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
     <PageLayout title="Edit Book">
     <div className="max-w-4xl mx-auto">
          <Card className="p-8 text-center">
          <div className="space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <div>
               <h3 className="text-lg font-semibold">Book not found</h3>
               <p className="text-muted-foreground">The book you're trying to edit doesn't exist.</p>
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
     <PageLayout 
          title="Edit Book" 
          description={`Update details for "${book.title}"`}
>
     <div className="max-w-4xl mx-auto space-y-6">
     {/* Header */}
     <div className="flex items-center justify-between">
          <Button
               variant="ghost"
               onClick={() => navigate(`/books/${id}`)}
               className="hover:bg-accent-light"
          >
          <ArrowLeft className="h-4 w-4 mr-2" />
               Back to Book Details
          </Button>
     </div>

     {/* Form */}
     <BookForm 
          initialData={book}
          onSubmit={handleUpdateBook}
          isLoading={updateLoading}
          submitText="Update Book"
     />
     </div>
     </PageLayout>
);
};

export default EditBookPage;