const BookCard = ({ book, onClick }) => {
    return (
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
        onClick={onClick}
      >
        <div className="h-56 overflow-hidden">
          <img 
            src={book.coverUrl} 
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-cover.jpg';
            }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2 mb-1">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
          
          {book.publishYear && (
            <p className="text-xs text-gray-500">Published: {book.publishYear}</p>
          )}
          
          {book.publisher && book.publisher !== 'Unknown' && (
            <p className="text-xs text-gray-500 mt-1">Publisher: {book.publisher}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default BookCard;