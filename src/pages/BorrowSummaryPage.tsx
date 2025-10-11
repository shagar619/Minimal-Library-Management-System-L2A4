
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from '@/components/ui/table';
import { BarChart3, BookMarked, Hash, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useGetBorrowSummaryQuery } from '@/redux/api/borrowApi';

const BorrowSummaryPage = () => {
const navigate = useNavigate();

const { data: borrowSummary, isLoading, error } = useGetBorrowSummaryQuery();

const totalBorrowedBooks = borrowSummary?.reduce((sum, item) => sum + item.totalQuantityBorrowed, 0) || 0;

const uniqueBooksBorrowed = borrowSummary?.length || 0;

if (error) {
return (
     <PageLayout title="Borrow Summary" description="Overview of borrowed books">
     <Card className="p-8 text-center">
          <div className="space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
     <div>
          <h3 className="text-lg font-semibold">Error loading borrow summary</h3>
          <p className="text-[hsl(215_13.8%_55.1%)]">Please try refreshing the page.</p>
     </div>
          <Button onClick={() => window.location.reload()}>
               Refresh Page
          </Button>
     </div>
     </Card>
     </PageLayout>
     );
}

if (isLoading) {
return (
     <PageLayout title="Borrow Summary" description="Overview of borrowed books">
     <Card className="p-8">
     <div className="text-center space-y-4">
     <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="text-[hsl(215_13.8%_55.1%)]">Loading borrow summary...</p>
     </div>
     </Card>
     </PageLayout>
     );
}

if (!borrowSummary?.length) {
return (
     <PageLayout title="Borrow Summary" description="Overview of borrowed books">
     <Card className="p-8 text-center">
          <div className="space-y-4">
               <BookMarked className="h-12 w-12 mx-auto text-[hsl(215_13.8%_55.1%)]" />
          <div>
               <h3 className="text-lg font-semibold">No borrowed books</h3>
               <p className="text-[hsl(215_13.8%_55.1%)]">
                    Start borrowing books to see the summary here.
               </p>
          </div>
          <Button 
               onClick={() => navigate('/books')}
               className="bg-[linear-gradient(135deg,hsl(173_58%_39%),hsl(173_58%_32%))] cursor-pointer"
          >
               Browse Books
          </Button>
          </div>
     </Card>
     </PageLayout>
);
}

return (
<PageLayout 
     title="Borrow Book Summary" 
     description="Overview of all borrowed books and their quantities"
>
     <div className="space-y-6 mt-18">
     {/* Statistics Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_20%_98%))]">
          <CardContent className="p-6">
          <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-[hsl(173_58%_39%)] flex items-center justify-center">
               <BookMarked className="h-5 w-5 text-[hsl(0_0%_100%)]" />
          </div>
          <div>
               <p className="text-2xl font-bold">{totalBorrowedBooks}</p>
               <p className="text-sm text-[hsl(215_13.8%_55.1%)]">Total Books Borrowed</p>
          </div>
          </div>
     </CardContent>
     </Card>

     <Card className="bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_20%_98%))]">
     <CardContent className="p-6">
          <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-[hsl(217_91%_60%)] flex items-center justify-center">
               <BarChart3 className="h-5 w-5 text-[hsl(0_0%_100%)]" />
          </div>
          <div>
               <p className="text-2xl font-bold">{uniqueBooksBorrowed}</p>
          <p className="text-sm text-[hsl(215_13.8%_55.1%)]">Unique Titles</p>
     </div>
     </div>
     </CardContent>
     </Card>

     <Card className="bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_20%_98%))]">
     <CardContent className="p-6">
          <div className="flex items-center space-x-2">
               <div className="h-8 w-8 rounded-full bg-[hsl(142_76%_50%)] flex items-center justify-center">
               <TrendingUp className="h-5 w-5 text-[hsl(0_0%_100%)]" />
          </div>
          <div>
               <p className="text-2xl font-bold">
                    {uniqueBooksBorrowed > 0 ? (totalBorrowedBooks / uniqueBooksBorrowed).toFixed(1) : '0'}
               </p>
               <p className="text-sm text-[hsl(215_13.8%_55.1%)]">Avg. Copies per Title</p>
          </div>
          </div>
     </CardContent>
     </Card>
     </div>

     {/* Borrow Summary Table */}
     <Card className="shadow-sm rounded-xs">
          <CardHeader className="bg-[linear-gradient(180deg,hsl(0_0%_100%),hsl(210_20%_98%))]">
          <CardTitle className="flex items-center space-x-2">
               <BarChart3 className="h-6 w-6 text-[hsl(173_58%_39%)]" />
               <span>Borrowed Books Summary</span>
          </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
     <Table>
          <TableHeader>
               <TableRow className="bg-[hsl(210_20%_96%)]/50">
               <TableHead className="font-semibold"></TableHead>
               <TableHead className="font-semibold">Book Title</TableHead>
               <TableHead className="font-semibold">ISBN</TableHead>
               <TableHead className="text-center font-semibold">Total Quantity Borrowed</TableHead>
               <TableHead className="text-center font-semibold">Popularity</TableHead>
     </TableRow>
     </TableHeader>
     <TableBody>
               {[...borrowSummary]
               .sort((a, b) => b.totalQuantityBorrowed - a.totalQuantityBorrowed)
               .map((item, index) => {
          const maxBorrowed = Math.max(...borrowSummary.map(s => s.totalQuantityBorrowed));
          const popularityLevel = 
               item.totalQuantityBorrowed === maxBorrowed ? 'high' :
               item.totalQuantityBorrowed >= maxBorrowed * 0.6 ? 'medium' : 'low';

return (
     <TableRow key={`${item.isbn}-${index}`} className="hover:bg-[hsl(210_20%_96%)]/30 transition-colors">
          <TableCell>
          <div className="font-medium text-[hsl(215_27.9%_16.9%)]">
               {index + 1}
          </div>
          </TableCell>
          <TableCell>
          <div className="font-medium text-[hsl(215_27.9%_16.9%)]">
               {item.bookTitle}
          </div>
          </TableCell>
          <TableCell>
          <div className="flex items-center space-x-2">
               <Hash className="h-4 w-4 text-[hsl(215_13.8%_55.1%)]" />
               <span className="font-mono text-sm">{item.isbn}</span>
          </div>
          </TableCell>
          <TableCell className="text-center">
               <Badge 
                    variant="secondary"
                    className="text-lg px-3 py-1 font-semibold"
               >
                    {item.totalQuantityBorrowed}
               </Badge>
          </TableCell>
          <TableCell className="text-center">
               <Badge 
                    variant={
                    popularityLevel === 'high' ? 'default' :
                    popularityLevel === 'medium' ? 'secondary' : 'outline'
               }
                    className={`text-xs ${
                    popularityLevel === 'high' ? 'bg-[hsl(142_76%_50%)] text-[hsl(0_0%_100%)]' :
                    popularityLevel === 'medium' ? 'bg-[hsl(38_92%_60%)] text-[hsl(0_0%_100%)]' : ''
                    
                    }`}
               >
                    {popularityLevel === 'high' ? '🔥 Popular' :
                    popularityLevel === 'medium' ? '📈 Moderate' : '📚 Low'}
               </Badge>
          </TableCell>
          </TableRow>
          );
     })}
          </TableBody>
          </Table>
          </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-12">
          <Button
               variant="outline"
               onClick={() => navigate('/books')}
               className="hover:bg-[hsl(217_91%_95%)] cursor-pointer"
          >
               Browse All Books
          </Button>
          <Button
               onClick={() => navigate('/create-book')}
               className="bg-[linear-gradient(135deg,hsl(173_58%_39%),hsl(173_58%_32%))] hover:opacity-60 cursor-pointer"
          >
               Add New Book
          </Button>
     </div>
     </div>
     </PageLayout>
);
};

export default BorrowSummaryPage;