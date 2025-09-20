import React, { useState } from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <Link to="/" className="hidden md:block text-xl font-semibold text-gray-800 dark:text-white">
            Lead Manager
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
