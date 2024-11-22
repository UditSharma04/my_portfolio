import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';

interface Bubble {
  id: number;
  x: number;
  y: number;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [time, setTime] = useState(new Date());
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Hide glow effect after 3 seconds
    const glowTimer = setTimeout(() => {
      setShowGlow(false);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(glowTimer);
    };
  }, []);

  const createBubble = () => {
    const newBubble = {
      id: Date.now(),
      x: Math.random() * 40 - 20,
      y: Math.random() * -50 - 20,
    };
    setBubbles(prev => [...prev, newBubble]);
    
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, 2000);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div onClick={handleClick} className='fixed right-4 top-6 md:hidden z-50 cursor-pointer bg-card/40 backdrop-blur-sm p-3 rounded-full border border-white/10'>
        {!isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      {/* Sidebar */}
      <div className={`fixed top-4 bottom-4 h-[calc(100vh-2rem)] bg-card/40 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 ease-in-out z-40 rounded-xl overflow-hidden
        md:left-4 md:w-64 w-64 ${isOpen ? 'left-4' : '-left-64'}`}>
        {/* Interactive Button and DateTime Display */}
        <div className='hidden md:flex h-[80px] items-center justify-between px-6 border-b border-white/10'>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                createBubble();
                setShowGlow(false);
              }}
              className="relative bg-accent/10 hover:bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center group transition-all duration-300"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-accent group-hover:scale-110 transition-transform"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
              </svg>
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: showGlow ? [0.4, 0.8, 0.4] : 0,
                  scale: showGlow ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-accent blur-md -z-10"
              />
            </motion.button>

            {/* Animated Bubbles */}
            <AnimatePresence>
              {bubbles.map(bubble => (
                <motion.div
                  key={bubble.id}
                  initial={{ 
                    scale: 0,
                    x: 20,
                    y: 20,
                    opacity: 0.8 
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1.5],
                    x: bubble.x,
                    y: bubble.y,
                    opacity: 0 
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 2,
                    ease: "easeOut"
                  }}
                  className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-accent"
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Animated DateTime Display */}
          <motion.div 
            className="flex flex-col items-end"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden"
            >
              <motion.div
                animate={{
                  y: isHovered ? -20 : 0,
                  opacity: isHovered ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
                className="text-sm text-textSecondary"
              >
                {formatDate(time)}
              </motion.div>
              <motion.div
                animate={{
                  y: isHovered ? 0 : 20,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="text-sm text-accent absolute top-0 left-0"
              >
                {formatTime(time)}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                color: isHovered ? "#60A5FA" : "#94A3B8"
              }}
              transition={{ 
                duration: 0.3,
                scale: { type: "spring", stiffness: 300 }
              }}
              className="text-xl font-mono tracking-wider"
            >
              {!isHovered ? formatTime(time) : formatDate(time)}
            </motion.div>
          </motion.div>
        </div>

        {/* Scrollable content container */}
        <div className='h-[calc(100%-80px)] overflow-y-auto'>
          <div className='px-4 py-6'>
            {/* Navigation Links */}
            <nav>
              <ul className='space-y-2'>
                <li>
                  <Link 
                    to='home' 
                    smooth={true} 
                    duration={500} 
                    onClick={handleClick}
                    className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group cursor-pointer'
                    activeClass='bg-white/10 text-accent'
                    spy={true}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-accent group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className='group-hover:text-accent transition-colors'>Home</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to='about' 
                    smooth={true} 
                    duration={500} 
                    onClick={handleClick}
                    className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group cursor-pointer'
                    activeClass='bg-white/10 text-accent'
                    spy={true}
                  >
                    <FaUser size={20} className='text-accent group-hover:scale-110 transition-transform' />
                    <span className='group-hover:text-accent transition-colors'>About</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to='skills' 
                    smooth={true} 
                    duration={500} 
                    onClick={handleClick}
                    className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group cursor-pointer'
                    activeClass='bg-white/10 text-accent'
                    spy={true}
                  >
                    <FaCode size={20} className='text-accent group-hover:scale-110 transition-transform' />
                    <span className='group-hover:text-accent transition-colors'>Skills</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to='projects' 
                    smooth={true} 
                    duration={500} 
                    onClick={handleClick}
                    className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group cursor-pointer'
                    activeClass='bg-white/10 text-accent'
                    spy={true}
                  >
                    <FaProjectDiagram size={20} className='text-accent group-hover:scale-110 transition-transform' />
                    <span className='group-hover:text-accent transition-colors'>Projects</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to='contact' 
                    smooth={true} 
                    duration={500} 
                    onClick={handleClick}
                    className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group cursor-pointer'
                    activeClass='bg-white/10 text-accent'
                    spy={true}
                  >
                    <FaEnvelope size={20} className='text-accent group-hover:scale-110 transition-transform' />
                    <span className='group-hover:text-accent transition-colors'>Contact</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Divider */}
            <div className='my-6 border-t border-white/10'></div>

            {/* Social Links */}
            <div className='space-y-2'>
              <a 
                href='https://www.linkedin.com/in/udit-sharma-8080/' 
                target='_blank' 
                rel='noreferrer'
                className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group'
              >
                <FaLinkedin size={20} className='text-[#0A66C2] group-hover:scale-110 transition-transform' />
                <span className='group-hover:text-accent transition-colors'>LinkedIn</span>
              </a>
              <a 
                href='https://github.com/UditSharma04' 
                target='_blank' 
                rel='noreferrer'
                className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group'
              >
                <FaGithub size={20} className='text-[#171515] group-hover:scale-110 transition-transform' />
                <span className='group-hover:text-accent transition-colors'>GitHub</span>
              </a>
              <a 
                href='mailto:uditsharma.work@gmail.com'
                className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group'
              >
                <HiOutlineMail size={20} className='text-[#EA4335] group-hover:scale-110 transition-transform' />
                <span className='group-hover:text-accent transition-colors'>Email</span>
              </a>
              <a 
                href='/resume.pdf' 
                target='_blank' 
                rel='noreferrer'
                className='flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-all group'
              >
                <BsFillPersonLinesFill size={20} className='text-accent group-hover:scale-110 transition-transform' />
                <span className='group-hover:text-accent transition-colors'>Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className='md:ml-72 transition-all duration-300'>
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Navbar;
