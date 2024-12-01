import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/hellouditt/',
    color: 'hover:text-[#0A66C2]'
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/UditSharma04',
    color: 'hover:text-[#333]'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    href: 'https://x.com/hellouditt',
    color: 'hover:text-[#1DA1F2]'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/confused.udit/',
    color: 'hover:text-[#E4405F]'
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    href: 'mailto:uditsharmaswm2004@gmail.com',
    color: 'hover:text-[#EA4335]'
  }
];

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
  vertical?: boolean;
  animate?: boolean;
}

// Add hover effect variants
const hoverVariants = {
  hover: {
    scale: 1.1,
    transition: { type: "spring", stiffness: 400 }
  },
  tap: {
    scale: 0.95
  }
};

// Add stagger animation for links
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

class SocialLinksErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-textSecondary">Failed to load social links</div>;
    }
    return this.props.children;
  }
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  iconSize = 20,
  showLabels = false,
  vertical = false,
  animate = true
}) => {
  return (
    <SocialLinksErrorBoundary>
      <motion.div 
        className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-4 ${className}`}
        variants={animate ? containerVariants : undefined}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-textSecondary transition-colors ${link.color}`}
            variants={hoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <link.icon size={iconSize} />
            {showLabels && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {link.name}
              </motion.span>
            )}
          </motion.a>
        ))}
      </motion.div>
    </SocialLinksErrorBoundary>
  );
};

export default SocialLinks;
