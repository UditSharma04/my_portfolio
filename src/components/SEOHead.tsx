import React, { useEffect } from 'react';

const SEOHead = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Udit Sharma",
    "url": "https://your-domain.com",
    "sameAs": [
      "https://github.com/UditSharma04",
      "https://www.linkedin.com/in/hellouditt/",
      "https://x.com/hellouditt",
      "https://www.instagram.com/confused.udit/"
    ]
  };

  useEffect(() => {
    // Add JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      script.remove();
    };
  }, [structuredData]);

  useEffect(() => {
    document.title = 'Udit Sharma - Full Stack Developer';
    
    // Update meta tags
    const metaTags = [
      { name: 'description', content: 'Portfolio of Udit Sharma, a Full Stack Developer specializing in React, TypeScript, and modern web technologies.' },
      { name: 'keywords', content: 'full stack developer, react, typescript, web development, VIT Chennai' },
      { property: 'og:title', content: 'Udit Sharma - Full Stack Developer' },
      { property: 'og:description', content: 'Portfolio of Udit Sharma, a Full Stack Developer.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://your-domain.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@hellouditt' },
      { name: 'twitter:title', content: 'Udit Sharma - Full Stack Developer' },
      { name: 'twitter:description', content: 'Portfolio of Udit Sharma, a Full Stack Developer.' }
    ];

    metaTags.forEach(({ name, content, property }) => {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      meta.content = content;
      document.head.appendChild(meta);
    });

    return () => {
      // Cleanup meta tags on unmount
      metaTags.forEach(({ name, property }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        const meta = document.querySelector(selector);
        if (meta) meta.remove();
      });
    };
  }, []);

  return null;
};

export default SEOHead; 