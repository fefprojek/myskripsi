import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import Services from './components/Services';
import News from './components/News';
import Footer from './components/Footer';
import FloatingTreeButton from './components/FloatingTreeButton';
import TreeGame from './components/TreeGame';
import { AnimatePresence } from 'framer-motion';

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

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
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
