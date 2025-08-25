"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown, Brain, Cpu, Network } from "lucide-react";

// ✅ Allow <marquee> in TSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        behavior?: string;
        direction?: string;
        scrollAmount?: number;
      };
    }
  }
}

// ✅ Custom hook to track viewport
const useViewportSize = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run once
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

// ✅ 3D Bubble Background
const ThreeDBubbleBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { isMobile, isTablet } = useViewportSize();

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points<
      THREE.BufferGeometry,
      THREE.ShaderMaterial
    >;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Particle count based on device
    const particleCount = isMobile ? 500 : isTablet ? 1000 : 2000;

    // Scene + Camera + Renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const sizes: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
      sizes.push(Math.random() * 25);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    // Material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: {
          value: new THREE.TextureLoader().load(
            "https://threejs.org/examples/textures/sprites/circle.png"
          ),
        },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = vec3(1.0, 1.0, 1.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform sampler2D pointTexture;
        void main() {
          gl_FragColor = vec4(vColor, texture2D(pointTexture, gl_PointCoord).a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 100;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.005;
      particles.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    // Resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (currentMount) currentMount.removeChild(renderer.domElement);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isMobile, isTablet]);

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

// ✅ Main Hero Section
const App: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black min-h-screen">
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#12042f] via-[#0b0c2e] to-[#04040f]" />

        {/* 3D Bubbles */}
        <ThreeDBubbleBackground />

        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-20 text-cyan-400/30 hidden md:block"
          animate={{ rotate: 360, y: [0, 20, 0] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            y: { duration: 5, repeat: Infinity },
          }}
        >
          <Brain size={60} />
        </motion.div>

        <motion.div
          className="absolute top-40 right-32 text-purple-400/30 hidden md:block"
          animate={{ rotate: -360, y: [-10, 10, -10] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity },
          }}
        >
          <Cpu size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-32 text-pink-400/30 hidden md:block"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity },
          }}
        >
          <Network size={50} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-6 md:space-y-8"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white"
              animate={{
                textShadow: [
                  "0 0 10px rgba(0, 245, 255, 0.5)",
                  "0 0 20px rgba(255, 0, 255, 0.8)",
                  "0 0 30px rgba(0, 245, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              VISIONX AI
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
            >
              2025
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-xl md:text-3xl text-white font-semibold"
            >
              Igniting The Future Of Intelligence
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
              className="text-lg md:text-xl text-gray-300 font-light tracking-widest max-w-4xl mx-auto leading-relaxed"
            >
              Innovation • Culture • Future
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-md md:text-lg text-gray-400 tracking-wide max-w-3xl mx-auto"
            >
              Welcome to the future of innovation, where technology meets
              culture in an unprecedented celebration of human creativity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="pt-8"
            >
              <motion.button
                className="relative px-12 py-4 text-xl font-bold text-white rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToAbout}
                style={{
                  boxShadow:
                    "0 0 15px rgba(0, 245, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.5)",
                  backgroundImage: "linear-gradient(45deg, #00f5ff, #ff00ff)",
                  backgroundSize: "200% 200%",
                  animation: "button-glow 5s ease infinite",
                }}
              >
                <span className="relative z-10">ENTER THE FUTURE</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer"
          onClick={scrollToAbout}
        >
          <span className="text-cyan-300 text-sm tracking-widest">
            EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 rounded-full border border-cyan-400/50 hover:border-cyan-400 transition-colors"
          >
            <ChevronDown className="text-cyan-400" size={24} />
          </motion.div>
        </motion.div>

        {/* Footer info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm text-center py-2 px-4 text-xs md:text-sm text-gray-400 tracking-wide z-20"
        >
          <marquee behavior="scroll" direction="left" scrollAmount={5}>
            REGISTRATION'S OPEN NOW • 5 PARTICIPATING INSTITUTIONS • VISION X
            AI • JOIN THE REVOLUTION
          </marquee>
        </motion.div>

        {/* Holographic Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>

        <style jsx>{`
          @keyframes button-glow {
            0% {
              box-shadow: 0 0 15px rgba(0, 245, 255, 0.5),
                0 0 30px rgba(255, 0, 255, 0.5);
              background-position: 0% 50%;
            }
            50% {
              box-shadow: 0 0 30px rgba(0, 245, 255, 0.8),
                0 0 60px rgba(255, 0, 255, 0.8);
              background-position: 100% 50%;
            }
            100% {
              box-shadow: 0 0 15px rgba(0, 245, 255, 0.5),
                0 0 30px rgba(255, 0, 255, 0.5);
              background-position: 0% 50%;
            }
          }
          @keyframes grid-move {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 50px 50px;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default App;
