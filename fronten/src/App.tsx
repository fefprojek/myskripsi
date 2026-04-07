import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import Services from './components/Services';
import News from './components/News';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <Services />
        <News />
      </main>
      <Footer />
    </div>
  );
}

export default App;
