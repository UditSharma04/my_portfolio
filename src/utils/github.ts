interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string;
}

export interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string;
  image?: string;
  category: 'Web App' | 'Mobile' | 'ML/AI' | 'Backend' | 'Portfolio' | 'Other';
}

export async function fetchGithubProjects(): Promise<ProjectData[]> {
  try {
    const response = await fetch('https://api.github.com/users/UditSharma04/repos');
    const repos: GithubRepo[] = await response.json();

    return repos
      .filter(repo => !repo.name.includes('.github.io')) // Exclude GitHub Pages repo
      .map(repo => {
        // Determine category based on topics and language
        let category: ProjectData['category'] = 'Other';
        const topics = repo.topics.map(topic => topic.toLowerCase());

        if (topics.includes('web') || topics.includes('frontend') || repo.language === 'JavaScript' || repo.language === 'TypeScript') {
          category = 'Web App';
        } else if (topics.includes('mobile') || topics.includes('android') || topics.includes('ios')) {
          category = 'Mobile';
        } else if (topics.includes('ml') || topics.includes('ai') || topics.includes('machine-learning')) {
          category = 'ML/AI';
        } else if (topics.includes('backend') || topics.includes('api') || repo.language === 'Python' || repo.language === 'Java') {
          category = 'Backend';
        } else if (topics.includes('portfolio')) {
          category = 'Portfolio';
        }

        return {
          title: repo.name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          description: repo.description || `A ${category.toLowerCase()} project built with ${repo.language}`,
          technologies: [repo.language, ...repo.topics],
          github: repo.html_url,
          live: repo.homepage || undefined,
          category,
        };
      });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}
