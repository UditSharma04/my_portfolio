import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaDownload } from 'react-icons/fa';
import profilePic from '../assets/mai.jpg';

const MobileHeader = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch('/resume.pdf');
      if (!response.ok) throw new Error('Failed to download resume');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Udit_Sharma_Resume.pdf';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="absolute top-4 left-4 flex items-center gap-3 md:hidden z-50">
      {/* Profile Picture */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full border-2 border-accent overflow-hidden cursor-pointer"
        onClick={() => setIsImageModalOpen(true)}
      >
        <img
          src={profilePic}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Resume Download Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleDownloadResume}
        disabled={isDownloading}
        className={`flex items-center gap-2 px-3 py-2 bg-accent/20 rounded-full text-accent text-sm font-medium ${
          isDownloading ? 'opacity-50' : ''
        }`}
      >
        {isDownloading ? (
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaDownload className="text-base" />
        )}
        <span>{isDownloading ? 'Downloading...' : 'Resume'}</span>
      </motion.button>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-sm w-full bg-card rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={profilePic}
                alt="Profile"
                className="w-full aspect-square object-cover"
              />
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
              >
                <IoClose size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeader; 