import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, X, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 bg-white p-3 rounded-xl inline-flex">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Leaf className="h-6 w-6" />
            </div>
            <div className="border-l border-gray-300 h-8 mx-2"></div>
            <div className="flex flex-col">
              <span className="text-primary font-bold text-xs uppercase">Dinas Kehutanan</span>
              <span className="text-gray-500 text-[10px]">Provinsi Jawa Barat</span>
            </div>
          </div>
          <p className="text-gray-100 text-sm leading-relaxed opacity-90">
            Dinas Kehutanan Provinsi Jawa Barat berkomitmen untuk mewujudkan pengelolaan hutan yang lestari demi kelangsungan hidup generasi mendatang.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full transition-all">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full transition-all">
              <X className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full transition-all">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full transition-all">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-8 relative inline-block">
            Tautan Cepat
            <span className="absolute bottom-[-8px] left-0 w-10 h-1 bg-secondary rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-sm opacity-90">
            <li><a href="#" className="hover:text-secondary transition-colors">Profil Dinas</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Layanan Publik</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Berita Terkini</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Publikasi & Unduhan</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Informasi Geospasial</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-8 relative inline-block">
            Layanan Kami
            <span className="absolute bottom-[-8px] left-0 w-10 h-1 bg-secondary rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-sm opacity-90">
            <li><a href="#" className="hover:text-secondary transition-colors">Perizinan Kehutanan</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Konservasi Alam</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Rehabilitasi Hutan</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Penyuluhan Kehutanan</a></li>
            <li><a href="#" className="hover:text-secondary transition-colors">Sertifikasi Kayu</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-8 relative inline-block">
            Kontak Kami
            <span className="absolute bottom-[-8px] left-0 w-10 h-1 bg-secondary rounded-full"></span>
          </h3>
          <ul className="space-y-6 text-sm opacity-90">
            <li className="flex items-start">
              <MapPin className="h-6 w-6 mr-3 text-secondary flex-shrink-0" />
              <span>Jl. Soekarno-Hatta No. 751, Kota Bandung, Jawa Barat 40286</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-secondary flex-shrink-0" />
              <span>(022) 7311135</span>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-secondary flex-shrink-0" />
              <span>dishut@jabarprov.go.id</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-white border-opacity-20 flex flex-col md:flex-row justify-between items-center text-xs opacity-80">
        <p>&copy; 2026 Dinas Kehutanan Provinsi Jawa Barat. Hak Cipta Dilindungi.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Kebijakan Privasi</a>
          <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
          <a href="#" className="hover:text-white">Peta Situs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
