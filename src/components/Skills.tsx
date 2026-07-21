import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';

export default function Skills() {
  const { skills } = portfolioData;

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Technical Arsenal
          </h2>
          <p className="text-lg text-muted max-w-2xl font-sans">
            A comprehensive overview of the technologies, languages, and tools I use to build modern software.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
            >
              <h3 className="text-xl font-serif font-semibold text-foreground mb-6 border-b border-border pb-4 group-hover:border-accent/30 transition-colors">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-4 py-2 bg-background border border-border text-foreground text-sm font-medium rounded-lg hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
