"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import visionxLogo from "@/public/UPDATED_LOGO.jpg";

const cinematicText = "Welcome to VisionX AI Tech Fest 2025";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showExit, setShowExit] = useState(false);
  const [spoken, setSpoken] = useState(false);
  const [particleCount, setParticleCount] = useState(100);

  // ✅ Safe particle count (no SSR mismatch)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setParticleCount(window.innerWidth < 640 ? 40 : 100);
    }
  }, []);

  // ✅ Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowExit(true), 800);
          return 100;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // ✅ Background Voice
  useEffect(() => {
    if (progress > 5 && !spoken && typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpoken(true);

      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(cinematicText);
        utterance.lang = "en-US";
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.volume = 0.9;

        // Pick a voice if available
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          utterance.voice = voices.find(v => v.lang === "en-US") || voices[0];
        }

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      };

      // Some browsers load voices async
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = speak;
      } else {
        speak();
      }
    }

    if (showExit) {
      setTimeout(onComplete, 1000);
    }

    return () => {
      if ("speechSynthesis" in window) speechSynthesis.cancel();
    };
  }, [progress, spoken, showExit, onComplete]);

  return (
    <AnimatePresence>
      {!showExit && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-black to-blue-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 1 } }}
        >
          {/* Background waves */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10"
                animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ filter: "blur(100px)" }}
              />
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: particleCount }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: Math.random() > 0.5 ? "#00f5ff" : "#ff00ff",
                }}
                animate={{
                  y: [0, Math.random() * 60 - 30, 0],
                  x: [0, Math.random() * 60 - 30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Logo & Effects */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Neon Aura */}
            <motion.div
              className="absolute -inset-16 sm:-inset-20 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,245,255,0.4), transparent)",
                filter: "blur(40px)",
              }}
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating Halo */}
            <motion.div
              className="absolute -inset-24 sm:-inset-28 border-2 sm:border-4 border-cyan-400/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ boxShadow: "0 0 30px #00f5ff80" }}
            />

            {/* Logo */}
            <motion.div
              className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/40 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_60px_#00f5ff90]"
              animate={{
                y: [0, -3, 0],
                filter: [
                  "drop-shadow(0 0 10px rgba(0,245,255,0.7))",
                  "drop-shadow(0 0 20px rgba(255,0,255,0.7))",
                  "drop-shadow(0 0 10px rgba(0,245,255,0.7))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={visionxLogo}
                alt="VISION AI Logo"
                width={300}
                height={300}
                priority
                className="rounded-xl w-48 h-48 sm:w-[300px] sm:h-[300px]"
              />
              {/* Light Sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ mixBlendMode: "screen" }}
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="mt-4 sm:mt-6 text-2xl sm:text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg text-center"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              DEPARTMENT OF ARTIFICIAL INTELLIGENCE
            </motion.h1>

            {/* Progress */}
            <motion.p
              className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
