import { useNavigate } from 'react-router-dom';
import BookForm from '@/components/books/BookForm';
import { useCreateBookMutation, type CreateBookRequest } from '@/redux/api/bookApi';
import PageLayout from '@/components/layout/PageLayout';
// import { useToast } from '@/hooks/use-toast';

const CreateBookPage = () => {
     const navigate = useNavigate();
     // const { toast } = useToast();
     const [createBook, { isLoading }] = useCreateBookMutation();

     const handleCreateBook = async (data: CreateBookRequest) =>{

     try {
          await createBook(data).unwrap();

          // toast({
          // title: "Book created successfully",
          // description: `"${data.title}" has been added to the library.`,
          // });

          alert(`${data.title}" has been added to the library.`)

          navigate('/books');

     } catch (error) {

          // toast({
          // title: "Error creating book",
          // description: "Please check your information and try again.",
          // variant: "destructive",
          // error
          // });

          alert(`${error} - Please check your information and try again.`);
     }
     };

return (
     <PageLayout 
          title="Add New Book" 
          description="Add a new book to your library collection"
     >
     <div className="max-w-4xl mx-auto">
     <BookForm 
          onSubmit={handleCreateBook}
          isLoading={isLoading}
          submitText="Add Book"
     />
     </div>
     </PageLayout>
);
};

export default CreateBookPage;