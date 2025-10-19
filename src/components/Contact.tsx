'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && contactRef.current) {
      gsap.fromTo(
        contactRef.current,
        { 
          opacity: 0, 
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="section bg-lightBg dark:bg-darkBg transition-colors duration-700"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-textPrimaryLight dark:text-textPrimaryDark font-heading transition-colors duration-700">
            Let's Work Together
          </h2>
          <p className="text-xl mb-10 text-textSecondaryLight dark:text-textSecondaryDark transition-colors duration-700">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-accent1Light/20 dark:border-accent1Dark/20 shadow-lg transition-all duration-700">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-accent1Light/30 dark:border-accent1Dark/30 bg-lightBg dark:bg-darkBg text-textPrimaryLight dark:text-textPrimaryDark focus:outline-none focus:ring-2 focus:ring-accent1Light dark:focus:ring-accent1Dark transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl border border-accent1Light/30 dark:border-accent1Dark/30 bg-lightBg dark:bg-darkBg text-textPrimaryLight dark:text-textPrimaryDark focus:outline-none focus:ring-2 focus:ring-accent1Light dark:focus:ring-accent1Dark transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-xl border border-accent1Light/30 dark:border-accent1Dark/30 bg-lightBg dark:bg-darkBg text-textPrimaryLight dark:text-textPrimaryDark focus:outline-none focus:ring-2 focus:ring-accent1Light dark:focus:ring-accent1Dark transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl border border-accent1Light/30 dark:border-accent1Dark/30 bg-lightBg dark:bg-darkBg text-textPrimaryLight dark:text-textPrimaryDark focus:outline-none focus:ring-2 focus:ring-accent1Light dark:focus:ring-accent1Dark transition-all duration-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="glow-hover w-full bg-accent1Light dark:bg-accent1Dark text-textPrimaryDark dark:text-textPrimaryLight px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;