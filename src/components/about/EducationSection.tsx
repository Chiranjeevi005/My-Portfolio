'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FileText, Download, X } from 'lucide-react';

const EducationSection = () => {
  const { theme } = useTheme();
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const educationData = [
    {
      id: 1,
      title: "Full Stack Development Certification",
      institute: "NXTWave",
      year: "2022 - 2023",
      marks: "95%",
      certificateUrl: "/certificates/nxtwave.jpg",
      description: "Completed intensive full-stack development program with focus on modern web technologies, cloud deployment, and real-world project building."
    },
    {
      id: 2,
      title: "Bachelor of Business Administration (BBA)",
      institute: "University of Business Studies",
      year: "2019 - 2022",
      marks: "8.2/10 CGPA",
      certificateUrl: "/certificates/bba.jpg",
      description: "Focused on business analytics, digital marketing, and entrepreneurship. Graduated with distinction and completed multiple internships."
    },
    {
      id: 3,
      title: "Pre-University Course (PUC)",
      institute: "State Junior College",
      year: "2017 - 2019",
      marks: "89%",
      certificateUrl: "/certificates/puc.jpg",
      description: "Completed commerce stream with specialization in mathematics and economics, laying foundation for business and technology."
    },
    {
      id: 4,
      title: "Secondary School (10th Grade)",
      institute: "Greenwood High School",
      year: "2015 - 2017",
      marks: "92%",
      certificateUrl: "/certificates/10th.jpg",
      description: "Excelled in academics with a focus on mathematics and science, participated in national mathematics competitions."
    }
  ];

  // Updated to only use educationData
  const allEducation = [...educationData];

  const handleCardClick = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openCertificateModal = (item: any) => {
    setSelectedCertificate(item);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  // Determine colors based on theme
  const bgColor = theme === 'dark' ? 'bg-dark-bgPrimary' : 'bg-light-bgPrimary';
  const textColorPrimary = theme === 'dark' ? 'text-[#F8E8D8]' : 'text-[#2D1B18]';
  const textColorSecondary = theme === 'dark' ? 'text-[#D9BFAE]' : 'text-[#5A3E36]';
  const textColorMuted = theme === 'dark' ? 'text-[#A07E69]' : 'text-[#9B7C72]';
  const accentColor = theme === 'dark' ? '#FF6F61' : '#E85D45';
  const cardBg = theme === 'dark' ? 'bg-[#241A17]' : 'bg-[#FFFFFF]';
  const cardBorder = theme === 'dark' ? 'border-[#3C2E2A]' : 'border-[#E8D5C8]';
  const modalBg = theme === 'dark' ? 'bg-[#241A17]' : 'bg-[#FFFFFF]';
  const modalBorder = theme === 'dark' ? 'border-[#3C2E2A]' : 'border-[#E8D5C8]';
  const spotlightColor = theme === 'dark' ? 'rgba(255, 111, 97, 0.15)' : 'rgba(232, 93, 69, 0.15)';

  return (
    <section className={`py-16 sm:py-20 ${bgColor} relative overflow-hidden`}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-3xl sm:text-4xl font-bold ${textColorPrimary} mb-4`}>
            Academic Journey 🎓
          </h2>
          <p className={`${textColorSecondary} max-w-2xl mx-auto`}>
            A digital gallery of milestones, achievements, and the foundations of my expertise
          </p>
          <div className="w-20 h-1" style={{ backgroundColor: accentColor }}></div>
        </motion.div>

        {/* Transcript Wall Grid - Consistent 4-card layout across all screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 place-items-center">
          {allEducation.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-[280px]"
            >
              {/* Simplified card container without complex absolute positioning */}
              <div 
                className="relative w-full cursor-pointer group"
                onClick={() => handleCardClick(item.id)}
              >
                {/* Card with consistent height across all devices */}
                <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '380px' }}>
                  {/* Card Front */}
                  <motion.div
                    className={`absolute inset-0 w-full ${cardBg} border ${cardBorder} rounded-2xl shadow-lg p-6 flex flex-col justify-between`}
                    animate={{ rotateY: flippedCards[item.id] ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Certificate header with decorative elements */}
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                        <FileText size={28} style={{ color: accentColor }} />
                      </div>
                      <span className="text-sm font-medium px-3 py-1 rounded-lg" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                        {item.year}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold ${textColorPrimary} line-clamp-2`}>
                        {item.title}
                      </h3>
                      <p className="font-medium mt-2 text-base" style={{ color: accentColor }}>
                        {item.institute}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4" style={{ borderTop: `1px solid ${theme === 'dark' ? '#3C2E2A' : '#E8D5C8'}50` }}>
                      <span className={`text-sm ${textColorMuted}`}>
                        Click to flip
                      </span>
                      <span className="text-lg font-bold" style={{ color: accentColor }}>
                        {item.marks}
                      </span>
                    </div>
                  </motion.div>

                  {/* Card Back */}
                  <motion.div
                    className={`absolute inset-0 w-full ${cardBg} border ${cardBorder} rounded-2xl shadow-lg p-6 flex flex-col justify-between`}
                    animate={{ rotateY: flippedCards[item.id] ? 0 : 180 }}
                    transition={{ duration: 0.8 }}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div>
                      <h3 className={`text-xl font-bold ${textColorPrimary} line-clamp-1`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mt-3 line-clamp-6 ${textColorSecondary}`}>
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4" style={{ borderTop: `1px solid ${theme === 'dark' ? '#3C2E2A' : '#E8D5C8'}50` }}>
                      <button 
                        className="text-sm font-medium hover:underline flex items-center"
                        style={{ color: accentColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openCertificateModal(item);
                        }}
                      >
                        View Marksheet
                        <FileText size={14} className="ml-1" />
                      </button>
                      <button 
                        className="text-sm font-medium hover:underline flex items-center"
                        style={{ color: accentColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(item.id);
                        }}
                      >
                        Close
                        <X size={14} className="ml-1" />
                      </button>
                    </div>
                  </motion.div>
                  
                  {/* Glow border effect */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" style={{ border: `2px solid ${accentColor}` }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Storytelling Caption */}
        <motion.p 
          className={`italic text-sm text-center mt-16 max-w-3xl mx-auto ${textColorSecondary}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          "From notebooks to networks — every grade was a step toward greater creation. Each certificate represents not just academic achievement, but personal growth and the foundation of my journey."
        </motion.p>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: theme === 'dark' ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 249, 243, 0.95)' }}
            onClick={closeCertificateModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border ${modalBorder} shadow-[0_0_50px_rgba(232,93,69,0.4)]`}
              style={{ backgroundColor: theme === 'dark' ? 'rgba(36, 26, 23, 0.98)' : 'rgba(255, 255, 255, 0.98)', zIndex: 100 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-2xl font-bold ${textColorPrimary}`}>
                    {selectedCertificate.title}
                  </h3>
                  <p className="font-medium" style={{ color: accentColor }}>
                    {selectedCertificate.institute}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    closeCertificateModal();
                  }}
                  className={`hover:transition-colors ${textColorMuted} hover:${textColorPrimary}`}
                  style={{ zIndex: 101 }}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1">
                    <p className={`text-sm ${textColorMuted}`}>
                      Issued: {selectedCertificate.year}
                    </p>
                  </div>
                  
                  <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                    <p className="font-bold" style={{ color: accentColor }}>
                      {selectedCertificate.marks}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className={`rounded-xl w-full h-80 flex items-center justify-center border-2 border-dashed`} 
                    style={{ 
                      borderColor: theme === 'dark' ? '#3C2E2A' : '#E8D5C8',
                      backgroundColor: theme === 'dark' ? '#1C1C1E' : '#FFF9F3',
                      backgroundImage: `linear-gradient(to bottom right, ${theme === 'dark' ? '#1C1C1E' : '#FFF9F3'}, ${accentColor}20)`
                    }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <FileText size={64} style={{ color: `${accentColor}50` }} className="mx-auto" />
                        <p className={`mt-2 ${textColorMuted}`}>
                          Marksheet Preview
                        </p>
                        <p className={`text-sm mt-1 ${textColorSecondary}`}>
                          Actual Marksheet would appear here
                        </p>
                      </div>
                    </div>
                    
                    {/* Blurred overlay */}
                    <div className="absolute inset-0 bg-[url('/placeholder-certificate.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>
                  </div>
                  <p className={`text-sm mt-2 text-center ${textColorSecondary}`}>
                    Hover to focus • Click to unlock full view
                  </p>
                </div>
                
                <div className="flex justify-center gap-4 mt-6">
                  <button className="px-4 py-2 rounded-lg flex items-center transition-colors" style={{ backgroundColor: accentColor, color: theme === 'dark' ? '#1E1614' : '#FFFFFF' }}>
                    <Download size={20} className="mr-2" />
                    Download Marksheet
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EducationSection;