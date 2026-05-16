import React, { useState, useRef, memo, useEffect, useMemo, useReducer, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Trees, ArrowLeft, Thermometer, Droplets, Sun, Info, ShieldCheck, Zap, Move, Sparkles, Sprout, Trophy, Shovel, Volume2, VolumeX, Eye, EyeOff, ThumbsUp, MousePointer2, CloudRain, Wind, AlertTriangle, Activity, Leaf, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Realistic Visual Components ---

const DecorativePlot = ({ x, y }: { x: number, y: number }) => (
  <div className="absolute pointer-events-none" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
    {/* Main Soil Area - More textured */}
    <div className="w-56 h-36 bg-[#3e2723]/30 rounded-[100%] blur-md" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-44 h-28 bg-[#2b1a16]/50 rounded-[100%] blur-[3px] shadow-2xl" />
      <div className="absolute w-36 h-20 bg-[#1a0f0d]/40 rounded-[100%] blur-[1px]" />
    </div>
    
    {/* Decorative Stones with varied sizes */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={`stone-${i}`}
        className="absolute rounded-full shadow-lg border border-black/5"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 0.85, 0.8] }}
        transition={{ duration: 3 + i, repeat: Infinity }}
        style={{
          width: 4 + (i % 4) * 2,
          height: 3 + (i % 3) * 2,
          left: 40 + Math.cos(i * (Math.PI / 4)) * 90,
          top: 20 + Math.sin(i * (Math.PI / 4)) * 60,
          rotate: i * 35,
          backgroundColor: i % 3 === 0 ? '#94a3b8' : i % 3 === 1 ? '#64748b' : '#475569',
          filter: 'contrast(1.1) brightness(0.9)'
        }}
      />
    ))}

    {/* Enhanced Grass Blades with Sway */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={`grass-${i}`}
        className="absolute flex flex-col items-center"
        style={{
          left: 60 + Math.cos(i * (Math.PI / 6)) * 75,
          top: 30 + Math.sin(i * (Math.PI / 6)) * 45,
        }}
      >
        <div className="flex gap-0.5">
          {[...Array(3)].map((_, j) => (
            <motion.div
              key={j}
              animate={{ 
                rotate: [-15 + j * 15, 15 + j * 15, -15 + j * 15],
                skewX: [-5, 5, -5]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.1
              }}
              className="w-1 rounded-full origin-bottom"
              style={{ 
                height: 10 + Math.random() * 8,
                backgroundColor: j % 2 === 0 ? '#10b981' : '#059669',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          ))}
        </div>
      </motion.div>
    ))}

    {/* Little Flowers */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`flower-${i}`}
        className="absolute w-2 h-2 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: i }}
        style={{
          left: 50 + Math.cos(i * (Math.PI / 2)) * 40,
          top: 20 + Math.sin(i * (Math.PI / 2)) * 30,
          backgroundColor: i % 2 === 0 ? '#fbbf24' : '#f87171',
          boxShadow: '0 0 10px rgba(255,255,255,0.3)'
        }}
      >
        <div className="absolute inset-0.5 bg-white/40 rounded-full" />
      </motion.div>
    ))}
  </div>
);

const Bird = () => (
  <motion.div
    initial={{ x: -100, y: Math.random() * 500 }}
    animate={{ 
      x: 3100,
      y: [null, Math.random() * 500, Math.random() * 500],
    }}
    transition={{ duration: 15 + Math.random() * 10, ease: "linear", repeat: Infinity }}
    className="absolute pointer-events-none z-[70]"
  >
    <div className="relative flex gap-1">
      <motion.div 
        animate={{ rotateZ: [-30, 30, -30] }}
        transition={{ repeat: Infinity, duration: 0.2 }}
        className="w-4 h-1 bg-slate-800 rounded-full origin-right"
      />
      <div className="w-2 h-2 bg-slate-900 rounded-full" />
      <motion.div 
        animate={{ rotateZ: [30, -30, 30] }}
        transition={{ repeat: Infinity, duration: 0.2 }}
        className="w-4 h-1 bg-slate-800 rounded-full origin-left"
      />
    </div>
  </motion.div>
);

const SeedlingIcon = ({ type }: { type: string }) => {
  if (type === 'Mahoni') {
    return (
      <svg viewBox="0 0 120 120" className="w-28 h-28 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-2xl z-10">
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
        <ellipse cx="60" cy="105" rx="35" ry="8" fill="rgba(0,0,0,0.2)" />
        <path d="M52 105 C52 80 45 60 45 60 L75 60 C75 60 68 80 68 105 Z" fill="url(#trunkGrad)" />
        <path d="M60 65 L40 40 M60 60 L80 35" fill="none" stroke="url(#trunkGrad)" strokeWidth="6" strokeLinecap="round" />
        <g filter="url(#leafShadow)">
          <circle cx="60" cy="35" r="28" fill="url(#mahoniGrad)" />
          <circle cx="40" cy="45" r="22" fill="url(#mahoniGrad)" />
          <circle cx="80" cy="45" r="22" fill="url(#mahoniGrad)" />
          <circle cx="50" cy="20" r="18" fill="#4ade80" opacity="0.8" />
          <circle cx="70" cy="20" r="18" fill="#4ade80" opacity="0.8" />
        </g>
      </svg>
    );
  }
  if (type === 'Jati') {
    return (
      <svg viewBox="0 0 120 120" className="w-28 h-28 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-2xl z-10">
        <defs>
          <linearGradient id="jatiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="50%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="105" rx="30" ry="6" fill="rgba(0,0,0,0.2)" />
        <path d="M60 105 C60 90 55 80 55 80" fill="none" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
        <path d="M55 80 C20 70 5 30 60 10 C115 30 100 70 55 80 Z" fill="url(#jatiGrad)" stroke="#365314" strokeWidth="1" />
        <path d="M55 80 C60 50 60 20 60 10 M58 65 C45 55 30 50 30 50 M58 65 C70 55 85 50 85 50 M59 45 C45 35 35 30 35 30 M59 45 C75 35 85 30 85 30 M60 25 C50 20 45 15 45 15 M60 25 C70 20 75 15 75 15" fill="none" stroke="#3f6212" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }
  if (type === 'Pinus') {
    return (
      <svg viewBox="0 0 120 120" className="w-28 h-28 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-2xl z-10">
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
        <ellipse cx="60" cy="105" rx="35" ry="8" fill="rgba(0,0,0,0.2)" />
        <path d="M55 105 L65 105 L62 70 L58 70 Z" fill="#451a03" />
        <path d="M25 80 Q60 70 95 80 L60 30 Z" fill="url(#pinusGrad3)" />
        <path d="M30 60 Q60 50 90 60 L60 15 Z" fill="url(#pinusGrad2)" />
        <path d="M35 40 Q60 30 85 40 L60 5 Z" fill="url(#pinusGrad1)" />
      </svg>
    );
  }
  return <Trees size={64} className="text-emerald-700" />;
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
}: {
  onGuide: () => void;
  mode?: 'full' | 'compact';
  regionName?: string;
  regionStatus?: string | null;
  attention?: MascotAttention | null;
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
        headline: 'Halo, aku Monyet Penjaga!',
        body: 'Aku akan memandumu menjaga lingkungan. Pilih wilayah di peta yang butuh bantuan kita ya!',
      };
    }
    const options = [
      {
        headline: 'Salam Hijau, Sobat Bandung!',
        body: 'Aku si Monyet Penjaga. Yuk, kita bersatu hijaukan Bandung Raya! Pilih wilayah merah/oranye di peta untuk mulai gerakan menanam pohon bersama warga lainnya!',
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
        text: pick(['Siap menghijaukan Bandung hari ini, Sobat?', 'Ayo kita cari lahan gersang dan tanami pohon!', 'Aku si Monyet Penjaga siap memandumu!'], seed),
      };
    }
    if (machine.nudgeUntil) {
      return {
        hint: 'Tips Monyet',
        text: pick(['Klik wilayah merah di peta, itu yang paling darurat!', 'Jangan ragu, setiap bibit pohonmu sangat berarti!', 'Ayo gerakkan jemarimu untuk masa depan hijau!'], seed),
      };
    }
    return {
      hint: 'Monyet Penjaga',
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
                  transition={{ duration: 0.18 }}
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
              animate={{
                rotate:
                  machine.funUntil
                    ? [0, 12, -10, 0]
                    : machine.state === 'thinking'
                      ? [3, 1, 3]
                      : machine.state === 'hoverMap'
                        ? [0.8, -0.8, 0.8]
                        : machine.state === 'aware'
                          ? [-2, 2, -2]
                          : [-1.2, 1.2, -1.2],
                y: machine.state === 'happy' || machine.state === 'active' ? [0, -5, 0] : [0, -2, 0],
                x:
                  machine.state === 'worried'
                    ? [0, -2, 2, -2, 0]
                    : machine.state === 'hoverMap'
                      ? [0, -3, 0]
                      : machine.state === 'aware'
                        ? [0, -2, 0]
                        : 0,
                scale: selfHover ? 1.02 : machine.state === 'aware' ? 1.01 : 1,
              }}
              transition={{ repeat: Infinity, duration: machine.state === 'worried' ? 0.9 : isFast ? 2.4 : 3.4, ease: 'easeInOut' }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98, y: 1 }}
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
                animate={{
                  y: [0, -3, 0],
                  x:
                    effectivePose === 'point'
                      ? [-2, -4, -2]
                      : effectivePose === 'plant'
                        ? [1, 2, 1]
                        : effectivePose === 'guard'
                          ? [0, 1, 0]
                          : [0, 0, 0],
                }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              >
                <div className="relative w-[86px] h-[128px]">
                  <motion.div
                    ref={headRef}
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-[64px] h-[64px] rounded-full border-2 border-[#4a2c19] shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
                    animate={{
                      rotate:
                        machine.state === 'thinking'
                          ? [8, -4, 8]
                          : machine.state === 'hoverMap'
                            ? (effectivePose === 'point' ? [-10, -5, -10] : [6, 10, 6])
                            : machine.state === 'aware'
                              ? [-5, 5, -5]
                              : effectivePose === 'guard'
                                ? [-3, 3, -3]
                                : mood === 'worried'
                                  ? [-4, 4, -4]
                                  : [0, 2, 0],
                      x:
                        machine.state === 'hoverMap'
                          ? (effectivePose === 'point' ? [-3, -5, -3] : [3, 5, 3])
                          : machine.state === 'aware'
                            ? [0, -2, 0]
                            : 0,
                      y: machine.state === 'happy' ? [0, -3, 0] : 0,
                      scale: machine.state === 'aware' ? [1, 1.04, 1] : [1, 1.02, 1],
                    }}
                    transition={{ repeat: Infinity, duration: isFast ? 1.4 : 2.0, ease: 'easeInOut' }}
                    style={{
                      backgroundColor: accent.core,
                      backgroundImage: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
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
                      animate={{ rotate: [-10, 10, -10], y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 2.0 }}
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
                    animate={{ rotate: [-10, 20, -10], x: [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
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
                    animate={
                      effectivePose === 'point'
                        ? { rotate: -55, x: -4, y: -6 }
                        : effectivePose === 'plant'
                          ? { rotate: 30, x: 1, y: 2 }
                          : { rotate: [-14, 10, -14], x: [0, 2, 0], y: [0, -1, 0] }
                    }
                    transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
                    style={{ backgroundColor: accent.core }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute -right-1 top-[70px] w-[24px] h-[12px] rounded-full border border-[#5d361b]/30 shadow-sm"
                    animate={
                      effectivePose === 'wave'
                        ? { rotate: [32, -12, 32], x: [0, -2, 0], y: [0, -3, 0] }
                        : effectivePose === 'water'
                          ? { rotate: [18, 32, 18], x: [0, 1, 0], y: [0, 2, 0] }
                          : { rotate: [14, -10, 14], x: [0, -2, 0], y: [0, -1, 0] }
                    }
                    transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut', delay: 0.05 }}
                    style={{ backgroundColor: accent.core }}
                  />

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

const RealisticTree = ({ size, color, stage, actionProgress, icon: Icon, health, moisture, yPos }: { size: number, color: string, stage: number, actionProgress: number, icon?: React.ElementType, health: number, moisture: number, yPos: number }) => {
  const health01 = Math.max(0, Math.min(1, health / 100));
  const moisture01 = Math.max(0, Math.min(1, moisture / 100));
  return (
    <motion.div 
      className="relative flex flex-col items-center justify-end" 
      style={{ width: size, height: size, zIndex: Math.floor(yPos) }}
      animate={{ 
        rotate: stage >= 4 ? [-0.8, 0.8, -0.8] : [0, 0, 0],
        skewX: stage >= 4 ? [-0.4, 0.4, -0.4] : [0, 0, 0]
      }}
      transition={{ 
        duration: 4 + Math.random() * 2, 
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
        {/* Soil texture detail */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }} />
        
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
                    animate={{ y: [0, -3, 0], x: [0, 2, 0], rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute -top-6 -right-4"
                  >
                    <Trees size={56} style={{ color: color + 'EE' }} />
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 3, 0], x: [0, -2, 0], rotate: [2, -2, 2] }}
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
    </motion.div>
  );
};

const AmbientDust = () => (
  <div className="absolute inset-0 pointer-events-none z-[65] overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
        initial={{ 
          x: Math.random() * 3000, 
          y: Math.random() * 3000,
          opacity: 0 
        }}
        animate={{ 
          y: [null, Math.random() * 3000, Math.random() * 3000],
          x: [null, Math.random() * 3000, Math.random() * 3000],
          opacity: [0, 0.5, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{ 
          duration: 10 + Math.random() * 20, 
          repeat: Infinity, 
          ease: "linear",
          delay: Math.random() * 10
        }}
      />
    ))}
  </div>
);

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

  if (actionId === 'plant') {
    const p01 = Math.max(0, Math.min(1, progress / 100));
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: [0.98, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
        className="relative w-8 h-8"
      >
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-6 h-2 rounded-full bg-black/10 blur-[0.2px]" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-5 h-2 rounded-full bg-[#5d4037]/25 border border-black/10" />
        <motion.div
          animate={{ y: -2 + p01 * 10, rotate: p01 > 0.7 ? [0, 6, 0] : 0, scale: 1 - p01 * 0.12 }}
          transition={{ type: 'spring', damping: 18, stiffness: 260 }}
          className="absolute left-1/2 -translate-x-1/2 top-0"
          style={{ color: accent }}
        >
          {Icon ? <Icon size={20} /> : <Sprout size={20} />}
        </motion.div>
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

const CharacterSprite = ({ isWalking, actionId, toolIcon: ToolIcon, accent, actionProgress, direction }: { isWalking: boolean, actionId: string | null, toolIcon?: React.ElementType, accent: string, actionProgress?: number, direction: 'left' | 'right' }) => {
  const isActing = Boolean(actionId);
  const isDigging = actionId === 'hole';
  const isPlanting = actionId === 'plant';
  const p01 = Math.max(0, Math.min(1, (actionProgress ?? 0) / 100));
  const crouch = isPlanting ? (2 + p01 * 3) : 0;
  const [blinkTick, setBlinkTick] = useState(0);
  const blinkTimerRef = useRef<number | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <motion.div
      animate={{
        rotate: isDigging ? [-2.6, 0.8, -1.8] : isPlanting ? [-0.8, 0.8, -0.8] : isActing ? [-1.2, 1.2, -1.0] : isWalking ? [-0.8, 0.8, -0.8] : [-0.6, 0.6, -0.6],
        y: isDigging ? [0, 1.2, 0] : isPlanting ? [crouch, crouch + 0.6, crouch] : isActing ? [0, 0.8, 0] : isWalking ? [0, -1.6, 0] : [0, 0.8, 0],
      }}
      transition={{ repeat: Infinity, duration: isDigging ? 0.48 : isPlanting ? 0.9 : isActing ? 0.7 : isWalking ? 0.55 : 3.8, ease: 'easeInOut' }}
      className={`relative flex flex-col items-center origin-bottom transition-transform duration-300 ${direction === 'left' ? '-scale-x-100' : 'scale-x-100'}`}
    >
      <motion.div 
        animate={{ 
          y: isDigging ? [0, -1.6, 0] : isPlanting ? [-0.6, -1.2, -0.6] : isActing ? [0, -1.2, 0] : isWalking ? [0, -2.6, 0] : [0, -1, 0],
          rotate: isWalking ? [-2, 2, -2] : 0
        }}
        transition={{ repeat: Infinity, duration: isDigging ? 0.48 : isPlanting ? 0.9 : isActing ? 0.7 : isWalking ? 0.55 : 1.8, ease: 'easeInOut' }}
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
          rotate: isDigging ? [-2.2, 1.2, -1.6] : isPlanting ? [-1, 1, -1] : isActing ? [-1.4, 1.8, -1.2] : isWalking ? [-1.2, 1.2, -1.2] : [-0.8, 0.8, -0.8],
          y: isDigging ? [0, 2, 0] : isPlanting ? [2 + crouch * 0.6, 3 + crouch * 0.6, 2 + crouch * 0.6] : isActing ? [0, 1.5, 0] : isWalking ? [0, -1.2, 0] : [0, 0.6, 0],
          scaleY: isDigging ? [1, 0.98, 1] : isPlanting ? [1, 0.985, 1] : isActing ? [1, 0.985, 1] : isWalking ? [1, 0.995, 1] : [1, 1.015, 1],
        }}
        transition={{ repeat: Infinity, duration: isDigging ? 0.48 : isPlanting ? 0.9 : isActing ? 0.7 : isWalking ? 0.55 : 2.4, ease: 'easeInOut' }}
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
            rotate: isDigging ? [34, -6, 22] : isPlanting ? [10, 6, 10] : isActing ? [18, -18, 12] : isWalking ? [14, -14, 14] : [4, -4, 4],
            y: isDigging ? [0, 3, 0] : isPlanting ? [4 + p01 * 3, 5 + p01 * 3, 4 + p01 * 3] : isActing ? [0, 1.5, 0] : 0,
          }}
          transition={{ repeat: Infinity, duration: isDigging ? 0.48 : isPlanting ? 0.9 : isActing ? 0.7 : isWalking ? 0.55 : 1.8, ease: 'easeInOut' }}
          className="absolute -left-3 top-2 w-4 h-8 bg-[#7d4a27] rounded-full border-2 border-[#5d361b] origin-top" 
        />
        <motion.div 
          animate={{
            rotate: isDigging ? [-6, 10, -4] : isPlanting ? [-10, -6, -10] : isActing ? [-14, 14, -10] : isWalking ? [-14, 14, -14] : [-4, 4, -4],
            y: isDigging ? [1, 2, 1] : isPlanting ? [4 + p01 * 3, 5 + p01 * 3, 4 + p01 * 3] : isActing ? [0, 1, 0] : 0,
          }}
          transition={{ repeat: Infinity, duration: isDigging ? 0.48 : isPlanting ? 0.9 : isActing ? 0.7 : isWalking ? 0.55 : 1.8, ease: 'easeInOut' }}
          className="absolute -right-3 top-2 w-4 h-8 bg-[#7d4a27] rounded-full border-2 border-[#5d361b] origin-top" 
        />

        {isActing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute -right-9 top-4 w-10 h-10 rounded-[1.15rem] bg-white/90 border border-black/10 shadow-2xl flex items-center justify-center"
          >
            <HeldTool actionId={actionId ?? ''} accent={accent} icon={ToolIcon} actionProgress={actionProgress} />
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
        transition={{ repeat: Infinity, duration: isDigging ? 0.48 : isPlanting ? 0.9 : isActing ? 0.7 : isWalking ? 0.55 : 2.4, ease: 'easeInOut' }}
        className="w-12 h-3 bg-black/20 rounded-full blur-sm mt-1" 
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

const RegionItem = memo(({ region, isHovered, isFocused, focusActive, hoverActive, onHover, onClick }: {
  region: Region;
  isHovered: boolean;
  isFocused: boolean;
  focusActive: boolean;
  hoverActive: boolean;
  onHover: (r: Region | null) => void;
  onClick: (r: Region) => void;
}) => {
  const isHijau = region.status === 'hijau';
  const fillUrl = `url(#grad-${region.status})`;
  const glowColor =
    region.status === 'hijau'
      ? 'rgba(16,185,129,0.55)'
      : region.status === 'kritis'
        ? 'rgba(245,158,11,0.60)'
        : 'rgba(239,68,68,0.62)';
  const isDimmed = (focusActive && !isFocused) || (hoverActive && !isHovered && !isFocused);
  const depth = isFocused ? 2.6 : isHovered ? 2.1 : 1.2;
  const texFill = `url(#tex-${region.status})`;
  const texBaseOpacity =
    region.status === 'hijau'
      ? 0.14
      : region.status === 'kritis'
        ? 0.20
        : 0.22;
  const texOpacity = isDimmed ? 0.05 : (isHovered || isFocused ? texBaseOpacity * 1.65 : texBaseOpacity);
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
        ? (showFullLabel ? 6.3 : 5.0)
        : labelLines.length > 1
          ? (showFullLabel ? 6.1 : 5.0)
          : (showFullLabel ? 6.5 : 5.2);
    return { x, y, w, h, fontSize };
  }, [labelLines.length, labelOffset.dx, labelOffset.dy, region.id, region.x, region.y, showFullLabel]);
  
  return (
    <motion.g
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
        fill="rgba(0,0,0,0.40)"
        opacity={isDimmed ? 0.08 : 0.26}
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
        fill={fillUrl}
        fillOpacity={isDimmed ? 0.35 : (isHovered || isFocused ? 1 : 0.86)}
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
          opacity: (isHovered || isFocused) && !isDimmed ? [texOpacity * 0.92, texOpacity * 1.08, texOpacity * 0.92] : texOpacity,
        }}
        transition={{ repeat: (isHovered || isFocused) && !isDimmed ? Infinity : 0, duration: region.status === 'hijau' ? 3.6 : region.status === 'kritis' ? 2.4 : 2.1, ease: 'easeInOut' }}
        className="pointer-events-none"
      />
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
              padding: showFullLabel ? (labelLines.length > 1 ? '1px 6px' : '1px 7px') : '0px 5px',
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
  onHover,
  hoveredRegion,
  onSelect,
  focusedRegionId,
  onResetFocus,
}: {
  onHover: (r: Region | null) => void;
  hoveredRegion: Region | null;
  onSelect: (r: Region) => void;
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
  const hoverActive = Boolean(hoveredRegion);
  const [ripple, setRipple] = useState<{ id: string; key: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [tooltipSize, setTooltipSize] = useState({ w: 220, h: 120 });

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
    return allRegions.filter(r => filters[r.status]);
  }, [filters]);

  const rippleTarget = useMemo(() => {
    if (!ripple) return null;
    return allRegions.find(r => r.id === ripple.id) ?? null;
  }, [ripple]);

  const focusTransform = useMemo(() => {
    const s = focusActive ? 1.35 : 1;
    const centerX = 60;
    const centerY = 50;
    const target = focusedRegionId ? allRegions.find(r => r.id === focusedRegionId) : null;
    if (!target) return 'translate(0px, 0px) scale(1)';
    const rawTx = centerX - target.x * s;
    const rawTy = centerY - target.y * s;
    const minTx = 120 * (1 - s);
    const maxTx = 0;
    const minTy = 100 * (1 - s);
    const maxTy = 0;
    const tx = Math.max(minTx, Math.min(maxTx, rawTx));
    const ty = Math.max(minTy, Math.min(maxTy, rawTy));
    return `translate(${tx}px, ${ty}px) scale(${s})`;
  }, [focusActive, focusedRegionId]);

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
      onMouseEnter={() => {
        if (mapRef.current) rectRef.current = mapRef.current.getBoundingClientRect();
      }}
      className="relative bg-[#0b1220] rounded-[2rem] border border-white/10 aspect-[4/3] overflow-hidden shadow-2xl"
    >
      {/* High-tech / Blueprint Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#334155 2px, transparent 2px), linear-gradient(90deg, #334155 2px, transparent 2px)', backgroundSize: '100px 100px' }} />
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
          animate={{ transform: focusTransform }}
          transition={{ duration: 0.42, ease: 'easeInOut' }}
        >
          <g filter="url(#softShadow)">
            <path d="M 10,35 L 15,20 L 25,10 L 35,5 L 45,10 L 50,15 L 60,15 L 70,25 L 80,45 L 95,42 L 110,40 L 115,50 L 110,65 L 100,85 L 85,90 L 70,88 L 60,80 L 50,78 L 45,70 L 25,80 L 15,75 L 5,60 L 5,50 Z" fill="url(#tex-outside)" opacity="0.95" />
          </g>
          {visibleRegions.map(r => (
            <RegionItem
              key={r.id}
              region={r}
              isHovered={hoveredRegion?.id === r.id}
              isFocused={focusedRegionId === r.id}
              focusActive={focusActive}
              hoverActive={hoverActive}
              onHover={onHover}
              onClick={onSelect}
            />
          ))}
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
  
  // ... rest of existing state ...
  const [level, setLevel] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSeedling, setSelectedSeedling] = useState<Seedling | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);
  const [mapFocusRegionId, setMapFocusRegionId] = useState<string | null>(null);
  const [mapFocusLock, setMapFocusLock] = useState(false);
  const [showAnalysisMascot, setShowAnalysisMascot] = useState(true);
  const regionSelectTimerRef = useRef<number | null>(null);
  const [plantingStep, setPlantingStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [charDirection, setCharDirection] = useState<'left' | 'right'>('right');
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
  const [unlockedRadius, setUnlockedRadius] = useState(450); // Initial area radius (larger for better visibility)
  const tutorialSpot = { x: 400, y: 400 }; // The only spot allowed initially

  const tutorialMessages = [
    "Tanah ini rusak, ayo tanam pohon pertama untuk memulihkan ekosistem.",
    "Bagus! Sekarang berjalanlah mendekati titik tanah yang ditandai.",
    "Tekan [E] untuk menggali lubang dan menanam bibit pohon.",
    "Pohon butuh air! Dekati pohon dan tekan [E] untuk menyiramnya.",
    "Selamat! Kamu telah menyelesaikan tutorial. Sekarang pulihkan seluruh wilayah!"
  ];

  // --- 1. CORE PHYSICS & STATE ---
  const [charPos, setCharPos] = useState({ x: 500, y: 500 });
  const charPosRef = useRef({ x: 500, y: 500 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });
  const cameraRef = useRef({ x: 0, y: 0 });
  const gameLoopRef = useRef<number | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [activeParticles, setActiveParticles] = useState<any[]>([]);
  const [gameAreaSize, setGameAreaSize] = useState({ width: 1280, height: 720 });
  const gameAreaRef = useRef<HTMLDivElement>(null);

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

  // --- Input Handling ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [phase, tutorialActive, tutorialStep, activeTrees, energy, water, selectedSeedling]);

  // --- 3. PHYSICS LOOP (LERP & VELOCITY) ---
  useEffect(() => {
    if (phase !== 'planting') return;
    if (tutorialActive && tutorialStep === 0) return;

    const moveSpeed = 0.8;
    const friction = 0.85;
    const worldWidth = 3000;
    const worldHeight = 3000;

    const update = () => {
      let dx = 0;
      let dy = 0;

      if (keysPressed.current.has('KeyW') || keysPressed.current.has('ArrowUp')) dy -= 1;
      if (keysPressed.current.has('KeyS') || keysPressed.current.has('ArrowDown')) dy += 1;
      if (keysPressed.current.has('KeyA') || keysPressed.current.has('ArrowLeft')) dx -= 1;
      if (keysPressed.current.has('KeyD') || keysPressed.current.has('ArrowRight')) dx += 1;

      if (dx !== 0 || dy !== 0) {
        const length = Math.sqrt(dx * dx + dy * dy);
        velocityRef.current.x += (dx / length) * moveSpeed;
        velocityRef.current.y += (dy / length) * moveSpeed;
        setIsWalking(true);
        
        if (dx < 0) setCharDirection('left');
        else if (dx > 0) setCharDirection('right');

        if (tutorialActive && tutorialStep === 1) {
          const distToSpot = Math.sqrt(Math.pow(charPosRef.current.x - tutorialSpot.x, 2) + Math.pow(charPosRef.current.y - tutorialSpot.y, 2));
          if (distToSpot < 80) {
            setTutorialStep(2);
            playReward();
          }
        }
      } else {
        setIsWalking(false);
      }

      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;

      const nextX = Math.max(50, Math.min(worldWidth - 50, charPosRef.current.x + velocityRef.current.x));
      const nextY = Math.max(50, Math.min(worldHeight - 50, charPosRef.current.y + velocityRef.current.y));

      charPosRef.current = { x: nextX, y: nextY };
      setCharPos({ x: nextX, y: nextY });

      const targetX = -nextX + window.innerWidth / 2;
      const targetY = -nextY + window.innerHeight / 2;
      
      setCameraPos(prev => ({
        x: prev.x + (targetX - prev.x) * 0.1,
        y: prev.y + (targetY - prev.y) * 0.1
      }));

      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [phase, tutorialActive, tutorialStep]);

  // --- 4. ENHANCED INTERACTION ---
  const handleInteraction = () => {
    if (phase !== 'planting') return;
    const currentPos = charPosRef.current;

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
          setToast({ id: Date.now(), title: 'TUTORIAL SELESAI', subtitle: 'Misi baru: Tanam 3 pohon lagi!', tone: 'good' });
          // Update to sprout
          setActiveTrees(prevTrees => prevTrees.map(t => 
            t.id === nearTree.id ? { ...t, stage: 3, moisture: 100 } : t
          ));
        }
        return;
      }
      return;
    }

    const nearestPlot = plots.find(p => {
      const dist = Math.sqrt(Math.pow(currentPos.x - p.cx, 2) + Math.pow(currentPos.y - p.cy, 2));
      return dist < 120;
    });

    if (nearestPlot) {
      const existingTree = activeTrees.find(t => t.x === nearestPlot.cx && t.y === nearestPlot.cy);
      if (!existingTree) {
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
    setWater(prev => Math.max(0, prev - 10));
    setActiveTrees(prev => prev.map(t => 
      t.id === id ? { ...t, moisture: Math.min(100, t.moisture + 30) } : t
    ));
    spawnFloatText(charPosRef.current.x, charPosRef.current.y - 40, '-10 Air', 'warn');
    playReward();
  };

  // --- Real-time Game Loop ---
  useEffect(() => {
    if (phase !== 'planting') return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          setPhase('gameover');
          return 0;
        }
        return prev - 1;
      });

      // Random Dynamic Events (Hama, Polusi Mendadak)
      if (Math.random() < 0.02) {
        setToast({ 
          id: Date.now(), 
          title: 'SERANGAN HAMA!', 
          subtitle: 'Kesehatan pohon menurun drastis!', 
          tone: 'warn' 
        });
        setActiveTrees(prev => prev.map(t => ({ ...t, health: Math.max(0, t.health - 20) })));
      }

      // Update trees and CO2
      setActiveTrees(prevTrees => {
        let co2Reduction = 0;
        const nextTrees = prevTrees.map(tree => {
          // Environmental Impact on Tree
          let healthLoss = 0;
          if (weather === 'polluted') healthLoss = 1;
          if (tree.moisture < 10) healthLoss = 2;
          
          const nextHealth = Math.max(0, tree.health - healthLoss);

          // Water consumption
          let waterLoss = 0.5;
          if (weather === 'drought') waterLoss = 2.5;
          if (weather === 'sunny') waterLoss = 1.2;
          if (weather === 'rainy') waterLoss = -3.0; // Rain replenishes moisture
          
          const nextMoisture = Math.max(0, Math.min(100, tree.moisture - waterLoss));
          
          // Growth based on health and moisture
          let growthAdd = 0;
          if (nextMoisture > 20 && nextHealth > 30) {
            growthAdd = 0.8;
            if (weather === 'rainy') growthAdd *= 1.8;
            if (weather === 'polluted') growthAdd *= 0.4;
          }
          
          const nextGrowth = Math.min(100, tree.growth + growthAdd);
          const nextStage = Math.floor(nextGrowth / 16);
          
          // Impact on CO2 (Only healthy trees reduce CO2)
          if (nextHealth > 20) {
            co2Reduction += (nextStage * 0.15);
          }
          
          return { ...tree, health: nextHealth, moisture: nextMoisture, growth: nextGrowth, stage: nextStage };
        });

        // Check if all trees died
        if (nextTrees.length > 0 && nextTrees.every(t => t.health <= 0)) {
          setPhase('gameover');
        }

        setCo2Level(prevCO2 => Math.max(0, prevCO2 - co2Reduction));
        return nextTrees;
      });

      // Check win condition
      if (co2Level <= (currentMission?.targetCO2 ?? 40)) {
        setPhase('finished');
      }

      // Dynamic Weather Engine
      if (Math.random() < 0.08) {
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
      setEnergy(prev => Math.min(100, prev + 1.5));
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, weather, co2Level, currentMission, activeTrees.length]);


  const level1Steps = [
    { id: 'hole', title: 'Gali Lubang', icon: Shovel, text: 'Gunakan Sekop untuk menggali lubang tanam. Pastikan tanah cukup gembur untuk perkembangan akar.', edu: 'Lubang tanam yang cukup dalam membantu akar menyebar, meningkatkan stabilitas pohon dan daya serap air hujan.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'fertilizer', title: 'Pupuk Dasar', icon: Thermometer, text: 'Taburkan pupuk organik. Nutrisi ini akan membantu bibit bertahan di fase awal penanaman.', edu: 'Pupuk organik memperbaiki struktur tanah dan meningkatkan mikroorganisme yang penting untuk kesehatan tanaman.', impact: { co2: 1, water: 2, temp: 0, bio: 2 } satisfies EnvImpact },
    { id: 'plant', title: 'Letakkan Bibit', icon: Trees, text: 'Letakkan bibit ke dalam lubang dengan hati-hati. Pastikan posisinya tegak lurus.', edu: 'Posisi bibit yang tegak mencegah akar patah dan membantu pertumbuhan batang lebih kuat.', impact: { co2: 2, water: 1, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'cover', title: 'Tutup Tanah', icon: Sprout, text: 'Tutup kembali lubang dengan tanah dan tekan perlahan agar bibit tertanam kokoh.', edu: 'Menutup tanah rapat mengurangi kantong udara, menjaga kelembaban, dan melindungi akar dari panas berlebih.', impact: { co2: 1, water: 2, temp: 1, bio: 1 } satisfies EnvImpact },
    { id: 'water', title: 'Penyiraman', icon: Droplets, text: 'Siram dengan air yang cukup agar tanah lembab dan merangsang pertumbuhan tunas baru.', edu: 'Air membantu akar menyerap nutrisi. Tanah lembab stabil membuat bibit lebih tahan terhadap stres cuaca.', impact: { co2: 1, water: 4, temp: 0, bio: 1 } satisfies EnvImpact },
    { id: 'sun', title: 'Perawatan Matahari', icon: Sun, text: 'Pastikan tanaman mendapat sinar matahari yang cukup untuk proses fotosintesis.', edu: 'Fotosintesis mengubah CO₂ menjadi oksigen. Pohon dewasa membantu menurunkan suhu dan meningkatkan kualitas udara.', impact: { co2: 4, water: 1, temp: 3, bio: 2 } satisfies EnvImpact },
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

  const getActionHint = (stepId: string) => {
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
    if (region.status === 'hijau') {
      setMapFocusLock(true);
      setMapFocusRegionId(region.id);
      setHoveredRegion(region);
      if (regionSelectTimerRef.current) window.clearTimeout(regionSelectTimerRef.current);
      regionSelectTimerRef.current = window.setTimeout(() => {
        setMapFocusLock(false);
        setMapFocusRegionId(null);
        regionSelectTimerRef.current = null;
      }, 520);
      return;
    }
    setMapFocusLock(true);
    setMapFocusRegionId(region.id);
    setHoveredRegion(region);
    if (regionSelectTimerRef.current) window.clearTimeout(regionSelectTimerRef.current);
    regionSelectTimerRef.current = window.setTimeout(() => {
      setMapFocusLock(false);
      setMapFocusRegionId(null);
      regionSelectTimerRef.current = null;
      commitRegionSelect(region);
    }, 420);
  };

  const commitRegionSelect = (region: Region) => {
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
    spawnFloatText(fxX, fxY + 18, stepId === 'hole' ? 'Berhasil menggali' : 'Aksi berhasil', 'good');
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
                      focusedRegionId={mapFocusRegionId}
                      onResetFocus={() => {
                        setMapFocusRegionId(null);
                        setMapFocusLock(false);
                        if (regionSelectTimerRef.current) window.clearTimeout(regionSelectTimerRef.current);
                        regionSelectTimerRef.current = null;
                      }}
                      onSelect={beginRegionSelect}
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col">
                  <div className="bg-emerald-50/80 p-6 rounded-[2rem] border border-emerald-100 h-full flex flex-col shadow-[inset_0_0_90px_rgba(16,185,129,0.10)]">
                    <h3 className="text-lg font-black text-gray-900 mb-4 uppercase flex items-center gap-2 border-b border-emerald-200 pb-3">
                      <Info size={20} className="text-primary" /> Analisis Lahan
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
                            <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">"{(hoveredRegion || selectedRegion)?.description}"</p>
                            
                            {(hoveredRegion || selectedRegion)?.status !== 'hijau' ? (
                              <button
                                onClick={() => beginRegionSelect((hoveredRegion || selectedRegion)!)}
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
                        ) : null}
                      </AnimatePresence>

                      <div className="mt-auto sticky bottom-0 pt-3 -mx-6 px-6 pb-3 bg-gradient-to-t from-white/95 via-white/80 to-transparent">
                        <div className="flex items-center justify-end mb-2">
                          <button
                            type="button"
                            onClick={() => setShowAnalysisMascot(v => !v)}
                            className="px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/70 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-700 inline-flex items-center gap-2 active:scale-95 transition-transform"
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
                            onGuide={() =>
                              setToast({
                                id: Date.now(),
                                title: 'Ayo mulai dari peta',
                                subtitle: 'Klik wilayah Oranye/Merah untuk mulai restorasi.',
                                tone: 'info',
                              })
                            }
                          />
                        )}
                      </div>
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
                      <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-6 shadow-md group-hover:shadow-xl transition-all text-primary relative overflow-visible border-4 border-white">
                        <div className="absolute inset-0 rounded-full opacity-60 overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(16,185,129,0.18) 0 24px, transparent 46px)' }} />
                        <SeedlingIcon type={s.name} />
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
                      {weather === 'sunny' && <Sun size={24} className="text-yellow-400" />}
                      {weather === 'rainy' && <CloudRain size={24} className="text-blue-400" />}
                      {weather === 'drought' && <Wind size={24} className="text-orange-400" />}
                      {weather === 'polluted' && <AlertTriangle size={24} className="text-red-400" />}
                    </div>
                    <div>
                      <div className="text-[8px] font-black text-white/40 uppercase">Cuaca</div>
                      <div className="text-[10px] font-black text-white uppercase tracking-wider">{weather}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- 2. GAME WORLD (CHARACTER CENTRIC) --- */}
              <div 
                ref={gameAreaRef} 
                className="flex-1 relative overflow-hidden bg-slate-950 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const clickY = e.clientY - rect.top;
                  
                  // Translate click to world coordinates
                  const worldX = clickX - cameraPos.x;
                  const worldY = clickY - cameraPos.y;
                  
                  // Smoothly move towards click point
                  setCharPos(prev => {
                    const dx = worldX - prev.x;
                    const dy = worldY - prev.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 10) return prev;
                    
                    const moveDist = Math.min(dist, 100); // Move max 100px per click
                    const nx = dx / dist;
                    const ny = dy / dist;
                    
                    if (nx < 0) setCharDirection('left');
                    if (nx > 0) setCharDirection('right');
                    
                    return {
                      x: Math.max(50, Math.min(1950, prev.x + nx * moveDist)),
                      y: Math.max(50, Math.min(1950, prev.y + ny * moveDist))
                    };
                  });
                  setIsWalking(true);
                  setTimeout(() => setIsWalking(false), 300);
                }}
              >
                <motion.div 
                  className="absolute inset-0 origin-center"
                  animate={{ 
                    x: cameraPos.x, 
                    y: cameraPos.y 
                  }}
                  transition={{ type: 'spring', stiffness: 150, damping: 25, mass: 0.5 }}
                  style={{
                    width: 3000,
                    height: 3000,
                    background: weather === 'rainy' ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' : 
                                weather === 'drought' ? 'linear-gradient(180deg, #451a03 0%, #78350f 100%)' : 
                                weather === 'polluted' ? 'linear-gradient(180deg, #1e293b 0%, #334155 100%)' :
                                'linear-gradient(180deg, #064e3b 0%, #065f46 100%)',
                  }}
                >
                  {/* Grid Lines (Blueprint feel) */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

                  {/* Ambient Life & Dust */}
                  <AmbientDust />
                  {[...Array(5)].map((_, i) => (
                    <Bird key={`bird-${i}`} />
                  ))}

                  {/* Decorative Elements for World */}
                  <DecorativePlot x={tutorialSpot.x} y={tutorialSpot.y} />
                  {plots.map(p => (
                    <DecorativePlot key={`decor-${p.id}`} x={p.cx} y={p.cy} />
                  ))}

                  {/* Random Decorative Elements */}
                  {[...Array(25)].map((_, i) => (
                    <div 
                      key={`random-decor-${i}`}
                      className="absolute pointer-events-none"
                      style={{ 
                        left: 100 + (i * 157) % 2800, 
                        top: 100 + (i * 213) % 2800,
                        transform: `scale(${0.6 + Math.random() * 0.4})`
                      }}
                    >
                      <div className="w-6 h-4 bg-emerald-900/10 rounded-full blur-md" />
                      <div className="absolute top-0 left-1 w-1 h-3 bg-emerald-600/20 rounded-full rotate-[-10deg]" />
                    </div>
                  ))}

                  {/* Tutorial Highlight Spot */}
                  {tutorialActive && (tutorialStep === 1 || tutorialStep === 2) && (
                    <motion.div 
                      className="absolute z-10 pointer-events-none"
                      style={{ left: tutorialSpot.x, top: tutorialSpot.y, transform: 'translate(-50%, -50%)' }}
                    >
                      <motion.div 
                        className="w-40 h-40 rounded-full border-4 border-dashed border-yellow-400/50"
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </motion.div>
                  )}

                  {/* Fog of War / Area Limitation */}
                  <div 
                    className="absolute inset-0 z-40 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${charPos.x}px ${charPos.y}px, transparent 0, rgba(0,0,0,0.85) ${unlockedRadius}px)`,
                      transition: 'background 1s ease-in-out'
                    }}
                  />

                  {/* Weather Particle Systems */}
                  {weather === 'rainy' && (
                    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden opacity-40">
                      {[...Array(100)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-[1px] h-16 bg-blue-300"
                          initial={{ y: -200, x: Math.random() * 2000 }}
                          animate={{ y: 2200 }}
                          transition={{ repeat: Infinity, duration: 0.3 + Math.random() * 0.2, ease: 'linear', delay: Math.random() }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {weather === 'polluted' && (
                    <motion.div 
                      className="absolute inset-0 bg-slate-900/60 backdrop-blur-[6px] z-30 pointer-events-none"
                      animate={{ 
                        opacity: [0.4, 0.7, 0.4],
                        x: [-50, 50, -50]
                      }}
                      transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                    />
                  )}

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
                    animate={{ 
                      x: charPos.x, 
                      y: charPos.y,
                      scale: isWalking ? [1, 1.05, 1] : 1,
                    }}
                    style={{ transform: 'translate(-50%, -100%)', zIndex: Math.floor(charPos.y) }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Character Sprite with integrated animations */}
                      <CharacterSprite 
                        isWalking={isWalking} 
                        actionId={actionId} 
                        toolIcon={actionId === 'hole' ? Shovel : actionId === 'plant' ? Trees : undefined}
                        accent="#7d4a27"
                        actionProgress={actionProgress}
                        direction={charDirection}
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
                  <div className="absolute inset-0 z-[60] pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-0 z-[60] pointer-events-none opacity-[0.03] overflow-hidden" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 2px)' }} />
                </motion.div>

                {/* --- 2.1 GUIDED TUTORIAL BANNER --- */}
                <AnimatePresence>
                  {tutorialActive && (
                    <motion.div 
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      className="absolute top-28 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl"
                    >
                      <div className="bg-slate-900/90 backdrop-blur-2xl border-2 border-emerald-500/50 p-5 rounded-[2rem] shadow-2xl flex items-center gap-5">
                        <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-900/40">
                          <Info size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Panduan Pemula</div>
                          <div className="text-sm font-bold text-white leading-relaxed">
                            {tutorialMessages[tutorialStep]}
                          </div>
                        </div>
                        {tutorialStep === 1 && (
                          <motion.div 
                            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            <Move size={20} />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* --- 2.2 MISSION TRACKER --- */}
                {!tutorialActive && (
                  <motion.div 
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute top-28 right-10 z-[100] w-64 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl"
                  >
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-3">Misi Saat Ini</div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[10px] font-black text-white/60 uppercase mb-2">
                          <span>Tanam 3 Pohon Lagi</span>
                          <span>{activeTrees.length - 1}/3</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                            animate={{ width: `${Math.min(100, ((activeTrees.length - 1) / 3) * 100)}%` }} 
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <Droplets size={16} />
                        </div>
                        <div className="text-[9px] font-bold text-white/80 leading-tight">Pastikan semua pohon tetap terhidrasi.</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

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
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Trophy size={16} className="text-emerald-400" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.1em]">
                    Target: Turunkan CO2 ke {currentMission?.targetCO2}%
                  </span>
                </div>
              </div>

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
                      <button 
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-900/20"
                      >
                        Coba Lagi
                      </button>
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
