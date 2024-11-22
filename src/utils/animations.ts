import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const fadeIn: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover: Variants = {
  initial: {},
  whileHover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400
    }
  }
};

export const slideInFromLeft: Variants = {
  initial: { 
    x: -100, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export const slideInFromRight: Variants = {
  initial: { 
    x: 100, 
    opacity: 0 
  },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export const floatingAnimation: Variants = {
  initial: { 
    y: 0 
  },
  animate: { 
    y: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};
