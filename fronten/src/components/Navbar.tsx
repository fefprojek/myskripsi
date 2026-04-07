import React from 'react';
import { Search, Menu, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img 
                className="h-12 w-auto" 
                src="https://dishut.jabarprov.go.id/img/logo-jabar.png" 
                alt="Logo Jabar" 
              />
              <div className="border-l border-gray-300 h-10 mx-2"></div>
              <div className="flex flex-col">
                <span className="text-primary font-bold text-sm leading-tight uppercase">Dinas Kehutanan</span>
                <span className="text-gray-600 text-xs leading-tight">Provinsi Jawa Barat</span>
              </div>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="border-primary text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Beranda
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Profil
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Layanan
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Berita
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Unduhan
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-primary">
              <Search className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-primary">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">ID</span>
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              Kontak Kami
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button className="text-gray-500">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
