import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'Gubernur Jawa Barat Tanam Pohon di Kawasan Hutan Lindung',
    date: '15 Maret 2026',
    author: 'Humas Dishut',
    category: 'Kegiatan',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    title: 'Peluncuran Aplikasi Si-Hutan untuk Pengawasan Hutan Digital',
    date: '10 Maret 2026',
    author: 'Admin IT',
    category: 'Inovasi',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    title: 'Workshop Pemberdayaan Kelompok Tani Hutan (KTH) di Bandung',
    date: '05 Maret 2026',
    author: 'Penyuluh Kehutanan',
    category: 'Pemberdayaan',
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  },
];

const News: React.FC = () => {
  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-2 text-[clamp(1.6rem,5vw,2.4rem)] font-bold text-gray-900">Berita Terkini</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          <a href="#" className="inline-flex min-h-12 items-center text-primary font-semibold hover:underline">
            Lihat Semua Berita <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-transform hover:-translate-y-1.5">
              <div className="relative aspect-[16/10]">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.title} />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {item.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1.5" />
                    {item.author}
                  </div>
                </div>
                <h3 className="text-[clamp(1.1rem,3.6vw,1.35rem)] font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600 line-clamp-3 leading-relaxed">
                  Pemerintah Provinsi Jawa Barat melalui Dinas Kehutanan terus berupaya meningkatkan koordinasi dalam pengelolaan sumber daya alam...
                </p>
                <div className="mt-6">
                  <button className="inline-flex min-h-12 items-center text-primary font-bold transition-transform group-hover:translate-x-1">
                    Baca Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
