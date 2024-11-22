import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaPython, FaDocker, FaAws,
  FaGithub, FaLinux
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiTailwindcss, SiMongodb,
  SiPostgresql, SiRedis, SiKubernetes, SiTensorflow,
  SiPytorch, SiScikitlearn, SiNextdotjs, SiVite,
  SiVisualstudiocode, SiPostman, SiFigma
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: JSX.Element;
}

const skillCategories = {
  frontend: [
    { name: 'React', icon: <FaReact /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'TailwindCSS', icon: <SiTailwindcss /> },
  ],
  frontendTools: [
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Vite', icon: <SiVite /> },
    { name: 'VS Code', icon: <SiVisualstudiocode /> },
    { name: 'Figma', icon: <SiFigma /> },
  ],
  backend: [
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'Linux', icon: <FaLinux /> },
  ],
  databases: [
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'Redis', icon: <SiRedis /> },
  ],
  devops: [
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Kubernetes', icon: <SiKubernetes /> },
    { name: 'GitHub', icon: <FaGithub /> },
    { name: 'Postman', icon: <SiPostman /> },
  ],
  aiml: [
    { name: 'TensorFlow', icon: <SiTensorflow /> },
    { name: 'PyTorch', icon: <SiPytorch /> },
    { name: 'Scikit-learn', icon: <SiScikitlearn /> },
  ],
};

const Skills = () => {
  return (
    <div id='skills' className='w-full min-h-screen bg-background py-24'>
      <div className='max-w-[1400px] mx-auto px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className='text-4xl font-bold inline border-b-4 border-accent text-textPrimary'>
            Skills
          </h2>
          <p className='text-textSecondary py-6'>
            Technologies I've worked with
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-textPrimary capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2 hover:border-accent/50 transition-colors"
                  >
                    <div className="text-3xl text-accent">
                      {skill.icon}
                    </div>
                    <span className="text-sm text-textSecondary text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
