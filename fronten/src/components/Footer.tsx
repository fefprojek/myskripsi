import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, X } from 'lucide-react';
import dishutLogo from '../assets/dishut-logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary pb-10 pt-16 text-white sm:pt-20">
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-white p-1 shadow-sm">
              <img src={dishutLogo} alt="Logo Dinas Kehutanan" className="h-full w-full object-contain" />
            </div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="flex flex-col">
              <span className="text-primary font-bold text-xs uppercase">Dinas Kehutanan</span>
              <span className="text-gray-500 text-[10px]">Provinsi Jawa Barat</span>
            </div>
          </div>
          <p className="text-gray-100 text-sm leading-relaxed opacity-90">
            Dinas Kehutanan Provinsi Jawa Barat berkomitmen untuk mewujudkan pengelolaan hutan yang lestari demi kelangsungan hidup generasi mendatang.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/40">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/40">
              <X className="h-5 w-5" />
            </a>
            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/40">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/40">
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
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/20 px-4 pt-8 text-xs opacity-80 sm:px-6 md:flex-row md:items-center lg:px-8">
        <p>&copy; 2026 Dinas Kehutanan Provinsi Jawa Barat. Hak Cipta Dilindungi.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#" className="hover:text-white">Kebijakan Privasi</a>
          <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
          <a href="#" className="hover:text-white">Peta Situs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
