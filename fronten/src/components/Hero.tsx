import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://dishut.jabarprov.go.id/img/hero-bg.jpg"
          alt="Forest in West Java"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80';
          }}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl uppercase mb-6 leading-tight">
            Menjaga Kelestarian <br />
            <span className="text-secondary">Hutan Jawa Barat</span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-xl leading-relaxed">
            Dinas Kehutanan Provinsi Jawa Barat berkomitmen untuk mewujudkan tata kelola kehutanan yang lestari demi kesejahteraan masyarakat.
          </p>
          <div className="mt-10 flex space-x-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 transition-all transform hover:scale-105">
              Selengkapnya
            </button>
            <button className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900 transition-all">
              Video Profil
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 flex space-x-4">
        <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full text-white backdrop-blur-sm transition-all">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full text-white backdrop-blur-sm transition-all">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
