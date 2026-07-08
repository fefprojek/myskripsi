import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trees, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingTreeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[100] sm:bottom-8 sm:right-8">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/game')}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-500 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.5)] sm:h-20 sm:w-20"
        aria-label="Tanam Pohon"
      >
        {/* Animated outer ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-emerald-400 rounded-full -z-10"
        />
        
        {/* Tooltip/Label */}
        <div className="pointer-events-none absolute bottom-full right-0 mb-3 flex translate-y-2 items-center gap-2 rounded-xl border border-emerald-500/50 bg-slate-900 px-3 py-2 text-xs font-black text-emerald-400 opacity-100 shadow-2xl transition-all sm:bottom-auto sm:right-full sm:mb-0 sm:mr-6 sm:translate-x-4 sm:translate-y-0 sm:text-sm sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 whitespace-nowrap">
          <Zap size={14} fill="currentColor" /> MISI REBOISASI: AKTIF
        </div>
        
        <Trees className="h-7 w-7 sm:h-8 sm:w-8" />
        
        {/* Tech Corner Accents */}
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white rounded-tr-sm opacity-50" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white rounded-bl-sm opacity-50" />
      </motion.button>
    </div>
  );
};

export default FloatingTreeButton;
