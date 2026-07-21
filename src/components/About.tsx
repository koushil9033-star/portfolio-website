import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            {about.title}
          </h2>
          <div className="w-20 h-1 bg-accent mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            {about.story.map((paragraph, idx) => (
              <motion.p 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-lg md:text-xl text-muted leading-relaxed font-serif"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[4/5] max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-border transform rotate-3 rounded-2xl"></div>
              <div className="absolute inset-0 bg-background border border-border shadow-sm rounded-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=800" 
                  alt="Profile" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-black/10 rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
