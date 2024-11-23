import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { 
  SiReact, SiTypescript, SiPython, 
  SiJavascript, SiNodedotjs, SiMongodb,
  SiTailwindcss, SiNextdotjs, SiFastapi,
  SiDocker, SiKubernetes, SiTensorflow,
  SiHtml5, SiCss3, SiPhp, SiMysql,
  SiGit, SiGithub, SiVisualstudiocode,
  SiPostgresql, SiRedis, SiFirebase,
  SiCplusplus, SiAmazonwebservices, SiGooglecloud
} from 'react-icons/si';

interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo?: string;
  category: string[];
}

// Function to categorize projects based on language and topics
const categorizeProject = (repo: GithubRepo): string[] => {
  const categories = new Set(['all']);
  
  // Add language-based category
  if (repo.language) {
    switch (repo.language.toLowerCase()) {
      case 'javascript':
      case 'typescript':
      case 'html':
      case 'css':
        categories.add('web');
        break;
      case 'python':
        categories.add('python');
        break;
      case 'java':
      case 'kotlin':
        categories.add('app');
        break;
    }
  }

  // Add topic-based categories
  repo.topics.forEach(topic => {
    switch (topic.toLowerCase()) {
      case 'machine-learning':
      case 'ml':
      case 'ai':
        categories.add('ml');
        break;
      case 'web':
      case 'frontend':
      case 'backend':
        categories.add('web');
        break;
      case 'mobile':
      case 'android':
      case 'ios':
        categories.add('app');
        break;
    }
  });

  return Array.from(categories);
};

// Update the getProjectImage function
const getProjectImage = (project: Project) => {
  // Instead of trying to load images, use gradient backgrounds based on tech
  const techColors: { [key: string]: string } = {
    react: '#61DAFB',
    typescript: '#3178C6',
    javascript: '#F7DF1E',
    python: '#3776AB',
    node: '#339933',
    mongodb: '#47A248',
    'c++': '#00599C',
    html: '#E34F26',
    css: '#1572B6',
    // Add more colors as needed
  };

  // Get primary tech color from project tech stack
  const primaryTech = project.tech[0]?.toLowerCase() || 'react';
  const color = techColors[primaryTech] || '#7477FF';

  return `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`;
};

// Add a function to get tech icon
const getTechIcon = (tech: string, repoName: string) => {
  const icons: { [key: string]: any } = {
    react: SiReact,
    typescript: SiTypescript,
    javascript: SiJavascript,
    python: SiPython,
    node: SiNodedotjs,
    mongodb: SiMongodb,
    fastapi: SiFastapi,
    next: SiNextdotjs,
    tailwind: SiTailwindcss,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    tensorflow: SiTensorflow,
    html: SiHtml5,
    css: SiCss3,
    php: SiPhp,
    mysql: SiMysql,
    git: SiGit,
    github: SiGithub,
    vscode: SiVisualstudiocode,
    postgresql: SiPostgresql,
    redis: SiRedis,
    firebase: SiFirebase,
    'c++': SiCplusplus,
    'cpp': SiCplusplus,
    amazonwebservices: SiAmazonwebservices,
    googlecloud: SiGooglecloud
  };

  // Special cases for specific repositories
  if (repoName.toLowerCase() === 'net-banking-portal') {
    return SiCplusplus;
  }
  if (repoName.toLowerCase() === 'uditsharma04') {
    return SiGithub;
  }

  // Rest of the logic remains the same
  const normalizedTech = tech.toLowerCase().replace(/[0-9.]/g, '').trim();
  
  if (normalizedTech.includes('html')) return icons.html;
  if (normalizedTech.includes('css')) return icons.css;
  if (normalizedTech.includes('node')) return icons.node;
  if (normalizedTech.includes('react')) return icons.react;
  if (normalizedTech.includes('c++') || normalizedTech.includes('cpp')) return icons['c++'];
  
  return icons[normalizedTech];
};

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState([
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development" },
    { id: "app", name: "App Development" },
    { id: "ml", name: "Machine Learning" },
    { id: "python", name: "Python" }
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/UditSharma04/repos');
        const repos: GithubRepo[] = await response.json();

        // Transform GitHub repos into projects
        const transformedProjects = repos
          .filter(repo => !repo.name.includes('.github.io')) // Exclude GitHub Pages repo
          .map(repo => ({
            title: repo.name.replace(/-/g, ' '),
            description: repo.description || 'No description available',
            image: `/project-images/${repo.name}.jpg`, // You'll need to add default images
            tech: [repo.language, ...repo.topics].filter(Boolean) as string[],
            github: repo.html_url,
            demo: repo.homepage || undefined,
            category: categorizeProject(repo)
          }));

        setProjects(transformedProjects);

        // Update categories based on available projects
        const uniqueCategories = new Set(['all']);
        transformedProjects.forEach(project => {
          project.category.forEach(cat => uniqueCategories.add(cat));
        });

        setCategories(Array.from(uniqueCategories).map(cat => ({
          id: cat,
          name: cat.charAt(0).toUpperCase() + cat.slice(1) + (cat === 'all' ? ' Projects' : '')
        })));

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on active category
  const filteredProjects = projects.filter(project =>
    activeCategory === 'all' || project.category.includes(activeCategory)
  );

  return (
    <section>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="bg-gray-700 h-48 rounded-t-lg" />
              <div className="bg-gray-800 p-4 rounded-b-lg space-y-3">
                <div className="h-6 bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-700 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id='projects' className='w-full min-h-screen bg-background py-12 sm:py-24'>
          <div className='max-w-[1400px] mx-auto px-4 sm:px-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-16"
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
                    <div className="relative group">
                      <div 
                        className="w-full h-48 bg-cover bg-center"
                        style={{ 
                          background: getProjectImage(project),
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Tech logo overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.tech[0] && getTechIcon(project.tech[0], project.title) && (
                            <div className="text-white/90" style={{ fontSize: '4rem' }}>
                              {React.createElement(getTechIcon(project.tech[0], project.title))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action buttons */}
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
                        {project.tech.map((tech, techIndex) => {
                          const Icon = getTechIcon(tech, project.title);
                          return (
                            <motion.span
                              key={techIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                              className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 flex items-center gap-1"
                            >
                              {Icon && <Icon className="w-3 h-3" />}
                              {tech}
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
