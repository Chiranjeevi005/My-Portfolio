'use client';

import { useEffect, useRef } from 'react';
import { animateFadeUp } from '@/utils/gsapAnimations';

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && servicesRef.current) {
      const serviceCards = servicesRef.current.querySelectorAll('.service-card');
      serviceCards.forEach((card) => animateFadeUp(card as HTMLElement));
    }
  }, []);

  const services = [
    {
      title: 'Interactive Dashboards',
      description: 'Create engaging, data-driven dashboards with real-time updates and intuitive user interfaces.',
      icon: '📊',
    },
    {
      title: 'Realtime Apps',
      description: 'Build applications with live data synchronization using Supabase and WebSocket technologies.',
      icon: '⚡',
    },
    {
      title: 'Brand Portfolios',
      description: 'Design cohesive brand experiences with stunning portfolios that showcase your work effectively.',
      icon: '🎨',
    },
    {
      title: 'AI Integration',
      description: 'Integrate cutting-edge AI capabilities into your applications for enhanced functionality.',
      icon: '🤖',
    },
  ];

  return (
    <section id="services" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-textPrimary font-display">
          My Services
        </h2>
        
        <div 
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-background rounded-xl p-6 border border-surface hover:border-primary/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/30"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-textPrimary">{service.title}</h3>
              <p className="text-textSecondary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;