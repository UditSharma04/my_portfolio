import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaLightbulb, FaPalette } from 'react-icons/fa';

const About = () => {
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
      id='about' 
      className='w-full bg-primary text-gray-300 py-4 sm:py-24'
    >
      <div className='relative max-w-[1000px] mx-auto px-8'>
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-20% 0px" }}
          className="text-center mb-8 sm:mb-20"
        >
          <h2 className='text-4xl font-bold inline-block border-b-4 border-accent text-textPrimary mb-6'>
            About Me
          </h2>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            A passionate developer focused on creating impactful solutions through code
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: Math.min(index * 0.05, 0.2),
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-20% 0px" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`
                p-6 rounded-xl border border-white/10
                bg-gradient-to-br ${card.color}
                backdrop-blur-sm
                transition-all duration-300
                hover:shadow-lg hover:shadow-accent/5
              `}
            >
              <div className="flex items-start gap-4">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
