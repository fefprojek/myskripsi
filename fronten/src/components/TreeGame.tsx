import React, { useState, useRef, memo, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, Trees, ArrowLeft, Thermometer, Droplets, Sun, Info, ShieldCheck, Zap, Move, Sparkles, Sprout, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Realistic Visual Components ---

const RealisticTree = ({ size, color, stage, actionProgress, icon: Icon, health, moisture }: { size: number, color: string, stage: number, actionProgress: number, icon?: React.ElementType, health: number, moisture: number }) => {
  const health01 = Math.max(0, Math.min(1, health / 100));
  const moisture01 = Math.max(0, Math.min(1, moisture / 100));
  return (
    <div className="relative flex flex-col items-center justify-end" style={{ width: size, height: size }}>
      {/* Hole / Soil Base */}
      <motion.div 
        initial={false} 
        animate={{ 
          scale: stage >= 0 ? 1 : 0,
          backgroundColor: stage >= 4 ? '#3e2723' : '#5d4037',
          height: stage >= 3 ? '20%' : '15%',
        }}
        className="absolute bottom-0 w-3/4 rounded-[100%] blur-[1px] shadow-inner z-0"
      >
        <div
          className="absolute inset-0 rounded-[100%]"
          style={{
            opacity: 0.85,
            backgroundImage:
              moisture01 < 0.28
                ? 'repeating-linear-gradient(135deg, rgba(0,0,0,0.22) 0 2px, rgba(0,0,0,0) 2px 10px), radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0 18px, transparent 38px)'
                : moisture01 > 0.78
                  ? 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.18) 0 26px, transparent 52px), radial-gradient(circle at 65% 55%, rgba(59,130,246,0.12) 0 22px, transparent 44px)'
                  : 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.10) 0 22px, transparent 44px)',
          }}
        />
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
            animate={{ scale: 0.8, y: 2 }}
            exit={{ scale: 0 }}
            className="mb-2 relative z-10 opacity-80"
            style={{ color }}
          >
            <div className="relative">
              {Icon ? <Icon size={size * 0.42} /> : <Trees size={size * 0.42} />}
              <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="absolute inset-0 rounded-full blur-lg"
                style={{ backgroundColor: color }}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-900/40 rounded-full blur-sm" />
          </motion.div>
        )}

        {/* Stage 3: Covered (Sprout) */}
        {stage === 3 && (
          <motion.div
            key="sprout"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0, rotate: health01 < 0.4 ? [-7, 7, -5] : [-3, 3, -3] }}
            exit={{ scale: 0 }}
            className="mb-2 relative z-10"
          >
            <div
              className="w-2.5 h-8 rounded-full shadow-sm"
              style={{
                backgroundColor: moisture01 < 0.25 ? '#7f1d1d' : '#8bc34a',
                filter: `saturate(${0.7 + health01 * 0.6}) brightness(${0.85 + moisture01 * 0.25})`,
              }}
            />
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

        {stage >= 4 && (
          <motion.div
            key="tree"
            initial={{ scale: 0.5, y: 20, opacity: 0 }}
            animate={{ 
              scale: stage === 4 ? 0.9 : stage === 5 ? 1.15 : 1.3, 
              y: 0, 
              opacity: 1,
              rotate: [-0.5, 0.5, -0.5]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              scale: { type: 'spring', damping: 15 }
            }}
            className="relative z-10 mb-2"
            style={{
              filter: `saturate(${0.65 + health01 * 0.75}) brightness(${0.85 + moisture01 * 0.25})`,
              opacity: 0.75 + health01 * 0.25,
            }}
          >
            {/* Trunk */}
            <div className={`mx-auto rounded-t-full relative shadow-lg ${stage === 4 ? 'w-4 h-16' : stage === 5 ? 'w-5 h-20' : 'w-6 h-24'} bg-[#5d4037]`}>
              <div className="absolute inset-y-0 left-1.5 w-1.5 bg-black/10 rounded-full" />
            </div>
            
            {/* Foliage Layers */}
            <div className={`absolute left-1/2 -translate-x-1/2 ${stage === 4 ? '-top-18 w-28 h-28' : stage === 5 ? '-top-24 w-32 h-32' : '-top-28 w-36 h-36'}`}>
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: color }} />
              <Trees size={stage === 4 ? 112 : stage === 5 ? 128 : 144} style={{ color }} className="drop-shadow-2xl" />
              
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

              {stage >= 6 && (
                <div className="absolute inset-0">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i }}
                      className="absolute w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{
                        backgroundColor: i % 2 === 0 ? '#ff7043' : '#ffeb3b',
                        left: `${10 + (i * 7) % 80}%`,
                        top: `${18 + (i * 11) % 60}%`,
                      }}
                    />
                  ))}
                </div>
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
            {stage === 0 && (
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
            {stage === 3 && (
              <motion.div 
                animate={{ y: [20, 0], opacity: [0, 1, 0] }}
                className="w-40 h-10 bg-[#5d4037] rounded-full blur-sm"
              />
            )}
            {stage === 4 && (
              <div className="flex gap-1 animate-bounce text-blue-400">
                <Droplets size={24} fill="currentColor" />
                <Droplets size={32} fill="currentColor" className="mt-4" />
                <Droplets size={24} fill="currentColor" />
              </div>
            )}
            {stage === 5 && (
              <div className="relative">
                <Sun size={100} className="text-yellow-400 animate-spin-slow opacity-60" />
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl"
                />
              </div>
            )}
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

const CharacterActionFX = ({ actionId, accent, toolIcon: ToolIcon }: { actionId: string | null, accent: string, toolIcon?: React.ElementType }) => {
  if (!actionId) return null;

  const isSoil = actionId === 'hole' || actionId === 'cover';
  const isFertilizer = actionId === 'fertilizer';
  const isPlant = actionId === 'plant';
  const isWater = actionId === 'water';
  const isSun = actionId === 'sun';

  return (
    <div className="absolute inset-0 pointer-events-none">
      {(isSoil || isFertilizer) && (
        <div className="absolute left-6 top-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.6, 1, 0.7],
                x: [-4 + (i % 5) * 3, -12 + (i % 5) * 6],
                y: [0, -16 - (i % 4) * 6],
              }}
              transition={{ duration: 0.55 + (i % 4) * 0.05, delay: 0.02 * i }}
              className="absolute rounded-full"
              style={{
                width: 5 + (i % 3),
                height: 5 + (i % 3),
                backgroundColor: isFertilizer ? '#111827' : '#5d4037',
                filter: 'blur(0.2px)',
              }}
            />
          ))}
        </div>
      )}

      {isPlant && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: [ -6, 2, 0 ], scale: [0.9, 1, 1] }}
          transition={{ duration: 0.7 }}
          className="absolute left-7 top-4"
          style={{ color: accent }}
        >
          {ToolIcon ? <ToolIcon size={18} /> : <Sprout size={18} />}
        </motion.div>
      )}

      {isWater && (
        <div className="absolute left-6 top-6 text-blue-300">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10, x: (i % 4) * 6 }}
              animate={{ opacity: [0, 1, 0], y: [ -10, 18 ], x: [ (i % 4) * 6, (i % 4) * 6 + ((i % 2) ? 3 : -3) ] }}
              transition={{ duration: 0.7, delay: 0.05 * i, repeat: 1 }}
              className="absolute"
            >
              <Droplets size={14} fill="currentColor" />
            </motion.div>
          ))}
        </div>
      )}

      {isSun && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.75, scale: [0.7, 1, 0.9], rotate: [0, 20, 0] }}
          transition={{ duration: 0.9 }}
          className="absolute -top-4 -right-4 text-yellow-300"
        >
          <Sun size={34} />
        </motion.div>
      )}
    </div>
  );
};

const HeldTool = ({ actionId, accent, icon: Icon }: { actionId: string, accent: string, icon?: React.ElementType }) => {
  if (actionId === 'hole' || actionId === 'cover') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: [-14, 10, -8], y: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 0.35 }}
        className="relative w-8 h-8"
      >
        <div className="absolute left-3 top-1 w-1.5 h-8 bg-[#8b5a2b] rounded-full shadow-md rotate-[22deg] origin-top" />
        <div className="absolute left-0 top-6 w-4 h-3 bg-[#9ca3af] rounded-sm shadow-md rotate-[22deg] border border-black/10" />
        <div className="absolute left-1 top-7 w-3 h-1 bg-black/10 rounded-full rotate-[22deg]" />
      </motion.div>
    );
  }

  if (actionId === 'fertilizer') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [0.95, 1, 0.98], rotate: [-8, 10, -6] }}
        transition={{ repeat: Infinity, duration: 0.55 }}
        className="relative w-8 h-8"
      >
        <div className="absolute left-1 top-1 w-6 h-7 bg-[#f59e0b]/30 border border-black/10 rounded-2xl shadow-md" />
        <div className="absolute left-2 top-3 w-4 h-2 bg-white/40 rounded-full" />
        <div className="absolute right-0 top-5 w-3 h-3 bg-[#9ca3af] rounded-xl shadow-md border border-black/10" />
        <div className="absolute right-0 top-5 w-3 h-3 flex items-center justify-center text-[#111827]">
          <div className="w-1 h-1 bg-[#111827] rounded-full" />
        </div>
      </motion.div>
    );
  }

  if (actionId === 'water') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, rotate: [-10, 12, -8], y: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.42 }}
        className="relative w-8 h-8"
      >
        <div className="absolute left-1 top-3 w-6 h-4 bg-[#60a5fa] rounded-2xl shadow-md border border-black/10" />
        <div className="absolute left-2 top-1 w-3 h-3 border-2 border-[#60a5fa] rounded-full" />
        <div className="absolute right-0 top-4 w-3 h-2 bg-[#93c5fd] rounded-full shadow-sm border border-black/10" />
        <div className="absolute right-0 top-6 text-blue-200">
          <Droplets size={12} fill="currentColor" />
        </div>
      </motion.div>
    );
  }

  if (actionId === 'sun') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [0.95, 1.05, 1], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 0.7 }}
        className="relative w-8 h-8 text-yellow-300"
      >
        <Sun size={22} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: [0.95, 1, 0.98], y: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 0.55 }}
      className="relative w-8 h-8"
      style={{ color: accent }}
    >
      {Icon ? <Icon size={22} /> : <Sprout size={22} />}
    </motion.div>
  );
};

const CharacterSprite = ({ isWalking, actionId, toolIcon: ToolIcon, accent }: { isWalking: boolean, actionId: string | null, toolIcon?: React.ElementType, accent: string }) => {
  const isActing = Boolean(actionId);
  return (
    <div className="relative flex flex-col items-center">
      {/* Head & Hat */}
      <motion.div 
        animate={{ y: isActing ? [0, -2, 0] : isWalking ? [0, -4, 0] : [0, -1, 0] }}
        transition={{ repeat: Infinity, duration: isActing ? 0.35 : 0.5 }}
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
          rotate: isActing ? [-2, 3, -2] : isWalking ? [-5, 5, -5] : 0,
          y: isActing ? [0, 2, 0] : isWalking ? [0, -2, 0] : 0
        }}
        transition={{ repeat: Infinity, duration: isActing ? 0.38 : 0.5 }}
        className="w-12 h-14 bg-[#3f51b5] rounded-xl border-2 border-[#303f9f] -mt-1 relative z-10 shadow-md"
      >
        {/* Overalls detail */}
        <div className="absolute inset-x-2 top-0 bottom-4 border-x-4 border-[#303f9f] opacity-20" />
        {/* Arms */}
        <motion.div 
          animate={{ rotate: isActing ? [30, -30, 18] : isWalking ? [20, -20, 20] : 0, y: isActing ? [0, 2, 0] : 0 }}
          className="absolute -left-3 top-2 w-4 h-8 bg-[#3f51b5] rounded-full border-2 border-[#303f9f] origin-top" 
        />
        <motion.div 
          animate={{ rotate: isActing ? [-26, 26, -16] : isWalking ? [-20, 20, -20] : 0, y: isActing ? [0, 1, 0] : 0 }}
          className="absolute -right-3 top-2 w-4 h-8 bg-[#3f51b5] rounded-full border-2 border-[#303f9f] origin-top" 
        />

        {isActing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute -right-9 top-4 w-10 h-10 rounded-[1.15rem] bg-white/90 border border-black/10 shadow-2xl flex items-center justify-center"
          >
            <HeldTool actionId={actionId ?? ''} accent={accent} icon={ToolIcon} />
          </motion.div>
        )}
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
        animate={{ scale: isActing ? [0.98, 0.9, 0.98] : isWalking ? [1, 0.9, 1] : 1 }}
        className="w-12 h-3 bg-black/20 rounded-full blur-sm mt-1" 
      />

      <CharacterActionFX actionId={actionId} accent={accent} toolIcon={ToolIcon} />
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

const Cloud = ({ delay, top, size, opacity }: { delay: number, top: number, size: number, opacity: number }) => (
  <motion.div
    initial={{ x: '-30%' }}
    animate={{ x: '130%' }}
    transition={{ repeat: Infinity, duration: 28 + delay * 4, ease: 'linear', delay }}
    className="absolute pointer-events-none z-10"
    style={{ top: `${top}%`, opacity }}
  >
    <div
      className="relative"
      style={{ width: size, height: Math.max(40, size * 0.33) }}
    >
      <div className="absolute inset-0 rounded-full blur-2xl bg-white/25" />
      <div className="absolute left-[8%] top-[30%] w-[38%] h-[56%] rounded-full bg-white/25" />
      <div className="absolute left-[28%] top-[12%] w-[46%] h-[70%] rounded-full bg-white/25" />
      <div className="absolute left-[56%] top-[34%] w-[34%] h-[50%] rounded-full bg-white/25" />
    </div>
  </motion.div>
);

const FloatingLeaf = ({ seed }: { seed: number }) => {
  const size = 10 + (seed % 7);
  const startX = (seed * 37) % 520;
  const drift = -90 + ((seed * 13) % 180);
  const duration = 7 + ((seed * 17) % 7);
  const delay = (seed % 10) * 0.6;
  return (
    <motion.div
      initial={{ x: startX, y: -30, rotate: -25, opacity: 0 }}
      animate={{
        x: [startX, startX + drift, startX + drift * 1.2],
        y: [0, 260, 560],
        rotate: [-20, 30, -10],
        opacity: [0, 0.7, 0],
      }}
      transition={{ repeat: Infinity, duration, ease: 'linear', delay }}
      className="absolute pointer-events-none z-20"
    >
      <div
        className="rounded-full blur-[0.2px]"
        style={{
          width: size,
          height: Math.max(6, size * 0.65),
          background: 'linear-gradient(135deg, rgba(34,197,94,0.9) 0%, rgba(16,185,129,0.7) 60%, rgba(245,158,11,0.55) 100%)',
          boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
        }}
      />
    </motion.div>
  );
};

const DPad = ({
  disabled,
  onMove,
}: {
  disabled: boolean;
  onMove: (dx: number, dy: number) => void;
}) => {
  const intervalRef = useRef<number | null>(null);

  const start = (dx: number, dy: number) => {
    if (disabled) return;
    onMove(dx, dy);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => onMove(dx, dy), 80);
  };

  const stop = () => {
    if (!intervalRef.current) return;
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => stop, []);

  const Btn = ({
    label,
    icon,
    dx,
    dy,
  }: {
    label: string;
    icon: React.ReactNode;
    dx: number;
    dy: number;
  }) => (
    <button
      type="button"
      aria-label={label}
      onPointerDown={() => start(dx, dy)}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={stop}
      onContextMenu={(e) => e.preventDefault()}
      className={`w-12 h-12 rounded-2xl border-2 font-black shadow-xl active:scale-95 transition-all select-none ${
        disabled
          ? 'bg-slate-200/50 text-slate-400 border-slate-300'
          : 'bg-[#fff9eb]/90 text-[#8b4513] border-[#d4a373] hover:bg-[#fff9eb]'
      }`}
    >
      <div className="flex items-center justify-center">{icon}</div>
    </button>
  );

  return (
    <div className="pointer-events-auto">
      <div className="bg-[#0b1220]/25 backdrop-blur-md rounded-[2rem] p-3 border border-white/20 shadow-2xl">
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          <div />
          <Btn label="Atas" icon={<span className="text-lg">▲</span>} dx={0} dy={-1} />
          <div />
          <Btn label="Kiri" icon={<span className="text-lg">◀</span>} dx={-1} dy={0} />
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white/70">
            <Move size={18} />
          </div>
          <Btn label="Kanan" icon={<span className="text-lg">▶</span>} dx={1} dy={0} />
          <div />
          <Btn label="Bawah" icon={<span className="text-lg">▼</span>} dx={0} dy={1} />
          <div />
        </div>
      </div>
    </div>
  );
};

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

type EnvImpact = {
  co2: number;
  water: number;
  temp: number;
  bio: number;
};

const seedlings: Seedling[] = [
  { id: 's1', name: 'Mahoni', icon: Trees, description: 'Pohon pelindung dengan kayu kuat dan rindang.', color: '#15803d' },
  { id: 's2', name: 'Jati', icon: Trees, description: 'Kayu kualitas premium untuk investasi masa depan.', color: '#854d0e' },
  { id: 's3', name: 'Pinus', icon: Trees, description: 'Cocok untuk daerah pegunungan dan penghasil getah.', color: '#166534' },
];

const allRegions: Region[] = [
  // --- KOTA BANDUNG (Pusat) ---
  { id: 'bdg-bojonagara', name: 'Bojonagara (Kota)', status: 'hijau', description: 'Kawasan barat laut dengan vegetasi rapat dan kampus.', path: "M 45,35 L 50,25 L 60,35 L 55,45 L 40,45 Z", x: 50, y: 37 },
  { id: 'bdg-cibeunying', name: 'Cibeunying (Kota)', status: 'kritis', description: 'Kawasan timur laut yang mulai padat pemukiman.', path: "M 50,25 L 65,30 L 80,30 L 75,45 L 60,35 Z", x: 66, y: 33 },
  { id: 'bdg-ujungberung', name: 'Ujungberung (Kota)', status: 'hijau', description: 'Wilayah timur yang luas dengan area pegunungan.', path: "M 80,30 L 95,15 L 115,25 L 115,50 L 95,55 L 75,45 Z", x: 96, y: 36 },
  { id: 'bdg-karees', name: 'Karees (Kota)', status: 'gersang', description: 'Pusat kota dengan kepadatan tinggi, butuh banyak RTH.', path: "M 55,45 L 60,35 L 75,45 L 65,55 L 50,55 Z", x: 61, y: 47 },
  { id: 'bdg-tegalega', name: 'Tegalega (Kota)', status: 'kritis', description: 'Kawasan selatan daya yang cukup padat penduduk.', path: "M 40,45 L 55,45 L 50,55 L 35,55 Z", x: 45, y: 50 },
  { id: 'bdg-gedebage', name: 'Gedebage (Kota)', status: 'gersang', description: 'Kawasan tenggara yang berkembang, rawan banjir.', path: "M 65,55 L 75,45 L 95,55 L 85,70 L 60,65 Z", x: 76, y: 58 },

  // --- KABUPATEN BANDUNG (Selatan & Timur) ---
  { id: 'kab-margahayu', name: 'Margahayu & Dayeuhkolot', status: 'kritis', description: 'Kawasan industri dan pemukiman padat di selatan kota.', path: "M 35,55 L 50,55 L 65,55 L 55,70 L 30,65 Z", x: 47, y: 60 },
  { id: 'kab-baleendah', name: 'Baleendah & Bojongsoang', status: 'gersang', description: 'Langganan banjir tahunan, butuh pohon penahan air.', path: "M 55,70 L 60,65 L 85,70 L 75,85 L 50,80 Z", x: 65, y: 74 },
  { id: 'kab-soreang', name: 'Soreang', status: 'kritis', description: 'Pusat pemerintahan Kabupaten Bandung.', path: "M 15,70 L 30,65 L 55,70 L 50,80 L 40,90 L 20,85 Z", x: 35, y: 76 },
  { id: 'kab-ciwidey', name: 'Ciwidey & Rancabali', status: 'hijau', description: 'Hutan lindung, kebun teh, dan kawasan wisata alam.', path: "M 5,60 L 15,70 L 20,85 L 15,100 L 5,95 Z", x: 12, y: 82 },
  { id: 'kab-pangalengan', name: 'Pangalengan', status: 'hijau', description: 'Dataran tinggi di selatan dengan perkebunan luas.', path: "M 50,80 L 75,85 L 90,95 L 75,105 L 40,105 L 40,90 Z", x: 62, y: 94 },
  { id: 'kab-majalaya', name: 'Majalaya & Ciparay', status: 'kritis', description: 'Kawasan industri tekstil yang padat.', path: "M 85,70 L 95,55 L 115,50 L 115,75 L 100,90 L 75,85 Z", x: 97, y: 70 },

  // --- KABUPATEN BANDUNG BARAT & CIMAHI (Barat/Utara) ---
  { id: 'kbb-lembang', name: 'Lembang (KBB)', status: 'hijau', description: 'Kawasan utara pegunungan yang sejuk namun padat villa.', path: "M 35,15 L 65,5 L 95,15 L 80,30 L 65,30 L 50,25 L 35,35 Z", x: 60, y: 20 },
  { id: 'cimahi', name: 'Kota Cimahi', status: 'kritis', description: 'Kota industri otonom yang sangat padat.', path: "M 35,35 L 45,35 L 40,45 L 30,45 Z", x: 37, y: 40 },
  { id: 'kbb-padalarang', name: 'Padalarang (KBB)', status: 'gersang', description: 'Pusat KBB, dikenal dengan kawasan tambang kapurnya.', path: "M 15,20 L 35,15 L 35,35 L 15,40 Z", x: 25, y: 27 },
  { id: 'kbb-cipatat', name: 'Cipatat & Rajamandala', status: 'gersang', description: 'Kawasan karst (kapur) yang kering di ujung barat.', path: "M 5,25 L 15,20 L 15,40 L 5,45 Z", x: 10, y: 32 },
  { id: 'kbb-cililin', name: 'Cililin & Sindangkerta', status: 'hijau', description: 'Kawasan barat daya dengan waduk dan perbukitan.', path: "M 5,45 L 15,40 L 30,45 L 35,55 L 30,65 L 15,70 L 5,60 Z", x: 18, y: 55 },
];

const RegionItem = memo(({ region, isHovered, onHover, onClick }: { 
  region: Region, isHovered: boolean, onHover: (r: Region | null) => void, onClick: (r: Region) => void 
}) => {
  const isHijau = region.status === 'hijau';
  const fillUrl = `url(#grad-${region.status})`;
  const strokeColor = isHovered ? "#ffffff" : "rgba(255,255,255,0.6)";
  
  return (
    <motion.g
      onMouseEnter={() => onHover(region)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(region)}
      className={!isHijau ? 'cursor-pointer' : 'cursor-default'}
      animate={{ 
        scale: isHovered ? 1.03 : 1,
        y: isHovered ? -2 : 0,
        filter: isHovered ? 'drop-shadow(0px 8px 8px rgba(0,0,0,0.25))' : 'drop-shadow(0px 2px 3px rgba(0,0,0,0.15))',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformOrigin: `${region.x}px ${region.y}px` }}
    >
      {/* 3D Base Thickness */}
      <path
        d={region.path}
        fill="#0f172a"
        opacity={0.2}
        transform="translate(0, 2)"
      />
      {/* Main Surface */}
      <path
        d={region.path}
        fill={fillUrl}
        fillOpacity={isHovered ? 1 : 0.9}
        stroke={strokeColor}
        strokeWidth={isHovered ? 0.8 : 0.4}
        strokeLinejoin="round"
      />
      {/* Texture Overlay */}
      <path
        d={region.path}
        fill="url(#pattern-dots)"
        opacity={isHovered ? 0.3 : 0.15}
        className="pointer-events-none"
      />
      
      {/* Interactive Markers */}
      {!isHijau ? (
        <g transform={`translate(${region.x}, ${region.y})`}>
          {isHovered && <circle r="3" fill="white" opacity="0.3" className="animate-ping" />}
          <circle r="1.5" fill="white" className="drop-shadow-md" />
          <circle r="0.6" fill={region.status === 'kritis' ? '#f59e0b' : '#ef4444'} />
        </g>
      ) : (
        <g transform={`translate(${region.x}, ${region.y})`}>
          <circle r="1" fill="#a7f3d0" opacity="0.6" />
        </g>
      )}
    </motion.g>
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

  const tooltipOffset = hoveredRegion ? {
    x: hoveredRegion.x > 70 ? -220 : 15,
    y: hoveredRegion.y > 70 ? -130 : 15
  } : { x: 15, y: 15 };

  return (
    <div 
      ref={mapRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#0f172a] rounded-[2rem] border-4 border-slate-800 aspect-[4/3] overflow-hidden shadow-2xl"
    >
      {/* High-tech / Blueprint Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#334155 2px, transparent 2px), linear-gradient(90deg, #334155 2px, transparent 2px)', backgroundSize: '100px 100px' }} />
      </div>

      {/* Floating Map Legend */}
      <div className="absolute top-4 left-4 z-10 space-y-2 bg-slate-900/80 p-3 rounded-xl border border-slate-700 backdrop-blur-md text-[10px] font-black uppercase text-slate-300 pointer-events-none shadow-xl">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> Lestari</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#d97706] shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div> Kritis</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#f87171] to-[#dc2626] shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> Gersang</div>
      </div>

      <svg viewBox="0 0 120 100" preserveAspectRatio="xMidYMid meet" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="grad-hijau" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="grad-kritis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="grad-gersang" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <pattern id="pattern-dots" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#ffffff" />
          </pattern>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Thick 3D Map Base */}
        <g filter="url(#softShadow)">
          <path d="M 10,35 L 15,20 L 25,10 L 35,5 L 45,10 L 50,15 L 60,15 L 70,25 L 80,45 L 95,42 L 110,40 L 115,50 L 110,65 L 100,85 L 85,90 L 70,88 L 60,80 L 50,78 L 45,70 L 25,80 L 15,75 L 5,60 L 5,50 Z" fill="#1e293b" transform="translate(0, 4)" />
          <path d="M 10,35 L 15,20 L 25,10 L 35,5 L 45,10 L 50,15 L 60,15 L 70,25 L 80,45 L 95,42 L 110,40 L 115,50 L 110,65 L 100,85 L 85,90 L 70,88 L 60,80 L 50,78 L 45,70 L 25,80 L 15,75 L 5,60 L 5,50 Z" fill="#334155" />
        </g>

        {/* Map Regions */}
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
  const [actionPlotId, setActionPlotId] = useState<string | null>(null);
  const [levelIntroOpen, setLevelIntroOpen] = useState(false);
  const [level2Stages, setLevel2Stages] = useState<Record<string, number>>({ p1: 0, p2: 0, p3: 0, p4: 0 });
  const [activePlotId, setActivePlotId] = useState('p1');
  const [toast, setToast] = useState<{ id: number, title: string, subtitle?: string, tone: 'good' | 'warn' | 'info' } | null>(null);
  const [envScore, setEnvScore] = useState<EnvImpact>({ co2: 0, water: 0, temp: 0, bio: 0 });
  const [plotMoisture, setPlotMoisture] = useState<Record<string, number>>({ p1: 45, p2: 45, p3: 45, p4: 45 });
  const [plotHealth, setPlotHealth] = useState<Record<string, number>>({ p1: 75, p2: 75, p3: 75, p4: 75 });
  const [dayPhase, setDayPhase] = useState(0);
  const actionTimerRef = useRef<{ intervalId: number | null, timeoutId: number | null }>({ intervalId: null, timeoutId: null });
  
  // Character Movement State
  const [charPos, setCharPos] = useState({ x: 100, y: 100 });
  const [charDirection, setCharDirection] = useState<'left' | 'right'>('right');
  const [isWalking, setIsWalking] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [gameAreaSize, setGameAreaSize] = useState({ width: 640, height: 460 });

  const level1Steps = [
    { id: 'hole', title: 'Gali Lubang', icon: MapPin, text: 'Gunakan Sekop untuk menggali lubang tanam. Pastikan tanah cukup gembur untuk perkembangan akar.', edu: 'Lubang tanam yang cukup dalam membantu akar menyebar, meningkatkan stabilitas pohon dan daya serap air hujan.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'fertilizer', title: 'Pupuk Dasar', icon: Thermometer, text: 'Taburkan pupuk organik. Nutrisi ini akan membantu bibit bertahan di fase awal penanaman.', edu: 'Pupuk organik memperbaiki struktur tanah dan meningkatkan mikroorganisme yang penting untuk kesehatan tanaman.', impact: { co2: 1, water: 2, temp: 0, bio: 2 } satisfies EnvImpact },
    { id: 'plant', title: 'Letakkan Bibit', icon: Trees, text: 'Letakkan bibit ke dalam lubang dengan hati-hati. Pastikan posisinya tegak lurus.', edu: 'Posisi bibit yang tegak mencegah akar patah dan membantu pertumbuhan batang lebih kuat.', impact: { co2: 2, water: 1, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'cover', title: 'Tutup Tanah', icon: Sprout, text: 'Tutup kembali lubang dengan tanah dan tekan perlahan agar bibit tertanam kokoh.', edu: 'Menutup tanah rapat mengurangi kantong udara, menjaga kelembaban, dan melindungi akar dari panas berlebih.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'water', title: 'Penyiraman', icon: Droplets, text: 'Siram dengan air yang cukup agar tanah lembab dan merangsang pertumbuhan tunas baru.', edu: 'Air membantu akar menyerap nutrisi. Tanah lembab stabil membuat bibit lebih tahan terhadap stres cuaca.', impact: { co2: 1, water: 4, temp: 0, bio: 1 } satisfies EnvImpact },
    { id: 'sun', title: 'Perawatan Matahari', icon: Sun, text: 'Pastikan tanaman mendapat sinar matahari yang cukup untuk proses fotosintesis.', edu: 'Fotosintesis mengubah CO₂ menjadi oksigen. Pohon dewasa membantu menurunkan suhu dan meningkatkan kualitas udara.', impact: { co2: 4, water: 1, temp: 3, bio: 2 } satisfies EnvImpact },
  ];

  const level2Steps = [
    { id: 'hole', title: 'Gali Lubang (Lahan Luas)', icon: MapPin, text: 'Sekarang lahannya lebih luas. Gali lubang untuk pohon berikutnya di area target yang menyala.', edu: 'Menanam banyak pohon di lokasi yang tepat membantu mengurangi risiko erosi dan meningkatkan resapan air.', impact: { co2: 1, water: 3, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'fertilizer', title: 'Pupuk Dasar', icon: Thermometer, text: 'Taburkan pupuk organik agar tanah siap menumbuhkan akar yang kuat.', edu: 'Tanah yang kaya bahan organik menyimpan air lebih lama dan mendukung jamur/mikroba baik di tanah.', impact: { co2: 1, water: 2, temp: 0, bio: 2 } satisfies EnvImpact },
    { id: 'plant', title: 'Letakkan Bibit', icon: Trees, text: 'Letakkan bibit ke dalam lubang dengan hati-hati. Pastikan posisinya tegak lurus.', edu: 'Bibit yang sehat dan tertanam benar punya peluang hidup lebih tinggi, sehingga restorasi lebih efektif.', impact: { co2: 2, water: 1, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'cover', title: 'Tutup Tanah', icon: Sprout, text: 'Tutup kembali lubang dengan tanah dan tekan perlahan agar bibit tertanam kokoh.', edu: 'Penutupan tanah membantu mengurangi penguapan dan melindungi akar dari hujan deras yang bisa menggeser bibit.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'water', title: 'Penyiraman', icon: Droplets, text: 'Siram dengan air yang cukup agar tanah lembab dan merangsang pertumbuhan tunas baru.', edu: 'Penyiraman awal sangat penting. Terlalu sedikit membuat bibit layu, terlalu banyak membuat akar kekurangan oksigen.', impact: { co2: 1, water: 4, temp: 0, bio: 1 } satisfies EnvImpact },
    { id: 'sun', title: 'Perawatan Matahari', icon: Sun, text: 'Pastikan tanaman mendapat sinar matahari yang cukup untuk proses fotosintesis.', edu: 'Pohon yang tumbuh akan membentuk kanopi yang meneduhkan. Ini menurunkan suhu sekitar dan membantu keanekaragaman hayati.', impact: { co2: 4, water: 1, temp: 3, bio: 2 } satisfies EnvImpact },
  ];

  const currentSteps = level === 1 ? level1Steps : level2Steps;

  const overallProgress = useMemo(() => {
    if (level !== 2) return plantingStep / currentSteps.length;
    const order = ['p1', 'p2', 'p3', 'p4'];
    const total = order.length * currentSteps.length;
    const done = order.reduce((acc, id) => acc + Math.min(currentSteps.length, level2Stages[id] ?? 0), 0);
    return total === 0 ? 0 : done / total;
  }, [currentSteps.length, level, level2Stages, plantingStep]);

  const envProgress = useMemo(() => {
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
    const co2 = clamp01(envScore.co2 / 80);
    const water = clamp01(envScore.water / 90);
    const temp = clamp01(envScore.temp / 70);
    const bio = clamp01(envScore.bio / 80);
    return { co2, water, temp, bio };
  }, [envScore.bio, envScore.co2, envScore.temp, envScore.water]);

  const plots = useMemo(() => {
    if (phase !== 'planting') return [];

    const width = Math.max(1, gameAreaSize.width);
    const height = Math.max(1, gameAreaSize.height);
    const baseSize = Math.max(150, Math.min(190, Math.min(width, height) * 0.34));

    if (level === 1) {
      return [{ id: 'p1', cx: width / 2, cy: height / 2, size: baseSize }];
    }

    const cxLeft = width * 0.32;
    const cxRight = width * 0.68;
    const cyTop = height * 0.36;
    const cyBottom = height * 0.7;

    return [
      { id: 'p1', cx: cxLeft, cy: cyTop, size: baseSize },
      { id: 'p2', cx: cxRight, cy: cyTop, size: baseSize },
      { id: 'p3', cx: cxLeft, cy: cyBottom, size: baseSize },
      { id: 'p4', cx: cxRight, cy: cyBottom, size: baseSize },
    ];
  }, [phase, level, gameAreaSize.height, gameAreaSize.width]);

  const requiredPlotId = useMemo(() => {
    if (level === 1) return 'p1';
    return activePlotId;
  }, [activePlotId, level]);

  const clampPos = (x: number, y: number) => {
    const margin = 10;
    const maxX = Math.max(margin, gameAreaSize.width - 60 - margin);
    const maxY = Math.max(margin, gameAreaSize.height - 80 - margin);
    return { x: Math.max(margin, Math.min(maxX, x)), y: Math.max(margin, Math.min(maxY, y)) };
  };

  const moveCharacter = (dx: number, dy: number) => {
    const step = 16;
    setCharPos(prev => {
      const nextX = prev.x + dx * step;
      const nextY = prev.y + dy * step;
      if (dx < 0) setCharDirection('left');
      if (dx > 0) setCharDirection('right');
      return clampPos(nextX, nextY);
    });
    setIsWalking(true);
    window.clearTimeout((moveCharacter as unknown as { t?: number }).t);
    (moveCharacter as unknown as { t?: number }).t = window.setTimeout(() => setIsWalking(false), 140);
  };

  const isNearTarget = () => {
    const plot = plots.find(p => p.id === requiredPlotId);
    if (!plot) return false;
    const charCenterX = charPos.x + 30;
    const charCenterY = charPos.y + 40;
    const distance = Math.sqrt(Math.pow(charCenterX - plot.cx, 2) + Math.pow(charCenterY - plot.cy, 2));
    return distance < Math.max(90, plot.size * 0.55);
  };

  const nearTargetNow = useMemo(() => isNearTarget(), [charPos.x, charPos.y, plots, requiredPlotId]);

  useEffect(() => {
    if (phase !== 'planting') return;
    const el = gameAreaRef.current;
    if (!el) return;

    const update = () => {
      setGameAreaSize({ width: el.clientWidth, height: el.clientHeight });
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [phase]);

  // Character Movement Logic
  useEffect(() => {
    if (phase !== 'planting') return;
    if (levelIntroOpen) return;
    if (actionPlotId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      setCharPos(prev => {
        setIsWalking(true);
        let newX = prev.x;
        let newY = prev.y;
        const step = 18;

        if (e.key === 'ArrowLeft' || e.key === 'a') {
          newX = prev.x - step;
          setCharDirection('left');
        }
        if (e.key === 'ArrowRight' || e.key === 'd') {
          newX = prev.x + step;
          setCharDirection('right');
        }
        if (e.key === 'ArrowUp' || e.key === 'w') {
          newY = prev.y - step;
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
          newY = prev.y + step;
        }

        return clampPos(newX, newY);
      });
    };

    const handleKeyUp = () => setIsWalking(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [actionPlotId, gameAreaSize.height, gameAreaSize.width, levelIntroOpen, phase]);

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
    setActionPlotId(null);
    setLevelIntroOpen(false);
    setLevel2Stages({ p1: 0, p2: 0, p3: 0, p4: 0 });
    setActivePlotId('p1');
    setCharPos({ x: 100, y: 100 });
    setEnvScore({ co2: 0, water: 0, temp: 0, bio: 0 });
    setPlotMoisture({ p1: 45, p2: 45, p3: 45, p4: 45 });
    setPlotHealth({ p1: 75, p2: 75, p3: 75, p4: 75 });
    setDayPhase(0);
  };

  useEffect(() => {
    return () => {
      if (actionTimerRef.current.intervalId) window.clearInterval(actionTimerRef.current.intervalId);
      if (actionTimerRef.current.timeoutId) window.clearTimeout(actionTimerRef.current.timeoutId);
      actionTimerRef.current.intervalId = null;
      actionTimerRef.current.timeoutId = null;
    };
  }, []);

  const startAction = (plotId: string) => {
    if (levelIntroOpen) return;
    if (actionPlotId) return;
    const step = currentSteps[Math.min(currentSteps.length - 1, plantingStep)];
    const stepId = step?.id ?? '';
    const durationMs =
      stepId === 'hole' ? 1400 :
      stepId === 'fertilizer' ? 1100 :
      stepId === 'plant' ? 1400 :
      stepId === 'cover' ? 1200 :
      stepId === 'water' ? 1500 :
      stepId === 'sun' ? 1600 :
      1100;

    setActionPlotId(plotId);
    setActionProgress(0);

    const startAt = Date.now();
    if (actionTimerRef.current.intervalId) window.clearInterval(actionTimerRef.current.intervalId);
    if (actionTimerRef.current.timeoutId) window.clearTimeout(actionTimerRef.current.timeoutId);

    actionTimerRef.current.intervalId = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - startAt) / durationMs);
      setActionProgress(p * 100);
    }, 50);

    actionTimerRef.current.timeoutId = window.setTimeout(() => {
      if (actionTimerRef.current.intervalId) window.clearInterval(actionTimerRef.current.intervalId);
      actionTimerRef.current.intervalId = null;
      setActionProgress(100);
      window.setTimeout(() => {
        setActionProgress(0);
        setActionPlotId(null);
        handleActionComplete();
      }, 120);
    }, durationMs);
  };

  const handleActionComplete = () => {
    const completedStep = currentSteps[Math.min(currentSteps.length - 1, plantingStep)];
    const stepId = completedStep?.id ?? '';
    const impact = completedStep?.impact ?? ({ co2: 0, water: 0, temp: 0, bio: 0 } as EnvImpact);
    const moistureDelta =
      stepId === 'water' ? 24 :
      stepId === 'sun' ? -10 :
      stepId === 'hole' ? -4 :
      stepId === 'fertilizer' ? 2 :
      stepId === 'cover' ? 5 :
      0;

    setEnvScore(prev => ({
      co2: prev.co2 + impact.co2,
      water: prev.water + impact.water,
      temp: prev.temp + impact.temp,
      bio: prev.bio + impact.bio,
    }));

    setDayPhase(p => (p + 1) % 8);

    setPlotMoisture(prev => {
      const id = level === 1 ? 'p1' : activePlotId;
      const next = Math.max(0, Math.min(100, (prev[id] ?? 45) + moistureDelta));
      return { ...prev, [id]: next };
    });

    const healthId = level === 1 ? 'p1' : activePlotId;
    const currentMoisture = plotMoisture[healthId] ?? 45;
    const isTooWet = stepId === 'water' && currentMoisture > 82;
    const isTooDry = stepId === 'sun' && currentMoisture < 22;
    if (isTooWet) setToast({ id: Date.now(), title: 'Terlalu basah', subtitle: 'Akar bisa busuk, kurangi siram', tone: 'warn' });
    if (isTooDry) setToast({ id: Date.now(), title: 'Terlalu kering', subtitle: 'Tanaman stres panas, perlu air', tone: 'warn' });
    setPlotHealth(prev => {
      const goodWater = stepId === 'water' && currentMoisture < 55;
      const goodSun = stepId === 'sun' && currentMoisture >= 28;
      const bonus =
        stepId === 'fertilizer' ? 6 :
        stepId === 'cover' ? 4 :
        stepId === 'plant' ? 5 :
        0;
      const delta =
        (isTooWet ? -12 : 0) +
        (isTooDry ? -10 : 0) +
        (goodWater ? 8 : 0) +
        (goodSun ? 4 : 0) +
        bonus;
      const next = Math.max(15, Math.min(100, (prev[healthId] ?? 75) + delta));
      return { ...prev, [healthId]: next };
    });

    if (level === 1) {
      if (plantingStep < currentSteps.length - 1) {
        setPlantingStep(s => s + 1);
        setActionProgress(0);
        setToast({ id: Date.now(), title: 'Langkah berhasil!', subtitle: currentSteps[plantingStep].title, tone: 'good' });
        return;
      }

      setLevel(2);
      setPlantingStep(0);
      setActionProgress(0);
      setActionPlotId(null);
      setLevelIntroOpen(true);
      setLevel2Stages({ p1: 0, p2: 0, p3: 0, p4: 0 });
      setActivePlotId('p1');
      setCharPos({ x: 80, y: 80 });
      setToast({ id: Date.now(), title: 'Level 1 selesai!', subtitle: 'Masuk ke Level 2', tone: 'info' });
      return;
    }

    setLevel2Stages(prev => {
      const current = prev[activePlotId] ?? 0;
      const next = Math.min(currentSteps.length, current + 1);
      const nextStages = { ...prev, [activePlotId]: next };

      if (next < currentSteps.length) {
        setPlantingStep(next);
        setActionProgress(0);
        setToast({ id: Date.now(), title: 'Bagus!', subtitle: `Pohon ${(['p1', 'p2', 'p3', 'p4'].indexOf(activePlotId) + 1) || 1} • ${currentSteps[next - 1]?.title ?? 'Lanjut'}`, tone: 'good' });
        return nextStages;
      }

      const order = ['p1', 'p2', 'p3', 'p4'];
      const nextPlot = order.find(id => (nextStages[id] ?? 0) < currentSteps.length);
      if (!nextPlot) {
        setPhase('finished');
        return nextStages;
      }

      setActivePlotId(nextPlot);
      setPlantingStep(nextStages[nextPlot] ?? 0);
      setActionProgress(0);
      setToast({ id: Date.now(), title: 'Pohon selesai!', subtitle: 'Lanjut ke target berikutnya', tone: 'info' });
      return nextStages;
    });
  };

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <div className="min-h-screen py-3 sm:py-4 px-4 font-sans select-none overflow-hidden relative">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 18% 12%, rgba(16,185,129,0.22) 0 280px, transparent 420px)',
            'radial-gradient(circle at 82% 18%, rgba(59,130,246,0.14) 0 260px, transparent 420px)',
            'radial-gradient(circle at 70% 86%, rgba(245,158,11,0.16) 0 320px, transparent 520px)',
            'repeating-linear-gradient(135deg, rgba(2,6,23,0.04) 0 2px, transparent 2px 18px)',
            'linear-gradient(180deg, #ecfeff 0%, #ecfdf5 45%, #f0fdf4 100%)',
          ].join(','),
        }}
      />
      <div className="max-w-7xl mx-auto h-full flex flex-col relative">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-primary font-bold mb-3 hover:underline self-start"
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
              className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] shadow-2xl border border-emerald-100/80 flex-1 flex flex-col overflow-hidden relative"
            >
              <div className="absolute inset-0 pointer-events-none opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 12% 10%, rgba(16,185,129,0.18) 0 220px, transparent 360px), radial-gradient(circle at 88% 24%, rgba(59,130,246,0.12) 0 220px, transparent 360px)' }} />
              <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 flex items-center justify-center gap-3">
                  <MapPin className="text-primary" /> Eksplorasi Bandung Raya
                </h1>
                <p className="text-gray-500 text-sm">Pilih wilayah berwarna Merah atau Oranye untuk mulai restorasi.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
                <div className="lg:col-span-7 flex flex-col items-center justify-center">
                  <div className="w-full max-w-[680px]">
                    <InteractiveMap 
                      onHover={setHoveredRegion} 
                      hoveredRegion={hoveredRegion} 
                      onSelect={handleRegionSelect}
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col">
                  <div className="bg-emerald-50/80 p-6 rounded-[2rem] border border-emerald-100 h-full flex flex-col shadow-[inset_0_0_90px_rgba(16,185,129,0.10)]">
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
                                className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 relative overflow-hidden"
                              >
                                <motion.div
                                  aria-hidden
                                  className="absolute inset-0 opacity-40"
                                  animate={{ x: ['-30%', '130%'] }}
                                  transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
                                  style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)' }}
                                />
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
              className="bg-white/85 backdrop-blur-md p-8 rounded-[3rem] shadow-2xl border border-emerald-100/80 max-w-4xl mx-auto w-full overflow-hidden relative"
            >
              <div className="absolute inset-0 pointer-events-none opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 14% 18%, rgba(16,185,129,0.16) 0 220px, transparent 380px), radial-gradient(circle at 86% 22%, rgba(245,158,11,0.12) 0 240px, transparent 420px)' }} />
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
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all text-primary relative overflow-hidden">
                        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(16,185,129,0.18) 0 24px, transparent 46px)' }} />
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
              className="bg-[#fdf6e3] p-6 sm:p-7 rounded-[3rem] shadow-2xl text-center border-8 border-[#8b4513] max-w-7xl mx-auto w-full relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none opacity-45" style={{ backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(255,235,59,0.25) 0 240px, transparent 420px), radial-gradient(circle at 85% 18%, rgba(76,175,80,0.18) 0 220px, transparent 420px), repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 2px, transparent 2px 16px)' }} />
              {/* Header SIM Style */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 relative z-20 bg-[#f4e4bc] p-4 rounded-2xl border-4 border-[#d4a373] shadow-md">
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
                      <p className="text-xl font-black text-[#2e7d32] leading-none mt-1">{Math.round(overallProgress * 100)}%</p>
                    </div>
                    <div className="w-32 h-3 bg-[#e0e0e0] rounded-full overflow-hidden border-2 border-[#8b4513] relative">
                      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 6px, transparent 6px 12px)' }} />
                      <motion.div 
                        animate={{ width: `${overallProgress * 100}%` }}
                        className="h-full bg-[#4caf50]"
                      />
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch h-[calc(100vh-220px)] max-h-[680px] min-h-[520px]">
                {/* Interactive Area - Harvest Moon Style */}
                <div 
                  ref={gameAreaRef}
                  className="lg:col-span-8 rounded-[2rem] relative h-full min-h-[420px] shadow-[inset_0_0_120px_rgba(0,0,0,0.25)] overflow-hidden border-4 border-[#558b2f]"
                  style={{ 
                    backgroundImage: [
                      'radial-gradient(circle at 12% 18%, rgba(255,235,59,0.18) 0 120px, transparent 160px)',
                      'radial-gradient(circle at 78% 30%, rgba(255,255,255,0.12) 0 140px, transparent 200px)',
                      'repeating-linear-gradient(135deg, rgba(0,0,0,0.07) 0 2px, transparent 2px 14px)',
                      'radial-gradient(rgba(139,195,74,0.55) 12%, rgba(0,0,0,0) 13%)',
                      'radial-gradient(rgba(139,195,74,0.45) 12%, rgba(0,0,0,0) 13%)',
                      'linear-gradient(180deg, #8bc34a 0%, #7cb342 55%, #6aa336 100%)'
                    ].join(','),
                    backgroundSize: 'auto, auto, auto, 38px 38px, 38px 38px, auto',
                    backgroundPosition: '0 0, 0 0, 0 0, 0 0, 19px 19px, 0 0'
                  }}
                >
                  {[...Array(5)].map((_, i) => <Butterfly key={i} />)}
                  <Cloud delay={0} top={10} size={220} opacity={0.35} />
                  <Cloud delay={1.8} top={22} size={280} opacity={0.24} />
                  <Cloud delay={3.2} top={6} size={180} opacity={0.22} />
                  {[...Array(10)].map((_, i) => <FloatingLeaf key={i} seed={i + level * 11} />)}

                  <div className="absolute inset-0 pointer-events-none opacity-70">
                    <div className="absolute -left-10 top-24 w-[240px] h-[90px] bg-[#8d6e63]/35 rounded-full blur-md rotate-[-12deg]" />
                    <div className="absolute -right-16 bottom-20 w-[300px] h-[110px] bg-[#8d6e63]/28 rounded-full blur-md rotate-[14deg]" />
                    <div className="absolute left-10 bottom-16 w-[220px] h-[140px] bg-[#2196f3]/20 rounded-[3rem] blur-sm border-2 border-[#bbdefb]/30" />
                    <div className="absolute left-16 bottom-20 w-[190px] h-[110px] bg-[#1e88e5]/15 rounded-[3rem] blur-sm" />
                    <div className="absolute right-10 top-20 w-20 h-20 bg-[#2e7d32]/30 rounded-full blur-md" />
                    <div className="absolute right-20 top-14 w-14 h-14 bg-[#2e7d32]/25 rounded-full blur-md" />
                    <div className="absolute right-6 top-28 w-10 h-10 bg-[#2e7d32]/20 rounded-full blur-md" />
                    <div className="absolute left-10 top-10 w-16 h-16 bg-[#2e7d32]/20 rounded-full blur-md" />
                    <div className="absolute left-20 top-18 w-12 h-12 bg-[#2e7d32]/18 rounded-full blur-md" />
                    <div className="absolute left-12 top-26 w-9 h-9 bg-[#2e7d32]/15 rounded-full blur-md" />
                  </div>
                  
                  {/* Decorative Pagar */}
                  <div className="absolute top-0 left-0 w-full h-8 flex justify-around pointer-events-none opacity-40">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-2 h-12 bg-[#8b4513] border-x border-black/20" />
                    ))}
                    <div className="absolute top-4 left-0 w-full h-2 bg-[#8b4513]" />
                  </div>

                  <div className="absolute top-4 right-4 z-40">
                    <div className="bg-[#fff9eb]/90 backdrop-blur-md px-4 py-3 rounded-2xl border-2 border-[#d4a373] shadow-xl text-left">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${nearTargetNow ? 'bg-emerald-500' : 'bg-red-500'} shadow-[0_0_12px_rgba(0,0,0,0.18)]`} />
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#8b4513]">Status Target</div>
                      </div>
                      <div className="mt-1 text-xs font-black text-[#5d4037]">
                        {nearTargetNow ? 'Dekat • Siap Aksi' : 'Jauh • Dekati Area'}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase text-[#5d4037]/70">
                        <Move size={14} />
                        <span>WASD</span>
                        <span className="opacity-40">•</span>
                        <Sparkles size={14} />
                        <span>Seret Alat</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 z-40 flex flex-col gap-3">
                    <div className="hidden sm:block">
                      <div className="bg-[#fff9eb]/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#d4a373] shadow-xl text-left">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#8b4513]">Kontrol</div>
                        <div className="mt-1 text-[10px] font-bold text-[#5d4037]/80 leading-tight">
                          WASD/Arrow atau tombol arah
                        </div>
                      </div>
                    </div>
                    <DPad disabled={levelIntroOpen || Boolean(actionPlotId)} onMove={moveCharacter} />
                  </div>

                  <AnimatePresence>
                    {toast && (
                      <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.98 }}
                        className="absolute top-16 left-1/2 -translate-x-1/2 z-50"
                      >
                        <div
                          className={`px-5 py-4 rounded-2xl shadow-2xl border-2 backdrop-blur-md ${
                            toast.tone === 'good'
                              ? 'bg-emerald-600/90 text-white border-emerald-200'
                              : toast.tone === 'warn'
                                ? 'bg-red-600/90 text-white border-red-200'
                                : 'bg-[#8b4513]/90 text-white border-[#d4a373]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                              {toast.tone === 'good' ? <ShieldCheck size={18} /> : toast.tone === 'warn' ? <Zap size={18} /> : <Sparkles size={18} />}
                            </div>
                            <div className="text-left">
                              <div className="text-[10px] font-black uppercase tracking-widest opacity-90">{toast.title}</div>
                              {toast.subtitle && <div className="text-sm font-black leading-tight">{toast.subtitle}</div>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                    <CharacterSprite
                      isWalking={isWalking}
                      actionId={actionPlotId === requiredPlotId ? currentSteps[plantingStep]?.id ?? null : null}
                      toolIcon={plantingStep === 2 ? selectedSeedling.icon : currentSteps[plantingStep].icon}
                      accent={selectedSeedling.color}
                    />
                  </motion.div>

                  <div className="absolute inset-0">
                    {plots.map((plot, idx) => {
                      const isRequired = plot.id === requiredPlotId;
                      const near = isRequired && isNearTarget();
                      const stage = level === 1 ? plantingStep : (level2Stages[plot.id] ?? 0);
                      const size = Math.max(120, plot.size - 24);
                      const moisture = plotMoisture[plot.id] ?? 45;
                      const health = plotHealth[plot.id] ?? 75;
                      const stageCap = health < 30 ? 3 : health < 45 ? 4 : 6;
                      const stageShown = Math.min(stageCap, Math.min(stage, 6));
                      return (
                        <motion.div
                          key={plot.id}
                          animate={{
                            scale: isRequired ? (near ? 1.05 : 1.02) : 0.98,
                            opacity: isRequired ? 1 : 0.72,
                            boxShadow: isRequired
                              ? (near
                                  ? '0 0 0 3px rgba(255,235,59,0.95), 0 0 40px rgba(255,235,59,0.45)'
                                  : '0 0 0 3px rgba(62,39,35,0.7), 0 0 26px rgba(255,235,59,0.25)')
                              : '0 0 0 2px rgba(62,39,35,0.25)'
                          }}
                          className="absolute rounded-[2.5rem] flex items-center justify-center transition-all duration-300"
                          style={{
                            left: plot.cx - plot.size / 2,
                            top: plot.cy - plot.size / 2,
                            width: plot.size,
                            height: plot.size
                          }}
                        >
                          <div
                            className="absolute inset-2 rounded-[2.1rem] border-4 border-[#3e2723]/30 shadow-[inset_0_0_40px_rgba(0,0,0,0.25)]"
                            style={{
                              backgroundImage: [
                                'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.08) 0 70px, transparent 110px)',
                                'repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0 2px, rgba(0,0,0,0) 2px 14px)',
                                'linear-gradient(180deg, rgba(93,64,55,0.5) 0%, rgba(93,64,55,0.35) 45%, rgba(62,39,35,0.42) 100%)'
                              ].join(','),
                              backgroundSize: 'auto, auto, auto',
                              backgroundPosition: '0 0, 0 0, 0 0',
                            }}
                          />

                          {isRequired && (
                            <motion.div
                              animate={{ y: near ? [-3, -10, -3] : [-2, -7, -2], scale: [1, 1.02, 1] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                              className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#fff9eb] text-[#5d4037] px-4 py-2 rounded-full border-2 border-[#d4a373] shadow-lg"
                            >
                              <MapPin size={16} className="text-red-600" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Target</span>
                            </motion.div>
                          )}

                          <div className="relative z-10">
                            <RealisticTree
                              size={size + (Math.min(stage, 6) * 6)}
                              color={selectedSeedling.color}
                              stage={stageShown}
                              actionProgress={actionPlotId === plot.id ? actionProgress : 0}
                              icon={selectedSeedling.icon}
                              health={health}
                              moisture={moisture}
                            />

                            {actionPlotId === plot.id && (
                              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                <div className="bg-[#fff9eb]/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#d4a373] shadow-xl">
                                  <div className="w-44 h-2 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                                    <motion.div animate={{ width: `${actionProgress}%` }} className="h-full bg-emerald-500" />
                                  </div>
                                  <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-[#8b4513] text-center">
                                    {currentSteps[plantingStep]?.title}
                                  </div>
                                </div>
                              </div>
                            )}

                            {moisture < 22 && stage >= 2 && (
                              <div className="absolute -top-8 right-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2 shadow-md bg-red-50 text-red-700 border-red-200">
                                Kering
                              </div>
                            )}

                            {moisture > 85 && stage >= 2 && (
                              <div className="absolute -top-8 right-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2 shadow-md bg-blue-50 text-blue-700 border-blue-200">
                                Basah
                              </div>
                            )}

                            {level === 1 && plantingStep < 3 && isRequired && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                {plantingStep === 0 && (
                                  <div className="text-[#3e2723]/40 flex flex-col items-center">
                                    <Move size={32} className="animate-pulse" />
                                    <p className="text-[8px] font-black uppercase mt-1">Gali di Sini</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {level === 2 && stage < currentSteps.length && isRequired && stage === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-[#3e2723]/40 flex flex-col items-center">
                                  <Move size={32} className="animate-pulse" />
                                  <p className="text-[8px] font-black uppercase mt-1">Mulai dari Sini</p>
                                </div>
                              </div>
                            )}

                            {level === 2 && (
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2 shadow-md bg-[#fff9eb] text-[#5d4037] border-[#d4a373]">
                                Pohon {idx + 1}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Proximity Warning */}
                  <AnimatePresence>
                    {!isNearTarget() && isDragging && !levelIntroOpen && (
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

                  <AnimatePresence>
                    {levelIntroOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
                      >
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.98, opacity: 0 }}
                          className="bg-[#fff9eb] border-4 border-[#8b4513] rounded-[2rem] shadow-2xl p-8 max-w-md w-full text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#4caf50] rounded-2xl flex items-center justify-center text-white shadow-inner">
                              <Zap size={22} />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-[#8b4513]">Level 2</p>
                              <p className="text-xl font-black text-[#5d4037] uppercase">Perawatan Kebun</p>
                            </div>
                          </div>
                          <p className="text-[#5d4037] text-xs leading-relaxed mt-4 font-bold">
                            Lahan diperluas jadi 4 pohon. Selesaikan langkah penanaman untuk tiap pohon. Dekati target yang menyala lalu seret alat.
                          </p>
                          <button
                            onClick={() => setLevelIntroOpen(false)}
                            className="mt-6 w-full bg-[#8b4513] text-white py-4 rounded-2xl font-black text-xs uppercase shadow-lg active:scale-95"
                          >
                            Mulai Level 2
                          </button>
                        </motion.div>
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
                      onDragEnd={() => {
                        setIsDragging(false);
                        if (levelIntroOpen) return;
                        if (isNearTarget()) {
                          const plot = plots.find(p => p.id === requiredPlotId);
                          if (plot) setCharDirection((charPos.x + 30) > plot.cx ? 'left' : 'right');
                          setIsWalking(false);
                          startAction(requiredPlotId);
                        }
                      }}
                      whileDrag={{ scale: 1.2 }}
                      className="w-24 h-24 bg-[#fff9eb] rounded-2xl shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border-4 border-[#8b4513] text-[#8b4513] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-[#8b4513]/5" />
                      <motion.div
                        aria-hidden
                        className="absolute -inset-10 opacity-35"
                        animate={{ rotate: [0, 360] }}
                        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                        style={{ backgroundImage: 'conic-gradient(from 0deg, rgba(76,175,80,0.45), rgba(255,235,59,0.35), rgba(244,63,94,0.25), rgba(76,175,80,0.45))' }}
                      />
                      <div className="absolute inset-0 bg-[#fff9eb]/75" />
                      {React.createElement(
                        plantingStep === 2 ? selectedSeedling.icon : currentSteps[plantingStep].icon, 
                        { size: 40, className: "relative z-10" }
                      )}
                      <div className="text-[7px] font-black uppercase mt-1 relative z-10 opacity-60">
                        {currentSteps[plantingStep].id}
                      </div>
                      <motion.div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest text-[#8b4513] z-10"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1.4 }}
                      >
                        Seret
                      </motion.div>
                    </motion.div>
                    <button
                      type="button"
                      disabled={!nearTargetNow || levelIntroOpen}
                      onClick={() => {
                        if (levelIntroOpen) return;
                        if (!isNearTarget()) return;
                        const plot = plots.find(p => p.id === requiredPlotId);
                        if (plot) setCharDirection((charPos.x + 30) > plot.cx ? 'left' : 'right');
                        setIsWalking(false);
                        startAction(requiredPlotId);
                      }}
                      className={`mt-3 w-28 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl border-2 active:scale-95 transition-all ${
                        nearTargetNow && !levelIntroOpen
                          ? 'bg-[#8b4513] text-white border-[#5d4037]'
                          : 'bg-slate-200/70 text-slate-400 border-slate-300'
                      }`}
                    >
                      Aksi Cepat
                    </button>
                  </div>
                </div>

                {/* Info & Guide - Wooden Style */}
                <div className="lg:col-span-4 flex flex-col gap-3 h-full min-h-0">
                  <div className="bg-[#f4e4bc] p-5 rounded-[2rem] border-4 border-[#d4a373] shadow-md flex-1 min-h-0 overflow-auto flex flex-col text-left relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4a373] rotate-45 translate-x-8 -translate-y-8" />
                    <h3 className="text-xs font-black text-[#8b4513] uppercase mb-1 tracking-widest opacity-60">Langkah {plantingStep + 1}</h3>
                    <h4 className="text-xl font-black text-[#5d4037] mb-3 uppercase border-b-2 border-[#d4a373] pb-2">{currentSteps[plantingStep].title}</h4>
                    <p className="text-[#5d4037] text-xs leading-relaxed mb-6 font-medium italic">"{currentSteps[plantingStep].text}"</p>
                    
                    <div className="mb-5 bg-[#fff9eb] rounded-2xl border-2 border-[#d4a373] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#8b4513]">Checklist Misi</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#5d4037]/60">
                          {level === 2 ? `${Object.values(level2Stages).filter(v => v >= currentSteps.length).length}/4` : `${plantingStep}/${currentSteps.length}`}
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {currentSteps.map((s, i) => {
                          const done = i < plantingStep || (level === 2 && (level2Stages[activePlotId] ?? 0) > i);
                          const current = i === plantingStep;
                          return (
                            <div
                              key={s.id}
                              className={`rounded-xl border px-2 py-2 flex items-center gap-2 ${
                                done
                                  ? 'bg-emerald-50 border-emerald-200'
                                  : current
                                    ? 'bg-white border-[#8b4513]'
                                    : 'bg-white/70 border-[#d4a373]'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                done
                                  ? 'bg-emerald-600 text-white'
                                  : current
                                    ? 'bg-[#8b4513] text-white'
                                    : 'bg-[#d4a373]/30 text-[#8b4513]'
                              }`}>
                                {React.createElement(s.icon, { size: 16 })}
                              </div>
                              <div className="min-w-0">
                                <div className="text-[9px] font-black uppercase text-[#5d4037] truncate">{s.title}</div>
                                <div className={`text-[8px] font-black uppercase tracking-widest ${done ? 'text-emerald-700' : current ? 'text-[#8b4513]' : 'text-[#5d4037]/45'}`}>
                                  {done ? 'Selesai' : current ? 'Sekarang' : 'Nanti'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-5 bg-[#fff9eb] rounded-2xl border-2 border-[#d4a373] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#8b4513]">Edukasi</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#5d4037]/60">{selectedSeedling.name}</div>
                      </div>
                      <div className="mt-3 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#8b4513] text-white flex items-center justify-center shadow-inner">
                          <Sprout size={18} />
                        </div>
                        <div className="text-[11px] font-bold text-[#5d4037]/90 leading-relaxed">
                          {currentSteps[plantingStep].edu}
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="bg-white/70 border border-[#d4a373] rounded-xl px-3 py-2">
                          <div className="text-[9px] font-black uppercase tracking-widest text-[#8b4513]">Kelembaban</div>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                              <motion.div
                                animate={{ width: `${plotMoisture[level === 1 ? 'p1' : activePlotId] ?? 45}%` }}
                                className={`h-full ${((plotMoisture[level === 1 ? 'p1' : activePlotId] ?? 45) < 25) ? 'bg-red-500' : 'bg-blue-500'}`}
                              />
                            </div>
                            <div className="text-[10px] font-black text-[#5d4037]">
                              {Math.round(plotMoisture[level === 1 ? 'p1' : activePlotId] ?? 45)}%
                            </div>
                          </div>
                          {((plotMoisture[level === 1 ? 'p1' : activePlotId] ?? 45) < 25) && (
                            <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-red-600">Tanah kering</div>
                          )}
                        </div>
                        <div className="bg-white/70 border border-[#d4a373] rounded-xl px-3 py-2">
                          <div className="text-[9px] font-black uppercase tracking-widest text-[#8b4513]">Siklus Hari</div>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                              <motion.div
                                animate={{ width: `${((dayPhase + 1) / 8) * 100}%` }}
                                className="h-full bg-yellow-400"
                              />
                            </div>
                            <div className="text-[10px] font-black text-[#5d4037]">
                              {dayPhase + 1}/8
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto p-4 bg-[#fff9eb] rounded-xl border-2 border-[#d4a373]">
                      <div className="flex items-center gap-3 text-[#2e7d32] font-black text-[10px]">
                        <div className="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse" />
                        CARA BERMAIN:
                      </div>
                      <p className="text-[10px] text-[#5d4037] mt-2 font-bold leading-tight">
                        1. Gunakan <span className="text-red-600 uppercase">WASD</span> untuk bergerak.<br/>
                        2. Dekati area target yang menyala.<br/>
                        3. Seret alat ke kotak tersebut!
                      </p>
                      {level === 2 && (
                        <div className="mt-3 text-[10px] font-black text-[#8b4513] uppercase tracking-widest">
                          Target: Pohon {(['p1', 'p2', 'p3', 'p4'].indexOf(requiredPlotId) + 1) || 1} • Progres: {Object.values(level2Stages).filter(v => v >= currentSteps.length).length}/4
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#0b1220] p-4 rounded-[2rem] text-white border-4 border-[#111827] shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 18% 20%, rgba(34,197,94,0.22) 0 160px, transparent 260px), radial-gradient(circle at 82% 30%, rgba(59,130,246,0.18) 0 160px, transparent 260px)' }} />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-inner">
                            <Trees size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-white/50 uppercase leading-none">Dampak Lingkungan</p>
                            <p className="text-xs font-black text-white mt-1 tracking-wider">Simulasi Restorasi</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/60">
                          {Math.round((envProgress.co2 + envProgress.water + envProgress.temp + envProgress.bio) * 25)}%
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-[9px] font-black uppercase tracking-widest text-white/60">CO₂</div>
                            <div className="text-[10px] font-black text-emerald-200">{Math.round(envScore.co2)} pts</div>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div animate={{ width: `${envProgress.co2 * 100}%` }} className="h-full bg-emerald-500" />
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-[9px] font-black uppercase tracking-widest text-white/60">Resapan</div>
                            <div className="text-[10px] font-black text-blue-200">{Math.round(envScore.water)} pts</div>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div animate={{ width: `${envProgress.water * 100}%` }} className="h-full bg-blue-500" />
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-[9px] font-black uppercase tracking-widest text-white/60">Suhu</div>
                            <div className="text-[10px] font-black text-yellow-200">-{Math.round(envScore.temp)} pts</div>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div animate={{ width: `${envProgress.temp * 100}%` }} className="h-full bg-yellow-400" />
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-[9px] font-black uppercase tracking-widest text-white/60">Bio</div>
                            <div className="text-[10px] font-black text-pink-200">{Math.round(envScore.bio)} pts</div>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div animate={{ width: `${envProgress.bio * 100}%` }} className="h-full bg-pink-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#3e2723] p-4 rounded-[2rem] text-white border-4 border-[#212121] shadow-lg">
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
                <button onClick={() => { setPhase('selection'); setPlantingStep(0); setSelectedRegion(null); setSelectedSeedling(null); setLevel(1); setLevel2Stages({ p1: 0, p2: 0, p3: 0, p4: 0 }); setActivePlotId('p1'); setLevelIntroOpen(false); setActionPlotId(null); setActionProgress(0); }} className="bg-slate-100 px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all shadow-md active:scale-95">Mulai Baru</button>
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
