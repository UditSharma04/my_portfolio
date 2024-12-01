import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const ScrollIndicator = () => (
  <motion.div
    className="fixed bottom-8 right-8 text-accent cursor-pointer"
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.5, 1, 0.5],
      y: [0, 10, 0]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    onClick={() => window.scrollTo({ 
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })}
  >
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-medium">Scroll to end</span>
      <FaChevronDown className="text-2xl" />
    </div>
  </motion.div>
);

const Footer = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const texts = [
    { 
      prefix: "Made with love by ",
      name: "Udit Sharma",
      lang: "en",
      color: "#7477FF" // accent blue
    },
    { 
      prefix: "प्यार से बनाया गया ",
      name: "Udit Sharma",
      suffix: " द्वारा",
      lang: "hi",
      color: "#FF6B6B" // coral red
    },
    { 
      prefix: "Créé avec amour par ",
      name: "Udit Sharma",
      lang: "fr",
      color: "#4ECB71" // green
    },
    { 
      prefix: "愛を込めて ",
      name: "Udit Sharma",
      suffix: " によって作られた",
      lang: "jp",
      color: "#FFB100" // gold
    },
    { 
      prefix: "Hecho con amor por ",
      name: "Udit Sharma",
      lang: "es",
      color: "#FF61D8" // pink
    },
    { 
      prefix: "Fatto con amore da ",
      name: "Udit Sharma",
      lang: "it",
      color: "#00BCD4" // cyan
    },
    { 
      prefix: "Mit Liebe gemacht von ",
      name: "Udit Sharma",
      lang: "de",
      color: "#9C27B0" // purple
    },
    { 
      prefix: "사랑으로 만든 ",
      name: "Udit Sharma",
      lang: "ko",
      color: "#FF5722" // deep orange
    }
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentText = texts[textIndex].prefix + texts[textIndex].name + (texts[textIndex].suffix || '');
    const typingSpeed = isDeleting ? 20 : 50;

    if (!isDeleting && text !== currentText) {
      timeout = setTimeout(() => {
        setText(currentText.slice(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text !== '') {
      timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, typingSpeed);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, textIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;
      const threshold = totalHeight - 500; // Show indicator when 500px from bottom

      setShowScrollIndicator(currentScroll < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderColoredText = () => {
    const currentText = texts[textIndex];
    const fullText = text;
    const nameIndex = fullText.indexOf(currentText.name);

    if (nameIndex === -1) {
      return <span className="text-white">{fullText}</span>;
    }

    return (
      <>
        <span className="text-white">{fullText.slice(0, nameIndex)}</span>
        <span style={{ color: currentText.color }}>{fullText.slice(nameIndex, nameIndex + currentText.name.length)}</span>
        <span className="text-white">{fullText.slice(nameIndex + currentText.name.length)}</span>
      </>
    );
  };

  return (
    <>
      {showScrollIndicator && <ScrollIndicator />}
      <motion.footer 
        className="py-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 text-sm"
        >
          <div className="min-w-[300px] text-center font-medium flex items-center justify-center gap-2">
            <span className="opacity-70">{texts[textIndex].lang}: </span>
            <span className="relative">
              {renderColoredText()}
              <span className="inline-block w-[2px] h-4 bg-accent ml-1 animate-pulse"></span>
            </span>
          </div>
        </motion.div>
      </motion.footer>
    </>
  );
};

export default Footer; 