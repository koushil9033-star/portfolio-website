import React, { useState } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';
import { Github, Linkedin, Instagram, Mail, Send } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={24} />,
  linkedin: <Linkedin size={24} />,
  instagram: <Instagram size={24} />,
  mail: <Mail size={24} />,
};

export default function Contact() {
  const { contact, socials } = portfolioData;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formState);
    setFormState({ name: '', email: '', message: '' });
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <section id="contact" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight tracking-tight mb-8">
              Let's create <br className="hidden md:block" />something together.
            </h2>
            <p className="text-xl text-muted max-w-md leading-relaxed font-serif mb-12">
              {contact.message}
            </p>
            
            <div className="flex gap-4">
              {socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  aria-label={social.name}
                >
                  {iconMap[social.icon]}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-background border border-border rounded-3xl p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-8">Send a message</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-border text-foreground focus:ring-0 focus:border-foreground placeholder-transparent peer"
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-4 text-muted text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-foreground peer-valid:top-0 peer-valid:text-xs"
                  >
                    Your Name
                  </label>
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-border text-foreground focus:ring-0 focus:border-foreground placeholder-transparent peer"
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-4 text-muted text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-foreground peer-valid:top-0 peer-valid:text-xs"
                  >
                    Email Address
                  </label>
                </div>
                
                <div className="relative">
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-border text-foreground focus:ring-0 focus:border-foreground placeholder-transparent peer resize-none"
                    placeholder="Message"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-4 text-muted text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-foreground peer-valid:top-0 peer-valid:text-xs"
                  >
                    Project details or message
                  </label>
                </div>
              </div>
              
              <button 
                type="submit"
                className="mt-10 group flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background font-medium rounded-xl hover:bg-foreground/90 transition-all duration-300"
              >
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
