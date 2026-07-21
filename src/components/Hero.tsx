import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';
import { ArrowRight, Download, Mail } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const { hero } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".hero-reveal",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center justify-center relative z-10">
          <div className="hero-reveal opacity-0">
            <h2 className="text-xl md:text-2xl font-serif text-muted mb-2">{hero.greeting}</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight tracking-tight mb-6">
              {hero.name}
            </h1>
          </div>
          
          <div className="hero-reveal opacity-0 flex flex-wrap justify-center gap-3 mb-8">
            {hero.roles.map((role, idx) => (
              <span 
                key={idx} 
                className="px-4 py-1.5 text-sm font-mono bg-card border border-border rounded-full text-foreground/80 shadow-sm"
              >
                {role}
              </span>
            ))}
          </div>
          
          <p className="hero-reveal opacity-0 text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
            {hero.summary}
          </p>
          
          <div className="hero-reveal opacity-0 flex flex-wrap justify-center gap-4">
            <a 
              href="#projects" 
              data-magnetic="true"
              className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-all duration-300"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#resume" 
              data-magnetic="true"
              className="group flex items-center gap-2 px-6 py-3 bg-transparent text-foreground border border-border font-medium rounded-full hover:border-foreground hover:bg-card transition-all duration-300"
            >
              <Download size={18} />
              Download Resume
            </a>
            <a 
              href="#contact" 
              data-magnetic="true"
              className="flex items-center justify-center p-3 text-muted hover:text-foreground border border-transparent hover:border-border rounded-full transition-all duration-300"
              aria-label="Contact"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-muted to-transparent mb-2"></div>
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
      </motion.div>
    </section>
  );
}
