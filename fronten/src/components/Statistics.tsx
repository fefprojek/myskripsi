import React from 'react';
import { Trees, MapPin, Users, Leaf } from 'lucide-react';

const stats = [
  { id: 1, label: 'Luas Hutan', value: '816.603 Ha', icon: Trees, color: 'text-green-600' },
  { id: 2, label: 'Unit Pelaksana Teknis', value: '14 UPTD', icon: MapPin, color: 'text-blue-600' },
  { id: 3, label: 'KTH Terbentuk', value: '1.245 Kelompok', icon: Users, color: 'text-orange-600' },
  { id: 4, label: 'Bibit Tersalurkan', value: '12,5 Juta', icon: Leaf, color: 'text-emerald-600' },
];

const Statistics: React.FC = () => {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8">
          <h2 className="text-[clamp(1.5rem,5vw,2.2rem)] font-bold text-gray-900">Dampak dan Cakupan Program</h2>
          <p className="max-w-3xl text-[clamp(0.92rem,2.7vw,1.05rem)] text-gray-500">
            Ringkasan cepat capaian program kehutanan dan restorasi untuk membantu pengguna memahami skala gerakan penghijauan.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
              <div className="flex items-center gap-4">
                <div className={`shrink-0 rounded-2xl bg-white p-3 shadow-sm ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <dt className="truncate text-sm font-medium text-gray-500">{stat.label}</dt>
                  <dd className="text-[clamp(1.1rem,4vw,1.45rem)] font-bold text-gray-900">{stat.value}</dd>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
