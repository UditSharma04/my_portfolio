import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

const LoadingHexagon = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative w-24 h-24">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full"
            style={{
              rotate: i * 60,
              transformOrigin: '50% 50%',
            }}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
          >
            <div 
              className="w-4 h-4 bg-accent rounded-full"
              style={{
                transform: 'translateY(-30px)',
              }}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 border-2 border-accent"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            animate={{
              rotate: 360,
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-100px",
    amount: 0.1 // Makes it trigger earlier
  });
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const perPage = 6;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.github.com/users/UditSharma04/repos?sort=updated&per_page=${perPage + 2}&page=${page}`,
          {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error(
            `Failed to fetch repositories: ${response.status} ${response.statusText}`
          );
        }
        
        const data = await response.json();
        const filteredData = data.filter((repo: Repository) => repo.name !== 'UditSharma04');
        const limitedData = filteredData.slice(0, perPage);
        
        if (page === 1) {
          setRepos(limitedData);
        } else {
          setRepos(prev => {
            const newRepos = [...prev, ...limitedData];
            return newRepos.slice(0, page * perPage);
          });
        }

        setHasMore(data.length === perPage + 2);
      } catch (err) {
        console.error('Error fetching repos:', err);
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1000 * (retryCount + 1)); // Exponential backoff
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load repositories');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [page, retryCount]);

  const handleViewAll = () => {
    // Redirect to GitHub repositories page
    window.open('https://github.com/UditSharma04?tab=repositories', '_blank');
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <motion.section 
      ref={sectionRef}
      id="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold"
        >
          Projects
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={handleViewAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Projects
        </motion.button>
      </div>

      {isLoading ? (
        <LoadingHexagon />
      ) : error ? (
        <div className="text-red-500 dark:text-red-400 p-4 rounded-md bg-red-100 dark:bg-red-900/20">
          {error}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProjectCard
                  title={repo.name}
                  description={repo.description || 'No description available'}
                  stars={repo.stargazers_count}
                  forks={repo.forks_count}
                  language={repo.language}
                  url={repo.html_url}
                  updatedAt={repo.updated_at}
                />
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Load More
              </button>
            </motion.div>
          )}
        </>
      )}
    </motion.section>
  );
};

export default Projects;
