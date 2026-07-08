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
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="mb-4 text-[clamp(1.6rem,5vw,2.4rem)] font-bold text-gray-900">Layanan Unggulan</h2>
          <p className="mx-auto max-w-2xl text-[clamp(0.95rem,2.8vw,1.1rem)] text-gray-500">
            Akses berbagai layanan publik dan informasi terkait pengelolaan kehutanan di Jawa Barat secara digital.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
          {services.map((service) => (
            <div key={service.id} className="group flex min-h-40 flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md sm:min-h-44 sm:p-6">
              <div className={`mb-4 rounded-2xl p-4 transition-transform group-hover:scale-110 ${service.color}`}>
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-center text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary sm:text-[0.95rem]">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
