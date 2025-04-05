import BookCard from './BookCard';
import ErrorMessage from './ErrorMessage';

const BookList = ({ books, loading, error, onSelectBook }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (books.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg shadow-inner">
        <p className="text-gray-500">No books found. Try searching for a different title, author, or keyword.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard 
          key={book.key} 
          book={book} 
          onClick={() => onSelectBook(book.key)} 
        />
      ))}
    </div>
  );
};

export default BookList;