import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className='md:hidden fixed w-full h-[80px] flex justify-between items-center px-4 bg-primary/90 backdrop-blur-sm text-textPrimary z-50'>
        <div>
          <h1 className='text-2xl font-bold text-accent'>Udit Sharma</h1>
        </div>

        {/* Hamburger */}
        <div onClick={handleClick} className='z-10 cursor-pointer'>
          {!isOpen ? <FaHome size={25} /> : <FaEnvelope size={25} />}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-4 bottom-4 h-[calc(100vh-2rem)] bg-card/40 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 ease-in-out z-40 rounded-xl overflow-hidden
        md:left-4 md:w-64 w-64 ${isOpen ? 'left-4' : '-left-64'}`}>
        {/* Logo for desktop */}
        <div className='hidden md:flex h-[80px] items-center px-6 border-b border-white/10'>
          <h1 className='text-2xl font-bold text-accent'>Udit Sharma</h1>
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
                    <FaHome size={20} className='text-accent group-hover:scale-110 transition-transform' />
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
                <FaGithub size={20} className='text-textPrimary group-hover:scale-110 transition-transform' />
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

      {/* Overlay - only on mobile */}
      {isOpen && (
        <div 
          className='md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30'
          onClick={handleClick}
        />
      )}

      {/* Main Content Wrapper */}
      <div className='md:ml-72 transition-all duration-300'>
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Navbar;
