import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo?: string;
  category: string[];
}

const projects: Project[] = [
  {
    title: "Cascade",
    description: "A powerful AI-powered code editor that helps developers write better code faster. Features include code completion, refactoring suggestions, and error detection.",
    image: "/cascade.jpg",
    tech: ["React", "TypeScript", "Python", "FastAPI", "OpenAI"],
    github: "https://github.com/UditSharma04/cascade",
    demo: "https://cascade-demo.com",
    category: ["all", "web", "ml"]
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and TypeScript, featuring smooth animations and a responsive design.",
    image: "/portfolio.jpg",
    tech: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/UditSharma04/portfolio",
    demo: "https://portfolio-demo.com",
    category: ["all", "web"]
  },
  {
    title: "ML Algorithms Implementation",
    description: "Implementation of various machine learning algorithms from scratch in Python, including neural networks, decision trees, and clustering algorithms.",
    image: "/ml-algo.jpg",
    tech: ["Python", "NumPy", "Pandas", "Scikit-learn"],
    github: "https://github.com/UditSharma04/ML-Algorithms",
    category: ["all", "ml", "python"]
  },
  {
    title: "Chat Application",
    description: "Real-time chat application with features like group chats, file sharing, and end-to-end encryption.",
    image: "/chat-app.jpg",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/UditSharma04/chat-app",
    demo: "https://chat-app-demo.com",
    category: ["all", "web", "app"]
  },
  {
    title: "Task Management API",
    description: "RESTful API for task management with authentication, task CRUD operations, and task scheduling.",
    image: "/task-api.jpg",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/UditSharma04/task-api",
    category: ["all", "python", "web"]
  },
  {
    title: "Weather App",
    description: "Mobile weather application that provides real-time weather information and forecasts.",
    image: "/weather-app.jpg",
    tech: ["React Native", "Node.js", "Weather API"],
    github: "https://github.com/UditSharma04/weather-app",
    demo: "https://weather-app-demo.com",
    category: ["all", "app"]
  }
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "app", name: "App Development" },
  { id: "ml", name: "Machine Learning" },
  { id: "python", name: "Python" }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter(project => 
    project.category.includes(activeCategory)
  );

  return (
    <div id='projects' className='w-full min-h-screen bg-background py-24'>
      <div className='max-w-[1400px] mx-auto px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className='text-4xl font-bold inline border-b-4 border-accent text-textPrimary'>
            Projects
          </h2>
          <p className='text-textSecondary py-6'>
            Check out some of my recent work
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent text-white'
                  : 'bg-card/30 text-textSecondary hover:bg-card/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
                    >
                      <FaGithub size={20} className="text-white" />
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
                      >
                        <FaExternalLinkAlt size={16} className="text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-textPrimary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-textSecondary text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                        className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
