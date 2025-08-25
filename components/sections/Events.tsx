'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Brain, Cpu, Network, CheckCircle2, AlertCircle } from 'lucide-react';

// ✅ Define Event Type
interface EventType {
  id: number;
  title: string;
  description: string;
  participants: string; // your "date" field (Sept 1, 2025, etc.)
  icon: React.ElementType;
  date: string; // your "time" field
  link: string;
}

// ✅ Events Data
const events: EventType[] = [
  {
    id: 1,
    title: 'NEURO QUEST',
    description: 'A knowledge-driven contest that challenges participants with questions on AI, CS, DS,and GK.',
    participants: 'Sept 1, 2025',
    icon: Brain,
    date: '09:15 AM',
    link: 'quiz', 
  },
  {
    id: 2,
    title: 'WORD HUNT',
    description: 'Hunt – Solve clues, uncover hidden words, and race to find the ultimate treasure of knowledge.',
    participants: 'Sept 2, 2025',
    icon: AlertCircle,
    date: '09:15 AM',
    link: 'word',
  },
  {
    id: 3,
    title: 'IMAGE VERSE',
    description: 'Combine images to create prompts and generate a single AI-powered output.',
    participants: 'Sept 1, 2025',
    icon: CheckCircle2,
    date: '12:30 PM',
    link: 'emoji',
  },
  {
    id: 4,
    title: 'DEBUG-X',
    description: 'A rapid challenge to spot and fix code errors under time pressure.',
    participants: 'Sept 2, 2025',
    icon: Network,
    date: '02:00 PM',
    link: 'bughunt',
  },
  {
    id: 5,
    title: 'WEB CRAFT',
    description: 'Build innovative web apps within a time limit.',
    participants: 'Sept 1, 2025',
    icon: Cpu,
    date: '02:30 PM',
    link: 'web',
  },
];

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;500;700&display=swap');
  
  .orbitron { font-family: 'Orbitron', sans-serif; }
  .inter { font-family: 'Inter', sans-serif; }
  
  .glassmorphism {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .neon-border {
    position: relative;
  }
  .neon-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 18px;
    background: linear-gradient(45deg, #00ffff, #8000ff, #ff00ff);
    background-size: 200% 200%;
    animation: neon-pulse 5s ease-in-out infinite;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }
  .neon-border:hover::before {
    opacity: 0.5;
  }

  .holographic-text {
    background-image: linear-gradient(45deg, #00ffff, #ff00ff, #8000ff, #ff00ff, #00ffff);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: holographic-shift 8s linear infinite;
  }

  @keyframes holographic-shift {
    to { background-position: 200% center; }
  }

  .pulse-glow {
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3), 0 0 15px rgba(0, 255, 255, 0.2);
    animation: pulse-glow-animation 2s infinite ease-in-out;
  }
  @keyframes pulse-glow-animation {
    0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3), 0 0 15px rgba(0, 255, 255, 0.2); }
    50% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3); }
  }

  .gradient-text {
    background-image: linear-gradient(45deg, #00ffff, #8000ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

// ✅ Typed EventCard
const EventCard = ({ event }: { event: EventType }) => {
  const Icon = event.icon;
  
  return (
    <motion.div
      className="glassmorphism rounded-2xl p-6 neon-border group hover:scale-[1.02] transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden"
      whileHover={{ y: -5 }}
      layout
    >
      {/* Icon and Title */}
      <div className="text-center space-y-4">
        <motion.div
          className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Icon className="w-8 h-8 text-cyan-400" />
        </motion.div>
        
        <h3 className="text-2xl font-bold orbitron gradient-text group-hover:text-cyan-400 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed inter">
          {event.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="flex justify-center gap-6 text-center pt-4 border-t border-gray-700 mt-auto">
        <div className="space-y-1">
          <Calendar className="w-5 h-5 text-cyan-400 mx-auto" />
          <div className="text-cyan-400 font-semibold text-sm inter">{event.participants}</div>
          <div className="text-gray-400 text-xs inter">Date</div>
        </div>
        
        <div className="space-y-1">
          <Clock className="w-5 h-5 text-purple-400 mx-auto" />
          <div className="text-purple-400 font-semibold text-sm inter">{event.date}</div>
          <div className="text-gray-400 text-xs inter">Time</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4">
        <Link href={event.link} passHref legacyBehavior>
          <motion.a
            className="block py-3 px-4 rounded-lg font-semibold text-sm text-center transition-all duration-300 inter bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-cyan-500/30 pulse-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JOIN NOW
          </motion.a>
        </Link>
      </div>
    </motion.div>
  );
};

const App = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <>
      <style>{customStyles}</style>
      <section id="events" className="relative min-h-screen py-20 overflow-hidden bg-[#0a041a] text-white inter">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-blue-900/50" />
        <div className="absolute inset-0 z-0 opacity-80" style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(128,0,255,0.1) 0%, transparent 70%)', filter: 'blur(5px)' }} />

        {/* Floating Hexagonal Patterns */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 border border-purple-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div ref={ref} className="relative z-10 container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold orbitron holographic-text mb-6"
              animate={isInView ? {
                textShadow: [
                  '0 0 20px rgba(128, 0, 255, 0.5)',
                  '0 0 40px rgba(0, 255, 255, 0.8)',
                  '0 0 20px rgba(128, 0, 255, 0.5)',
                ],
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Technical Events
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto inter"
            >
              Compete in cutting-edge AI challenges and showcase your skills<br />
              <strong>Note:- </strong>Each participant may join up to 2 competitions.
            </motion.p>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="text-center mt-16"
          >
            <div className="glassmorphism rounded-2xl p-8 max-w-2xl mx-auto neon-border inter">
              <Network className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold orbitron gradient-text mb-4">Ready to Compete?</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join thousands of AI enthusiasts and showcase your skills in these exciting challenges.
                Network with industry experts and win amazing prizes!
              </p>
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-400/30 rounded-full font-semibold hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 pulse-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                REGISTER FOR EVENTS
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default App;
