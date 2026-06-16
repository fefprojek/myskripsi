import React, { useState, useRef, memo, useEffect, useMemo, useReducer, useCallback, startTransition } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Trees, ArrowLeft, Thermometer, Droplets, Sun, Info, ShieldCheck, Zap, Move, Sparkles, Sprout, Trophy, Shovel, Volume2, VolumeX, Eye, EyeOff, ThumbsUp, MousePointer2, CloudRain, Wind, AlertTriangle, Activity, Leaf, Heart, Pause, Play, RotateCcw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Realistic Visual Components ---

const DecorativePlot = ({ x, y, highlight }: { x: number, y: number, highlight?: boolean }) => {
  const seed = Math.floor(x * 13 + y * 17);
  const rand = (n: number) => {
    const v = Math.sin((seed + n) * 999.123) * 10000;
    return v - Math.floor(v);
  };
  const tools = highlight ? 3 : 2;

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
      <div className="w-56 h-36 bg-[#3e2723]/30 rounded-[100%] blur-md" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-44 h-28 bg-[#2b1a16]/50 rounded-[100%] blur-[3px] shadow-2xl" />
        <div className="absolute w-36 h-20 bg-[#1a0f0d]/40 rounded-[100%] blur-[1px]" />
        <div className="absolute w-28 h-14 rounded-[100%] bg-black/25 blur-[10px]" />
      </div>

      {highlight && (
        <motion.div
          className="absolute inset-0 rounded-[100%]"
          animate={{ opacity: [0.15, 0.32, 0.15], scale: [0.98, 1.05, 0.98] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0 90px, rgba(245,158,11,0.06) 140px, transparent 200px)' }}
        />
      )}

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`stone-${i}`}
          className="absolute rounded-full shadow-lg border border-black/5"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 0.88, 0.8] }}
          transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 4 + Math.floor(rand(i + 1) * 7),
            height: 3 + Math.floor(rand(i + 11) * 6),
            left: 38 + Math.cos(i * (Math.PI / 5)) * (82 + rand(i + 21) * 18),
            top: 18 + Math.sin(i * (Math.PI / 5)) * (56 + rand(i + 31) * 12),
            rotate: i * 28,
            backgroundColor: i % 3 === 0 ? '#94a3b8' : i % 3 === 1 ? '#64748b' : '#475569',
            filter: highlight ? 'contrast(1.15) brightness(1.02)' : 'contrast(1.1) brightness(0.95)',
          }}
        />
      ))}

      {[...Array(14)].map((_, i) => (
        <motion.div
          key={`grass-${i}`}
          className="absolute flex flex-col items-center"
          style={{
            left: 58 + Math.cos(i * (Math.PI / 7)) * (74 + rand(i + 41) * 10),
            top: 26 + Math.sin(i * (Math.PI / 7)) * (46 + rand(i + 51) * 8),
          }}
        >
          <div className="flex gap-0.5">
            {[...Array(3)].map((_, j) => (
              <motion.div
                key={j}
                animate={{ rotate: [-14 + j * 14, 14 + j * 14, -14 + j * 14], skewX: [-5, 5, -5] }}
                transition={{
                  duration: 1.6 + rand(i * 9 + j + 61) * 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.06,
                }}
                className="w-1 rounded-full origin-bottom"
                style={{
                  height: 10 + rand(i * 7 + j + 71) * 10,
                  backgroundColor: j % 2 === 0 ? '#10b981' : '#059669',
                  boxShadow: highlight ? '0 2px 6px rgba(0,0,0,0.14)' : '0 2px 4px rgba(0,0,0,0.1)',
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      {[...Array(highlight ? 6 : 4)].map((_, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute w-2 h-2 rounded-full"
          animate={{ scale: [1, 1.22, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
          style={{
            left: 52 + Math.cos(i * (Math.PI / 3)) * (42 + rand(i + 81) * 10),
            top: 18 + Math.sin(i * (Math.PI / 3)) * (30 + rand(i + 91) * 8),
            backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f87171' : '#34d399',
            boxShadow: highlight ? '0 0 16px rgba(255,255,255,0.22)' : '0 0 10px rgba(255,255,255,0.18)',
          }}
        >
          <div className="absolute inset-0.5 bg-white/40 rounded-full" />
        </motion.div>
      ))}

      {[...Array(tools)].map((_, i) => {
        const t = rand(i + 121);
        const left = 26 + rand(i + 131) * 160;
        const top = 12 + rand(i + 141) * 96;
        const rot = -18 + rand(i + 151) * 36;

        if (t < 0.34) {
          return (
            <motion.div
              key={`tool-shovel-${i}`}
              className="absolute"
              style={{ left, top, rotate: rot }}
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 + rand(i + 161) * 1.4, ease: 'easeInOut' }}
            >
              <div className="w-1 h-10 rounded-full bg-[#8b5a2b] shadow-[0_8px_16px_rgba(0,0,0,0.25)]" />
              <div className="absolute -top-1 -left-2 w-5 h-2 rounded-full bg-[#a16207] shadow-[0_6px_12px_rgba(0,0,0,0.2)]" />
              <div className="absolute bottom-0 -left-1 w-3 h-4 rounded-b-lg bg-slate-300 border border-slate-400/40 shadow-[0_8px_16px_rgba(0,0,0,0.25)]" />
            </motion.div>
          );
        }

        if (t < 0.68) {
          return (
            <motion.div
              key={`tool-can-${i}`}
              className="absolute"
              style={{ left, top, rotate: rot }}
              animate={{ y: [0, -1.5, 0], rotate: [rot, rot + 1.6, rot] }}
              transition={{ repeat: Infinity, duration: 2.2 + rand(i + 171) * 1.2, ease: 'easeInOut' }}
            >
              <div className="relative w-8 h-6 rounded-xl bg-blue-500/40 border border-blue-300/30 shadow-[0_10px_18px_rgba(0,0,0,0.22)]">
                <div className="absolute -right-3 top-2 w-4 h-2 rounded-full bg-blue-300/40 border border-blue-200/20" />
                <div className="absolute -right-5 top-1 w-3 h-3 rounded-full bg-blue-200/25 border border-blue-200/20" />
                <div className="absolute -left-2 top-1 w-3 h-4 rounded-full border-2 border-blue-200/25" />
                <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
              </div>
            </motion.div>
          );
        }

        return (
          <motion.div
            key={`tool-bag-${i}`}
            className="absolute"
            style={{ left, top, rotate: rot }}
            animate={{ y: [0, -1.8, 0] }}
            transition={{ repeat: Infinity, duration: 2 + rand(i + 181) * 1.6, ease: 'easeInOut' }}
          >
            <div className="relative w-9 h-10 rounded-2xl bg-emerald-500/18 border border-emerald-300/20 shadow-[0_10px_18px_rgba(0,0,0,0.22)]">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-3 rounded-xl bg-emerald-200/12 border border-emerald-200/20" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-6 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-emerald-200/70">
                <Leaf size={14} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

type WorldWeather = 'sunny' | 'rainy' | 'drought' | 'polluted';

type AdrenalineEventType = 'HEATWAVE' | 'RAINSTORM' | 'PESTS' | 'POLLUTION_SPIKE';

type ActiveAdrenalineEvent = {
  id: number;
  type: AdrenalineEventType;
  startedAt: number;
  endsAt: number;
};

type PollutionSource = {
  id: string;
  x: number;
  y: number;
  strength: number;
};

type RestorationPatch = {
  id: number;
  x: number;
  y: number;
  bornAt: number;
  intensity: number;
};

type RestoreWave = {
  id: number;
  x: number;
  y: number;
};

const FALLEN_TREE_SPOTS: Array<{ id: string; x: number; y: number; rot: number; scale: number }> = [
  { id: 'ft-1', x: 420, y: 620, rot: 18, scale: 0.92 },
  { id: 'ft-2', x: 2480, y: 540, rot: -22, scale: 0.9 },
  { id: 'ft-3', x: 640, y: 2360, rot: -14, scale: 1.02 },
  { id: 'ft-4', x: 2460, y: 2440, rot: 16, scale: 0.96 },
];

const LEAF_LITTER_SPOTS: Array<{ id: string; x: number; y: number; rot: number; scale: number; density: number }> = Array.from(
  { length: 42 },
  (_, i) => {
    const x = 190 + ((i * 233) % 2620);
    const y = 220 + ((i * 367) % 2560);
    const rot = ((i * 47) % 70) - 35;
    const scale = 0.72 + (((i * 13) % 34) / 100);
    const density = 5 + (i % 5);
    return { id: `leaf-${i}`, x, y, rot, scale, density };
  }
);

const FallenTree = memo(
  ({ x, y, rot, scale, weather }: { x: number; y: number; rot: number; scale: number; weather: WorldWeather }) => {
    const tone =
      weather === 'drought' ? { trunkA: '#7c2d12', trunkB: '#3f1d12', leaf: 'rgba(202, 138, 4, 0.35)' } :
      weather === 'polluted' ? { trunkA: '#475569', trunkB: '#1f2937', leaf: 'rgba(148, 163, 184, 0.24)' } :
      weather === 'rainy' ? { trunkA: '#92400e', trunkB: '#3f1d12', leaf: 'rgba(16, 185, 129, 0.32)' } :
      { trunkA: '#a16207', trunkB: '#3f1d12', leaf: 'rgba(34, 197, 94, 0.28)' };

    return (
      <div
        className="absolute pointer-events-none z-[12]"
        style={{ left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})` }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-10 rounded-full bg-black/20 blur-xl" />
        <div className="relative w-64 h-20">
          <div
            className="absolute left-6 top-9 h-6 w-56 rounded-full border border-black/10 shadow-[0_14px_30px_rgba(0,0,0,0.22)]"
            style={{ background: `linear-gradient(90deg, ${tone.trunkA}, ${tone.trunkB})` }}
          />
          <div
            className="absolute left-6 top-9 h-6 w-56 rounded-full opacity-60"
            style={{
              background:
                weather === 'polluted'
                  ? 'repeating-linear-gradient(90deg, rgba(15,23,42,0.20) 0 6px, rgba(148,163,184,0.08) 6px 14px)'
                  : 'repeating-linear-gradient(90deg, rgba(2,6,23,0.18) 0 8px, rgba(255,255,255,0.06) 8px 18px)',
              maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
            }}
          />
          <div
            className="absolute left-2 top-7 w-14 h-14 rounded-full border border-black/15 shadow-[0_18px_38px_rgba(0,0,0,0.22)]"
            style={{ background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.22), transparent 60%), linear-gradient(135deg, ${tone.trunkA}, ${tone.trunkB})` }}
          />
          {weather === 'rainy' && (
            <div
              className="absolute left-20 top-6 w-16 h-10 rounded-[999px] blur-[0.6px] opacity-70"
              style={{
                background:
                  'radial-gradient(circle at 30% 40%, rgba(16,185,129,0.28) 0 18px, rgba(34,197,94,0.14) 36px, transparent 60px)',
                mixBlendMode: 'screen',
              }}
            />
          )}
          <div
            className="absolute left-56 top-10 w-8 h-5"
            style={{
              rotate: '-18deg',
              filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.18))',
              opacity: weather === 'drought' ? 0.85 : 0.55,
            }}
          >
            <div className="absolute left-0 top-1 w-6 h-1 rounded-full bg-white/15" />
            <div className="absolute left-1 top-2 w-5 h-1 rounded-full bg-white/10" />
            <div className="absolute left-2 top-3 w-4 h-1 rounded-full bg-white/8" />
          </div>
          <div className="absolute left-14 top-4 w-20 h-4 rounded-full bg-black/15 blur-md" />
          <div
            className="absolute left-44 top-2 h-4 w-16 rounded-full border border-black/10"
            style={{ background: `linear-gradient(90deg, ${tone.trunkB}, ${tone.trunkA})`, rotate: '-18deg' }}
          />
          <div
            className="absolute h-4 rounded-full border border-black/10"
            style={{
              left: 160,
              top: 72,
              width: 72,
              background: `linear-gradient(90deg, ${tone.trunkB}, ${tone.trunkA})`,
              rotate: '22deg',
            }}
          />
          <div className="absolute left-44 top-0 w-36 h-16 rounded-[40px] blur-[10px]" style={{ background: tone.leaf }} />
          <div className="absolute top-2 text-emerald-200/40" style={{ left: 192, rotate: '12deg' }}>
            <Leaf size={18} />
          </div>
          <div className="absolute top-14 text-emerald-200/35" style={{ left: 214, rotate: '-20deg' }}>
            <Leaf size={16} />
          </div>
          <div className="absolute top-10 text-emerald-200/30" style={{ left: 168, rotate: '28deg' }}>
            <Leaf size={14} />
          </div>
        </div>
      </div>
    );
  }
);

const LeafLitter = memo(
  ({
    x,
    y,
    rot,
    scale,
    density,
    weather,
  }: {
    x: number;
    y: number;
    rot: number;
    scale: number;
    density: number;
    weather: WorldWeather;
  }) => {
    const seed = Math.floor(x * 7 + y * 11);
    const rand = (n: number) => {
      const v = Math.sin((seed + n) * 741.927) * 10000;
      return v - Math.floor(v);
    };

    const base =
      weather === 'drought' ? 'rgba(202, 138, 4, 0.32)' :
      weather === 'polluted' ? 'rgba(148, 163, 184, 0.22)' :
      weather === 'rainy' ? 'rgba(16, 185, 129, 0.26)' :
      'rgba(34, 197, 94, 0.22)';

    return (
      <motion.div
        className="absolute pointer-events-none z-[11]"
        style={{ left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})` }}
        animate={{
          y: [0, weather === 'drought' ? -2.2 : -1.5, 0],
          rotate: weather === 'rainy' ? [`${rot}deg`, `${rot + 2}deg`, `${rot}deg`] : weather === 'drought' ? [`${rot}deg`, `${rot - 3}deg`, `${rot}deg`] : `${rot}deg`,
        }}
        transition={{ repeat: Infinity, duration: 3.2 + rand(9) * 2.8, ease: 'easeInOut' }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-10 rounded-full bg-black/18 blur-xl" />
        <div className="relative w-24 h-16">
          <div className="absolute inset-0 rounded-[40px] blur-[10px]" style={{ background: base }} />
          {weather === 'rainy' && (
            <div
              className="absolute inset-0 rounded-[40px] opacity-60"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%), radial-gradient(circle at 55% 55%, rgba(59,130,246,0.10) 0 26px, transparent 52px)',
                mixBlendMode: 'screen',
              }}
            />
          )}
          {Array.from({ length: density }, (_, i) => {
            const lx = 6 + rand(i + 1) * 76;
            const ly = 8 + rand(i + 11) * 42;
            const r = -55 + rand(i + 21) * 110;
            const s = 0.75 + rand(i + 31) * 0.55;
            const o = 0.22 + rand(i + 41) * 0.28;
            const size = 12 + Math.floor(rand(i + 51) * 8);
            const tint =
              weather === 'polluted'
                ? `rgba(148, 163, 184, ${o})`
                : weather === 'drought'
                  ? `rgba(217, 119, 6, ${o})`
                  : `rgba(52, 211, 153, ${o})`;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: lx, top: ly, rotate: `${r}deg`, scale: s, color: tint, filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.16))' }}
                animate={{
                  rotate: [`${r}deg`, `${r + (weather === 'drought' ? 10 : 6)}deg`, `${r}deg`],
                  x: weather === 'drought' ? [0, -2, 0] : 0,
                }}
                transition={{ repeat: Infinity, duration: 2.4 + rand(i + 61) * 2.5, ease: 'easeInOut', delay: i * 0.05 }}
              >
                <Leaf size={size} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }
);

const RestorationPatchSprite = memo(({ x, y, intensity }: { x: number; y: number; intensity: number }) => {
  const seed = Math.floor(x * 9 + y * 5);
  const rand = (n: number) => {
    const v = Math.sin((seed + n) * 913.551) * 10000;
    return v - Math.floor(v);
  };
  const grassCount = 10 + Math.floor(rand(1) * 10);
  const glow = Math.max(0.18, Math.min(0.55, 0.22 + intensity * 0.22));

  return (
    <motion.div
      className="absolute pointer-events-none z-[9]"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      animate={{ opacity: [0.78, 0.95, 0.78], scale: [0.995, 1.01, 0.995] }}
      transition={{ repeat: Infinity, duration: 3.8 + rand(2) * 2.4, ease: 'easeInOut' }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 720,
          height: 720,
          background:
            `radial-gradient(circle, rgba(34,197,94,${0.12 + glow}) 0 130px, rgba(16,185,129,${0.10 + glow * 0.55}) 240px, rgba(34,197,94,0.06) 360px, transparent 520px)`,
          mixBlendMode: 'screen',
          filter: 'blur(0.2px)',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 420,
          height: 420,
          background: 'radial-gradient(circle, rgba(16,185,129,0.20) 0 120px, rgba(16,185,129,0.06) 220px, transparent 320px)',
          mixBlendMode: 'overlay',
          filter: 'blur(0.4px)',
        }}
      />
      <div className="relative w-64 h-64">
        {Array.from({ length: grassCount }, (_, i) => {
          const a = (i / Math.max(1, grassCount)) * Math.PI * 2;
          const rr = 70 + rand(i + 10) * 70;
          const bx = 128 + Math.cos(a) * rr;
          const by = 132 + Math.sin(a) * (rr * 0.74);
          const h = 10 + rand(i + 30) * 22;
          const w = 1 + rand(i + 40) * 1.2;
          const r = -18 + rand(i + 50) * 36;
          const g = 0.24 + rand(i + 60) * 0.34;
          return (
            <motion.div
              key={i}
              className="absolute origin-bottom rounded-full"
              style={{
                left: bx,
                top: by,
                width: w,
                height: h,
                background: `linear-gradient(180deg, rgba(34,197,94,${g}) 0%, rgba(16,185,129,${g * 0.85}) 60%, rgba(6,95,70,${g * 0.6}) 100%)`,
                rotate: `${r}deg`,
                filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.22))',
              }}
              animate={{ rotate: [`${r - 10}deg`, `${r + 10}deg`, `${r - 10}deg`] }}
              transition={{ repeat: Infinity, duration: 1.6 + rand(i + 80) * 2.2, ease: 'easeInOut', delay: i * 0.03 }}
            />
          );
        })}
      </div>
    </motion.div>
  );
});

const PollutionSourceSprite = memo(({ x, y, strength }: { x: number; y: number; strength: number }) => {
  const scale = 0.92 + Math.min(0.25, strength * 0.08);
  return (
    <motion.div
      className="absolute pointer-events-none z-[25]"
      style={{ left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})` }}
      animate={{ y: [0, -2, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-44 h-32 rounded-[999px]"
        animate={{ opacity: [0.15, 0.35, 0.15], x: [-18, 18, -18] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle at 30% 60%, rgba(148,163,184,0.25), rgba(15,23,42,0.0) 65%)', filter: 'blur(10px)' }}
      />
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ opacity: [0.22, 0.42, 0.22], scale: [0.96, 1.08, 0.96] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.18) 0 22px, rgba(239,68,68,0.06) 50px, transparent 70px)' }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-16 rounded-3xl bg-slate-900/70 border border-white/10 shadow-2xl" />
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 w-10 h-8 rounded-2xl bg-slate-800/70 border border-white/10" />
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-8 h-7 rounded-2xl bg-slate-950/70 border border-white/10" />
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 w-8 h-7 rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),transparent_60%)]" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-1 text-red-300"
          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
        >
          <AlertTriangle size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
});

const AdrenalineEventFX = memo(
  ({ event }: { event: ActiveAdrenalineEvent | null }) => {
    if (!event) return null;
    if (event.type === 'HEATWAVE') {
      return (
        <div className="absolute inset-0 pointer-events-none z-[42]">
          <motion.div
            className="absolute inset-[-10%]"
            animate={{ opacity: [0.22, 0.42, 0.22], rotate: [0, 1.2, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle at 50% 30%, rgba(251,146,60,0.16), transparent 65%)', filter: 'blur(0.6px)' }}
          />
          <motion.div
            className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
            animate={{ x: [-80, 80, -80] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'linear' }}
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 12px)' }}
          />
        </div>
      );
    }
    if (event.type === 'RAINSTORM') {
      return (
        <div className="absolute inset-0 pointer-events-none z-[42]">
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.08, 0.2, 0.08] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle at 50% 20%, rgba(59,130,246,0.18), transparent 65%)' }}
          />
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.12, 0.24, 0.12] }}
            transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
            style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.08), rgba(2,6,23,0.24))' }}
          />
        </div>
      );
    }
    if (event.type === 'PESTS') {
      return (
        <div className="absolute inset-0 pointer-events-none z-[42]">
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.06, 0.18, 0.06] }}
            transition={{ repeat: Infinity, duration: 0.85, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(239,68,68,0.10), transparent 62%)' }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(239,68,68,0.12)]" />
        </div>
      );
    }
    return (
      <div className="absolute inset-0 pointer-events-none z-[42]">
        <motion.div
          className="absolute inset-[-10%] bg-slate-900/35"
          animate={{ x: [-140, 140, -140], opacity: [0.25, 0.5, 0.25] }}
          transition={{ repeat: Infinity, duration: 10.5, ease: 'easeInOut' }}
          style={{ filter: 'blur(12px)' }}
        />
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 10px)' }} />
      </div>
    );
  }
);

const Bird = memo(({ seed }: { seed: number }) => {
  const rand = useCallback((n: number) => prand(seed * 91.7 + n * 13.1), [seed]);
  const y0 = useMemo(() => 40 + rand(1) * 460, [rand]);
  const y1 = useMemo(() => 40 + rand(2) * 460, [rand]);
  const y2 = useMemo(() => 40 + rand(3) * 460, [rand]);
  const duration = useMemo(() => 14 + rand(4) * 12, [rand]);
  const delay = useMemo(() => rand(5) * 5.5, [rand]);

  return (
    <motion.div
      initial={{ x: -160, y: y0 }}
      animate={{ x: 3160, y: [y0, y1, y2] }}
      transition={{ duration, ease: 'linear', repeat: Infinity, delay }}
      className="absolute pointer-events-none z-[70]"
      style={{ filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.12))' }}
    >
      <div className="relative flex gap-1">
        <motion.div
          animate={{ rotateZ: [-30, 30, -30] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="w-4 h-1 rounded-full origin-right"
          style={{ background: 'linear-gradient(90deg, rgba(15,23,42,0.75), rgba(30,41,59,0.9))' }}
        />
        <div className="w-2 h-2 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12), rgba(2,6,23,0.92))' }} />
        <motion.div
          animate={{ rotateZ: [30, -30, 30] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="w-4 h-1 rounded-full origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(30,41,59,0.9), rgba(15,23,42,0.75))' }}
        />
      </div>
    </motion.div>
  );
});

const SeedlingIcon = ({ type, active = false }: { type: string; active?: boolean }) => {
  if (type === 'Mahoni') {
    return (
      <motion.svg
        viewBox="0 0 120 120"
        className="w-28 h-28 drop-shadow-2xl z-10"
        animate={{ rotate: active ? [-2, 2, -2] : [0, 1.2, 0], y: active ? [0, -4, 0] : [0, -2, 0], scale: active ? [1, 1.05, 1] : [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: active ? 1.2 : 2.8, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="mahoniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <filter id="leafShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
          </filter>
        </defs>
        <motion.ellipse cx="60" cy="105" rx="35" ry="8" fill="rgba(0,0,0,0.2)" animate={{ scaleX: active ? [1, 0.88, 1] : [1, 0.94, 1] }} transition={{ repeat: Infinity, duration: active ? 1.2 : 2.8, ease: 'easeInOut' }} />
        <motion.path d="M52 105 C52 80 45 60 45 60 L75 60 C75 60 68 80 68 105 Z" fill="url(#trunkGrad)" animate={{ rotate: active ? [-1.2, 1.2, -1.2] : 0 }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }} style={{ originX: '60px', originY: '95px' }} />
        <motion.path d="M60 65 L40 40 M60 60 L80 35" fill="none" stroke="url(#trunkGrad)" strokeWidth="6" strokeLinecap="round" animate={{ rotate: active ? [-1.5, 1.5, -1.5] : 0 }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }} style={{ originX: '60px', originY: '62px' }} />
        <motion.g filter="url(#leafShadow)" animate={{ rotate: active ? [-3, 3, -3] : [-1.2, 1.2, -1.2] }} transition={{ repeat: Infinity, duration: active ? 1.2 : 2.4, ease: 'easeInOut' }} style={{ originX: '60px', originY: '45px' }}>
          <circle cx="60" cy="35" r="28" fill="url(#mahoniGrad)" />
          <circle cx="40" cy="45" r="22" fill="url(#mahoniGrad)" />
          <circle cx="80" cy="45" r="22" fill="url(#mahoniGrad)" />
          <circle cx="50" cy="20" r="18" fill="#4ade80" opacity="0.8" />
          <circle cx="70" cy="20" r="18" fill="#4ade80" opacity="0.8" />
        </motion.g>
        {active && [...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={44 + i * 16}
            cy={18 + (i % 2) * 6}
            r="3.2"
            fill="rgba(255,255,255,0.65)"
            initial={{ opacity: 0, y: 2, scale: 0.6 }}
            animate={{ opacity: [0, 0.8, 0], y: [2, -10, -16], scale: [0.6, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.18, ease: 'easeOut' }}
          />
        ))}
      </motion.svg>
    );
  }
  if (type === 'Jati') {
    return (
      <motion.svg
        viewBox="0 0 120 120"
        className="w-28 h-28 drop-shadow-2xl z-10"
        animate={{ rotate: active ? [2, -2, 2] : [0, 1, 0], y: active ? [0, -4, 0] : [0, -2, 0], scale: active ? [1, 1.04, 1] : [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: active ? 1.15 : 2.6, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="jatiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="50%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>
        </defs>
        <motion.ellipse cx="60" cy="105" rx="30" ry="6" fill="rgba(0,0,0,0.2)" animate={{ scaleX: active ? [1, 0.9, 1] : [1, 0.95, 1] }} transition={{ repeat: Infinity, duration: active ? 1.15 : 2.6, ease: 'easeInOut' }} />
        <path d="M60 105 C60 90 55 80 55 80" fill="none" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
        <motion.path d="M55 80 C20 70 5 30 60 10 C115 30 100 70 55 80 Z" fill="url(#jatiGrad)" stroke="#365314" strokeWidth="1" animate={{ rotate: active ? [2.5, -2.5, 2.5] : [-1, 1, -1] }} transition={{ repeat: Infinity, duration: active ? 1.1 : 2.8, ease: 'easeInOut' }} style={{ originX: '60px', originY: '58px' }} />
        <motion.path d="M55 80 C60 50 60 20 60 10 M58 65 C45 55 30 50 30 50 M58 65 C70 55 85 50 85 50 M59 45 C45 35 35 30 35 30 M59 45 C75 35 85 30 85 30 M60 25 C50 20 45 15 45 15 M60 25 C70 20 75 15 75 15" fill="none" stroke="#3f6212" strokeWidth="3" strokeLinecap="round" opacity="0.6" animate={{ opacity: active ? [0.45, 0.9, 0.45] : [0.5, 0.7, 0.5] }} transition={{ repeat: Infinity, duration: active ? 1.0 : 2.2, ease: 'easeInOut' }} />
        {active && (
          <motion.path
            d="M55 80 C20 70 5 30 60 10 C115 30 100 70 55 80 Z"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="16 120"
            animate={{ strokeDashoffset: [0, -136] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
          />
        )}
      </motion.svg>
    );
  }
  if (type === 'Pinus') {
    return (
      <motion.svg
        viewBox="0 0 120 120"
        className="w-28 h-28 drop-shadow-2xl z-10"
        animate={{ rotate: active ? [-2.4, 2.4, -2.4] : [-1, 1, -1], y: active ? [0, -4, 0] : [0, -2, 0], scale: active ? [1, 1.05, 1] : [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: active ? 1.0 : 2.4, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="pinusGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="pinusGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="pinusGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>
        <motion.ellipse cx="60" cy="105" rx="35" ry="8" fill="rgba(0,0,0,0.2)" animate={{ scaleX: active ? [1, 0.88, 1] : [1, 0.94, 1] }} transition={{ repeat: Infinity, duration: active ? 1.0 : 2.4, ease: 'easeInOut' }} />
        <path d="M55 105 L65 105 L62 70 L58 70 Z" fill="#451a03" />
        <motion.path d="M25 80 Q60 70 95 80 L60 30 Z" fill="url(#pinusGrad3)" animate={{ rotate: active ? [-2.8, 2.8, -2.8] : [-1.2, 1.2, -1.2] }} transition={{ repeat: Infinity, duration: active ? 1.0 : 2.0, ease: 'easeInOut' }} style={{ originX: '60px', originY: '80px' }} />
        <motion.path d="M30 60 Q60 50 90 60 L60 15 Z" fill="url(#pinusGrad2)" animate={{ rotate: active ? [2.4, -2.4, 2.4] : [1, -1, 1] }} transition={{ repeat: Infinity, duration: active ? 0.95 : 1.8, ease: 'easeInOut' }} style={{ originX: '60px', originY: '60px' }} />
        <motion.path d="M35 40 Q60 30 85 40 L60 5 Z" fill="url(#pinusGrad1)" animate={{ rotate: active ? [-2.0, 2.0, -2.0] : [-0.8, 0.8, -0.8] }} transition={{ repeat: Infinity, duration: active ? 0.9 : 1.6, ease: 'easeInOut' }} style={{ originX: '60px', originY: '38px' }} />
        {active && [...Array(4)].map((_, i) => (
          <motion.circle
            key={i}
            cx={48 + i * 8}
            cy={52 - (i % 2) * 10}
            r="2.5"
            fill="rgba(191,219,254,0.85)"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.9, 0], y: [0, -8 - i * 2, -14 - i * 2], x: [0, (i % 2 === 0 ? -2 : 2), 0], scale: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 0.95, delay: i * 0.14, ease: 'easeOut' }}
          />
        ))}
      </motion.svg>
    );
  }
  return (
    <motion.div
      animate={{ y: active ? [0, -4, 0] : [0, -2, 0], rotate: active ? [-4, 4, -4] : 0, scale: active ? [1, 1.06, 1] : [1, 1.02, 1] }}
      transition={{ repeat: Infinity, duration: active ? 1.0 : 2.5, ease: 'easeInOut' }}
    >
      <Trees size={64} className="text-emerald-700" />
    </motion.div>
  );
};

const HDBar = ({
  value01,
  from,
  to,
  track = 'rgba(255,255,255,0.18)',
  height = 12,
  rounded = 6,
  className,
}: {
  value01: number;
  from: string;
  to: string;
  track?: string;
  height?: number;
  rounded?: number;
  className?: string;
}) => {
  const idRef = useRef(`hdbar-${Math.random().toString(16).slice(2)}`);
  const id = idRef.current;
  const v = Math.max(0, Math.min(1, value01));
  const w = v * 100;
  const knobX = Math.max(rounded, Math.min(100 - rounded, w));
  return (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={className ?? ''}
      style={{ height }}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <pattern id={`${id}-p`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="skewX(-18)">
          <rect width="6" height="6" fill="transparent" />
          <rect x="0" y="0" width="2" height="6" fill="rgba(255,255,255,0.10)" />
        </pattern>
        <filter id={`${id}-shadow`} x="-20%" y="-80%" width="140%" height="260%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="rgba(0,0,0,0.45)" />
        </filter>
      </defs>
      <rect x="0" y="0" width="100" height="10" rx={rounded} fill={track} />
      <motion.rect
        initial={false}
        animate={{ width: w }}
        x="0"
        y="0"
        height="10"
        rx={rounded}
        fill={`url(#${id}-g)`}
        filter={`url(#${id}-shadow)`}
      />
      <motion.rect initial={false} animate={{ width: w }} x="0" y="0" height="10" rx={rounded} fill={`url(#${id}-p)`} opacity="0.7" />
      <motion.rect initial={false} animate={{ width: w }} x="0" y="0.4" height="4" rx={rounded} fill="rgba(255,255,255,0.18)" />
      <motion.circle
        initial={false}
        animate={{ cx: knobX }}
        cy="5"
        r="3.6"
        fill="rgba(255,255,255,0.95)"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.6"
      />
      <motion.circle initial={false} animate={{ cx: knobX }} cy="5" r="2" fill={`url(#${id}-g)`} />
    </svg>
  );
};

type MascotPose = 'idle' | 'wave' | 'point' | 'plant' | 'water' | 'guard' | 'cheer' | 'worry';

type MascotAttention = {
  pose?: MascotPose;
  message?: string;
  hint?: string;
  tone?: 'happy' | 'neutral' | 'worried';
  kind?: 'idle' | 'hover' | 'click' | 'action';
};

type MascotState = 'idle' | 'aware' | 'hoverMap' | 'happy' | 'thinking' | 'worried' | 'active';

type MascotMachine = {
  state: MascotState;
  lockUntil: number;
  lastActivityAt: number;
  near: boolean;
  nudgeUntil: number;
  funUntil: number;
  dialogNonce: number;
  attentionSig: string;
  statusSig: string;
  lastActionPose: MascotPose | null;
};

type MascotEvent =
  | { type: 'NEAR'; now: number; near: boolean }
  | { type: 'ATTENTION'; now: number; sig: string; statusSig: string; attention: MascotAttention | null | undefined; regionStatus: string | null | undefined }
  | { type: 'ACTION'; now: number; pose: MascotPose }
  | { type: 'CHAR_CLICK'; now: number }
  | { type: 'IDLE_NUDGE'; now: number }
  | { type: 'TICK'; now: number };

const EnvMascotCard = memo(({
  onGuide,
  mode = 'full',
  regionName,
  regionStatus,
  attention,
  avatarSrc,
}: {
  onGuide: () => void;
  mode?: 'full' | 'compact';
  regionName?: string;
  regionStatus?: string | null;
  attention?: MascotAttention | null;
  avatarSrc?: string | null;
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const [selfHover, setSelfHover] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [idleTick, setIdleTick] = useState(0);
  const [actionFxId, setActionFxId] = useState<number | null>(null);
  const [actionFxKind, setActionFxKind] = useState<'thumb' | 'spark'>('spark');
  const [typedText, setTypedText] = useState('');

  const attentionSig = `${attention?.kind ?? ''}|${attention?.tone ?? ''}|${attention?.hint ?? ''}|${attention?.message ?? ''}`;
  const statusSig = `${regionStatus ?? ''}|${regionName ?? ''}`;

  const machineReducer = useCallback((m: MascotMachine, e: MascotEvent): MascotMachine => {
    const fast = e.now - m.lastActivityAt < 2400;
    if (e.type === 'ACTION') {
      return {
        ...m,
        state: 'active',
        lockUntil: e.now + (fast ? 720 : 920),
        lastActivityAt: e.now,
        dialogNonce: m.dialogNonce + 1,
        lastActionPose: e.pose,
        nudgeUntil: 0,
      };
    }
    if (e.type === 'CHAR_CLICK') {
      return {
        ...m,
        state: 'active',
        lockUntil: e.now + (fast ? 560 : 740),
        lastActivityAt: e.now,
        dialogNonce: m.dialogNonce + 1,
        funUntil: e.now + 620,
        lastActionPose: m.lastActionPose ?? 'wave',
        nudgeUntil: 0,
      };
    }
    if (e.type === 'IDLE_NUDGE') {
      if (e.now < m.lockUntil) return m;
      if (e.now - m.lastActivityAt < 5200) return m;
      return {
        ...m,
        state: 'idle',
        nudgeUntil: e.now + 1650,
        dialogNonce: m.dialogNonce + 1,
      };
    }
    if (e.type === 'NEAR') {
      const next: MascotMachine = {
        ...m,
        near: e.near,
        lastActivityAt: e.near ? e.now : m.lastActivityAt,
      };
      if (e.now < next.lockUntil) return next;
      if (next.attentionSig && next.attentionSig !== '||||') return next;
      if (next.state === 'hoverMap') return next;
      return { ...next, state: e.near ? 'aware' : 'idle', dialogNonce: next.dialogNonce + (e.near ? 1 : 0) };
    }
    if (e.type === 'ATTENTION') {
      if (e.sig === m.attentionSig && e.statusSig === m.statusSig && e.now < m.lockUntil) {
        return m;
      }
      if (e.now < m.lockUntil) {
        return { ...m, attentionSig: e.sig, statusSig: e.statusSig };
      }

      let nextState: MascotState = m.near ? 'aware' : 'idle';
      let lockUntil = 0;
      let funUntil = m.funUntil;

      if (e.attention?.kind === 'hover') nextState = 'hoverMap';
      if (e.attention?.kind === 'click') {
        const s = e.regionStatus ?? null;
        if (s === 'hijau') nextState = 'happy';
        else if (s === 'kritis') nextState = 'thinking';
        else nextState = 'worried';
        lockUntil = e.now + (fast ? 820 : 1150);
        funUntil = nextState === 'happy' ? e.now + 560 : funUntil;
      }
      if (e.attention?.kind === 'action') nextState = 'active';

      const activityNow = e.attention?.kind && e.attention.kind !== 'idle' ? e.now : m.lastActivityAt;
      const changed = nextState !== m.state || e.sig !== m.attentionSig || e.statusSig !== m.statusSig;
      return {
        ...m,
        state: nextState,
        lockUntil,
        funUntil,
        lastActivityAt: activityNow,
        dialogNonce: changed ? m.dialogNonce + 1 : m.dialogNonce,
        attentionSig: e.sig,
        statusSig: e.statusSig,
        nudgeUntil: changed ? 0 : m.nudgeUntil,
      };
    }
    if (e.type === 'TICK') {
      const next: MascotMachine = { ...m };
      if (next.nudgeUntil && e.now > next.nudgeUntil) next.nudgeUntil = 0;
      if (next.funUntil && e.now > next.funUntil) next.funUntil = 0;
      if (next.lockUntil && e.now > next.lockUntil) next.lockUntil = 0;
      if (!next.lockUntil && (next.state === 'active' || next.state === 'happy' || next.state === 'thinking' || next.state === 'worried')) {
        next.state = next.attentionSig && next.attentionSig !== '||||' ? next.state : next.near ? 'aware' : 'idle';
      }
      return next;
    }
    return m;
  }, []);

  const [machine, send] = useReducer(machineReducer, null, () => ({
    state: 'idle',
    lockUntil: 0,
    lastActivityAt: Date.now(),
    near: false,
    nudgeUntil: 0,
    funUntil: 0,
    dialogNonce: 0,
    attentionSig: '',
    statusSig: '',
    lastActionPose: null,
  } satisfies MascotMachine));

  useEffect(() => {
    const now = Date.now();
    send({ type: 'ATTENTION', now, sig: attentionSig, statusSig, attention, regionStatus });
  }, [attention, attentionSig, regionStatus, send, statusSig]);

  useEffect(() => {
    const t = window.setInterval(() => send({ type: 'TICK', now: Date.now() }), 220);
    return () => window.clearInterval(t);
  }, [send]);

  useEffect(() => {
    const t = window.setInterval(() => setIdleTick(v => v + 1), 2600);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!actionFxId) return;
    const t = window.setTimeout(() => setActionFxId(null), 720);
    return () => window.clearTimeout(t);
  }, [actionFxId]);

  useEffect(() => {
    const t = window.setTimeout(() => send({ type: 'IDLE_NUDGE', now: Date.now() }), 5600);
    return () => window.clearTimeout(t);
  }, [machine.lastActivityAt, send]);

  const mood = useMemo<'happy' | 'neutral' | 'worried'>(() => {
    if (machine.state === 'happy') return 'happy';
    if (machine.state === 'worried') return 'worried';
    if (regionStatus === 'hijau') return 'happy';
    if (regionStatus === 'gersang') return 'worried';
    return 'neutral';
  }, [machine.state, regionStatus]);

  const isFast = Date.now() - machine.lastActivityAt < 2600;
  const showBubble = machine.state !== 'idle' || selfHover || Boolean(actionFxId) || Boolean(machine.nudgeUntil);

  const accent = useMemo(() => {
    // Monkey-themed colors but keeping status indicators
    const monkeyBrown = '#6b3e23'; // Richer brown for fur
    const monkeyFace = '#f3d5b5';  // Softer tan for face
    const monkeyDark = '#4a2c19';  // Darker for depth
    
    if (regionStatus === 'hijau') return { chipBg: 'bg-emerald-100', chipText: 'text-emerald-800', glow: 'rgba(16,185,129,0.25)', core: monkeyBrown, face: monkeyFace, dark: monkeyDark, highlight: '#10b981' };
    if (regionStatus === 'kritis') return { chipBg: 'bg-orange-100', chipText: 'text-orange-800', glow: 'rgba(251,146,60,0.25)', core: monkeyBrown, face: monkeyFace, dark: monkeyDark, highlight: '#fb923c' };
    if (regionStatus === 'gersang') return { chipBg: 'bg-red-100', chipText: 'text-red-800', glow: 'rgba(248,113,113,0.25)', core: monkeyBrown, face: monkeyFace, dark: monkeyDark, highlight: '#f87171' };
    return { chipBg: 'bg-emerald-100', chipText: 'text-emerald-800', glow: 'rgba(16,185,129,0.25)', core: monkeyBrown, face: monkeyFace, dark: monkeyDark, highlight: '#10b981' };
  }, [regionStatus]);

  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const pupilXS = useSpring(pupilX, { stiffness: 420, damping: 34, mass: 0.5 });
  const pupilYS = useSpring(pupilY, { stiffness: 420, damping: 34, mass: 0.5 });
  const lastNearRef = useRef(false);
  const moveRafRef = useRef<number | null>(null);
  const lastMoveRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (ev: MouseEvent) => {
      lastMoveRef.current = { x: ev.clientX, y: ev.clientY };
      if (moveRafRef.current) return;
      moveRafRef.current = window.requestAnimationFrame(() => {
        moveRafRef.current = null;
        const last = lastMoveRef.current;
        if (!last) return;
        const now = Date.now();

        const head = headRef.current;
        if (head) {
          const r = head.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = Math.max(-1, Math.min(1, (last.x - cx) / Math.max(1, r.width)));
          const dy = Math.max(-1, Math.min(1, (last.y - cy) / Math.max(1, r.height)));
          pupilX.set(dx * 3.2);
          pupilY.set(dy * 2.6);
        }

        const root = rootRef.current;
        if (root) {
          const r = root.getBoundingClientRect();
          const ax = r.right - 24;
          const ay = r.bottom - 24;
          const near = Math.hypot(last.x - ax, last.y - ay) < 170;
          if (near !== lastNearRef.current) {
            lastNearRef.current = near;
            send({ type: 'NEAR', now, near });
          }
        }
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (moveRafRef.current) window.cancelAnimationFrame(moveRafRef.current);
      moveRafRef.current = null;
    };
  }, [headRef, pupilX, pupilY, send]);

  const idlePose: MascotPose = idleTick % 2 === 0 ? 'wave' : 'point';
  const effectivePose: MascotPose = useMemo(() => {
    if (machine.state === 'active') return machine.lastActionPose ?? 'cheer';
    if (machine.state === 'happy') return 'cheer';
    if (machine.state === 'thinking') return 'point';
    if (machine.state === 'worried') return 'worry';
    if (machine.state === 'hoverMap') return 'point';
    if (machine.state === 'aware') return 'wave';
    if (machine.nudgeUntil) return 'wave';
    return idlePose;
  }, [idlePose, machine.lastActionPose, machine.nudgeUntil, machine.state]);

  const copy = useMemo(() => {
    if (regionStatus === 'hijau') {
      return {
        headline: regionName ? `${regionName} sudah asri!` : 'Yuk, jaga hutan kita!',
        body: 'Halo Sobat! Wilayah ini sudah hijau. Tugas kita adalah menjaganya agar tetap rimbun dan sejuk untuk masa depan.',
      };
    }
    if (regionStatus === 'kritis') {
      return {
        headline: regionName ? `Ayo hijaukan ${regionName}!` : 'Butuh aksi nyata!',
        body: 'Wilayah ini mulai gersang. Ayo bantu aku menanam lebih banyak pohon di sini supaya udara kembali segar!',
      };
    }
    if (regionStatus === 'gersang') {
      return {
        headline: regionName ? `Pulihkan ${regionName} sekarang!` : 'Lahan gersang butuh kita!',
        body: 'Gawat! Tanah di sini sangat kering. Yuk, kita mulai gerakan menanam pohon sekarang sebelum terlambat!',
      };
    }
    if (mode === 'compact') {
      return {
        headline: 'Halo, aku Maskot Penjaga!',
        body: 'Aku akan memandumu menjaga lingkungan. Pilih wilayah di peta yang butuh bantuan kita ya!',
      };
    }
    const options = [
      {
        headline: 'Salam Hijau, Sobat Bandung!',
        body: 'Aku Maskot Penjaga. Yuk, kita bersatu hijaukan Bandung Raya! Pilih wilayah merah/oranye di peta untuk mulai gerakan menanam pohon bersama warga lainnya!',
      },
      {
        headline: 'Ayo Bergerak Sekarang!',
        body: 'Lingkungan kita butuh aksi nyata, bukan sekadar kata. Ambil bibitmu, ajak teman-temanmu, dan mari kita kembalikan kesejukan di tanah kelahiran kita!',
      },
      {
        headline: 'Masa Depan di Tanganmu!',
        body: 'Setiap pohon yang kita tanam hari ini adalah nafas untuk anak cucu kita nanti. Mari kita gerakkan semangat menanam pohon di seluruh penjuru daerah!',
      },
    ];
    return options[Math.floor(Math.random() * options.length)];
  }, [mode, regionName, regionStatus]);

  const dialog = useMemo(() => {
    const seedFromText = (s: string) => {
      let acc = 0;
      for (let i = 0; i < s.length; i += 1) acc = (acc * 31 + s.charCodeAt(i)) >>> 0;
      return acc;
    };
    const pick = <T,>(options: T[], seed: number) => options[Math.abs(seed) % options.length];

    const state = machine.state;
    const seed = seedFromText(`${state}|${regionStatus ?? ''}|${regionName ?? ''}|${machine.dialogNonce}`);
    const name = regionName ?? 'wilayah ini';

    if (attention?.message && state !== 'idle') {
      return { hint: attention?.hint ?? 'Pesan', text: attention.message };
    }

    if (state === 'active') {
      return {
        hint: 'Aksi Seru!',
        text: pick(['Mantap! Kamu pahlawan lingkungan Bandung!', 'Sip! Pohon ini akan jadi warisan berharga kita.', 'Luar biasa! Bandung makin sejuk berkat aksimu.'], seed),
      };
    }
    if (state === 'happy') {
      return {
        hint: 'Hore!',
        text: pick([`Wah, ${name} asri banget sekarang!`, `Terima kasih ya, ${name} jadi rimbun kembali.`, `Keren! Yuk kita hijaukan wilayah lainnya!`], seed),
      };
    }
    if (state === 'thinking') {
      return {
        hint: 'Ide Cemerlang',
        text: pick([`Hmm, bibit apa ya yang paling cocok buat ${name}?`, `Ayo kita tanam pohon yang paling rindang di ${name}.`, `Siapkan tenagamu, ${name} butuh sentuhan pahlawan!`], seed),
      };
    }
    if (state === 'worried') {
      return {
        hint: 'Gawat!',
        text: pick([`Aduh, ${name} gersang banget! Kita harus gerak!`, `Kasihan ${name}, yuk ajak teman-temanmu menanam di sini!`, `Jangan biarkan ${name} kering, ayo beraksi sekarang!`], seed),
      };
    }
    if (state === 'hoverMap') {
      return {
        hint: 'Cek Lokasi',
        text: pick([`Status ${name} terpantau. Siap restorasi?`, `Wah, ${name} manggil-manggil minta ditanami nih!`, `Ayo cek kondisi ${name}, lalu kita hijaukan bareng!`], seed),
      };
    }
    if (state === 'aware') {
      return {
        hint: 'Halo Pahlawan!',
        text: pick(['Siap menghijaukan Bandung hari ini, Sobat?', 'Ayo kita cari lahan gersang dan tanami pohon!', 'Aku siap memandumu!'], seed),
      };
    }
    if (machine.nudgeUntil) {
      return {
        hint: 'Tips Maskot',
        text: pick(['Klik wilayah merah di peta, itu yang paling darurat!', 'Jangan ragu, setiap bibit pohonmu sangat berarti!', 'Ayo gerakkan jemarimu untuk masa depan hijau!'], seed),
      };
    }
    return {
      hint: 'Maskot Penjaga',
      text: pick(['Ayo, pilih wilayah di peta dan mari kita menanam!', 'Jaga Bandung tetap sejuk, mari tanam pohon!', 'Klik wilayah yang butuh bantuanmu sekarang juga!'], seed),
    };
  }, [attention?.hint, attention?.message, machine.dialogNonce, machine.nudgeUntil, machine.state, regionName, regionStatus]);

  useEffect(() => {
    if (!showBubble) return;
    const full = dialog.text;
    setTypedText('');
    let i = 0;
    const speed = Date.now() - machine.lastActivityAt < 2600 ? 14 : 22;
    const t = window.setInterval(() => {
      i += 1;
      setTypedText(full.slice(0, i));
      if (i >= full.length) window.clearInterval(t);
    }, speed);
    return () => window.clearInterval(t);
  }, [dialog.text, machine.dialogNonce, machine.lastActivityAt, showBubble]);

  const motionProfile = useMemo(() => {
    const lively = Boolean(machine.funUntil || machine.state === 'active' || machine.state === 'happy');

    return {
      card: {
        rotate:
          machine.funUntil
            ? [0, 6, -5, 0]
            : machine.state === 'thinking'
              ? [1.2, 0.3, 1.2]
              : machine.state === 'hoverMap'
                ? [0.4, -0.4, 0.4]
                : machine.state === 'aware'
                  ? [-0.8, 0.8, -0.8]
                  : mood === 'worried'
                    ? [0, -0.9, 0.9, -0.9, 0]
                    : [-0.45, 0.45, -0.45],
        y: lively ? [0, -3.2, 0] : [0, -1.4, 0],
        x:
          machine.state === 'worried'
            ? [0, -1.2, 1.2, -1.2, 0]
            : machine.state === 'hoverMap'
              ? [0, -1.6, 0]
              : machine.state === 'aware'
                ? [0, -1.1, 0]
                : [0, 0, 0],
        scale: selfHover ? 1.018 : machine.state === 'aware' ? 1.008 : 1,
        duration: machine.state === 'worried' ? 1.55 : isFast ? 3.1 : 4.3,
      },
      body: {
        y: lively ? [0, -2.5, 0] : [0, -1.2, 0],
        x:
          effectivePose === 'point'
            ? [-0.8, -2.2, -0.8]
            : effectivePose === 'plant'
              ? [0.4, 1.1, 0.4]
              : effectivePose === 'guard'
                ? [0, 0.7, 0]
                : [0, 0, 0],
        duration: isFast ? 3.4 : 4.6,
      },
      head: {
        rotate:
          machine.state === 'thinking'
            ? [4, -2, 4]
            : machine.state === 'hoverMap'
              ? (effectivePose === 'point' ? [-5, -2.5, -5] : [3, 5, 3])
              : machine.state === 'aware'
                ? [-2.4, 2.4, -2.4]
                : effectivePose === 'guard'
                  ? [-1.2, 1.2, -1.2]
                  : mood === 'worried'
                    ? [-1.8, 1.8, -1.8]
                    : [0, 1, 0],
        x:
          machine.state === 'hoverMap'
            ? (effectivePose === 'point' ? [-1.6, -2.8, -1.6] : [1.2, 2.4, 1.2])
            : machine.state === 'aware'
              ? [0, -1.1, 0]
              : [0, 0, 0],
        y: machine.state === 'happy' ? [0, -1.8, 0] : [0, -0.8, 0],
        scale: machine.state === 'aware' ? [1, 1.025, 1] : [1, 1.012, 1],
        duration: isFast ? 1.9 : 2.7,
      },
      tail: {
        rotate: mood === 'worried' ? [-6, 10, -6] : [-5, 11, -5],
        x: [0, 1.2, 0],
        duration: 3.8,
      },
      tuft: {
        rotate: [-5, 5, -5],
        y: [0, -1.2, 0],
        duration: 2.8,
      },
      leftArm:
        effectivePose === 'point'
          ? { rotate: -42, x: -3, y: -4, duration: 0.42 }
          : effectivePose === 'plant'
            ? { rotate: 22, x: 1, y: 1.5, duration: 0.42 }
            : { rotate: [-9, 6, -9], x: [0, 1.2, 0], y: [0, -0.8, 0], duration: 2.6 },
      rightArm:
        effectivePose === 'wave'
          ? { rotate: [20, -8, 20], x: [0, -1.2, 0], y: [0, -2.2, 0], duration: 2.1 }
          : effectivePose === 'water'
            ? { rotate: [12, 22, 12], x: [0, 0.8, 0], y: [0, 1.2, 0], duration: 2.2 }
            : { rotate: [8, -5, 8], x: [0, -1.2, 0], y: [0, -0.8, 0], duration: 2.6 },
    };
  }, [effectivePose, isFast, machine.funUntil, machine.state, mood, selfHover]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex items-end justify-end"
    >
      <div
        ref={rootRef}
        className={`w-full ${mode === 'compact' ? 'max-w-[360px]' : 'max-w-[430px]'} rounded-3xl border border-emerald-200/80 bg-white/80 backdrop-blur-md shadow-[0_18px_50px_rgba(16,185,129,0.12)] p-5 relative overflow-visible translate-y-3`}
      >
        <motion.div
          aria-hidden
          className="absolute -top-12 -left-10 w-56 h-56 rounded-full blur-2xl opacity-70"
          animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-16 -right-10 w-64 h-64 rounded-full blur-2xl opacity-70"
          animate={{ x: [0, -14, 0], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
        />

        <div className={`relative z-10 flex items-center gap-4 ${mode === 'compact' ? 'py-1' : ''}`}>
          <div className={`relative shrink-0 ${mode === 'compact' ? 'w-[96px]' : 'w-[132px]'}`}>
            <AnimatePresence mode="wait">
              {showBubble && (
                <motion.div
                  key={`${machine.state}-${machine.dialogNonce}`}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    x:
                      machine.state === 'hoverMap'
                        ? -48
                        : machine.state === 'thinking'
                          ? -38
                          : machine.state === 'worried'
                            ? -44
                            : machine.state === 'aware'
                              ? -26
                              : -18,
                  }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 22, mass: 0.9 }}
                  className="pointer-events-none absolute right-0 -top-1 z-40"
                >
                  <div className={`relative ${mode === 'compact' ? 'max-w-[172px]' : 'max-w-[200px]'}`}>
                    <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-200/70 shadow-xl px-3 py-2">
                      <div className="flex items-start gap-2">
                        <motion.div
                          animate={{ y: [0, -2, 0], rotate: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                          className={`mt-[1px] ${mood === 'worried' ? 'text-red-600' : mood === 'happy' ? 'text-emerald-700' : 'text-sky-700'}`}
                        >
                          {mood === 'worried' ? <Zap size={14} /> : mood === 'happy' ? <ThumbsUp size={14} /> : <MapPin size={14} />}
                        </motion.div>
                        <div className="min-w-0">
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-700/70 leading-none">{dialog.hint}</div>
                          <div className="mt-1 text-[10px] font-black text-slate-900 leading-snug">{typedText}</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 rotate-45 bg-white/90 border-r border-b border-emerald-200/70" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onMouseEnter={() => setSelfHover(true)}
              onMouseLeave={() => setSelfHover(false)}
              onClick={() => {
                send({ type: 'CHAR_CLICK', now: Date.now() });
                setActionFxKind('spark');
                setActionFxId(Date.now());
                setBurstKey(k => k + 1);
              }}
              className={`relative w-full ${mode === 'compact' ? 'h-[112px]' : 'h-[164px]'} rounded-[2.2rem] shadow-xl border border-white/70 bg-white/70 backdrop-blur-md overflow-hidden text-left`}
              style={{
                backgroundImage: `radial-gradient(circle at 30% 18%, ${accent.glow} 0 70px, rgba(255,255,255,0.9) 120px)`,
              }}
              animate={{ rotate: motionProfile.card.rotate, y: motionProfile.card.y, x: motionProfile.card.x, scale: motionProfile.card.scale }}
              transition={{ repeat: Infinity, duration: motionProfile.card.duration, ease: 'easeInOut' }}
              whileHover={{ y: -2.2 }}
              whileTap={{ scale: 0.98, y: 1 }}
              style={{ willChange: 'transform' }}
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 opacity-80"
                animate={{ y: [0, -2, 0], scale: [1, 1.01, 1] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 15%, rgba(255,255,255,0.65) 0 30px, transparent 78px), radial-gradient(circle at 78% 22%, rgba(59,130,246,0.10) 0 42px, transparent 110px)',
                }}
              />

              <motion.div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 bottom-3 w-16 h-5 rounded-full blur-[0.2px]"
                style={{ backgroundColor: 'rgba(0,0,0,0.10)' }}
                animate={{ scale: [1, 0.92, 1] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              />

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-6"
                animate={{ y: motionProfile.body.y, x: motionProfile.body.x }}
                transition={{ repeat: Infinity, duration: motionProfile.body.duration, ease: 'easeInOut' }}
                style={{ willChange: 'transform' }}
              >
                <div className="relative w-[86px] h-[128px]">
                  <div className="absolute inset-0 transition-opacity" style={{ opacity: avatarSrc ? 0 : 1 }}>
                  <motion.div
                    ref={headRef}
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-[64px] h-[64px] rounded-full border-2 border-[#4a2c19] shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
                    animate={{ rotate: motionProfile.head.rotate, x: motionProfile.head.x, y: motionProfile.head.y, scale: motionProfile.head.scale }}
                    transition={{ repeat: Infinity, duration: motionProfile.head.duration, ease: 'easeInOut' }}
                    style={{
                      backgroundColor: accent.core,
                      backgroundImage: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
                      willChange: 'transform',
                    }}
                  >
                    {/* Monkey Ears - Enhanced with depth */}
                    <div className="absolute -left-4 top-4 w-7 h-7 rounded-full border-2 border-[#4a2c19] shadow-md" style={{ backgroundColor: accent.core }}>
                      <div className="absolute inset-1.5 rounded-full bg-[#f3d5b5]" style={{ backgroundColor: accent.face, opacity: 0.6 }} />
                    </div>
                    <div className="absolute -right-4 top-4 w-7 h-7 rounded-full border-2 border-[#4a2c19] shadow-md" style={{ backgroundColor: accent.core }}>
                      <div className="absolute inset-1.5 rounded-full bg-[#f3d5b5]" style={{ backgroundColor: accent.face, opacity: 0.6 }} />
                    </div>

                    {/* Monkey Face Patch - More detailed heart/round shape */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[52px] h-[44px] rounded-[1.5rem] bg-[#f3d5b5] shadow-inner" style={{ backgroundColor: accent.face }}>
                      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 20%, white 0%, transparent 80%)' }} />
                      
                      {/* Detailed Eyes Area */}
                      <div className="absolute left-[8px] top-[10px] w-[16px] h-[16px] rounded-full bg-white shadow-sm" />
                      <div className="absolute right-[8px] top-[10px] w-[16px] h-[16px] rounded-full bg-white shadow-sm" />
                    </div>

                    {/* Interactive Eyes */}
                    <motion.div
                      className="absolute left-[16px] top-[22px] w-[10px] h-[12px] rounded-full bg-slate-900 overflow-hidden z-10"
                      animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                      transition={{ repeat: Infinity, duration: 3.8, times: [0, 0.4, 0.45, 0.5, 1] }}
                    >
                      <motion.div
                        className="absolute left-1/2 top-1/2 w-[4px] h-[4px] rounded-full bg-white -translate-x-1 -translate-y-1"
                        style={{ x: pupilXS, y: pupilYS }}
                      />
                    </motion.div>
                    <motion.div
                      className="absolute right-[16px] top-[22px] w-[10px] h-[12px] rounded-full bg-slate-900 overflow-hidden z-10"
                      animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                      transition={{ repeat: Infinity, duration: 3.8, times: [0, 0.4, 0.45, 0.5, 1] }}
                    >
                      <motion.div
                        className="absolute left-1/2 top-1/2 w-[4px] h-[4px] rounded-full bg-white -translate-x-1 -translate-y-1"
                        style={{ x: pupilXS, y: pupilYS }}
                      />
                    </motion.div>
                    
                    {/* Expressive Mouth Area */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[36px] w-5 h-4 z-10">
                      {/* Monkey Nose */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2.5 h-1.5 bg-[#4a2c19]/50 rounded-full" />
                      
                      {/* Mouth Shapes */}
                      {mood === 'worried' ? (
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 top-[6px] w-[16px] h-[8px] rounded-t-full border-t-2 border-slate-900/70"
                          animate={{ y: [0, 1, 0] }}
                        />
                      ) : mood === 'happy' ? (
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 top-[4px] w-[18px] h-[10px] rounded-b-full border-b-2 border-slate-900/70"
                          animate={{ scaleX: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      ) : (
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2 top-[8px] w-[12px] h-[1px] bg-slate-900/40"
                        />
                      )}
                    </div>

                    {/* Rosy Cheeks for Interactivity */}
                    <motion.div 
                      className="absolute left-[10px] top-[34px] w-3 h-2 bg-pink-300/40 rounded-full blur-[1px]"
                      animate={{ opacity: mood === 'happy' ? 1 : 0.4 }}
                    />
                    <motion.div 
                      className="absolute right-[10px] top-[34px] w-3 h-2 bg-pink-300/40 rounded-full blur-[1px]"
                      animate={{ opacity: mood === 'happy' ? 1 : 0.4 }}
                    />
                    
                    {/* Monkey Hair Tuft - More dynamic */}
                    <motion.div
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 -top-2 w-8 h-5"
                      animate={{ rotate: motionProfile.tuft.rotate, y: motionProfile.tuft.y }}
                      transition={{ repeat: Infinity, duration: motionProfile.tuft.duration, ease: 'easeInOut' }}
                    >
                      <div className="w-full h-full bg-[#6b3e23] rounded-full" style={{ backgroundColor: accent.core, clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                    </motion.div>
                  </motion.div>

                  {/* Monkey Body */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[48px] w-[54px] h-[60px] rounded-[1.8rem] border-2 border-[#4a2c19] shadow-[0_14px_28px_rgba(0,0,0,0.15)] bg-[#6b3e23]" style={{ backgroundColor: accent.core }}>
                    <div className="absolute inset-0 rounded-[1.8rem] opacity-75" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%)' }} />
                    {/* Belly Patch */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-8 h-10 rounded-full bg-[#f3d5b5]/30" style={{ backgroundColor: accent.face, opacity: 0.4 }} />
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-10 rounded-[1.4rem] bg-[#f3d5b5] border border-[#4a2c19]/30 shadow-inner flex items-center justify-center text-[#4a2c19]" style={{ backgroundColor: accent.face }}>
                      <Sprout size={18} />
                    </div>
                  </div>

                  {/* Monkey Legs */}
                  <div className="absolute left-[22px] bottom-[12px] w-5 h-8 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: accent.core }} />
                  <div className="absolute right-[22px] bottom-[12px] w-5 h-8 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: accent.core }} />
                  
                  {/* Feet */}
                  <div className="absolute left-[18px] bottom-[8px] w-7 h-4 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: accent.core }} />
                  <div className="absolute right-[18px] bottom-[8px] w-7 h-4 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: accent.core }} />

                  {/* Monkey Tail */}
                  <motion.div
                    className="absolute -left-1 top-[80px] w-12 h-12 pointer-events-none"
                    animate={{ rotate: motionProfile.tail.rotate, x: motionProfile.tail.x }}
                    transition={{ repeat: Infinity, duration: motionProfile.tail.duration, ease: 'easeInOut' }}
                  >
                    <svg viewBox="0 0 50 50" className="w-full h-full opacity-60">
                      <path
                        d="M 25 10 Q 5 15 10 35 Q 15 50 30 40"
                        fill="none"
                        stroke={accent.core}
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>

                  <motion.div
                    aria-hidden
                    className="absolute -left-1 top-[70px] w-[24px] h-[12px] rounded-full border border-[#5d361b]/30 shadow-sm"
                    animate={{ rotate: motionProfile.leftArm.rotate, x: motionProfile.leftArm.x, y: motionProfile.leftArm.y }}
                    transition={{ repeat: Infinity, duration: motionProfile.leftArm.duration, ease: 'easeInOut' }}
                    style={{ backgroundColor: accent.core }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute -right-1 top-[70px] w-[24px] h-[12px] rounded-full border border-[#5d361b]/30 shadow-sm"
                    animate={{ rotate: motionProfile.rightArm.rotate, x: motionProfile.rightArm.x, y: motionProfile.rightArm.y }}
                    transition={{ repeat: Infinity, duration: motionProfile.rightArm.duration, ease: 'easeInOut', delay: 0.05 }}
                    style={{ backgroundColor: accent.core }}
                  />
                  </div>

                  {avatarSrc && (
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 flex items-end justify-center pointer-events-none"
                      initial={false}
                      animate={{ y: machine.state === 'happy' ? [0, -2, 0] : 0, rotate: machine.state === 'worried' ? [-1.2, 1.2, -1.2] : 0 }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                    >
                      <div className="relative w-[86px] h-[128px] rounded-[2rem] overflow-hidden bg-white border border-white/70 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                        <img src={avatarSrc} alt="Maskot" draggable={false} className="w-full h-full object-contain select-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
                      </div>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {effectivePose === 'plant' && (
                      <motion.div
                        key="tool-plant"
                        initial={{ opacity: 0, scale: 0.82, x: 6, y: -2 }}
                        animate={{ opacity: 1, scale: 1, x: 10, y: 0, rotate: [-10, 10, -10] }}
                        exit={{ opacity: 0, scale: 0.82 }}
                        transition={{ rotate: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' } }}
                        className="absolute right-0 top-[68px] text-slate-800"
                      >
                        <Shovel size={18} />
                      </motion.div>
                    )}
                    {effectivePose === 'water' && (
                      <motion.div
                        key="tool-water"
                        initial={{ opacity: 0, scale: 0.86, x: 6, y: 0 }}
                        animate={{ opacity: 1, scale: 1, x: 10, y: 2 }}
                        exit={{ opacity: 0, scale: 0.86 }}
                        className="absolute right-0 top-[68px] text-blue-500"
                      >
                        <Droplets size={18} />
                      </motion.div>
                    )}
                    {effectivePose === 'point' && (
                      <motion.div
                        key="tool-point"
                        initial={{ opacity: 0, scale: 0.86, x: -6, y: 0 }}
                        animate={{ opacity: 1, scale: 1, x: -10, y: -2 }}
                        exit={{ opacity: 0, scale: 0.86 }}
                        className="absolute left-0 top-[68px] text-emerald-700"
                      >
                        <MapPin size={18} />
                      </motion.div>
                    )}
                    {effectivePose === 'guard' && (
                      <motion.div
                        key="tool-guard"
                        initial={{ opacity: 0, scale: 0.86, y: -2 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.86 }}
                        className="absolute left-1/2 -translate-x-1/2 top-[64px] text-emerald-700"
                      >
                        <ShieldCheck size={18} />
                      </motion.div>
                    )}
                    {effectivePose === 'cheer' && (
                      <motion.div
                        key="tool-cheer"
                        initial={{ opacity: 0, scale: 0.86, y: -2 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: [-8, 8, -8] }}
                        exit={{ opacity: 0, scale: 0.86 }}
                        transition={{ rotate: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' } }}
                        className="absolute left-1/2 -translate-x-1/2 top-[64px] text-emerald-600"
                      >
                        <ThumbsUp size={18} />
                      </motion.div>
                    )}
                    {effectivePose === 'worry' && (
                      <motion.div
                        key="tool-worry"
                        initial={{ opacity: 0, scale: 0.86, y: -2 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.86 }}
                        className="absolute left-1/2 -translate-x-1/2 top-[64px] text-red-600"
                      >
                        <Zap size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    <motion.div
                      key={`burst-${burstKey}`}
                      initial={{ opacity: 0, scale: 0.7, y: 6 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.7, 1.12, 0.86], y: [6, -8, -14] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="absolute left-1/2 -translate-x-1/2 top-[56px] text-yellow-400 pointer-events-none"
                    >
                      <Sparkles size={22} />
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence>
                    {actionFxId && actionFxKind === 'thumb' && (
                      <motion.div
                        key={`thumb-${actionFxId}`}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1.12, y: -6 }}
                        exit={{ opacity: 0, scale: 0.9, y: -14 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 top-[56px] text-emerald-600 pointer-events-none drop-shadow"
                      >
                        <ThumbsUp size={22} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-[62px] h-[12px] rounded-full bg-black/10 blur-[0.2px]" />
                </div>
              </motion.div>

              <AnimatePresence>
                {mode !== 'compact' && (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] font-black uppercase tracking-widest text-slate-600"
                    style={{ textShadow: '0 1px 0 rgba(255,255,255,0.6)' }}
                  >
                    Klik untuk tips
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="flex-1 text-left">
            <div className="text-[11px] font-black uppercase tracking-widest text-emerald-700/80">Pemandu Lingkungan</div>
            <div className="mt-1 text-base font-black text-slate-900 leading-tight">{copy.headline}</div>
            <div
              className={`mt-2 text-xs text-slate-600 leading-relaxed ${mode === 'compact' ? 'opacity-90' : ''}`}
              style={mode === 'compact' ? { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : undefined}
            >
              {copy.body}
            </div>

            <div className={`mt-3 flex items-center gap-2 flex-wrap ${mode === 'compact' ? 'hidden' : ''}`}>
              <motion.button
                type="button"
                onClick={() => {
                  send({ type: 'ACTION', now: Date.now(), pose: 'plant' });
                  setActionFxKind('thumb');
                  setActionFxId(Date.now());
                  setBurstKey(k => k + 1);
                }}
                className={`px-2 py-1 rounded-full ${accent.chipBg} ${accent.chipText} text-[10px] font-black uppercase flex items-center gap-1 border border-white/60 shadow-sm active:scale-95 transition-transform`}
                whileHover={{ y: -1 }}
              >
                <Sprout size={12} /> Tanam
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  send({ type: 'ACTION', now: Date.now(), pose: 'water' });
                  setActionFxKind('thumb');
                  setActionFxId(Date.now());
                  setBurstKey(k => k + 1);
                }}
                className="px-2 py-1 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black uppercase flex items-center gap-1 border border-white/60 shadow-sm active:scale-95 transition-transform"
                whileHover={{ y: -1 }}
              >
                <Droplets size={12} /> Rawat
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  send({ type: 'ACTION', now: Date.now(), pose: 'guard' });
                  setActionFxKind('thumb');
                  setActionFxId(Date.now());
                  setBurstKey(k => k + 1);
                }}
                className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-900 text-[10px] font-black uppercase flex items-center gap-1 border border-emerald-200/70 shadow-sm active:scale-95 transition-transform"
                whileHover={{ y: -1 }}
              >
                <ShieldCheck size={12} /> Lindungi
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  send({ type: 'ACTION', now: Date.now(), pose: 'point' });
                  setBurstKey(k => k + 1);
                  onGuide();
                }}
                className="px-2 py-1 rounded-full bg-white text-slate-700 text-[10px] font-black uppercase flex items-center gap-1 border border-slate-200/70 shadow-sm active:scale-95 transition-transform"
                whileHover={{ y: -1 }}
              >
                <MapPin size={12} /> Ajak
              </motion.button>
            </div>

            <div className={`mt-4 flex items-center gap-2 ${mode === 'compact' ? 'mt-3' : ''}`}>
              <button
                type="button"
                onClick={onGuide}
                className="px-4 py-2 rounded-2xl bg-primary text-white text-[11px] font-black uppercase shadow-lg hover:shadow-xl active:scale-95 transition-all inline-flex items-center gap-2"
              >
                Tunjukkan Caranya <MapPin size={14} />
              </button>
              <motion.div
                aria-hidden
                className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2"
                animate={{ x: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Lihat peta di kiri
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

EnvMascotCard.displayName = 'EnvMascotCard';

const RealisticTree = ({ size, color, stage, actionProgress, icon: Icon, health, moisture, yPos, species }: { size: number, color: string, stage: number, actionProgress: number, icon?: React.ElementType, health: number, moisture: number, yPos: number, species: string }) => {
  const health01 = Math.max(0, Math.min(1, health / 100));
  const moisture01 = Math.max(0, Math.min(1, moisture / 100));
  const speciesKind = /pinus/i.test(species) ? 'pinus' : /jati/i.test(species) ? 'jati' : 'mahoni';
  const swayR = (() => {
    const x = Math.sin((yPos * 0.17 + size * 0.031) * 999.123) * 10000;
    return x - Math.floor(x);
  })();
  const swayDuration = 4 + swayR * 2;
  const matureScale = stage === 4 ? 0.9 : stage === 5 ? 1.15 : 1.3;
  const canopyWidth = stage === 4 ? size * 0.9 : stage === 5 ? size * 1.02 : size * 1.14;
  const canopyHeight = stage === 4 ? size * 0.72 : stage === 5 ? size * 0.82 : size * 0.92;
  const trunkWidth = stage === 4 ? size * 0.16 : stage === 5 ? size * 0.19 : size * 0.22;
  const trunkHeight = stage === 4 ? size * 0.36 : stage === 5 ? size * 0.43 : size * 0.5;
  const trunkTone = moisture01 < 0.3 ? '#6b3f24' : health01 < 0.45 ? '#775035' : '#7a4b2f';
  const barkShadow = health01 < 0.4 ? '#3f2617' : '#4a2b1b';
  const crownTop = moisture01 < 0.3 ? '#7fbf3b' : health01 < 0.45 ? '#5f8f34' : '#9ad758';
  const crownMid = moisture01 < 0.3 ? '#4f7f2f' : health01 < 0.45 ? '#43712c' : color;
  const crownDeep = health01 < 0.35 ? '#355724' : '#214b2e';
  const accentLeaf = speciesKind === 'pinus' ? '#86efac' : speciesKind === 'jati' ? '#fde68a' : '#bbf7d0';
  return (
    <motion.div 
      className="relative flex flex-col items-center justify-end" 
      style={{ width: size, height: size, zIndex: Math.floor(yPos) }}
      animate={{ 
        rotate: stage >= 4 ? [-0.8, 0.8, -0.8] : [0, 0, 0],
        skewX: stage >= 4 ? [-0.4, 0.4, -0.4] : [0, 0, 0]
      }}
      transition={{ 
        duration: swayDuration,
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* Shadow for Depth */}
      <div 
        className="absolute bottom-[-5px] w-[80%] h-[15%] bg-black/20 rounded-[100%] blur-md" 
        style={{ transform: 'scale(' + (0.5 + stage * 0.1) + ')' }}
      />

      {/* Hole / Soil Base - Enhanced with texture */}
      <motion.div 
        initial={false} 
        animate={{ 
          scale: stage >= 0 ? 1 : 0,
          backgroundColor: stage >= 4 ? '#2b1a16' : stage >= 1 ? '#3e2723' : '#5d4037',
          height: stage >= 1 ? '22%' : '15%',
        }}
        className="absolute bottom-0 w-[90%] rounded-[100%] blur-[0.4px] shadow-2xl z-0"
      >
        <div
          className="absolute inset-0 rounded-[100%]"
          style={{
            opacity: 0.85,
            backgroundImage:
              moisture01 < 0.28
                ? 'repeating-linear-gradient(135deg, rgba(0,0,0,0.25) 0 2px, rgba(0,0,0,0) 2px 10px), radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0 20px, transparent 40px)'
                : moisture01 > 0.78
                  ? 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.2) 0 28px, transparent 55px), radial-gradient(circle at 65% 55%, rgba(59,130,246,0.15) 0 25px, transparent 50px)'
                  : 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.12) 0 24px, transparent 48px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(35deg, rgba(255,255,255,0.05) 0 2px, rgba(0,0,0,0) 2px 12px), repeating-linear-gradient(135deg, rgba(0,0,0,0.14) 0 1px, rgba(0,0,0,0) 1px 10px), radial-gradient(circle at 40% 55%, rgba(0,0,0,0.20) 0 26px, transparent 62px)',
            mixBlendMode: 'overlay',
          }}
        />
        
        <motion.div
          initial={false}
          animate={{
            opacity: stage >= 1 ? 1 : 0,
            scale: stage >= 1 ? 1 : 0.9,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[62%] rounded-[100%]"
          style={{
            backgroundImage: [
              'radial-gradient(circle at 50% 40%, rgba(0,0,0,0.6) 0 28%, rgba(0,0,0,0.9) 65%, rgba(0,0,0,0.95) 100%)',
              'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12) 0 14%, transparent 38%)',
            ].join(','),
            boxShadow: 'inset 0 16px 32px rgba(0,0,0,0.6), inset 0 -8px 12px rgba(255,255,255,0.08), 0 12px 24px rgba(0,0,0,0.3)',
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
              <div className="scale-[0.9] origin-bottom">
                <SeedlingIcon type={species} active={false} />
              </div>
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
            {speciesKind === 'pinus' ? (
              <div className="relative flex flex-col items-center">
                <div
                  className="w-2 h-9 rounded-full shadow-sm"
                  style={{
                    backgroundColor: moisture01 < 0.25 ? '#7f1d1d' : '#7c9f42',
                    filter: `saturate(${0.7 + health01 * 0.6}) brightness(${0.85 + moisture01 * 0.25})`,
                  }}
                />
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? [-6, 5, -6] : [6, -5, 6] }}
                    transition={{ repeat: Infinity, duration: 1.9 + i * 0.2, delay: i * 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      top: 3 + i * 7,
                      width: 12 + i * 4,
                      height: 8 + i * 2,
                      background: `linear-gradient(180deg, ${accentLeaf}, ${crownMid})`,
                      clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.16))',
                    }}
                  />
                ))}
              </div>
            ) : (
              <>
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
                  className={`absolute ${speciesKind === 'jati' ? '-left-4 top-1 w-6 h-4' : '-left-3 top-0 w-5 h-4'} rounded-full rotate-[-45deg] border-b-2 border-black/10`}
                  style={{
                    background: speciesKind === 'jati'
                      ? `radial-gradient(circle at 38% 32%, ${accentLeaf} 0 22%, #d97706 48%, ${crownMid} 100%)`
                      : '#8bc34a',
                  }}
                />
                <motion.div 
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className={`absolute ${speciesKind === 'jati' ? '-right-4 top-2 w-5 h-3.5' : '-right-3 top-1 w-4 h-3'} rounded-full rotate-[45deg] border-b-2 border-black/10`}
                  style={{
                    background: speciesKind === 'jati'
                      ? `radial-gradient(circle at 38% 32%, #fef08a 0 22%, #ca8a04 48%, ${crownMid} 100%)`
                      : '#8bc34a',
                  }}
                />
                {speciesKind === 'mahoni' && (
                  <motion.div
                    animate={{ scale: [0.95, 1.05, 0.95], y: [0, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="absolute left-1/2 -translate-x-1/2 -top-1 w-5 h-5 rounded-full border border-black/10"
                    style={{ background: `radial-gradient(circle at 35% 30%, ${accentLeaf} 0 26%, ${crownMid} 55%, ${crownDeep} 100%)` }}
                  />
                )}
              </>
            )}
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="tree"
            initial={{ scale: 0.5, y: 20, opacity: 0 }}
            animate={{ 
              scale: matureScale, 
              y: 0, 
              opacity: 1,
            }}
            transition={{ 
              scale: { type: 'spring', damping: 15 }
            }}
            className="relative z-10 mb-2"
            style={{
              filter: `saturate(${0.65 + health01 * 0.75}) brightness(${0.85 + moisture01 * 0.25})`,
              opacity: 0.75 + health01 * 0.25,
            }}
          >
            <div className="relative mx-auto" style={{ width: canopyWidth * 1.1, height: canopyHeight + trunkHeight + size * 0.08 }}>
              {speciesKind === 'pinus' ? (
                <>
                  {[0, 1, 2, 3].map((layer) => (
                    <motion.div
                      key={layer}
                      className="absolute left-1/2 -translate-x-1/2"
                      animate={{ y: [0, -2, 0], rotate: [-1.2 + layer * 0.12, 1.2 - layer * 0.12, -1.2 + layer * 0.12] }}
                      transition={{ repeat: Infinity, duration: 4.4 + layer * 0.3, ease: 'easeInOut' }}
                      style={{
                        top: size * (0.02 + layer * 0.08),
                        width: canopyWidth * (0.88 - layer * 0.12),
                        height: canopyHeight * (0.44 - layer * 0.04),
                        background: `linear-gradient(180deg, ${accentLeaf} 0%, ${crownTop} 12%, ${crownMid} 56%, ${crownDeep} 100%)`,
                        clipPath: 'polygon(50% 0%, 96% 92%, 72% 92%, 84% 100%, 16% 100%, 28% 92%, 4% 92%)',
                        boxShadow: '0 14px 26px rgba(0,0,0,0.18), inset 0 -12px 18px rgba(10,24,12,0.18)',
                      }}
                    />
                  ))}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                      top: size * 0.02,
                      width: canopyWidth * 0.86,
                      height: canopyHeight * 0.72,
                      backgroundImage:
                        'repeating-linear-gradient(180deg, rgba(255,255,255,0.09) 0 3px, transparent 3px 10px), repeating-linear-gradient(122deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 9px)',
                      clipPath: 'polygon(50% 0%, 95% 90%, 72% 90%, 84% 100%, 16% 100%, 28% 90%, 5% 90%)',
                      opacity: 0.75,
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  {stage >= 6 && [0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 9,
                        height: 16,
                        left: `${34 + i * 10}%`,
                        top: `${34 + (i % 2) * 8}%`,
                        background: 'linear-gradient(180deg, #f59e0b 0%, #92400e 100%)',
                        borderRadius: '45% 45% 55% 55%',
                        boxShadow: '0 6px 10px rgba(0,0,0,0.18)',
                      }}
                    />
                  ))}
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`pinus-branch-${i}`}
                      className="absolute left-1/2 -translate-x-1/2 rounded-full"
                      style={{
                        top: canopyHeight * (0.32 + i * 0.12),
                        width: canopyWidth * (0.28 + i * 0.04),
                        height: Math.max(4, trunkWidth * 0.18),
                        transform: `rotate(${i % 2 === 0 ? -18 : 18}deg)`,
                        background: `linear-gradient(90deg, ${barkShadow}, ${trunkTone})`,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                      }}
                    />
                  ))}
                </>
              ) : (
                <>
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 rounded-[48%]"
                    animate={{ y: [0, -2, 0], rotate: [-1, 1, -1] }}
                    transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                    style={{
                      top: size * 0.04,
                      width: canopyWidth,
                      height: canopyHeight,
                      background:
                        `radial-gradient(circle at 35% 28%, rgba(255,255,255,0.22) 0 14%, rgba(255,255,255,0.04) 30%, transparent 55%),
                         radial-gradient(circle at 70% 78%, rgba(0,0,0,0.12) 0 22%, transparent 56%),
                         linear-gradient(180deg, ${speciesKind === 'jati' ? '#fde68a' : crownTop} 0%, ${crownMid} 52%, ${crownDeep} 100%)`,
                      borderRadius: speciesKind === 'jati' ? '34% 38% 42% 40% / 38% 36% 44% 42%' : '42% 44% 38% 40% / 40% 42% 35% 37%',
                      boxShadow: '0 24px 50px rgba(0,0,0,0.28), inset 0 -16px 22px rgba(12,28,16,0.22), inset 0 10px 18px rgba(255,255,255,0.05)',
                    }}
                  />
                  {[
                    { left: '12%', top: '18%', w: 0.34, h: 0.28, delay: 0 },
                    { left: '54%', top: '14%', w: 0.32, h: 0.26, delay: 0.35 },
                    { left: '2%', top: '34%', w: 0.3, h: 0.24, delay: 0.18 },
                    { left: '66%', top: '36%', w: 0.28, h: 0.24, delay: 0.52 },
                    { left: '32%', top: '0%', w: 0.36, h: 0.28, delay: 0.24 },
                  ].map((cluster, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute rounded-[48%]"
                      animate={{ y: [0, -2.5, 0], rotate: [-1.2, 1.2, -1.2] }}
                      transition={{ repeat: Infinity, duration: 4.8 + idx * 0.35, delay: cluster.delay, ease: 'easeInOut' }}
                      style={{
                        left: cluster.left,
                        top: cluster.top,
                        width: canopyWidth * cluster.w,
                        height: canopyHeight * cluster.h,
                        background:
                          `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.18) 0 16%, rgba(255,255,255,0.03) 36%, transparent 54%),
                           linear-gradient(180deg, ${speciesKind === 'jati' ? '#fef08a' : crownTop} 0%, ${crownMid} 58%, ${crownDeep} 100%)`,
                        borderRadius: speciesKind === 'jati' ? '38% 44% 36% 46% / 42% 38% 45% 40%' : undefined,
                        boxShadow: 'inset 0 -10px 16px rgba(12,28,16,0.18), 0 10px 18px rgba(0,0,0,0.12)',
                      }}
                    />
                  ))}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                      top: size * 0.04,
                      width: canopyWidth,
                      height: canopyHeight,
                      backgroundImage:
                        speciesKind === 'jati'
                          ? 'repeating-radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10) 0 2px, transparent 2px 14px), repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 10px)'
                          : 'radial-gradient(circle at 18% 28%, rgba(255,255,255,0.09) 0 2px, transparent 3px), radial-gradient(circle at 64% 22%, rgba(255,255,255,0.08) 0 2px, transparent 3px), radial-gradient(circle at 72% 56%, rgba(0,0,0,0.08) 0 2px, transparent 3px), radial-gradient(circle at 38% 64%, rgba(0,0,0,0.07) 0 2px, transparent 3px)',
                      backgroundSize: speciesKind === 'jati' ? '18px 18px, 18px 18px' : '24px 24px, 28px 28px, 20px 20px, 22px 22px',
                      backgroundPosition: '0 0, 10px 8px, 4px 12px, 14px 16px',
                      borderRadius: speciesKind === 'jati' ? '34% 38% 42% 40% / 38% 36% 44% 42%' : '42% 44% 38% 40% / 40% 42% 35% 37%',
                      mixBlendMode: 'soft-light',
                      opacity: 0.9,
                    }}
                  />
                  <div
                    className="absolute rounded-full origin-bottom-left"
                    style={{
                      left: `calc(50% - ${trunkWidth * 0.1}px)`,
                      top: canopyHeight * 0.6,
                      width: canopyWidth * 0.22,
                      height: Math.max(5, trunkWidth * 0.24),
                      transform: 'rotate(-24deg)',
                      background: `linear-gradient(90deg, ${barkShadow}, ${trunkTone})`,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                    }}
                  />
                  <div
                    className="absolute rounded-full origin-bottom-right"
                    style={{
                      right: `calc(50% - ${trunkWidth * 0.06}px)`,
                      top: canopyHeight * 0.55,
                      width: canopyWidth * 0.2,
                      height: Math.max(5, trunkWidth * 0.22),
                      transform: 'rotate(28deg)',
                      background: `linear-gradient(90deg, ${trunkTone}, ${barkShadow})`,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                    }}
                  />
                </>
              )}

              {/* Trunk with bark texture */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-t-[45%] rounded-b-[30%] overflow-hidden"
                style={{
                  bottom: size * 0.05,
                  width: speciesKind === 'pinus' ? trunkWidth * 0.82 : speciesKind === 'jati' ? trunkWidth * 1.1 : trunkWidth,
                  height: speciesKind === 'pinus' ? trunkHeight * 1.12 : speciesKind === 'jati' ? trunkHeight * 0.96 : trunkHeight,
                  background:
                    `linear-gradient(90deg, ${barkShadow} 0%, ${trunkTone} 18%, #9c6b44 32%, ${trunkTone} 48%, ${barkShadow} 100%)`,
                  boxShadow: '0 10px 24px rgba(0,0,0,0.24)',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0 5px, rgba(0,0,0,0.06) 5px 10px), repeating-linear-gradient(95deg, transparent 0 7px, rgba(0,0,0,0.08) 7px 9px)',
                    mixBlendMode: 'overlay',
                    opacity: 0.85,
                  }}
                />
                <div className="absolute left-[26%] top-[10%] bottom-[10%] w-[10%] rounded-full bg-white/10 blur-[1px]" />
                <div className="absolute right-[20%] top-[16%] bottom-[14%] w-[12%] rounded-full bg-black/15 blur-[1px]" />
                <div className="absolute left-1/2 top-[34%] -translate-x-1/2 w-[34%] h-[12%] rounded-full bg-black/20" />
              </div>

              {/* Root flare */}
              <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: size * 0.04, width: trunkWidth * 1.8, height: trunkWidth * 0.6 }}>
                <div className="absolute left-[8%] bottom-0 w-[30%] h-[55%] rounded-full rotate-[18deg]" style={{ background: `linear-gradient(90deg, ${barkShadow}, ${trunkTone})` }} />
                <div className="absolute left-[34%] bottom-0 w-[32%] h-[58%] rounded-full" style={{ background: `linear-gradient(90deg, ${barkShadow}, ${trunkTone})` }} />
                <div className="absolute right-[8%] bottom-0 w-[28%] h-[52%] rounded-full -rotate-[18deg]" style={{ background: `linear-gradient(90deg, ${trunkTone}, ${barkShadow})` }} />
              </div>

              {/* Fruit / flower accents for mature tree */}
              {stage >= 6 && (
                <div className="absolute inset-0">
                  {speciesKind === 'pinus'
                    ? [...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.06 * i }}
                          className="absolute shadow-md"
                          style={{
                            width: 10,
                            height: 18,
                            background: 'linear-gradient(180deg, #f59e0b 0%, #78350f 100%)',
                            left: `${34 + (i * 10) % 32}%`,
                            top: `${28 + (i * 11) % 26}%`,
                            borderRadius: '45% 45% 55% 55%',
                          }}
                        />
                      ))
                    : [...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.04 * i }}
                          className="absolute rounded-full shadow-md"
                          style={{
                            width: i % 3 === 0 ? 10 : 8,
                            height: i % 3 === 0 ? 10 : 8,
                            background: speciesKind === 'jati'
                              ? 'radial-gradient(circle at 35% 35%, #fde68a 0 24%, #f59e0b 42%, #b45309 100%)'
                              : i % 2 === 0
                                ? 'radial-gradient(circle at 35% 35%, #fde68a 0 24%, #fb923c 42%, #c2410c 100%)'
                                : 'radial-gradient(circle at 35% 35%, #fef08a 0 22%, #facc15 42%, #ca8a04 100%)',
                            left: `${14 + (i * 9) % 68}%`,
                            top: `${14 + (i * 13) % 44}%`,
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
    </motion.div>
  );
};

const AmbientDust = memo(({ count }: { count: number }) => {
  const specs = useMemo(() => {
    return Array.from({ length: Math.max(0, Math.min(80, count)) }, (_, i) => {
      const r = (n: number) => prand(i * 71.13 + n * 19.77);
      const x0 = r(1) * 3000;
      const y0 = r(2) * 3000;
      const x1 = r(3) * 3000;
      const y1 = r(4) * 3000;
      const x2 = r(5) * 3000;
      const y2 = r(6) * 3000;
      const duration = 11 + r(7) * 19;
      const delay = r(8) * 9;
      const size = 1 + r(9) * 1.6;
      const blur = 0.6 + r(10) * 1.2;
      const opacity = 0.16 + r(11) * 0.22;
      return { x0, y0, x1, y1, x2, y2, duration, delay, size, blur, opacity };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[65] overflow-hidden">
      {specs.map((s, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full"
          initial={{ x: s.x0, y: s.y0, opacity: 0, scale: 0 }}
          animate={{ x: [s.x0, s.x1, s.x2], y: [s.y0, s.y1, s.y2], opacity: [0, s.opacity, 0], scale: [0, 1.35, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'linear', delay: s.delay }}
          style={{
            width: s.size,
            height: s.size,
            background: 'rgba(255,255,255,0.65)',
            filter: `blur(${s.blur}px)`,
            mixBlendMode: 'overlay',
          }}
        />
      ))}
    </div>
  );
});

const prand = (n: number) => {
  const x = Math.sin(n * 999.123) * 10000;
  return x - Math.floor(x);
};

const EnvironmentFX = ({ weather }: { weather: 'sunny' | 'rainy' | 'drought' | 'polluted' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 20% 15%, rgba(255,255,255,0.22) 0 80px, transparent 260px)',
            'radial-gradient(circle at 70% 35%, rgba(0,0,0,0.35) 0 120px, transparent 320px)',
            'radial-gradient(circle at 30% 70%, rgba(0,0,0,0.28) 0 160px, transparent 380px)',
            'repeating-linear-gradient(35deg, rgba(255,255,255,0.05) 0 2px, rgba(255,255,255,0) 2px 18px)',
          ].join(','),
        }}
      />

      {weather === 'sunny' && (
        <motion.div
          className="absolute inset-0 opacity-[0.18] mix-blend-screen"
          animate={{ x: [-120, 120, -120], opacity: [0.12, 0.22, 0.12] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
          style={{
            backgroundImage: [
              'radial-gradient(circle at 80% 10%, rgba(255,217,102,0.35) 0 120px, transparent 520px)',
              'linear-gradient(115deg, transparent 0 35%, rgba(255,255,255,0.12) 45%, transparent 60%)',
              'linear-gradient(115deg, transparent 0 55%, rgba(255,255,255,0.10) 62%, transparent 78%)',
            ].join(','),
            filter: 'blur(0.6px)',
          }}
        />
      )}

      {weather === 'drought' && (
        <>
          <motion.div
            className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
            animate={{ backgroundPositionX: ['0%', '120%', '0%'], backgroundPositionY: ['0%', '60%', '0%'] }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            style={{
              backgroundImage: [
                'repeating-linear-gradient(145deg, rgba(255,255,255,0.08) 0 1px, rgba(0,0,0,0) 1px 22px)',
                'radial-gradient(circle at 45% 35%, rgba(255,165,0,0.10) 0 240px, transparent 560px)',
                'radial-gradient(circle at 70% 60%, rgba(0,0,0,0.45) 0 280px, transparent 700px)',
              ].join(','),
              backgroundSize: '260px 260px, 100% 100%, 100% 100%',
              filter: 'blur(1.6px) saturate(1.05)',
            }}
          />
          <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 6px)' }} />
          <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 10px)' }} />
          <div className="absolute inset-0 opacity-[0.22] mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle at 50% 55%, rgba(0,0,0,0.45) 0 420px, transparent 980px)' }} />
          <div className="absolute inset-0 opacity-[0.13] mix-blend-overlay" style={{ backgroundImage: 'repeating-radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0 1px, transparent 1px 18px)' }} />
          <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay" style={{ backgroundImage: 'repeating-radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0 1px, transparent 1px 22px)' }} />
          <div className="absolute inset-0">
            {[...Array(18)].map((_, i) => {
              const x = prand(i + 31) * 3000;
              const y = prand(i + 91) * 3000;
              const s = 0.8 + prand(i + 141) * 1.6;
              return (
                <motion.div
                  key={`dust-${i}`}
                  className="absolute rounded-full bg-orange-200/10 blur-2xl"
                  style={{ left: x, top: y, width: 220 * s, height: 140 * s, transform: 'translate(-50%, -50%)' }}
                  animate={{ x: [0, 120 + prand(i + 7) * 220, 0], y: [0, -60 - prand(i + 17) * 120, 0], opacity: [0.06, 0.18, 0.06] }}
                  transition={{ repeat: Infinity, duration: 10 + prand(i + 3) * 8, ease: 'easeInOut', delay: prand(i + 13) * 3 }}
                />
              );
            })}
          </div>
        </>
      )}

      {weather === 'rainy' && (
        <>
          <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.18) 0 260px, transparent 760px)' }} />
          <div className="absolute inset-0 opacity-[0.28]">
            {[...Array(120)].map((_, i) => {
              const x = prand(i + 211) * 3000;
              const d = 0.22 + prand(i + 311) * 0.22;
              const h = 26 + prand(i + 411) * 64;
              const a = 0.25 + prand(i + 511) * 0.45;
              const skew = 10 + prand(i + 611) * 10;
              return (
                <motion.div
                  key={`rain-${i}`}
                  className="absolute bg-blue-200"
                  style={{ left: x, top: -180, width: 1, height: h, opacity: a, transform: `skewX(${-skew}deg)` }}
                  animate={{ y: [0, 3400] }}
                  transition={{ repeat: Infinity, duration: d, ease: 'linear', delay: prand(i + 711) * 0.5 }}
                />
              );
            })}
          </div>
        </>
      )}

      {weather === 'polluted' && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`smog-${i}`}
              className="absolute inset-[-10%] bg-slate-900/40"
              animate={{ x: [-120 - i * 40, 120 + i * 40, -120 - i * 40], opacity: [0.28, 0.52, 0.28] }}
              transition={{ repeat: Infinity, duration: 14 + i * 5, ease: 'easeInOut' }}
              style={{ filter: `blur(${10 + i * 8}px)` }}
            />
          ))}
          <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 14px)' }} />
        </>
      )}
    </div>
  );
};

const PlantSpotMarker = ({ x, y, tone }: { x: number; y: number; tone: 'tutorial' | 'plantable' }) => {
  const c = tone === 'tutorial' ? '#fbbf24' : '#34d399';
  return (
    <motion.div className="absolute z-20 pointer-events-none" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
      <motion.div
        className="absolute -top-20 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -10, 0], opacity: [0.75, 1, 0.75] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      >
        <div className="w-10 h-10 rounded-2xl bg-white/90 border border-black/10 shadow-2xl flex items-center justify-center">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c}22`, color: c }}>
            <MapPin size={18} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-44 h-44 rounded-full"
        style={{
          boxShadow: `0 0 50px ${tone === 'tutorial' ? 'rgba(251,191,36,0.18)' : 'rgba(52,211,153,0.18)'}`,
          border: `3px solid ${tone === 'tutorial' ? 'rgba(251,191,36,0.35)' : 'rgba(52,211,153,0.35)'}`,
        }}
        animate={{ scale: [0.98, 1.06, 0.98], opacity: [0.55, 0.95, 0.55] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${c}22 0 45px, transparent 120px)` }}
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{ width: 12, height: 12, backgroundColor: c, transform: 'translate(-50%, -50%)', filter: 'blur(0.2px)' }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

const CharacterActionFX = ({ actionId, accent, toolIcon: ToolIcon }: { actionId: string | null, accent: string, toolIcon?: React.ElementType }) => {
  if (!actionId) return null;

  const isSoil = actionId === 'hole' || actionId === 'cover';
  const isFertilizer = actionId === 'fertilizer';
  const isPlant = actionId === 'plant';
  const isWater = actionId === 'water';
  const isSun = actionId === 'sun';
  const isClean = actionId === 'clean';
  const isPest = actionId === 'pest';

  return (
    <div className="absolute inset-0 pointer-events-none">
      {(isSoil || isFertilizer) && (
        <div className="absolute left-6 top-10">
          {[...Array(isFertilizer ? 14 : 10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: isFertilizer ? [0.45, 0.95, 0.55] : [0.6, 1, 0.7],
                x: isFertilizer ? [-2 + (i % 4) * 5, -16 + (i % 4) * 10] : [-4 + (i % 5) * 3, -12 + (i % 5) * 6],
                y: isFertilizer ? [0, -10 - (i % 5) * 4, -2] : [0, -16 - (i % 4) * 6],
                rotate: isFertilizer ? [-40, 20, -12] : 0,
              }}
              transition={{ duration: (isFertilizer ? 0.68 : 0.55) + (i % 4) * 0.05, delay: 0.02 * i }}
              className="absolute rounded-full"
              style={{
                width: isFertilizer ? 2 + (i % 2) : 5 + (i % 3),
                height: isFertilizer ? 2 + (i % 2) : 5 + (i % 3),
                backgroundColor: isFertilizer ? (i % 3 === 0 ? '#84cc16' : i % 3 === 1 ? '#65a30d' : '#111827') : '#5d4037',
                filter: 'blur(0.2px)',
              }}
            />
          ))}
        </div>
      )}

      {isPlant && (
        <div className="absolute left-5 top-2">
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.88 }}
            animate={{ opacity: 1, y: [-8, 2, 6, 3], scale: [0.9, 1.02, 0.94, 0.98], rotate: [0, -6, 4, 0] }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="relative"
            style={{ color: accent }}
          >
            {ToolIcon ? <ToolIcon size={18} /> : <Sprout size={18} />}
          </motion.div>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-emerald-300/80"
              initial={{ opacity: 0, x: 10, y: 18, scale: 0.6 }}
              animate={{ opacity: [0, 0.8, 0], x: [10, 4 - i * 3, -2 - i], y: [18, 12 - i * 2, 9 - i], scale: [0.6, 1, 0.7] }}
              transition={{ duration: 0.72, delay: 0.08 * i, repeat: Infinity, repeatDelay: 0.22 }}
              style={{ width: 3 + i, height: 3 + i }}
            />
          ))}
        </div>
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

      {isClean && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute -left-6 -top-10 w-24 h-24 rounded-full"
            animate={{ opacity: [0.18, 0.45, 0.18], scale: [0.9, 1.2, 0.9] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.28) 0 22px, rgba(16,185,129,0.12) 50px, transparent 72px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 2 }}
            animate={{ opacity: 1, scale: [0.9, 1.05, 0.98], y: [2, -2, 1] }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute left-6 top-4 text-emerald-300"
          >
            <ShieldCheck size={22} />
          </motion.div>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.8], x: [-6 + (i % 4) * 6, -10 + (i % 4) * 8], y: [0, -14 - (i % 3) * 8] }}
              transition={{ duration: 0.55 + (i % 3) * 0.05, delay: 0.03 * i }}
              className="absolute left-6 top-10 rounded-full"
              style={{ width: 4 + (i % 3), height: 4 + (i % 3), backgroundColor: '#34d399', filter: 'blur(0.2px)' }}
            />
          ))}
        </div>
      )}

      {isPest && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute -left-8 -top-12 w-28 h-28 rounded-full"
            animate={{ opacity: [0.14, 0.34, 0.14], scale: [0.92, 1.18, 0.92] }}
            transition={{ repeat: Infinity, duration: 0.65, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.22) 0 24px, rgba(249,115,22,0.12) 54px, transparent 78px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: [0.85, 1.05, 0.92], y: [6, -2, 2] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute left-6 top-4 text-red-300"
          >
            <AlertTriangle size={22} />
          </motion.div>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.7, 1, 0.8], x: [-6 + (i % 5) * 4, -14 + (i % 5) * 7], y: [0, -12 - (i % 4) * 7] }}
              transition={{ duration: 0.5 + (i % 4) * 0.05, delay: 0.02 * i }}
              className="absolute left-6 top-10 rounded-full"
              style={{ width: 4 + (i % 3), height: 4 + (i % 3), backgroundColor: i % 2 ? '#ef4444' : '#f97316', filter: 'blur(0.2px)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HeldTool = ({ actionId, accent, icon: Icon, actionProgress }: { actionId: string, accent: string, icon?: React.ElementType, actionProgress?: number }) => {
  const progress = actionProgress ?? 0;
  const [hitTick, setHitTick] = useState(0);
  const hitSegRef = useRef(-1);
  const [plantTick, setPlantTick] = useState(0);
  const plantDoneRef = useRef(false);

  useEffect(() => {
    if (actionId !== 'hole') return;
    const seg = Math.floor(progress / 16);
    if (seg !== hitSegRef.current) {
      hitSegRef.current = seg;
      setHitTick(v => v + 1);
    }
  }, [actionId, progress]);

  useEffect(() => {
    if (actionId !== 'plant') return;
    if (progress >= 88) {
      if (plantDoneRef.current) return;
      plantDoneRef.current = true;
      setPlantTick(v => v + 1);
      return;
    }
    plantDoneRef.current = false;
  }, [actionId, progress]);

  if (actionId === 'hole') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -16 }}
        animate={{ opacity: 1, scale: [0.99, 1.01, 1], rotate: [-26, 6, -18], y: [0, 4, 1], x: [0, -1, 0] }}
        transition={{ repeat: Infinity, duration: 0.48, ease: 'easeInOut' }}
        className="relative w-8 h-8"
      >
        <div className="absolute left-3 top-1 w-1.5 h-8 bg-[#8b5a2b] rounded-full shadow-md rotate-[22deg] origin-top" />
        <div className="absolute left-0 top-6 w-4 h-3 bg-[#9ca3af] rounded-sm shadow-md rotate-[22deg] border border-black/10" />
        <div className="absolute left-1 top-7 w-3 h-1 bg-black/10 rounded-full rotate-[22deg]" />
        <AnimatePresence>
          {hitTick > 0 && (
            <motion.div
              key={hitTick}
              initial={{ opacity: 0, scale: 0.7, x: 10, y: 18 }}
              animate={{ opacity: 1, scale: 1, x: 10, y: 18 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              className="absolute left-0 top-0"
            >
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.7, 1, 0.9],
                    x: [-4 + (i % 4) * 3, -10 + (i % 4) * 6],
                    y: [0, -10 - (i % 3) * 7],
                    rotate: [-10, 20, -10],
                  }}
                  transition={{ duration: 0.42 + (i % 3) * 0.04, delay: 0.015 * i }}
                  className="absolute rounded-full"
                  style={{ width: 4 + (i % 3), height: 4 + (i % 3), backgroundColor: '#5d4037', filter: 'blur(0.2px)' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (actionId === 'cover') {
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
        animate={{ opacity: 1, scale: [0.94, 1.02, 0.96], rotate: [-18, 18, -10], y: [0, 2, -1, 0] }}
        transition={{ repeat: Infinity, duration: 0.72, ease: 'easeInOut' }}
        className="relative w-8 h-8"
      >
        <div className="absolute left-1 top-2 w-6 h-6 bg-[#f59e0b]/30 border border-black/10 rounded-[1.1rem] shadow-md" />
        <div className="absolute left-2 top-3 w-4 h-2 bg-white/40 rounded-full" />
        <div className="absolute right-0 top-4 w-3 h-4 bg-[#9ca3af] rounded-xl shadow-md border border-black/10" />
        <div className="absolute right-0 top-4 w-3 h-4 flex flex-col items-center justify-center gap-0.5 text-[#111827]">
          <div className="w-1 h-1 bg-[#111827] rounded-full" />
          <div className="w-1 h-1 bg-[#65a30d] rounded-full" />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ opacity: 0, x: 18, y: 18, scale: 0.5 }}
            animate={{ opacity: [0, 0.9, 0], x: [18, 14 - i * 2, 9 - i * 3], y: [18, 13 + i, 22 + i * 2], scale: [0.5, 0.9, 0.55] }}
            transition={{ duration: 0.7, delay: 0.05 * i, repeat: Infinity, repeatDelay: 0.15 }}
            style={{ width: 2 + (i % 2), height: 2 + (i % 2), backgroundColor: i % 2 === 0 ? '#84cc16' : '#111827' }}
          />
        ))}
        <div className="absolute left-0 top-5 w-4 h-1 bg-black/10 rounded-full blur-[0.3px]" />
        <div className="absolute left-2 top-7 w-3 h-1 bg-black/10 rounded-full blur-[0.2px]" />
      </motion.div>
    );
  }

  if (actionId === 'plant') {
    const p01 = Math.max(0, Math.min(1, progress / 100));
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [0.98, 1.02, 1], rotate: [-4, 3, 0] }}
        transition={{ repeat: Infinity, duration: 0.95, ease: 'easeInOut' }}
        className="relative w-8 h-8"
      >
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-6 h-2 rounded-full bg-black/10 blur-[0.2px]" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-5 h-2 rounded-full bg-[#5d4037]/25 border border-black/10" />
        <motion.div
          animate={{ y: -4 + p01 * 12, rotate: p01 > 0.42 ? [0, -10, 4, 0] : 0, scale: [1, 1.04, 1 - p01 * 0.14, 1 - p01 * 0.1] }}
          transition={{ type: 'spring', damping: 16, stiffness: 240 }}
          className="absolute left-1/2 -translate-x-1/2 top-0"
          style={{ color: accent }}
        >
          {Icon ? <Icon size={20} /> : <Sprout size={20} />}
        </motion.div>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-2 w-4 h-2 rounded-full bg-[#3f6212]/20"
          animate={{ scaleX: [0.8, 1.12, 0.92], opacity: [0.2, 0.5, 0.25] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
        />
        <AnimatePresence>
          {plantTick > 0 && (
            <motion.div
              key={plantTick}
              initial={{ opacity: 0, scale: 0.7, y: 6 }}
              animate={{ opacity: [0, 1, 0], scale: [0.7, 1.1, 0.9], y: [6, -6, -10] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute left-1/2 -translate-x-1/2 bottom-2 text-yellow-400"
            >
              <Sparkles size={18} />
            </motion.div>
          )}
        </AnimatePresence>
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

  if (actionId === 'clean') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [0.95, 1.08, 0.98], rotate: [-6, 10, -4] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
        className="relative w-8 h-8 text-emerald-300"
      >
        <ShieldCheck size={22} />
        <motion.div
          className="absolute inset-[-10px] rounded-full"
          animate={{ opacity: [0.12, 0.28, 0.12], scale: [0.9, 1.12, 0.9] }}
          transition={{ repeat: Infinity, duration: 0.65, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.22) 0 18px, transparent 52px)' }}
        />
      </motion.div>
    );
  }

  if (actionId === 'pest') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [0.95, 1.08, 0.98], rotate: [-10, 12, -8] }}
        transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
        className="relative w-8 h-8 text-red-300"
      >
        <AlertTriangle size={22} />
        <motion.div
          className="absolute inset-[-12px] rounded-full"
          animate={{ opacity: [0.10, 0.26, 0.10], scale: [0.92, 1.16, 0.92] }}
          transition={{ repeat: Infinity, duration: 0.55, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.20) 0 18px, transparent 52px)' }}
        />
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

const PreparationLoadout = ({ accent, isWalking }: { accent: string, isWalking: boolean }) => {
  return (
    <>
      <motion.div
        className="absolute -left-7 top-6 z-0"
        animate={{ rotate: isWalking ? [-10, -4, -10] : [-8, -5, -8], y: isWalking ? [0, -1, 0] : [0, 0.6, 0] }}
        transition={{ repeat: Infinity, duration: isWalking ? 0.6 : 2.2, ease: 'easeInOut' }}
      >
        <div className="relative w-4 h-20">
          <div className="absolute left-1/2 top-2 -translate-x-1/2 w-1.5 h-14 rounded-full bg-[#8b5a2b] shadow-md" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-5 h-5 rounded-t-[0.9rem] rounded-b-[0.35rem] bg-slate-300 border border-slate-500 shadow-lg" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-6 h-2 rounded-full bg-black/15 blur-sm" />
        </div>
      </motion.div>
      <motion.div
        className="absolute -right-10 top-8 z-30"
        animate={{ rotate: isWalking ? [4, 10, 4] : [6, 8, 6], y: isWalking ? [0, -2, 0] : [0, -1, 0] }}
        transition={{ repeat: Infinity, duration: isWalking ? 0.65 : 1.8, ease: 'easeInOut' }}
      >
        <div className="relative w-10 h-10 rounded-[1rem] border border-black/10 shadow-xl backdrop-blur-md bg-white/80 flex items-center justify-center">
          <div className="absolute inset-1 rounded-[0.85rem] border border-white/35 bg-[linear-gradient(180deg,rgba(146,64,14,0.88),rgba(120,53,15,0.96))]" />
          <div className="absolute top-1 left-2 right-2 h-1 rounded-full bg-white/20" />
          <div className="relative flex items-center justify-center" style={{ color: accent }}>
            <Trees size={16} />
          </div>
          <div className="absolute -top-2 -right-1 w-4 h-4 rounded-full bg-emerald-500/90 border border-emerald-200/60 shadow-md" />
          <div className="absolute -top-1 left-2 w-2 h-5 rounded-full bg-emerald-300/90 rotate-[-20deg]" />
        </div>
      </motion.div>
    </>
  );
};

const CharacterSprite = ({ isWalking, actionId, toolIcon: ToolIcon, accent, actionProgress, direction, skin, preparationMode = false }: { isWalking: boolean, actionId: string | null, toolIcon?: React.ElementType, accent: string, actionProgress?: number, direction: 'left' | 'right', skin?: string | null, preparationMode?: boolean }) => {
  const isActing = Boolean(actionId);
  const isDigging = actionId === 'hole';
  const isFertilizing = actionId === 'fertilizer';
  const isPlanting = actionId === 'plant';
  const isWatering = actionId === 'water';
  const p01 = Math.max(0, Math.min(1, (actionProgress ?? 0) / 100));
  const crouch = isPlanting ? (2 + p01 * 3.8) : isFertilizing ? (1.4 + p01 * 2.1) : 0;
  const [blinkTick, setBlinkTick] = useState(0);
  const blinkTimerRef = useRef<number | null>(null);
  const actionDur = isDigging ? 0.52 : isWatering ? 0.62 : isFertilizing ? 0.82 : isPlanting ? 1.02 : isActing ? 0.75 : isWalking ? 0.55 : 3.8;
  const actionEase = 'easeInOut';

  useEffect(() => {
    if (skin) return;
    const schedule = () => {
      const nextMs = 1800 + Math.random() * 2600;
      blinkTimerRef.current = window.setTimeout(() => {
        setBlinkTick(v => v + 1);
        schedule();
      }, nextMs);
    };
    schedule();
    return () => {
      if (blinkTimerRef.current) window.clearTimeout(blinkTimerRef.current);
      blinkTimerRef.current = null;
    };
  }, [skin]);

  if (skin) {
    return (
      <motion.div
        animate={{
          rotate:
            isDigging ? [-5.5, 2.5, -4.5] :
            isWatering ? [-4.2, 1.8, -3.5] :
            isFertilizing ? [-3.2, 4.2, -2.4] :
            isPlanting ? [-2.6, 2.2, -1.8] :
            isActing ? [-1.8, 1.8, -1.6] :
            isWalking ? [-0.8, 0.8, -0.8] :
            [-0.6, 0.6, -0.6],
          y:
            isDigging ? [0, 2.4, 0] :
            isWatering ? [0, 1.6, 0] :
            isFertilizing ? [crouch + 0.2, crouch + 1, crouch + 0.4] :
            isPlanting ? [crouch + 0.8, crouch + 1.8, crouch + 0.9] :
            isActing ? [0, 1.0, 0] :
            isWalking ? [0, -1.6, 0] :
            [0, 0.8, 0],
          x: isWatering ? [0, 1.2, 0] : isFertilizing ? [0, 0.8, 0] : isPlanting ? [0, -0.8, 0] : 0,
        }}
        transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
        className={`relative flex flex-col items-center origin-bottom transition-transform duration-300 ${direction === 'left' ? '-scale-x-100' : 'scale-x-100'}`}
      >
        {preparationMode && <PreparationLoadout accent={accent} isWalking={isWalking} />}
        <motion.div
          animate={{
            y:
              isDigging ? [0, -2.2, 0] :
              isWatering ? [0, -1.6, 0] :
              isFertilizing ? [-0.4, -1.8, -0.6] :
              isPlanting ? [-0.8, -2.1, -0.7] :
              isActing ? [0, -1.4, 0] :
              isWalking ? [0, -2.6, 0] :
              [0, -1, 0],
            rotate:
              isDigging ? [-2.6, 1.2, -2.0] :
              isWatering ? [-1.6, 1.2, -1.2] :
              isFertilizing ? [-3.4, 2.8, -2.2] :
              isPlanting ? [-2.4, 2.2, -1.6] :
              isWalking ? [-2, 2, -2] :
              0,
          }}
          transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
          className="relative z-20"
        >
          <div className="relative w-14 h-14 rounded-[1.6rem] overflow-hidden bg-white/10 border border-white/15 shadow-2xl" style={{ filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.22))' }}>
            <img
              src={skin}
              alt="Karakter"
              draggable={false}
              className="w-full h-full object-contain select-none"
              style={{ imageRendering: 'auto' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_55%)]" />
          </div>
        </motion.div>

        {isActing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-10 w-12 h-12 rounded-[1.25rem] bg-white/90 border border-black/10 shadow-2xl flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate:
                  isDigging ? [-38, 12, -28] :
                  isWatering ? [-14, 18, -10] :
                  isFertilizing ? [24, -18, 12, -8] :
                  isPlanting ? [-18, 12, -8, 2] :
                  [-10, 10, -8],
                x: isDigging ? [-6, 4, -3] : isWatering ? [2, 6, 3] : isFertilizing ? [5, -1, 4, 0] : isPlanting ? [-2, 3, 1, 0] : 0,
                y: isDigging ? [6, 12, 8] : isWatering ? [6, 8, 6] : isFertilizing ? [7, 4, 10, 6] : isPlanting ? [7 + p01 * 5, 11 + p01 * 6, 13 + p01 * 3, 9 + p01 * 2] : [6, 8, 6],
              }}
              transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
              className="relative"
            >
              <HeldTool actionId={actionId ?? ''} accent={accent} icon={ToolIcon} actionProgress={actionProgress} />
            </motion.div>
          </motion.div>
        )}

        {!isActing && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: [1, 1.05, 1], y: [0, -1, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="absolute -right-9 top-6 w-10 h-10 rounded-[1.15rem] bg-white/80 border border-black/10 shadow-xl flex items-center justify-center backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-[1rem] bg-white/70 border border-black/10 shadow-inner flex items-center justify-center" style={{ color: accent }}>
              {ToolIcon ? <ToolIcon size={18} /> : <Sprout size={18} />}
            </div>
          </motion.div>
        )}

        <motion.div
          animate={{ scale: isDigging ? [1, 0.92, 1] : isPlanting ? [1, 0.94, 1] : isActing ? [1, 0.94, 1] : isWalking ? [1, 0.93, 1] : [1, 0.95, 1] }}
          transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
          className="w-14 h-3 bg-black/20 rounded-full blur-sm mt-2"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.14) 58%, rgba(0,0,0,0.0) 76%)' }}
        />

        <CharacterActionFX actionId={actionId} accent={accent} toolIcon={ToolIcon} />
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{
        rotate:
          isDigging ? [-5.5, 2.5, -4.5] :
          isWatering ? [-4.2, 1.8, -3.5] :
          isFertilizing ? [-3.4, 4.4, -2.6] :
          isPlanting ? [-2.8, 2.2, -1.8] :
          isActing ? [-1.8, 1.8, -1.6] :
          isWalking ? [-0.8, 0.8, -0.8] :
          [-0.6, 0.6, -0.6],
        y:
          isDigging ? [0, 2.4, 0] :
          isWatering ? [0, 1.6, 0] :
          isFertilizing ? [crouch + 0.4, crouch + 1.2, crouch + 0.5] :
          isPlanting ? [crouch + 0.8, crouch + 1.9, crouch + 0.9] :
          isActing ? [0, 1.0, 0] :
          isWalking ? [0, -1.6, 0] :
          [0, 0.8, 0],
        x: isWatering ? [0, 1.2, 0] : isFertilizing ? [0, 0.8, 0] : isPlanting ? [0, -0.8, 0] : 0,
      }}
      transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
      className={`relative flex flex-col items-center origin-bottom transition-transform duration-300 ${direction === 'left' ? '-scale-x-100' : 'scale-x-100'}`}
    >
      {preparationMode && <PreparationLoadout accent={accent} isWalking={isWalking} />}
      <motion.div 
        animate={{ 
          y:
            isDigging ? [0, -2.2, 0] :
            isWatering ? [0, -1.6, 0] :
            isFertilizing ? [-0.4, -1.9, -0.7] :
            isPlanting ? [-0.8, -2.2, -0.8] :
            isActing ? [0, -1.4, 0] :
            isWalking ? [0, -2.6, 0] :
            [0, -1, 0],
          rotate:
            isDigging ? [-2.6, 1.2, -2.0] :
            isWatering ? [-1.6, 1.2, -1.2] :
            isFertilizing ? [-3.2, 2.6, -2.1] :
            isPlanting ? [-2.6, 2.2, -1.7] :
            isWalking ? [-2, 2, -2] :
            0
        }}
        transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
        className="relative z-20"
      >
        <div className="w-10 h-10 bg-[#7d4a27] rounded-full border-2 border-[#5d361b] flex items-end justify-center overflow-visible relative">
          {/* Monkey Ears */}
          <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-[#7d4a27] border border-[#5d361b]" />
          <div className="absolute -right-2 top-2 w-4 h-4 rounded-full bg-[#7d4a27] border border-[#5d361b]" />
          
          {/* Monkey Face */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-8 h-7 rounded-full bg-[#e6bc98]" />

          <div className="absolute left-1/2 top-[50%] -translate-x-1/2 w-7 h-3 z-10">
            <motion.div
              key={blinkTick}
              initial={false}
              animate={{ scaleY: [1, 1, 0.12, 1], scaleX: [1, 1.05, 1.05, 1] }}
              transition={{ duration: 0.18, times: [0, 0.55, 0.7, 1] }}
              className="absolute left-0 top-0 w-2.5 h-2.5 origin-center"
            >
              <div className="w-1.2 h-1.2 bg-black rounded-full" />
            </motion.div>
            <motion.div
              key={`${blinkTick}-r`}
              initial={false}
              animate={{ scaleY: [1, 1, 0.12, 1], scaleX: [1, 1.05, 1.05, 1] }}
              transition={{ duration: 0.18, times: [0, 0.55, 0.7, 1] }}
              className="absolute right-0 top-0 w-2.5 h-2.5 origin-center"
            >
              <div className="w-1.2 h-1.2 bg-black rounded-full" />
            </motion.div>
          </div>
          <div className="absolute left-1/2 bottom-[15%] -translate-x-1/2 w-4 h-2 z-10">
            <motion.div
              animate={{ scaleX: isActing ? [1, 1.2, 1] : [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: isActing ? 0.35 : 2.4, ease: 'easeInOut' }}
              className="mx-auto w-3 h-1.5 rounded-full bg-black/20"
            />
          </div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ 
          rotate:
            isDigging ? [-4, 2, -3.2] :
            isWatering ? [-2.6, 1.4, -2.2] :
            isFertilizing ? [-3.2, 3.6, -2.4] :
            isPlanting ? [-2.2, 2, -1.5] :
            isActing ? [-1.8, 2.2, -1.4] :
            isWalking ? [-1.2, 1.2, -1.2] :
            [-0.8, 0.8, -0.8],
          y:
            isDigging ? [0, 2.8, 0] :
            isWatering ? [0.6, 2.2, 0.6] :
            isFertilizing ? [1.6 + crouch * 0.5, 2.8 + crouch * 0.55, 1.8 + crouch * 0.45] :
            isPlanting ? [2.4 + crouch * 0.72, 3.8 + crouch * 0.8, 2.5 + crouch * 0.72] :
            isActing ? [0, 1.8, 0] :
            isWalking ? [0, -1.2, 0] :
            [0, 0.6, 0],
          scaleY: isDigging ? [1, 0.975, 1] : isFertilizing ? [1, 0.98, 1] : isPlanting ? [1, 0.982, 1] : isActing ? [1, 0.985, 1] : isWalking ? [1, 0.995, 1] : [1, 1.015, 1],
          x: isWatering ? [0, 1, 0] : 0,
        }}
        transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
        className="w-12 h-14 bg-[#7d4a27] rounded-xl border-2 border-[#5d361b] -mt-1 relative z-10 shadow-md"
      >
        {/* Monkey Tail for Sprite */}
        <motion.div
          className="absolute -left-4 top-4 w-6 h-6"
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full opacity-60">
            <path d="M 50 10 Q 10 10 10 40" fill="none" stroke="#5d361b" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </motion.div>

        <div className="absolute inset-x-2 top-0 bottom-4 border-x-4 border-[#5d361b] opacity-20" />
        <motion.div 
          animate={{
            rotate:
              isDigging ? [54, -22, 46] :
              isWatering ? [34, 8, 30] :
              isFertilizing ? [48, -10, 34, 12] :
              isPlanting ? [30, -4, 22, 8] :
              isActing ? [26, -22, 18] :
              isWalking ? [14, -14, 14] :
              [4, -4, 4],
            y:
              isDigging ? [0, 5, 1] :
              isWatering ? [2, 3, 2] :
              isFertilizing ? [3, 1, 6, 2] :
              isPlanting ? [4 + p01 * 4, 8 + p01 * 5, 10 + p01 * 2, 5 + p01 * 2] :
              isActing ? [0, 1.8, 0] :
              0,
          }}
          transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
          className="absolute -left-3 top-2 w-4 h-8 bg-[#7d4a27] rounded-full border-2 border-[#5d361b] origin-top" 
        />
        <motion.div 
          animate={{
            rotate:
              isDigging ? [-16, 18, -10] :
              isWatering ? [-44, -12, -36] :
              isFertilizing ? [-54, -8, -36, -18] :
              isPlanting ? [-28, -16, -24, -10] :
              isActing ? [-16, 16, -12] :
              isWalking ? [-14, 14, -14] :
              [-4, 4, -4],
            y:
              isDigging ? [2, 3, 2] :
              isWatering ? [5, 6, 5] :
              isFertilizing ? [5, 7, 3, 6] :
              isPlanting ? [4 + p01 * 4, 7 + p01 * 5, 11 + p01 * 3, 5 + p01 * 2] :
              isActing ? [0, 1.2, 0] :
              0,
          }}
          transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
          className="absolute -right-3 top-2 w-4 h-8 bg-[#7d4a27] rounded-full border-2 border-[#5d361b] origin-top" 
        />

        {isActing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 -top-3 w-12 h-12 rounded-[1.25rem] bg-white/90 border border-black/10 shadow-2xl flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate:
                  isDigging ? [-40, 10, -30] :
                  isWatering ? [-18, 22, -12] :
                  isFertilizing ? [26, -18, 14, -8] :
                  isPlanting ? [-18, 12, -8, 2] :
                  [-10, 10, -8],
                x: isDigging ? [-7, 5, -4] : isWatering ? [3, 7, 4] : isFertilizing ? [5, -1, 4, 0] : isPlanting ? [-2, 3, 1, 0] : 0,
                y: isDigging ? [10, 16, 12] : isWatering ? [8, 10, 8] : isFertilizing ? [8, 4, 11, 7] : isPlanting ? [11 + p01 * 5, 15 + p01 * 6, 17 + p01 * 3, 12 + p01 * 2] : [8, 10, 8],
              }}
              transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
              className="relative"
            >
              <HeldTool actionId={actionId ?? ''} accent={accent} icon={ToolIcon} actionProgress={actionProgress} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <div className="flex gap-1 -mt-1">
        <motion.div 
          animate={{ y: isWalking ? [0, -3, 0] : isPlanting ? [0, 1, 0] : 0, rotate: isWalking ? [6, -6, 6] : 0 }}
          transition={{ repeat: Infinity, duration: isWalking ? 0.55 : isPlanting ? 0.9 : 1, delay: 0, ease: 'easeInOut' }}
          className="w-5 h-6 bg-[#303f9f] rounded-b-lg border-2 border-[#1a237e]" 
        />
        <motion.div 
          animate={{ y: isWalking ? [0, -3, 0] : isPlanting ? [0, 1, 0] : 0, rotate: isWalking ? [-6, 6, -6] : 0 }}
          transition={{ repeat: Infinity, duration: isWalking ? 0.55 : isPlanting ? 0.9 : 1, delay: isWalking ? 0.275 : 0, ease: 'easeInOut' }}
          className="w-5 h-6 bg-[#303f9f] rounded-b-lg border-2 border-[#1a237e]" 
        />
      </div>

      <motion.div 
        animate={{ scale: isDigging ? [1, 0.92, 1] : isPlanting ? [1, 0.94, 1] : isActing ? [1, 0.94, 1] : isWalking ? [1, 0.93, 1] : [1, 0.95, 1] }}
        transition={{ repeat: Infinity, duration: actionDur, ease: actionEase }}
        className="w-12 h-3 bg-black/20 rounded-full blur-sm mt-1"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.14) 58%, rgba(0,0,0,0.0) 76%)' }}
      />

      {!isActing && (
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: [1, 1.05, 1], y: [0, -1, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="absolute -right-9 top-10 w-10 h-10 rounded-[1.15rem] bg-white/80 border border-black/10 shadow-xl flex items-center justify-center backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-[1rem] bg-white/70 border border-black/10 shadow-inner flex items-center justify-center" style={{ color: accent }}>
            {ToolIcon ? <ToolIcon size={18} /> : <Sprout size={18} />}
          </div>
        </motion.div>
      )}

      <CharacterActionFX actionId={actionId} accent={accent} toolIcon={ToolIcon} />
    </motion.div>
  );
};

const Butterfly = memo(({ seed }: { seed: number }) => {
  const rand = useCallback((n: number) => prand(seed * 37.1 + n * 9.3), [seed]);
  const x0 = useMemo(() => rand(1) * 520, [rand]);
  const y0 = useMemo(() => rand(2) * 340, [rand]);
  const x1 = useMemo(() => rand(3) * 520, [rand]);
  const y1 = useMemo(() => rand(4) * 340, [rand]);
  const x2 = useMemo(() => rand(5) * 520, [rand]);
  const y2 = useMemo(() => rand(6) * 340, [rand]);
  const duration = useMemo(() => 10 + rand(7) * 11, [rand]);
  const delay = useMemo(() => rand(8) * 6, [rand]);
  const size = useMemo(() => 2.6 + rand(9) * 2.0, [rand]);

  return (
    <motion.div
      initial={{ x: x0, y: y0, opacity: 0 }}
      animate={{ x: [x0, x1, x2], y: [y0, y1, y2], opacity: [0, 0.9, 0] }}
      transition={{ repeat: Infinity, duration, ease: 'linear', delay }}
      className="absolute pointer-events-none z-40"
      style={{ filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.12))' }}
    >
      <motion.div
        animate={{ rotateY: [0, 80, 0], scale: [0.95, 1.12, 0.95] }}
        transition={{ repeat: Infinity, duration: 0.22, ease: 'easeInOut' }}
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(251,191,36,0.85) 55%, rgba(245,158,11,0.75))',
        }}
      />
    </motion.div>
  );
});

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

type MapWeather = 'sun' | 'rain' | 'fog' | 'heat' | 'storm';

type RegionVitals = {
  tempC: number;
  co2Index: number;
  humidity: number;
  waterIndex: number;
  trees: number;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const stableHash = (s: string) => {
  let acc = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    acc ^= s.charCodeAt(i);
    acc = Math.imul(acc, 16777619);
  }
  return (acc >>> 0) / 4294967295;
};

const deriveRegionVitals = (region: Region, weather: MapWeather, t01: number): RegionVitals => {
  const base = stableHash(region.id);
  const wobbleA = Math.sin((t01 * 6.283) + base * 9.2);
  const wobbleB = Math.cos((t01 * 6.283) + base * 5.7);

  const statusTempBase = region.status === 'hijau' ? 26 : region.status === 'kritis' ? 31 : 35;
  const statusHumBase = region.status === 'hijau' ? 74 : region.status === 'kritis' ? 52 : 34;
  const statusCo2Base = region.status === 'hijau' ? 42 : region.status === 'kritis' ? 66 : 82;
  const statusTreesBase = region.status === 'hijau' ? 5200 : region.status === 'kritis' ? 2100 : 650;

  const weatherTemp =
    weather === 'heat' ? 3.2 : weather === 'rain' ? -1.6 : weather === 'fog' ? -0.8 : weather === 'storm' ? -0.2 : 0;
  const weatherHum =
    weather === 'rain' ? 18 : weather === 'fog' ? 14 : weather === 'heat' ? -14 : weather === 'storm' ? 8 : 0;
  const weatherCo2 =
    weather === 'storm' ? 6 : weather === 'fog' ? 3 : weather === 'heat' ? 4 : weather === 'rain' ? -2 : 0;
  const weatherWater =
    weather === 'rain' ? 22 : weather === 'fog' ? 10 : weather === 'heat' ? -18 : weather === 'storm' ? 6 : 0;

  const tempC = Math.round((statusTempBase + weatherTemp + wobbleA * 1.1 + wobbleB * 0.5) * 10) / 10;
  const humidity = Math.round(Math.max(18, Math.min(92, statusHumBase + weatherHum + wobbleB * 6 + wobbleA * 4)));
  const co2Index = Math.round(Math.max(22, Math.min(96, statusCo2Base + weatherCo2 + wobbleA * 4 + wobbleB * 3)));
  const waterIndex = Math.round(Math.max(10, Math.min(95, (humidity * 0.72) + (region.status === 'hijau' ? 18 : region.status === 'kritis' ? 8 : -6) + weatherWater + wobbleA * 4)));
  const trees = Math.round(Math.max(80, statusTreesBase + wobbleA * 180 + wobbleB * 140));

  return { tempC, humidity, co2Index, waterIndex, trees };
};

const MapAmbientCanvas = memo(({ intensity01, seed, tint }: { intensity01: number; seed: number; tint: 'eco' | 'heat' | 'smog' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    id: number;
    kind: 'dust' | 'leaf';
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    rot: number;
    vr: number;
    alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rand = (n: number) => {
      const v = Math.sin((seed + n) * 999.123) * 10000;
      return v - Math.floor(v);
    };

    const ensureParticles = (w: number, h: number) => {
      const target = Math.round(110 + 160 * clamp01(intensity01));
      const p = particlesRef.current;
      if (p.length >= target) return;
      const start = p.length;
      for (let i = start; i < target; i += 1) {
        const r = rand(i + 1);
        const kind: 'dust' | 'leaf' = r < 0.72 ? 'dust' : 'leaf';
        const speed = kind === 'dust' ? 12 + rand(i + 21) * 18 : 20 + rand(i + 31) * 34;
        const angle = (rand(i + 41) * 0.9 - 0.45) * Math.PI;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed * 0.35;
        p.push({
          id: i,
          kind,
          x: rand(i + 51) * w,
          y: rand(i + 61) * h,
          vx,
          vy,
          size: kind === 'dust' ? 0.9 + rand(i + 71) * 2.2 : 2.4 + rand(i + 81) * 4.2,
          rot: rand(i + 91) * Math.PI * 2,
          vr: (rand(i + 101) * 2 - 1) * 0.8,
          alpha: kind === 'dust' ? 0.10 + rand(i + 111) * 0.18 : 0.10 + rand(i + 121) * 0.22,
        });
      }
    };

    const resize = () => {
      const dpr = Math.max(1, Math.min(2.25, window.devicePixelRatio || 1));
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = Math.max(1, Math.floor(parent.clientWidth));
      const h = Math.max(1, Math.floor(parent.clientHeight));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ensureParticles(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize);

    let last = performance.now();
    const loop = (now: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = Math.max(1, parent.clientWidth);
      const h = Math.max(1, parent.clientHeight);
      const dt = Math.max(0.001, Math.min(0.033, (now - last) / 1000));
      last = now;
      ensureParticles(w, h);

      ctx.clearRect(0, 0, w, h);

      const dustColor =
        tint === 'heat' ? 'rgba(251,191,36,' : tint === 'smog' ? 'rgba(148,163,184,' : 'rgba(56,189,248,';
      const leafColor =
        tint === 'heat' ? 'rgba(34,197,94,' : tint === 'smog' ? 'rgba(100,116,139,' : 'rgba(16,185,129,';

      const p = particlesRef.current;
      for (let i = 0; i < p.length; i += 1) {
        const it = p[i];
        it.x += it.vx * dt;
        it.y += it.vy * dt;
        it.rot += it.vr * dt;
        const drift = Math.sin((now / 1000) + it.id * 0.7) * 10;
        it.y += drift * dt * (it.kind === 'leaf' ? 0.55 : 0.25);
        if (it.x < -30) it.x = w + 30;
        if (it.x > w + 30) it.x = -30;
        if (it.y < -30) it.y = h + 30;
        if (it.y > h + 30) it.y = -30;

        if (it.kind === 'dust') {
          ctx.beginPath();
          ctx.fillStyle = `${dustColor}${it.alpha * (0.75 + 0.25 * Math.sin((now / 1000) + it.id))})`;
          ctx.arc(it.x, it.y, it.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.save();
          ctx.translate(it.x, it.y);
          ctx.rotate(it.rot);
          ctx.fillStyle = `${leafColor}${it.alpha * (0.75 + 0.25 * Math.cos((now / 1000) + it.id))})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, it.size * 1.15, it.size * 0.65, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(255,255,255,${0.05 * clamp01(intensity01)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-it.size * 0.8, 0);
          ctx.lineTo(it.size * 0.8, 0);
          ctx.stroke();
          ctx.restore();
        }
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [intensity01, seed, tint]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.9, mixBlendMode: 'screen' }} />;
});

const GameLoadingOverlay = memo(({
  title,
  subtitle,
  accent,
  tip,
  durationMs,
  stages,
}: {
  title: string;
  subtitle: string;
  accent: 'eco' | 'warn' | 'danger';
  tip: string;
  durationMs: number;
  stages?: string[];
}) => {
  const accentRgb =
    accent === 'eco' ? '16,185,129' : accent === 'warn' ? '245,158,11' : '239,68,68';

  const [stageIdx, setStageIdx] = useState(0);
  useEffect(() => {
    if (!stages || stages.length === 0) return;
    const startAt = Date.now();
    const tick = () => {
      const p = Math.max(0, Math.min(0.999, (Date.now() - startAt) / Math.max(1, durationMs)));
      const idx = Math.min(stages.length - 1, Math.floor(p * stages.length));
      setStageIdx(idx);
    };
    tick();
    const t = window.setInterval(tick, 120);
    return () => window.clearInterval(t);
  }, [durationMs, stages]);

  return (
    <motion.div
      className="fixed inset-0 z-[220] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background:
          'radial-gradient(circle at 50% 40%, rgba(2,6,23,0.25) 0 520px, rgba(2,6,23,0.78) 920px), rgba(2,6,23,0.70)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <motion.div
        initial={{ y: 14, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -10, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="w-full max-w-[560px] rounded-[2.25rem] border border-white/10 overflow-hidden shadow-[0_60px_160px_rgba(0,0,0,0.65)] bg-slate-950/55"
      >
        <div
          className="relative p-6 sm:p-8"
          style={{
            backgroundImage: [
              `radial-gradient(circle at 18% 18%, rgba(${accentRgb},0.20) 0 180px, transparent 520px)`,
              'radial-gradient(circle at 78% 26%, rgba(56,189,248,0.16) 0 180px, transparent 520px)',
              'linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.70) 100%)',
            ].join(','),
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-35 pointer-events-none"
            animate={{ backgroundPosition: ['0% 0%', '0% 120%'] }}
            transition={{ repeat: Infinity, duration: 0.55, ease: 'linear' }}
            style={{
              backgroundImage:
                'repeating-linear-gradient(180deg, rgba(255,255,255,0.0) 0 10px, rgba(255,255,255,0.06) 10px 11px, rgba(255,255,255,0.0) 11px 22px)',
              mixBlendMode: 'overlay',
            }}
          />

          <div className="flex items-start gap-4">
            <div className="relative">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10"
                animate={{ y: [0, -4, 0], rotate: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                style={{
                  background: `radial-gradient(circle at 30% 20%, rgba(${accentRgb},0.22) 0 28px, rgba(255,255,255,0.02) 62px)`,
                  boxShadow: `0 0 0 1px rgba(${accentRgb},0.10), 0 22px 60px rgba(0,0,0,0.45)`,
                }}
              >
                <Leaf className="text-emerald-200" />
              </motion.div>
              <motion.div
                className="absolute -inset-4 rounded-[1.75rem] pointer-events-none"
                animate={{ opacity: [0.10, 0.26, 0.10], scale: [0.98, 1.06, 0.98] }}
                transition={{ repeat: Infinity, duration: 1.65, ease: 'easeInOut' }}
                style={{ background: `radial-gradient(circle, rgba(${accentRgb},0.22) 0 26px, rgba(${accentRgb},0.0) 78px)` }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black uppercase tracking-[0.26em] text-white/50">Loading</div>
              <div className="text-white font-black tracking-tight text-xl">{title}</div>
              <div className="text-white/70 font-bold text-sm mt-1 leading-snug">{subtitle}</div>
              {stages && stages.length > 0 && (
                <div className="mt-4">
                  <div className="text-[11px] font-black text-white/55 uppercase tracking-[0.22em]">Proses</div>
                  <div className="mt-1 text-white/85 text-sm font-black">{stages[Math.max(0, Math.min(stages.length - 1, stageIdx))]}</div>
                </div>
              )}
              <div className="mt-4 text-[11px] font-black text-white/55 uppercase tracking-[0.22em]">Tip</div>
              <div className="text-white/80 text-sm font-bold">{tip}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-2.5 rounded-full bg-black/35 border border-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: Math.max(0.35, durationMs / 1000), ease: 'easeInOut' }}
                style={{
                  background: `linear-gradient(90deg, rgba(${accentRgb},0.95) 0%, rgba(56,189,248,0.75) 55%, rgba(255,255,255,0.32) 100%)`,
                }}
              />
            </div>
            <motion.div
              className="mt-3 flex items-center justify-between text-xs font-black text-white/55"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              <span className="flex items-center gap-2">
                <Activity size={14} className="text-white/55" /> Sinkronisasi lingkungan
              </span>
              <span className="flex items-center gap-2">
                <Sparkles size={14} className="text-white/55" /> Memuat efek visual
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

type Biome =
  | 'mountain_forest'
  | 'forest'
  | 'floodplain'
  | 'industry_dry'
  | 'urban'
  | 'farmland';

const TerrainMapCanvas = memo(({
  regions,
  weatherByRegionId,
  regionFxAt,
  view,
  focusParams,
  seed,
}: {
  regions: Region[];
  weatherByRegionId: Record<string, MapWeather>;
  regionFxAt: Record<string, number>;
  view: { s: number; tx: number; ty: number };
  focusParams: { s: number; tx: number; ty: number };
  seed: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const heightRef = useRef<{ w: number; h: number; data: Float32Array } | null>(null);
  const regionPathsRef = useRef<Record<string, Path2D>>({});

  const biomeById = useMemo<Record<string, Biome>>(() => {
    const m: Record<string, Biome> = {};
    for (const r of regions) m[r.id] = 'forest';
    m['kbb-lembang'] = 'mountain_forest';
    m['kab-ciwidey'] = 'mountain_forest';
    m['kab-pangalengan'] = 'mountain_forest';
    m['bdg-bojonagara'] = 'urban';
    m['bdg-cibeunying'] = 'urban';
    m['bdg-karees'] = 'urban';
    m['bdg-tegalega'] = 'urban';
    m['cimahi'] = 'urban';
    m['kab-soreang'] = 'farmland';
    m['kab-majalaya'] = 'industry_dry';
    m['kab-margahayu'] = 'industry_dry';
    m['bdg-gedebage'] = 'industry_dry';
    m['kbb-padalarang'] = 'industry_dry';
    m['kab-baleendah'] = 'floodplain';
    m['kbb-cipatat'] = 'farmland';
    m['kbb-cililin'] = 'forest';
    m['bdg-ujungberung'] = 'forest';
    return m;
  }, [regions]);

  useEffect(() => {
    const next: Record<string, Path2D> = {};
    for (const r of regions) {
      try {
        next[r.id] = new Path2D(r.path);
      } catch {}
    }
    regionPathsRef.current = next;
  }, [regions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rand = (n: number) => {
      const v = Math.sin((seed + n) * 999.123) * 10000;
      return v - Math.floor(v);
    };

    const hash2 = (x: number, y: number) => {
      const a = Math.sin((x * 127.1 + y * 311.7 + seed * 0.17) * 43758.5453);
      return a - Math.floor(a);
    };

    const smooth = (t: number) => t * t * (3 - 2 * t);

    const noise2 = (x: number, y: number) => {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = smooth(xf);
      const v = smooth(yf);
      const n00 = hash2(xi, yi);
      const n10 = hash2(xi + 1, yi);
      const n01 = hash2(xi, yi + 1);
      const n11 = hash2(xi + 1, yi + 1);
      const nx0 = n00 * (1 - u) + n10 * u;
      const nx1 = n01 * (1 - u) + n11 * u;
      return nx0 * (1 - v) + nx1 * v;
    };

    const fbm = (x: number, y: number) => {
      let v = 0;
      let amp = 0.52;
      let f = 0.08;
      for (let i = 0; i < 5; i += 1) {
        v += noise2(x * f, y * f) * amp;
        f *= 2.1;
        amp *= 0.52;
      }
      return v;
    };

    const riverDist = (vx: number, vy: number) => {
      const p0 = { x: 18, y: 18 };
      const p1 = { x: 40, y: 28 };
      const p2 = { x: 62, y: 58 };
      const p3 = { x: 104, y: 82 };
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const bez = (t: number) => {
        const a = { x: lerp(p0.x, p1.x, t), y: lerp(p0.y, p1.y, t) };
        const b = { x: lerp(p1.x, p2.x, t), y: lerp(p1.y, p2.y, t) };
        const c = { x: lerp(p2.x, p3.x, t), y: lerp(p2.y, p3.y, t) };
        const d = { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
        const e = { x: lerp(b.x, c.x, t), y: lerp(b.y, c.y, t) };
        return { x: lerp(d.x, e.x, t), y: lerp(d.y, e.y, t) };
      };
      let best = 1e9;
      for (let i = 0; i <= 28; i += 1) {
        const t = i / 28;
        const q = bez(t);
        const d = Math.hypot(vx - q.x, vy - q.y);
        if (d < best) best = d;
      }
      return best;
    };

    const buildBase = (wPx: number, hPx: number) => {
      const base = document.createElement('canvas');
      base.width = wPx;
      base.height = hPx;
      const bctx = base.getContext('2d');
      if (!bctx) return null;

      const hw = 420;
      const hh = 350;
      const hdata = new Float32Array(hw * hh);
      for (let y = 0; y < hh; y += 1) {
        for (let x = 0; x < hw; x += 1) {
          const vx = (x / (hw - 1)) * 120;
          const vy = (y / (hh - 1)) * 100;
          const north = 1 - clamp01((vy - 6) / 44);
          const mtn = Math.pow(north, 1.8);
          let h = fbm(vx, vy) * 0.9 + mtn * 0.55;
          const rd = riverDist(vx, vy);
          const valley = Math.exp(-(rd * rd) / (2 * 3.2 * 3.2));
          h -= valley * 0.28;
          h = clamp01(h);
          hdata[y * hw + x] = h;
        }
      }
      heightRef.current = { w: hw, h: hh, data: hdata };

      const sampleH = (vx: number, vy: number) => {
        const xx = clamp01(vx / 120) * (hw - 1);
        const yy = clamp01(vy / 100) * (hh - 1);
        const x0 = Math.floor(xx);
        const y0 = Math.floor(yy);
        const x1 = Math.min(hw - 1, x0 + 1);
        const y1 = Math.min(hh - 1, y0 + 1);
        const fx = xx - x0;
        const fy = yy - y0;
        const i00 = hdata[y0 * hw + x0];
        const i10 = hdata[y0 * hw + x1];
        const i01 = hdata[y1 * hw + x0];
        const i11 = hdata[y1 * hw + x1];
        const a = i00 * (1 - fx) + i10 * fx;
        const b = i01 * (1 - fx) + i11 * fx;
        return a * (1 - fy) + b * fy;
      };

      const toRgb = (r: number, g: number, b: number) => `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      bctx.clearRect(0, 0, wPx, hPx);
      const img = bctx.createImageData(wPx, hPx);
      const data = img.data;
      const contourStep = 0.085;
      for (let y = 0; y < hPx; y += 1) {
        const vy = (y / (hPx - 1)) * 100;
        for (let x = 0; x < wPx; x += 1) {
          const vx = (x / (wPx - 1)) * 120;
          const h = sampleH(vx, vy);
          const water = clamp01((0.26 - h) * 6.8);
          const land = 1 - water;
          const rock = clamp01((h - 0.74) * 4.2);
          const soil = land * (1 - rock);

          const baseR = lerp(12, 36, soil) + rock * 40;
          const baseG = lerp(18, 62, soil) + rock * 36;
          const baseB = lerp(22, 54, soil) + rock * 28;

          const wR = lerp(10, 40, 1 - water);
          const wG = lerp(40, 140, 1 - water);
          const wB = lerp(80, 220, 1 - water);

          let cr = baseR * land + wR * water;
          let cg = baseG * land + wG * water;
          let cb = baseB * land + wB * water;

          const t = (h / contourStep) % 1;
          const band = 1 - Math.min(1, Math.abs(t - 0.5) * 4);
          const contour = (water < 0.35 ? band : band * 0.25);
          cr = cr * (1 - contour * 0.10);
          cg = cg * (1 - contour * 0.12);
          cb = cb * (1 - contour * 0.14);

          const idx = (y * wPx + x) * 4;
          data[idx] = Math.max(0, Math.min(255, Math.round(cr)));
          data[idx + 1] = Math.max(0, Math.min(255, Math.round(cg)));
          data[idx + 2] = Math.max(0, Math.min(255, Math.round(cb)));
          data[idx + 3] = 255;
        }
      }
      bctx.putImageData(img, 0, 0);

      bctx.save();
      bctx.globalCompositeOperation = 'overlay';
      bctx.globalAlpha = 0.28;
      for (let i = 0; i < 14; i += 1) {
        const gx = rand(i + 41) * wPx;
        const gy = rand(i + 51) * hPx;
        const gr = (0.18 + rand(i + 61) * 0.32) * Math.min(wPx, hPx);
        const g = bctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, 'rgba(255,255,255,0.12)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        bctx.fillStyle = g;
        bctx.beginPath();
        bctx.arc(gx, gy, gr, 0, Math.PI * 2);
        bctx.fill();
      }
      bctx.restore();

      for (const r of regions) {
        const p = regionPathsRef.current[r.id];
        if (!p) continue;
        const biome = biomeById[r.id] ?? 'forest';
        const weather = weatherByRegionId[r.id] ?? 'sun';
        const isDry = biome === 'industry_dry' || r.status === 'gersang' || weather === 'heat';

        bctx.save();
        bctx.scale(wPx / 120, hPx / 100);
        bctx.clip(p);

        const t = r.status === 'hijau' ? 0.0 : r.status === 'kritis' ? 0.45 : 0.85;
        const baseSoil = isDry ? `rgba(239,68,68,${0.08 + t * 0.12})` : `rgba(16,185,129,${0.08 + (1 - t) * 0.12})`;
        bctx.fillStyle = baseSoil;
        bctx.fillRect(0, 0, 120, 100);

        const vcount = biome === 'mountain_forest' ? 520 : biome === 'forest' ? 420 : biome === 'farmland' ? 320 : biome === 'floodplain' ? 260 : biome === 'urban' ? 160 : 180;
        for (let i = 0; i < vcount; i += 1) {
          const px = r.x + (rand(i + r.x * 7) * 22 - 11);
          const py = r.y + (rand(i + r.y * 11) * 18 - 9);
          const ok = (px >= 0 && px <= 120 && py >= 0 && py <= 100);
          if (!ok) continue;
          const size = biome === 'mountain_forest' ? 0.40 : biome === 'forest' ? 0.38 : biome === 'farmland' ? 0.32 : biome === 'floodplain' ? 0.30 : 0.28;
          bctx.fillStyle =
            biome === 'industry_dry' || biome === 'urban'
              ? `rgba(148,163,184,${0.06 + t * 0.10})`
              : `rgba(34,197,94,${0.07 + (1 - t) * 0.14})`;
          bctx.beginPath();
          bctx.arc(px, py, size + rand(i + 91) * 0.35, 0, Math.PI * 2);
          bctx.fill();
        }

        if (biome === 'industry_dry' || biome === 'urban') {
          const n = biome === 'urban' ? 18 : 12;
          for (let i = 0; i < n; i += 1) {
            const bx = r.x + (rand(i + 301) * 18 - 9);
            const by = r.y + (rand(i + 311) * 14 - 7);
            const bw = 0.8 + rand(i + 321) * 1.8;
            const bh = 0.8 + rand(i + 331) * 2.2;
            bctx.fillStyle = `rgba(15,23,42,${0.22 + t * 0.20})`;
            bctx.fillRect(bx - bw / 2, by - bh / 2, bw, bh);
            bctx.fillStyle = `rgba(56,189,248,${0.10 + (1 - t) * 0.10})`;
            bctx.fillRect(bx - bw / 2 + 0.1, by - bh / 2 + 0.1, Math.max(0.2, bw - 0.2), 0.25);
          }
        }

        if (biome === 'floodplain') {
          bctx.globalAlpha = 0.55;
          for (let i = 0; i < 12; i += 1) {
            const wx = r.x + (rand(i + 501) * 20 - 10);
            const wy = r.y + (rand(i + 511) * 18 - 9);
            const wr = 2.2 + rand(i + 521) * 4.2;
            const g = bctx.createRadialGradient(wx, wy, 0, wx, wy, wr);
            g.addColorStop(0, 'rgba(59,130,246,0.25)');
            g.addColorStop(1, 'rgba(59,130,246,0)');
            bctx.fillStyle = g;
            bctx.beginPath();
            bctx.arc(wx, wy, wr, 0, Math.PI * 2);
            bctx.fill();
          }
          bctx.globalAlpha = 1;
        }

        bctx.restore();
      }

      return base;
    };

    const resize = () => {
      const dpr = Math.max(1, Math.min(2.0, window.devicePixelRatio || 1));
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = Math.max(1, Math.floor(parent.clientWidth));
      const h = Math.max(1, Math.floor(parent.clientHeight));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      baseRef.current = buildBase(960, 800);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener('resize', resize);

    const loop = (now: number) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = Math.max(1, parent.clientWidth);
      const h = Math.max(1, parent.clientHeight);

      ctx.clearRect(0, 0, w, h);

      const base = baseRef.current;
      if (base) {
        ctx.save();
        const sx = w / 120;
        const sy = h / 100;
        ctx.scale(sx, sy);

        const combinedS = view.s * focusParams.s;
        const combinedTx = view.s * focusParams.tx + view.tx;
        const combinedTy = view.s * focusParams.ty + view.ty;

        ctx.translate(combinedTx, combinedTy);
        ctx.scale(combinedS, combinedS);
        ctx.imageSmoothingEnabled = true;
        ctx.globalAlpha = 1;
        ctx.drawImage(base, 0, 0, 120, 100);

        const t = now / 1000;
        const river = new Path2D();
        river.moveTo(18, 18);
        river.bezierCurveTo(40, 28, 62, 58, 104, 82);

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(59,130,246,0.30)';
        ctx.lineWidth = 3.6;
        ctx.setLineDash([10, 18]);
        ctx.lineDashOffset = -t * 26;
        ctx.stroke(river);
        ctx.strokeStyle = 'rgba(147,197,253,0.16)';
        ctx.lineWidth = 6.2;
        ctx.setLineDash([18, 26]);
        ctx.lineDashOffset = -t * 18;
        ctx.stroke(river);
        ctx.restore();

        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.46;
        const sunA = t * 0.12;
        const lx = Math.cos(sunA);
        const ly = Math.sin(sunA) * 0.55 - 0.25;
        const g = ctx.createLinearGradient(0, 0, 120 * lx + 60, 100 * ly + 50);
        g.addColorStop(0, 'rgba(255,255,255,0.65)');
        g.addColorStop(1, 'rgba(2,6,23,0.95)');
        ctx.fillStyle = g;
        ctx.fillRect(-20, -20, 160, 140);
        ctx.restore();

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.22;
        const sun = ctx.createRadialGradient(60, 24, 0, 60, 24, 70);
        sun.addColorStop(0, 'rgba(255,255,255,0.25)');
        sun.addColorStop(0.35, 'rgba(56,189,248,0.08)');
        sun.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = sun;
        ctx.beginPath();
        ctx.arc(60, 24, 70, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        for (const r of regions) {
          const at = regionFxAt[r.id] ?? 0;
          if (!at) continue;
          const k = clamp01((now - at) / 3200);
          if (k <= 0) continue;
          const p = regionPathsRef.current[r.id];
          if (!p) continue;
          ctx.save();
          ctx.clip(p);
          ctx.globalCompositeOperation = 'screen';
          ctx.globalAlpha = 0.35 * (1 - Math.pow(1 - k, 2));
          const gg = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 22 + k * 28);
          gg.addColorStop(0, 'rgba(16,185,129,0.40)');
          gg.addColorStop(1, 'rgba(16,185,129,0)');
          ctx.fillStyle = gg;
          ctx.beginPath();
          ctx.arc(r.x, r.y, 22 + k * 28, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.restore();
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [biomeById, focusParams.s, focusParams.tx, focusParams.ty, regionFxAt, regions, seed, view.s, view.tx, view.ty, weatherByRegionId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.98, mixBlendMode: 'normal', filter: 'saturate(1.08) contrast(1.06)' }}
    />
  );
});

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

const hexToRgba = (hex: string, a: number) => {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const n = Number.parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const alpha = Math.max(0, Math.min(1, a));
  return `rgba(${r},${g},${b},${alpha})`;
};

const seedlings: Seedling[] = [
  { id: 's1', name: 'Mahoni', icon: Trees, description: 'Pohon pelindung dengan kayu kuat dan rindang.', color: '#15803d' },
  { id: 's2', name: 'Jati', icon: Trees, description: 'Kayu kualitas premium untuk investasi masa depan.', color: '#854d0e' },
  { id: 's3', name: 'Pinus', icon: Trees, description: 'Cocok untuk daerah pegunungan dan penghasil getah.', color: '#166534' },
];

const allRegions: Region[] = [
  // --- KOTA BANDUNG (Pusat) ---
  { id: 'bdg-bojonagara', name: 'Bojonagara (Kota)', status: 'kritis', description: 'Kawasan barat laut dengan vegetasi rapat dan kampus.', path: "M 45,35 L 50,25 L 60,35 L 55,45 L 40,45 Z", x: 50, y: 37 },
  { id: 'bdg-cibeunying', name: 'Cibeunying (Kota)', status: 'kritis', description: 'Kawasan timur laut yang mulai padat pemukiman.', path: "M 50,25 L 65,30 L 80,30 L 75,45 L 60,35 Z", x: 66, y: 33 },
  { id: 'bdg-ujungberung', name: 'Ujungberung (Kota)', status: 'kritis', description: 'Wilayah timur yang luas dengan area pegunungan.', path: "M 80,30 L 95,15 L 115,25 L 115,50 L 95,55 L 75,45 Z", x: 96, y: 36 },
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
  { id: 'kbb-lembang', name: 'Lembang (KBB)', status: 'kritis', description: 'Kawasan utara pegunungan yang sejuk namun padat villa.', path: "M 35,15 L 65,5 L 95,15 L 80,30 L 65,30 L 50,25 L 35,35 Z", x: 60, y: 20 },
  { id: 'cimahi', name: 'Kota Cimahi', status: 'kritis', description: 'Kota industri otonom yang sangat padat.', path: "M 35,35 L 45,35 L 40,45 L 30,45 Z", x: 37, y: 40 },
  { id: 'kbb-padalarang', name: 'Padalarang (KBB)', status: 'gersang', description: 'Pusat KBB, dikenal dengan kawasan tambang kapurnya.', path: "M 15,20 L 35,15 L 35,35 L 15,40 Z", x: 25, y: 27 },
  { id: 'kbb-cipatat', name: 'Cipatat & Rajamandala', status: 'gersang', description: 'Kawasan karst (kapur) yang kering di ujung barat.', path: "M 5,25 L 15,20 L 15,40 L 5,45 Z", x: 10, y: 32 },
  { id: 'kbb-cililin', name: 'Cililin & Sindangkerta', status: 'kritis', description: 'Kawasan barat daya dengan waduk dan perbukitan.', path: "M 5,45 L 15,40 L 30,45 L 35,55 L 30,65 L 15,70 L 5,60 Z", x: 18, y: 55 },
];

const RegionItem = memo(({ region, statusAnim, fxAt, isHovered, isFocused, focusActive, onHover, onClick }: {
  region: Region;
  statusAnim?: { from: Region['status']; to: Region['status']; at: number } | null;
  fxAt?: number;
  isHovered: boolean;
  isFocused: boolean;
  focusActive: boolean;
  onHover: (r: Region | null) => void;
  onClick: (r: Region) => void;
}) => {
  const isHijau = region.status === 'hijau';
  const fillUrl = `url(#grad-${region.status})`;
  const fromFillUrl = statusAnim ? `url(#grad-${statusAnim.from})` : fillUrl;
  const glowColor =
    region.status === 'hijau'
      ? 'rgba(16,185,129,0.55)'
      : region.status === 'kritis'
        ? 'rgba(245,158,11,0.60)'
        : 'rgba(239,68,68,0.62)';
  const isDimmed = (focusActive && !isFocused);
  const depth = isFocused ? 2.6 : isHovered ? 2.1 : 1.2;
  const identity =
    region.id === 'kbb-lembang' || region.id === 'kab-ciwidey' || region.id === 'kab-pangalengan'
      ? 'cold'
      : region.id === 'bdg-gedebage' || region.id === 'kab-majalaya' || region.id === 'kab-margahayu'
        ? 'industry'
        : region.id === 'kab-baleendah'
          ? 'flood'
          : 'neutral';
  const texFill = `url(#tex-${region.status})`;
  const texBaseOpacity =
    region.status === 'hijau'
      ? 0.14
      : region.status === 'kritis'
        ? 0.20
        : 0.22;
  const texOpacity = isDimmed ? 0.05 : (isHovered || isFocused ? texBaseOpacity * 1.65 : texBaseOpacity);
  const microTexFill =
    identity === 'cold'
      ? 'url(#micro-cold)'
      : identity === 'industry'
        ? 'url(#micro-industry)'
        : identity === 'flood'
          ? 'url(#micro-flood)'
          : 'url(#micro-neutral)';
  const microTexBaseOpacity =
    identity === 'cold'
      ? 0.18
      : identity === 'industry'
        ? 0.16
        : identity === 'flood'
          ? 0.18
          : 0.15;
  const microTexOpacity = isDimmed ? 0.035 : (isHovered || isFocused ? microTexBaseOpacity * 1.55 : microTexBaseOpacity);
  const strokeColor = isHovered || isFocused ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.32)';
  const pulseAttention = !isHijau && !isHovered && !isFocused && !isDimmed;
  const targetScale = isFocused ? 1.065 : isHovered ? 1.045 : 1;
  const innerGlowFilter = `url(#innerGlow-${region.status})`;
  const labelLinesFull = useMemo(() => {
    const cleaned = region.name.replace(/\s*\(.*?\)\s*/g, '').replace(/^Kota\s+/i, '').trim();
    const parts = cleaned.split('&').map(s => s.trim()).filter(Boolean);
    if (parts.length >= 2) return [parts[0], parts[1]];
    const words = cleaned.split(/\s+/).filter(Boolean);
    if (words.length <= 2) return [cleaned];
    return [`${words.slice(0, 2).join(' ')}`, `${words.slice(2).join(' ')}`];
  }, [region.name]);
  const labelLineCompact = useMemo(() => {
    const cleaned = region.name.replace(/\s*\(.*?\)\s*/g, '').replace(/^Kota\s+/i, '').trim();
    const firstPart = cleaned.split('&')[0]?.trim() ?? cleaned;
    const firstWord = firstPart.split(/\s+/).filter(Boolean)[0] ?? firstPart;
    return firstWord.length > 10 ? `${firstWord.slice(0, 10)}…` : firstWord;
  }, [region.name]);
  const showFullLabel = isHovered || isFocused;
  const labelLines = showFullLabel ? labelLinesFull : [labelLineCompact];
  const labelOffset = useMemo(() => {
    const map: Record<string, { dx: number; dy: number }> = {
      'bdg-bojonagara': { dx: 0, dy: 2 },
      'bdg-cibeunying': { dx: 0, dy: -2 },
      'bdg-ujungberung': { dx: -10, dy: 2 },
      'bdg-karees': { dx: 0, dy: 0 },
      'bdg-tegalega': { dx: 0, dy: 4 },
      'bdg-gedebage': { dx: -4, dy: 4 },
      'kab-margahayu': { dx: 0, dy: -2 },
      'kab-baleendah': { dx: -2, dy: 4 },
      'kab-soreang': { dx: -2, dy: -4 },
      'kab-ciwidey': { dx: 10, dy: -2 },
      'kab-pangalengan': { dx: 0, dy: -10 },
      'kab-majalaya': { dx: -10, dy: 2 },
      'kbb-lembang': { dx: 0, dy: 6 },
      cimahi: { dx: 2, dy: -8 },
      'kbb-padalarang': { dx: 6, dy: -2 },
      'kbb-cipatat': { dx: 10, dy: 0 },
      'kbb-cililin': { dx: 8, dy: 2 },
    };
    return map[region.id] ?? { dx: 0, dy: 0 };
  }, [region.id]);

  const labelBox = useMemo(() => {
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const w = showFullLabel ? (labelLines.length > 1 ? 40 : 34) : 26;
    const h = showFullLabel ? (labelLines.length > 1 ? 16 : 12) : 9;
    const x = clamp(region.x - w / 2 + labelOffset.dx, 2, 118 - w);
    const y = clamp(region.y - h / 2 + labelOffset.dy, 2, 98 - h);
    const fontSize =
      region.id === 'cimahi'
        ? (showFullLabel ? 5.4 : 4.2)
        : labelLines.length > 1
          ? (showFullLabel ? 5.2 : 4.2)
          : (showFullLabel ? 5.6 : 4.4);
    return { x, y, w, h, fontSize };
  }, [labelLines.length, labelOffset.dx, labelOffset.dy, region.id, region.x, region.y, showFullLabel]);

  const [animNow, setAnimNow] = useState(0);
  useEffect(() => {
    if (!statusAnim) return;
    const dur = 1200;
    const tick = () => {
      const now = Date.now();
      setAnimNow(now);
      if (now - statusAnim.at > dur + 120) window.clearInterval(t);
    };
    tick();
    const t = window.setInterval(tick, 50);
    return () => window.clearInterval(t);
  }, [statusAnim?.at, statusAnim?.from, statusAnim?.to]);
  const statusP = statusAnim ? clamp01((Math.max(statusAnim.at, animNow || Date.now()) - statusAnim.at) / 1200) : 1;
  const isRestoring = Boolean(statusAnim && statusAnim.to === 'hijau' && statusP < 1);
  const restoreGlow = fxAt ? clamp01((Date.now() - fxAt) / 1800) : 1;
  return (
    <motion.g
      data-region-id={region.id}
      onMouseEnter={() => onHover(region)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(region)}
      className={!isHijau ? 'cursor-pointer' : 'cursor-default'}
      animate={{
        scale: pulseAttention ? [1, region.status === 'gersang' ? 1.016 : 1.013, 1] : targetScale,
        opacity: isDimmed ? 0.12 : 1,
        filter: isDimmed
          ? 'blur(1.2px) saturate(0.72) brightness(0.65)'
          : isFocused
          ? `drop-shadow(0px 10px 18px rgba(0,0,0,0.38)) drop-shadow(0px 0px 26px ${glowColor})`
          : isHovered
            ? `drop-shadow(0px 8px 14px rgba(0,0,0,0.34)) drop-shadow(0px 0px 20px ${glowColor})`
            : 'drop-shadow(0px 2px 4px rgba(0,0,0,0.22))',
      }}
      transition={{
        scale: pulseAttention
          ? { repeat: Infinity, duration: region.status === 'gersang' ? 1.35 : 1.8, ease: 'easeInOut' }
          : { duration: 0.28, ease: 'easeOut' },
        opacity: { duration: 0.28, ease: 'easeOut' },
        filter: { duration: 0.28, ease: 'easeOut' },
      }}
      style={{ transformOrigin: `${region.x}px ${region.y}px` }}
    >
      <path
        d={region.path}
        fill="rgba(0,0,0,0.65)"
        opacity={isDimmed ? 0.06 : 0.18}
        transform={`translate(0 ${depth})`}
        className="pointer-events-none"
      />
      <path
        d={region.path}
        fill="transparent"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth={isHovered || isFocused ? 0.9 : 0.55}
        opacity={isDimmed ? 0.06 : 0.55}
        transform={`translate(0 ${-0.65})`}
        strokeLinejoin="round"
        className="pointer-events-none"
      />
      <path
        d={region.path}
        fill={fromFillUrl}
        fillOpacity={
          isDimmed
            ? 0.15
            : statusAnim && statusAnim.from !== region.status
              ? (1 - statusP) * (isHovered || isFocused ? 1 : 0.92)
              : 0
        }
        stroke={strokeColor}
        strokeWidth={isHovered || isFocused ? 0.7 : 0.25}
        strokeLinejoin="round"
        filter={isDimmed ? undefined : innerGlowFilter}
        className="pointer-events-none"
      />
      <path
        d={region.path}
        fill={fillUrl}
        fillOpacity={
          isDimmed
            ? 0.35
            : statusAnim && statusAnim.from !== region.status
              ? statusP * (isHovered || isFocused ? 1 : 0.90)
              : (isHovered || isFocused ? 1 : 0.86)
        }
        stroke={strokeColor}
        strokeWidth={isHovered || isFocused ? 0.7 : 0.25}
        strokeLinejoin="round"
        filter={isDimmed ? undefined : innerGlowFilter}
      />
      {region.status === 'gersang' && !isDimmed && (
        <path
          d={region.path}
          fill="rgba(2,6,23,0.18)"
          opacity={isHovered || isFocused ? 0.48 : 0.34}
          filter="url(#heatHazeDust)"
          className="pointer-events-none"
        />
      )}
      {region.status === 'hijau' && !isDimmed && (
        <path
          d={region.path}
          fill="url(#sunGlint)"
          opacity={isHovered || isFocused ? 0.26 : 0.15}
          filter="url(#softFog)"
          className="pointer-events-none"
        />
      )}
      {region.status === 'kritis' && !isDimmed && (
        <path
          d={region.path}
          fill="rgba(255,255,255,0.10)"
          opacity={isHovered || isFocused ? 0.22 : 0.10}
          className="pointer-events-none"
        />
      )}
      {identity === 'cold' && !isDimmed && (
        <motion.path
          d={region.path}
          fill="rgba(248,250,252,0.10)"
          filter="url(#softFog)"
          initial={false}
          animate={{ opacity: isHovered || isFocused ? [0.10, 0.22, 0.10] : [0.06, 0.12, 0.06] }}
          transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
          className="pointer-events-none"
        />
      )}
      {identity === 'industry' && !isDimmed && (
        <motion.path
          d={region.path}
          fill="rgba(148,163,184,0.10)"
          initial={false}
          animate={{ opacity: isHovered || isFocused ? [0.06, 0.16, 0.06] : [0.04, 0.10, 0.04] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="pointer-events-none"
        />
      )}
      {identity === 'flood' && !isDimmed && (
        <motion.path
          d={region.path}
          fill="rgba(59,130,246,0.10)"
          initial={false}
          animate={{ opacity: isHovered || isFocused ? [0.08, 0.18, 0.08] : [0.05, 0.10, 0.05] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          className="pointer-events-none"
        />
      )}
      <path
        d={region.path}
        fill="transparent"
        stroke={glowColor}
        strokeWidth={isHovered || isFocused ? 1.6 : 0}
        opacity={isHovered || isFocused ? 0.55 : 0}
        strokeLinejoin="round"
        className="pointer-events-none"
      />
      <motion.path
        d={region.path}
        fill={texFill}
        initial={false}
        animate={{
          opacity: (isHovered || isFocused) && !isDimmed ? [texOpacity * 0.92, texOpacity * 1.10, texOpacity * 0.92] : texOpacity,
        }}
        transition={{ repeat: (isHovered || isFocused) && !isDimmed ? Infinity : 0, duration: region.status === 'hijau' ? 3.6 : region.status === 'kritis' ? 2.4 : 2.1, ease: 'easeInOut' }}
        className="pointer-events-none"
      />
      <motion.path
        d={region.path}
        fill={microTexFill}
        initial={false}
        animate={{
          opacity: (isHovered || isFocused) && !isDimmed ? [microTexOpacity * 0.88, microTexOpacity * 1.18, microTexOpacity * 0.88] : microTexOpacity,
        }}
        transition={{
          repeat: (isHovered || isFocused) && !isDimmed ? Infinity : 0,
          duration: identity === 'flood' ? 2.6 : identity === 'cold' ? 4.4 : 3.2,
          ease: 'easeInOut',
        }}
        className="pointer-events-none"
      />
      {isRestoring && !isDimmed && (
        <motion.path
          d={region.path}
          fill="rgba(16,185,129,0.10)"
          initial={false}
          animate={{ opacity: [0.05, 0.22, 0.05] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="pointer-events-none"
        />
      )}
      <motion.path
        d={region.path}
        fill="transparent"
        stroke={region.status === 'hijau' ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.32)'}
        strokeWidth={0.6}
        strokeDasharray={region.status === 'hijau' ? '0 999' : region.status === 'kritis' ? '3 10' : '2 8'}
        animate={
          isDimmed
            ? { opacity: 0 }
            : (region.status === 'hijau' ? { opacity: isHovered || isFocused ? 0.22 : 0.12 } : { strokeDashoffset: [0, -28], opacity: isHovered || isFocused ? 0.34 : 0.18 })
        }
        transition={region.status === 'hijau' ? { duration: 0.25 } : { repeat: Infinity, duration: region.status === 'kritis' ? 1.2 : 0.95, ease: 'linear' }}
        strokeLinejoin="round"
        className="pointer-events-none"
      />
      
      {/* Interactive Markers */}
      {!isHijau ? (
        <g transform={`translate(${region.x}, ${region.y})`}>
          {(isHovered || isFocused) && <circle r="3.5" fill="white" opacity="0.22" className="animate-ping" />}
          {!isHovered && !isFocused && (
            <motion.circle
              r="3.8"
              fill="white"
              opacity="0.10"
              animate={{ r: [3.2, 4.6, 3.2], opacity: [0.08, 0.16, 0.08] }}
              transition={{ repeat: Infinity, duration: region.status === 'gersang' ? 1.6 : 2.2, ease: 'easeInOut' }}
            />
          )}
          <circle r="1.5" fill="white" className="drop-shadow-md" />
          <circle r="0.6" fill={region.status === 'kritis' ? '#f59e0b' : '#ef4444'} />
        </g>
      ) : (
        <g transform={`translate(${region.x}, ${region.y})`}>
          <circle r="1" fill="#a7f3d0" opacity="0.6" />
        </g>
      )}

      <foreignObject
        x={labelBox.x}
        y={labelBox.y}
        width={labelBox.w}
        height={labelBox.h}
        className="pointer-events-none"
        style={{ opacity: showFullLabel ? 0.98 : 0.60 }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: showFullLabel ? (labelLines.length > 1 ? '1px 6px' : '1px 7px') : '0px 4px',
              borderRadius: 999,
              background: showFullLabel ? 'rgba(2,6,23,0.46)' : 'rgba(2,6,23,0.28)',
              border: showFullLabel ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: showFullLabel ? '0 8px 18px rgba(0,0,0,0.26)' : '0 5px 12px rgba(0,0,0,0.20)',
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 900,
              fontSize: `${labelBox.fontSize}px`,
              lineHeight: 1.05,
              letterSpacing: '0.01em',
              textTransform: 'none',
              textAlign: 'center',
              textShadow: showFullLabel ? '0 2px 6px rgba(0,0,0,0.5)' : '0 1px 3px rgba(0,0,0,0.5)',
              maxWidth: '100%',
            }}
          >
            {labelLines.length > 1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <div>{labelLines[0]}</div>
                <div style={{ opacity: 0.92 }}>{labelLines[1]}</div>
              </div>
            ) : (
              <div>{labelLines[0]}</div>
            )}
          </div>
        </div>
      </foreignObject>
    </motion.g>
  );
});

const InteractiveMap = memo(({
  regions,
  onHover,
  hoveredRegion,
  onSelect,
  weatherByRegionId,
  regionFxAt,
  restorationWave,
  statusAnimByRegionId,
  focusedRegionId,
  onResetFocus,
}: {
  regions: Region[];
  onHover: (r: Region | null) => void;
  hoveredRegion: Region | null;
  onSelect: (r: Region) => void;
  weatherByRegionId: Record<string, MapWeather>;
  regionFxAt: Record<string, number>;
  restorationWave?: { id: number; regionId: string } | null;
  statusAnimByRegionId: Record<string, { from: Region['status']; to: Region['status']; at: number }>;
  focusedRegionId?: string | null;
  onResetFocus?: () => void;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const [filters, setFilters] = useState<{ hijau: boolean; kritis: boolean; gersang: boolean }>({ hijau: true, kritis: true, gersang: true });
  const [legendOpen, setLegendOpen] = useState(false);
  const focusActive = Boolean(focusedRegionId);
  const [ripple, setRipple] = useState<{ id: string; key: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [tooltipSize, setTooltipSize] = useState({ w: 220, h: 120 });
  const [liveTick, setLiveTick] = useState(0);
  const [cursorInside, setCursorInside] = useState(false);
  const lastHoverSoundAtRef = useRef(0);
  const lastHoverIdRef = useRef<string | null>(null);
  const [view, setView] = useState<{ s: number; tx: number; ty: number }>({ s: 1, tx: 0, ty: 0 });
  const viewRef = useRef<{ s: number; tx: number; ty: number }>({ s: 1, tx: 0, ty: 0 });
  const dragRef = useRef<{
    active: boolean;
    pointerId: number | null;
    sx: number;
    sy: number;
    stx: number;
    sty: number;
  }>({ active: false, pointerId: null, sx: 0, sy: 0, stx: 0, sty: 0 });
  const inertiaRafRef = useRef<number | null>(null);
  const inertiaVelRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const lastDragSampleRef = useRef<{ tx: number; ty: number; t: number } | null>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const updateRect = () => {
      const r = el.getBoundingClientRect();
      rectRef.current = r;
      setContainerSize({ w: r.width, h: r.height });
    };
    updateRect();
    const ro = new ResizeObserver(updateRect);
    ro.observe(el);
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, []);

  useEffect(() => {
    if (!hoveredRegion) return;
    const el = tooltipRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setTooltipSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [hoveredRegion]);

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!hoveredRegion) return;
    if (!filters[hoveredRegion.status]) onHover(null);
  }, [filters, hoveredRegion, onHover]);

  useEffect(() => {
    if (!focusedRegionId) return;
    setRipple({ id: focusedRegionId, key: Date.now() });
  }, [focusedRegionId]);

  const visibleRegions = useMemo(() => {
    return regions.filter(r => filters[r.status]);
  }, [filters, regions]);

  const rippleTarget = useMemo(() => {
    if (!ripple) return null;
    return regions.find(r => r.id === ripple.id) ?? null;
  }, [regions, ripple]);

  const focusParams = useMemo(() => {
    const s = focusActive ? 1.35 : 1;
    const centerX = 60;
    const centerY = 50;
    const target = focusActive
      ? (focusedRegionId ? regions.find(r => r.id === focusedRegionId) : null)
      : null;
    if (!target) return { s: 1, tx: 0, ty: 0 };
    const rawTx = centerX - target.x * s;
    const rawTy = centerY - target.y * s;
    const minTx = 120 * (1 - s);
    const maxTx = 0;
    const minTy = 100 * (1 - s);
    const maxTy = 0;
    const tx = Math.max(minTx, Math.min(maxTx, rawTx));
    const ty = Math.max(minTy, Math.min(maxTy, rawTy));
    return { s, tx, ty };
  }, [focusActive, focusedRegionId, regions]);

  const focusTransform = useMemo(() => {
    return `translate(${focusParams.tx}px, ${focusParams.ty}px) scale(${focusParams.s})`;
  }, [focusParams.s, focusParams.tx, focusParams.ty]);

  const zoomNow = useMemo(() => {
    return Math.max(1, Math.min(2.25, view.s * focusParams.s));
  }, [focusParams.s, view.s]);

  const viewTransform = useMemo(() => {
    return `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`;
  }, [view.s, view.tx, view.ty]);

  useEffect(() => {
    const t = window.setInterval(() => setLiveTick(v => (v + 1) % 1000000), 850);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!hoveredRegion) return;
    const now = Date.now();
    if (lastHoverIdRef.current === hoveredRegion.id) return;
    if (now - lastHoverSoundAtRef.current < 90) return;
    lastHoverSoundAtRef.current = now;
    lastHoverIdRef.current = hoveredRegion.id;
  }, [hoveredRegion]);

  const bgShiftX = useTransform(smoothX, (x) => {
    const w = Math.max(1, containerSize.w);
    return ((x / w) - 0.5) * 16;
  });
  const bgShiftY = useTransform(smoothY, (y) => {
    const h = Math.max(1, containerSize.h);
    return ((y / h) - 0.5) * 14;
  });

  const tint: 'eco' | 'heat' | 'smog' = useMemo(() => {
    const h = hoveredRegion?.status ?? null;
    if (h === 'gersang') return 'heat';
    if (h === 'kritis') return 'smog';
    return 'eco';
  }, [hoveredRegion?.status]);

  const hoveredVitals = useMemo(() => {
    if (!hoveredRegion) return null;
    const w = weatherByRegionId[hoveredRegion.id] ?? 'sun';
    const t01 = ((liveTick % 1200) / 1200);
    return deriveRegionVitals(hoveredRegion, w, t01);
  }, [hoveredRegion, liveTick, weatherByRegionId]);

  const hoveredWeather = useMemo(() => {
    if (!hoveredRegion) return null;
    return weatherByRegionId[hoveredRegion.id] ?? 'sun';
  }, [hoveredRegion, weatherByRegionId]);

  const applyViewClamp = useCallback((s: number, tx: number, ty: number) => {
    const cs = Math.max(1, Math.min(2.25, s));
    const minTx = 120 * (1 - cs);
    const minTy = 100 * (1 - cs);
    const ctx = Math.max(minTx, Math.min(0, tx));
    const cty = Math.max(minTy, Math.min(0, ty));
    const next = { s: cs, tx: ctx, ty: cty };
    viewRef.current = next;
    setView(next);
  }, []);

  const clientToViewBox = useCallback((clientX: number, clientY: number) => {
    const rect = rectRef.current ?? mapRef.current?.getBoundingClientRect() ?? null;
    if (!rect) return null;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const vx = (x / Math.max(1, rect.width)) * 120;
    const vy = (y / Math.max(1, rect.height)) * 100;
    return { vx, vy, x, y, rect };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = rectRef.current ?? mapRef.current?.getBoundingClientRect() ?? null;
    if (!rect) return;
    rectRef.current = rect;
    pendingRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const p = pendingRef.current;
      if (!p) return;
      mouseX.set(p.x);
      mouseY.set(p.y);
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    const p = clientToViewBox(e.clientX, e.clientY);
    if (!p) return;
    e.preventDefault();
    if (inertiaRafRef.current) window.cancelAnimationFrame(inertiaRafRef.current);
    inertiaRafRef.current = null;
    const cur = viewRef.current;
    const speed = e.deltaMode === 1 ? 0.14 : 0.09;
    const dir = e.deltaY > 0 ? -1 : 1;
    const ns = Math.max(1, Math.min(2.25, cur.s * (1 + dir * speed)));
    const ntx = cur.tx + (cur.s - ns) * p.vx;
    const nty = cur.ty + (cur.s - ns) * p.vy;
    applyViewClamp(ns, ntx, nty);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const root = mapRef.current;
    if (!root) return;
    if (inertiaRafRef.current) window.cancelAnimationFrame(inertiaRafRef.current);
    inertiaRafRef.current = null;
    inertiaVelRef.current = { vx: 0, vy: 0 };
    const target = e.target as HTMLElement | null;
    if (target && target.closest && target.closest('[data-region-id]')) return;
    const p = clientToViewBox(e.clientX, e.clientY);
    if (!p) return;
    dragRef.current = { active: true, pointerId: e.pointerId, sx: p.x, sy: p.y, stx: viewRef.current.tx, sty: viewRef.current.ty };
    lastDragSampleRef.current = { tx: viewRef.current.tx, ty: viewRef.current.ty, t: performance.now() };
    try { root.setPointerCapture(e.pointerId); } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    if (dragRef.current.pointerId !== e.pointerId) return;
    const rect = rectRef.current ?? mapRef.current?.getBoundingClientRect() ?? null;
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dxPx = x - dragRef.current.sx;
    const dyPx = y - dragRef.current.sy;
    const dxV = (dxPx / Math.max(1, rect.width)) * 120;
    const dyV = (dyPx / Math.max(1, rect.height)) * 100;
    const ntx = dragRef.current.stx + dxV;
    const nty = dragRef.current.sty + dyV;
    const now = performance.now();
    const prev = lastDragSampleRef.current;
    if (prev) {
      const dt = Math.max(0.001, Math.min(0.05, (now - prev.t) / 1000));
      inertiaVelRef.current = { vx: (ntx - prev.tx) / dt, vy: (nty - prev.ty) / dt };
    }
    lastDragSampleRef.current = { tx: ntx, ty: nty, t: now };
    applyViewClamp(viewRef.current.s, ntx, nty);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const root = mapRef.current;
    if (dragRef.current.pointerId === e.pointerId) {
      dragRef.current.active = false;
      dragRef.current.pointerId = null;
      try { if (root) root.releasePointerCapture(e.pointerId); } catch {}
    }
    lastDragSampleRef.current = null;
    const start = performance.now();
    const startVel = inertiaVelRef.current;
    const maxV = 180;
    const v0 = {
      vx: Math.max(-maxV, Math.min(maxV, startVel.vx)),
      vy: Math.max(-maxV, Math.min(maxV, startVel.vy)),
    };
    if (Math.hypot(v0.vx, v0.vy) < 18) return;
    let last = start;
    const loop = (now: number) => {
      const dt = Math.max(0.001, Math.min(0.05, (now - last) / 1000));
      last = now;
      const cur = viewRef.current;
      const damp = Math.pow(0.0015, dt);
      v0.vx *= damp;
      v0.vy *= damp;
      if (Math.hypot(v0.vx, v0.vy) < 8) {
        inertiaRafRef.current = null;
        return;
      }
      const ntx = cur.tx + v0.vx * dt;
      const nty = cur.ty + v0.vy * dt;
      const cs = cur.s;
      const minTx = 120 * (1 - cs);
      const minTy = 100 * (1 - cs);
      const clampedTx = Math.max(minTx, Math.min(0, ntx));
      const clampedTy = Math.max(minTy, Math.min(0, nty));
      if (clampedTx !== ntx) v0.vx *= 0.15;
      if (clampedTy !== nty) v0.vy *= 0.15;
      applyViewClamp(cs, clampedTx, clampedTy);
      inertiaRafRef.current = window.requestAnimationFrame(loop);
    };
    inertiaRafRef.current = window.requestAnimationFrame(loop);
  };

  const zoomBy = (k: number) => {
    const rect = rectRef.current ?? mapRef.current?.getBoundingClientRect() ?? null;
    const cur = viewRef.current;
    if (!rect) return;
    if (inertiaRafRef.current) window.cancelAnimationFrame(inertiaRafRef.current);
    inertiaRafRef.current = null;
    const cx = 60;
    const cy = 50;
    const ns = Math.max(1, Math.min(2.25, cur.s * k));
    const ntx = cur.tx + (cur.s - ns) * cx;
    const nty = cur.ty + (cur.s - ns) * cy;
    applyViewClamp(ns, ntx, nty);
  };

  const resetView = () => {
    if (inertiaRafRef.current) window.cancelAnimationFrame(inertiaRafRef.current);
    inertiaRafRef.current = null;
    applyViewClamp(1, 0, 0);
  };

  const tooltipX = useTransform(smoothX, (x) => {
    const pad = 10;
    const w = Math.max(0, containerSize.w);
    const tw = Math.max(0, tooltipSize.w);
    if (w <= 0 || tw <= 0) return x + 16;
    const preferred = 16;
    const rightOverflow = x + preferred + tw > w - pad;
    const dx = rightOverflow ? (-tw - 16) : preferred;
    const raw = x + dx;
    return Math.max(pad, Math.min(w - tw - pad, raw));
  });

  const tooltipY = useTransform(smoothY, (y) => {
    const pad = 10;
    const h = Math.max(0, containerSize.h);
    const th = Math.max(0, tooltipSize.h);
    if (h <= 0 || th <= 0) return y + 14;
    const preferred = 14;
    const bottomOverflow = y + preferred + th > h - pad;
    const dy = bottomOverflow ? (-th - 14) : preferred;
    const raw = y + dy;
    return Math.max(pad, Math.min(h - th - pad, raw));
  });
  const cursorMascotX = useTransform(smoothX, (x) => {
    const w = Math.max(1, containerSize.w);
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    return clamp(x, 34, w - 34);
  });
  const cursorMascotY = useTransform(smoothY, (y) => {
    const h = Math.max(1, containerSize.h);
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    return clamp(y, 58, h - 18);
  });
  const cursorMascotLine = useMemo(() => {
    if (!hoveredRegion) return null;
    if (hoveredRegion.status === 'hijau') return 'Lestari: jaga tutupan hijau & rawat rutin.';
    if (hoveredRegion.status === 'kritis') return 'Kritis: tambah pohon & kurangi polusi.';
    return 'Gersang: butuh penanganan cepat & banyak penanaman.';
  }, [hoveredRegion]);

  return (
    <div 
      ref={mapRef}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        if (mapRef.current) rectRef.current = mapRef.current.getBoundingClientRect();
        setCursorInside(true);
      }}
      onMouseLeave={() => {
        setCursorInside(false);
        onHover(null);
      }}
      className="relative bg-[#0b1220] rounded-[2rem] border border-white/10 aspect-[4/3] overflow-hidden shadow-2xl"
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute inset-0 opacity-45" style={{ x: bgShiftX, y: bgShiftY, backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0b1220 70%, #020617 100%)' }} />
        <motion.div className="absolute inset-0 opacity-18" style={{ x: useTransform(bgShiftX, v => -v * 0.8), y: useTransform(bgShiftY, v => -v * 0.8), backgroundImage: 'linear-gradient(rgba(56,189,248,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <motion.div className="absolute inset-0 opacity-10" style={{ x: useTransform(bgShiftX, v => v * 0.55), y: useTransform(bgShiftY, v => v * 0.55), backgroundImage: 'linear-gradient(rgba(148,163,184,0.26) 2px, transparent 2px), linear-gradient(90deg, rgba(148,163,184,0.18) 2px, transparent 2px)', backgroundSize: '110px 110px' }} />
        <motion.div
          className="absolute -inset-10 opacity-30 blur-2xl"
          animate={{ backgroundPosition: ['0% 0%', '100% 70%', '0% 0%'] }}
          transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 22%, rgba(16,185,129,0.18) 0 240px, transparent 620px), radial-gradient(circle at 82% 24%, rgba(56,189,248,0.14) 0 220px, transparent 600px), radial-gradient(circle at 52% 84%, rgba(245,158,11,0.10) 0 260px, transparent 640px)',
            backgroundSize: '180% 180%',
          }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 140px rgba(0,0,0,0.85), inset 0 0 220px rgba(2,6,23,0.85)' }} />
      </div>

      <motion.div
        className="absolute left-1/2 bottom-4 w-[78%] h-20 -translate-x-1/2 pointer-events-none blur-2xl opacity-70"
        animate={{ opacity: [0.35, 0.62, 0.35], scale: [0.98, 1.03, 0.98] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0) 70%)',
          mixBlendMode: 'multiply',
        }}
      />

      <MapAmbientCanvas intensity01={0.9} seed={1337} tint={tint} />
      <AnimatePresence>
        {cursorInside && (
          <motion.div
            className="absolute z-[19] pointer-events-none"
            style={{
              left: 0,
              top: 0,
              x: smoothX,
              y: smoothY,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full"
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.98, 1.03, 0.98] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              style={{
                background:
                  'radial-gradient(circle, rgba(56,189,248,0.18) 0 10px, rgba(16,185,129,0.10) 22px, rgba(255,255,255,0.0) 34px)',
                filter: 'blur(0.2px)',
                mixBlendMode: 'screen',
              }}
            />
            <div className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute -inset-10 pointer-events-none opacity-35 blur-xl"
        animate={{ x: ['-12%', '12%', '-12%'] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(248,250,252,0.10) 0 140px, transparent 360px), radial-gradient(circle at 60% 40%, rgba(248,250,252,0.08) 0 160px, transparent 420px), radial-gradient(circle at 80% 25%, rgba(248,250,252,0.06) 0 120px, transparent 360px)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        className="absolute -inset-12 pointer-events-none blur-3xl opacity-55"
        animate={{ x: [-22, 18, -22], y: [10, -8, 10] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
        style={{
          mixBlendMode: 'screen',
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0 220px, transparent 560px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0 240px, transparent 600px), radial-gradient(circle at 40% 80%, rgba(56,189,248,0.06) 0 260px, transparent 640px)',
        }}
      />
      <motion.div
        className="absolute -inset-12 pointer-events-none blur-3xl opacity-45"
        animate={{ x: [16, -18, 16], y: [-12, 10, -12] }}
        transition={{ repeat: Infinity, duration: 19, ease: 'easeInOut' }}
        style={{
          mixBlendMode: 'screen',
          backgroundImage:
            'radial-gradient(circle at 60% 20%, rgba(148,163,184,0.06) 0 260px, transparent 640px), radial-gradient(circle at 20% 70%, rgba(16,185,129,0.05) 0 240px, transparent 620px)',
        }}
      />

      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="px-4 py-3 rounded-2xl bg-white/6 border border-white/12 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
          <div className="text-[9px] font-black text-white/55 uppercase tracking-[0.26em]">Kontrol Peta</div>
          <div className="mt-1 flex items-center gap-3 text-[10px] font-black text-white/75 uppercase tracking-wider">
            <span className="inline-flex items-center gap-2">
              <Move size={14} className="text-white/55" />
              Drag
            </span>
            <span className="text-white/25">•</span>
            <span className="inline-flex items-center gap-2">
              <MousePointer2 size={14} className="text-white/55" />
              Klik Wilayah
            </span>
            <span className="text-white/25">•</span>
            <span className="text-white/70">Zoom {Math.round(zoomNow * 100)}%</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hoveredRegion && containerSize.w > 0 && containerSize.h > 0 && (
          <motion.svg
            key={`energy-${hoveredRegion.id}`}
            className="absolute inset-0 pointer-events-none z-[18]"
            viewBox={`0 0 ${containerSize.w} ${containerSize.h}`}
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {(() => {
              const combinedS = view.s * focusParams.s;
              const combinedTx = view.s * focusParams.tx + view.tx;
              const combinedTy = view.s * focusParams.ty + view.ty;
              const rx = combinedS * hoveredRegion.x + combinedTx;
              const ry = combinedS * hoveredRegion.y + combinedTy;
              const x2 = (rx / 120) * containerSize.w;
              const y2 = (ry / 100) * containerSize.h;
              return (
                <>
                  <motion.line
                    x1={smoothX}
                    y1={smoothY}
                    x2={x2}
                    y2={y2}
                    initial={false}
                    animate={{
                      opacity: [0.15, 0.45, 0.15],
                      strokeDashoffset: [0, -48],
                    }}
                    transition={{ repeat: Infinity, duration: 1.25, ease: 'linear' }}
                    stroke="rgba(56,189,248,0.32)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="10 14"
                  />
                  <motion.circle
                    cx={x2}
                    cy={y2}
                    r={0}
                    initial={false}
                    animate={{ r: [6, 16, 6], opacity: [0.10, 0.22, 0.10] }}
                    transition={{ repeat: Infinity, duration: 1.35, ease: 'easeInOut' }}
                    fill="rgba(16,185,129,0.10)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth={1}
                  />
                </>
              );
            })()}
          </motion.svg>
        )}
      </AnimatePresence>

      <div className="absolute top-4 right-4 z-20 pointer-events-auto flex items-center gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => zoomBy(1.14)}
          className="w-10 h-10 rounded-2xl bg-white/8 border border-white/14 backdrop-blur-xl shadow-[0_20px_46px_rgba(0,0,0,0.55)] hover:bg-white/10 transition-all text-white font-black"
        >
          +
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => zoomBy(0.88)}
          className="w-10 h-10 rounded-2xl bg-white/8 border border-white/14 backdrop-blur-xl shadow-[0_20px_46px_rgba(0,0,0,0.55)] hover:bg-white/10 transition-all text-white font-black"
        >
          −
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={resetView}
          className="px-3 h-10 rounded-2xl bg-white/8 border border-white/14 backdrop-blur-xl shadow-[0_20px_46px_rgba(0,0,0,0.55)] hover:bg-white/10 transition-all text-[10px] text-white/80 font-black uppercase tracking-widest"
        >
          Reset
        </motion.button>
      </div>

      <div className="absolute top-4 left-4 z-20 pointer-events-auto">
        <div
          className="relative"
          onMouseEnter={() => setLegendOpen(true)}
          onMouseLeave={() => setLegendOpen(false)}
        >
          <motion.button
            type="button"
            aria-label="Legenda status wilayah"
            onFocus={() => setLegendOpen(true)}
            onBlur={() => setLegendOpen(false)}
            onClick={() => setLegendOpen(v => !v)}
            whileTap={{ scale: 0.96 }}
            className="w-10 h-10 rounded-2xl bg-white/8 border border-white/14 backdrop-blur-xl shadow-[0_20px_46px_rgba(0,0,0,0.55)] hover:bg-white/10 transition-all overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 30%, rgba(34,197,94,0.22) 0 16px, transparent 34px), radial-gradient(circle at 72% 42%, rgba(245,158,11,0.22) 0 16px, transparent 34px), radial-gradient(circle at 60% 78%, rgba(239,68,68,0.18) 0 18px, transparent 40px), linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.18) 100%)',
            }}
          >
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.14) 0 12px, transparent 34px)' }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="w-[7px] h-[7px] rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_10px_rgba(16,185,129,0.55)]" />
              <span className="w-[7px] h-[7px] rounded-full bg-gradient-to-br from-[#fbbf24] to-[#d97706] shadow-[0_0_10px_rgba(245,158,11,0.55)]" />
              <span className="w-[7px] h-[7px] rounded-full bg-gradient-to-br from-[#f87171] to-[#dc2626] shadow-[0_0_10px_rgba(239,68,68,0.55)]" />
            </div>
          </motion.button>

          <AnimatePresence>
            {legendOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="absolute left-0 mt-2 w-[248px] bg-white/6 p-3 rounded-2xl border border-white/12 backdrop-blur-2xl text-[10px] font-black uppercase text-slate-100 shadow-[0_26px_60px_rgba(0,0,0,0.55)] overflow-hidden"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 18% 22%, rgba(34,197,94,0.10) 0 70px, rgba(0,0,0,0.0) 150px), radial-gradient(circle at 80% 35%, rgba(245,158,11,0.10) 0 80px, rgba(0,0,0,0.0) 170px), radial-gradient(circle at 78% 78%, rgba(239,68,68,0.08) 0 90px, rgba(0,0,0,0.0) 190px), linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 55%, rgba(0,0,0,0.26) 100%)',
                }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14) 0 70px, rgba(255,255,255,0.02) 160px), radial-gradient(circle at 12% 70%, rgba(16,185,129,0.10) 0 90px, transparent 220px)' }} />
                <div className="flex items-center justify-between gap-2">
                  <div className="tracking-widest text-slate-200/80">Legenda</div>
                  <button
                    type="button"
                    onClick={() => setFilters({ hijau: true, kritis: true, gersang: true })}
                    className="px-2 py-1 rounded-xl bg-white/10 border border-white/10 text-[9px] tracking-widest text-slate-200/80 hover:bg-white/15 active:scale-95 transition-all"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 text-[9px] font-extrabold tracking-wider normal-case">
                  <div className="flex items-start gap-2">
                    <span className="mt-[3px] w-3 h-3 rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_10px_rgba(16,185,129,0.55)]" />
                    <div>
                      <div className="uppercase tracking-widest text-slate-100">Hijau • Lestari</div>
                      <div className="text-slate-200/70">Vegetasi baik, kondisi stabil.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-[3px] w-3 h-3 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#d97706] shadow-[0_0_10px_rgba(245,158,11,0.55)]" />
                    <div>
                      <div className="uppercase tracking-widest text-slate-100">Kuning • Kritis</div>
                      <div className="text-slate-200/70">Perlu perhatian & aksi.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-[3px] w-3 h-3 rounded-full bg-gradient-to-br from-[#f87171] to-[#dc2626] shadow-[0_0_10px_rgba(239,68,68,0.55)]" />
                    <div>
                      <div className="uppercase tracking-widest text-slate-100">Merah • Gersang</div>
                      <div className="text-slate-200/70">Butuh penanganan cepat.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <motion.button
                    type="button"
                    onClick={() => setFilters(p => ({ ...p, hijau: !p.hijau }))}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2 border transition-all ${
                      filters.hijau ? 'bg-white/8 border-white/12' : 'bg-white/3 border-white/8 opacity-60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#34d399] to-[#059669] shadow-[0_0_10px_rgba(16,185,129,0.55)]" />
                      Lestari
                    </span>
                    <span className="text-[9px] tracking-widest text-slate-200/70">{filters.hijau ? 'ON' : 'OFF'}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setFilters(p => ({ ...p, kritis: !p.kritis }))}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2 border transition-all ${
                      filters.kritis ? 'bg-white/8 border-white/12' : 'bg-white/3 border-white/8 opacity-60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#d97706] shadow-[0_0_10px_rgba(245,158,11,0.55)]" />
                      Kritis
                    </span>
                    <span className="text-[9px] tracking-widest text-slate-200/70">{filters.kritis ? 'ON' : 'OFF'}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setFilters(p => ({ ...p, gersang: !p.gersang }))}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2 border transition-all ${
                      filters.gersang ? 'bg-white/8 border-white/12' : 'bg-white/3 border-white/8 opacity-60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#f87171] to-[#dc2626] shadow-[0_0_10px_rgba(239,68,68,0.55)]" />
                      Gersang
                    </span>
                    <span className="text-[9px] tracking-widest text-slate-200/70">{filters.gersang ? 'ON' : 'OFF'}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {hoveredRegion && cursorMascotLine && (
          <motion.div
            className="absolute z-30 pointer-events-none"
            style={{ left: cursorMascotX, top: cursorMascotY, transform: 'translate(-50%, -100%)' }}
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="mb-2 px-3 py-2 rounded-2xl border border-white/12 backdrop-blur-xl text-[10px] font-black text-white/90 shadow-[0_18px_34px_rgba(0,0,0,0.45)]"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 55%, rgba(0,0,0,0.20) 100%)',
                maxWidth: 220,
              }}
            >
              <div className="uppercase tracking-widest text-white/75">{hoveredRegion.name}</div>
              <div className="mt-1 text-white/90 normal-case font-extrabold tracking-normal">{cursorMascotLine}</div>
            </div>
            <motion.div
              aria-hidden
              className="relative w-[80px] h-[100px]"
              initial={false}
              animate={{ 
                rotate: hoveredRegion.status === 'gersang' ? [-3, 3, -3] : [-1.5, 1.5, -1.5], 
                y: [0, -3, 0] 
              }}
              transition={{ repeat: Infinity, duration: hoveredRegion.status === 'hijau' ? 2.0 : 1.5, ease: 'easeInOut' }}
            >
              {/* Monkey Tail */}
              <motion.div
                className="absolute -left-2 top-[50px] w-8 h-8 pointer-events-none"
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 50 50" className="w-full h-full opacity-70">
                  <path
                    d="M 40 10 Q 10 10 15 35 Q 20 45 35 35"
                    fill="none"
                    stroke="#6b3e23"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Monkey Body */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-[35px] w-[38px] h-[45px] rounded-[1.2rem] border-2 border-[#4a2c19] shadow-lg"
                style={{ 
                  backgroundColor: '#6b3e23',
                  backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)'
                }}
              >
                {/* Belly Patch */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-6 h-7 rounded-full bg-[#f3d5b5]/40" />
              </div>

              {/* Monkey Head */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[52px] h-[48px] rounded-full border-2 border-[#4a2c19] shadow-md z-10"
                style={{ 
                  backgroundColor: '#6b3e23',
                  backgroundImage: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)'
                }}
              >
                {/* Ears */}
                <div className="absolute -left-3 top-3 w-5 h-5 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: '#6b3e23' }}>
                  <div className="absolute inset-1 rounded-full bg-[#f3d5b5]/30" />
                </div>
                <div className="absolute -right-3 top-3 w-5 h-5 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: '#6b3e23' }}>
                  <div className="absolute inset-1 rounded-full bg-[#f3d5b5]/30" />
                </div>

                {/* Face Patch */}
                <div className="absolute left-1/2 -translate-x-1/2 top-3 w-[42px] h-[34px] rounded-[1rem] bg-[#f3d5b5] shadow-inner">
                  {/* Eyes */}
                  <div className="absolute left-[10px] top-[10px] w-2 h-2.5 rounded-full bg-slate-900" />
                  <div className="absolute right-[10px] top-[10px] w-2 h-2.5 rounded-full bg-slate-900" />
                  
                  {/* Nose */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[20px] w-2 h-1 bg-[#4a2c19]/40 rounded-full" />
                  
                  {/* Mouth */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-[24px] w-4 h-2 border-b-2 border-slate-900/60 ${hoveredRegion.status === 'hijau' ? 'rounded-b-full' : 'rounded-t-full'}`} />
                </div>

                {/* Hair */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-4 h-2 bg-[#6b3e23] rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
              </div>

              {/* Monkey Arms */}
              <motion.div 
                className="absolute left-[8px] top-[42px] w-4 h-10 rounded-full border-2 border-[#4a2c19] origin-top"
                animate={{ rotate: [-20, 10, -20] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{ backgroundColor: '#6b3e23' }}
              />
              <motion.div 
                className="absolute right-[8px] top-[42px] w-4 h-10 rounded-full border-2 border-[#4a2c19] origin-top"
                animate={{ rotate: [20, -10, 20] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.1 }}
                style={{ backgroundColor: '#6b3e23' }}
              >
                {/* Holding something small */}
                <div className="absolute -bottom-2 -right-1 w-5 h-5 rounded-lg bg-white border border-black/10 shadow-sm flex items-center justify-center">
                  <Sprout size={12} className="text-emerald-600" />
                </div>
              </motion.div>

              {/* Monkey Legs */}
              <div className="absolute left-[18px] bottom-[15px] w-4 h-6 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: '#6b3e23' }} />
              <div className="absolute right-[18px] bottom-[15px] w-4 h-6 rounded-full border-2 border-[#4a2c19]" style={{ backgroundColor: '#6b3e23' }} />
              
              {/* Shadow */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[46px] h-3 bg-black/20 rounded-full blur-sm" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {focusActive && onResetFocus && (
        <motion.button
          type="button"
          onClick={onResetFocus}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="absolute top-4 right-4 z-20 px-3 py-2 rounded-2xl bg-white/8 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-200 shadow-xl hover:bg-white/12 active:scale-95 transition-all"
        >
          Reset Fokus
        </motion.button>
      )}

      <svg viewBox="0 0 120 100" preserveAspectRatio="xMidYMid meet" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="grad-hijau" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.95" />
            <stop offset="52%" stopColor="#166534" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad-kritis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#d97706" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#92400e" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad-gersang" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fecaca" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#b91c1c" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#450a0a" stopOpacity="1" />
          </linearGradient>

          <filter id="texNoiseFine" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0" />
          </filter>
          <filter id="texNoiseMed" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.32" numOctaves="3" seed="11" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0" />
          </filter>

          <pattern id="tex-hijau" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <rect width="22" height="22" fill="rgba(2,6,23,0.0)" />
            <g opacity="0.9">
              <circle cx="6" cy="7" r="6" fill="rgba(255,255,255,0.08)" />
              <circle cx="16" cy="9" r="5" fill="rgba(0,0,0,0.10)" />
              <circle cx="10" cy="17" r="5" fill="rgba(255,255,255,0.06)" />
              <path d="M 5 7 C 7 3 11 3 13 7 C 11 11 7 11 5 7 Z" fill="rgba(255,255,255,0.10)" />
              <path d="M 14 16 C 16 13 19 13 20 16 C 18 19 15 19 14 16 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="4" cy="16" r="1.2" fill="rgba(255,255,255,0.10)" />
              <circle cx="18" cy="4" r="1.0" fill="rgba(255,255,255,0.10)" />
            </g>
            <path
              d="M -2 6 C 3 3 7 6 12 4 C 16 2 18 6 24 4"
              stroke="rgba(56,189,248,0.26)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <path
              d="M -1 14 C 4 12 6 16 10 14 C 15 12 16 16 24 14"
              stroke="rgba(56,189,248,0.20)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
            <rect width="22" height="22" filter="url(#texNoiseMed)" opacity="0.55" />
          </pattern>
          <pattern id="tex-kritis" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="rgba(2,6,23,0.0)" />
            <path d="M 1 10 L 6 6 L 10 9 L 14 5 L 22 12" stroke="rgba(0,0,0,0.20)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 2 18 L 8 14 L 12 16 L 18 13 L 23 16" stroke="rgba(255,255,255,0.10)" strokeWidth="1.0" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 6 3 C 7 5 7 7 6 9" stroke="rgba(34,197,94,0.12)" strokeWidth="1.0" strokeLinecap="round" />
            <path d="M 19 6 C 20 8 20 10 19 12" stroke="rgba(34,197,94,0.10)" strokeWidth="0.9" strokeLinecap="round" />
            <circle cx="5" cy="21" r="1.0" fill="rgba(0,0,0,0.14)" />
            <circle cx="21" cy="4" r="0.9" fill="rgba(255,255,255,0.10)" />
            <rect width="24" height="24" filter="url(#texNoiseFine)" opacity="0.7" />
          </pattern>
          <pattern id="tex-gersang" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="rgba(2,6,23,0.0)" />
            <path d="M 2 12 L 8 6 L 12 10 L 16 5 L 22 9 L 28 4" stroke="rgba(0,0,0,0.26)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 3 24 L 10 18 L 14 21 L 18 16 L 24 20 L 28 17" stroke="rgba(0,0,0,0.22)" strokeWidth="1.35" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 9 30 L 9 22" stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 18 30 L 18 23" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M 24 13 L 29 10" stroke="rgba(255,255,255,0.08)" strokeWidth="1.0" strokeLinecap="round" />
            <path d="M 0 9 C 6 6 10 10 16 7 C 20 5 24 8 30 6" stroke="rgba(255,255,255,0.07)" strokeWidth="1.0" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 0 19 C 7 16 12 20 18 17 C 22 15 24 18 30 16" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="15" r="1.1" fill="rgba(0,0,0,0.14)" />
            <circle cx="23" cy="26" r="1.0" fill="rgba(0,0,0,0.12)" />
            <rect width="30" height="30" filter="url(#texNoiseMed)" opacity="0.75" />
          </pattern>
          <pattern id="tex-outside" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <rect width="36" height="36" fill="rgba(2,6,23,0.0)" />
            <path d="M 0 12 C 8 7 14 14 22 10 C 28 7 30 11 36 8" stroke="rgba(34,197,94,0.10)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <path d="M 0 26 C 9 22 14 28 22 24 C 28 21 30 25 36 22" stroke="rgba(245,158,11,0.08)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <rect width="36" height="36" filter="url(#texNoiseMed)" opacity="0.55" />
          </pattern>
          <pattern id="micro-neutral" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <rect width="28" height="28" fill="rgba(0,0,0,0)" />
            <path d="M -2 9 C 4 5 10 13 16 9 C 20 6 24 10 30 7" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M -1 17 C 5 14 11 20 16 17 C 20 14 24 18 29 15" stroke="rgba(16,185,129,0.12)" strokeWidth="1.0" fill="none" strokeLinecap="round" />
            <path d="M 3 25 C 8 22 13 27 19 24 C 22 22 25 24 29 22" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <circle cx="7" cy="8" r="0.9" fill="rgba(255,255,255,0.10)" />
            <circle cx="20" cy="20" r="0.8" fill="rgba(0,0,0,0.12)" />
          </pattern>
          <pattern id="micro-cold" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="rgba(0,0,0,0)" />
            <path d="M -2 8 C 4 4 10 12 16 8 C 21 5 26 10 32 6" stroke="rgba(191,219,254,0.16)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
            <path d="M 1 16 C 7 12 12 18 18 15 C 23 13 27 16 31 13" stroke="rgba(255,255,255,0.11)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M 3 24 C 8 21 14 27 19 24 C 23 22 27 24 31 21" stroke="rgba(125,211,252,0.12)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <circle cx="8" cy="11" r="1.0" fill="rgba(255,255,255,0.12)" />
            <circle cx="22" cy="6" r="0.9" fill="rgba(186,230,253,0.10)" />
          </pattern>
          <pattern id="micro-industry" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill="rgba(0,0,0,0)" />
            <path d="M 0 7 H 26 M 0 16 H 26" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            <path d="M 8 0 V 26 M 18 0 V 26" stroke="rgba(148,163,184,0.12)" strokeWidth="0.9" />
            <rect x="4" y="4" width="5" height="5" rx="1.2" fill="rgba(255,255,255,0.06)" />
            <rect x="15" y="11" width="6" height="6" rx="1.3" fill="rgba(251,191,36,0.06)" />
            <rect x="6" y="18" width="4" height="4" rx="1" fill="rgba(255,255,255,0.04)" />
          </pattern>
          <pattern id="micro-flood" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="rgba(0,0,0,0)" />
            <path d="M -2 9 C 4 5 10 12 16 9 C 22 6 26 12 32 9" stroke="rgba(125,211,252,0.16)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M -1 17 C 5 13 10 20 16 17 C 22 14 27 20 31 17" stroke="rgba(255,255,255,0.10)" strokeWidth="1.0" fill="none" strokeLinecap="round" />
            <path d="M 2 25 C 8 22 12 28 18 25 C 23 22 27 27 31 24" stroke="rgba(56,189,248,0.14)" strokeWidth="1.05" fill="none" strokeLinecap="round" />
            <circle cx="9" cy="10" r="0.95" fill="rgba(191,219,254,0.14)" />
            <circle cx="22" cy="19" r="0.85" fill="rgba(255,255,255,0.10)" />
          </pattern>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
          </filter>
          <filter id="heatHazeDust" x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence type="turbulence" baseFrequency="0.012 0.035" numOctaves="2" seed="3">
              <animate attributeName="baseFrequency" dur="2.2s" values="0.010 0.032;0.015 0.040;0.010 0.032" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="6" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="dust" />
            <feColorMatrix in="dust" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
            <feComposite operator="in" in2="SourceAlpha" />
            <feGaussianBlur stdDeviation="0.45" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softFog" x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="12" result="n">
              <animate attributeName="baseFrequency" dur="6.5s" values="0.012;0.018;0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feColorMatrix in="n" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" result="m" />
            <feGaussianBlur in="m" stdDeviation="1.15" result="b" />
            <feComposite in="b" in2="SourceAlpha" operator="in" result="fog" />
            <feMerge>
              <feMergeNode in="fog" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="sunGlint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="52%" stopColor="rgba(255,255,255,0.24)" />
            <stop offset="58%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
            <animateTransform attributeName="gradientTransform" type="translate" dur="3.4s" values="-120 0;120 0;-120 0" repeatCount="indefinite" />
          </linearGradient>
          <filter id="innerGlow-hijau" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="b" />
            <feOffset in="b" dx="0" dy="1.1" result="o" />
            <feComposite in="o" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="is" />
            <feColorMatrix in="is" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.40 0" result="shadow" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.0627  0 0 0 0 0.7255  0 0 0 0 0.5059  0 0 0 0.75 0" result="c" />
            <feComposite in="c" in2="SourceAlpha" operator="in" result="g" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="shadow" />
              <feMergeNode in="g" />
            </feMerge>
          </filter>
          <filter id="innerGlow-kritis" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.15" result="b" />
            <feOffset in="b" dx="0" dy="1.1" result="o" />
            <feComposite in="o" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="is" />
            <feColorMatrix in="is" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.42 0" result="shadow" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.9569  0 0 0 0 0.6196  0 0 0 0 0.0431  0 0 0 0.78 0" result="c" />
            <feComposite in="c" in2="SourceAlpha" operator="in" result="g" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="shadow" />
              <feMergeNode in="g" />
            </feMerge>
          </filter>
          <filter id="innerGlow-gersang" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="b" />
            <feOffset in="b" dx="0" dy="1.1" result="o" />
            <feComposite in="o" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="is" />
            <feColorMatrix in="is" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0" result="shadow" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.9373  0 0 0 0 0.2667  0 0 0 0 0.2667  0 0 0 0.82 0" result="c" />
            <feComposite in="c" in2="SourceAlpha" operator="in" result="g" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="shadow" />
              <feMergeNode in="g" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          initial={false}
          animate={{ transform: viewTransform }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
        >
          <motion.g
            initial={false}
            animate={{ transform: focusTransform }}
            transition={{ duration: 0.42, ease: 'easeInOut' }}
          >
          <g opacity="0.85">
            <path d="M 10,35 L 15,20 L 25,10 L 35,5 L 45,10 L 50,15 L 60,15 L 70,25 L 80,45 L 95,42 L 110,40 L 115,50 L 110,65 L 100,85 L 85,90 L 70,88 L 60,80 L 50,78 L 45,70 L 25,80 L 15,75 L 5,60 L 5,50 Z" fill="rgba(2,6,23,0.55)" transform="translate(0 4.2)" />
            <path d="M 10,35 L 15,20 L 25,10 L 35,5 L 45,10 L 50,15 L 60,15 L 70,25 L 80,45 L 95,42 L 110,40 L 115,50 L 110,65 L 100,85 L 85,90 L 70,88 L 60,80 L 50,78 L 45,70 L 25,80 L 15,75 L 5,60 L 5,50 Z" fill="rgba(2,6,23,0.35)" transform="translate(0 3.2)" />
            <path d="M 10,35 L 15,20 L 25,10 L 35,5 L 45,10 L 50,15 L 60,15 L 70,25 L 80,45 L 95,42 L 110,40 L 115,50 L 110,65 L 100,85 L 85,90 L 70,88 L 60,80 L 50,78 L 45,70 L 25,80 L 15,75 L 5,60 L 5,50 Z" fill="rgba(2,6,23,0.22)" transform="translate(0 2.2)" />
          </g>
          <g filter="url(#softShadow)">
            <path d="M 10,35 L 15,20 L 25,10 L 35,5 L 45,10 L 50,15 L 60,15 L 70,25 L 80,45 L 95,42 L 110,40 L 115,50 L 110,65 L 100,85 L 85,90 L 70,88 L 60,80 L 50,78 L 45,70 L 25,80 L 15,75 L 5,60 L 5,50 Z" fill="url(#tex-outside)" opacity="0.95" />
          </g>
          {visibleRegions.map(r => (
            <RegionItem
              key={r.id}
              region={r}
              statusAnim={statusAnimByRegionId[r.id] ?? null}
              fxAt={regionFxAt[r.id]}
              isHovered={hoveredRegion?.id === r.id}
              isFocused={focusedRegionId === r.id}
              focusActive={focusActive}
              onHover={onHover}
              onClick={onSelect}
            />
          ))}
          {visibleRegions.map(r => {
            const w = weatherByRegionId[r.id] ?? 'sun';
            const isHover = hoveredRegion?.id === r.id;
            const isFocus = focusedRegionId === r.id;
            const show = isHover || isFocus || (r.status !== 'hijau' && (liveTick % 6 === 0));
            if (!show) return null;
            const baseOpacity = isHover || isFocus ? 0.9 : 0.55;
            const scale = isHover || isFocus ? 1 : 0.9;
            if (w === 'rain') {
              return (
                <motion.g key={`wx-${r.id}`} transform={`translate(${r.x}, ${r.y})`} style={{ transformOrigin: `${r.x}px ${r.y}px` }} initial={false} animate={{ opacity: baseOpacity, scale }}>
                  <motion.g animate={{ y: [0, 1.6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
                    {[...Array(8)].map((_, i) => (
                      <motion.line
                        key={i}
                        x1={-6 + i * 1.6}
                        y1={-10}
                        x2={-4 + i * 1.6}
                        y2={-4}
                        stroke="rgba(147,197,253,0.55)"
                        strokeWidth={0.65}
                        strokeLinecap="round"
                        initial={false}
                        animate={{ y1: [-12, 6], y2: [-6, 12], opacity: [0.0, 0.55, 0.0] }}
                        transition={{ repeat: Infinity, duration: 0.95 + i * 0.03, ease: 'linear', delay: i * 0.08 }}
                      />
                    ))}
                  </motion.g>
                </motion.g>
              );
            }
            if (w === 'fog') {
              return (
                <motion.g key={`wx-${r.id}`} transform={`translate(${r.x}, ${r.y})`} initial={false} animate={{ opacity: baseOpacity, scale }}>
                  <motion.circle
                    r={10}
                    fill="rgba(255,255,255,0.06)"
                    filter="url(#softFog)"
                    animate={{ r: [9.5, 12.5, 9.5], opacity: [0.10, 0.22, 0.10] }}
                    transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    r={6}
                    fill="rgba(56,189,248,0.06)"
                    animate={{ r: [6, 8.5, 6], opacity: [0.06, 0.14, 0.06] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.15 }}
                  />
                </motion.g>
              );
            }
            if (w === 'heat') {
              return (
                <motion.g key={`wx-${r.id}`} transform={`translate(${r.x}, ${r.y})`} initial={false} animate={{ opacity: baseOpacity, scale }}>
                  <motion.path
                    d="M -10 -4 C -6 -10, -2 -2, 2 -8 C 6 -14, 10 -6, 12 -12"
                    fill="none"
                    stroke="rgba(251,191,36,0.30)"
                    strokeWidth={1.0}
                    strokeLinecap="round"
                    animate={{ opacity: [0.12, 0.34, 0.12], y: [0, -1.2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M -12 3 C -7 -3, -3 5, 1 -1 C 5 -7, 9 1, 12 -4"
                    fill="none"
                    stroke="rgba(239,68,68,0.22)"
                    strokeWidth={0.9}
                    strokeLinecap="round"
                    animate={{ opacity: [0.10, 0.28, 0.10], y: [0, 1.1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut', delay: 0.12 }}
                  />
                </motion.g>
              );
            }
            if (w === 'storm') {
              return (
                <motion.g key={`wx-${r.id}`} transform={`translate(${r.x}, ${r.y})`} initial={false} animate={{ opacity: baseOpacity, scale }}>
                  <motion.path
                    d="M -2 -12 L 6 -12 L 1 -2 L 8 -2 L -4 12 L 0 2 L -7 2 Z"
                    fill="rgba(248,250,252,0.12)"
                    stroke="rgba(56,189,248,0.30)"
                    strokeWidth={0.7}
                    strokeLinejoin="round"
                    animate={{ opacity: [0.05, 0.65, 0.08, 0.55, 0.05] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                  />
                </motion.g>
              );
            }
            return (
              <motion.g key={`wx-${r.id}`} transform={`translate(${r.x}, ${r.y})`} initial={false} animate={{ opacity: baseOpacity, scale }}>
                <motion.circle
                  r={7.5}
                  fill="rgba(16,185,129,0.06)"
                  animate={{ opacity: [0.06, 0.18, 0.06], r: [7, 9.2, 7] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                />
                <motion.circle
                  r={4.5}
                  fill="rgba(255,255,255,0.05)"
                  animate={{ opacity: [0.05, 0.14, 0.05], r: [4.2, 5.3, 4.2] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
                />
              </motion.g>
            );
          })}
          <AnimatePresence>
            {rippleTarget && (
              <motion.g
                key={ripple?.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.circle
                  cx={rippleTarget.x}
                  cy={rippleTarget.y}
                  r={4}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.75)"
                  strokeWidth={0.8}
                  initial={{ r: 4, opacity: 0.0 }}
                  animate={{ r: [4, 12, 22], opacity: [0.0, 0.35, 0.0] }}
                  transition={{ duration: 0.48, ease: 'easeOut' }}
                />
                <motion.circle
                  cx={rippleTarget.x}
                  cy={rippleTarget.y}
                  r={5}
                  fill="transparent"
                  stroke={
                    rippleTarget.status === 'hijau'
                      ? 'rgba(16,185,129,0.65)'
                      : rippleTarget.status === 'kritis'
                        ? 'rgba(245,158,11,0.70)'
                        : 'rgba(239,68,68,0.70)'
                  }
                  strokeWidth={1.2}
                  initial={{ r: 6, opacity: 0.0 }}
                  animate={{ r: [6, 14, 26], opacity: [0.0, 0.55, 0.0] }}
                  transition={{ duration: 0.48, ease: 'easeOut' }}
                />
              </motion.g>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {restorationWave && restorationWave.regionId && (
              <motion.g
                key={`restore-${restorationWave.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {(() => {
                  const target = regions.find(r => r.id === restorationWave.regionId);
                  if (!target) return null;
                  return (
                    <motion.g>
                      <motion.circle
                        cx={target.x}
                        cy={target.y}
                        r={4}
                        fill="rgba(16,185,129,0.12)"
                        initial={{ r: 2, opacity: 0.0 }}
                        animate={{ r: [2, 18, 36], opacity: [0.0, 0.28, 0.0] }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                      />
                      <motion.circle
                        cx={target.x}
                        cy={target.y}
                        r={6}
                        fill="transparent"
                        stroke="rgba(16,185,129,0.75)"
                        strokeWidth={1.4}
                        initial={{ r: 6, opacity: 0.0 }}
                        animate={{ r: [6, 22, 44], opacity: [0.0, 0.65, 0.0] }}
                        transition={{ duration: 0.95, ease: 'easeOut' }}
                      />
                    </motion.g>
                  );
                })()}
              </motion.g>
            )}
          </AnimatePresence>
          {visibleRegions.map((r) => {
            const base = stableHash(r.id);
            const w = weatherByRegionId[r.id] ?? 'sun';
            const isOn = (hoveredRegion?.id === r.id) || (focusedRegionId === r.id) || (r.status !== 'hijau' && (liveTick % 5 === 0));
            if (!isOn) return null;

            if (r.status === 'hijau') {
              const speed = 3.8 + base * 1.8;
              const y0 = -6 - (base * 6);
              return (
                <motion.g key={`bird-${r.id}`} transform={`translate(${r.x}, ${r.y})`} initial={false} animate={{ opacity: 0.55 }}>
                  {[...Array(3)].map((_, i) => (
                    <motion.path
                      key={i}
                      d="M -2 0 Q 0 -2 2 0 Q 0 -1 -2 0 Z"
                      fill="rgba(255,255,255,0.18)"
                      stroke="rgba(16,185,129,0.35)"
                      strokeWidth={0.35}
                      initial={false}
                      animate={{
                        x: [-10 - i * 4, 12 + i * 5],
                        y: [y0 - i * 3, y0 - 2 - i * 2],
                        opacity: [0.0, 0.55, 0.0],
                      }}
                      transition={{ repeat: Infinity, duration: speed + i * 0.6, ease: 'linear', delay: i * 0.7 + base * 0.6 }}
                    />
                  ))}
                </motion.g>
              );
            }

            if (r.status === 'kritis') {
              return (
                <motion.g key={`smoke-${r.id}`} transform={`translate(${r.x}, ${r.y})`} initial={false} animate={{ opacity: 0.65 }}>
                  <motion.g animate={{ y: [0, -1.8, 0] }} transition={{ repeat: Infinity, duration: 2.6 + base, ease: 'easeInOut' }}>
                    {[...Array(4)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={-3 + i * 3}
                        cy={-4 - i * 2}
                        r={2.2 + i * 0.5}
                        fill="rgba(148,163,184,0.14)"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth={0.35}
                        initial={false}
                        animate={{ cy: [-2, -12], opacity: [0.0, 0.22, 0.0], r: [2.0 + i * 0.4, 3.8 + i * 0.55] }}
                        transition={{ repeat: Infinity, duration: 2.2 + i * 0.35 + base, ease: 'easeOut', delay: i * 0.18 }}
                      />
                    ))}
                  </motion.g>
                  <motion.path
                    d="M -10 4 L 10 4"
                    stroke="rgba(245,158,11,0.22)"
                    strokeWidth={0.9}
                    strokeLinecap="round"
                    strokeDasharray="3 6"
                    animate={{ strokeDashoffset: [0, -18], opacity: [0.10, 0.26, 0.10] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  />
                </motion.g>
              );
            }

            if (r.status === 'gersang') {
              const dust = w === 'heat' ? 0.22 : 0.16;
              return (
                <motion.g key={`dust-${r.id}`} transform={`translate(${r.x}, ${r.y})`} initial={false} animate={{ opacity: 0.75 }}>
                  {[...Array(6)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx={-12 + i * 4}
                      cy={6 - (i % 2) * 2}
                      r={1.2 + (i % 3) * 0.6}
                      fill={`rgba(251,191,36,${dust})`}
                      initial={false}
                      animate={{ cx: [-14 + i * 2, 14 - i * 2], opacity: [0.0, dust, 0.0] }}
                      transition={{ repeat: Infinity, duration: 1.8 + i * 0.12 + base, ease: 'linear', delay: i * 0.1 }}
                    />
                  ))}
                </motion.g>
              );
            }

            return null;
          })}
          </motion.g>
        </motion.g>
      </svg>

      <AnimatePresence>
        {hoveredRegion && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              transition: { duration: 0.32, ease: 'easeOut' }
            }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            style={{ 
              left: 0,
              top: 0,
              x: tooltipX,
              y: tooltipY,
            }}
            className="absolute z-50 bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl pointer-events-none min-w-[200px] border border-white/10 backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-black text-sm text-emerald-400 uppercase tracking-wide inline-flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    hoveredRegion.status === 'hijau'
                      ? 'bg-emerald-400'
                      : hoveredRegion.status === 'kritis'
                        ? 'bg-orange-400'
                        : 'bg-red-400'
                  }`}
                  style={{ boxShadow: '0 0 12px rgba(255,255,255,0.18)' }}
                />
                {hoveredRegion.name}
              </span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                hoveredRegion.status === 'hijau' ? 'bg-emerald-500' : 
                hoveredRegion.status === 'kritis' ? 'bg-orange-500' : 'bg-red-500'
              }`}>{hoveredRegion.status}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{hoveredRegion.description}</p>
            {hoveredVitals && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-black text-white/80">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5">
                  <Thermometer size={14} className="text-orange-200" />
                  <span className="text-white/70">Suhu</span>
                  <span className="ml-auto text-white">{hoveredVitals.tempC}°C</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5">
                  <Droplets size={14} className="text-blue-200" />
                  <span className="text-white/70">Lembab</span>
                  <span className="ml-auto text-white">{hoveredVitals.humidity}%</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5">
                  <Droplets size={14} className="text-sky-200" />
                  <span className="text-white/70">Air</span>
                  <span className="ml-auto text-white">{hoveredVitals.waterIndex}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5">
                  <Activity size={14} className="text-red-200" />
                  <span className="text-white/70">CO2</span>
                  <span className="ml-auto text-white">{hoveredVitals.co2Index}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-2 py-1.5">
                  <Trees size={14} className="text-emerald-200" />
                  <span className="text-white/70">Pohon</span>
                  <span className="ml-auto text-white">{hoveredVitals.trees}</span>
                </div>
              </div>
            )}
            {hoveredWeather && (
              <div className="mt-2 flex items-center gap-2 text-[10px] font-black text-white/70 uppercase tracking-widest">
                {hoveredWeather === 'rain' ? <CloudRain size={14} className="text-blue-200" /> : hoveredWeather === 'fog' ? <Wind size={14} className="text-slate-200" /> : hoveredWeather === 'heat' ? <Sun size={14} className="text-orange-200" /> : hoveredWeather === 'storm' ? <AlertTriangle size={14} className="text-blue-200" /> : <Sparkles size={14} className="text-emerald-200" />}
                <span>
                  {hoveredWeather === 'rain' ? 'Hujan Lokal' : hoveredWeather === 'fog' ? 'Kabut' : hoveredWeather === 'heat' ? 'Panas' : hoveredWeather === 'storm' ? 'Badai Jauh' : 'Cerah'}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

type Mission = {
  id: string;
  name: string;
  targetCO2: number;
  timeLimit: number;
  initialWater: number;
  initialEnergy: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

type ActiveTree = {
  id: number;
  x: number;
  y: number;
  type: string;
  stage: number; // 0-6
  health: number;
  moisture: number;
  growth: number;
  lastTicked: number;
};

type GameEvent = {
  id: string;
  name: string;
  duration: number;
  intensity: number;
  impact: (state: any) => any;
};

const missions: Mission[] = [
  { id: 'm1', name: 'Pemulihan Kota Bandung', targetCO2: 40, timeLimit: 120, initialWater: 100, initialEnergy: 100, difficulty: 'easy' },
  { id: 'm2', name: 'Restorasi Lahan Gersang', targetCO2: 30, timeLimit: 180, initialWater: 80, initialEnergy: 90, difficulty: 'medium' },
  { id: 'm3', name: 'Hutan Harapan Raya', targetCO2: 20, timeLimit: 240, initialWater: 60, initialEnergy: 80, difficulty: 'hard' },
];

const REGION_SELECT_LOCK_MS = 260;
const REGION_LOADING_MS = 320;
const GAME_ENTRY_LOADING_MS = 560;

const TreeGame: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'selection' | 'seedling' | 'planting' | 'finished' | 'gameover'>('selection');
  const [currentMission, setCurrentMission] = useState<Mission | null>(missions[0]);
  
  // Resources
  const [water, setWater] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [co2Level, setCo2Level] = useState(100);
  const [temperature, setTemperature] = useState(32);
  const [timer, setTimer] = useState(120);
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'drought' | 'polluted'>('sunny');
  
  // Free Coordinate Trees
  const [activeTrees, setActiveTrees] = useState<ActiveTree[]>([]);

  const [activeEvent, setActiveEvent] = useState<ActiveAdrenalineEvent | null>(null);
  const [pestTreeId, setPestTreeId] = useState<number | null>(null);
  const [pollutionSources, setPollutionSources] = useState<PollutionSource[]>([]);
  const [restorationPatches, setRestorationPatches] = useState<RestorationPatch[]>([]);
  const [restoreWaves, setRestoreWaves] = useState<RestoreWave[]>([]);
  const restoredTreeIdsRef = useRef<Set<number>>(new Set());
  const nextEventAtRef = useRef<number>(Date.now() + 18000);
  const pestPulseAtRef = useRef<number>(0);
  const pollutionPulseAtRef = useRef<number>(0);
  
  // ... rest of existing state ...
  const [level, setLevel] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSeedling, setSelectedSeedling] = useState<Seedling | null>(null);
  const [seedlingDraft, setSeedlingDraft] = useState<Seedling | null>(null);
  const [seedlingHoverId, setSeedlingHoverId] = useState<string | null>(null);
  const [seedlingCardTilt, setSeedlingCardTilt] = useState<{ x: number; y: number } | null>(null);
  const [seedlingSpotlight, setSeedlingSpotlight] = useState<{ x: number; y: number } | null>(null);
  const seedlingSpotRafRef = useRef<number | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const [mapFocusRegionId, setMapFocusRegionId] = useState<string | null>(null);
  const [mapFocusLock, setMapFocusLock] = useState(false);
  const [showAnalysisMascot, setShowAnalysisMascot] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);
  const [visualOpen, setVisualOpen] = useState(false);
  const [gfxPreset, setGfxPreset] = useState<'clean' | 'cinematic' | 'performance'>(() => {
    try {
      const raw = window.localStorage.getItem('treegame:gfx-preset');
      if (raw === 'cinematic' || raw === 'performance' || raw === 'clean') return raw;
      return 'clean';
    } catch {
      return 'clean';
    }
  });
  const [characterSkin, setCharacterSkin] = useState<string | null>(() => {
    try {
      const raw = window.localStorage.getItem('treegame:character-skin');
      if (!raw) return null;
      if (raw.startsWith('data:image/')) return raw;
      return null;
    } catch {
      return null;
    }
  });
  const characterFileInputRef = useRef<HTMLInputElement | null>(null);
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimEducationOpen, setClaimEducationOpen] = useState(false);
  const [claimMode, setClaimMode] = useState<'success' | 'incomplete'>('success');
  const [claimSubmitted, setClaimSubmitted] = useState<{ id: string; submittedAt: number; mode: 'success' | 'incomplete' } | null>(null);
  const [claimForm, setClaimForm] = useState({
    name: '',
    phone: '',
    email: '',
    nik: '',
    address: '',
    kecamatan: '',
    kelurahan: '',
    plantingLocation: '',
    quantity: 1,
    consent: true,
  });
  const [claimError, setClaimError] = useState<string | null>(null);
  const lastClaimAutoOpenAtRef = useRef<number>(0);
  const mapProgressStorageVersion = '2026-06-map-balance-1';
  const [restoredRegionIds, setRestoredRegionIds] = useState<string[]>(() => {
    try {
      const version = window.localStorage.getItem('treegame:map-progress-version');
      if (version !== mapProgressStorageVersion) {
        window.localStorage.removeItem('treegame:restored-regions');
        window.localStorage.removeItem('treegame:improved-regions');
        return [];
      }
      const raw = window.localStorage.getItem('treegame:restored-regions');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(v => typeof v === 'string');
    } catch {
      return [];
    }
  });
  const [improvedRegionIds, setImprovedRegionIds] = useState<string[]>(() => {
    try {
      const version = window.localStorage.getItem('treegame:map-progress-version');
      if (version !== mapProgressStorageVersion) return [];
      const raw = window.localStorage.getItem('treegame:improved-regions');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(v => typeof v === 'string');
    } catch {
      return [];
    }
  });
  const [level2Combo, setLevel2Combo] = useState(0);
  const [level2ComboExpiresAt, setLevel2ComboExpiresAt] = useState<number | null>(null);
  const [level2LastCompletedAt, setLevel2LastCompletedAt] = useState<number | null>(null);
  const [mapRegionFxAt, setMapRegionFxAt] = useState<Record<string, number>>({});
  const [mapStatusAnimByRegionId, setMapStatusAnimByRegionId] = useState<Record<string, { from: Region['status']; to: Region['status']; at: number }>>({});
  const [mapRestorationWave, setMapRestorationWave] = useState<{ id: number; regionId: string } | null>(null);
  const [mapTransition, setMapTransition] = useState<{ id: number; region: Region } | null>(null);
  const [gameLoading, setGameLoading] = useState<{ id: number; title: string; subtitle: string; accent: 'eco' | 'warn' | 'danger'; tip: string; durationMs: number; stages?: string[] } | null>(null);
  const [mapAlert, setMapAlert] = useState<{ id: number; title: string; subtitle: string; tone: 'warn' | 'info' | 'good' } | null>(null);
  const selectionWelcomeVoicePlayedRef = useRef(false);
  const regionSelectTimerRef = useRef<number | null>(null);
  const [plantingStep, setPlantingStep] = useState(0);
  const level1Target = 2;
  const level2ComboWindowMs = 14000;
  const [isDragging, setIsDragging] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [charDirection, setCharDirection] = useState<'left' | 'right'>('right');
  const [actionProgress, setActionProgress] = useState(0);
  const [actionPlotId, setActionPlotId] = useState<string | null>(null);
  const [levelIntroOpen, setLevelIntroOpen] = useState(false);
  const [pauseOpen, setPauseOpen] = useState(false);
  const [level2Stages, setLevel2Stages] = useState<Record<string, number>>({ p1: 0, p2: 0, p3: 0, p4: 0 });
  const [activePlotId, setActivePlotId] = useState('p1');
  const [toast, setToast] = useState<{ id: number, title: string, subtitle?: string, tone: 'good' | 'warn' | 'info' } | null>(null);
  const [envScore, setEnvScore] = useState<EnvImpact>({ co2: 0, water: 0, temp: 0, bio: 0 });
  const [plotMoisture, setPlotMoisture] = useState<Record<string, number>>({ p1: 45, p2: 45, p3: 45, p4: 45 });
  const [plotHealth, setPlotHealth] = useState<Record<string, number>>({ p1: 75, p2: 75, p3: 75, p4: 75 });
  const [dayPhase, setDayPhase] = useState(0);
  const actionTimerRef = useRef<{ intervalId: number | null, timeoutId: number | null }>({ intervalId: null, timeoutId: null });
  const [hoveredPlotId, setHoveredPlotId] = useState<string | null>(null);
  const [pointerPos, setPointerPos] = useState<{ x: number, y: number } | null>(null);
  const pointerRafRef = useRef<number | null>(null);
  const footstepTimerRef = useRef<number | null>(null);
  const digParticleTimerRef = useRef<number | null>(null);
  const [floatTexts, setFloatTexts] = useState<Array<{ id: number, x: number, y: number, text: string, tone: 'xp' | 'good' | 'warn' }>>([]);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, kind: 'footstep' | 'dirt' }>>([]);
  const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number, tone: 'soil' | 'plant' | 'water' | 'sun' | 'good' }>>([]);
  const [screenFx, setScreenFx] = useState<{ id: number; intensity: number }>({ id: 0, intensity: 0 });
  const [playerXP, setPlayerXP] = useState(0);
  const [playerRank, setPlayerRank] = useState(1);
  const [levelUpFxId, setLevelUpFxId] = useState<number | null>(null);
  const [audioOn, setAudioOn] = useState(true);
  const [audioVolume, setAudioVolume] = useState(0.55);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambienceRef = useRef<{ src?: AudioBufferSourceNode, gain?: GainNode } | null>(null);
  
  // Tutorial & Flow State
  const [tutorialActive, setTutorialActive] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialDockCollapsed, setTutorialDockCollapsed] = useState(false);
  const [unlockedRadius, setUnlockedRadius] = useState(450); // Initial area radius (larger for better visibility)
  const tutorialSpot = { x: 400, y: 400 }; // The only spot allowed initially

  const tutorialMessages = [
    "Tanah ini rusak, ayo tanam pohon pertama untuk memulihkan ekosistem.",
    "Bagus! Sekarang berjalanlah mendekati titik tanah yang ditandai.",
    "Tekan [E] untuk menggali lubang dan menanam bibit pohon.",
    "Pohon butuh air! Dekati pohon dan tekan [E] untuk menyiramnya.",
    "Selamat! Kamu telah menyelesaikan tutorial. Sekarang pulihkan seluruh wilayah!"
  ];

  const gfx = useMemo(() => {
    if (gfxPreset === 'performance') {
      return {
        dustCount: 8,
        birdCount: 2,
        leafLitterCount: 8,
        decorCount: 8,
        gridOpacity: 0.01,
        vignette: 0.26,
        scanlines: 0.0,
        fogAlpha: 0.58,
        worldTexture: 0.35,
        haze: 0.18,
        sunBloom: 0.22,
      };
    }
    if (gfxPreset === 'cinematic') {
      return {
        dustCount: 20,
        birdCount: 6,
        leafLitterCount: 22,
        decorCount: 18,
        gridOpacity: 0.03,
        vignette: 0.45,
        scanlines: 0.012,
        fogAlpha: 0.72,
        worldTexture: 0.85,
        haze: 0.34,
        sunBloom: 0.46,
      };
    }
    return {
      dustCount: 14,
      birdCount: 4,
      leafLitterCount: 16,
      decorCount: 14,
      gridOpacity: 0.02,
      vignette: 0.34,
      scanlines: 0.008,
      fogAlpha: 0.66,
      worldTexture: 0.60,
      haze: 0.26,
      sunBloom: 0.32,
    };
  }, [gfxPreset]);

  const effectiveWeather = useMemo<WorldWeather>(() => {
    if (!activeEvent) return weather;
    if (activeEvent.type === 'HEATWAVE') return 'drought';
    if (activeEvent.type === 'RAINSTORM') return 'rainy';
    if (activeEvent.type === 'POLLUTION_SPIKE') return 'polluted';
    return weather;
  }, [activeEvent, weather]);

  const clampWorld = useCallback((n: number) => Math.max(50, Math.min(2950, n)), []);

  const eventHint = useMemo(() => {
    if (!activeEvent) return null;
    if (activeEvent.type === 'HEATWAVE') return { title: 'HEATWAVE', subtitle: 'Panas ekstrem. Air cepat habis — siram pohon yang kering (E).', tone: 'warn' as const, icon: Wind };
    if (activeEvent.type === 'RAINSTORM') return { title: 'HUJAN DERAS', subtitle: 'Air naik, tapi banjir bisa merusak akar. Hindari over-water.', tone: 'info' as const, icon: CloudRain };
    if (activeEvent.type === 'PESTS') return { title: 'HAMA', subtitle: 'Cari pohon bertanda Hama lalu tekan E untuk membersihkan.', tone: 'warn' as const, icon: AlertTriangle };
    return { title: 'POLUSI', subtitle: 'Kejar ikon peringatan lalu tekan E untuk segel sumber polusi.', tone: 'warn' as const, icon: Activity };
  }, [activeEvent]);

  const regions = useMemo<Region[]>(() => {
    const restored = new Set(restoredRegionIds);
    const improved = new Set(improvedRegionIds);
    const bump = (s: Region['status']): Region['status'] => (s === 'gersang' ? 'kritis' : 'hijau');
    return allRegions.map((r) => {
      if (restored.has(r.id)) return { ...r, status: 'hijau' as const };
      if (improved.has(r.id) && r.status !== 'hijau') return { ...r, status: bump(r.status) };
      return r;
    });
  }, [improvedRegionIds, restoredRegionIds]);

  const weatherByRegionId = useMemo<Record<string, MapWeather>>(() => {
    const m: Record<string, MapWeather> = {};
    for (const r of allRegions) m[r.id] = 'sun';
    m['bdg-gedebage'] = 'rain';
    m['kab-baleendah'] = 'fog';
    m['kab-majalaya'] = 'heat';
    m['kab-margahayu'] = 'storm';
    m['kbb-padalarang'] = 'heat';
    m['cimahi'] = 'storm';
    return m;
  }, []);

  useEffect(() => {
    try {
      const versionKey = 'treegame:map-progress-version';
      const currentVersion = window.localStorage.getItem(versionKey);
      if (currentVersion !== mapProgressStorageVersion) {
        window.localStorage.removeItem('treegame:restored-regions');
        window.localStorage.removeItem('treegame:improved-regions');
        setRestoredRegionIds([]);
        setImprovedRegionIds([]);
      }
      window.localStorage.setItem(versionKey, mapProgressStorageVersion);
    } catch {}
  }, [mapProgressStorageVersion]);

  useEffect(() => {
    try {
      window.localStorage.setItem('treegame:restored-regions', JSON.stringify(restoredRegionIds));
    } catch {}
  }, [restoredRegionIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem('treegame:improved-regions', JSON.stringify(improvedRegionIds));
    } catch {}
  }, [improvedRegionIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem('treegame:gfx-preset', gfxPreset);
    } catch {}
  }, [gfxPreset]);

  useEffect(() => {
    try {
      if (characterSkin) window.localStorage.setItem('treegame:character-skin', characterSkin);
      else window.localStorage.removeItem('treegame:character-skin');
    } catch {}
  }, [characterSkin]);

  const requestCharacterSkinFile = useCallback(() => {
    characterFileInputRef.current?.click();
  }, [characterFileInputRef]);

  const clearCharacterSkin = useCallback(() => {
    setCharacterSkin(null);
    setToast({ id: Date.now(), title: 'Karakter direset', subtitle: 'Kembali ke karakter default', tone: 'info' });
  }, [setCharacterSkin, setToast]);

  const onCharacterSkinFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setToast({ id: Date.now(), title: 'Format tidak didukung', subtitle: 'Pilih file gambar (PNG/JPG/WebP)', tone: 'warn' });
      return;
    }

    const maxBytes = 2_500_000;
    if (file.size > maxBytes) {
      setToast({ id: Date.now(), title: 'Gambar terlalu besar', subtitle: 'Pilih gambar yang lebih kecil (maks ~2.5MB)', tone: 'warn' });
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      setToast({ id: Date.now(), title: 'Gagal memuat gambar', subtitle: 'Coba pilih file lain', tone: 'warn' });
    };
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      if (!result || !result.startsWith('data:image/')) {
        setToast({ id: Date.now(), title: 'Gagal memuat gambar', subtitle: 'Coba pilih file lain', tone: 'warn' });
        return;
      }
      setCharacterSkin(result);
      setToast({ id: Date.now(), title: 'Karakter diganti', subtitle: file.name, tone: 'good' });
    };
    reader.readAsDataURL(file);
  }, [setCharacterSkin, setToast]);

  useEffect(() => {
    if (phase !== 'finished' && phase !== 'gameover') {
      setClaimOpen(false);
      setClaimEducationOpen(false);
      return;
    }
    if (!selectedRegion || !selectedSeedling) return;
    const now = Date.now();
    if (now - lastClaimAutoOpenAtRef.current < 1500) return;
    lastClaimAutoOpenAtRef.current = now;
    setClaimMode(phase === 'finished' ? 'success' : 'incomplete');
    setClaimError(null);
    setClaimForm({
      name: '',
      phone: '',
      email: '',
      nik: '',
      address: '',
      kecamatan: '',
      kelurahan: '',
      plantingLocation: selectedRegion.name,
      quantity: 1,
      consent: true,
    });
    setClaimOpen(false);
    setClaimEducationOpen(true);
  }, [phase, selectedRegion, selectedSeedling]);

  const submitClaim = useCallback(() => {
    if (!selectedRegion || !selectedSeedling) return;
    const name = claimForm.name.trim();
    const phoneRaw = claimForm.phone.trim();
    const phoneDigits = phoneRaw.replace(/[^\d]/g, '');
    const address = claimForm.address.trim();
    const kecamatan = claimForm.kecamatan.trim();
    const kelurahan = claimForm.kelurahan.trim();
    const qty = Math.max(1, Math.min(5, Number.isFinite(claimForm.quantity) ? claimForm.quantity : 1));

    if (!name) { setClaimError('Nama lengkap wajib diisi.'); return; }
    if (phoneDigits.length < 10) { setClaimError('Nomor HP minimal 10 digit.'); return; }
    if (!address) { setClaimError('Alamat wajib diisi.'); return; }
    if (!kecamatan) { setClaimError('Kecamatan wajib diisi.'); return; }
    if (!kelurahan) { setClaimError('Kelurahan/Desa wajib diisi.'); return; }
    if (!claimForm.consent) { setClaimError('Centang persetujuan untuk melanjutkan.'); return; }

    const prefix = claimMode === 'success' ? 'KLAIM' : 'MINAT';
    const id = `${prefix}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
    const payload = {
      id,
      mode: claimMode,
      submittedAt: Date.now(),
      region: { id: selectedRegion.id, name: selectedRegion.name },
      seedling: { name: selectedSeedling.name },
      quantity: qty,
      person: {
        name,
        phone: phoneRaw,
        email: claimForm.email.trim(),
        nik: claimForm.nik.trim(),
        address,
        kecamatan,
        kelurahan,
      },
      plantingLocation: claimForm.plantingLocation.trim(),
      consent: claimForm.consent,
    };

    try {
      const raw = window.localStorage.getItem('treegame:seed-claims');
      const prev = raw ? (JSON.parse(raw) as unknown) : [];
      const arr = Array.isArray(prev) ? prev : [];
      window.localStorage.setItem('treegame:seed-claims', JSON.stringify([payload, ...arr].slice(0, 20)));
    } catch {}

    setClaimSubmitted({ id, submittedAt: Date.now(), mode: claimMode });
    setClaimOpen(false);
    setClaimEducationOpen(false);
    setClaimError(null);
    if (claimMode === 'success') {
      setToast({ id: Date.now(), title: 'Data klaim terkirim', subtitle: `Kode klaim: ${id}`, tone: 'good' });
      window.setTimeout(() => {
        setToast({ id: Date.now() + 1, title: 'Bibit bisa diambil', subtitle: 'Silakan ambil di Dinas Kehutanan dengan membawa KTP & kode klaim', tone: 'info' });
      }, 900);
      return;
    }
    setToast({ id: Date.now(), title: 'Formulir terkirim', subtitle: `Kode data: ${id}`, tone: 'good' });
    window.setTimeout(() => {
      setToast({ id: Date.now() + 1, title: 'Untuk klaim bibit gratis', subtitle: 'Selesaikan game sampai berhasil agar dapat kode klaim pengambilan', tone: 'info' });
    }, 900);
  }, [claimForm, claimMode, selectedRegion, selectedSeedling, setToast]);

  const returnToRegionMap = useCallback(() => {
    setClaimOpen(false);
    setClaimEducationOpen(false);
    setClaimError(null);

    const resetToMap = () => {
      setPhase('selection');
      setPlantingStep(0);
      setSelectedRegion(null);
      setSelectedSeedling(null);
      setHoveredRegion(null);
      setMapFocusRegionId(null);
      setMapTransition(null);
      setLevel(1);
      setLevelIntroOpen(false);
      setActionId(null);
      setActionPlotId(null);
      setActionProgress(0);
      setLevel2Stages({ p1: 0, p2: 0, p3: 0, p4: 0 });
      setActivePlotId('p1');
      setLevel2Combo(0);
      setLevel2ComboExpiresAt(null);
      setLevel2LastCompletedAt(null);
      setPauseOpen(false);
    };

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(resetToMap);
      return;
    }

    resetToMap();
  }, []);

  useEffect(() => {
    if (phase !== 'finished') return;
    if (!selectedRegion) return;
    const mainId = selectedRegion.id;

    setRestoredRegionIds(prev => (prev.includes(mainId) ? prev : [...prev, mainId]));
    setMapRestorationWave({ id: Date.now(), regionId: mainId });
    setMapStatusAnimByRegionId(prev => {
      const now = Date.now();
      const statusNow: Record<string, Region['status']> = {};
      for (const r of regions) statusNow[r.id] = r.status;
      const next = { ...prev };
      const from = statusNow[mainId] ?? (allRegions.find(r => r.id === mainId)?.status ?? 'kritis');
      if (from !== 'hijau') next[mainId] = { from, to: 'hijau', at: now };
      return next;
    });
    setMapRegionFxAt(prev => {
      const next = { ...prev };
      const now = Date.now();
      next[mainId] = now;
      return next;
    });
  }, [phase, regions, selectedRegion]);

  useEffect(() => {
    if (phase !== 'selection') return;
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * Math.max(1, arr.length))];
    const mk = () => {
      const targets = regions.filter(r => r.status !== 'hijau');
      const t = pick(targets.length ? targets : regions);
      const kind = Math.random();
      const title =
        kind < 0.34 ? `${t.name} mengalami kekeringan` : kind < 0.68 ? `${t.name} membutuhkan restorasi` : 'CO2 meningkat drastis';
      const subtitle =
        kind < 0.34 ? 'Prioritaskan wilayah gersang, tanam pohon penahan panas.' : kind < 0.68 ? 'Buka misi dan pulihkan lahan sekarang.' : 'Cari wilayah kritis dan turunkan polusi.';
      setMapAlert({ id: Date.now(), title, subtitle, tone: kind < 0.34 ? 'warn' : kind < 0.68 ? 'info' : 'warn' });
    };
    const first = window.setTimeout(mk, 2800);
    const interval = window.setInterval(mk, 13000 + Math.random() * 9000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [phase, regions]);

  useEffect(() => {
    if (!mapAlert) return;
    const t = window.setTimeout(() => setMapAlert(null), 3600);
    return () => window.clearTimeout(t);
  }, [mapAlert]);

  useEffect(() => {
    if (phase !== 'selection') {
      selectionWelcomeVoicePlayedRef.current = false;
      return;
    }

    const autoPlayTimer = window.setTimeout(() => {
      triggerSelectionWelcomeGreeting();
    }, 420);

    const handleFirstInteraction = () => {
      triggerSelectionWelcomeGreeting();
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true, capture: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true, capture: true });

    return () => {
      window.clearTimeout(autoPlayTimer);
      window.removeEventListener('pointerdown', handleFirstInteraction, true);
      window.removeEventListener('keydown', handleFirstInteraction, true);
    };
  }, [phase]);

  // #region debug-point A:init
  const dbgRunIdRef = useRef<'pre' | 'post'>('pre');
  const dbgLastSigRef = useRef<string>('');
  const dbg = useCallback((hypothesisId: string, location: string, msg: string, data?: Record<string, unknown>) => {
    try {
      fetch('http://127.0.0.1:7777/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: 'game-blank-screen',
          runId: dbgRunIdRef.current,
          hypothesisId,
          location,
          msg: `[DEBUG] ${msg}`,
          data: data ?? {},
          ts: Date.now(),
        }),
      }).catch(() => {});
    } catch {}
  }, []);

  useEffect(() => {
    dbg('A', 'TreeGame.tsx:dbg-init', 'mounted', { ua: navigator.userAgent });

    const onErr = (ev: ErrorEvent) => {
      dbg('A', 'window.onerror', 'runtime-error', {
        message: ev.message,
        filename: ev.filename,
        lineno: ev.lineno,
        colno: ev.colno,
        error: (ev.error && typeof ev.error === 'object' && 'stack' in ev.error) ? (ev.error as any).stack : String(ev.error ?? ''),
      });
    };

    const onRej = (ev: PromiseRejectionEvent) => {
      dbg('A', 'window.onunhandledrejection', 'unhandled-rejection', {
        reason: (ev.reason && typeof ev.reason === 'object' && 'stack' in ev.reason) ? (ev.reason as any).stack : String(ev.reason ?? ''),
      });
    };

    window.addEventListener('error', onErr);
    window.addEventListener('unhandledrejection', onRej);
    return () => {
      window.removeEventListener('error', onErr);
      window.removeEventListener('unhandledrejection', onRej);
    };
  }, [dbg]);

  useEffect(() => {
    const sig = JSON.stringify({
      phase,
      level,
      tutorialActive,
      tutorialStep,
      activeEvent: activeEvent?.type ?? null,
      pestTreeId,
      pollutionSources: pollutionSources.length,
      co2Level: Math.round(co2Level * 10) / 10,
      water: Math.round(water * 10) / 10,
      energy: Math.round(energy * 10) / 10,
      timer,
      trees: activeTrees.length,
    });
    if (sig === dbgLastSigRef.current) return;
    dbgLastSigRef.current = sig;
    dbg('B', 'TreeGame.tsx:state-sig', 'state-change', JSON.parse(sig));
  }, [activeEvent?.type, activeTrees.length, co2Level, dbg, energy, level, pestTreeId, phase, pollutionSources.length, timer, tutorialActive, tutorialStep, water]);
  // #endregion

  // --- 1. CORE PHYSICS & STATE ---
  const [charPos, setCharPos] = useState({ x: 500, y: 500 });
  const charPosRef = useRef({ x: 500, y: 500 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const charMotionX = useMotionValue(500);
  const charMotionY = useMotionValue(500);
  const charX = useSpring(charMotionX, { stiffness: 420, damping: 42, mass: 0.65 });
  const charY = useSpring(charMotionY, { stiffness: 420, damping: 42, mass: 0.65 });
  const camTargetX = useMotionValue(0);
  const camTargetY = useMotionValue(0);
  const camX = useSpring(camTargetX, { stiffness: 180, damping: 32, mass: 0.9 });
  const camY = useSpring(camTargetY, { stiffness: 180, damping: 32, mass: 0.9 });
  const gameLoopRef = useRef<number | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const isWalkingRef = useRef(false);
  const lastFrameTsRef = useRef<number | null>(null);
  const lastSyncTsRef = useRef<number>(0);
  const [activeParticles, setActiveParticles] = useState<any[]>([]);
  const [gameAreaSize, setGameAreaSize] = useState({ width: 1280, height: 720 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const tutorialOpenTimerRef = useRef<number | null>(null);
  const lastPlantAtRef = useRef<number>(Date.now());
  const idleReminderAtRef = useRef<number>(0);
  const timeWarnedRef = useRef<{ s60: boolean; s30: boolean; s10: boolean }>({ s60: false, s30: false, s10: false });
  const lastTreesCountRef = useRef<number>(0);

  const teleportPlayer = (x: number, y: number) => {
    const nx = Math.max(50, Math.min(2950, x));
    const ny = Math.max(50, Math.min(2950, y));
    velocityRef.current = { x: 0, y: 0 };
    charPosRef.current = { x: nx, y: ny };
    setCharPos({ x: nx, y: ny });
    charMotionX.set(nx);
    charMotionY.set(ny);
    camTargetX.set(-nx + window.innerWidth / 2);
    camTargetY.set(-ny + window.innerHeight / 2);
  };

  // --- 2. PARTICLE SYSTEM ---
  const spawnActionParticles = (x: number, y: number, color: string, count: number = 8) => {
    const newParticles = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10 - 5,
      life: 1.0,
      color,
      size: 4 + Math.random() * 6
    }));
    setActiveParticles(prev => [...prev, ...newParticles]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.5, // Gravity
          life: p.life - 0.02
        }))
        .filter(p => p.life > 0)
      );
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!pauseOpen) return;
    keysPressed.current.clear();
    velocityRef.current.x = 0;
    velocityRef.current.y = 0;
    setIsWalking(false);
  }, [pauseOpen]);

  // --- Input Handling ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (phase === 'planting') setPauseOpen(v => !v);
        return;
      }
      if (pauseOpen) return;
      keysPressed.current.add(e.code);
      if (e.code === 'KeyE') {
        handleInteraction();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeEvent, activeTrees, energy, pauseOpen, pestTreeId, phase, pollutionSources, selectedSeedling, tutorialActive, tutorialStep, water]);

  useEffect(() => {
    if (phase === 'planting') return;
    if (!pauseOpen) return;
    setPauseOpen(false);
  }, [pauseOpen, phase]);

  useEffect(() => {
    if (phase !== 'planting') return;
    if (!tutorialActive) return;
    if (tutorialStep !== 0) return;
    if (levelIntroOpen) return;

    teleportPlayer(tutorialSpot.x - 140, tutorialSpot.y + 40);
    camTargetX.set(-tutorialSpot.x + window.innerWidth / 2);
    camTargetY.set(-tutorialSpot.y + window.innerHeight / 2);

    if (tutorialOpenTimerRef.current) window.clearTimeout(tutorialOpenTimerRef.current);
    tutorialOpenTimerRef.current = window.setTimeout(() => {
      setTutorialStep(1);
      tutorialOpenTimerRef.current = null;
    }, 1200);

    return () => {
      if (tutorialOpenTimerRef.current) window.clearTimeout(tutorialOpenTimerRef.current);
      tutorialOpenTimerRef.current = null;
    };
  }, [levelIntroOpen, phase, tutorialActive, tutorialStep]);

  // --- 3. PHYSICS LOOP (LERP & VELOCITY) ---
  useEffect(() => {
    if (phase !== 'planting') return;
    if (pauseOpen) return;
    if (tutorialActive && tutorialStep === 0) return;

    const worldWidth = 3000;
    const worldHeight = 3000;
    const accel = 2200;
    const maxSpeed = 440;

    const update = (t: number) => {
      const last = lastFrameTsRef.current ?? t;
      const dt = Math.max(0.001, Math.min(0.05, (t - last) / 1000));
      lastFrameTsRef.current = t;

      let dx = 0;
      let dy = 0;

      if (keysPressed.current.has('KeyW') || keysPressed.current.has('ArrowUp')) dy -= 1;
      if (keysPressed.current.has('KeyS') || keysPressed.current.has('ArrowDown')) dy += 1;
      if (keysPressed.current.has('KeyA') || keysPressed.current.has('ArrowLeft')) dx -= 1;
      if (keysPressed.current.has('KeyD') || keysPressed.current.has('ArrowRight')) dx += 1;

      if (dx !== 0 || dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        const ix = dx / length;
        const iy = dy / length;
        velocityRef.current.x += ix * accel * dt;
        velocityRef.current.y += iy * accel * dt;
        
        if (dx < 0) setCharDirection('left');
        else if (dx > 0) setCharDirection('right');

        if (tutorialActive && tutorialStep === 1) {
          const distToSpot = Math.sqrt(Math.pow(charPosRef.current.x - tutorialSpot.x, 2) + Math.pow(charPosRef.current.y - tutorialSpot.y, 2));
          if (distToSpot < 80) {
            setTutorialStep(2);
            playReward();
          }
        }
      }

      const sp = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y);
      if (sp > maxSpeed) {
        const s = maxSpeed / sp;
        velocityRef.current.x *= s;
        velocityRef.current.y *= s;
      }

      const drag = Math.pow(0.00002, dt);
      velocityRef.current.x *= drag;
      velocityRef.current.y *= drag;

      const nextX = Math.max(50, Math.min(worldWidth - 50, charPosRef.current.x + velocityRef.current.x * dt));
      const nextY = Math.max(50, Math.min(worldHeight - 50, charPosRef.current.y + velocityRef.current.y * dt));

      charPosRef.current = { x: nextX, y: nextY };
      charMotionX.set(nextX);
      charMotionY.set(nextY);

      const walkingNow = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y) > 30;
      if (walkingNow !== isWalkingRef.current) {
        isWalkingRef.current = walkingNow;
        setIsWalking(walkingNow);
      }

      if (t - lastSyncTsRef.current > 33) {
        lastSyncTsRef.current = t;
        setCharPos({ x: nextX, y: nextY });
      }

      const targetX = -nextX + window.innerWidth / 2;
      const targetY = -nextY + window.innerHeight / 2;
      camTargetX.set(targetX);
      camTargetY.set(targetY);

      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      lastFrameTsRef.current = null;
    };
  }, [pauseOpen, phase, tutorialActive, tutorialStep]);

  useEffect(() => {
    if (phase !== 'seedling') {
      setSeedlingDraft(null);
      setSeedlingHoverId(null);
      setSeedlingCardTilt(null);
      setSeedlingSpotlight(null);
      if (seedlingSpotRafRef.current) window.cancelAnimationFrame(seedlingSpotRafRef.current);
      seedlingSpotRafRef.current = null;
    } else if (!seedlingDraft && selectedSeedling) {
      setSeedlingDraft(selectedSeedling);
    }
  }, [phase, seedlingDraft, selectedSeedling]);

  const seedlingProfile = useCallback((s: Seedling) => {
    if (s.id === 's1') return { growth: 0.72, co2: 0.78, drought: 0.55, flood: 0.62, label: 'Pelindung cepat tumbuh' };
    if (s.id === 's2') return { growth: 0.50, co2: 0.66, drought: 0.62, flood: 0.48, label: 'Kayu bernilai tinggi' };
    return { growth: 0.64, co2: 0.70, drought: 0.78, flood: 0.44, label: 'Tahan kering & pegunungan' };
  }, []);

  const recommendedSeedlingId = useMemo(() => {
    if (!selectedRegion) return 's1';
    if (selectedRegion.status === 'gersang') return 's3';
    if (selectedRegion.status === 'kritis') return 's1';
    return 's2';
  }, [selectedRegion]);

  const activeSeedlingChoice = useMemo(() => {
    if (seedlingDraft) return seedlingDraft;
    return seedlings.find(s => s.id === recommendedSeedlingId) ?? seedlings[0];
  }, [recommendedSeedlingId, seedlingDraft]);

  const activeSeedlingCompatibility = useMemo(() => {
    const prof = seedlingProfile(activeSeedlingChoice);
    if (!selectedRegion) return 72;
    if (selectedRegion.status === 'gersang') return Math.round((prof.drought * 0.5 + prof.growth * 0.2 + prof.co2 * 0.15 + prof.flood * 0.15) * 100);
    if (selectedRegion.status === 'kritis') return Math.round((prof.co2 * 0.4 + prof.growth * 0.35 + prof.drought * 0.15 + prof.flood * 0.1) * 100);
    return Math.round((prof.growth * 0.25 + prof.co2 * 0.2 + prof.drought * 0.2 + prof.flood * 0.35) * 100);
  }, [activeSeedlingChoice, seedlingProfile, selectedRegion]);

  const spawnRestoration = useCallback((x: number, y: number, intensity: number = 1) => {
    const id = Date.now() + Math.floor(Math.random() * 100000);
    setRestorationPatches(prev => [...prev, { id, x, y, bornAt: Date.now(), intensity }].slice(-18));
    const wid = Date.now() + Math.floor(Math.random() * 100000);
    setRestoreWaves(prev => [...prev, { id: wid, x, y }]);
    window.setTimeout(() => {
      setRestoreWaves(prev => prev.filter(w => w.id !== wid));
    }, 900);
    const rid = Date.now() + Math.floor(Math.random() * 100000);
    setRipples(prev => [...prev, { id: rid, x, y, tone: 'good' }]);
    window.setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rid));
    }, 650);
  }, []);

  // --- 4. ENHANCED INTERACTION ---
  const handleInteraction = () => {
    if (phase !== 'planting') return;
    if (levelIntroOpen) return;
    const currentPos = charPosRef.current;
    // #region debug-point D:interaction
    dbg('D', 'TreeGame.tsx:handleInteraction', 'press-e', {
      phase,
      level,
      actionId,
      tutorialActive,
      tutorialStep,
      activeEvent: activeEvent?.type ?? null,
      pestTreeId,
      pollutionSources: pollutionSources.length,
      x: Math.round(currentPos.x),
      y: Math.round(currentPos.y),
    });
    // #endregion

    if (tutorialActive) {
      if (tutorialStep === 2) {
        const dist = Math.sqrt(Math.pow(currentPos.x - tutorialSpot.x, 2) + Math.pow(currentPos.y - tutorialSpot.y, 2));
        if (dist < 120) {
          spawnActionParticles(tutorialSpot.x, tutorialSpot.y, '#5d4037', 15);
          setActionId('hole');
          setActionProgress(0);
          const interval = setInterval(() => {
            setActionProgress(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                setActionId(null);
                setTutorialStep(3);
                // Add the hole to activeTrees
                setActiveTrees([{
                  id: Date.now(),
                  x: tutorialSpot.x,
                  y: tutorialSpot.y,
                  type: selectedSeedling?.name || 'Mahoni',
                  stage: 0,
                  health: 100,
                  moisture: 100,
                  growth: 0,
                  lastTicked: Date.now()
                }]);
                return 0;
              }
              if (prev % 20 === 0) spawnActionParticles(tutorialSpot.x, tutorialSpot.y, '#5d4037', 5);
              return prev + 5;
            });
          }, 50);
        }
        return;
      }
      if (tutorialStep === 3) {
        const dist = Math.sqrt(Math.pow(currentPos.x - tutorialSpot.x, 2) + Math.pow(currentPos.y - tutorialSpot.y, 2));
        if (dist < 120) {
          setActionId('plant');
          setActionProgress(0);
          const interval = setInterval(() => {
            setActionProgress(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                setActionId(null);
                setTutorialStep(4);
                // Update hole to seedling
                setActiveTrees(prevTrees => prevTrees.map(t => 
                  (t.x === tutorialSpot.x && t.y === tutorialSpot.y) 
                  ? { ...t, stage: 2 } 
                  : t
                ));
                lastPlantAtRef.current = Date.now();
                return 0;
              }
              return prev + 5;
            });
          }, 50);
        }
        return;
      }
      if (tutorialStep === 4) {
        const nearTree = activeTrees.find(tree => {
          const dist = Math.sqrt(Math.pow(currentPos.x - tree.x, 2) + Math.pow(currentPos.y - tree.y, 2));
          return dist < 120;
        });
        if (nearTree) {
          spawnActionParticles(nearTree.x, nearTree.y, '#3b82f6', 15);
          setTutorialActive(false);
          setUnlockedRadius(2500);
          setToast({ id: Date.now(), title: 'TUTORIAL SELESAI', subtitle: 'Level 1 dimulai: ambil bibit dan siapkan alat tanam', tone: 'good' });
          // Update to sprout
          setActiveTrees(prevTrees => prevTrees.map(t => 
            t.id === nearTree.id ? { ...t, stage: 3, moisture: 100 } : t
          ));
        }
        return;
      }
      return;
    }

    if (activeEvent?.type === 'POLLUTION_SPIKE' && pollutionSources.length > 0) {
      const src = pollutionSources.find(s => {
        const dx = currentPos.x - s.x;
        const dy = currentPos.y - s.y;
        return Math.sqrt(dx * dx + dy * dy) < 140;
      });
      if (src) {
        setActionId('clean');
        setActionProgress(0);
        const interval = window.setInterval(() => {
          setActionProgress(prev => {
            if (prev >= 100) {
              window.clearInterval(interval);
              setActionId(null);
              setPollutionSources(prevS => prevS.filter(p => p.id !== src.id));
              setCo2Level(prev => Math.max(0, prev - (12 + src.strength * 2)));
              spawnActionParticles(src.x, src.y, '#34d399', 18);
              spawnRipple(src.x, src.y, 'good');
              spawnFloatText(src.x, src.y - 46, 'Sumber polusi disegel', 'good');
              playReward();
              return 0;
            }
            if (prev % 20 === 0) spawnActionParticles(src.x, src.y, '#10b981', 6);
            return prev + 8;
          });
        }, 40);
        return;
      }
    }

    if (activeEvent?.type === 'PESTS' && pestTreeId) {
      const t = activeTrees.find(tt => tt.id === pestTreeId) ?? null;
      if (t) {
        const dx = currentPos.x - t.x;
        const dy = currentPos.y - t.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          setActionId('pest');
          setActionProgress(0);
          const interval = window.setInterval(() => {
            setActionProgress(prev => {
              if (prev >= 100) {
                window.clearInterval(interval);
                setActionId(null);
                setPestTreeId(null);
                setActiveTrees(prevTrees => prevTrees.map(tree => (tree.id === t.id ? { ...tree, health: Math.min(100, tree.health + 22) } : tree)));
                spawnActionParticles(t.x, t.y, '#f97316', 18);
                spawnRipple(t.x, t.y, 'good');
                spawnFloatText(t.x, t.y - 46, 'Hama dibersihkan', 'good');
                playReward();
                return 0;
              }
              if (prev % 16 === 0) spawnActionParticles(t.x, t.y - 18, '#ef4444', 5);
              return prev + 10;
            });
          }, 40);
          return;
        }
      }
    }

    const nearestPlot = plots.find(p => {
      const dist = Math.sqrt(Math.pow(currentPos.x - p.cx, 2) + Math.pow(currentPos.y - p.cy, 2));
      return dist < 120;
    });

    if (nearestPlot) {
      const existingTree = activeTrees.find(t => t.x === nearestPlot.cx && t.y === nearestPlot.cy);
      if (!existingTree) {
        if (level === 2 && nearestPlot.id !== activePlotId) {
          spawnFloatText(currentPos.x, currentPos.y - 42, 'Ikuti titik yang menyala', 'warn');
          return;
        }
        if (energy >= 20) {
          setActionId('hole');
          setActionProgress(0);
          const interval = setInterval(() => {
            setActionProgress(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                setActionId(null);
                handleFreePlant(nearestPlot.cx, nearestPlot.cy);
                return 0;
              }
              if (prev % 20 === 0) spawnActionParticles(nearestPlot.cx, nearestPlot.cy, '#5d4037', 5);
              return prev + 5;
            });
          }, 50);
        } else {
          spawnFloatText(currentPos.x, currentPos.y, 'Energi Habis!', 'warn');
        }
      } else {
        spawnActionParticles(nearestPlot.cx, nearestPlot.cy, '#3b82f6', 10);
        handleWaterTree(existingTree.id);
      }
    }
  };

  const handleFreePlant = (x: number, y: number) => {
    if (energy < 20) {
      spawnFloatText(x, y, 'Energi Habis!', 'warn');
      return;
    }
    setEnergy(prev => Math.max(0, prev - 20));
    setActiveTrees(prev => [...prev, {
      id: Date.now(),
      x,
      y,
      type: selectedSeedling?.name || 'Mahoni',
      stage: 1,
      health: 100,
      moisture: 100,
      growth: 0,
      lastTicked: Date.now()
    }]);
    lastPlantAtRef.current = Date.now();
    idleReminderAtRef.current = 0;
    spawnActionParticles(x, y, '#10b981', 15);
    spawnFloatText(x, y - 40, '-20 Energi', 'warn');
    playReward();
  };

  const handleWaterTree = (id: number) => {
    if (water < 10) {
      const tree = activeTrees.find(t => t.id === id);
      if (tree) spawnFloatText(tree.x, tree.y, 'Air Habis!', 'warn');
      setToast({ id: Date.now(), title: 'Air Habis!', tone: 'warn' });
      return;
    }
    const before = activeTrees.find(t => t.id === id) ?? null;
    const shouldRestore = Boolean(before && before.stage < 3);
    setActionId('water');
    window.setTimeout(() => setActionId(null), 260);
    setWater(prev => Math.max(0, prev - 10));
    setActiveTrees(prev => {
      const next = prev.map(t => {
        if (t.id !== id) return t;
        const nextMoisture = Math.min(100, t.moisture + 30);
        const nextStage = t.stage < 3 ? 3 : t.stage;
        const nextGrowth = nextStage >= 3 ? Math.max(t.growth, 48) : t.growth;
        return { ...t, moisture: nextMoisture, stage: nextStage, growth: nextGrowth };
      });

      if (level === 2) {
        const watered = next.find(t => t.id === id) ?? null;
        const plotId = watered ? (plots.find(p => p.cx === watered.x && p.cy === watered.y)?.id ?? null) : null;
        const alreadyCompleted = plotId ? (level2Stages[plotId] ?? 0) >= 1 : false;
        if (plotId && watered && watered.stage >= 3 && !alreadyCompleted) {
          setLevel2Stages(s => ({ ...s, [plotId]: 1 }));
          const comboActive = Boolean(level2LastCompletedAt && Date.now() - level2LastCompletedAt <= level2ComboWindowMs);
          const nextCombo = comboActive ? Math.min(5, level2Combo + 1) : 1;
          const waterBonus = Math.min(20, 6 + nextCombo * 3);
          const energyBonus = Math.min(18, 5 + nextCombo * 2);

          setLevel2Combo(nextCombo);
          setLevel2LastCompletedAt(Date.now());
          setLevel2ComboExpiresAt(Date.now() + level2ComboWindowMs);
          setWater(prev => Math.min(100, prev + waterBonus));
          setEnergy(prev => Math.min(100, prev + energyBonus));
          spawnFloatText(watered.x, watered.y - 68, nextCombo > 1 ? `Combo x${nextCombo}` : 'Rush aktif!', 'good');
          setToast({
            id: Date.now() + 5,
            title: nextCombo > 1 ? `Combo Restorasi x${nextCombo}!` : 'Bonus Rush aktif',
            subtitle: `Bonus +${waterBonus} air, +${energyBonus} energi. Kejar target berikutnya sebelum 14 detik habis!`,
            tone: 'good',
          });
          const nextPlot = plotOrder.find(pid => {
            const p = plots.find(pp => pp.id === pid);
            if (!p) return false;
            const t = next.find(tt => tt.x === p.cx && tt.y === p.cy);
            return !(t && t.stage >= 3);
          });
          if (nextPlot) setActivePlotId(nextPlot);
        }
      }

      return next;
    });
    if (shouldRestore && before) spawnRestoration(before.x, before.y, 1.1);
    spawnFloatText(charPosRef.current.x, charPosRef.current.y - 40, '-10 Air', 'warn');
    playReward();
  };

  // --- Real-time Game Loop ---
  useEffect(() => {
    if (phase !== 'planting') return;
    if (pauseOpen) return;

    const interval = setInterval(() => {
      const now = Date.now();

      const level2Done = (['p1', 'p2', 'p3', 'p4'] as const).reduce((acc, pid) => acc + ((level2Stages[pid] ?? 0) >= 1 ? 1 : 0), 0);
      const needsProgress =
        level === 1 ? plantingStep < level1Steps.length : level === 2 ? level2Done < 4 : false;

      if (!tutorialActive && !levelIntroOpen) {

        if (activeTrees.length !== lastTreesCountRef.current) {
          lastTreesCountRef.current = activeTrees.length;
          lastPlantAtRef.current = now;
          idleReminderAtRef.current = 0;
        }

        if (needsProgress) {
          const idleMs = now - lastPlantAtRef.current;
          if (idleMs > 22000 && now - idleReminderAtRef.current > 24000) {
            idleReminderAtRef.current = now;
            setToast({
              id: now + 3,
              title: level === 1 ? 'Ayo siapkan perlengkapan' : 'Ayo mulai menanam',
              subtitle: level === 1 ? 'Selesaikan 2 persiapan awal: ambil bibit dan cek alat tanam' : 'Kejar target berikutnya untuk memicu combo bonus',
              tone: 'info',
            });
          }
        }
      }

      setTimer(prev => {
        if (level === 1) return prev;
        if (prev <= 0) {
          setPhase('gameover');
          return 0;
        }
        if (!tutorialActive && !levelIntroOpen && needsProgress) {
          if (prev === 60 && !timeWarnedRef.current.s60) {
            timeWarnedRef.current.s60 = true;
            setToast({ id: now, title: 'Waktu hampir habis', subtitle: 'Sisa 60 detik. Ayo tanam pohon!', tone: 'warn' });
          }
          if (prev === 30 && !timeWarnedRef.current.s30) {
            timeWarnedRef.current.s30 = true;
            setToast({ id: now + 1, title: 'Sisa 30 detik', subtitle: 'Gerak cepat, selesaikan target!', tone: 'warn' });
          }
          if (prev === 10 && !timeWarnedRef.current.s10) {
            timeWarnedRef.current.s10 = true;
            setToast({ id: now + 2, title: 'Sisa 10 detik', subtitle: 'Tanam atau siram sekarang!', tone: 'warn' });
          }
        }
        return prev - 1;
      });

      if (!tutorialActive && !levelIntroOpen && level === 2) {
        if (activeEvent && now >= activeEvent.endsAt) {
          setActiveEvent(null);
          setPestTreeId(null);
          setPollutionSources([]);
          nextEventAtRef.current = now + 24000 + Math.random() * 22000;
        }

        if (activeEvent?.type === 'POLLUTION_SPIKE' && pollutionSources.length === 0) {
          setActiveEvent(null);
          nextEventAtRef.current = now + 24000 + Math.random() * 22000;
        }

        if (!activeEvent && now >= nextEventAtRef.current) {
          const base: AdrenalineEventType[] = ['HEATWAVE', 'RAINSTORM', 'PESTS', 'POLLUTION_SPIKE'];
          const choices = base.filter(t => (t === 'PESTS' ? activeTrees.length > 0 : true));
          const picked = choices[Math.floor(Math.random() * Math.max(1, choices.length))] ?? 'HEATWAVE';
          const duration = 12000 + Math.random() * 9000;
          const event: ActiveAdrenalineEvent = { id: now, type: picked, startedAt: now, endsAt: now + duration };
          setActiveEvent(event);
          nextEventAtRef.current = now + 26000 + Math.random() * 26000;

          if (picked === 'HEATWAVE') {
            setToast({ id: now, title: 'HEATWAVE', subtitle: 'Panas ekstrem! Tanah cepat kering — bergerak cepat!', tone: 'warn' });
            setWater(prev => Math.max(0, prev - 8));
          }
          if (picked === 'RAINSTORM') {
            setToast({ id: now, title: 'HUJAN DERAS', subtitle: 'Air bonus, tapi banjir bisa merusak akar!', tone: 'info' });
            setWater(prev => Math.min(100, prev + 18));
          }
          if (picked === 'PESTS') {
            const candidates = activeTrees.filter(t => t.health > 0);
            const target = candidates[Math.floor(Math.random() * Math.max(1, candidates.length))] ?? null;
            if (target) {
              setPestTreeId(target.id);
              setToast({ id: now, title: 'HAMA MENYERANG', subtitle: 'Cari pohon yang diserang dan tekan [E] untuk bersihkan!', tone: 'warn' });
              spawnActionParticles(target.x, target.y - 20, '#ef4444', 10);
              // #region debug-point C:event-start
              dbg('C', 'TreeGame.tsx:event', 'event-start', { type: picked, targetTreeId: target.id, endsInMs: duration });
              // #endregion
            }
          }
          if (picked === 'POLLUTION_SPIKE') {
            setToast({ id: now, title: 'POLUSI MELEDAK', subtitle: 'Segel sumber polusi! Kejar ikon peringatan lalu tekan [E]', tone: 'warn' });
            setCo2Level(prev => Math.min(180, prev + 12));
            const c = charPosRef.current;
            const sources: PollutionSource[] = Array.from({ length: 3 }, (_, i) => {
              const a = (i / 3) * Math.PI * 2 + Math.random() * 0.8;
              const d = 320 + Math.random() * 520;
              return {
                id: `${now}-${i}`,
                x: clampWorld(c.x + Math.cos(a) * d),
                y: clampWorld(c.y + Math.sin(a) * d),
                strength: 6 + Math.floor(Math.random() * 6),
              };
            });
            setPollutionSources(sources);
            // #region debug-point C:event-start
            dbg('C', 'TreeGame.tsx:event', 'event-start', { type: picked, sources: sources.map(s => ({ id: s.id, x: Math.round(s.x), y: Math.round(s.y), strength: s.strength })), endsInMs: duration });
            // #endregion
          }
          if (picked === 'HEATWAVE' || picked === 'RAINSTORM') {
            // #region debug-point C:event-start
            dbg('C', 'TreeGame.tsx:event', 'event-start', { type: picked, endsInMs: duration });
            // #endregion
          }
        }
      }

      if (level === 2) {
        // Level 2 adalah fase survival utama, jadi event, degradasi pohon, dan win/lose berjalan di sini.
        let newlyRestored: Array<{ x: number; y: number }> = [];
        const isHeatwave = activeEvent?.type === 'HEATWAVE';
        const isRainstorm = activeEvent?.type === 'RAINSTORM';
        const isPests = activeEvent?.type === 'PESTS';
        const isPollutionSpike = activeEvent?.type === 'POLLUTION_SPIKE';

        if (isHeatwave) setWater(prev => Math.max(0, prev - 0.9));
        if (isRainstorm) setWater(prev => Math.min(100, prev + 2.2));

        if (isPests && pestTreeId && now - pestPulseAtRef.current > 650) {
          pestPulseAtRef.current = now;
          const t = activeTrees.find(tt => tt.id === pestTreeId) ?? null;
          if (t) spawnActionParticles(t.x, t.y - 18, '#ef4444', 8);
        }

        if (isPollutionSpike && pollutionSources.length > 0 && now - pollutionPulseAtRef.current > 700) {
          pollutionPulseAtRef.current = now;
          for (const s of pollutionSources) spawnActionParticles(s.x, s.y - 20, '#94a3b8', 6);
        }

        setActiveTrees(prevTrees => {
          let co2Reduction = 0;
          const pollutionAdd =
            isPollutionSpike
              ? 2.6 + pollutionSources.reduce((acc, s) => acc + s.strength * 0.22, 0) + (effectiveWeather === 'polluted' ? 0.6 : 0)
              : 0;

          const nextTrees = prevTrees.map(tree => {
            let healthLoss = 0;
            if (effectiveWeather === 'polluted') healthLoss += 1.1;
            if (tree.moisture < 10) healthLoss += 2.4;
            if (isHeatwave) healthLoss += 2.1;
            if (isRainstorm && tree.moisture > 95) healthLoss += 2.0;
            if (isPests && pestTreeId && tree.id === pestTreeId) healthLoss += 6.0;

            const nextHealth = Math.max(0, tree.health - healthLoss);

            let waterLoss = 0.5;
            if (effectiveWeather === 'drought') waterLoss = 2.5;
            if (effectiveWeather === 'sunny') waterLoss = 1.2;
            if (effectiveWeather === 'rainy') waterLoss = -3.0;
            if (isHeatwave) waterLoss += 1.8;
            if (isRainstorm) waterLoss -= 2.0;

            const nextMoisture = Math.max(0, Math.min(100, tree.moisture - waterLoss));

            let growthAdd = 0;
            if (nextMoisture > 20 && nextHealth > 30) {
              growthAdd = 0.85;
              if (effectiveWeather === 'rainy') growthAdd *= 1.8;
              if (effectiveWeather === 'drought') growthAdd *= 0.62;
              if (effectiveWeather === 'polluted') growthAdd *= 0.36;
              if (isHeatwave) growthAdd *= 0.55;
              if (isPests && pestTreeId && tree.id === pestTreeId) growthAdd *= 0.35;
            }

            const nextGrowth = Math.min(100, tree.growth + growthAdd);
            const nextStage = Math.floor(nextGrowth / 16);

            if (tree.stage < 3 && nextStage >= 3 && !restoredTreeIdsRef.current.has(tree.id)) {
              restoredTreeIdsRef.current.add(tree.id);
              newlyRestored.push({ x: tree.x, y: tree.y });
            }

            if (nextHealth > 20) co2Reduction += (nextStage * 0.18);

            return { ...tree, health: nextHealth, moisture: nextMoisture, growth: nextGrowth, stage: nextStage };
          });

          if (nextTrees.length > 0 && nextTrees.every(t => t.health <= 0)) setPhase('gameover');

          setCo2Level(prevCO2 => {
            const next = Math.max(0, Math.min(180, prevCO2 - co2Reduction + pollutionAdd));
            if (next >= 170) setPhase('gameover');
            return next;
          });

          return nextTrees;
        });

        if (newlyRestored.length > 0) {
          for (const p of newlyRestored) spawnRestoration(p.x, p.y, 1.18);
        }

        if (co2Level <= (currentMission?.targetCO2 ?? 40)) {
          setToast({ id: Date.now(), title: 'Berhasil!', subtitle: 'Target CO2 tercapai', tone: 'good' });
          setPhase('finished');
        }
      }

      // Dynamic Weather Engine
      if (!activeEvent && Math.random() < 0.08) {
        const roll = Math.random();
        let nextWeather: typeof weather = 'sunny';
        if (roll < 0.2) nextWeather = 'rainy';
        else if (roll < 0.4) nextWeather = 'drought';
        else if (roll < 0.5) nextWeather = 'polluted';
        
        if (nextWeather !== weather) {
          setWeather(nextWeather);
          const weatherMessages = {
            rainy: 'Hujan turun! Kelembaban pohon meningkat.',
            drought: 'Kekeringan melanda! Air cepat menguap.',
            polluted: 'Polusi udara meningkat! Pertumbuhan terhambat.',
            sunny: 'Cuaca cerah kembali normal.'
          };
          setToast({ id: Date.now(), title: 'CUACA BERUBAH', subtitle: weatherMessages[nextWeather], tone: 'info' });
        }
      }

      // Replenish Energy (Resting)
      setEnergy(prev => Math.min(100, prev + (activeEvent ? 0.7 : 1.5)));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeEvent, activeTrees, clampWorld, co2Level, currentMission, effectiveWeather, level, level2Stages, levelIntroOpen, pauseOpen, pestTreeId, phase, plantingStep, pollutionSources, spawnRestoration, tutorialActive, weather]);


  const level1Steps = [
    { id: 'hole', title: 'Ambil Bibit', icon: Trees, text: 'Ambil bibit utama dari pos distribusi dan pastikan jenisnya sesuai dengan wilayah yang akan dipulihkan.', edu: 'Pemilihan bibit yang tepat sejak awal membuat proses restorasi lebih efektif dan peluang hidup tanaman lebih tinggi.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'fertilizer', title: 'Siapkan Pupuk', icon: Thermometer, text: 'Siapkan pupuk organik dasar agar perlengkapan tanam sudah lengkap sebelum masuk ke area kerja.', edu: 'Pupuk organik memperbaiki struktur tanah dan membantu akar muda beradaptasi setelah bibit ditanam.', impact: { co2: 1, water: 2, temp: 0, bio: 2 } satisfies EnvImpact },
    { id: 'plant', title: 'Cek Sekop & Sarung Tangan', icon: Shovel, text: 'Periksa sekop, sarung tangan, dan perlengkapan inti agar penanaman berjalan aman dan cepat.', edu: 'Peralatan yang siap pakai mengurangi kesalahan saat tanam dan membantu pekerjaan lapangan lebih efisien.', impact: { co2: 2, water: 1, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'cover', title: 'Rapikan Area Kerja', icon: Sprout, text: 'Susun area kerja dan tandai titik tanam supaya proses penanaman nanti lebih terarah.', edu: 'Penataan area tanam yang rapi membuat tim lebih mudah bergerak dan mencegah bibit tertukar lokasi.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'water', title: 'Isi Cadangan Air', icon: Droplets, text: 'Isi cadangan air untuk penyiraman awal agar bibit tidak kekurangan kelembaban setelah ditanam.', edu: 'Cadangan air penting untuk fase awal tanam karena akar muda masih sangat sensitif terhadap kekeringan.', impact: { co2: 1, water: 4, temp: 0, bio: 1 } satisfies EnvImpact },
    { id: 'sun', title: 'Briefing Lokasi Tanam', icon: Sun, text: 'Tinjau pencahayaan dan kondisi lapangan sebagai briefing terakhir sebelum masuk ke Level 2.', edu: 'Mengenali kondisi cahaya, arah angin, dan lokasi tanam membuat keputusan penanaman jauh lebih tepat.', impact: { co2: 4, water: 1, temp: 3, bio: 2 } satisfies EnvImpact },
  ];

  const level2Steps = [
    { id: 'hole', title: 'Gali Lubang (Lahan Luas)', icon: Shovel, text: 'Sekarang lahannya lebih luas. Gali lubang untuk pohon berikutnya di area target yang menyala.', edu: 'Menanam banyak pohon di lokasi yang tepat membantu mengurangi risiko erosi dan meningkatkan resapan air.', impact: { co2: 1, water: 3, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'fertilizer', title: 'Pupuk Dasar', icon: Thermometer, text: 'Taburkan pupuk organik agar tanah siap menumbuhkan akar yang kuat.', edu: 'Tanah yang kaya bahan organik menyimpan air lebih lama dan mendukung jamur/mikroba baik di tanah.', impact: { co2: 1, water: 2, temp: 0, bio: 2 } satisfies EnvImpact },
    { id: 'plant', title: 'Letakkan Bibit', icon: Trees, text: 'Letakkan bibit ke dalam lubang dengan hati-hati. Pastikan posisinya tegak lurus.', edu: 'Bibit yang sehat dan tertanam benar punya peluang hidup lebih tinggi, sehingga restorasi lebih efektif.', impact: { co2: 2, water: 1, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'cover', title: 'Tutup Tanah', icon: Sprout, text: 'Tutup kembali lubang dengan tanah dan tekan perlahan agar bibit tertanam kokoh.', edu: 'Penutupan tanah membantu mengurangi penguapan dan melindungi akar dari hujan deras yang bisa menggeser bibit.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'water', title: 'Penyiraman', icon: Droplets, text: 'Siram dengan air yang cukup agar tanah lembab dan merangsang pertumbuhan tunas baru.', edu: 'Penyiraman awal sangat penting. Terlalu sedikit membuat bibit layu, terlalu banyak membuat akar kekurangan oksigen.', impact: { co2: 1, water: 4, temp: 0, bio: 1 } satisfies EnvImpact },
    { id: 'sun', title: 'Perawatan Matahari', icon: Sun, text: 'Pastikan tanaman mendapat sinar matahari yang cukup untuk proses fotosintesis.', edu: 'Pohon yang tumbuh akan membentuk kanopi yang meneduhkan. Ini menurunkan suhu sekitar dan membantu keanekaragaman hayati.', impact: { co2: 4, water: 1, temp: 3, bio: 2 } satisfies EnvImpact },
  ];

  const currentSteps = level === 1 ? level1Steps : level2Steps;
  const activeStep = useMemo(() => currentSteps[Math.min(currentSteps.length - 1, plantingStep)], [currentSteps, plantingStep]);
  const activeStepId = activeStep?.id ?? '';

  const spotlight = useMemo(() => {
    const c =
      activeStepId === 'hole' || activeStepId === 'fertilizer' || activeStepId === 'cover'
        ? { a: 'rgba(245,158,11,0.24)', b: 'rgba(245,158,11,0.08)' }
        : activeStepId === 'plant'
          ? { a: 'rgba(34,197,94,0.22)', b: 'rgba(34,197,94,0.07)' }
          : activeStepId === 'water'
            ? { a: 'rgba(59,130,246,0.22)', b: 'rgba(59,130,246,0.08)' }
            : activeStepId === 'sun'
              ? { a: 'rgba(250,204,21,0.22)', b: 'rgba(250,204,21,0.08)' }
              : { a: 'rgba(255,255,255,0.20)', b: 'rgba(255,255,255,0.06)' };
    return {
      ring: `radial-gradient(circle, ${c.a} 0%, ${c.b} 22%, rgba(255,255,255,0) 64%)`,
      dot: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.0) 62%)',
    };
  }, [activeStepId]);

  const worldBaseBg = useMemo(() => {
    if (effectiveWeather === 'rainy') return 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)';
    if (effectiveWeather === 'drought') return 'linear-gradient(180deg, #451a03 0%, #78350f 100%)';
    if (effectiveWeather === 'polluted') return 'linear-gradient(180deg, #1e293b 0%, #334155 100%)';
    return 'linear-gradient(180deg, #064e3b 0%, #065f46 100%)';
  }, [effectiveWeather]);

  const sunFx = useMemo(() => {
    const rgb =
      effectiveWeather === 'rainy'
        ? '56,189,248'
        : effectiveWeather === 'drought'
          ? '250,204,21'
          : effectiveWeather === 'polluted'
            ? '148,163,184'
            : '34,197,94';
    const phase01 = Math.max(0, Math.min(1, dayPhase / 100));
    const strength =
      effectiveWeather === 'rainy'
        ? 0.55
        : effectiveWeather === 'drought'
          ? 0.75
          : effectiveWeather === 'polluted'
            ? 0.42
            : 0.62;
    const opacity = (0.18 + phase01 * 0.10) * strength * gfx.sunBloom;
    return { rgb, opacity };
  }, [dayPhase, effectiveWeather, gfx.sunBloom]);

  const getActionHint = (stepId: string) => {
    if (level === 1) {
      if (stepId === 'hole') return 'Klik untuk ambil bibit';
      if (stepId === 'fertilizer') return 'Klik untuk siapkan pupuk';
      if (stepId === 'plant') return 'Klik untuk cek alat';
      if (stepId === 'cover') return 'Klik untuk rapikan area';
      if (stepId === 'water') return 'Klik untuk isi air';
      if (stepId === 'sun') return 'Klik untuk briefing';
    }
    if (stepId === 'hole') return 'Klik untuk menggali';
    if (stepId === 'fertilizer') return 'Klik untuk memberi pupuk';
    if (stepId === 'plant') return 'Klik untuk menanam';
    if (stepId === 'cover') return 'Klik untuk menutup tanah';
    if (stepId === 'water') return 'Klik untuk menyiram';
    if (stepId === 'sun') return 'Klik untuk merawat';
    return 'Klik untuk aksi';
  };

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

  const requiredPlot = useMemo(() => plots.find(p => p.id === requiredPlotId) ?? null, [plots, requiredPlotId]);
  const guide = useMemo(() => {
    if (phase !== 'planting') return null;
    if (!requiredPlot) return null;
    const from = { x: charPos.x + 30, y: charPos.y + 40 };
    const to = { x: requiredPlot.cx, y: requiredPlot.cy };
    return { from, to };
  }, [charPos.x, charPos.y, phase, requiredPlot]);

  const plotOrder = useMemo(() => ['p1', 'p2', 'p3', 'p4'] as const, []);

  const plotTreeById = useMemo(() => {
    const map = new Map<string, ActiveTree>();
    for (const p of plots) {
      const t = activeTrees.find(tt => tt.x === p.cx && tt.y === p.cy);
      if (t) map.set(p.id, t);
    }
    return map;
  }, [activeTrees, plots]);

  const level2CompletedCount = useMemo(() => {
    if (level !== 2) return 0;
    let done = 0;
    for (const id of plotOrder) {
      const t = plotTreeById.get(id);
      if (t && t.stage >= 3) done += 1;
    }
    return done;
  }, [level, plotOrder, plotTreeById]);

  useEffect(() => {
    if (phase !== 'planting') return;
    if (tutorialActive) return;
    if (level !== 2) return;
    if (level2CompletedCount < 4) return;
    setPhase('finished');
  }, [level, level2CompletedCount, phase, tutorialActive]);

  useEffect(() => {
    if (!level2ComboExpiresAt) return;
    const remaining = level2ComboExpiresAt - Date.now();
    if (remaining <= 0) {
      setLevel2Combo(0);
      setLevel2ComboExpiresAt(null);
      return;
    }
    const timeout = window.setTimeout(() => {
      setLevel2Combo(0);
      setLevel2ComboExpiresAt(null);
    }, remaining + 40);
    return () => window.clearTimeout(timeout);
  }, [level2ComboExpiresAt]);

  const ensureAudioContext = () => {
    if (!audioOn) return null;
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      audioCtxRef.current = new Ctx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  };

  const playTone = (freq: number, durationMs: number, type: OscillatorType, gain01: number) => {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const now = ctx.currentTime;
    const g0 = Math.max(0, Math.min(1, gain01)) * audioVolume;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(g0, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
    osc.connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationMs / 1000 + 0.02);
  };

  const playNoise = (durationMs: number, gain01: number, lowpassHz: number, bandpassHz?: number) => {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const length = Math.max(1, Math.floor((ctx.sampleRate * durationMs) / 1000));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain();
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, Math.min(1, gain01)) * audioVolume, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = lowpassHz;
    if (bandpassHz) {
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = bandpassHz;
      src.connect(bp).connect(lp).connect(g).connect(ctx.destination);
    } else {
      src.connect(lp).connect(g).connect(ctx.destination);
    }
    src.start(now);
    src.stop(now + durationMs / 1000 + 0.02);
  };

  const playUiHover = () => playTone(540, 60, 'triangle', 0.05);
  const playUiClick = () => playTone(330, 85, 'square', 0.06);
  const playFootstep = () => playNoise(70, 0.18, 900, 170);
  const playDig = () => playNoise(160, 0.32, 720, 140);
  const playReward = () => {
    playTone(660, 90, 'sine', 0.08);
    window.setTimeout(() => playTone(990, 120, 'sine', 0.08), 70);
  };
  const playWelcomeGreeting = useCallback(() => {
    if (!audioOn) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    playTone(520, 90, 'sine', 0.06);
    window.setTimeout(() => playTone(780, 120, 'sine', 0.05), 85);
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(
      'Mari bergerak bersama masyarakat untuk menanam pohon. Selamat datang di halaman pemilihan wilayah restorasi. Dari langkah kecil memilih daerah yang ingin dipulihkan, kita bisa mengajak masyarakat menghadirkan udara yang lebih bersih, lingkungan yang lebih teduh, dan masa depan yang lebih hijau untuk bersama.'
    );
    utter.lang = 'id-ID';
    utter.rate = 0.92;
    utter.pitch = 1.02;
    utter.volume = Math.max(0.35, Math.min(1, audioVolume));
    const voices = synth.getVoices();
    const preferredVoice =
      voices.find((voice) => /^id\b/i.test(voice.lang)) ??
      voices.find((voice) => /^ms\b/i.test(voice.lang)) ??
      voices[0];
    if (preferredVoice) utter.voice = preferredVoice;
    synth.cancel();
    synth.speak(utter);
  }, [audioOn, audioVolume]);
  function triggerSelectionWelcomeGreeting() {
    if (selectionWelcomeVoicePlayedRef.current) return;
    selectionWelcomeVoicePlayedRef.current = true;
    playWelcomeGreeting();
  }

  const lastMapHoverIdRef = useRef<string | null>(null);
  const lastMapHoverAtRef = useRef<number>(0);
  useEffect(() => {
    if (phase !== 'selection') return;
    if (!hoveredRegion) return;
    if (hoveredRegion.id === lastMapHoverIdRef.current) return;
    const now = Date.now();
    if (now - lastMapHoverAtRef.current < 110) return;
    lastMapHoverAtRef.current = now;
    lastMapHoverIdRef.current = hoveredRegion.id;
    playUiHover();
  }, [hoveredRegion, phase]);

  const startAmbience = () => {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    if (ambienceRef.current?.src) return;

    const length = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 0.9;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 520;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 70;
    const gain = ctx.createGain();
    gain.gain.value = 0.06 * audioVolume;

    src.connect(hp).connect(lp).connect(gain).connect(ctx.destination);
    src.start();
    ambienceRef.current = { src, gain };
  };

  const stopAmbience = () => {
    if (!ambienceRef.current?.src) return;
    try { ambienceRef.current.src.stop(); } catch { }
    ambienceRef.current = null;
  };

  useEffect(() => {
    if (phase !== 'planting') return;
    if (!audioOn) {
      stopAmbience();
      return;
    }
    startAmbience();
    return () => stopAmbience();
  }, [audioOn, audioVolume, phase]);

  const spawnFloatText = (x: number, y: number, text: string, tone: 'xp' | 'good' | 'warn') => {
    const id = Date.now() + Math.floor(Math.random() * 9999);
    setFloatTexts(prev => [...prev, { id, x, y, text, tone }]);
    window.setTimeout(() => {
      setFloatTexts(prev => prev.filter(t => t.id !== id));
    }, 1100);
  };

  const spawnParticle = (x: number, y: number, kind: 'footstep' | 'dirt') => {
    const id = Date.now() + Math.floor(Math.random() * 9999);
    setParticles(prev => [...prev, { id, x, y, kind }]);
    window.setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, kind === 'dirt' ? 700 : 520);
  };

  const spawnRipple = (x: number, y: number, tone: 'soil' | 'plant' | 'water' | 'sun' | 'good') => {
    const id = Date.now() + Math.floor(Math.random() * 9999);
    setRipples(prev => [...prev, { id, x, y, tone }]);
    window.setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 640);
  };

  const isNearTarget = () => {
    const plot = plots.find(p => p.id === requiredPlotId);
    if (!plot) return false;
    // New character center (feet are at charPos.x, charPos.y)
    const charCenterX = charPos.x;
    const charCenterY = charPos.y - 40;
    const distance = Math.sqrt(Math.pow(charCenterX - plot.cx, 2) + Math.pow(charCenterY - plot.cy, 2));
    return distance < Math.max(100, plot.size * 0.6);
  };

  const nearTargetNow = useMemo(() => isNearTarget(), [charPos.x, charPos.y, plots, requiredPlotId]);

  const interactionHint = useMemo(() => {
    if (phase !== 'planting') return null;
    if (pauseOpen) return null;
    if (levelIntroOpen) return null;

    const dist = (ax: number, ay: number, bx: number, by: number) => {
      const dx = ax - bx;
      const dy = ay - by;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const currentX = charPos.x;
    const currentY = charPos.y;

    if (tutorialActive) {
      const d = dist(currentX, currentY, tutorialSpot.x, tutorialSpot.y);
      if (tutorialStep === 2 && d < 160) return { key: 'E', tone: 'info' as const, title: 'Tekan E', subtitle: 'Gali lubang' };
      if (tutorialStep === 3 && d < 160) return { key: 'E', tone: 'info' as const, title: 'Tekan E', subtitle: 'Tanam bibit' };
      if (tutorialStep === 4) {
        const nearTree = activeTrees.some(t => dist(currentX, currentY, t.x, t.y) < 160);
        if (nearTree) return { key: 'E', tone: 'info' as const, title: 'Tekan E', subtitle: 'Siram pohon' };
      }
      return null;
    }

    if (activeEvent?.type === 'POLLUTION_SPIKE' && pollutionSources.length > 0) {
      const src = pollutionSources.find(s => dist(currentX, currentY, s.x, s.y) < 160);
      if (src) return { key: 'E', tone: 'warn' as const, title: 'Tekan E', subtitle: 'Bersihkan polusi' };
    }

    if (activeEvent?.type === 'PESTS' && pestTreeId) {
      const t = activeTrees.find(tt => tt.id === pestTreeId) ?? null;
      if (t && dist(currentX, currentY, t.x, t.y) < 160) return { key: 'E', tone: 'warn' as const, title: 'Tekan E', subtitle: 'Basmi hama' };
    }

    const nearestPlot = plots.find(p => dist(currentX, currentY, p.cx, p.cy) < 160) ?? null;
    if (!nearestPlot) return null;

    const existingTree = activeTrees.find(t => t.x === nearestPlot.cx && t.y === nearestPlot.cy) ?? null;
    if (!existingTree) {
      if (level === 2 && nearestPlot.id !== activePlotId) return { key: 'E', tone: 'warn' as const, title: 'Target Salah', subtitle: 'Ikuti titik yang menyala' };
      if (energy < 20) return { key: 'E', tone: 'warn' as const, title: 'Energi Kurang', subtitle: 'Butuh 20 energi untuk gali' };
      return { key: 'E', tone: 'info' as const, title: 'Tekan E', subtitle: 'Gali & tanam' };
    }

    if (water < 10) return { key: 'E', tone: 'warn' as const, title: 'Air Habis', subtitle: 'Cari hujan / tunggu regen' };
    return { key: 'E', tone: 'info' as const, title: 'Tekan E', subtitle: 'Siram pohon' };
  }, [activeEvent?.type, activePlotId, activeTrees, charPos.x, charPos.y, energy, level, levelIntroOpen, pauseOpen, pestTreeId, plots, pollutionSources, phase, tutorialActive, tutorialSpot.x, tutorialSpot.y, tutorialStep, water]);

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

  const moveCharacter = (dx: number, dy: number) => {
    const moveSpeed = 15; // Speed for discrete moves (DPad)
    const worldWidth = 3000;
    const worldHeight = 3000;

    setCharPos(prev => {
      const nextX = Math.max(50, Math.min(worldWidth - 50, prev.x + dx * moveSpeed));
      const nextY = Math.max(50, Math.min(worldHeight - 50, prev.y + dy * moveSpeed));
      
      if (dx < 0) setCharDirection('left');
      if (dx > 0) setCharDirection('right');
      
      // Tutorial progression for movement
      if (tutorialActive && tutorialStep === 1) {
        const distToSpot = Math.sqrt(Math.pow(nextX - tutorialSpot.x, 2) + Math.pow(nextY - tutorialSpot.y, 2));
        if (distToSpot < 80) {
          setTimeout(() => {
            setTutorialStep(2);
            playReward();
          }, 10);
        }
      }

      return { x: nextX, y: nextY };
    });
    setIsWalking(true);
    // Auto stop walking animation after delay
    setTimeout(() => setIsWalking(false), 200);
  };

  const beginRegionSelect = (region: Region) => {
    if (mapFocusLock) return;
    setMapFocusLock(true);
    setMapFocusRegionId(region.id);
    setHoveredRegion(region);
    playUiClick();
    if (region.status !== 'hijau') {
      setMapTransition({ id: Date.now(), region });
      playNoise(140, 0.20, 1800, 720);
      commitRegionSelect(region);
    }
    if (regionSelectTimerRef.current) window.clearTimeout(regionSelectTimerRef.current);
    regionSelectTimerRef.current = window.setTimeout(() => {
      setMapFocusLock(false);
      setMapFocusRegionId(null);
      regionSelectTimerRef.current = null;
      setMapTransition(null);
    }, REGION_SELECT_LOCK_MS);
  };

  const commitRegionSelect = (region: Region) => {
    setGameLoading({
      id: Date.now(),
      title: `Memasuki ${region.name}`,
      subtitle: 'Mempersiapkan pemilihan bibit & briefing misi…',
      accent: region.status === 'kritis' ? 'warn' : region.status === 'gersang' ? 'danger' : 'eco',
      tip: 'Pilih bibit yang sesuai kondisi wilayah. Setelah itu kamu langsung masuk ke gameplay.',
      durationMs: REGION_LOADING_MS,
      stages: ['Memindai wilayah', 'Memuat briefing', 'Siap pilih bibit'],
    });
    setSelectedRegion(region);
    setPhase('seedling');
    playReward();
    setToast({ 
      id: Date.now(), 
      title: 'Wilayah Dipilih!', 
      subtitle: `Memulai misi di ${region.name}`, 
      tone: 'good' 
    });
    
    // Set mission based on difficulty
    const mission = missions.find(m => {
      if (region.status === 'gersang') return m.difficulty === 'hard';
      if (region.status === 'kritis') return m.difficulty === 'medium';
      return m.difficulty === 'easy';
    }) || missions[0];
    
    setCurrentMission(mission);
    setWater(mission.initialWater);
    setEnergy(mission.initialEnergy);
    setTimer(mission.timeLimit);
    setCo2Level(100);
  };

  const handleSeedlingSelect = (seedling: Seedling) => {
    setSelectedSeedling(seedling);
    setGameLoading({
      id: Date.now(),
      title: 'Memuat Dunia Restorasi',
      subtitle: 'Membangun lahan, cuaca, partikel, dan sistem event…',
      accent: 'eco',
      tip: 'WASD/Arrow untuk bergerak, E untuk aksi. Fokus ke titik menyala saat Level 2.',
      durationMs: GAME_ENTRY_LOADING_MS,
      stages: ['Membangun lahan', 'Menyiapkan event', 'Sinkronisasi tutorial'],
    });
    window.requestAnimationFrame(() => {
      startTransition(() => {
        setPhase('planting');
        setLevel(1);
        setPlantingStep(0);
        setActionProgress(0);
        setActionPlotId(null);
        setLevelIntroOpen(true);
        setLevel2Stages({ p1: 0, p2: 0, p3: 0, p4: 0 });
        setActivePlotId('p1');
        setTutorialActive(true);
        setTutorialStep(0);
        setUnlockedRadius(450);
        setActiveTrees([]);
        lastPlantAtRef.current = Date.now();
        idleReminderAtRef.current = 0;
        timeWarnedRef.current = { s60: false, s30: false, s10: false };
        lastTreesCountRef.current = 0;
        teleportPlayer(120, 120);
        setEnvScore({ co2: 0, water: 0, temp: 0, bio: 0 });
        setPlotMoisture({ p1: 45, p2: 45, p3: 45, p4: 45 });
        setPlotHealth({ p1: 75, p2: 75, p3: 75, p4: 75 });
        setDayPhase(0);
      });
    });
  };

  const mascotAttention = useMemo<MascotAttention | null>(() => {
    if (phase !== 'selection') return null;
    const region = hoveredRegion;
    const kind: MascotAttention['kind'] =
      region && mapFocusLock && mapFocusRegionId === region.id ? 'click' : region ? 'hover' : 'idle';

    const seedFromText = (s: string) => {
      let acc = 0;
      for (let i = 0; i < s.length; i += 1) acc = (acc * 31 + s.charCodeAt(i)) >>> 0;
      return acc;
    };
    const pick = <T,>(options: T[], seed: number) => options[Math.abs(seed) % options.length];
    const seed =
      seedFromText(region?.id ?? 'idle') +
      (kind === 'click' ? 7 : kind === 'hover' ? 3 : 0) +
      (region?.status === 'hijau' ? 11 : region?.status === 'kritis' ? 13 : region?.status === 'gersang' ? 17 : 0);

    if (!region) {
      return {
        kind: 'idle',
        pose: 'point',
        tone: 'neutral',
        hint: 'Analisis',
        message: pick(
          [
            'Hover wilayah di peta, lalu klik area Oranye/Merah untuk mulai restorasi.',
            'Arahkan kursor ke peta, pilih wilayah yang butuh bantuan, lalu mulai aksi.',
            'Klik wilayah Oranye/Merah untuk mulai pemulihan lahan.',
          ],
          seed,
        ),
      };
    }

    if (region.status === 'hijau') {
      return {
        kind,
        pose: kind === 'click' ? 'cheer' : 'guard',
        tone: 'happy',
        hint: kind === 'click' ? 'Apresiasi' : 'Stabil',
        message: pick(
          [
            `${region.name} sudah stabil. Lanjut bantu area lain ya.`,
            `Bagus! ${region.name} terjaga. Cari wilayah Oranye/Merah untuk dipulihkan.`,
            `Mantap, ${region.name} hijau dan aman. Ayo cari area yang perlu perhatian.`,
          ],
          seed,
        ),
      };
    }

    if (region.status === 'kritis') {
      return {
        kind,
        pose: kind === 'click' ? 'plant' : 'point',
        tone: 'neutral',
        hint: kind === 'click' ? 'Mulai Aksi' : 'Saran',
        message: pick(
          [
            `Klik ${region.name} untuk mulai restorasi bertahap.`,
            `${region.name} butuh pemulihan. Mulai dari tanam dan rawat.`,
            `Area ini perlu aksi. Klik ${region.name} untuk mulai.`,
          ],
          seed,
        ),
      };
    }

    return {
      kind,
      pose: 'worry',
      tone: 'worried',
      hint: 'Perhatian',
      message: pick(
        [
          `Wilayah ${region.name} butuh perhatian 🌱`,
          `${region.name} cukup gersang. Prioritaskan restorasi.`,
          `Hati-hati, ${region.name} perlu pemulihan segera.`,
        ],
        seed,
      ),
    };
  }, [hoveredRegion, mapFocusLock, mapFocusRegionId, phase]);

  useEffect(() => {
    return () => {
      if (actionTimerRef.current.intervalId) window.clearInterval(actionTimerRef.current.intervalId);
      if (actionTimerRef.current.timeoutId) window.clearTimeout(actionTimerRef.current.timeoutId);
      actionTimerRef.current.intervalId = null;
      actionTimerRef.current.timeoutId = null;
      if (regionSelectTimerRef.current) window.clearTimeout(regionSelectTimerRef.current);
      regionSelectTimerRef.current = null;
      if (pointerRafRef.current) window.cancelAnimationFrame(pointerRafRef.current);
      pointerRafRef.current = null;
      if (footstepTimerRef.current) window.clearInterval(footstepTimerRef.current);
      footstepTimerRef.current = null;
      if (digParticleTimerRef.current) window.clearInterval(digParticleTimerRef.current);
      digParticleTimerRef.current = null;
      if (ambienceRef.current?.src) {
        try { ambienceRef.current.src.stop(); } catch { }
      }
      ambienceRef.current = null;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
      audioCtxRef.current = null;
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

    playUiClick();
    setActionPlotId(plotId);
    setActionProgress(0);

    const startAt = Date.now();
    if (actionTimerRef.current.intervalId) window.clearInterval(actionTimerRef.current.intervalId);
    if (actionTimerRef.current.timeoutId) window.clearTimeout(actionTimerRef.current.timeoutId);
    if (digParticleTimerRef.current) window.clearInterval(digParticleTimerRef.current);
    digParticleTimerRef.current = null;

    const plot = plots.find(p => p.id === plotId);
    if (plot) setCharDirection((charPos.x + 30) > plot.cx ? 'left' : 'right');
    setIsWalking(false);
    const fxX = plot?.cx ?? (charPos.x + 30);
    const fxY = (plot?.cy ?? (charPos.y + 40)) + 18;
    const baseTone: 'soil' | 'plant' | 'water' | 'sun' | 'good' =
      stepId === 'hole' || stepId === 'cover' || stepId === 'fertilizer' ? 'soil'
        : stepId === 'plant' ? 'plant'
          : stepId === 'water' ? 'water'
            : stepId === 'sun' ? 'sun'
              : 'good';
    const baseIntensity =
      stepId === 'hole' ? 1
        : stepId === 'plant' ? 0.8
          : stepId === 'water' ? 0.7
            : stepId === 'sun' ? 0.65
              : 0.6;
    setScreenFx({ id: Date.now(), intensity: baseIntensity });
    spawnRipple(fxX, fxY, baseTone);
    try { navigator.vibrate?.(stepId === 'hole' ? 18 : 12); } catch { }

    if (stepId === 'hole') {
      const originX = plot?.cx ?? (charPos.x + 30);
      const originY = (plot?.cy ?? (charPos.y + 40)) + 26;
      let tick = 0;
      digParticleTimerRef.current = window.setInterval(() => {
        const x = originX + (-18 + Math.random() * 36);
        const y = originY + (-10 + Math.random() * 24);
        spawnParticle(x, y, 'dirt');
        tick += 1;
        if (tick % 2 === 0) playDig();
      }, 90);
    }

    let lastPulse = -1;
    let plantedPulse = false;
    let wateredPulse = false;
    let sunPulse = false;
    actionTimerRef.current.intervalId = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - startAt) / durationMs);
      setActionProgress(p * 100);
      const seg = Math.floor((p * 100) / 20);
      if (seg !== lastPulse) {
        lastPulse = seg;
        if (stepId === 'hole') {
          setScreenFx({ id: Date.now() + seg, intensity: 0.7 });
          spawnRipple(fxX + (-6 + Math.random() * 12), fxY + 10, 'soil');
          try { navigator.vibrate?.(12); } catch { }
        }
      }
      if (stepId === 'plant' && !plantedPulse && p > 0.68) {
        plantedPulse = true;
        setScreenFx({ id: Date.now(), intensity: 0.65 });
        spawnRipple(fxX, fxY + 6, 'plant');
        try { navigator.vibrate?.(10); } catch { }
      }
      if (stepId === 'water' && !wateredPulse && p > 0.52) {
        wateredPulse = true;
        setScreenFx({ id: Date.now(), intensity: 0.55 });
        spawnRipple(fxX, fxY + 2, 'water');
        try { navigator.vibrate?.(8); } catch { }
      }
      if (stepId === 'sun' && !sunPulse && p > 0.5) {
        sunPulse = true;
        setScreenFx({ id: Date.now(), intensity: 0.5 });
        spawnRipple(fxX + 12, fxY - 18, 'sun');
        try { navigator.vibrate?.(8); } catch { }
      }
    }, 50);

    actionTimerRef.current.timeoutId = window.setTimeout(() => {
      if (actionTimerRef.current.intervalId) window.clearInterval(actionTimerRef.current.intervalId);
      actionTimerRef.current.intervalId = null;
      if (digParticleTimerRef.current) window.clearInterval(digParticleTimerRef.current);
      digParticleTimerRef.current = null;
      setActionProgress(100);
      window.setTimeout(() => {
        setActionProgress(0);
        setActionPlotId(null);
        handleActionComplete(plotId);
      }, 120);
    }, durationMs);
  };

  const handleActionComplete = (plotId: string) => {
    const completedStep = currentSteps[Math.min(currentSteps.length - 1, plantingStep)];
    const stepId = completedStep?.id ?? '';
    const impact = completedStep?.impact ?? ({ co2: 0, water: 0, temp: 0, bio: 0 } as EnvImpact);
    const plot = plots.find(p => p.id === plotId) ?? plots.find(p => p.id === requiredPlotId);
    const fxX = plot?.cx ?? (charPos.x + 30);
    const fxY = (plot?.cy ?? (charPos.y + 40)) - 40;
    const xpDelta =
      stepId === 'hole' ? 10 :
      stepId === 'fertilizer' ? 8 :
      stepId === 'plant' ? 12 :
      stepId === 'cover' ? 8 :
      stepId === 'water' ? 10 :
      stepId === 'sun' ? 10 :
      6;

    spawnFloatText(fxX, fxY, `+${xpDelta} XP`, 'xp');
    spawnFloatText(
      fxX,
      fxY + 18,
      level === 1
        ? stepId === 'hole'
          ? 'Bibit siap dibawa'
          : stepId === 'plant'
            ? 'Alat tanam siap'
            : 'Persiapan selesai'
        : stepId === 'hole'
          ? 'Berhasil menggali'
          : 'Aksi berhasil',
      'good'
    );
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
    if (isTooWet) spawnFloatText(fxX, fxY + 36, 'Terlalu basah', 'warn');
    if (isTooDry) spawnFloatText(fxX, fxY + 36, 'Terlalu kering', 'warn');
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

    playReward();
    setPlayerXP(prevXP => {
      const threshold = 60 + playerRank * 20;
      const nextXP = prevXP + xpDelta;
      if (nextXP >= threshold) {
        setPlayerRank(r => r + 1);
        setLevelUpFxId(Date.now());
        spawnFloatText(fxX, fxY - 26, 'LEVEL UP!', 'good');
        return nextXP - threshold;
      }
      return nextXP;
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

  useEffect(() => {
    if (!levelUpFxId) return;
    const t = window.setTimeout(() => setLevelUpFxId(null), 1300);
    return () => window.clearTimeout(t);
  }, [levelUpFxId]);

  useEffect(() => {
    if (!gameLoading) return;
    const t = window.setTimeout(() => setGameLoading(null), Math.max(260, gameLoading.durationMs));
    return () => window.clearTimeout(t);
  }, [gameLoading]);

  return (
    <div className="min-h-screen py-3 sm:py-4 px-4 font-sans select-none overflow-hidden relative">
      <input
        ref={characterFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onCharacterSkinFileChange}
      />
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
      <AnimatePresence>
        {gameLoading && (
          <GameLoadingOverlay
            key={`game-loading-${gameLoading.id}`}
            title={gameLoading.title}
            subtitle={gameLoading.subtitle}
            accent={gameLoading.accent}
            tip={gameLoading.tip}
            durationMs={gameLoading.durationMs}
            stages={gameLoading.stages}
          />
        )}
      </AnimatePresence>
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
              className="bg-slate-950/70 backdrop-blur-2xl p-6 sm:p-8 rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.55)] border border-white/10 flex-1 flex flex-col overflow-hidden relative"
            >
              <div className="absolute inset-0 pointer-events-none opacity-80" style={{ backgroundImage: 'radial-gradient(circle at 12% 10%, rgba(16,185,129,0.18) 0 260px, transparent 520px), radial-gradient(circle at 88% 24%, rgba(56,189,248,0.14) 0 260px, transparent 560px), radial-gradient(circle at 60% 90%, rgba(245,158,11,0.10) 0 320px, transparent 620px), linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.55) 100%)' }} />
              <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 flex items-center justify-center gap-3">
                  <MapPin className="text-emerald-400" /> Eksplorasi Bandung Raya
                </h1>
                <p className="text-white/70 text-sm font-bold">Pilih wilayah Merah/Oranye untuk mulai restorasi. Hover untuk lihat data live.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
                <div className="lg:col-span-7 flex flex-col items-center justify-center">
                  <div className="w-full max-w-[680px] relative">
                    <InteractiveMap
                      regions={regions}
                      onHover={setHoveredRegion}
                      hoveredRegion={hoveredRegion}
                      focusedRegionId={mapFocusRegionId}
                      weatherByRegionId={weatherByRegionId}
                      regionFxAt={mapRegionFxAt}
                      restorationWave={mapRestorationWave}
                      statusAnimByRegionId={mapStatusAnimByRegionId}
                      onResetFocus={() => {
                        setMapFocusRegionId(null);
                        setMapFocusLock(false);
                        setMapTransition(null);
                        if (regionSelectTimerRef.current) window.clearTimeout(regionSelectTimerRef.current);
                        regionSelectTimerRef.current = null;
                      }}
                      onSelect={beginRegionSelect}
                    />
                    <AnimatePresence>
                      {mapTransition && (
                        <motion.div
                          key={`map-cine-${mapTransition.id}`}
                          className="absolute inset-0 z-[70] pointer-events-none rounded-[2rem] overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            animate={{ opacity: [0.05, 0.26, 0.08], filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] }}
                            transition={{ duration: 0.76, ease: 'easeInOut' }}
                            style={{
                              backgroundImage:
                                'radial-gradient(circle at 50% 45%, rgba(56,189,248,0.20) 0 240px, rgba(2,6,23,0.0) 560px), radial-gradient(circle at 50% 55%, rgba(16,185,129,0.14) 0 220px, rgba(2,6,23,0.0) 520px)',
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 opacity-30"
                            animate={{ backgroundPosition: ['0% 0%', '0% 120%'] }}
                            transition={{ repeat: Infinity, duration: 0.55, ease: 'linear' }}
                            style={{
                              backgroundImage:
                                'repeating-linear-gradient(180deg, rgba(255,255,255,0.0) 0 10px, rgba(255,255,255,0.06) 10px 11px, rgba(255,255,255,0.0) 11px 22px)',
                              mixBlendMode: 'overlay',
                            }}
                          />
                          <motion.div
                            className="absolute left-0 top-0 h-full w-[28%] opacity-40"
                            animate={{ x: ['-35%', '120%'] }}
                            transition={{ duration: 0.72, ease: 'easeInOut' }}
                            style={{
                              backgroundImage:
                                'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(56,189,248,0.12) 25%, rgba(255,255,255,0.0) 55%, rgba(16,185,129,0.10) 75%, rgba(255,255,255,0.0) 100%)',
                              filter: 'blur(0.5px)',
                            }}
                          />
                          <div className="absolute left-4 bottom-4 px-4 py-3 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-xl">
                            <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.25em]">Scan</div>
                            <div className="text-white font-black tracking-tight">{mapTransition.region.name}</div>
                            <div className="text-[11px] font-bold text-white/70">Mengunci wilayah & memuat misi…</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col">
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 h-full flex flex-col shadow-[inset_0_0_90px_rgba(16,185,129,0.10)]">
                    <h3 className="text-lg font-black text-white mb-4 uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                      <Info size={20} className="text-emerald-300" /> Analisis Lahan
                    </h3>
                    <div className="flex-1 min-h-0 flex flex-col">
                      <AnimatePresence mode="wait">
                        {hoveredRegion || selectedRegion ? (
                          <motion.div
                            key={(hoveredRegion || selectedRegion)?.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="mb-4"
                          >
                            <div className={`p-4 rounded-2xl border-2 mb-3 bg-white ${
                              (hoveredRegion || selectedRegion)?.status === 'hijau' ? 'border-emerald-400' :
                              (hoveredRegion || selectedRegion)?.status === 'kritis' ? 'border-orange-400' : 'border-red-400'
                            }`}>
                              <h4 className="text-xl font-black">{(hoveredRegion || selectedRegion)?.name}</h4>
                              <p className="text-[10px] font-black uppercase opacity-50">Status: {(hoveredRegion || selectedRegion)?.status}</p>
                            </div>
                            <p className="text-sm text-white/75 font-bold italic mb-4 leading-relaxed">"{(hoveredRegion || selectedRegion)?.description}"</p>
                            
                            {(hoveredRegion || selectedRegion)?.status !== 'hijau' ? (
                              <button
                                onClick={() => beginRegionSelect((hoveredRegion || selectedRegion)!)}
                                className="w-full bg-emerald-500 text-slate-950 py-4 rounded-2xl font-black shadow-[0_20px_50px_rgba(16,185,129,0.25)] hover:shadow-[0_24px_70px_rgba(16,185,129,0.30)] transition-all flex items-center justify-center gap-2 active:scale-95 relative overflow-hidden"
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
                              <div className="flex flex-col items-center gap-2 text-emerald-200 font-black p-4 bg-white/5 rounded-2xl border border-emerald-500/25">
                                <ShieldCheck size={32} />
                                <span className="text-[10px] uppercase">Wilayah Terproteksi</span>
                              </div>
                            )}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>

                      <div className="mt-auto sticky bottom-0 pt-3 -mx-6 px-6 pb-3 bg-gradient-to-t from-slate-950/85 via-slate-950/65 to-transparent">
                        <div className="flex items-center justify-end gap-2 mb-2">
                          <button
                            type="button"
                            onClick={() => { setShowAnalysisMascot(true); requestCharacterSkinFile(); }}
                            className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 shadow-sm text-[10px] font-black uppercase tracking-widest text-emerald-100 inline-flex items-center gap-2 active:scale-95 transition-transform"
                          >
                            <Sparkles size={14} />
                            Ganti Maskot
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAnalysisMascot(v => !v)}
                            className="px-3 py-1.5 rounded-full bg-white/8 border border-white/12 shadow-sm text-[10px] font-black uppercase tracking-widest text-white/80 inline-flex items-center gap-2 active:scale-95 transition-transform"
                          >
                            {showAnalysisMascot ? <EyeOff size={14} /> : <Eye size={14} />}
                            {showAnalysisMascot ? 'Sembunyikan' : 'Tampilkan'}
                          </button>
                        </div>

                        {showAnalysisMascot && (
                          <EnvMascotCard
                            mode={hoveredRegion || selectedRegion ? 'compact' : 'full'}
                            regionName={(hoveredRegion || selectedRegion)?.name}
                            regionStatus={(hoveredRegion || selectedRegion)?.status ?? null}
                            attention={mascotAttention}
                            onGuide={() => setGuideOpen(true)}
                            avatarSrc={characterSkin}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {mapAlert && (
                  <motion.div
                    key={`map-alert-${mapAlert.id}`}
                    className="absolute top-6 right-6 z-[120] w-[340px] max-w-[calc(100%-48px)]"
                    initial={{ opacity: 0, y: -14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        playUiClick();
                        playWelcomeGreeting();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          playUiClick();
                          playWelcomeGreeting();
                        }
                      }}
                      className={`rounded-[2rem] border backdrop-blur-2xl p-5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] cursor-pointer active:scale-[0.99] transition-transform ${
                        mapAlert.tone === 'warn' ? 'bg-red-500/10 border-red-400/20' : mapAlert.tone === 'good' ? 'bg-emerald-500/10 border-emerald-400/20' : 'bg-blue-500/10 border-blue-400/20'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                            mapAlert.tone === 'warn' ? 'bg-red-500/20 text-red-200' : mapAlert.tone === 'good' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-blue-500/20 text-blue-200'
                          }`}
                        >
                          <AlertTriangle size={22} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.25em]">Alert</div>
                          <div className="text-white font-black tracking-tight leading-tight">{mapAlert.title}</div>
                          <div className="mt-1 text-[12px] text-white/75 font-bold leading-relaxed">{mapAlert.subtitle}</div>
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/70">
                            <Volume2 size={12} />
                            Klik untuk dengar sambutan
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

          {phase === 'seedling' && (
            <motion.div
              key="seedling"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-emerald-100/80 max-w-5xl mx-auto w-full overflow-hidden relative"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-80"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 14% 18%, rgba(16,185,129,0.22) 0 260px, transparent 520px), radial-gradient(circle at 86% 22%, rgba(56,189,248,0.16) 0 260px, transparent 520px), radial-gradient(circle at 50% 120%, rgba(245,158,11,0.14) 0 360px, transparent 680px)',
                }}
              />
              <div
                className="relative"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
                  const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / Math.max(1, rect.height)));
                  if (seedlingSpotRafRef.current) window.cancelAnimationFrame(seedlingSpotRafRef.current);
                  seedlingSpotRafRef.current = window.requestAnimationFrame(() => {
                    setSeedlingSpotlight({ x: nx, y: ny });
                    seedlingSpotRafRef.current = null;
                  });
                }}
                onMouseLeave={() => {
                  if (seedlingSpotRafRef.current) window.cancelAnimationFrame(seedlingSpotRafRef.current);
                  seedlingSpotRafRef.current = null;
                  setSeedlingSpotlight(null);
                }}
              >
                <div
                  className="absolute inset-[-24px] pointer-events-none rounded-[3.2rem]"
                  style={{
                    backgroundImage: `radial-gradient(circle at ${Math.round((seedlingSpotlight?.x ?? 0.5) * 100)}% ${Math.round((seedlingSpotlight?.y ?? 0.35) * 100)}%, rgba(255,255,255,0.70) 0 140px, rgba(16,185,129,0.22) 200px, transparent 520px)`,
                    opacity: seedlingSpotlight ? 1 : 0.65,
                    transition: 'opacity 180ms ease',
                    filter: 'blur(0.2px)',
                  }}
                />
                <motion.div
                  className="absolute inset-[-24px] pointer-events-none opacity-60"
                  animate={{ backgroundPosition: ['0% 0%', '0% 120%'] }}
                  transition={{ repeat: Infinity, duration: 6.5, ease: 'linear' }}
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(180deg, rgba(255,255,255,0.0) 0 12px, rgba(255,255,255,0.10) 12px 13px, rgba(255,255,255,0.0) 13px 26px)',
                    mixBlendMode: 'overlay',
                  }}
                />
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute pointer-events-none rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.55, 0],
                      x: ['-10%', '110%'],
                      y: [`${18 + i * 10}%`, `${10 + i * 9}%`],
                    }}
                    transition={{ repeat: Infinity, duration: 10 + i * 1.2, delay: i * 0.9, ease: 'linear' }}
                    style={{
                      width: 10 + (i % 3) * 6,
                      height: 10 + (i % 3) * 6,
                      backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.28), rgba(56,189,248,0.10) 55%, transparent 72%)',
                      filter: 'blur(0.2px)',
                    }}
                  />
                ))}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-gradient-to-r from-emerald-200 to-sky-200 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border border-white/60 shadow-sm">
                        Langkah 1: Pemilihan Bibit
                      </span>
                      {selectedRegion && (
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                            selectedRegion.status === 'hijau'
                              ? 'bg-emerald-500/12 text-emerald-800 border border-emerald-200'
                              : selectedRegion.status === 'kritis'
                                ? 'bg-amber-500/14 text-amber-900 border border-amber-200'
                                : 'bg-red-500/14 text-red-900 border border-red-200'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              selectedRegion.status === 'hijau'
                                ? 'bg-emerald-500'
                                : selectedRegion.status === 'kritis'
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                            }`}
                          />
                          {selectedRegion.name}
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mt-3 tracking-tight">Pilih Bibit Pohon</h2>
                    <p className="text-gray-500 text-sm mt-2 font-bold">
                      Klik untuk preview. Klik 2x untuk langsung mulai.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playUiClick();
                        setPhase('selection');
                        setSelectedRegion(null);
                        setSelectedSeedling(null);
                        setHoveredRegion(null);
                        setMapFocusRegionId(null);
                        setMapTransition(null);
                      }}
                      className="px-4 py-3 rounded-2xl bg-white/70 hover:bg-white border border-emerald-100 text-[10px] font-black uppercase tracking-widest text-gray-700 active:scale-95 transition-transform shadow-sm"
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSeedlingSelect(activeSeedlingChoice)}
                      className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-emerald-900/15"
                    >
                      Masuk Game
                    </button>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Analisis Wilayah',
                      value: selectedRegion?.name ?? 'Wilayah belum dipilih',
                      subtitle: selectedRegion?.status === 'gersang' ? 'Area panas dan cenderung kering' : selectedRegion?.status === 'kritis' ? 'Perlu pohon cepat tumbuh' : 'Ekosistem relatif stabil',
                      tone: selectedRegion?.status === 'gersang' ? 'amber' : selectedRegion?.status === 'kritis' ? 'rose' : 'emerald',
                      icon: MapPin,
                    },
                    {
                      title: 'Bibit Aktif',
                      value: activeSeedlingChoice.name,
                      subtitle: seedlingProfile(activeSeedlingChoice).label,
                      tone: 'sky',
                      icon: Sprout,
                    },
                    {
                      title: 'Skor Kecocokan',
                      value: `${activeSeedlingCompatibility}%`,
                      subtitle: activeSeedlingCompatibility >= 80 ? 'Sangat direkomendasikan' : activeSeedlingCompatibility >= 65 ? 'Cocok untuk dicoba' : 'Bisa dibandingkan lagi',
                      tone: activeSeedlingCompatibility >= 80 ? 'emerald' : activeSeedlingCompatibility >= 65 ? 'amber' : 'rose',
                      icon: Sparkles,
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className={`rounded-[2.2rem] border p-5 relative overflow-hidden ${
                        item.tone === 'emerald'
                          ? 'bg-emerald-500/10 border-emerald-200/70'
                          : item.tone === 'amber'
                            ? 'bg-amber-500/10 border-amber-200/70'
                            : item.tone === 'rose'
                              ? 'bg-rose-500/10 border-rose-200/70'
                              : 'bg-sky-500/10 border-sky-200/70'
                      }`}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-40"
                        animate={{ x: ['-30%', '130%'] }}
                        transition={{ repeat: Infinity, duration: 4.6 + idx * 0.5, ease: 'linear' }}
                        style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)' }}
                      />
                      <div className="relative flex items-start gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                          item.tone === 'emerald'
                            ? 'bg-emerald-500/15 text-emerald-700'
                            : item.tone === 'amber'
                              ? 'bg-amber-500/15 text-amber-700'
                              : item.tone === 'rose'
                                ? 'bg-rose-500/15 text-rose-700'
                                : 'bg-sky-500/15 text-sky-700'
                        }`}>
                          <item.icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.title}</div>
                          <div className="text-lg font-black text-slate-900 tracking-tight mt-1">{item.value}</div>
                          <div className="text-[11px] font-bold text-slate-600 mt-1 leading-relaxed">{item.subtitle}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {seedlings.map((s) => {
                        const prof = seedlingProfile(s);
                        const isActive = activeSeedlingChoice.id === s.id;
                        const isRecommended = recommendedSeedlingId === s.id;
                        const isHovered = seedlingHoverId === s.id;
                        const accent = s.color;
                        return (
                          <motion.button
                            key={s.id}
                            type="button"
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.99 }}
                            onMouseEnter={() => setSeedlingHoverId(s.id)}
                            onMouseLeave={() => { setSeedlingHoverId(null); setSeedlingCardTilt(null); }}
                            onMouseMove={(e) => {
                              const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                              const cx = rect.left + rect.width / 2;
                              const cy = rect.top + rect.height / 2;
                              const dx = Math.max(-0.5, Math.min(0.5, (e.clientX - cx) / Math.max(1, rect.width)));
                              const dy = Math.max(-0.5, Math.min(0.5, (e.clientY - cy) / Math.max(1, rect.height)));
                              setSeedlingCardTilt({ x: dx, y: dy });
                            }}
                            onClick={() => {
                              playUiClick();
                              setSeedlingDraft(s);
                            }}
                            onDoubleClick={() => handleSeedlingSelect(s)}
                            className={`relative text-left rounded-[2.2rem] border p-5 sm:p-6 transition-all overflow-hidden ${
                              isActive
                                ? 'bg-white border-white/60 shadow-[0_26px_70px_rgba(0,0,0,0.18)]'
                                : 'bg-white/75 border-white/70 hover:bg-white shadow-sm'
                            }`}
                            style={{
                              boxShadow: isActive ? `0 26px 70px ${hexToRgba(accent, 0.20)}` : undefined,
                              transformStyle: 'preserve-3d',
                              perspective: 900,
                              transform:
                                isHovered && seedlingCardTilt
                                  ? `rotateX(${(-seedlingCardTilt.y * 10).toFixed(2)}deg) rotateY(${(seedlingCardTilt.x * 12).toFixed(2)}deg) translateY(-2px)`
                                  : undefined,
                              transition: isHovered ? 'transform 90ms linear' : 'transform 220ms ease',
                            }}
                          >
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                backgroundImage: isActive || isHovered
                                  ? `radial-gradient(circle at 22% 20%, ${hexToRgba(accent, 0.22)} 0 180px, transparent 380px), radial-gradient(circle at 84% 18%, rgba(56,189,248,0.10) 0 160px, transparent 420px), linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.56) 100%)`
                                  : `radial-gradient(circle at 22% 18%, ${hexToRgba(accent, 0.14)} 0 160px, transparent 360px), linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.55) 100%)`,
                              }}
                            />
                            <div className="relative">
                            <div className="flex flex-col items-start gap-4">
                              <div className="w-full">
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                  {isActive ? 'Dipilih' : isRecommended ? 'Rekomendasi' : 'Opsi'}
                                </div>
                                <div className="text-xl font-black text-gray-900 tracking-tight">{s.name}</div>
                                <div className="text-[11px] font-bold text-gray-500 mt-1 leading-relaxed">{prof.label}</div>
                              </div>
                              <div className="w-full flex justify-center">
                              <div
                                className={`w-[8.25rem] h-[8.75rem] rounded-[2rem] border flex items-center justify-center shrink-0 relative overflow-visible ${
                                  isActive ? 'bg-white/95 border-white/80' : 'bg-white/90 border-white/70'
                                }`}
                                style={{
                                  boxShadow: isHovered || isActive
                                    ? `0 22px 44px ${hexToRgba(accent, 0.24)}`
                                    : '0 12px 24px rgba(0,0,0,0.07)',
                                  transform: 'translateZ(18px)',
                                }}
                              >
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                                <motion.div
                                  className="absolute inset-0 rounded-[2rem]"
                                  animate={{
                                    opacity: isHovered || isActive ? [0.6, 0.9, 0.6] : [0.38, 0.5, 0.38],
                                    scale: isHovered || isActive ? [0.96, 1.05, 0.96] : [0.98, 1.02, 0.98],
                                  }}
                                  transition={{ repeat: Infinity, duration: isHovered || isActive ? 1.9 : 3.4, ease: 'easeInOut' }}
                                  style={{
                                    backgroundImage: `radial-gradient(circle at 50% 30%, ${hexToRgba(accent, 0.34)} 0 26px, ${hexToRgba(accent, 0.12)} 26px 52px, transparent 72px)`,
                                  }}
                                />
                                <motion.div
                                  className="absolute inset-[10px] rounded-[1.6rem] border pointer-events-none"
                                  animate={{
                                    rotate: isHovered || isActive ? [0, 4, 0, -4, 0] : 0,
                                    opacity: isHovered || isActive ? [0.34, 0.7, 0.34] : 0.26,
                                  }}
                                  transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                                  style={{ borderColor: hexToRgba(accent, isHovered || isActive ? 0.34 : 0.18) }}
                                />
                                <motion.div
                                  className="absolute left-1/2 top-[14px] w-[72px] h-[72px] -translate-x-1/2 rounded-full blur-xl"
                                  animate={{
                                    opacity: isHovered || isActive ? [0.18, 0.34, 0.18] : [0.12, 0.18, 0.12],
                                    scale: isHovered || isActive ? [0.95, 1.08, 0.95] : [1, 1.04, 1],
                                  }}
                                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                                  style={{ background: `radial-gradient(circle, ${hexToRgba(accent, 0.42)} 0%, transparent 70%)` }}
                                />
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={`orbit-${s.id}-${i}`}
                                    className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full border border-white/60 shadow-sm"
                                    animate={{
                                      rotate: [i * 120, i * 120 + 360],
                                      x: [0, 0],
                                      y: [0, 0],
                                      opacity: isHovered || isActive ? [0.2, 0.9, 0.2] : [0, 0.55, 0],
                                      scale: isHovered || isActive ? [0.75, 1.15, 0.75] : [0.55, 0.8, 0.55],
                                    }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 3.4 + i * 0.55,
                                      ease: 'linear',
                                      delay: i * 0.24,
                                    }}
                                    style={{
                                      backgroundColor: i === 1 ? '#ffffff' : hexToRgba(accent, 0.75),
                                      transformOrigin: `0 ${18 + i * 8}px`,
                                    }}
                                  />
                                ))}
                                <div
                                  className="absolute left-1/2 bottom-[14px] -translate-x-1/2 w-[66px] h-[16px] rounded-full"
                                  style={{
                                    background: `radial-gradient(circle at 50% 50%, ${hexToRgba(accent, 0.18)} 0%, rgba(120,53,15,0.18) 52%, rgba(0,0,0,0.08) 100%)`,
                                  }}
                                />
                                <div className="absolute left-1/2 bottom-[12px] -translate-x-1/2 w-[54px] h-[8px] rounded-full bg-black/10 blur-[1px]" />
                                {[0, 1, 2, 3].map((i) => (
                                  <motion.div
                                    key={`leaf-${s.id}-${i}`}
                                    className="absolute rounded-full pointer-events-none"
                                    animate={{
                                      y: isHovered || isActive ? [0, -10 - i * 2, -18 - i * 2] : [0, -4, -8],
                                      x: isHovered || isActive ? [0, i % 2 === 0 ? -6 : 6, 0] : [0, i % 2 === 0 ? -2 : 2, 0],
                                      opacity: isHovered || isActive ? [0, 0.8, 0] : [0, 0.28, 0],
                                      rotate: [0, i % 2 === 0 ? -28 : 28, 0],
                                    }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: isHovered || isActive ? 1.4 + i * 0.18 : 2.8 + i * 0.2,
                                      delay: i * 0.22,
                                      ease: 'easeOut',
                                    }}
                                    style={{
                                      left: `${26 + i * 13}%`,
                                      bottom: `${28 + (i % 2) * 6}%`,
                                      width: 8 + (i % 2) * 2,
                                      height: 12 + (i % 2) * 2,
                                      background: `linear-gradient(180deg, #dcfce7 0%, ${accent} 100%)`,
                                      clipPath: 'ellipse(45% 50% at 50% 50%)',
                                      filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.12))',
                                    }}
                                  />
                                ))}
                                <motion.div
                                  className="absolute inset-x-[12px] top-[10px] h-6 rounded-full pointer-events-none"
                                  animate={{ opacity: isHovered || isActive ? [0.26, 0.5, 0.26] : [0.16, 0.28, 0.16] }}
                                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                                  style={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0))',
                                  }}
                                />
                                </div>
                                <motion.div
                                  className="relative scale-[0.96] sm:scale-100"
                                  animate={{
                                    y: isHovered || isActive ? [0, -3, 0] : [0, -1.2, 0],
                                    rotate: isHovered ? [-2.2, 2.2, -2.2] : isActive ? [-1.2, 1.2, -1.2] : [0, 0.6, 0],
                                    scale: isHovered || isActive ? [1, 1.06, 1] : [1, 1.02, 1],
                                  }}
                                  transition={{ repeat: Infinity, duration: isHovered || isActive ? 1.25 : 2.8, ease: 'easeInOut' }}
                                  style={{ color: accent, transform: 'translateZ(26px)' }}
                                >
                                  <SeedlingIcon type={s.name} active={isHovered || isActive} />
                                </motion.div>
                              </div>
                              </div>
                            </div>

                            <div className="mt-4 text-[11px] font-bold text-gray-500 leading-relaxed line-clamp-3">
                              {s.description}
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                              {[
                                { key: 'growth', label: 'Tumbuh', icon: Sprout, v: prof.growth, color: '#10b981' },
                                { key: 'co2', label: 'Serap CO2', icon: Activity, v: prof.co2, color: '#22c55e' },
                                { key: 'drought', label: 'Tahan Kering', icon: Wind, v: prof.drought, color: '#f59e0b' },
                                { key: 'flood', label: 'Tahan Banjir', icon: Droplets, v: prof.flood, color: '#3b82f6' },
                              ].map((m) => (
                                <div key={m.key} className="rounded-2xl bg-white/80 border border-black/5 px-3 py-2">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <div className="w-7 h-7 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center shrink-0" style={{ color: m.color }}>
                                        <m.icon size={14} />
                                      </div>
                                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 truncate">{m.label}</div>
                                    </div>
                                    <div className="text-[10px] font-black text-gray-700">{Math.round(m.v * 100)}%</div>
                                  </div>
                                  <div className="mt-2 h-2 rounded-full bg-black/5 overflow-hidden border border-black/5">
                                    <motion.div
                                      className="h-full rounded-full"
                                      initial={false}
                                      animate={{
                                        width: `${Math.round(m.v * 100)}%`,
                                        backgroundPosition: ['0% 50%', '110% 50%'],
                                      }}
                                      transition={{ width: { duration: 0.35, ease: 'easeOut' }, backgroundPosition: { repeat: Infinity, duration: 1.8, ease: 'linear' } }}
                                      style={{
                                        backgroundImage: `linear-gradient(90deg, ${m.color}, ${hexToRgba(m.color, 0.55)}, ${m.color})`,
                                        backgroundSize: '200% 100%',
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-3">
                              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                {isActive ? 'Preview aktif' : isHovered ? 'Sedang dibandingkan' : 'Klik untuk preview'}
                              </div>
                              <motion.div
                                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                  isActive
                                    ? 'bg-emerald-500/12 border-emerald-300/70 text-emerald-800'
                                    : 'bg-white/70 border-white/70 text-slate-700'
                                }`}
                                animate={isHovered || isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                              >
                                {isActive ? 'Siap dipakai' : 'Double klik mulai'}
                              </motion.div>
                            </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-[2.6rem] bg-slate-950/90 border border-white/10 p-6 sm:p-7 shadow-[0_40px_100px_rgba(0,0,0,0.35)] overflow-hidden relative">
                      <div
                        className="absolute inset-0 pointer-events-none opacity-90"
                        style={{
                          backgroundImage: `radial-gradient(circle at 18% 18%, ${hexToRgba(activeSeedlingChoice.color, 0.22)} 0 300px, transparent 560px), radial-gradient(circle at 78% 28%, rgba(56,189,248,0.14) 0 240px, transparent 560px), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.58) 100%)`,
                        }}
                      />
                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-[10px] font-black text-white/55 uppercase tracking-[0.25em]">Preview Bibit</div>
                            <div className="text-2xl font-black text-white tracking-tight mt-1">{activeSeedlingChoice.name}</div>
                            <div className="mt-2 text-white/70 font-bold text-sm leading-relaxed">
                              {activeSeedlingChoice.description}
                            </div>
                          </div>
                          <motion.div
                            initial={false}
                            animate={{ rotate: [0, 6, 0], y: [0, -2, 0], scale: seedlingHoverId ? [1, 1.03, 1] : 1 }}
                            transition={{ repeat: seedlingHoverId ? Infinity : 0, duration: 0.9, ease: 'easeInOut' }}
                            className="w-16 h-16 rounded-[1.6rem] bg-white/10 border border-white/15 flex items-center justify-center shrink-0 relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-[-14px] rounded-full"
                              animate={{ opacity: [0.10, 0.28, 0.10], scale: [0.92, 1.18, 0.92] }}
                              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                              style={{ background: `radial-gradient(circle, ${hexToRgba(activeSeedlingChoice.color, 0.30)} 0 22px, transparent 62px)` }}
                            />
                            <div style={{ color: activeSeedlingChoice.color }}>
                              <SeedlingIcon type={activeSeedlingChoice.name} active />
                            </div>
                          </motion.div>
                        </div>

                        <div className="mt-5 rounded-[2.2rem] bg-white/5 border border-white/10 p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="text-[10px] font-black text-white/55 uppercase tracking-widest">Kecocokan Wilayah</div>
                              <div className="text-white font-black text-xl tracking-tight mt-1">{activeSeedlingCompatibility}%</div>
                              <div className="text-white/60 font-bold text-[11px] mt-1">
                                {activeSeedlingCompatibility >= 80 ? 'Sangat cocok untuk misi ini' : activeSeedlingCompatibility >= 65 ? 'Cocok, tapi masih bisa dibandingkan' : 'Kurang optimal, cek bibit lain'}
                              </div>
                            </div>
                            <div className="relative w-20 h-20 shrink-0">
                              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                                <circle cx="40" cy="40" r="31" stroke="rgba(255,255,255,0.12)" strokeWidth="8" fill="none" />
                                <motion.circle
                                  cx="40"
                                  cy="40"
                                  r="31"
                                  stroke={activeSeedlingChoice.color}
                                  strokeWidth="8"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeDasharray={194.78}
                                  initial={false}
                                  animate={{ strokeDashoffset: 194.78 * (1 - activeSeedlingCompatibility / 100) }}
                                  transition={{ duration: 0.5, ease: 'easeOut' }}
                                />
                              </svg>
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full"
                                  style={{ backgroundColor: activeSeedlingChoice.color, boxShadow: `0 0 14px ${hexToRgba(activeSeedlingChoice.color, 0.55)}` }}
                                  animate={{ rotate: 360, x: [0, 0], y: [0, 0] }}
                                  transition={{ repeat: Infinity, duration: 3.2 + i * 0.7, ease: 'linear', delay: i * 0.2 }}
                                  transformTemplate={() => `rotate(${(i * 120)}deg) translateY(-31px)`}
                                />
                              ))}
                              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-sm">
                                {activeSeedlingCompatibility}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {(() => {
                            const prof = seedlingProfile(activeSeedlingChoice);
                            const rows = [
                              { key: 'growth', label: 'Kecepatan Tumbuh', v: prof.growth, from: '#10b981', to: '#34d399', icon: Sprout },
                              { key: 'co2', label: 'Serap CO2', v: prof.co2, from: '#22c55e', to: '#86efac', icon: Activity },
                              { key: 'drought', label: 'Tahan Kering', v: prof.drought, from: '#f59e0b', to: '#fbbf24', icon: Wind },
                              { key: 'flood', label: 'Tahan Banjir', v: prof.flood, from: '#3b82f6', to: '#93c5fd', icon: Droplets },
                            ];
                            return rows.map((r) => (
                              <div key={r.key} className="rounded-[2rem] bg-white/5 border border-white/10 p-4">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 shrink-0">
                                      <r.icon size={16} />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-[10px] font-black text-white/55 uppercase tracking-widest truncate">{r.label}</div>
                                      <div className="text-white font-black tracking-tight">{Math.round(r.v * 100)}%</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <HDBar value01={r.v} from={r.from} to={r.to} height={10} className="w-full" />
                                </div>
                              </div>
                            ));
                          })()}
                        </div>

                        <div className="mt-6 rounded-[2rem] bg-white/5 border border-white/10 p-5">
                          <div className="text-[10px] font-black text-white/55 uppercase tracking-widest">Saran untuk Wilayah</div>
                          <div className="mt-2 text-white/80 font-bold text-sm leading-relaxed">
                            {selectedRegion?.status === 'gersang'
                              ? 'Wilayah gersang: prioritaskan bibit yang tahan kering dan stabil saat panas.'
                              : selectedRegion?.status === 'kritis'
                                ? 'Wilayah kritis: butuh bibit yang cepat memberi naungan dan menekan CO2.'
                                : 'Wilayah hijau: fokus pada pohon bernilai tinggi dan menjaga kualitas ekosistem.'}
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest">
                              Rekomendasi: {seedlings.find(s => s.id === recommendedSeedlingId)?.name ?? 'Mahoni'}
                            </span>
                            {recommendedSeedlingId === activeSeedlingChoice.id && (
                              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-200 text-[10px] font-black uppercase tracking-widest">
                                Cocok
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSeedlingSelect(activeSeedlingChoice)}
                          className="mt-6 w-full py-4 rounded-[2rem] text-white font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform shadow-lg border border-white/10"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${activeSeedlingChoice.color}, rgba(16,185,129,0.85))`,
                            boxShadow: `0 22px 60px ${hexToRgba(activeSeedlingChoice.color, 0.22)}`,
                          }}
                        >
                          Mulai Restorasi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'planting' && selectedRegion && selectedSeedling && (
            <motion.div
              key="planting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-slate-950 z-50 flex flex-col overflow-hidden"
            >
              {/* --- 1. HUD MODERN (UPPER) --- */}
              <div className="h-24 bg-slate-900/90 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-10 z-[100] shadow-2xl">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Wilayah Aktif</span>
                    <span className="text-lg font-black text-white uppercase tracking-tight">{selectedRegion.name}</span>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="flex items-center gap-6">
                    {/* Water Resource */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets size={14} className="text-blue-400" />
                          <span className="text-[10px] font-black text-white/60 uppercase">Water</span>
                        </div>
                        <span className="text-xs font-black text-blue-400">{Math.round(water)}%</span>
                      </div>
                      <HDBar value01={water/100} from="#3b82f6" to="#60a5fa" height={8} className="w-24" />
                    </div>
                    {/* Energy Resource */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-yellow-400" />
                          <span className="text-[10px] font-black text-white/60 uppercase">Energy</span>
                        </div>
                        <span className="text-xs font-black text-yellow-400">{Math.round(energy)}%</span>
                      </div>
                      <HDBar value01={energy/100} from="#f59e0b" to="#fbbf24" height={8} className="w-24" />
                    </div>
                  </div>
                </div>

                {/* Central CO2 Monitor */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center bg-slate-800/50 px-8 py-3 rounded-3xl border border-white/5 backdrop-blur-xl shadow-inner">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Status CO2 Global</div>
                  <div className="flex items-center gap-5">
                    <motion.span 
                      className={`text-3xl font-black ${co2Level > 70 ? 'text-red-400' : co2Level > 40 ? 'text-yellow-400' : 'text-emerald-400'}`}
                      animate={{ scale: co2Level > 70 ? [1, 1.05, 1] : 1 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      {Math.round(co2Level)}%
                    </motion.span>
                    <div className="w-56 h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <motion.div 
                        className={`h-full rounded-full ${co2Level > 70 ? 'bg-red-500' : co2Level > 40 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                        animate={{ width: `${co2Level}%` }}
                        style={{ boxShadow: '0 0 15px rgba(16,185,129,0.3)' }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-500 uppercase leading-none">Target</span>
                      <span className="text-xs font-black text-emerald-400 leading-none mt-1">{currentMission?.targetCO2}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Waktu</div>
                    <motion.div 
                      className={`text-2xl font-mono font-black ${timer < 30 ? 'text-red-500' : 'text-white'}`}
                      animate={timer < 30 ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </motion.div>
                  </div>
                  {/* Weather Widget */}
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center gap-3 min-w-[120px]">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      {effectiveWeather === 'sunny' && <Sun size={24} className="text-yellow-400" />}
                      {effectiveWeather === 'rainy' && <CloudRain size={24} className="text-blue-400" />}
                      {effectiveWeather === 'drought' && <Wind size={24} className="text-orange-400" />}
                      {effectiveWeather === 'polluted' && <AlertTriangle size={24} className="text-red-400" />}
                    </div>
                    <div>
                      <div className="text-[8px] font-black text-white/40 uppercase">Cuaca</div>
                      <div className="text-[10px] font-black text-white uppercase tracking-wider">{effectiveWeather}</div>
                    </div>
                  </div>
                  {activeEvent && (
                    <div className="bg-red-500/10 p-3 rounded-2xl border border-red-400/20 flex items-center gap-3 min-w-[170px] shadow-[0_0_40px_rgba(239,68,68,0.10)]">
                      <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-300">
                        <Activity size={22} />
                      </div>
                      <div>
                        <div className="text-[8px] font-black text-white/40 uppercase">Event</div>
                        <div className="text-[10px] font-black text-white uppercase tracking-wider">
                          {activeEvent.type === 'HEATWAVE' ? 'Heatwave' : activeEvent.type === 'RAINSTORM' ? 'Hujan Deras' : activeEvent.type === 'PESTS' ? 'Hama' : 'Polusi'}
                        </div>
                        <div className="text-[10px] font-black text-red-300">
                          {Math.max(0, Math.ceil((activeEvent.endsAt - Date.now()) / 1000))}s
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setPauseOpen(v => !v)}
                    className={`px-4 py-3 rounded-2xl border text-white/85 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-transform ${
                      pauseOpen ? 'bg-emerald-500/15 border-emerald-500/25' : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    aria-label={pauseOpen ? 'Lanjutkan' : 'Pause'}
                  >
                    {pauseOpen ? <Play size={14} /> : <Pause size={14} />}
                    {pauseOpen ? 'Lanjut' : 'Pause'}
                    <span className="ml-1 px-2 py-1 rounded-lg bg-black/20 border border-white/10 text-white/60 text-[9px] font-black tracking-widest">
                      ESC
                    </span>
                  </button>
                </div>
              </div>

              {/* --- 2. GAME WORLD (CHARACTER CENTRIC) --- */}
              <div 
                ref={gameAreaRef} 
                className="flex-1 relative overflow-hidden bg-slate-950 cursor-pointer"
                onClick={(e) => {
                  if (pauseOpen) return;
                  if (levelIntroOpen) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const clickY = e.clientY - rect.top;
                  
                  // Translate click to world coordinates
                  const worldX = clickX - camX.get();
                  const worldY = clickY - camY.get();

                  const dx = worldX - charPosRef.current.x;
                  const dy = worldY - charPosRef.current.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  if (dist < 10) return;

                  const nx = dx / dist;
                  const ny = dy / dist;

                  if (nx < 0) setCharDirection('left');
                  if (nx > 0) setCharDirection('right');

                  velocityRef.current.x += nx * 520;
                  velocityRef.current.y += ny * 520;
                }}
              >
                <motion.div 
                  className="absolute inset-0 origin-center"
                  style={{
                    x: camX,
                    y: camY,
                    width: 3000,
                    height: 3000,
                    backgroundImage: [
                      `radial-gradient(circle at 18% 22%, rgba(255,255,255,${0.06 * gfx.worldTexture}) 0 160px, transparent 620px)`,
                      `radial-gradient(circle at 78% 70%, rgba(0,0,0,${0.22 * gfx.worldTexture}) 0 520px, transparent 1200px)`,
                      `repeating-linear-gradient(135deg, rgba(255,255,255,${0.012 * gfx.worldTexture}) 0 2px, transparent 2px 20px)`,
                      worldBaseBg,
                    ].join(','),
                    backgroundBlendMode: 'screen, multiply, overlay, normal',
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={
                      actionId === 'hole'
                        ? { x: [0, -8, 6, 0], y: [0, 5, -3, 0], rotate: [0, -0.8, 0.5, 0] }
                        : actionId === 'plant'
                          ? { x: [0, -4, 3, 0], y: [0, 2, -1, 0], rotate: [0, -0.35, 0.25, 0] }
                          : actionId === 'water'
                            ? { x: [0, -3, 2, 0], y: [0, 2, -1, 0] }
                            : { x: 0, y: 0, rotate: 0 }
                    }
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                  {/* Grid Lines (Blueprint feel) */}
                  <div className="absolute inset-0 pointer-events-none" style={{ opacity: gfx.gridOpacity, backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 45% 42%, rgba(120,53,15,0.22) 0 520px, transparent 980px), radial-gradient(circle at 70% 62%, rgba(120,53,15,0.18) 0 520px, transparent 980px)',
                      opacity: 0.55 * (1 - Math.min(1, restorationPatches.length / 10)),
                      mixBlendMode: 'multiply',
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 40% 60%, rgba(34,197,94,0.24) 0 720px, transparent 1100px), radial-gradient(circle at 78% 38%, rgba(16,185,129,0.20) 0 720px, transparent 1100px)',
                      opacity: 0.22 + 0.38 * Math.min(1, restorationPatches.length / 10),
                      mixBlendMode: 'screen',
                    }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, rgba(255,255,255,${0.10 * gfx.haze}) 0%, rgba(2,6,23,${0.55 * gfx.haze}) 100%)`,
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      left: charPos.x,
                      top: charPos.y - 180,
                      width: 980,
                      height: 980,
                      transform: 'translate(-50%, -50%)',
                      background: `radial-gradient(circle, rgba(${sunFx.rgb},${sunFx.opacity}) 0 0, rgba(${sunFx.rgb},${sunFx.opacity * 0.55}) 180px, rgba(${sunFx.rgb},0) 540px)`,
                      mixBlendMode: 'screen',
                    }}
                    animate={{ scale: [0.98, 1.03, 0.98], opacity: [0.75, 1, 0.75] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                  />

                  <EnvironmentFX weather={effectiveWeather} />
                  <AdrenalineEventFX event={activeEvent} />

                  {/* Ambient Life & Dust */}
                  <AmbientDust count={gfx.dustCount} />
                  {Array.from({ length: gfx.birdCount }, (_, i) => (
                    <Bird key={`bird-${i}`} seed={i + 1} />
                  ))}

                  {/* Decorative Elements for World */}
                  <DecorativePlot x={tutorialSpot.x} y={tutorialSpot.y} highlight={tutorialActive && tutorialStep >= 2 && tutorialStep <= 4} />
                  {plots.map(p => (
                    <DecorativePlot
                      key={`decor-${p.id}`}
                      x={p.cx}
                      y={p.cy}
                      highlight={!tutorialActive && level === 2 && p.id === activePlotId}
                    />
                  ))}

                  {FALLEN_TREE_SPOTS.map((s) => (
                    <FallenTree key={s.id} x={s.x} y={s.y} rot={s.rot} scale={s.scale} weather={effectiveWeather} />
                  ))}
                  {LEAF_LITTER_SPOTS.slice(0, gfx.leafLitterCount).map((s) => (
                    <LeafLitter
                      key={s.id}
                      x={s.x}
                      y={s.y}
                      rot={s.rot}
                      scale={s.scale}
                      density={s.density}
                      weather={effectiveWeather}
                    />
                  ))}
                  {restorationPatches.map(p => (
                    <RestorationPatchSprite key={p.id} x={p.x} y={p.y} intensity={p.intensity} />
                  ))}

                  {pollutionSources.map(s => (
                    <PollutionSourceSprite key={s.id} x={s.x} y={s.y} strength={s.strength} />
                  ))}

                  {/* Random Decorative Elements */}
                  {Array.from({ length: gfx.decorCount }, (_, i) => {
                    const rand = (n: number) => {
                      const v = Math.sin((i + 1) * 971.113 + n * 127.7) * 10000;
                      return v - Math.floor(v);
                    };
                    const left = 100 + (i * 157) % 2800;
                    const top = 100 + (i * 213) % 2800;
                    const s = 0.62 + rand(1) * 0.48;
                    const rot = -18 + rand(2) * 36;
                    const kind = rand(3) < 0.55 ? 'grass' : 'stone';
                    const tone = rand(4);
                    const tintA = kind === 'grass' ? `rgba(16,185,129,${0.16 + tone * 0.12})` : `rgba(148,163,184,${0.14 + tone * 0.12})`;
                    const tintB = kind === 'grass' ? `rgba(6,95,70,${0.12 + tone * 0.10})` : `rgba(71,85,105,${0.12 + tone * 0.10})`;
                    return (
                      <div
                        key={`random-decor-${i}`}
                        className="absolute pointer-events-none"
                        style={{
                          left,
                          top,
                          transform: `scale(${s}) rotate(${rot}deg)`,
                          filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.14))',
                        }}
                      >
                        <div className="absolute -left-6 -top-4 w-20 h-16 rounded-full blur-2xl opacity-70" style={{ background: `radial-gradient(circle, ${tintA} 0 18px, transparent 54px)` }} />
                        {kind === 'grass' ? (
                          <div className="relative w-10 h-10">
                            <div className="absolute left-1/2 top-7 -translate-x-1/2 w-10 h-3 rounded-full blur-md" style={{ background: 'rgba(0,0,0,0.18)' }} />
                            {Array.from({ length: 5 }, (_, j) => {
                              const h = 10 + rand(10 + j) * 14;
                              const w = 1 + rand(20 + j) * 1.2;
                              const r = -18 + rand(30 + j) * 36;
                              return (
                                <motion.div
                                  key={j}
                                  className="absolute left-1/2 top-4 origin-bottom rounded-full"
                                  style={{
                                    width: w,
                                    height: h,
                                    background: `linear-gradient(180deg, ${tintA} 0%, ${tintB} 100%)`,
                                    rotate: `${r}deg`,
                                  }}
                                  animate={{ rotate: [`${r - 10}deg`, `${r + 10}deg`, `${r - 10}deg`] }}
                                  transition={{ repeat: Infinity, duration: 2.0 + rand(40 + j) * 2.2, ease: 'easeInOut', delay: i * 0.03 + j * 0.02 }}
                                />
                              );
                            })}
                          </div>
                        ) : (
                          <div className="relative w-10 h-10">
                            <div className="absolute left-1/2 top-7 -translate-x-1/2 w-10 h-3 rounded-full blur-md" style={{ background: 'rgba(0,0,0,0.16)' }} />
                            <div className="absolute left-1/2 top-4 -translate-x-1/2 w-8 h-6 rounded-[18px] border border-black/10" style={{ background: `linear-gradient(135deg, ${tintA}, ${tintB})` }} />
                            <div className="absolute left-4 top-4 w-3 h-2 rounded-full bg-white/12" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {tutorialActive && (tutorialStep === 1 || tutorialStep === 2) && (
                    <PlantSpotMarker x={tutorialSpot.x} y={tutorialSpot.y} tone="tutorial" />
                  )}
                  {!tutorialActive && level === 2 && (() => {
                    const p = plots.find(pp => pp.id === activePlotId);
                    if (!p) return null;
                    return <PlantSpotMarker x={p.cx} y={p.cy} tone="plantable" />;
                  })()}
                  {!tutorialActive && (() => {
                    let best: { id: string; cx: number; cy: number; d: number } | null = null;
                    for (const p of plots) {
                      const dx = charPos.x - p.cx;
                      const dy = charPos.y - p.cy;
                      const d = Math.sqrt(dx * dx + dy * dy);
                      if (!best || d < best.d) best = { id: p.id, cx: p.cx, cy: p.cy, d };
                    }
                    if (!best || best.d > 170) return null;
                    const occupied = activeTrees.some(t => t.x === best.cx && t.y === best.cy);
                    if (occupied) return null;
                    return <PlantSpotMarker x={best.cx} y={best.cy} tone="plantable" />;
                  })()}

                  {/* Fog of War / Area Limitation */}
                  <div 
                    className="absolute inset-0 z-40 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${charPos.x}px ${charPos.y}px, transparent 0, rgba(0,0,0,${gfx.fogAlpha}) ${unlockedRadius}px)`,
                      transition: 'background 650ms ease-out'
                    }}
                  />

                  {/* Tree Entities */}
                  <AnimatePresence>
                    {activeTrees.map(tree => (
                      <motion.div
                        key={tree.id}
                        className="absolute group z-20"
                        style={{ left: tree.x, top: tree.y, transform: 'translate(-50%, -100%)' }}
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 0.4 + (tree.growth / 120), y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <div className="relative">
                          {/* Interactive Glow */}
                          <motion.div 
                            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"
                            style={{ background: tree.moisture < 30 ? '#ef4444' : '#10b981', borderRadius: '50%' }}
                          />

                          {activeEvent?.type === 'PESTS' && pestTreeId === tree.id && (
                            <motion.div
                              className="absolute -top-16 left-1/2 -translate-x-1/2 z-[80] pointer-events-none"
                              initial={{ opacity: 0, y: 8, scale: 0.9 }}
                              animate={{ opacity: 1, y: [8, 0, 8], scale: [0.95, 1.05, 0.95] }}
                              transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                            >
                              <div className="flex items-center gap-2 bg-red-500/15 border border-red-400/20 px-3 py-1.5 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.18)] backdrop-blur-md">
                                <div className="text-red-300"><AlertTriangle size={16} /></div>
                                <div className="text-[10px] font-black text-red-200 uppercase tracking-wider">Hama • Tekan E</div>
                              </div>
                            </motion.div>
                          )}
                          
                          {(() => {
                            const s = seedlings.find(sd => sd.name === tree.type) || seedlings[0];
                            return (
                              <RealisticTree 
                                size={120}
                                color={s.color}
                                stage={tree.stage}
                                actionProgress={0}
                                health={tree.health}
                                moisture={tree.moisture}
                                icon={s.icon}
                                yPos={tree.y}
                                species={tree.type}
                              />
                            );
                          })()}
                          
                          {/* Mini HUD for near character */}
                          {Math.sqrt(Math.pow(charPos.x - tree.x, 2) + Math.pow(charPos.y - tree.y, 2)) < 120 && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute -top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 p-3 rounded-2xl border border-white/20 flex flex-col gap-2 min-w-[110px] z-50 shadow-2xl backdrop-blur-md"
                            >
                              <div className="text-[9px] font-black text-white/40 uppercase text-center mb-1">{tree.type}</div>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[8px] font-black text-blue-400 uppercase">
                                  <span>Air</span>
                                  <span>{Math.round(tree.moisture)}%</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div className="h-full bg-blue-500" animate={{ width: `${tree.moisture}%` }} />
                                </div>
                                <div className="text-[7px] text-center text-white/40 uppercase font-bold">Tekan [E] Siram</div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Player Character (Interactive Monkey) */}
                  <motion.div
                    className="absolute origin-bottom"
                    animate={{ scale: isWalking ? [1, 1.05, 1] : 1 }}
                    style={{ x: charX, y: charY, zIndex: Math.floor(charPos.y) }}
                  >
                    <div className="relative flex flex-col items-center" style={{ transform: 'translate(-50%, -100%)' }}>
                      {/* Character Sprite with integrated animations */}
                      <CharacterSprite 
                        isWalking={isWalking} 
                        actionId={actionId} 
                        toolIcon={
                          actionId === 'hole'
                            ? level === 1 ? Trees : Shovel
                            : actionId === 'plant'
                              ? level === 1 ? Shovel : Trees
                              : actionId === 'clean'
                                ? ShieldCheck
                                : actionId === 'pest'
                                  ? AlertTriangle
                                  : undefined
                        }
                        accent="#7d4a27"
                        actionProgress={actionProgress}
                        direction={charDirection}
                        skin={characterSkin}
                        preparationMode={level === 1}
                      />

                      {/* Interaction Hint */}
                      <AnimatePresence>
                        {!isWalking && !actionId && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-24 bg-white text-slate-950 px-4 py-1.5 rounded-full text-[11px] font-black uppercase shadow-2xl border-2 border-emerald-500 whitespace-nowrap z-[100]"
                          >
                            Tekan [E] Aksi
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Effects Layer */}
                  <AnimatePresence>
                    {activeParticles.map(p => (
                      <motion.div
                        key={p.id}
                        className="absolute rounded-full pointer-events-none z-[100]"
                        style={{ backgroundColor: p.color, width: p.size, height: p.size }}
                        initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
                        animate={{ 
                          x: p.x + p.vx * 15,
                          y: p.y + p.vy * 15,
                          opacity: 0,
                          scale: 0 
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    ))}
                    {restoreWaves.map(w => (
                      <motion.div
                        key={w.id}
                        className="absolute rounded-full pointer-events-none z-[18]"
                        style={{
                          left: w.x,
                          top: w.y,
                          transform: 'translate(-50%, -50%)',
                          border: '2px solid rgba(52,211,153,0.35)',
                          boxShadow: '0 0 80px rgba(16,185,129,0.18)',
                          background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0 120px, rgba(16,185,129,0.08) 240px, rgba(34,197,94,0.02) 420px, transparent 560px)',
                          mixBlendMode: 'screen',
                        }}
                        initial={{ width: 40, height: 40, opacity: 0.85 }}
                        animate={{ width: 920, height: 920, opacity: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                      />
                    ))}
                    {ripples.map(r => (
                      <motion.div
                        key={r.id}
                        className="absolute rounded-full border-2 pointer-events-none z-30"
                        style={{ 
                          left: r.x, 
                          top: r.y, 
                          borderColor: r.tone === 'water' ? '#60a5fa' : '#34d399',
                          transform: 'translate(-50%, -50%)',
                          boxShadow: `0 0 20px ${r.tone === 'water' ? 'rgba(59,130,246,0.3)' : 'rgba(52,211,153,0.3)'}`
                        }}
                        initial={{ width: 0, height: 0, opacity: 1 }}
                        animate={{ width: 140, height: 140, opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    ))}
                    {floatTexts.map(t => (
                      <motion.div
                        key={t.id}
                        className={`absolute text-[12px] font-black uppercase tracking-tighter z-[60] pointer-events-none ${
                          t.tone === 'xp' ? 'text-yellow-400' : t.tone === 'warn' ? 'text-red-400' : 'text-emerald-400'
                        }`}
                        initial={{ x: t.x, y: t.y, opacity: 0, scale: 0.5 }}
                        animate={{ y: t.y - 100, opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        style={{ transform: 'translateX(-50%)' }}
                      >
                        {t.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Vignette & Scanlines Effect for immersive feel */}
                  <div className="absolute inset-0 z-[60] pointer-events-none" style={{ boxShadow: `inset 0 0 170px rgba(0,0,0,${gfx.vignette})` }} />
                  <div className="absolute inset-0 z-[60] pointer-events-none overflow-hidden" style={{ opacity: gfx.scanlines, backgroundImage: 'repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 2px)' }} />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {levelIntroOpen && (
                    <motion.div
                      className="absolute inset-0 z-[180] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="max-w-lg w-full bg-slate-900/95 border border-white/10 rounded-[3rem] p-10 shadow-2xl"
                        initial={{ scale: 0.92, y: 18 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.96, y: 10 }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.25em]">Level</div>
                            <div className="text-4xl font-black text-white tracking-tighter">LEVEL {level}</div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <Trophy size={26} />
                          </div>
                        </div>

                        {level === 1 ? (
                          <div className="space-y-4">
                            <div className="text-white/90 font-bold leading-relaxed">
                              Setelah tutorial, masuk ke fase persiapan: <span className="text-emerald-400 font-black">ambil bibit</span> dan <span className="text-emerald-400 font-black">siapkan alat tanam</span> sebelum mulai restorasi.
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-[10px] font-black text-white/50 uppercase tracking-widest">Karakter</div>
                                <div className="mt-1 text-white font-black">Bawa bibit</div>
                              </div>
                              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-[10px] font-black text-white/50 uppercase tracking-widest">Peralatan</div>
                                <div className="mt-1 text-white font-black">Cangkul siap pakai</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-white/90 font-bold leading-relaxed">
                              Area terbuka. Aktifkan <span className="text-emerald-400 font-black">4 titik lahan</span> dengan cara tanam dan siram sampai tumbuh, lalu kejar target berikutnya cepat untuk memicu combo bonus.
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                                <MapPin size={18} />
                              </div>
                              <div className="text-[11px] font-black text-white/70 uppercase tracking-wider">Ikuti titik yang menyala dan jaga combo</div>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setLevelIntroOpen(false);
                            setToast({
                              id: Date.now(),
                              title: `LEVEL ${level}`,
                              subtitle: level === 1 ? 'Ambil bibit dan siapkan alat tanam' : 'Aktifkan 4 lahan dan kejar combo bonus',
                              tone: 'info',
                            });
                          }}
                          className="mt-8 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
                        >
                          Mulai
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* --- 2.1 GUIDED TUTORIAL BANNER --- */}
                <AnimatePresence>
                  {tutorialActive && (
                    <motion.div 
                      initial={{ y: 24, opacity: 0, scale: 0.98 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 24, opacity: 0, scale: 0.98 }}
                      className="absolute bottom-24 left-6 z-[120] w-[min(92vw,420px)]"
                    >
                      <div className="bg-slate-900/90 backdrop-blur-2xl border-2 border-emerald-500/50 p-4 rounded-[1.75rem] shadow-2xl">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-900/40">
                            <Info size={24} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Panduan Pemula</div>
                              <button
                                type="button"
                                onClick={() => setTutorialDockCollapsed(v => !v)}
                                className="shrink-0 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 active:scale-95 transition-transform"
                                aria-label={tutorialDockCollapsed ? 'Tampilkan panduan' : 'Sembunyikan panduan'}
                              >
                                {tutorialDockCollapsed ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>
                            </div>

                            {!tutorialDockCollapsed && (
                              <div className="mt-1 text-[13px] font-bold text-white leading-relaxed">
                                {tutorialMessages[tutorialStep]}
                              </div>
                            )}
                          </div>

                          {!tutorialDockCollapsed && tutorialStep === 1 && (
                            <motion.div 
                              className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0"
                              animate={{ x: [0, 10, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              <Move size={20} />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {!tutorialActive && !levelIntroOpen && activeEvent && eventHint && (
                    <motion.div
                      initial={{ y: -18, opacity: 0, scale: 0.98 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -18, opacity: 0, scale: 0.98 }}
                      className="absolute top-28 left-1/2 -translate-x-1/2 z-[120] w-full max-w-xl"
                    >
                      <div className={`mx-4 rounded-[2rem] border p-5 shadow-2xl backdrop-blur-2xl flex items-center gap-4 ${
                        eventHint.tone === 'warn' ? 'bg-red-500/10 border-red-400/25' : 'bg-blue-500/10 border-blue-400/25'
                      }`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                          eventHint.tone === 'warn' ? 'bg-red-500/20 text-red-200' : 'bg-blue-500/20 text-blue-200'
                        }`}>
                          <eventHint.icon size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.25em]">Event Aktif</div>
                          <div className="text-white font-black tracking-tight">{eventHint.title}</div>
                          <div className="text-[12px] text-white/80 font-bold leading-relaxed">{eventHint.subtitle}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-[10px] font-black text-white/40 uppercase">Sisa</div>
                          <div className={`text-xl font-black ${eventHint.tone === 'warn' ? 'text-red-200' : 'text-blue-200'}`}>
                            {Math.max(0, Math.ceil((activeEvent.endsAt - Date.now()) / 1000))}s
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* --- 2.2 MISSION TRACKER --- */}
                <motion.div 
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute top-28 right-10 z-[100] w-72 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Alur Misi</div>
                      <div className="mt-1 text-sm font-black text-white tracking-tight">
                        {tutorialActive ? 'TUTORIAL' : `LEVEL ${level}`}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                      <Trophy size={18} />
                    </div>
                  </div>

                  {tutorialActive ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-black text-white/60 uppercase mb-2">
                          <span>Selesaikan Tutorial</span>
                          <span>{Math.min(4, Math.max(0, tutorialStep - 1))}/4</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            animate={{ width: `${Math.min(100, (Math.max(0, tutorialStep - 1) / 4) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { id: 1, label: 'Datangi titik lahan' },
                          { id: 2, label: 'Gali (Tekan E)' },
                          { id: 3, label: 'Tanam (Tekan E)' },
                          { id: 4, label: 'Siram (Tekan E)' },
                        ].map((s) => {
                          const done = tutorialStep > s.id;
                          const activeNow = tutorialStep === s.id;
                          return (
                            <div
                              key={s.id}
                              className={`px-3 py-2 rounded-2xl border flex items-center justify-between ${
                                done
                                  ? 'bg-emerald-500/15 border-emerald-500/25'
                                  : activeNow
                                    ? 'bg-white/10 border-white/20'
                                    : 'bg-white/5 border-white/10'
                              }`}
                            >
                              <div className="text-[9px] font-black text-white/80 uppercase tracking-widest">{s.label}</div>
                              <div className={`text-[9px] font-black uppercase ${done ? 'text-emerald-300' : activeNow ? 'text-yellow-300' : 'text-white/40'}`}>
                                {done ? 'OK' : activeNow ? 'SEKARANG' : 'NANTI'}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                          <Info size={16} />
                        </div>
                        <div className="text-[9px] font-bold text-white/80 leading-tight">
                          Ikuti petunjuk. Setelah selesai, masuk ke <span className="text-white">Level 1</span>.
                        </div>
                      </div>
                    </div>
                  ) : level === 1 ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-black text-white/60 uppercase mb-2">
                          <span>Persiapan Menanam</span>
                          <span>{Math.min(level1Target, level1PlantedAfterTutorial)}/{level1Target}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            animate={{ width: `${Math.min(100, (level1PlantedAfterTutorial / level1Target) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                          <Trees size={16} />
                        </div>
                        <div className="text-[9px] font-bold text-white/80 leading-tight">
                          Selesaikan 2 persiapan awal: ambil bibit lalu cek alat tanam agar Level 2 terasa siap dimainkan.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-black text-white/60 uppercase mb-2">
                          <span>Aktifkan 4 Lahan</span>
                          <span>{level2CompletedCount}/4</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            animate={{ width: `${Math.min(100, (level2CompletedCount / 4) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {(['p1', 'p2', 'p3', 'p4'] as const).map((pid, idx) => {
                          const done = (level2Stages[pid] ?? 0) >= 1;
                          const isTarget = pid === activePlotId && !done;
                          const t = plotTreeById.get(pid) ?? null;
                          const hint =
                            done
                              ? 'Selesai'
                              : t
                                ? 'Siram'
                                : 'Tanam';
                          return (
                            <div
                              key={pid}
                              className={`p-3 rounded-2xl border ${
                                done
                                  ? 'bg-emerald-500/15 border-emerald-500/25'
                                  : isTarget
                                    ? 'bg-white/10 border-white/20'
                                    : 'bg-white/5 border-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-[9px] font-black text-white/70 uppercase tracking-widest">Titik {idx + 1}</div>
                                <div className={`text-[9px] font-black uppercase ${done ? 'text-emerald-300' : isTarget ? 'text-yellow-300' : 'text-white/40'}`}>
                                  {done ? 'OK' : isTarget ? 'TARGET' : ''}
                                </div>
                              </div>
                              <div className="mt-1 text-[9px] font-bold text-white/60 uppercase tracking-wider">
                                {hint} • Tekan E
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className={`p-3 rounded-2xl border ${
                        level2Combo > 0 && level2ComboExpiresAt
                          ? 'bg-amber-500/10 border-amber-400/25 shadow-[0_0_30px_rgba(251,191,36,0.12)]'
                          : 'bg-white/5 border-white/10'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            level2Combo > 0 && level2ComboExpiresAt ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-white/70'
                          }`}>
                            <Sparkles size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-[9px] font-black text-white/80 uppercase tracking-widest">Combo Restorasi</div>
                              <div className={`text-[9px] font-black uppercase ${level2Combo > 0 ? 'text-amber-200' : 'text-white/40'}`}>
                                {level2Combo > 0 ? `x${level2Combo}` : 'Siap'}
                              </div>
                            </div>
                            <div className="mt-1 text-[9px] font-bold text-white/70 leading-relaxed">
                              Selesaikan target berikutnya dalam 14 detik untuk bonus air dan energi tambahan.
                            </div>
                            <div className="mt-3 h-1.5 rounded-full bg-black/25 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-300"
                                animate={{
                                  width: `${level2ComboExpiresAt
                                    ? Math.max(0, Math.min(100, ((level2ComboExpiresAt - Date.now()) / level2ComboWindowMs) * 100))
                                    : 0}%`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <Droplets size={16} />
                        </div>
                        <div className="text-[9px] font-bold text-white/80 leading-tight">
                          Ikuti titik <span className="text-white">TARGET</span>: tanam, lalu siram sampai tumbuh. Jika cepat, combo bonus akan aktif.
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-3 rounded-2xl bg-black/25 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-black text-white/60 uppercase tracking-widest">Mini Map</div>
                      <div className="text-[9px] font-black text-white/35 uppercase tracking-widest">
                        {Math.round(charPos.x)},{Math.round(charPos.y)}
                      </div>
                    </div>
                    <div
                      className="mt-2 relative w-full h-24 rounded-xl overflow-hidden"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 30% 30%, rgba(16,185,129,0.14) 0 80px, transparent 160px), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.10) 0 90px, transparent 180px), linear-gradient(180deg, rgba(15,23,42,0.85), rgba(2,6,23,0.92))',
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
                          backgroundSize: '18px 18px',
                        }}
                      />
                      {(!tutorialActive && level === 2) && (
                        (() => {
                          const target = plots.find(p => p.id === activePlotId) ?? null;
                          if (!target) return null;
                          const left = `${Math.max(0, Math.min(1, target.cx / 3000)) * 100}%`;
                          const top = `${Math.max(0, Math.min(1, target.cy / 3000)) * 100}%`;
                          return (
                            <motion.div
                              className="absolute w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.55)]"
                              style={{ left, top, transform: 'translate(-50%, -50%)' }}
                              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                            />
                          );
                        })()
                      )}
                      {activeTrees.slice(0, 24).map(t => {
                        const left = `${Math.max(0, Math.min(1, t.x / 3000)) * 100}%`;
                        const top = `${Math.max(0, Math.min(1, t.y / 3000)) * 100}%`;
                        return (
                          <div
                            key={`mini-tree-${t.id}`}
                            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300/80"
                            style={{ left, top, transform: 'translate(-50%, -50%)' }}
                          />
                        );
                      })}
                      {(() => {
                        const left = `${Math.max(0, Math.min(1, charPos.x / 3000)) * 100}%`;
                        const top = `${Math.max(0, Math.min(1, charPos.y / 3000)) * 100}%`;
                        return (
                          <div
                            className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.35)] border border-white/40"
                            style={{ left, top, transform: 'translate(-50%, -50%)' }}
                          />
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              </div>

              <AnimatePresence>
                {interactionHint && (
                  <motion.div
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[160] pointer-events-none"
                    initial={{ y: 10, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.98 }}
                  >
                    <motion.div
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-2xl shadow-2xl ${
                        interactionHint.tone === 'warn' ? 'bg-red-500/10 border-red-400/25' : 'bg-emerald-500/10 border-emerald-400/20'
                      }`}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                          interactionHint.tone === 'warn' ? 'bg-red-500/20 border border-red-400/25 text-red-100' : 'bg-emerald-500/20 border border-emerald-400/25 text-emerald-100'
                        }`}
                      >
                        {interactionHint.key}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-white/70 uppercase tracking-widest">{interactionHint.title}</div>
                        <div className="text-white font-black tracking-tight leading-tight">{interactionHint.subtitle}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- 3. CONTROLS & TIPS FOOTER --- */}
              <div className="h-16 bg-slate-900/95 border-t border-white/10 flex items-center justify-center gap-12 px-10 z-[100]">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-black text-xs">WASD</div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gerak Karakter</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black">E</div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Aksi: <span className="text-emerald-400">Tanam / Siram</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/80">
                    <MousePointer2 size={16} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Klik untuk dorong lari</span>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Trophy size={16} className="text-emerald-400" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.1em]">
                    Target: Turunkan CO2 ke {currentMission?.targetCO2}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPauseOpen(true)}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Pause size={14} />
                  Pause
                </button>
                <button
                  type="button"
                  onClick={() => setVisualOpen(true)}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Sparkles size={14} />
                  Visual
                </button>
                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-transform"
                >
                  <Info size={14} />
                  Panduan
                </button>
              </div>

              <AnimatePresence>
                {pauseOpen && (
                  <motion.div
                    className="absolute inset-0 z-[220] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="max-w-lg w-full bg-slate-900/95 border border-white/10 rounded-[3rem] p-10 shadow-2xl"
                      initial={{ scale: 0.94, y: 16 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.96, y: 10 }}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.25em]">Menu</div>
                          <div className="text-4xl font-black text-white tracking-tighter">PAUSE</div>
                          <div className="mt-2 text-white/70 font-bold leading-relaxed">
                            Tekan ESC untuk lanjut. Saat pause, karakter tidak bergerak.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPauseOpen(false)}
                          className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 active:scale-95 transition-transform"
                          aria-label="Tutup"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="mt-8 grid grid-cols-1 gap-3">
                        <button
                          type="button"
                          onClick={() => setPauseOpen(false)}
                          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                        >
                          <Play size={18} />
                          Lanjutkan
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPauseOpen(false);
                            handleSeedlingSelect(selectedSeedling);
                          }}
                          className="w-full py-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 border border-white/10 flex items-center justify-center gap-2"
                        >
                          <RotateCcw size={18} />
                          Ulang Misi
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPauseOpen(false);
                            setPhase('selection');
                            setPlantingStep(0);
                            setSelectedRegion(null);
                            setSelectedSeedling(null);
                            setLevel(1);
                            setLevel2Stages({ p1: 0, p2: 0, p3: 0, p4: 0 });
                            setActivePlotId('p1');
                            setLevelIntroOpen(false);
                            setActionId(null);
                            setActionPlotId(null);
                            setActionProgress(0);
                            setActiveTrees([]);
                            setEnvScore({ co2: 0, water: 0, temp: 0, bio: 0 });
                            setPlotMoisture({ p1: 45, p2: 45, p3: 45, p4: 45 });
                            setPlotHealth({ p1: 75, p2: 75, p3: 75, p4: 75 });
                            setDayPhase(0);
                            setCurrentMission(missions[0]);
                            setWater(missions[0].initialWater);
                            setEnergy(missions[0].initialEnergy);
                            setTimer(missions[0].timeLimit);
                            setCo2Level(100);
                          }}
                          className="w-full py-4 bg-white/5 hover:bg-white/10 text-white/90 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 border border-white/10"
                        >
                          Kembali ke Peta
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- 4. GAME OVER / WIN OVERLAYS --- */}
              <AnimatePresence>
                {phase === 'gameover' && (
                  <motion.div 
                    className="absolute inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div 
                      className="max-w-md w-full bg-slate-900 border-2 border-red-500/30 rounded-[3rem] p-10 text-center shadow-[0_0_100px_rgba(239,68,68,0.2)]"
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                    >
                      <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={40} className="text-red-500" />
                      </div>
                      <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">MISI GAGAL</h2>
                      <p className="text-slate-400 mb-8 font-medium">Waktu habis atau pohon mati. Lingkungan masih dalam bahaya!</p>
                      {claimSubmitted?.mode === 'incomplete' && (
                        <div className="mb-6 p-5 rounded-[2rem] bg-white/5 border border-white/10 text-left">
                          <div className="text-[10px] font-black text-amber-300 uppercase tracking-widest">Form Data Diri</div>
                          <div className="mt-1 text-xl font-black tracking-tight text-white">Terkirim</div>
                          <div className="mt-2 text-white/80 font-bold text-sm leading-relaxed">Kode data kamu:</div>
                          <div className="mt-3 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 font-black tracking-widest text-[12px] text-white">
                            {claimSubmitted.id}
                          </div>
                          <div className="mt-3 text-[11px] text-white/65 font-bold leading-relaxed">
                            Selesaikan game sampai berhasil untuk mendapatkan kode klaim bibit gratis.
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          type="button"
                          onClick={() => { setClaimMode('incomplete'); setClaimError(null); setClaimOpen(false); setClaimEducationOpen(true); }}
                          className="w-full py-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 border border-white/10"
                        >
                          Isi Formulir
                        </button>
                        <button 
                          type="button"
                          onClick={() => window.location.reload()}
                          className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-900/20"
                        >
                          Coba Lagi
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
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

              {claimSubmitted?.mode === 'success' && (
                <div className="mb-8 p-6 rounded-3xl bg-slate-900 text-white text-left border border-emerald-500/25 shadow-[0_30px_90px_rgba(16,185,129,0.12)]">
                  <div className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Klaim Bibit Gratis</div>
                  <div className="mt-1 flex items-center justify-between gap-4">
                    <div className="text-2xl font-black tracking-tight">Klaim Terkirim</div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-200 text-[10px] font-black uppercase tracking-widest">
                      Terkonfirmasi
                    </div>
                  </div>
                  <div className="mt-2 text-white/80 font-bold text-sm leading-relaxed">Kode klaim kamu:</div>
                  <div className="mt-3 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 font-black tracking-widest text-[12px]">
                    {claimSubmitted.id}
                  </div>
                  <div className="mt-3 text-[11px] text-white/75 font-bold leading-relaxed">
                    Bibit bisa diambil di <span className="text-white">Dinas Kehutanan</span>. Bawa <span className="text-white">KTP</span> dan tunjukkan <span className="text-white">kode klaim</span> ini ke petugas.
                  </div>
                  <div className="mt-2 text-[11px] text-white/60 font-bold leading-relaxed">
                    Jam layanan mengikuti jam kerja kantor dinas setempat.
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => { setClaimMode('success'); setClaimError(null); setClaimOpen(false); setClaimEducationOpen(true); }}
                  className="bg-emerald-50 px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-emerald-100 transition-all shadow-md active:scale-95 border border-emerald-200"
                >
                  Klaim Bibit Gratis
                </button>
                <button onClick={() => { setMapRestorationWave({ id: Date.now(), regionId: selectedRegion.id }); setPhase('selection'); setPlantingStep(0); setSelectedRegion(null); setSelectedSeedling(null); setLevel(1); setLevel2Stages({ p1: 0, p2: 0, p3: 0, p4: 0 }); setActivePlotId('p1'); setLevelIntroOpen(false); setActionPlotId(null); setActionProgress(0); }} className="bg-slate-100 px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all shadow-md active:scale-95">Mulai Baru</button>
                <button onClick={() => navigate('/')} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-emerald-700 shadow-lg transition-all active:scale-95">Selesai</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {claimEducationOpen && (phase === 'finished' || phase === 'gameover') && selectedRegion && selectedSeedling && (
            <motion.div
              className="fixed inset-0 z-[295] bg-emerald-950/12 backdrop-blur-md flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-3xl rounded-[3rem] shadow-[0_40px_120px_rgba(16,185,129,0.18)] overflow-hidden relative border max-h-[88vh] flex flex-col bg-white border-emerald-200"
                initial={{ scale: 0.96, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 10 }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-100"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 10% 12%, rgba(16,185,129,0.12) 0 220px, transparent 520px), radial-gradient(circle at 88% 16%, rgba(134,239,172,0.24) 0 180px, transparent 440px), linear-gradient(180deg, rgba(240,253,244,0.98) 0%, rgba(255,255,255,0.98) 48%, rgba(236,253,245,0.96) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />

                <div className="relative flex-1 overflow-y-auto p-8 sm:p-10">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border bg-emerald-50 border-emerald-200 text-emerald-700">
                        <Sparkles size={12} />
                        {claimMode === 'success' ? 'Sosialisasi Klaim Bibit' : 'Edukasi Penanaman'}
                      </div>
                      <div className="mt-4 text-3xl sm:text-4xl font-black text-emerald-950 tracking-tighter leading-tight max-w-2xl">
                        {claimMode === 'success' ? 'Mari Ambil Bagian dalam Gerakan Menanam untuk Masa Depan yang Lebih Hijau' : 'Satu Langkah Kecil Hari Ini Bisa Membawa Perubahan Besar bagi Lingkungan'}
                      </div>
                      <div className="mt-3 text-emerald-900/75 font-bold leading-relaxed max-w-2xl">
                        {claimMode === 'success'
                          ? `Bibit ${selectedSeedling.name} untuk wilayah ${selectedRegion.name} bukan sekadar bantuan tanam, tetapi awal dari kontribusi nyata untuk udara yang lebih bersih, tanah yang lebih sehat, dan lingkungan yang lebih teduh. Dengan mengisi data diri, kamu ikut membantu penyaluran bibit agar tepat sasaran dan benar-benar sampai ke tangan masyarakat yang siap menanam.`
                          : `Walau misi belum selesai, kepedulianmu tetap berarti. Data yang kamu isi membantu pendataan minat penghijauan di ${selectedRegion.name}, sekaligus menjadi tanda bahwa semakin banyak masyarakat yang peduli pada masa depan lingkungannya. Setelah memahami edukasi ini, kamu bisa lanjut mengisi formulir.`}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={returnToRegionMap}
                      className="w-12 h-12 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 active:scale-95 transition-transform shadow-sm"
                      aria-label="Tutup"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mt-6 rounded-[2.4rem] border p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-widest">Highlight Program</div>
                        <div className="mt-1 text-emerald-950 font-black text-xl tracking-tight">
                          {claimMode === 'success' ? 'Bibit yang dibagikan hari ini bisa menjadi warisan hijau untuk lingkungan sekitar' : 'Niat baik untuk menanam tetap bernilai, bahkan sebelum misi selesai'}
                        </div>
                        <div className="mt-2 text-emerald-900/75 font-bold text-sm leading-relaxed max-w-xl">
                          {claimMode === 'success'
                            ? 'Isi form dengan data yang valid agar bibit dapat disalurkan lebih cepat, tepat lokasi, dan benar-benar sampai kepada warga yang siap merawatnya hingga tumbuh besar.'
                            : 'Data minat penghijauan membantu pemetaan kebutuhan bibit di wilayahmu. Dukungan kecil seperti ini penting untuk menunjukkan bahwa masyarakat siap bergerak bersama menjaga bumi.'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest bg-emerald-600 text-white border-emerald-600">
                          {selectedSeedling.name}
                        </div>
                        <div className="px-3 py-2 rounded-2xl bg-white border border-emerald-200 text-[10px] font-black uppercase tracking-widest text-emerald-800">
                          {selectedRegion.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(claimMode === 'success'
                      ? [
                          { title: '1. Verifikasi Data', desc: 'Data yang benar membantu petugas menyalurkan bibit kepada warga yang benar-benar siap menanam dan merawat pohon di lingkungannya.', tone: 'emerald' },
                          { title: '2. Ambil di Dinas', desc: 'Setelah form dikirim, kamu akan memperoleh kode klaim. Bawa KTP dan kode itu saat pengambilan di Dinas Kehutanan sebagai langkah awal aksi nyata untuk lingkungan.', tone: 'soft' },
                          { title: '3. Tanam & Rawat', desc: 'Bibit yang kamu ambil akan lebih bermakna jika ditanam dan dirawat dengan sungguh-sungguh, karena satu pohon yang tumbuh bisa memberi manfaat bertahun-tahun bagi banyak orang.', tone: 'deep' },
                        ]
                      : [
                          { title: '1. Pohon Menjaga Udara', desc: 'Setiap pohon yang tumbuh dengan baik membantu menyerap karbon, menurunkan panas, dan menghadirkan udara yang lebih segar untuk keluarga serta warga sekitar.', tone: 'emerald' },
                          { title: '2. Akar Menjaga Kehidupan', desc: 'Akar pohon membantu tanah menyimpan air, mengurangi risiko kekeringan, dan menjaga lingkungan tetap kuat saat musim berubah.', tone: 'soft' },
                          { title: '3. Ayo Lanjutkan Sampai Berhasil', desc: 'Jangan berhenti di sini. Selesaikan misi sampai tuntas agar kepedulianmu berubah menjadi aksi nyata dan kamu bisa membawa pulang bibit gratis untuk ditanam.', tone: 'deep' },
                        ]
                    ).map((item, idx) => (
                      <div
                        key={idx}
                        className={`rounded-[2rem] border p-5 relative overflow-hidden ${
                          item.tone === 'emerald'
                            ? 'bg-gradient-to-br from-emerald-50 via-white to-white border-emerald-200'
                            : item.tone === 'soft'
                              ? 'bg-gradient-to-br from-white via-emerald-50 to-white border-emerald-150'
                              : 'bg-gradient-to-br from-emerald-100/70 via-white to-emerald-50 border-emerald-300'
                        }`}
                      >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />
                        <div className="text-emerald-950 font-black tracking-tight">{item.title}</div>
                        <div className="mt-2 text-emerald-900/80 font-bold text-sm leading-relaxed">{item.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[2rem] border p-5 bg-emerald-50 border-emerald-200">
                    <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-widest">Pesan Singkat</div>
                    <div className="mt-2 text-emerald-900/85 font-bold text-sm leading-relaxed">
                      {claimMode === 'success'
                        ? 'Menanam pohon bukan hanya soal hari ini, tetapi tentang menjaga kehidupan esok. Mari manfaatkan kesempatan ini untuk ikut menghadirkan lingkungan yang lebih sehat, lebih teduh, dan lebih nyaman bagi masyarakat.'
                        : 'Perubahan besar selalu dimulai dari kepedulian sederhana. Walau belum selesai bermain, semangatmu tetap berarti. Mari lanjutkan, pahami manfaatnya, lalu buktikan kepedulianmu dengan aksi menanam pohon.'}
                    </div>
                  </div>
                </div>

                <div className="relative p-6 border-t border-emerald-200 bg-white/90 backdrop-blur-xl flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={returnToRegionMap}
                    className="px-6 py-3 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
                  >
                    Nanti Saja
                  </button>
                  <button
                    type="button"
                    onClick={() => { setClaimEducationOpen(false); setClaimError(null); setClaimOpen(true); }}
                    className="px-6 py-3 rounded-2xl border text-white font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-900/15"
                  >
                    <Sparkles size={16} />
                    Lanjut Isi Form
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {claimOpen && (phase === 'finished' || phase === 'gameover') && selectedRegion && selectedSeedling && (
            <motion.div
              className="fixed inset-0 z-[300] bg-emerald-950/12 backdrop-blur-md flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-4xl rounded-[3rem] shadow-[0_45px_140px_rgba(16,185,129,0.18)] overflow-hidden flex flex-col max-h-[88vh] relative border bg-white border-emerald-200"
                initial={{ scale: 0.96, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 10 }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-100"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 12% 10%, rgba(16,185,129,0.12) 0 280px, transparent 560px), radial-gradient(circle at 90% 18%, rgba(167,243,208,0.22) 0 220px, transparent 520px), linear-gradient(180deg, rgba(240,253,244,0.98) 0%, rgba(255,255,255,0.98) 46%, rgba(236,253,245,0.96) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />

                <div className="relative p-8 border-b border-emerald-200 flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border bg-emerald-50 border-emerald-200 text-emerald-700">
                        {claimMode === 'success' ? 'Dinas Kehutanan' : 'Data Diri'}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-widest">
                        {selectedRegion.name}
                      </span>
                    </div>
                    <div className="text-3xl font-black text-emerald-950 tracking-tighter mt-3">
                      {claimMode === 'success' ? 'Klaim Bibit Gratis' : 'Form Data Diri'}
                    </div>
                    <div className="text-emerald-900/75 font-bold mt-2 leading-relaxed max-w-2xl">
                      {claimMode === 'success'
                        ? 'Isi data diri untuk klaim bibit gratis. Setelah kirim, kamu mendapatkan kode klaim untuk pengambilan bibit.'
                        : 'Kamu belum menyelesaikan misi. Isi data diri untuk pendataan. Untuk klaim bibit gratis, selesaikan game sampai berhasil.'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={returnToRegionMap}
                    className="w-12 h-12 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 active:scale-95 transition-transform shadow-sm"
                    aria-label="Tutup"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative flex-1 overflow-y-auto">
                  <div className="p-7 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4">
                      <div className="rounded-[2.6rem] border p-6 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 border-emerald-200 shadow-[inset_0_0_80px_rgba(16,185,129,0.06)]">
                        <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-[0.25em]">Ringkasan</div>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-3xl bg-white border border-emerald-150 p-4">
                            <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-widest">Wilayah</div>
                            <div className="text-emerald-950 font-black tracking-tight mt-1">{selectedRegion.name}</div>
                          </div>
                          <div className="rounded-3xl bg-white border border-emerald-150 p-4">
                            <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-widest">Jenis Bibit</div>
                            <div className="text-emerald-950 font-black tracking-tight mt-1">{selectedSeedling.name}</div>
                          </div>
                          <div className="rounded-3xl bg-white border border-emerald-150 p-4">
                            <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-widest">Status</div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-600 text-white border-emerald-600">
                                {claimMode === 'success' ? 'Berhasil' : 'Belum Selesai'}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-widest">
                                {claimForm.quantity} bibit
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 rounded-[2rem] border p-4 text-[11px] font-bold leading-relaxed bg-emerald-50 border-emerald-200 text-emerald-900/80">
                          {claimMode === 'success'
                            ? 'Setelah terkirim, kamu bisa mengambil bibit di Dinas Kehutanan dengan membawa KTP & kode klaim.'
                            : 'Form ini untuk pendataan. Selesaikan game untuk mendapatkan kode klaim bibit gratis.'}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8">
                      {claimError && (
                        <div className="mb-4 p-4 rounded-[2rem] bg-white border border-emerald-200 text-emerald-800 text-[12px] font-bold">
                          {claimError}
                        </div>
                      )}

                      <div className="rounded-[2.6rem] border p-6 bg-white border-emerald-200">
                        <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-[0.25em]">Data Pribadi</div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Nama Lengkap *</div>
                            <input
                              value={claimForm.name}
                              onChange={(e) => setClaimForm(f => ({ ...f, name: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="Nama sesuai KTP"
                            />
                          </label>

                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">NIK</div>
                            <input
                              value={claimForm.nik}
                              onChange={(e) => setClaimForm(f => ({ ...f, nik: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="16 digit"
                              inputMode="numeric"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="mt-5 rounded-[2.6rem] border p-6 bg-white border-emerald-200">
                        <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-[0.25em]">Kontak</div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Nomor HP *</div>
                            <input
                              value={claimForm.phone}
                              onChange={(e) => setClaimForm(f => ({ ...f, phone: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="08xxxxxxxxxx"
                              inputMode="tel"
                            />
                          </label>

                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Email</div>
                            <input
                              value={claimForm.email}
                              onChange={(e) => setClaimForm(f => ({ ...f, email: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="nama@email.com"
                              inputMode="email"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="mt-5 rounded-[2.6rem] border p-6 bg-white border-emerald-200">
                        <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-[0.25em]">Alamat</div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="block md:col-span-2">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Alamat Lengkap *</div>
                            <input
                              value={claimForm.address}
                              onChange={(e) => setClaimForm(f => ({ ...f, address: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="Jalan, RT/RW, No Rumah"
                            />
                          </label>

                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Kecamatan *</div>
                            <input
                              value={claimForm.kecamatan}
                              onChange={(e) => setClaimForm(f => ({ ...f, kecamatan: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="Kecamatan"
                            />
                          </label>

                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Kelurahan/Desa *</div>
                            <input
                              value={claimForm.kelurahan}
                              onChange={(e) => setClaimForm(f => ({ ...f, kelurahan: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="Kelurahan/Desa"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="mt-5 rounded-[2.6rem] border p-6 bg-white border-emerald-200">
                        <div className="text-[10px] font-black text-emerald-700/70 uppercase tracking-[0.25em]">
                          {claimMode === 'success' ? 'Detail Klaim' : 'Detail Formulir'}
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Jumlah Bibit *</div>
                            <select
                              value={claimForm.quantity}
                              onChange={(e) => setClaimForm(f => ({ ...f, quantity: Number(e.target.value) }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            >
                              {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={n}>{n} bibit</option>
                              ))}
                            </select>
                          </label>

                          <label className="block">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Jenis Bibit</div>
                            <input
                              value={selectedSeedling.name}
                              readOnly
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-emerald-900 font-black bg-emerald-50 border-emerald-200"
                            />
                          </label>

                          <label className="block md:col-span-2">
                            <div className="text-[10px] font-black text-emerald-700/75 uppercase tracking-widest">Lokasi Penanaman (opsional)</div>
                            <input
                              value={claimForm.plantingLocation}
                              onChange={(e) => setClaimForm(f => ({ ...f, plantingLocation: e.target.value }))}
                              className="mt-2 w-full px-4 py-3 rounded-2xl border text-slate-800 font-bold outline-none bg-white border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 placeholder:text-slate-400"
                              placeholder="Contoh: halaman rumah / RW / sekolah"
                            />
                          </label>
                        </div>

                        <div className="mt-5">
                          <label className="flex items-start gap-3 p-4 rounded-[2rem] border bg-emerald-50 border-emerald-200">
                            <input
                              type="checkbox"
                              checked={claimForm.consent}
                              onChange={(e) => setClaimForm(f => ({ ...f, consent: e.target.checked }))}
                              className="mt-1 accent-emerald-500"
                            />
                            <div className="min-w-0">
                              <div className="text-emerald-950 font-black text-[12px]">Saya bersedia dihubungi untuk verifikasi.</div>
                              <div className="text-emerald-900/65 font-bold text-[11px] mt-1 leading-relaxed">
                                Pastikan data benar agar proses verifikasi berjalan lancar.
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative p-6 border-t border-emerald-200 bg-white/92 backdrop-blur-xl flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={returnToRegionMap}
                    className="px-6 py-3 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
                  >
                    Tutup
                  </button>
                  <button
                    type="button"
                    onClick={submitClaim}
                    className="px-6 py-3 rounded-2xl border text-white font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-900/15"
                  >
                    <Sprout size={16} />
                    {claimMode === 'success' ? 'Kirim Klaim' : 'Kirim Formulir'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {visualOpen && (
            <motion.div
              className="fixed inset-0 z-[258] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-2xl bg-slate-900/95 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                initial={{ scale: 0.96, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 10 }}
              >
                <div className="p-8 border-b border-white/10 flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.25em]">Kualitas Visual</div>
                    <div className="text-3xl font-black text-white tracking-tighter mt-1">Tampilan Game</div>
                    <div className="text-white/70 font-bold mt-2 leading-relaxed">
                      Pilih mode tampilan yang paling nyaman. Kalau terasa ramai/burik, pakai mode Bersih.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVisualOpen(false)}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    Tutup
                  </button>
                </div>

                <div className="overflow-y-auto">
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => { setGfxPreset('clean'); }}
                      className={`p-5 rounded-[2rem] border text-left transition-all active:scale-[0.99] ${
                        gfxPreset === 'clean' ? 'bg-emerald-500/15 border-emerald-500/25' : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${gfxPreset === 'clean' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/10 text-white/80'}`}>
                          <Eye size={18} />
                        </div>
                        <div className="text-white font-black tracking-tight">Bersih</div>
                      </div>
                      <div className="text-white/70 font-bold text-sm mt-3 leading-relaxed">
                        Fokus gameplay, efek tidak berlebihan.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setGfxPreset('cinematic'); }}
                      className={`p-5 rounded-[2rem] border text-left transition-all active:scale-[0.99] ${
                        gfxPreset === 'cinematic' ? 'bg-emerald-500/15 border-emerald-500/25' : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${gfxPreset === 'cinematic' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/10 text-white/80'}`}>
                          <Sparkles size={18} />
                        </div>
                        <div className="text-white font-black tracking-tight">Cinematic</div>
                      </div>
                      <div className="text-white/70 font-bold text-sm mt-3 leading-relaxed">
                        Efek lebih banyak, layar lebih dramatis.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setGfxPreset('performance'); }}
                      className={`p-5 rounded-[2rem] border text-left transition-all active:scale-[0.99] ${
                        gfxPreset === 'performance' ? 'bg-emerald-500/15 border-emerald-500/25' : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${gfxPreset === 'performance' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/10 text-white/80'}`}>
                          <Zap size={18} />
                        </div>
                        <div className="text-white font-black tracking-tight">Performa</div>
                      </div>
                      <div className="text-white/70 font-bold text-sm mt-3 leading-relaxed">
                        Efek minimum biar lebih ringan.
                      </div>
                    </button>
                  </div>

                  <div className="px-8 pb-8">
                  <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-white/50 uppercase tracking-widest">Karakter</div>
                        <div className="text-white font-black tracking-tight mt-1">Pakai Gambar Karakter Kamu</div>
                        <div className="text-white/70 font-bold text-sm mt-2 leading-relaxed">
                          Pilih gambar (PNG/JPG/WebP) untuk mengganti sprite karakter di dalam game.
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={requestCharacterSkinFile}
                          className="px-4 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-200 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                        >
                          Ganti
                        </button>
                        {characterSkin && (
                          <button
                            type="button"
                            onClick={clearCharacterSkin}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white/80 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-black/20 border border-white/10 overflow-hidden flex items-center justify-center">
                        {characterSkin ? (
                          <img src={characterSkin} alt="Preview karakter" className="w-full h-full object-contain" draggable={false} />
                        ) : (
                          <div className="text-[9px] font-black text-white/45 uppercase tracking-widest">Default</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black text-white/50 uppercase tracking-widest">Status</div>
                        <div className="text-white font-black tracking-tight">
                          {characterSkin ? 'Custom aktif' : 'Default aktif'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setVisualOpen(false)}
                    className="w-full py-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 border border-white/10"
                  >
                    Terapkan & Tutup
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {guideOpen && (
            <motion.div
              className="fixed inset-0 z-[260] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-3xl bg-slate-900/95 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
                initial={{ scale: 0.96, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 10 }}
              >
                <div className="p-8 border-b border-white/10 flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.25em]">Panduan Game</div>
                    <div className="text-3xl font-black text-white tracking-tighter mt-1">Selamatkan Lingkungan</div>
                    <div className="text-white/70 font-bold mt-2 leading-relaxed">
                      Loop: eksplorasi → tanam → rawat → event muncul → selesaikan cepat → tanah berubah → ulang.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuideOpen(false)}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    Tutup
                  </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80">
                        <Move size={18} />
                      </div>
                      <div className="text-white font-black tracking-tight">Kontrol</div>
                    </div>
                    <div className="text-white/70 font-bold text-sm leading-relaxed">
                      WASD untuk bergerak. Klik di map untuk dorong lari ke arah klik. Tekan E saat dekat lahan/pohon untuk aksi.
                    </div>
                  </div>

                  <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-300">
                        <Trophy size={18} />
                      </div>
                      <div className="text-white font-black tracking-tight">Tujuan</div>
                    </div>
                    <div className="text-white/70 font-bold text-sm leading-relaxed">
                      Turunkan CO2 sampai target, jaga pohon tetap hidup, dan kejar waktu. Kalau CO2 terlalu tinggi atau semua pohon mati: misi gagal.
                    </div>
                  </div>

                  <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-200">
                        <Activity size={18} />
                      </div>
                      <div className="text-white font-black tracking-tight">Event Dinamis</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-orange-200 font-black uppercase text-[11px]">
                          <Wind size={16} /> Heatwave
                        </div>
                        <div className="text-white/70 font-bold text-sm mt-1">Air cepat habis, pohon cepat stres. Prioritaskan siram.</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-blue-200 font-black uppercase text-[11px]">
                          <CloudRain size={16} /> Hujan Deras
                        </div>
                        <div className="text-white/70 font-bold text-sm mt-1">Air naik, tapi banjir bisa merusak akar kalau terlalu basah.</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-red-200 font-black uppercase text-[11px]">
                          <AlertTriangle size={16} /> Hama
                        </div>
                        <div className="text-white/70 font-bold text-sm mt-1">Cari pohon bertanda Hama, dekati lalu tekan E.</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-slate-200 font-black uppercase text-[11px]">
                          <AlertTriangle size={16} /> Polusi
                        </div>
                        <div className="text-white/70 font-bold text-sm mt-1">Kejar sumber polusi (ikon peringatan), tekan E untuk segel.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TreeGame;
