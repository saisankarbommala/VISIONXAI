'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const speakers = [
  {
    id: 3,
    name: 'Dr. N SESHA REDDY',
    title: 'Chairman',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWBTsghQUxGvrLEaKP-Am3fwUzjYEIGisgTUHauBTFBkmgYYId9r1Jr9P49YeK7G_y4s&usqp=CAU',
  },
  {
    id: 4,
    name: 'Dr. N SUGUNA REDDY',
    title: 'Secretary',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQGD3WiNukBWsg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1715861894258?e=2147483647&v=beta&t=TVdh_VSI-IDbFI4kwnJlo4DMEy7xWRneWXJveG3pYRc',
  },
  {
    id: 5,
    name: 'Dr. B E V L NAIDU',
    title: 'Academic Director',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_mi2yHb0a-AWkc0h2mno-BeII_EIZUw2rD-08nYE_pZIMq6=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: 6,
    name: 'U SIDDHARTHA REDDY',
    title: 'Dean Of AI',
    image: '/dean.JPG'
  },
  {
    id:7 ,
    name: 'P PRADEEP KUMAR',
    title: 'Principal-(AWDCGWK)',
    image: '/pradeep.JPG'
  },
  {
    id: 8,
    name: 'M SATYA PRAKASH',
    title: 'Principal-(ADCGWK)',
    image: '/SPSIR.JPG'
  },
  {
    id: 9,
    name: 'R V R PATRUDU',
    title: 'Vice Principal',
    image: '/patru.jpg',
  },
  {
    id: 10,
    name: 'T SAI RATNAM',
    title: 'HOD OF AI',
    image: '/SAIRATNAM.jpg',
  },
];

const chiefGuest = {
  id: 1,
  name: 'CHEIF GUEST',
  title: 'Founder & CEO',
  company: 'VisionX Technologies',
  image: '',
  description: "A visionary leader in Artificial Intelligence, known for pioneering innovations at VisionX Technologies. His expertise and journey inspire the next generation of technologists."
};

// Interactive Magnifier
const InteractiveMagnifier = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, visible: false });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y, visible: true });
    }
  };

  const handleMouseLeave = () => {
    setPosition(prev => ({ ...prev, visible: false }));
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 rounded-full w-full h-full cursor-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          left: position.x,
          top: position.y,
          opacity: position.visible ? 1 : 0,
          boxShadow: '0 0 15px #22d3ee, 0 0 25px #a855f7, inset 0 0 10px rgba(168,85,247,0.5)',
          background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(168,85,247,0) 70%)',
          pointerEvents: 'none',
        }}
        animate={{
          scale: position.visible ? [1, 1.2, 1] : 0,
          opacity: position.visible ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  );
};

// Main Speaker Card
const MainSpeakerCard = ({ speaker }) => {
  return (
    <motion.div
      key={speaker.id}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="glassmorphism p-8 rounded-2xl cinematic-border-glow cinematic-transition flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8"
    >
      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        {/* Neon Glow Aura */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 0, 128, 0.4)",
              "0 0 40px rgba(168, 85, 247, 0.7)",
              "0 0 60px rgba(34, 211, 238, 0.6)"
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Coin Roll Effect with Front & Back Faces */}
        <motion.div
          className="absolute w-full h-full rounded-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 180, 360], y: [0, -10, 0] }}
          transition={{
            rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          }}
        >
          {/* Front */}
          <img
            src={speaker.image}
            alt={speaker.name}
            className="absolute w-full h-full object-cover rounded-full border-4 border-fuchsia-400/50"
            style={{ backfaceVisibility: "hidden" }}
          />
          {/* Back (mirrored) */}
          <img
            src={speaker.image}
            alt={speaker.name}
            className="absolute w-full h-full object-cover rounded-full border-4 border-fuchsia-400/50"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          />
        </motion.div>

        <InteractiveMagnifier />
      </motion.div>

      <div className="space-y-4 text-center md:text-left flex-grow">
        <h3 className="text-3xl font-bold text-white orbitron gradient-text-holographic">
          {speaker.name}
        </h3>
        <p className="text-lg text-fuchsia-300 font-medium">{speaker.title}</p>
        <p className="text-gray-400 text-sm italic">{speaker.company}</p>
      </div>
    </motion.div>
  );
};

// Chief Guest Card
const ChiefGuestCard = ({ guest }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.5 }}
      className="glassmorphism p-12 rounded-3xl neon-border-pulse-chief cinematic-transition 
                 flex flex-col items-center text-center max-w-3xl mx-auto my-20 relative overflow-hidden"
    >
      <h2 className="text-5xl md:text-6xl font-bold orbitron bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 
                     bg-clip-text text-transparent drop-shadow-lg mb-10">
        CHIEF GUEST
      </h2>

      <motion.div className="relative w-72 h-72 md:w-80 md:h-80 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: '0 0 40px #22d3ee, 0 0 80px #a855f7, 0 0 120px #6366f1',
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.img
          src={guest.image}
          alt={guest.name}
          className="w-full h-full object-cover rounded-full border-4 border-cyan-400/60"
          style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.9)' }}
          initial={{ scale: 0.9 }}
          animate={{ scale: [1, 1.05, 1], y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </motion.div>

      <div className="space-y-3 px-4">
        <h3 className="text-4xl font-extrabold text-cyan-300 orbitron tracking-wide">
          {guest.name}
        </h3>
        <p className="text-xl text-fuchsia-400 font-semibold">{guest.title}</p>
        <p className="text-lg text-indigo-300 italic">{guest.company}</p>
        <p className="mt-4 text-gray-300 text-md leading-relaxed max-w-2xl mx-auto">
          {guest.description}
        </p>
      </div>
    </motion.div>
  );
};

// Speaker List Item
const SpeakerListItem = ({ speaker, onClick, isActive, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, x: 10 }}
      className={`glassmorphism p-4 rounded-xl cursor-pointer cinematic-transition mb-4 ${
        isActive ? 'neon-border-pulse border-fuchsia-400' : 'neon-border-static'
      }`}
      onClick={() => onClick(speaker.id)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover rounded-full border border-fuchsia-400/50"
          />
        </div>
        <div>
          <h4 className={`text-md font-bold ${isActive ? 'text-cyan-400' : 'text-white'}`}>
            {speaker.name}
          </h4>
          <p className="text-sm text-gray-400">{speaker.title}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Speakers Section
const Speakers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedSpeakerId, setSelectedSpeakerId] = useState(speakers[0].id);
  const selectedSpeaker = speakers.find(s => s.id === selectedSpeakerId);
  const totalSpeakers = speakers.length;

  useEffect(() => {
    if (!isInView) return;
    const intervalId = setInterval(() => {
      setSelectedSpeakerId(prevId => {
        const currentIndex = speakers.findIndex(s => s.id === prevId);
        const nextIndex = (currentIndex + 1) % totalSpeakers;
        return speakers[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isInView, totalSpeakers]);

  return (
    <section id="speakers" className="relative min-h-screen py-20 overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-blue-950" />

      <div ref={ref} className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold orbitron holographic-text mb-6">
            OUR VISIONARIES
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the visionaries and experts who will share their insights on the future of AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <MainSpeakerCard key={selectedSpeaker?.id} speaker={selectedSpeaker} />
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            {speakers.map((speaker, index) => (
              <SpeakerListItem
                key={speaker.id}
                speaker={speaker}
                onClick={setSelectedSpeakerId}
                isActive={selectedSpeakerId === speaker.id}
                delay={index}
              />
            ))}
          </div>
        </motion.div>

        <ChiefGuestCard guest={chiefGuest} />
      </div>
    </section>
  );
};

export default Speakers;