import React, { useState, useRef, memo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, Trees, ArrowLeft, Thermometer, Droplets, Sun, Info, ShieldCheck, Zap, User, Move, Wind, Sparkles, Sprout, Hammer, Bug, Scissors, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Realistic Visual Components ---

const RealisticTree = ({ size, color, stage, actionProgress }: { size: number, color: string, stage: number, actionProgress: number }) => {
  return (
    <div className="relative flex flex-col items-center justify-end" style={{ width: size, height: size }}>
      {/* Hole / Soil Base */}
      <motion.div 
        initial={false} 
        animate={{ 
          scale: stage >= 0 ? 1 : 0,
          backgroundColor: stage >= 4 ? '#3e2723' : '#5d4037', // Darker soil after watering
          height: stage >= 3 ? '20%' : '15%', // Higher soil after backfilling
        }}
        className="absolute bottom-0 w-3/4 rounded-[100%] blur-[1px] shadow-inner z-0"
      >
        {/* Fertilizer bits */}
        {stage >= 1 && stage < 3 && (
          <div className="absolute inset-0 flex flex-wrap gap-1 p-2 opacity-60">
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i} 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-1.5 h-1.5 bg-black rounded-full" 
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Tree Growth Stages */}
      <AnimatePresence mode="wait">
        {/* Stage 2: Placed in hole (uncovered) */}
        {stage === 2 && (
          <motion.div
            key="placed"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 0.7, y: 5 }}
            exit={{ scale: 0 }}
            className="mb-2 relative z-10 opacity-80"
            style={{ color }}
          >
            <Trees size={size / 2} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-900/40 rounded-full blur-sm" />
          </motion.div>
        )}

        {/* Stage 3: Covered (Sprout) */}
        {stage === 3 && (
          <motion.div
            key="sprout"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            className="mb-2 relative z-10"
          >
            <div className="w-2.5 h-8 bg-[#8bc34a] rounded-full shadow-sm" />
            <motion.div 
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -left-3 top-0 w-5 h-4 bg-[#8bc34a] rounded-full rotate-[-45deg] border-b-2 border-black/10" 
            />
            <motion.div 
              animate={{ rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="absolute -right-3 top-1 w-4 h-3 bg-[#8bc34a] rounded-full rotate-[45deg] border-b-2 border-black/10" 
            />
          </motion.div>
        )}

        {/* Stage 4+: Growing to Adult */}
        {stage >= 4 && (
          <motion.div
            key="tree"
            initial={{ scale: 0.5, y: 20, opacity: 0 }}
            animate={{ 
              scale: stage === 4 ? 0.9 : 1.3, 
              y: 0, 
              opacity: 1,
              rotate: [-0.5, 0.5, -0.5]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              scale: { type: 'spring', damping: 15 }
            }}
            className="relative z-10 mb-2"
          >
            {/* Trunk */}
            <div className="w-6 h-24 bg-[#5d4037] mx-auto rounded-t-full relative shadow-lg">
              <div className="absolute inset-y-0 left-1.5 w-1.5 bg-black/10 rounded-full" />
            </div>
            
            {/* Foliage Layers */}
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-36 h-36">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: color }} />
              <Trees size={144} style={{ color }} className="drop-shadow-2xl" />
              
              {/* Extra Detail for Stage 5 */}
              {stage >= 5 && (
                <>
                  <motion.div 
                    animate={{ y: [0, -3, 0], x: [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute -top-6 -right-4"
                  >
                    <Trees size={56} style={{ color: color + 'EE' }} />
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 3, 0], x: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
                    className="absolute -top-2 -left-8"
                  >
                    <Trees size={48} style={{ color: color + 'DD' }} />
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Effects */}
      <AnimatePresence>
        {actionProgress > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            {stage === 0 && ( // Digging
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [-20, -50], x: [0, (i - 2) * 20], opacity: [1, 0] }}
                    className="w-3 h-3 bg-[#5d4037] rounded-full"
                  />
                ))}
              </div>
            )}
            {stage === 3 && ( // Backfilling
              <motion.div 
                animate={{ y: [20, 0], opacity: [0, 1, 0] }}
                className="w-40 h-10 bg-[#5d4037] rounded-full blur-sm"
              />
            )}
            {stage === 4 && ( // Watering
              <div className="flex gap-1 animate-bounce text-blue-400">
                <Droplets size={24} fill="currentColor" />
                <Droplets size={32} fill="currentColor" className="mt-4" />
                <Droplets size={24} fill="currentColor" />
              </div>
            )}
            {stage === 5 && ( // Sun
              <div className="relative">
                <Sun size={100} className="text-yellow-400 animate-spin-slow opacity-60" />
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl"
                />
              </div>
            )}
            {/* Level 2 VFX */}
            {actionProgress > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [1, 1.5, 1] }}
                className="absolute"
              >
                <Sparkles size={60} className="text-yellow-300" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CharacterSprite = ({ isWalking, direction }: { isWalking: boolean, direction: 'left' | 'right' }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Head & Hat */}
      <motion.div 
        animate={{ y: isWalking ? [0, -4, 0] : [0, -1, 0] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="relative z-20"
      >
        {/* Hat */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-6 bg-[#ffeb3b] rounded-full border-2 border-[#fbc02d] shadow-sm" />
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#fbc02d] rounded-t-full" />
        {/* Face/Head */}
        <div className="w-10 h-10 bg-[#ffe0b2] rounded-full border-2 border-[#d7ccc8] flex items-end justify-center overflow-hidden">
          <div className="flex gap-2 mb-3">
            <div className="w-1 h-1 bg-black rounded-full" />
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Body */}
      <motion.div 
        animate={{ 
          rotate: isWalking ? [-5, 5, -5] : 0,
          y: isWalking ? [0, -2, 0] : 0
        }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="w-12 h-14 bg-[#3f51b5] rounded-xl border-2 border-[#303f9f] -mt-1 relative z-10 shadow-md"
      >
        {/* Overalls detail */}
        <div className="absolute inset-x-2 top-0 bottom-4 border-x-4 border-[#303f9f] opacity-20" />
        {/* Arms */}
        <motion.div 
          animate={{ rotate: isWalking ? [20, -20, 20] : 0 }}
          className="absolute -left-3 top-2 w-4 h-8 bg-[#3f51b5] rounded-full border-2 border-[#303f9f] origin-top" 
        />
        <motion.div 
          animate={{ rotate: isWalking ? [-20, 20, -20] : 0 }}
          className="absolute -right-3 top-2 w-4 h-8 bg-[#3f51b5] rounded-full border-2 border-[#303f9f] origin-top" 
        />
      </motion.div>

      {/* Legs */}
      <div className="flex gap-1 -mt-1">
        <motion.div 
          animate={{ y: isWalking ? [0, -5, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 0.5, delay: 0 }}
          className="w-5 h-6 bg-[#303f9f] rounded-b-lg border-2 border-[#1a237e]" 
        />
        <motion.div 
          animate={{ y: isWalking ? [0, -5, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 0.5, delay: 0.25 }}
          className="w-5 h-6 bg-[#303f9f] rounded-b-lg border-2 border-[#1a237e]" 
        />
      </div>

      {/* Shadow */}
      <motion.div 
        animate={{ scale: isWalking ? [1, 0.9, 1] : 1 }}
        className="w-12 h-3 bg-black/20 rounded-full blur-sm mt-1" 
      />
    </div>
  );
};

const Butterfly = () => (
  <motion.div
    initial={{ x: Math.random() * 500, y: Math.random() * 300 }}
    animate={{ 
      x: [null, Math.random() * 500, Math.random() * 500],
      y: [null, Math.random() * 300, Math.random() * 300],
    }}
    transition={{ repeat: Infinity, duration: 10 + Math.random() * 10, ease: "linear" }}
    className="absolute pointer-events-none z-40"
  >
    <motion.div 
      animate={{ rotateY: [0, 80, 0] }}
      transition={{ repeat: Infinity, duration: 0.2 }}
      className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"
    />
  </motion.div>
);

type Region = {
  id: string;
  name: string;
  status: 'gersang' | 'kritis' | 'hijau';
  description: string;
  path: string;
  x: number;
  y: number;
};

type Seedling = {
  id: string;
  name: string;
  icon: typeof Trees;
  description: string;
  color: string;
};

const seedlings: Seedling[] = [
  { id: 's1', name: 'Mahoni', icon: Trees, description: 'Pohon pelindung dengan kayu kuat dan rindang.', color: '#15803d' },
  { id: 's2', name: 'Jati', icon: Trees, description: 'Kayu kualitas premium untuk investasi masa depan.', color: '#854d0e' },
  { id: 's3', name: 'Pinus', icon: Trees, description: 'Cocok untuk daerah pegunungan dan penghasil getah.', color: '#166534' },
];

const allRegions: Region[] = [
  { id: '1', name: 'Lembang', status: 'hijau', description: 'Kawasan hijau dengan vegetasi rapat dan udara sejuk.', path: "M30,5 Q50,0 70,5 L75,15 Q65,22 55,25 Q40,22 30,18 Z", x: 50, y: 10 },
  { id: '2', name: 'Cidadap', status: 'kritis', description: 'Kawasan resapan air yang mulai berkurang akibat pembangunan.', path: "M30,18 Q45,22 55,25 L60,35 Q45,38 35,35 Z", x: 48, y: 28 },
  { id: '3', name: 'Kota Bandung', status: 'gersang', description: 'Pusat kota dengan kepadatan bangunan tinggi, perlu RTH tambahan.', path: "M35,35 Q50,38 65,35 L68,50 Q50,55 40,52 Z", x: 52, y: 44 },
  { id: '4', name: 'Bandung Kulon', status: 'gersang', description: 'Wilayah industri dengan polusi tinggi dan minim pepohonan.', path: "M10,35 Q25,32 35,35 L40,52 Q25,58 15,65 L5,55 Z", x: 22, y: 48 },
  { id: '5', name: 'Padalarang', status: 'gersang', description: 'Kawasan pertambangan batu kapur yang gersang.', path: "M5,20 Q20,5 30,5 L35,18 L10,35 Z", x: 18, y: 18 },
  { id: '6', name: 'Cimahi', status: 'kritis', description: 'Wilayah pemukiman padat dengan lahan hijau terbatas.', path: "M25,32 Q32,30 40,35 L35,45 L25,42 Z", x: 32, y: 38 },
  { id: '7', name: 'Cibiru', status: 'gersang', description: 'Kawasan timur yang gersang dan padat penduduk.', path: "M75,15 Q85,18 95,25 L98,45 Q85,50 75,45 Z", x: 85, y: 32 },
  { id: '8', name: 'Gedebage', status: 'kritis', description: 'Kawasan rawan banjir, perlu pohon penahan air.', path: "M68,50 Q80,48 85,45 L90,65 Q75,70 65,65 Z", x: 78, y: 56 },
  { id: '9', name: 'Soreang', status: 'kritis', description: 'Pusat pemerintahan kabupaten yang perlu penghijauan.', path: "M35,65 Q50,55 65,65 L60,85 Q45,90 35,85 Z", x: 48, y: 75 },
  { id: '10', name: 'Ciwidey', status: 'hijau', description: 'Kawasan wisata alam dengan hutan lindung yang terjaga.', path: "M5,55 Q15,65 35,65 L35,85 Q20,95 5,85 Z", x: 20, y: 78 },
  { id: '11', name: 'Pangalengan', status: 'hijau', description: 'Kawasan perkebunan dan hutan yang subur.', path: "M60,85 Q75,90 90,85 L85,98 Q70,100 55,95 Z", x: 72, y: 92 },
  { id: '12', name: 'Rancaekek', status: 'kritis', description: 'Wilayah industri hilir yang sering terdampak limbah.', path: "M85,45 Q98,50 95,75 L80,85 L70,65 Z", x: 88, y: 65 },
];

const RegionItem = memo(({ region, isHovered, onHover, onClick }: { 
  region: Region, isHovered: boolean, onHover: (r: Region | null) => void, onClick: (r: Region) => void 
}) => {
  const color = region.status === 'hijau' ? '#10b981' : region.status === 'kritis' ? '#f59e0b' : '#ef4444';
  return (
    <g
      onMouseEnter={() => onHover(region)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(region)}
      className={region.status !== 'hijau' ? 'cursor-pointer' : 'cursor-default'}
    >
      <path
        d={region.path}
        fill={color}
        fillOpacity={isHovered ? 0.9 : 0.25}
        stroke={isHovered ? "#fff" : "#94a3b8"}
        strokeWidth={isHovered ? 0.5 : 0.2}
        style={{ transition: 'all 0.2s ease-out' }}
      />
      {region.status !== 'hijau' && (
        <circle cx={region.x} cy={region.y} r="1" fill="white" opacity={0.8} />
      )}
    </g>
  );
});

const InteractiveMap = memo(({ onHover, hoveredRegion, onSelect }: { 
  onHover: (r: Region | null) => void, 
  hoveredRegion: Region | null,
  onSelect: (r: Region) => void 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  // Determine tooltip direction based on hovered region coordinates
  const tooltipOffset = hoveredRegion ? {
    x: hoveredRegion.x > 70 ? -220 : 15,
    y: hoveredRegion.y > 70 ? -130 : 15
  } : { x: 15, y: 15 };

  return (
    <div 
      ref={mapRef}
      onMouseMove={handleMouseMove}
      className="relative bg-slate-50 rounded-[2rem] border border-slate-200 aspect-[16/10] overflow-hidden shadow-inner"
    >
      <div className="absolute top-4 left-4 z-10 space-y-1.5 bg-white/80 p-2.5 rounded-xl border border-slate-100 backdrop-blur-sm text-[10px] font-black uppercase pointer-events-none">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Lestari</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Kritis</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Gersang</div>
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full">
        {allRegions.map(r => (
          <RegionItem 
            key={r.id} 
            region={r} 
            isHovered={hoveredRegion?.id === r.id} 
            onHover={onHover} 
            onClick={onSelect}
          />
        ))}
      </svg>

      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.15 }
            }}
            exit={{ opacity: 0 }}
            style={{ 
              left: smoothX, 
              top: smoothY, 
              x: tooltipOffset.x, 
              y: tooltipOffset.y 
            }}
            className="absolute z-50 bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl pointer-events-none min-w-[200px] border border-white/10 backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-black text-sm text-emerald-400 uppercase tracking-wide">{hoveredRegion.name}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                hoveredRegion.status === 'hijau' ? 'bg-emerald-500' : 
                hoveredRegion.status === 'kritis' ? 'bg-orange-500' : 'bg-red-500'
              }`}>{hoveredRegion.status}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{hoveredRegion.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const TreeGame: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'selection' | 'seedling' | 'planting' | 'finished'>('selection');
  const [level, setLevel] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSeedling, setSelectedSeedling] = useState<Seedling | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const [plantingStep, setPlantingStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [actionProgress, setActionProgress] = useState(0);
  
  // Character Movement State
  const [charPos, setCharPos] = useState({ x: 100, y: 100 });
  const [charDirection, setCharDirection] = useState<'left' | 'right'>('right');
  const [isWalking, setIsWalking] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const level1Steps = [
    { id: 'hole', title: 'Gali Lubang', icon: MapPin, text: 'Gunakan Sekop untuk menggali lubang tanam. Pastikan tanah cukup gembur untuk perkembangan akar.' },
    { id: 'fertilizer', title: 'Pupuk Dasar', icon: Thermometer, text: 'Taburkan pupuk organik. Nutrisi ini akan membantu bibit bertahan di fase awal penanaman.' },
    { id: 'plant', title: 'Letakkan Bibit', icon: Trees, text: 'Letakkan bibit ke dalam lubang dengan hati-hati. Pastikan posisinya tegak lurus.' },
    { id: 'cover', title: 'Tutup Tanah', icon: Sprout, text: 'Tutup kembali lubang dengan tanah dan tekan perlahan agar bibit tertanam kokoh.' },
    { id: 'water', title: 'Penyiraman', icon: Droplets, text: 'Siram dengan air yang cukup agar tanah lembab dan merangsang pertumbuhan tunas baru.' },
    { id: 'sun', title: 'Perawatan Matahari', icon: Sun, text: 'Pastikan tanaman mendapat sinar matahari yang cukup untuk proses fotosintesis.' },
  ];

  const level2Steps = [
    { id: 'pest', title: 'Basmi Hama', icon: Bug, text: 'Wah, ada serangga pengganggu! Seret alat pembasmi hama ke pohon agar daun tidak dimakan.' },
    { id: 'prune', title: 'Pruning Daun', icon: Scissors, text: 'Potong ranting yang kering menggunakan gunting agar nutrisi fokus ke pertumbuhan daun baru.' },
    { id: 'fertilizer2', title: 'Pupuk Lanjutan', icon: Sparkles, text: 'Berikan pupuk tambahan agar pohon tumbuh lebih rimbun dan kuat melawan cuaca.' },
    { id: 'water2', title: 'Siram Segar', icon: Droplets, text: 'Siram kembali agar pohon tetap terhidrasi di siang hari yang terik.' },
  ];

  const currentSteps = level === 1 ? level1Steps : level2Steps;

  // Character Movement Logic
  useEffect(() => {
    if (phase !== 'planting') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 15;
      setCharPos(prev => {
        let newX = prev.x;
        let newY = prev.y;
        setIsWalking(true);

        if (e.key === 'ArrowLeft' || e.key === 'a') {
          newX = Math.max(50, prev.x - step);
          setCharDirection('left');
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
          newX = Math.min(550, prev.x + step);
          setCharDirection('right');
        }
        if (e.key === 'ArrowUp' || e.key === 'w') {
          newY = Math.max(50, prev.y - step);
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
          newY = Math.min(350, prev.y + step);
        }

        return { x: newX, y: newY };
      });
    };

    const handleKeyUp = () => setIsWalking(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [phase]);

  const handleRegionSelect = (region: Region) => {
    if (region.status === 'hijau') return;
    setSelectedRegion(region);
    setPhase('seedling');
  };

  const handleSeedlingSelect = (seedling: Seedling) => {
    setSelectedSeedling(seedling);
    setPhase('planting');
    setLevel(1);
    setPlantingStep(0);
    setActionProgress(0);
    setCharPos({ x: 100, y: 100 });
  };

  const handleActionComplete = () => {
    if (plantingStep < currentSteps.length - 1) {
      setPlantingStep(s => s + 1);
      setActionProgress(0);
    } else {
      if (level === 1) {
        // Transition to Level 2
        setLevel(2);
        setPlantingStep(0);
        setActionProgress(0);
      } else {
        setPhase('finished');
      }
    }
  };

  const isNearTarget = () => {
    // The target (soil) is at the center of the lg:col-span-8 area.
    // Assuming the area is roughly 600x400 in our coordinate system
    const targetX = 300;
    const targetY = 200;
    const distance = Math.sqrt(Math.pow(charPos.x - targetX, 2) + Math.pow(charPos.y - targetY, 2));
    return distance < 80;
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-6 px-4 font-sans select-none overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-primary font-bold mb-4 hover:underline self-start"
        >
          <ArrowLeft size={18} className="mr-2" /> Kembali
        </button>

        <AnimatePresence mode="wait">
          {phase === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border border-emerald-100 flex-1 flex flex-col"
            >
              <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 flex items-center justify-center gap-3">
                  <MapPin className="text-primary" /> Eksplorasi Bandung Raya
                </h1>
                <p className="text-gray-500 text-sm">Pilih wilayah berwarna Merah atau Oranye untuk mulai restorasi.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
                <div className="lg:col-span-8 flex flex-col">
                  <InteractiveMap 
                    onHover={setHoveredRegion} 
                    hoveredRegion={hoveredRegion} 
                    onSelect={handleRegionSelect}
                  />
                </div>

                <div className="lg:col-span-4 flex flex-col">
                  <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 h-full flex flex-col">
                    <h3 className="text-lg font-black text-gray-900 mb-4 uppercase flex items-center gap-2 border-b border-emerald-200 pb-3">
                      <Info size={20} className="text-primary" /> Analisis Lahan
                    </h3>
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        {hoveredRegion || selectedRegion ? (
                          <motion.div
                            key={(hoveredRegion || selectedRegion)?.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                          >
                            <div className={`p-4 rounded-2xl border-2 mb-4 bg-white ${
                              (hoveredRegion || selectedRegion)?.status === 'hijau' ? 'border-emerald-400' :
                              (hoveredRegion || selectedRegion)?.status === 'kritis' ? 'border-orange-400' : 'border-red-400'
                            }`}>
                              <h4 className="text-xl font-black">{(hoveredRegion || selectedRegion)?.name}</h4>
                              <p className="text-[10px] font-black uppercase opacity-50">Status: {(hoveredRegion || selectedRegion)?.status}</p>
                            </div>
                            <p className="text-sm text-gray-600 italic mb-6 leading-relaxed">"{(hoveredRegion || selectedRegion)?.description}"</p>
                            
                            {(hoveredRegion || selectedRegion)?.status !== 'hijau' ? (
                              <button
                                onClick={() => handleRegionSelect((hoveredRegion || selectedRegion)!)}
                                className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                              >
                                MULAI RESTORASI <Zap size={18} />
                              </button>
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-emerald-700 font-black p-4 bg-white rounded-2xl border border-emerald-200">
                                <ShieldCheck size={32} />
                                <span className="text-[10px] uppercase">Wilayah Terproteksi</span>
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-12 opacity-20 text-center">
                            <MapPin size={48} className="mb-4" />
                            <p className="text-[10px] font-black uppercase">Pilih wilayah pada peta</p>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'seedling' && (
            <motion.div
              key="seedling"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white p-8 rounded-[3rem] shadow-xl border border-emerald-100 max-w-4xl mx-auto w-full"
            >
              <div className="text-center mb-10">
                <span className="bg-emerald-100 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                  Langkah 1: Pemilihan
                </span>
                <h2 className="text-3xl font-black text-gray-900">PILIH BIBIT POHON</h2>
                <p className="text-gray-500 text-sm mt-2">Pilih jenis pohon yang paling cocok untuk direstorasi di {selectedRegion?.name}.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {seedlings.map((s) => (
                  <motion.div
                    key={s.id}
                    whileHover={{ y: -5 }}
                    onClick={() => handleSeedlingSelect(s)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-2 border-transparent group-hover:border-primary transition-all flex flex-col items-center text-center h-full">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all text-primary">
                        <s.icon size={40} />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2">{s.name}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-6">{s.description}</p>
                      <div className="mt-auto w-full py-3 bg-white rounded-xl text-[10px] font-black text-primary uppercase border border-emerald-100">Pilih Bibit</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'planting' && selectedRegion && selectedSeedling && (
            <motion.div
              key="planting"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#fdf6e3] p-8 rounded-[3rem] shadow-xl text-center border-8 border-[#8b4513] max-w-5xl mx-auto w-full relative overflow-hidden"
            >
              {/* Header SIM Style */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 relative z-20 bg-[#f4e4bc] p-4 rounded-2xl border-4 border-[#d4a373] shadow-md">
                <div className="text-left">
                  <span className="bg-[#8b4513] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-1 inline-block shadow-sm">
                    {selectedRegion.name} • {selectedSeedling.name}
                  </span>
                  <h2 className="text-2xl font-black text-[#5d4037] uppercase tracking-tighter">Buku Harian Penanaman</h2>
                </div>
                <div className="flex items-center gap-4 bg-[#fff9eb] p-3 rounded-xl border-2 border-[#d4a373]">
                    <div className="flex flex-col items-center px-2 border-r-2 border-[#d4a373]">
                      <p className="text-[8px] font-black text-[#8b4513] uppercase leading-none">Level</p>
                      <p className="text-lg font-black text-[#d4a373]">{level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-[#8b4513] uppercase leading-none">Misi Selesai</p>
                      <p className="text-xl font-black text-[#2e7d32] leading-none mt-1">{Math.round(((plantingStep) / currentSteps.length) * 100)}%</p>
                    </div>
                    <div className="w-32 h-3 bg-[#e0e0e0] rounded-full overflow-hidden border-2 border-[#8b4513]">
                      <motion.div 
                        animate={{ width: `${((plantingStep) / currentSteps.length) * 100}%` }}
                        className="h-full bg-[#4caf50]"
                      />
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[500px]">
                {/* Interactive Area - Harvest Moon Style */}
                <div 
                  ref={gameAreaRef}
                  className="lg:col-span-8 bg-[#7cb342] rounded-[2rem] relative shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] overflow-hidden border-4 border-[#558b2f]"
                  style={{ 
                    backgroundImage: 'radial-gradient(#8bc34a 10%, transparent 11%), radial-gradient(#8bc34a 10%, transparent 11%)',
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 20px 20px'
                  }}
                >
                  {/* Environmental Life */}
                  {[...Array(5)].map((_, i) => <Butterfly key={i} />)}
                  
                  {/* Decorative Pagar */}
                  <div className="absolute top-0 left-0 w-full h-8 flex justify-around pointer-events-none opacity-40">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-2 h-12 bg-[#8b4513] border-x border-black/20" />
                    ))}
                    <div className="absolute top-4 left-0 w-full h-2 bg-[#8b4513]" />
                  </div>

                  {/* Character */}
                  <motion.div
                    animate={{ 
                      x: charPos.x, 
                      y: charPos.y,
                      scaleX: charDirection === 'left' ? -1 : 1,
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                    className="absolute z-30 pointer-events-none"
                    style={{ width: 60, height: 80 }}
                  >
                    <CharacterSprite isWalking={isWalking} direction={charDirection} />
                  </motion.div>

                  {/* Soil Target Area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: isNearTarget() ? 1.05 : 1,
                        borderColor: isNearTarget() ? '#ffeb3b' : '#3e2723',
                        backgroundColor: isNearTarget() ? 'rgba(93, 64, 55, 0.3)' : 'rgba(93, 64, 55, 0.2)'
                      }}
                      className="w-48 h-48 border-4 border-dashed rounded-3xl flex items-center justify-center transition-all duration-300 relative"
                    >
                      <div className="relative z-10">
                        {/* Realistic Tree Visualization */}
                        <RealisticTree 
                          size={140 + (plantingStep * 10)} 
                          color={selectedSeedling.color} 
                          stage={plantingStep} 
                          actionProgress={actionProgress}
                        />
                        
                        {/* Placeholder for early stages */}
                        {plantingStep < 3 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            {plantingStep === 0 && (
                              <div className="text-[#3e2723]/40 flex flex-col items-center">
                                <Move size={32} className="animate-pulse" />
                                <p className="text-[8px] font-black uppercase mt-1">Gali di Sini</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Proximity Warning */}
                  <AnimatePresence>
                    {!isNearTarget() && isDragging && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-black text-xs uppercase shadow-xl z-40 border-2 border-white"
                      >
                        DEKATI AREA TANAM DULU!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Draggable Tool HUD */}
                  <div className="absolute bottom-6 right-6 z-40 flex flex-col items-center">
                    <p className="text-[10px] font-black text-[#5d4037] uppercase mb-2 bg-[#fff9eb] px-3 py-1 rounded-lg border-2 border-[#d4a373]">Gunakan Alat</p>
                    <motion.div
                      drag
                      dragSnapToOrigin
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={(_, info) => {
                        setIsDragging(false);
                        if (isNearTarget()) {
                          setActionProgress(100);
                          setTimeout(handleActionComplete, 1000);
                        }
                      }}
                      whileDrag={{ scale: 1.2 }}
                      className="w-24 h-24 bg-[#fff9eb] rounded-2xl shadow-xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border-4 border-[#8b4513] text-[#8b4513] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-[#8b4513]/5" />
                      {React.createElement(
                        plantingStep === 2 ? selectedSeedling.icon : plantingSteps[plantingStep].icon, 
                        { size: 40, className: "relative z-10" }
                      )}
                      <div className="text-[7px] font-black uppercase mt-1 relative z-10 opacity-60">
                        {plantingSteps[plantingStep].id}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Info & Guide - Wooden Style */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="bg-[#f4e4bc] p-6 rounded-[2rem] border-4 border-[#d4a373] shadow-md flex-1 flex flex-col text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4a373] rotate-45 translate-x-8 -translate-y-8" />
                    <h3 className="text-xs font-black text-[#8b4513] uppercase mb-1 tracking-widest opacity-60">Langkah {plantingStep + 1}</h3>
                    <h4 className="text-xl font-black text-[#5d4037] mb-3 uppercase border-b-2 border-[#d4a373] pb-2">{plantingSteps[plantingStep].title}</h4>
                    <p className="text-[#5d4037] text-xs leading-relaxed mb-6 font-medium italic">"{plantingSteps[plantingStep].text}"</p>
                    
                    <div className="mt-auto p-4 bg-[#fff9eb] rounded-xl border-2 border-[#d4a373]">
                      <div className="flex items-center gap-3 text-[#2e7d32] font-black text-[10px]">
                        <div className="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse" />
                        CARA BERMAIN:
                      </div>
                      <p className="text-[10px] text-[#5d4037] mt-2 font-bold leading-tight">
                        1. Gunakan <span className="text-red-600 uppercase">WASD</span> untuk bergerak.<br/>
                        2. Dekati area kotak putus-putus.<br/>
                        3. Seret alat ke kotak tersebut!
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#3e2723] p-5 rounded-[2rem] text-white border-4 border-[#212121] shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#4caf50] rounded-xl flex items-center justify-center text-white shadow-inner">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/40 uppercase leading-none">Status Lahan</p>
                        <p className="text-xs font-bold text-[#8bc34a] mt-1 tracking-wider">+20% Ekosistem</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'finished' && selectedRegion && selectedSeedling && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center border-8 border-emerald-500 max-w-3xl mx-auto w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl animate-bounce">
                <Trophy size={48} />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">SEMUA LEVEL SELESAI!</h1>
              <p className="text-gray-600 mb-8 text-sm px-10">Luar biasa! Anda telah berhasil menanam dan merawat bibit <span className="font-black text-emerald-600">{selectedSeedling.name}</span> hingga tumbuh sempurna di <span className="font-black text-emerald-600 underline">{selectedRegion.name}</span>.</p>
              
              <div className="bg-emerald-50 p-6 rounded-3xl border-4 border-emerald-100 mb-8 text-left relative">
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-white p-2 rounded-full shadow-lg rotate-12">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-[10px] font-black text-emerald-700 uppercase mb-3 tracking-widest">Sertifikat Restorasi</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-xl border-2 border-emerald-200 shadow-sm">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Wilayah</p>
                    <p className="text-xs font-bold text-gray-800">{selectedRegion.name}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border-2 border-emerald-200 shadow-sm">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Jenis Pohon</p>
                    <p className="text-xs font-bold text-gray-800">{selectedSeedling.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => { setPhase('selection'); setPlantingStep(0); setSelectedRegion(null); setSelectedSeedling(null); setLevel(1); }} className="bg-slate-100 px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all shadow-md active:scale-95">Mulai Baru</button>
                <button onClick={() => navigate('/')} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-emerald-700 shadow-lg transition-all active:scale-95">Selesai</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TreeGame;
