"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Brain,
  Network,
  Cpu,
  AlertCircle,
  CheckCircle2,
  LucideIcon
} from "lucide-react";

// ✅ Type Definition for an Event
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  icon: LucideIcon;
  link: string;
}

// ✅ Events Data (no change needed here, it's the data source)
const events: Event[] = [
  {
    id: 1,
    title: "Quiz",
    description:
      "A knowledge-driven contest that challenges participants with questions on AI, CS, DS, and GK.",
    date: "Sept 1, 2025",
    time: "9:15 AM",
    icon: Brain,
    link: "/quiz",
  },
  {
    id: 2,
    title: "Word - Treasure Hunt",
    description:
      "Hunt – Solve clues, uncover hidden words, and race to find the ultimate treasure of knowledge.",
    date: "Sept 2, 2025",
    time: "9:15 AM",
    icon: AlertCircle,
    link: "/word",
  },
  {
    id: 3,
    title: "Emoji- Prompt",
    description:
      "Combine images to create prompts and generate a single AI-powered output.",
    date: "Sept, 2025",
    time: "–––",
    icon: CheckCircle2,
    link: "/emoji",
  },
  {
    id: 4,
    title: "Bug Hunt",
    description: "A rapid challenge to spot and fix code errors under time pressure.",
    date: "March 16, 2025",
    time: "–––",
    icon: Network,
    link: "/bughunt",
  },
  {
    id: 5,
    title: "Web Task Builder",
    description: "Build innovative web apps within a time limit.",
    date: "Sept 2, 2025",
    time: "–––",
    icon: Cpu,
    link: "/web",
  },
];

const JoinButton = ({ href }: { href: string }) => (
  <Link href={href} passHref legacyBehavior>
    <motion.a
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="block w-full py-3 px-4 rounded-lg font-semibold text-sm text-center 
                  bg-gradient-to-r from-green-500/20 to-cyan-500/20 
                  text-green-400 border border-green-500/30 
                  hover:from-green-500/30 hover:to-cyan-500/30 pulse-glow"
    >
      JOIN NOW
    </motion.a>
  </Link>
);


// ✅ Corrected EventCard Component with TypeScript prop type
const EventCard = ({ event }: { event: Event }) => {
  const Icon = event.icon;

  return (
    <motion.div
      className="glassmorphism rounded-2xl p-6 neon-border group 
                  hover:scale-[1.02] transition-all duration-300 
                  flex flex-col justify-between relative overflow-hidden"
      whileHover={{ y: -5 }}
      layout
    >
      {/* Icon and Title */}
      <div className="text-center space-y-4">
        <motion.div
          className="mx-auto w-16 h-16 flex items-center justify-center 
                      rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 
                      border border-cyan-400/30"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Icon className="w-8 h-8 text-cyan-400" />
        </motion.div>

        <h3 className="text-2xl font-bold orbitron gradient-text">
          {event.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed inter">
          {event.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="flex justify-center gap-6 text-center pt-4 border-t border-gray-700 mt-4">
        <div>
          <Calendar className="w-5 h-5 text-cyan-400 mx-auto" />
          <div className="text-cyan-400 font-semibold text-sm inter">
            {event.date}
          </div>
          <div className="text-gray-400 text-xs">Date</div>
        </div>
        <div>
          <Clock className="w-5 h-5 text-purple-400 mx-auto" />
          <div className="text-purple-400 font-semibold text-sm inter">
            {event.time}
          </div>
          <div className="text-gray-400 text-xs">Time</div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <JoinButton href={event.link} />
      </div>
    </motion.div>
  );
};

const App = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen py-20 bg-[#0a041a] text-white inter overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-blue-900/50" />

      <div ref={ref} className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold orbitron holographic-text mb-6">
            Technical Events
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto inter">
            Compete in cutting-edge AI challenges and showcase your skills <br />
            <span className="font-bold text-purple-400">Note:-</span> Each participant may join up to 2 competitions.
          </p>
        </motion.div>

        {/* Events */}
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
            <h3 className="text-3xl font-bold orbitron gradient-text mb-4">
              Ready to Compete?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of AI enthusiasts and showcase your skills in these exciting challenges.  
              Network with industry experts and win amazing prizes!
            </p>
            <Link href="/register" passHref legacyBehavior>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 
                            text-cyan-400 border border-cyan-400/30 
                            rounded-full font-semibold 
                            hover:from-cyan-500/30 hover:to-purple-500/30 pulse-glow"
              >
                REGISTER FOR EVENTS
              </motion.a>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default App;