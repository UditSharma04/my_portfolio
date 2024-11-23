import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { FaGraduationCap, FaCode, FaLightbulb, FaPalette } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation with letter splitting
    if (titleRef.current) {
      const text = titleRef.current.innerText;
      titleRef.current.innerHTML = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        titleRef.current?.appendChild(span);
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
      }
    });

    // Animate title letters
    tl.from(titleRef.current?.children || [], {
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.05,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Animate intro text with typing effect
    tl.to(introRef.current, {
      duration: 2,
      text: {
        value: "A passionate developer focused on creating impactful solutions through code",
        delimiter: ""
      },
      ease: "none"
    }, "-=0.5");

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Framer Motion variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -30
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200
      }
    }
  };

  const cards = [
    {
      icon: <FaGraduationCap className="text-4xl" />,
      title: "VIT Chennai Student",
      description: "B.Tech in Computer Science (2022-2026) with a strong academic record and passion for technology.",
      color: "from-[#646cff]/20 to-[#646cff]/5"
    },
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: "Problem Solver",
      description: "Skilled in Data Structures, Algorithms, and creating efficient solutions for complex challenges.",
      color: "from-yellow-500/20 to-yellow-500/5"
    },
    {
      icon: <FaCode className="text-4xl" />,
      title: "Full Stack Developer",
      description: "Experienced in MERN Stack, Cloud Services (AWS, GCP), and modern web technologies.",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: <FaPalette className="text-4xl" />,
      title: "Creative Developer",
      description: "Passionate about creating intuitive user interfaces and seamless user experiences.",
      color: "from-purple-500/20 to-purple-500/5"
    }
  ];

  return (
    <div 
      ref={containerRef}
      id='about' 
      className='w-full min-h-screen bg-primary text-gray-300 relative overflow-hidden py-24'
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '20%', right: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', left: '20%' }}
        />
      </div>

      <div className='relative max-w-[1000px] mx-auto px-8'>
        {/* Title Section */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className='text-4xl font-bold inline-block border-b-4 border-accent text-textPrimary mb-6'
          >
            About Me
          </h2>
          <p 
            ref={introRef}
            className="text-lg text-textSecondary max-w-2xl mx-auto opacity-0"
          ></p>
        </div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-lg text-textSecondary leading-relaxed">
            I'm a Computer Science student at VIT Chennai with a passion for full-stack development 
            and problem-solving. My journey in tech has equipped me with a strong foundation in 
            various programming languages and modern development tools. I enjoy creating efficient, 
            scalable solutions and learning new technologies.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
              className={`
                p-6 rounded-xl border border-white/10
                bg-gradient-to-br ${card.color}
                backdrop-blur-sm
                transform perspective-1000
                transition-shadow duration-300
                hover:shadow-lg hover:shadow-accent/5
              `}
            >
              <motion.div 
                className="flex items-start gap-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="p-3 bg-white/5 rounded-lg text-accent">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-textPrimary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-textSecondary">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
