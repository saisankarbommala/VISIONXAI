'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import ParticleBackground from '../ParticleBackground';

// A helper component to handle the background particles
// Note: ParticleBackground is assumed to be a separate component that you have.
const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background with a gradient and a Particle effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/50 to-blue-900/50" />
      {/* Ensure you have this component imported and available */}
      <ParticleBackground density={60} color="#ff00ff" />

      {/* Main content container */}
      <div ref={ref} className="relative z-10 container mx-auto px-4">
        {/* Section Title with animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold orbitron holographic-text mb-6"
            animate={isInView ? {
              textShadow: [
                '0 0 20px rgba(0, 245, 255, 0.5)',
                '0 0 40px rgba(255, 0, 255, 0.8)',
                '0 0 20px rgba(0, 245, 255, 0.5)',
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            About VISIONX AI
          </motion.h2>

          {/* Subheading with a glowing effect */}
          <motion.h3
            className="text-xl md:text-2xl font-semibold orbitron tracking-widest text-cyan-300 mb-8"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 10px rgba(0, 245, 255, 0.7)',
                  '0 0 20px rgba(255, 0, 255, 0.7)',
                  '0 0 10px rgba(0, 245, 255, 0.7)',
                ],
                color: ['#67e8f9', '#c084fc', '#67e8f9'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              DEPARTMENT OF ARTIFICIAL INTELLIGENCE
            </motion.span>
          </motion.h3>

          {/* Animated divider line */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Content Cards container */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Left Card with a fixed image and a rotating glow effect */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="glassmorphism rounded-3xl p-8 neon-border group hover:scale-105 transition-transform duration-300 flex justify-center items-center"
          >
            <div className="relative mx-auto w-72 h-72 flex items-center justify-center">
              {/* This motion.div creates the rotating glow ring */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* This is the static image. We've removed its motion and added a subtle border for better visibility. */}
              {/* IMPORTANT: Use a high-quality, professional logo file in your public directory. */}
              <img
                src="/POSTER_VISION_X.png"
                alt="VISIONX AI Logo"
                className="w-full h-full]"
              />
            </div>
          </motion.div>

          {/* Right Card with event details */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="glassmorphism rounded-3xl p-8 neon-border group hover:scale-105 transition-transform duration-300"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="text-cyan-400 w-8 h-8" />
                <h3 className="text-2xl font-bold orbitron gradient-text">Event Details</h3>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Join us for the most anticipated <span className="text-cyan-400 font-semibold">Artificial Intelligence</span> festival 
                  of 2025, where cutting-edge technology meets innovative minds.
                </p>    
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-cyan-400/10 rounded-xl border border-cyan-400/20">
                    <div className="text-2xl font-bold text-cyan-400">50+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-purple-400/10 rounded-xl border border-purple-400/20">
                    <div className="text-2xl font-bold text-purple-400">10+</div>
                    <div className="text-sm text-gray-400">Competitions</div>
                  </div>
                </div>
              </div>
              
              <motion.div
                className="pt-4 border-t border-gray-600"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(0, 245, 255, 0.2)',
                    '0 0 20px rgba(255, 0, 255, 0.2)',
                    '0 0 10px rgba(0, 245, 255, 0.2)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-center text-cyan-300 font-semibold tracking-wider">
                  <span className="gradient-text">WHERE VISION BECOMES INTELLIGENCE</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements for visual effect */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-cyan-400/20 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 border border-purple-400/20 rounded-full"
        animate={{ rotate: -360, y: [-10, 10, -10] }}
        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity } }}
      />
    </section>
  );
};

export default About;
