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
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-gray-50 overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-xl bg-white shadow-sm ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                  <dd className="text-xl font-bold text-gray-900">{stat.value}</dd>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
