import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: FaEnvelope,
      href: 'mailto:your.email@example.com',
      color: 'hover:text-red-500'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com/yourusername',
      color: 'hover:text-purple-500'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div id='contact' className='w-full min-h-screen bg-background py-24'>
      <div className='max-w-[1000px] mx-auto px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className='text-4xl font-bold inline border-b-4 border-accent text-textPrimary'>
            Contact
          </h2>
          <p className='text-textSecondary py-6'>
            Let's get in touch! Submit the form below or reach out through social media.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-textSecondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card/30 border border-white/10 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 text-textPrimary placeholder-textSecondary/50 transition-colors"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-textSecondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card/30 border border-white/10 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 text-textPrimary placeholder-textSecondary/50 transition-colors"
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-textSecondary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-card/30 border border-white/10 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 text-textPrimary placeholder-textSecondary/50 transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
                    ${isSubmitting 
                      ? 'bg-accent/50 cursor-wait' 
                      : 'bg-accent hover:bg-accent-light'
                    } text-white shadow-lg hover:shadow-accent/25`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </motion.div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-center"
                >
                  Message sent successfully!
                </motion.div>
              )}
            </motion.form>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-textPrimary mb-4">
                Connect With Me
              </h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 text-textSecondary hover:text-accent group transition-colors duration-300 ${link.color}`}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <link.icon size={24} />
                    </div>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-textPrimary mb-4">
                Location
              </h3>
              <p className="text-textSecondary">
                Based in Bangalore, India
                <br />
                Open to remote opportunities worldwide
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-textPrimary mb-4">
                Availability
              </h3>
              <p className="text-textSecondary">
                Currently available for:
                <br />
                • Full-time positions
                <br />
                • Freelance projects
                <br />
                • Technical consulting
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
