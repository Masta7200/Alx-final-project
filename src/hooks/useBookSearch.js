import { useState } from 'react';

const useBookSearch = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search books by title, author, or keyword
  const searchBooks = async (query, searchBy = 'title') => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setBooks([]);
    
    try {
      const endpoint = `https://openlibrary.org/search.json?${searchBy}=${encodeURIComponent(query)}`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.docs && data.docs.length > 0) {
        // Format the books data
        const formattedBooks = data.docs.map(book => ({
          key: book.key,
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown',
          coverUrl: book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
            : '/placeholder-cover.jpg',
          publishYear: book.first_publish_year,
          publisher: book.publisher ? book.publisher[0] : 'Unknown',
          isbn: book.isbn ? book.isbn[0] : null,
        }));
        
        setBooks(formattedBooks);
      } else {
        setBooks([]);
        setError('No books found for this query');
      }
    } catch (err) {
      setError(`Failed to fetch books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Get detailed information for a specific book
  const getBookDetails = async (bookKey) => {
    setLoading(true);
    setError(null);
    
    try {
      // First, get the work information using the key
      const workEndpoint = `https://openlibrary.org${bookKey}.json`;
      const workResponse = await fetch(workEndpoint);
      
      if (!workResponse.ok) {
        throw new Error(`Error: ${workResponse.status}`);
      }
      
      const workData = await workResponse.json();
      
      // Get detailed book info
      let detailedBook = {
        key: workData.key,
        title: workData.title,
        description: workData.description 
          ? (typeof workData.description === 'object' ? workData.description.value : workData.description)
          : 'No description available',
        subjects: workData.subjects || [],
        coverUrl: workData.covers && workData.covers.length > 0
          ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg`
          : '/placeholder-cover.jpg',
        publishDate: workData.first_publish_date || 'Unknown',
      };
      
      setSelectedBook(detailedBook);
    } catch (err) {
      setError(`Failed to fetch book details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    selectedBook,
    loading,
    error,
    searchBooks,
    getBookDetails,
    setSelectedBook,
  };
};

export default useBookSearch;