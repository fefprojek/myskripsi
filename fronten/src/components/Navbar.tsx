import React, { useState } from 'react';
import { Search, Menu, Globe, X } from 'lucide-react';
import dishutLogo from '../assets/dishut-logo.svg';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ['Beranda', 'Profil', 'Layanan', 'Berita', 'Unduhan'];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-white p-1.5 shadow-sm">
              <img src={dishutLogo} alt="Logo Dinas Kehutanan" className="h-full w-full object-contain" />
            </div>
            <div className="h-10 w-px bg-gray-300" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[clamp(0.8rem,2.8vw,0.95rem)] font-bold uppercase leading-tight text-primary">
              Dinas Kehutanan
            </div>
            <div className="truncate text-[clamp(0.68rem,2.5vw,0.8rem)] leading-tight text-gray-600">
              Provinsi Jawa Barat
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
          <div className="flex flex-wrap items-center gap-7">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`inline-flex items-center border-b-2 pb-1 text-sm font-medium transition-colors ${
                  index === 0
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition-colors hover:text-primary"
            aria-label="Cari"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex h-12 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-gray-500 transition-colors hover:text-primary"
          >
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">ID</span>
          </button>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Kontak Kami
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 lg:hidden"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white/96 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-xl lg:hidden">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`flex min-h-12 items-center rounded-2xl px-4 text-sm font-semibold transition-colors ${
                  index === 0
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700"
            >
              <Search className="h-4 w-4" />
              Cari
            </button>
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary px-4 text-sm font-semibold text-white"
            >
              <Globe className="h-4 w-4" />
              Kontak
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
