import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';
import { Award } from 'lucide-react';

export default function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="py-24 bg-card border-t border-border/50">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto font-sans">
            Continuous learning paths to stay current with industry standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-4 p-6 bg-background border border-border rounded-xl hover:border-foreground/30 transition-colors"
            >
              <div className="p-3 bg-card border border-border rounded-lg text-foreground mt-1">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">
                  {cert.title}
                </h3>
                <div className="text-muted mb-2">
                  {cert.issuer}
                </div>
                <div className="text-xs font-mono text-muted/70">
                  Issued: {cert.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
