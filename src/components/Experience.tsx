import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 bg-card">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Experience
          </h2>
        </motion.div>

        <div className="relative border-l border-border pl-8 md:pl-12 space-y-16">
          {experience.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full border-4 border-card bg-border group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  {exp.role}
                </h3>
                <span className="hidden md:inline text-muted px-2">—</span>
                <span className="text-lg font-medium text-accent">
                  {exp.company}
                </span>
              </div>
              
              <div className="text-sm font-mono text-muted mb-6 inline-block bg-background px-3 py-1 rounded-full border border-border">
                {exp.period}
              </div>
              
              <p className="text-lg text-muted leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
