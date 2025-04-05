import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, searchBy);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex">
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="rounded-l-lg border-r-0 bg-white text-gray-700 px-3 py-2 focus:outline-none"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="q">Keyword</option>
          </select>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="flex-grow rounded-r-lg sm:rounded-r-none border-l-0 px-4 py-2 focus:outline-none"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-800 hover:bg-blue-900 text-white rounded-lg sm:rounded-l-none px-4 py-2 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;