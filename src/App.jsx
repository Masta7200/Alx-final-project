import { useState } from 'react';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import useBookSearch from './hooks/useBookSearch';

function App() {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { 
    books, 
    selectedBook, 
    loading, 
    error, 
    searchBooks, 
    getBookDetails, 
    setSelectedBook 
  } = useBookSearch();

  const handleSearch = (query, searchBy) => {
    searchBooks(query, searchBy);
    setSearchPerformed(true);
  };

  const handleSelectBook = (bookKey) => {
    getBookDetails(bookKey);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {searchPerformed && !loading && books.length === 0 && !error ? (
          <div className="text-center p-8 mb-8 bg-yellow-50 rounded-lg">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Books Found</h2>
            <p className="text-yellow-700">
              We couldn't find any books matching your search. Please try different keywords.
            </p>
          </div>
        ) : null}
        
        <BookList 
          books={books} 
          loading={loading && !selectedBook} 
          error={error}
          onSelectBook={handleSelectBook}
        />
        
        {selectedBook && (
          <BookDetail 
            book={selectedBook}
            loading={loading && selectedBook}
            error={error}
            onClose={handleCloseDetail}
          />
        )}
      </main>
      
      <footer className="bg-blue-600 text-white text-center py-4 mt-8">
        <p>© {new Date().getFullYear()} Book Library | Powered by Open Library API</p>
      </footer>
    </div>
  );
}

export default App;
