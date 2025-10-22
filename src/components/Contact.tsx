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
      ref={contactRef}
      className="section bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
            Let's Work Together
          </h2>
          <p className="text-xl mb-10 text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-700">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
          
          <div className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-8 md:p-12 border border-light-border dark:border-dark-border shadow-lg transition-all duration-700">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary focus:outline-none focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary focus:outline-none focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary focus:outline-none focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary focus:outline-none focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent transition-all duration-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="glow-hover w-full bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover"
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