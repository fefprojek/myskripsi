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
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Berita Terkini</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
          <a href="#" className="flex items-center text-primary font-semibold hover:underline">
            Lihat Semua Berita <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white overflow-hidden shadow-lg rounded-2xl group transition-transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-56">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.title} />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {item.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1.5" />
                    {item.author}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600 line-clamp-3 leading-relaxed">
                  Pemerintah Provinsi Jawa Barat melalui Dinas Kehutanan terus berupaya meningkatkan koordinasi dalam pengelolaan sumber daya alam...
                </p>
                <div className="mt-6">
                  <button className="text-primary font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
