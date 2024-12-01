import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import SEOHead from './components/SEOHead';
import Footer from './components/Footer';
import MobileHeader from './components/MobileHeader';

// Lazy load components that are not immediately needed
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
  </div>
);

function App() {
  return (
    <div className='bg-primary min-h-screen'>
      <SEOHead />
      <Navbar />
      <Header />
      <MobileHeader />
      <div className='md:ml-72 pt-4 sm:pt-12 px-4 sm:px-6 space-y-[5px] sm:space-y-16'>
        <Home />
        <Suspense fallback={<LoadingSpinner />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
