const BookDetail = ({ book, loading, error, onClose }) => {
    if (loading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      );
    }
  
    if (!book) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-auto">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{book.title}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
  
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={book.coverUrl} 
                  alt={`Cover of ${book.title}`}
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = '/placeholder-cover.jpg';
                  }}
                />
              </div>
  
              <div className="md:w-2/3">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{book.description}</p>
                </div>
  
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <ul className="text-gray-700">
                    <li className="mb-1"><span className="font-medium">Published:</span> {book.publishDate}</li>
                    {book.isbn && <li className="mb-1"><span className="font-medium">ISBN:</span> {book.isbn}</li>}
                  </ul>
                </div>
  
                {book.subjects && book.subjects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.subjects.slice(0, 10).map((subject, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {subject}
                        </span>
                      ))}
                      {book.subjects.length > 10 && (
                        <span className="text-gray-500 text-xs">+{book.subjects.length - 10} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BookDetail;