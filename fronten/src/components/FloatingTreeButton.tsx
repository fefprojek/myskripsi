import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trees, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingTreeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/game')}
        className="relative bg-emerald-500 text-slate-950 p-5 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center group border-2 border-emerald-400"
        aria-label="Tanam Pohon"
      >
        {/* Animated outer ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-emerald-400 rounded-full -z-10"
        />
        
        {/* Tooltip/Label */}
        <div className="absolute right-full mr-6 bg-slate-900 text-emerald-400 px-4 py-2 rounded-xl text-sm font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap border border-emerald-500/50 pointer-events-none flex items-center gap-2">
          <Zap size={14} fill="currentColor" /> MISI REBOISASI: AKTIF
        </div>
        
        <Trees className="w-8 h-8" />
        
        {/* Tech Corner Accents */}
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white rounded-tr-sm opacity-50" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white rounded-bl-sm opacity-50" />
      </motion.button>
    </div>
  );
};

export default FloatingTreeButton;
