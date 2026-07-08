import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gray-900 min-h-[clamp(32rem,82vh,46rem)]">
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
      <div className="relative mx-auto flex min-h-[clamp(32rem,82vh,46rem)] max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[clamp(0.72rem,2vw,0.82rem)] font-black uppercase tracking-[0.24em] text-emerald-200 backdrop-blur-sm">
            Platform Edukasi Restorasi Hutan
          </div>
          <h1 className="mb-5 mt-5 text-[clamp(2.25rem,8vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white uppercase">
            Menjaga Kelestarian <br />
            <span className="text-secondary">Hutan Jawa Barat</span>
          </h1>
          <p className="max-w-2xl text-[clamp(1rem,3.2vw,1.25rem)] leading-relaxed text-gray-200">
            Dinas Kehutanan Provinsi Jawa Barat berkomitmen untuk mewujudkan tata kelola kehutanan yang lestari demi kesejahteraan masyarakat.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <button className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-primary/90">
              Selengkapnya
            </button>
            <button className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-white px-6 py-3 text-base font-medium text-white transition-all hover:bg-white hover:text-gray-900">
              Video Profil
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-3 sm:bottom-8 sm:right-8">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
