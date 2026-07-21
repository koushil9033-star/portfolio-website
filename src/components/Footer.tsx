import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-foreground text-background">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-background/70 text-sm">
          &copy; {currentYear} Burra Koushil. All rights reserved.
        </div>
        
        <div className="text-background/70 text-sm flex items-center gap-1">
          Designed and built with <span className="text-background font-medium">React + TypeScript</span>
        </div>
        
        <a href="#home" className="text-sm font-medium hover:text-background/70 transition-colors">
          Back to top
        </a>
      </div>
    </footer>
  );
}
