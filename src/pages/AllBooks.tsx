import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookTable from '@/components/books/BookTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Filter, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGetBooksQuery } from '@/redux/api/bookApi';
import PageLayout from '@/components/layout/PageLayout';

const AllBooksPage = () => {

     const navigate = useNavigate();
     const { data: books, isLoading, error } = useGetBooksQuery();
     console.log(books)
     const [searchTerm, setSearchTerm] = useState('');
     const [selectedGenre, setSelectedGenre] = useState('');

     // Filter books based on search term and genre
     const filteredBooks = books?.filter((book) => {
     const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.includes(searchTerm);
     const matchesGenre = !selectedGenre || book.genre === selectedGenre;
     return matchesSearch && matchesGenre;
     }) || [];

     const availableGenres = books ? [...new Set(books.map(book => book.genre))] : [];
     const totalBooks = books?.length || 0;
     const availableBooks = books?.filter(book => book.available).length || 0;
     const totalCopies = books?.reduce((sum, book) => sum + book.copies, 0) || 0;

if (error) {
return (
     <PageLayout title="Library Books" description="Manage your book collection">
     <Card className="p-8 text-center">
          <div className="space-y-4">
          <BookOpen className="h-12 w-12 mx-auto text-destructive" />
          <div>
               <h3 className="text-lg font-semibold">Error loading books</h3>
               <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
          <Button onClick={() => window.location.reload()}>
               Refresh Page
          </Button>
          </div>
     </Card>
     </PageLayout>
);
}

return (
<PageLayout 
     title="Library Books" 
     description="Manage your book collection and track availability"
>
     <div className="space-y-6">
        {/* Statistics Cards */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-subtle">
          <CardContent className="p-6">
          <div className="flex items-center space-x-2">
               <BookOpen className="h-8 w-8 text-primary" />
               <div>
                    <p className="text-2xl font-bold">{totalBooks}</p>
                    <p className="text-sm text-muted-foreground">Total Books</p>
               </div>
          </div>
          </CardContent>
          </Card>

          <Card className="bg-gradient-subtle">
          <CardContent className="p-6">
          <div className="flex items-center space-x-2">
               <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
               <BookOpen className="h-5 w-5 text-success-foreground" />
          </div>
               <div>
                    <p className="text-2xl font-bold">{availableBooks}</p>
                    <p className="text-sm text-muted-foreground">Available</p>
               </div>
          </div>
          </CardContent>
          </Card>

          <Card className="bg-gradient-subtle">
          <CardContent className="p-6">
          <div className="flex items-center space-x-2">
               <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-sm font-bold text-accent-foreground">📚</span>
               </div>
               <div>
                    <p className="text-2xl font-bold">{totalCopies}</p>
                    <p className="text-sm text-muted-foreground">Total Copies</p>
               </div>
          </div>
          </CardContent>
          </Card>

          <Card className="bg-gradient-subtle">
          <CardContent className="p-6">
          <div className="flex items-center space-x-2">
               <div className="h-8 w-8 rounded-full bg-warning flex items-center justify-center">
               <Filter className="h-5 w-5 text-warning-foreground" />
               </div>
               <div>
                    <p className="text-2xl font-bold">{availableGenres.length}</p>
                    <p className="text-sm text-muted-foreground">Genres</p>
               </div>
               </div>
          </CardContent>
          </Card>
     </div>

     {/* Controls */}
     <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
          <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                    placeholder="Search books, authors, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
               />
          </div>

              {/* Genre Filter */}
               <div className="flex flex-wrap gap-2">
               <Badge
                    variant={selectedGenre === '' ? 'default' : 'secondary'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedGenre('')}
               >
                    All Genres
               </Badge>
               {availableGenres.map((genre) => (
               <Badge
                    key={genre}
                    variant={selectedGenre === genre ? 'default' : 'secondary'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedGenre(selectedGenre === genre ? '' : genre)}
               >
                    {genre}
               </Badge>
               ))}
               </div>
          </div>

          {/* Add Book Button */}
          <Button 
               onClick={() => navigate('/create-book')}
               className="bg-gradient-primary hover:opacity-90 transition-all duration-200"
          >
          <Plus className="h-4 w-4 mr-2" />
               Add Book
          </Button>
          </div>

          {/* Results info */}
          {searchTerm || selectedGenre ? (
          <div className="mt-4 text-sm text-muted-foreground">
               Showing {filteredBooks.length} of {totalBooks} books
               {searchTerm && ` matching "${searchTerm}"`}
               {selectedGenre && ` in ${selectedGenre}`}
          </div>
          ) : null}
     </Card>

          {/* Books Table */}
          <BookTable books={filteredBooks} isLoading={isLoading} />
     </div>
     </PageLayout>
);
};

export default AllBooksPage;