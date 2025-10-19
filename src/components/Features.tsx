'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      
      featureCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 50,
            rotationX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );

        // Add hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            rotationX: 5,
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotationX: 0,
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  const features = [
    {
      title: "Responsive Design",
      description: "Websites that look stunning on any device, from mobile to desktop.",
      icon: "📱",
    },
    {
      title: "Blazing Fast",
      description: "Optimized for performance with cutting-edge technologies.",
      icon: "⚡",
    },
    {
      title: "Modern UI/UX",
      description: "Intuitive interfaces with engaging user experiences.",
      icon: "🎨",
    },
    {
      title: "SEO Optimized",
      description: "Built with best practices for search engine visibility.",
      icon: "🔍",
    },
  ];

  return (
    <section 
      id="features" 
      ref={featuresRef}
      className="section bg-lightBg dark:bg-darkBg transition-colors duration-700"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-textPrimaryLight dark:text-textPrimaryDark font-heading transition-colors duration-700">
            Feature Highlights
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-textSecondaryLight dark:text-textSecondaryDark transition-colors duration-700">
            Discover the key elements that make our digital experiences exceptional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white dark:bg-gray-800 rounded-2xl p-6 border border-accent1Light/20 dark:border-accent1Dark/20 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-textPrimaryLight dark:text-textPrimaryDark transition-colors duration-700">
                {feature.title}
              </h3>
              <p className="text-textSecondaryLight dark:text-textSecondaryDark transition-colors duration-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;