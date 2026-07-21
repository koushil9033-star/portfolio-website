import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Selected Work
            </h2>
            <p className="text-lg text-muted max-w-xl font-sans">
              A collection of projects showcasing my approach to problem-solving and technical implementation.
            </p>
          </div>
          <a href="https://github.com" className="flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors">
            View full archive <ArrowRight size={18} />
          </a>
        </motion.div>

        <div className="flex flex-col gap-24">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center group`}
            >
              <div className="w-full lg:w-3/5 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[16/10] overflow-hidden" data-cursor="view">
                  <div className="absolute inset-0 bg-foreground/5 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <span className="text-sm font-mono text-muted mb-4 border border-border px-3 py-1 rounded-full w-fit">0{idx + 1}</span>
                <h3 className="text-3xl font-serif font-bold text-foreground mb-4">
                  {project.title}
                </h3>
                
                <p className="text-lg text-muted mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Problem Solved</h4>
                  <p className="text-muted italic border-l-2 border-border pl-4">
                    "{project.problemSolved}"
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono px-3 py-1 bg-card border border-border rounded-md text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {project.liveDemo && (
                    <a 
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer" 
                      data-magnetic="true"
                      className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic="true"
                      className="flex items-center justify-center w-11 h-11 border border-border text-foreground hover:bg-card hover:border-foreground rounded-full transition-all"
                      aria-label="View Source on GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.caseStudy && (
                    <a 
                      href={project.caseStudy}
                      data-cursor="read"
                      className="flex items-center justify-center px-5 py-2.5 border border-border text-foreground font-medium hover:bg-card rounded-full transition-colors"
                    >
                      Case Study
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
