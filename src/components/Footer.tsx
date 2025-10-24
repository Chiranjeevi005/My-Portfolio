'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#works' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/chiranjeevi005', icon: faLinkedin },
    { name: 'GitHub', href: 'https://github.com/Chiranjeevi005', icon: faGithub },
    { name: 'Email', href: 'mailto:chiranjeevipk005@gmail.com', icon: faEnvelope },
  ];

  return (
    <section className="relative border-t border-light-border dark:border-dark-border mt-20 pt-10 pb-8 bg-light-bgSecondary dark:bg-dark-bgSecondary overflow-hidden transition-colors duration-700">
      {/* Glowing Top Divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[2px] bg-gradient-to-r from-light-textAccent/40 via-light-textHighlight/40 to-light-textAccent/40 dark:from-dark-textAccent/40 dark:via-dark-textHighlight/40 dark:to-dark-textAccent/40 blur-sm animate-glowFlow"></div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* 1️⃣ Personal Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-light-textAccent to-light-textHighlight dark:from-dark-textAccent dark:to-dark-textHighlight bg-clip-text text-transparent">
            Crafted with Purpose
          </h2>
          <p className="mt-2 text-light-textSecondary dark:text-dark-textSecondary">
            Building experiences where <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">code meets commerce</span> and creativity shapes impact.
          </p>
        </motion.div>

        {/* 2️⃣ Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 3️⃣ Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-3">Connect</h3>
          <div className="flex justify-center md:justify-start gap-5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-textAccent dark:hover:text-dark-textAccent transition-transform transform hover:scale-110"
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FontAwesomeIcon icon={social.icon} className="text-2xl" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Signature Line */}
      <motion.div 
        className="text-center mt-10 text-sm text-light-textMuted dark:text-dark-textMuted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        © {currentYear} Chiranjeevi PK — <span className="italic">crafted with precision & purpose</span>.
      </motion.div>
    </section>
  );
};

export default Footer;