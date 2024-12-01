import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork';
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram, FaTimes, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const roles = [
  { text: "Full Stack Developer", color: "text-accent" },
  { text: "UI/UX Designer", color: "text-purple-500" },
  { text: "Problem Solver", color: "text-blue-500" }
];

const TypewriterText = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex].text;
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      } else if (!isDeleting && currentIndex === currentRole.length) {
        setIsTypingComplete(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsTypingComplete(false);
        }, 1500);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText(currentRole.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, roleIndex]);

  return (
    <motion.div
      key={roleIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={roles[roleIndex].color}
    >
      <span className="font-medium">
        {displayText}
      </span>
      <span className={`${isTypingComplete ? 'opacity-0' : 'opacity-100'} animate-pulse ml-1`}>|</span>
    </motion.div>
  );
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-6 rounded-xl shadow-xl z-50 w-[90%] max-w-md border border-accent/20"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-textSecondary hover:text-accent transition-colors"
          >
            <FaTimes />
          </button>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-textPrimary mb-4">Job Preferences</h2>
            
            {/* Location */}
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-accent mt-1" />
              <div>
                <h3 className="font-medium text-textPrimary">Preferred Locations</h3>
                <p className="text-textSecondary">Bangalore, Chennai</p>
              </div>
            </div>

            {/* Job Type */}
            <div className="flex items-start gap-3">
              <FaBriefcase className="text-accent mt-1" />
              <div>
                <h3 className="font-medium text-textPrimary">Job Type</h3>
                <p className="text-textSecondary">Internships</p>
              </div>
            </div>

            {/* Additional Info */}
            <p className="text-sm text-textSecondary/80 mt-4 pt-4 border-t border-textSecondary/20">
              Open to both on-site and hybrid work arrangements. 
              Particularly interested in full-stack development and UI/UX design roles.
            </p>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-4 rounded-lg border border-textSecondary/20 hover:border-accent transition-colors duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <Icon className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors duration-300" />
    <span className="sr-only">{label}</span>
    <motion.span
      className="absolute inset-0 border border-accent rounded-lg opacity-0 group-hover:opacity-100"
      initial={false}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
);

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks = [
    { href: "https://github.com/UditSharma04", icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/hellouditt/", icon: FaLinkedinIn, label: "LinkedIn" },
    { href: "https://x.com/hellouditt", icon: FaTwitter, label: "Twitter" },
    { href: "https://www.instagram.com/confused.udit/", icon: FaInstagram, label: "Instagram" }
  ];

  return (
    <div id="home" className='w-full h-screen bg-primary relative overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-5" />
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-40 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 left-20 w-72 h-72 bg-accent-light/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-accent-dark/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Particle Network Background */}
      <ParticleNetwork />

      <div className='relative max-w-[1000px] mx-auto px-4 sm:px-8 flex flex-col justify-center h-full pt-4 sm:pt-16'>
        <div className="flex flex-col gap-2 sm:gap-8">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <motion.div 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="text-accent text-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Welcome to my portfolio
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-textPrimary via-accent to-accent-light bg-clip-text text-transparent">
                  Hi, I'm Udit Sharma
                </span>
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Role */}
          <motion.div 
            className="text-xl md:text-2xl text-textSecondary flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              I am a
            </motion.span>
            <TypewriterText />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-base text-textSecondary/80 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Passionate about creating beautiful, functional, and user-friendly applications. 
            I specialize in full-stack development with a focus on modern web technologies.
            Always eager to learn and take on new challenges.
          </motion.p>

          {/* Social Links */}
          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => (
              <SocialLink 
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-textSecondary text-sm">Scroll to explore</span>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-8 rounded-full bg-gradient-to-b from-accent to-transparent"
            />
          </div>
        </motion.div>
      </div>

      {/* Job Preferences Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;
