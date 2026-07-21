import React from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitCommit, GitPullRequest } from 'lucide-react';

export default function GithubStats() {
  return (
    <section id="github" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-4"
        >
          <Github size={40} className="text-foreground" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Open Source
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Stat Cards (Placeholders) */}
          {[
            { label: "Total Commits (2025)", value: "1,248", icon: <GitCommit size={20} /> },
            { label: "Pull Requests", value: "84", icon: <GitPullRequest size={20} /> },
            { label: "Stars Earned", value: "312", icon: <Star size={20} /> },
            { label: "Current Streak", value: "24 Days", icon: <div className="w-5 h-5 rounded-sm bg-accent flex items-center justify-center text-[10px] text-white font-bold">🔥</div> }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col"
            >
              <div className="text-muted mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-foreground mb-1 font-mono">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="w-full bg-card border border-border rounded-2xl p-8 overflow-x-auto"
        >
          <div className="min-w-[800px]">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-lg font-bold text-foreground">Contribution Activity</h3>
              <div className="flex gap-2 text-sm text-muted items-center">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-border"></div>
                <div className="w-3 h-3 rounded-sm bg-accent/30"></div>
                <div className="w-3 h-3 rounded-sm bg-accent/60"></div>
                <div className="w-3 h-3 rounded-sm bg-accent"></div>
                <div className="w-3 h-3 rounded-sm bg-accent-hover"></div>
                <span>More</span>
              </div>
            </div>
            
            {/* Fake Graph Grid */}
            <div className="flex gap-1 justify-between">
              {Array.from({ length: 52 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    const activityLevel = Math.random();
                    let colorClass = "bg-border";
                    if (activityLevel > 0.9) colorClass = "bg-accent-hover";
                    else if (activityLevel > 0.7) colorClass = "bg-accent";
                    else if (activityLevel > 0.5) colorClass = "bg-accent/60";
                    else if (activityLevel > 0.3) colorClass = "bg-accent/30";

                    return (
                      <div 
                        key={`${colIdx}-${rowIdx}`} 
                        className={`w-3 h-3 rounded-[2px] ${colorClass}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
