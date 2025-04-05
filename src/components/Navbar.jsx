import SearchBar from './SearchBar';

const Navbar = ({ onSearch }) => {
  return (
    <header className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white mb-3 md:mb-0">
          <h1 className="text-2xl font-bold">Book Library</h1>
          <p className="text-sm text-blue-100">Find your next great read</p>
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Navbar;