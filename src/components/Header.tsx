import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { BsGithub, BsLinkedin, BsEnvelope } from 'react-icons/bs';
import { IoLocationOutline, IoBriefcaseOutline, IoClose } from 'react-icons/io5';
import profilePic from '../assets/mai.jpg';
import SocialLinks from './SocialLinks';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start(isScrolled ? 'scrolled' : 'initial');
  }, [isScrolled, controls]);

  const socialLinksVariants = {
    initial: { 
      opacity: 0,
      x: 20
    },
    scrolled: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:block fixed top-4 right-4 md:left-[19.5rem] left-4 z-40"
    >
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-light/20 blur-xl opacity-50" />
        
        {/* Main Header */}
        <motion.div 
          className="relative bg-gradient-to-r from-card/80 to-card-light/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass overflow-hidden"
        >
          <div className="flex items-center justify-between px-8 py-4">
            {/* Profile Section */}
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setIsImageModalOpen(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-20 h-20 rounded-full border-2 border-accent/50 group-hover:border-accent overflow-hidden transition-colors duration-300">
                  <img 
                    src={profilePic}
                    alt="Udit Sharma" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </motion.div>
              
              {/* Name and Title */}
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-textPrimary to-accent hover:to-accent-light transition-colors duration-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Udit Sharma
                </motion.h2>
                <motion.p 
                  className="text-base text-textSecondary mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Full Stack Developer
                </motion.p>
              </div>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-6">
              {/* Status Badge */}
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-accent/10 to-accent-light/10 px-6 py-3 rounded-full border border-accent/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-textSecondary hover:text-accent transition-colors duration-300">
                  Available for Opportunities
                </span>
              </motion.button>

              {/* Social Links - Only visible when scrolled */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
                    variants={socialLinksVariants}
                    initial="initial"
                    animate="scrolled"
                    exit="initial"
                    className="flex items-center gap-4"
                  >
                    <motion.a
                      href="https://github.com/UditSharma04"
                      target="_blank"
                      rel="noreferrer"
                      className="text-textSecondary hover:text-accent transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BsGithub className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/hellouditt/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-textSecondary hover:text-accent transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BsLinkedin className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="mailto:work.udit04@gmail.com"
                      className="text-textSecondary hover:text-accent transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BsEnvelope className="text-xl" />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Job Preferences Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-accent/20 rounded-lg p-6 max-w-md w-full shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-accent">Job Preferences</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-textSecondary hover:text-accent"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <IoLocationOutline size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-textPrimary">Preferred Locations</h4>
                    <p className="text-textSecondary">Bangalore, Chennai</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IoBriefcaseOutline size={24} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-medium text-textPrimary">Job Type</h4>
                    <p className="text-textSecondary">Internships</p>
                  </div>
                </div>
              </div> 
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative w-[80vw] max-w-[600px] aspect-square rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={profilePic}
                alt="Udit Sharma"
                layoutId="profile-image"
                className="w-full h-full object-cover"
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full p-2 transition-colors"
                onClick={() => setIsImageModalOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
