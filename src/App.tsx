import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className='bg-primary min-h-screen'>
      <Navbar />
      <Header />
      <div className='md:ml-72 pt-16 sm:pt-24 px-4 sm:px-6 space-y-12 sm:space-y-24'> {/* Adjusted spacing for mobile */}
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
