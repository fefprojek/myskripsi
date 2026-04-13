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
          <Route path="/game" element={<TreeGame />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
