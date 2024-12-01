import { useState, useRef, useEffect, memo } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updatedAt: string;
}

const getLanguageColor = (language: string): string => {
  const colors: { [key: string]: string } = {
    JavaScript: 'bg-[#f1e05a]',
    TypeScript: 'bg-[#3178c6]',
    Python: 'bg-[#3572A5]',
    Java: 'bg-[#b07219]',
    HTML: 'bg-[#e34c26]',
    CSS: 'bg-[#563d7c]',
    SCSS: 'bg-[#c6538c]',
    PHP: 'bg-[#4F5D95]',
    Ruby: 'bg-[#701516]',
    'C++': 'bg-[#f34b7d]',
    C: 'bg-[#555555]',
    'C#': 'bg-[#178600]',
    Go: 'bg-[#00ADD8]',
    Rust: 'bg-[#dea584]',
    Swift: 'bg-[#F05138]',
    Kotlin: 'bg-[#A97BFF]',
    Dart: 'bg-[#00B4AB]',
    Shell: 'bg-[#89e051]',
    PowerShell: 'bg-[#012456]',
    Vue: 'bg-[#41b883]',
    Jupyter: 'bg-[#DA5B0B]',
    Markdown: 'bg-[#083fa1]',
    YAML: 'bg-[#cb171e]',
    Docker: 'bg-[#384d54]',
    Assembly: 'bg-[#6E4C13]',
    R: 'bg-[#198CE7]',
    Lua: 'bg-[#000080]',
    Perl: 'bg-[#0298c3]',
    Haskell: 'bg-[#5e5086]',
    Julia: 'bg-[#a270ba]',
    Elixir: 'bg-[#6e4a7e]',
    Scala: 'bg-[#c22d40]',
    Clojure: 'bg-[#db5855]',
    Svelte: 'bg-[#ff3e00]',
    Astro: 'bg-[#ff5a03]',
    Next: 'bg-[#000000]',
    Nuxt: 'bg-[#00DC82]'
  };

  return colors[language] || 'bg-gray-400'; // Default color for unknown languages
};

const ProjectCard = memo(({ title, description, stars, forks, language, url, updatedAt }: ProjectCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Get the language color without the 'bg-' prefix
  const getLanguageBorderColor = (lang: string): string => {
    if (!lang) return '#3b82f6'; // default blue color
    const colorClass = getLanguageColor(lang);
    // Extract hex color from the class name
    const match = colorClass.match(/\[(#[0-9a-fA-F]+)\]/);
    return match ? match[1] : '#3b82f6';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/card relative p-[1px] rounded-md h-full bg-gradient-to-r from-transparent via-transparent to-transparent 
                 hover:from-[var(--border-color)] hover:via-[var(--border-color)] hover:to-[var(--border-color)]
                 transition-all duration-300"
      style={{
        '--border-color': getLanguageBorderColor(language)
      } as React.CSSProperties}
    >
      {/* Main card content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-md p-4 h-full flex flex-col">
        {/* Gradient glow effect */}
        {isHovered && (
          <div
            className="absolute inset-0 opacity-70 pointer-events-none rounded-md"
            style={{
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, 
                          rgba(100, 150, 255, 0.15), 
                          transparent 40%)`
            }}
          />
        )}

        {/* Card content */}
        <div className="relative z-10 flex flex-col flex-grow">
          <div className="flex items-center gap-3">
            <svg height="16" viewBox="0 0 16 16" width="16" className="text-gray-600 dark:text-gray-400">
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" fill="currentColor"></path>
            </svg>
            <div className="group/title relative">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-blue-600 dark:text-blue-400 group-hover/title:text-blue-700 
                         dark:group-hover/title:text-blue-300"
              >
                {title}
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 
                            group-hover/title:w-full transition-all duration-300 ease-out"></div>
            </div>
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm flex-grow">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-sm">
            {language && (
              <span className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-full ${getLanguageColor(language)}`}></span>
                {language}
              </span>
            )}
            
            <a 
              href={`${url}/stargazers`} 
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
            >
              <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694z"></path>
              </svg>
              {stars}
            </a>

            <a 
              href={`${url}/network/members`} 
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
            >
              <svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor">
                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg>
              {forks}
            </a>

            <span className="text-gray-600 dark:text-gray-400">
              Updated {new Date(updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard; 