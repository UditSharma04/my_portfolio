import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, SiHtml5, SiCss3, SiJavascript, SiPhp, SiMysql,
  SiR, SiMarkdown, SiNodedotjs, SiExpress, SiGit, SiGooglecloud,
  SiMongodb, SiFirebase, SiXampp, SiGooglemaps, SiTailwindcss, SiBootstrap, SiJupyter,
  SiVisualstudiocode, SiAndroidstudio, SiArduino, SiCisco, SiPostman, SiNpm, SiVercel,
  SiPowershell, SiOpenai, SiAmazonwebservices, SiCplusplus, SiWindows, SiLinux
} from 'react-icons/si';
import { DiJava, DiDatabase } from 'react-icons/di';
import { FaNetworkWired, FaServer, FaMicrochip, FaCode, FaBook, FaLaptopCode, FaTools, FaToolbox } from 'react-icons/fa';

interface SkillItem {
  name: string;
  icon: React.ReactElement;
  experience?: string;
}

interface SkillCategory {
  [key: string]: SkillItem[];
}

const skillCategories: SkillCategory = {
  "Languages": [
    { name: "Java", icon: <DiJava /> },
    { name: "C++", icon: <SiCplusplus /> },
    { name: "Python", icon: <SiPython /> },
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss3 /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "PHP", icon: <SiPhp /> },
    { name: "SQL", icon: <SiMysql /> },
    { name: "MATLAB", icon: <FaLaptopCode /> },
    { name: "R", icon: <SiR /> },
    { name: "Markdown", icon: <SiMarkdown /> }
  ],
  "Developer Tools": [
    { name: "NodeJs", icon: <SiNodedotjs /> },
    { name: "ExpressJs", icon: <SiExpress /> },
    { name: "Git", icon: <SiGit /> },
    { name: "Google Cloud", icon: <SiGooglecloud /> },
    { name: "AWS", icon: <SiAmazonwebservices /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "XAMPP", icon: <SiXampp /> },
    { name: "Google Maps", icon: <SiGooglemaps /> },
    { name: "Tailwind", icon: <SiTailwindcss /> },
    { name: "Bootstrap", icon: <SiBootstrap /> }
  ],
  "Tools & Libraries": [
    { name: "Jupyter", icon: <SiJupyter /> },
    { name: "VS Code", icon: <SiVisualstudiocode /> },
    { name: "Android Studio", icon: <SiAndroidstudio /> },
    { name: "Arduino", icon: <SiArduino /> },
    { name: "Cisco Packet Tracer", icon: <SiCisco /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "NPM", icon: <SiNpm /> },
    { name: "Vercel", icon: <SiVercel /> },
    { name: "PowerShell", icon: <SiPowershell /> },
    { name: "Windows", icon: <SiWindows /> },
    { name: "Linux", icon: <SiLinux /> }
  ],
  "Relevant Coursework": [
    { name: "Computer Networks", icon: <FaNetworkWired /> },
    { name: "Operating Systems", icon: <FaServer /> },
    { name: "Microprocessors", icon: <FaMicrochip /> },
    { name: "Data Structures", icon: <FaCode /> },
    { name: "Web Development", icon: <SiHtml5 /> },
    { name: "Database Management", icon: <DiDatabase /> },
    { name: "Compiler Design", icon: <FaBook /> },
    { name: "Generative AI", icon: <SiOpenai /> }
  ]
};

const skillColors: { [key: string]: string } = {
  // Languages
  Java: '#ED8B00',
  'C++': '#00599C',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  PHP: '#777BB4',
  SQL: '#4479A1',
  MATLAB: '#0076A8',
  R: '#276DC3',
  Markdown: '#000000',

  // Developer Tools
  NodeJs: '#339933',
  ExpressJs: '#000000',
  Git: '#F05032',
  'Google Cloud': '#4285F4',
  AWS: '#FF9900',
  MongoDB: '#47A248',
  Firebase: '#FFCA28',
  MySQL: '#4479A1',
  XAMPP: '#FB7A24',
  'Google Maps': '#4285F4',
  Tailwind: '#06B6D4',
  Bootstrap: '#7952B3',

  // Tools & Libraries
  Jupyter: '#F37626',
  'VS Code': '#007ACC',
  'Android Studio': '#3DDC84',
  Arduino: '#00979D',
  'Cisco Packet Tracer': '#1BA0D7',
  Postman: '#FF6C37',
  NPM: '#CB3837',
  Vercel: '#000000',
  PowerShell: '#5391FE',
  Windows: '#0078D6',
  Linux: '#FCC624',

  // Relevant Coursework
  'Computer Networks': '#2962FF',
  'Operating Systems': '#FF6D00',
  Microprocessors: '#00BCD4',
  'Data Structures': '#4CAF50',
  'Web Development': '#FF4081',
  'Database Management': '#6200EA',
  'Compiler Design': '#FF3D00',
  'Generative AI': '#00C853'
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Languages":
      return <FaCode className="text-accent" />;
    case "Developer Tools":
      return <FaTools className="text-accent" />;
    case "Tools & Libraries":
      return <FaToolbox className="text-accent" />;
    case "Relevant Coursework":
      return <FaBook className="text-accent" />;
    default:
      return <FaCode className="text-accent" />;
  }
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  // Track expanded state for each category
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  // Number of skills to show initially on mobile
  const mobileLimit = 4;

  const getFilteredSkills = (skills: SkillItem[], category: string) => {
    if (window.innerWidth > 768 || expandedCategories[category]) {
      return skills;
    }
    return skills.slice(0, mobileLimit);
  };

  const handleShowMore = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: true
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        // Expand all categories on desktop
        const allCategories = Object.keys(skillCategories).reduce((acc, category) => ({
          ...acc,
          [category]: true
        }), {});
        setExpandedCategories(allCategories);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-all ${
              filter === 'all' 
                ? 'bg-accent text-white' 
                : 'bg-card/50 text-textSecondary hover:bg-card'
            }`}
          >
            All
          </button>
          {Object.keys(skillCategories).map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                filter === category 
                  ? 'bg-accent text-white' 
                  : 'bg-card/50 text-textSecondary hover:bg-card'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {Object.entries(skillCategories)
            .filter(([category]) => filter === 'all' || category === filter)
            .map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm"
              >
                <h3 className="text-2xl font-semibold text-textPrimary capitalize flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    {getCategoryIcon(category)}
                  </span>
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {getFilteredSkills(skills, category).map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(index * 0.05, 0.3),
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 0 20px ${skillColors[skill.name]}33`
                      }}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="relative bg-card/30 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2 hover:border-accent/50 transition-all duration-300"
                    >
                      <div 
                        className="text-3xl transition-all duration-300 transform group-hover:scale-110"
                        style={{ color: skillColors[skill.name] || '#7477FF' }}
                      >
                        {skill.icon}
                      </div>
                      <span className="text-sm text-textSecondary text-center group-hover:text-textPrimary transition-colors duration-300">
                        {skill.name}
                      </span>
                      {hoveredSkill === skill.name && skill.experience && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-card p-2 rounded-lg shadow-xl text-xs text-textSecondary whitespace-nowrap"
                        >
                          {skill.experience}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {window.innerWidth <= 768 && !expandedCategories[category] && skills.length > mobileLimit && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 px-4 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors w-full"
                    onClick={() => handleShowMore(category)}
                  >
                    Show More ({skills.length - mobileLimit} more)
                  </motion.button>
                )}
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
