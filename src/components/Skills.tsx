import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, SiHtml5, SiCss3, SiJavascript, SiPhp, SiMysql,
  SiR, SiMarkdown, SiNodedotjs, SiExpress, SiGit, SiGooglecloud,
  SiMongodb, SiFirebase, SiXampp, SiGooglemaps, SiTailwindcss, SiBootstrap, SiJupyter,
  SiVisualstudiocode, SiAndroidstudio, SiArduino, SiCisco, SiPostman, SiNpm, SiVercel,
  SiPowershell, SiOpenai, SiAmazonwebservices, SiCplusplus, SiWindows, SiLinux
} from 'react-icons/si';
import { DiJava, DiDatabase } from 'react-icons/di';
import { FaNetworkWired, FaServer, FaMicrochip, FaCode, FaBook, FaLaptopCode } from 'react-icons/fa';

interface SkillItem {
  name: string;
  icon: React.ReactElement;
  proficiency?: number;
  experience?: string;
  projects?: number;
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
