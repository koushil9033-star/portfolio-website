import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Education
          </h2>
        </motion.div>

        <div className="space-y-12">
          {education.map((edu, idx) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                    {edu.degree}
                  </h3>
                  <div className="text-xl font-medium text-muted">
                    {edu.school}
                  </div>
                </div>
                <div className="text-sm font-mono bg-background border border-border text-muted px-4 py-1.5 rounded-full w-fit h-fit">
                  {edu.period}
                </div>
              </div>
              
              <div className="mt-8 border-t border-border pt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                  Relevant Coursework
                </h4>
                <p className="text-muted leading-relaxed">
                  {edu.coursework}
                </p>
              </div>
              
              {edu.achievements.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="flex items-start text-muted">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
