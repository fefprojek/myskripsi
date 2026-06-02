import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import Services from './components/Services';
import News from './components/News';
import Footer from './components/Footer';
import FloatingTreeButton from './components/FloatingTreeButton';
import TreeGame from './components/TreeGame';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Leaf, Sparkles } from 'lucide-react';
import heroImg from './assets/hero.png';

class RouteErrorBoundary extends React.Component<
  { title: string; children: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl p-6">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500">
            Terjadi Error
          </div>
          <div className="mt-1 text-xl font-black text-slate-900">
            {this.props.title}
          </div>
          <div className="mt-3 rounded-2xl bg-slate-950 text-slate-100 p-4 overflow-auto text-xs">
            <div className="font-black">{this.state.error.name}</div>
            <div className="mt-1 opacity-90">{this.state.error.message}</div>
            {this.state.error.stack && (
              <pre className="mt-3 whitespace-pre-wrap opacity-70">{this.state.error.stack}</pre>
            )}
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => this.setState({ error: null })}
              className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-900 text-[11px] font-black uppercase shadow-sm active:scale-95 transition-transform"
            >
              Coba Lagi
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-2xl bg-primary text-white text-[11px] font-black uppercase shadow-lg active:scale-95 transition-transform"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const CinematicLoadingOverlay = ({
  title,
  subtitle,
  accent,
  tip,
  durationMs,
  allowSkip,
  onSkip,
}: {
  title: string;
  subtitle: string;
  accent: 'eco' | 'warn' | 'danger';
  tip?: string;
  durationMs: number;
  allowSkip?: boolean;
  onSkip?: () => void;
}) => {
  const accentRgb =
    accent === 'eco' ? '16,185,129' : accent === 'warn' ? '245,158,11' : '239,68,68';

  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => {
      const r = (n: number) => {
        const v = Math.sin((i + 1) * 971.113 + n * 127.7) * 10000;
        return v - Math.floor(v);
      };
      const left = r(1) * 100;
      const top = r(2) * 100;
      const size = 5 + r(3) * 14;
      const duration = 2.2 + r(4) * 2.2;
      const delay = r(5) * 1.6;
      const opacity = 0.12 + r(6) * 0.22;
      return { left, top, size, duration, delay, opacity };
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background:
          'radial-gradient(circle at 50% 40%, rgba(2,6,23,0.20) 0 520px, rgba(2,6,23,0.86) 980px), rgba(2,6,23,0.75)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.24]"
          style={{
            backgroundImage: `radial-gradient(circle at 16% 12%, rgba(${accentRgb},0.34) 0 260px, transparent 520px), radial-gradient(circle at 84% 18%, rgba(56,189,248,0.16) 0 300px, transparent 620px), radial-gradient(circle at 70% 86%, rgba(245,158,11,0.14) 0 320px, transparent 700px)`,
            animation: 'game-fog-drift 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -inset-10 opacity-[0.12]"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            filter: 'blur(18px) saturate(1.15) contrast(1.08)',
            transform: 'scale(1.08)',
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-[0.18]"
          animate={{ backgroundPosition: ['0% 0%', '0% 120%'] }}
          transition={{ repeat: Infinity, duration: 0.55, ease: 'linear' }}
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, rgba(255,255,255,0.0) 0 12px, rgba(255,255,255,0.07) 12px 13px, rgba(255,255,255,0.0) 13px 26px)',
            mixBlendMode: 'overlay',
          }}
        />
        {particles.map((p, idx) => (
          <motion.div
            key={`p-${idx}`}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(${accentRgb},${p.opacity}) 0 45%, rgba(255,255,255,0.04) 70%, rgba(255,255,255,0) 100%)`,
              filter: 'blur(0.2px)',
            }}
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: [0, 1, 0], y: [8, -16, -34], scale: [0.92, 1.05, 0.98] }}
            transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 14, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -10, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="w-full max-w-[640px] rounded-[2.6rem] border border-white/10 overflow-hidden shadow-[0_70px_200px_rgba(0,0,0,0.70)] bg-slate-950/55"
      >
        <div
          className="relative p-7 sm:p-9"
          style={{
            backgroundImage: [
              `radial-gradient(circle at 18% 18%, rgba(${accentRgb},0.22) 0 220px, transparent 640px)`,
              'radial-gradient(circle at 78% 26%, rgba(56,189,248,0.18) 0 220px, transparent 640px)',
              'linear-gradient(180deg, rgba(2,6,23,0.30) 0%, rgba(2,6,23,0.78) 100%)',
            ].join(','),
          }}
        >
          <div className="flex items-start gap-4">
            <div className="relative">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10"
                animate={{ y: [0, -4, 0], rotate: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                style={{
                  background: `radial-gradient(circle at 30% 20%, rgba(${accentRgb},0.22) 0 28px, rgba(255,255,255,0.02) 62px)`,
                  boxShadow: `0 0 0 1px rgba(${accentRgb},0.12), 0 22px 60px rgba(0,0,0,0.45)`,
                }}
              >
                <Leaf className="text-emerald-200" />
              </motion.div>
              <motion.div
                className="absolute -inset-4 rounded-[1.85rem] pointer-events-none"
                animate={{ opacity: [0.10, 0.28, 0.10], scale: [0.98, 1.08, 0.98] }}
                transition={{ repeat: Infinity, duration: 1.65, ease: 'easeInOut' }}
                style={{ background: `radial-gradient(circle, rgba(${accentRgb},0.26) 0 28px, rgba(${accentRgb},0.0) 86px)` }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black uppercase tracking-[0.26em] text-white/50">Loading</div>
              <div className="text-white font-black tracking-tight text-2xl">{title}</div>
              <div className="text-white/75 font-bold text-sm mt-1 leading-snug">{subtitle}</div>
              {tip && (
                <div className="mt-4">
                  <div className="text-[11px] font-black text-white/50 uppercase tracking-[0.22em]">Tip</div>
                  <div className="text-white/80 text-sm font-bold">{tip}</div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-7">
            <div className="h-3 rounded-full bg-black/35 border border-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: Math.max(0.35, durationMs / 1000), ease: 'easeInOut' }}
                style={{
                  background: `linear-gradient(90deg, rgba(${accentRgb},0.95) 0%, rgba(56,189,248,0.78) 55%, rgba(255,255,255,0.32) 100%)`,
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

          {allowSkip && onSkip && (
            <div className="mt-6 flex items-center justify-end">
              <button
                type="button"
                onClick={onSkip}
                className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
              >
                Lewati
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const location = useLocation();
  const [bootLoading, setBootLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState<{
    id: number;
    title: string;
    subtitle: string;
    accent: 'eco' | 'warn' | 'danger';
    tip?: string;
    durationMs: number;
    allowSkip?: boolean;
  } | null>(null);
  const pageTimerRef = useRef<number | null>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const startAt = Date.now();
    const minMs = 950;

    const preloadHero = new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = heroImg;
    });

    const waitMin = new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), minMs);
    });

    Promise.all([preloadHero, waitMin]).then(() => {
      if (cancelled) return;
      const extra = Math.max(0, 120 - (Date.now() - startAt - minMs));
      window.setTimeout(() => {
        if (cancelled) return;
        setBootLoading(false);
      }, extra);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (pageTimerRef.current) window.clearTimeout(pageTimerRef.current);

    const next =
      location.pathname === '/game'
        ? {
            id: Date.now(),
            title: 'Memasuki Dunia Restorasi',
            subtitle: 'Menyiapkan kontrol, HUD, dan lingkungan gameplay…',
            accent: 'eco' as const,
            tip: 'WASD/Arrow untuk bergerak, E untuk aksi. ESC untuk Pause.',
            durationMs: 900,
            allowSkip: true,
          }
        : {
            id: Date.now(),
            title: 'Memuat Halaman',
            subtitle: 'Menata konten dan animasi…',
            accent: 'eco' as const,
            durationMs: 520,
          };

    setPageLoading(next);
    pageTimerRef.current = window.setTimeout(() => {
      setPageLoading(null);
      pageTimerRef.current = null;
    }, Math.max(320, next.durationMs));
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (pageTimerRef.current) window.clearTimeout(pageTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {bootLoading && (
          <CinematicLoadingOverlay
            key="boot-loading"
            title="Mempersiapkan Simulasi"
            subtitle="Muat aset, UI, dan sistem lingkungan…"
            accent="eco"
            tip="Klik tombol Tanam Pohon untuk mulai petualangan restorasi."
            durationMs={1100}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!bootLoading && pageLoading && (
          <CinematicLoadingOverlay
            key={`page-loading-${pageLoading.id}`}
            title={pageLoading.title}
            subtitle={pageLoading.subtitle}
            accent={pageLoading.accent}
            tip={pageLoading.tip}
            durationMs={pageLoading.durationMs}
            allowSkip={pageLoading.allowSkip}
            onSkip={() => setPageLoading(null)}
          />
        )}
      </AnimatePresence>
      {/* Hanya tampilkan Navbar jika bukan di halaman Game */}
      {location.pathname !== '/game' && <Navbar />}
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <main>
              <Hero />
              <Statistics />
              <Services />
              <News />
              <Footer />
              <FloatingTreeButton />
            </main>
          } />
          <Route
            path="/game"
            element={
              <RouteErrorBoundary title="Halaman Game">
                <TreeGame />
              </RouteErrorBoundary>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
