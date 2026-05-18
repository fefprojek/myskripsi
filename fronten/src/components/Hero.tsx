import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-950 to-black" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 22%, rgba(16,185,129,0.22) 0 220px, transparent 520px), radial-gradient(circle at 82% 30%, rgba(245,158,11,0.18) 0 260px, transparent 620px), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06) 0 240px, transparent 700px), repeating-linear-gradient(35deg, rgba(255,255,255,0.06) 0 2px, rgba(0,0,0,0) 2px 18px)',
          }}
        />
        <div className="absolute inset-0 bg-black opacity-35"></div>
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
