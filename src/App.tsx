import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Expertise from './sections/Expertise';
import Journey from './sections/Journey';
import Work from './sections/Work';
import Stack from './sections/Stack';
import LeadMagnet from './sections/LeadMagnet';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-pixel-bg">
      <Navigation />
      <Hero />
      <Expertise />
      <Journey />
      <Work />
      <Stack />
      <LeadMagnet />
      <Footer />
    </div>
  );
}
