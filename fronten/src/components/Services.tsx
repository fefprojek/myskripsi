import React from 'react';
import { FileText, TreePine, ClipboardCheck, Info, HelpCircle, Download } from 'lucide-react';

const services = [
  { id: 1, name: 'Perizinan Kehutanan', icon: FileText, color: 'bg-green-100 text-green-700' },
  { id: 2, name: 'Rehabilitasi Hutan', icon: TreePine, color: 'bg-emerald-100 text-emerald-700' },
  { id: 3, name: 'Pengaduan Masyarakat', icon: HelpCircle, color: 'bg-orange-100 text-orange-700' },
  { id: 4, name: 'Data & Informasi', icon: Info, color: 'bg-blue-100 text-blue-700' },
  { id: 5, name: 'Sertifikasi Kayu', icon: ClipboardCheck, color: 'bg-teal-100 text-teal-700' },
  { id: 6, name: 'Dokumen Publik', icon: Download, color: 'bg-gray-100 text-gray-700' },
];

const Services: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Layanan Unggulan</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Akses berbagai layanan publik dan informasi terkait pengelolaan kehutanan di Jawa Barat secara digital.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => (
            <div key={service.id} className="group flex flex-col items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary transition-all duration-300">
              <div className={`p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform ${service.color}`}>
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 text-center group-hover:text-primary transition-colors">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
