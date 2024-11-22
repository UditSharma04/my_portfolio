import React from 'react';
import { motion } from 'framer-motion';
import { BsGithub, BsLinkedin, BsEnvelope } from 'react-icons/bs';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: BsGithub,
    url: 'https://github.com/UditSharma04',
  },
  {
    name: 'LinkedIn',
    icon: BsLinkedin,
    url: 'https://www.linkedin.com/in/udit-sharma-8080/',
  },
  {
    name: 'Email',
    icon: BsEnvelope,
    url: 'mailto:uditsharma.work@gmail.com',
  },
];

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  className = '', 
  iconSize = 20,
  showLabels = false 
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-textSecondary hover:text-accent transition-colors"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <link.icon size={iconSize} />
          {showLabels && <span>{link.name}</span>}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
