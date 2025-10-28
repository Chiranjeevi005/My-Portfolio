'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWhatsapp, 
  faLinkedin, 
  faInstagram, 
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';

// Add the icons to the library
library.add(faWhatsapp, faLinkedin, faInstagram, faXTwitter, faEnvelope);

const GetInTouch = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const signatureRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animate signature on mount
  useEffect(() => {
    if (signatureRef.current && isMounted) {
      const length = signatureRef.current.getTotalLength();
      signatureRef.current.style.strokeDasharray = `${length}`;
      signatureRef.current.style.strokeDashoffset = `${length}`;
      
      // Animate the signature drawing
      setTimeout(() => {
        if (signatureRef.current) {
          signatureRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
          signatureRef.current.style.strokeDashoffset = '0';
        }
      }, 500);
    }
  }, [isMounted]);

  const socialLinks = [
    { 
      icon: faWhatsapp, 
      href: 'https://wa.me/1234567890', 
      color: 'text-[#25D366]',
      label: 'Message me on WhatsApp',
      glow: 'hover:shadow-[0_0_20px_#25D366]'
    },
    { 
      icon: faEnvelope, 
      href: 'mailto:youremail@gmail.com', 
      color: 'text-[#EA4335]',
      label: 'Email me directly',
      glow: 'hover:shadow-[0_0_20px_#EA4335]'
    },
    { 
      icon: faLinkedin, 
      href: 'https://linkedin.com/in/username', 
      color: 'text-[#0077B5]',
      label: 'Connect on LinkedIn',
      glow: 'hover:shadow-[0_0_20px_#0077B5]'
    },
    { 
      icon: faInstagram, 
      href: 'https://instagram.com/username', 
      color: 'text-[#DD2A7B]',
      label: 'Follow on Instagram',
      glow: 'hover:shadow-[0_0_20px_#DD2A7B]'
    },
    { 
      icon: faXTwitter, 
      href: 'https://x.com/username', 
      color: 'text-[#1DA1F2]',
      label: 'Tweet me on X',
      glow: 'hover:shadow-[0_0_20px_#1DA1F2]'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <section className="relative py-20 px-6 md:px-16 overflow-hidden">
      {/* Background with theme-aware gradient */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-light-bgSecondary via-light-bgPrimary to-light-bgSurface 
        dark:from-dark-bgSecondary dark:via-dark-bgPrimary dark:to-dark-bgSurface
        transition-colors duration-700">
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: theme === 'dark' ? '#FF8A5C' : '#E85D45',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-light-textAccent dark:text-dark-textAccent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch 
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-light-textSecondary dark:text-dark-textSecondary max-w-xl mx-auto leading-relaxed"
          >
            Let's talk about ideas, code, or collaborations. I love connecting with curious minds!
          </motion.p>
        </motion.div>
        
        {/* Contact Methods (Interactive Social Row) */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {socialLinks.map(({ icon, href, color, label, glow }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-full border border-light-border dark:border-dark-border bg-light-bgSurface dark:bg-dark-bgSurface shadow-lg ${glow} transition-all group`}
              aria-label={label}
            >
              <FontAwesomeIcon icon={icon} className={`${color} text-2xl`} />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-light-bgSurface dark:bg-dark-bgSurface text-light-textPrimary dark:text-dark-textPrimary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Contact Form */}
        <motion.form 
          className="mt-16 max-w-lg mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="w-full p-4 rounded-xl bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border focus:border-light-textAccent dark:focus:border-dark-textAccent outline-none transition-all shadow-sm focus:shadow-[0_0_15px_rgba(var(--color-text-accent-rgb),0.3)]"
              style={{
                '--color-text-accent-rgb': theme === 'dark' ? '255, 138, 92' : '232, 93, 69'
              } as React.CSSProperties}
              required
            />
          </div>
          
          <div className="relative">
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              className="w-full p-4 rounded-xl bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border focus:border-light-textAccent dark:focus:border-dark-textAccent outline-none transition-all shadow-sm focus:shadow-[0_0_15px_rgba(var(--color-text-accent-rgb),0.3)]"
              style={{
                '--color-text-accent-rgb': theme === 'dark' ? '255, 138, 92' : '232, 93, 69'
              } as React.CSSProperties}
              required
            />
          </div>
          
          <div className="relative">
            <textarea 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              rows={5} 
              placeholder="Your Message..." 
              className="w-full p-4 rounded-xl bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border focus:border-light-textAccent dark:focus:border-dark-textAccent outline-none transition-all shadow-sm focus:shadow-[0_0_15px_rgba(var(--color-text-accent-rgb),0.3)] resize-none"
              style={{
                '--color-text-accent-rgb': theme === 'dark' ? '255, 138, 92' : '232, 93, 69'
              } as React.CSSProperties}
              required
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-4 rounded-xl bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText font-semibold shadow-lg hover:shadow-[0_0_20px_var(--color-button-primary)] transition-all flex items-center justify-center border border-light-border dark:border-dark-border focus:border-light-textAccent dark:focus:border-dark-textAccent outline-none"
            style={{
              '--color-button-primary': theme === 'dark' ? '#FF8A5C' : '#E85D45'
            } as React.CSSProperties}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center">
                Send Message
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↠
                </motion.span>
              </span>
            )}
          </motion.button>

          {/* Form submission feedback */}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-light-buttonPrimary/20 dark:bg-dark-buttonPrimary/20 text-light-textPrimary dark:text-dark-textPrimary rounded-lg text-center"
            >
              ✅ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}
          
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-center"
            >
              {submitError}
            </motion.div>
          )}
        </motion.form>
        
        {/* Animated Signature & Farewell */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="flex justify-center">
            <svg 
              width="200" 
              height="60" 
              viewBox="0 0 200 60"
              className="w-48 h-12 sm:w-64 sm:h-16"
            >
              <motion.path
                ref={signatureRef}
                d="M20 40 Q 40 20 60 35 Q 80 50 100 30 Q 120 10 140 25 Q 160 40 180 20"
                fill="none"
                stroke={theme === 'dark' ? '#FF8A5C' : '#E85D45'}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInTouch;