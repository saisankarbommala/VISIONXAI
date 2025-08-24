import React from 'react';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MapPinned from 'lucide-react/dist/esm/icons/map-pinned';

// The HomePage component containing the website content
const HomePage = () => {
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

    .glowing-box {
      position: relative;
      border: 1px solid rgba(0, 255, 255, 0.2);
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.2), inset 0 0 10px rgba(0, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    .glowing-box:hover {
      box-shadow: 0 0 25px rgba(0, 255, 255, 0.4), inset 0 0 15px rgba(0, 255, 255, 0.2);
      transform: translateY(-5px);
    }

    /* New CSS animations to replace framer-motion */
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in-up {
      animation: fade-in-up 0.8s ease-out forwards;
      opacity: 0; /* Ensures element is invisible before animation starts */
    }

    @keyframes fade-in-right {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .fade-in-right {
      animation: fade-in-right 0.8s ease-out forwards;
      opacity: 0;
    }

    @keyframes scale-in {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .scale-in {
      animation: scale-in 0.8s ease-out forwards;
      opacity: 0;
    }
  `;

  return (
    <>
      {/* This style tag uses dangerouslySetInnerHTML to prevent a hydration error.
        This is a common workaround when the server-rendered and client-rendered
        style content might not perfectly match.
      */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="bg-[#0a041a] text-white min-h-screen py-16 px-4 inter">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Header Section */}
          <div
            className="fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold orbitron holographic-text">
              BUG-HUNT Competition 2025
            </h1>
            
            {/* Enhanced Date & Location Section */}
            <div className="flex justify-center mt-6">
              <div 
                className="glassmorphism rounded-full px-6 py-3 flex items-center gap-6 text-sm md:text-base text-gray-300 glowing-box fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="font-medium">2 Sept 2025 – 2:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">Aditya Degree College (co-ed) Gajuwaka</span>
                </div>
              </div>
            </div>
            
            <p className="mt-8 text-lg text-gray-300">
              Challenge your intellect, compete for glory, and win a grand prize.
            </p>
          </div>

          <div className="mt-16 glassmorphism rounded-2xl p-6 md:p-10 space-y-8">
            {/* Official Guidelines Section */}
            <div>
              <h2
                className="text-3xl font-bold text-cyan-400 text-left orbitron fade-in-right"
                style={{ animationDelay: '0.6s' }}
              >
                Official Guidelines
              </h2>
              <p className="text-gray-300 text-sm md:text-base text-left mt-2">
                Please review the following rules and regulations to ensure a smooth registration and participation process.
              </p>
            </div>

            {/* Team Composition Section */}
            <div
              className="space-y-4 text-left fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              <h3 className="text-xl font-bold text-purple-400">Team Composition</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>Teams must consist of maximum <strong>three (3)</strong>  members.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>Each team must appoint a <strong>Team Leader</strong> who will be the primary point of contact for all communication</span>
                </li>
              </ul>
            </div>

            {/* Registration Process Section */}
            <div
              className="space-y-4 text-left fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              <h3 className="text-xl font-bold text-purple-400">Registration Process</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>The <strong>Team Leader</strong> is solely responsible for registering the entire team.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>The Team Leader is responsible for registering the entire team (all team members including themselves).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>Only <strong>one registration form per team</strong> should be submitted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>Each team can register only once. Once registered, teams cannot be changed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>The registration window will be open for <strong>4 days only</strong>. Late submissions will not be accepted under any circumstances.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>Participation is considered confirmed only upon successful registration.</span>
                </li>
              </ul>
            </div>

            {/* Participation Protocol Section */}
            <div
              className="space-y-4 text-left fade-in-up"
              style={{ animationDelay: '1.2s' }}
            >
              <h3 className="text-xl font-bold text-purple-400">Participation Protocol</h3>
              <ul className="space-y-2 text-gray-300">
                 
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>All participants are required to carry a valid college ID card for verification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>Teams must report to the venue at least **30 minutes prior** to the scheduled start time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>Punctuality is essential. Late arrivals may be subject to disqualification.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">★</span>
                  <span>A detailed overview of the competition format, rounds, and scoring will be provided at the event venue.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Registration Button */}
          <div
            className="mt-16 scale-in"
            style={{ animationDelay: '1.4s' }}
          >
            <a
              href="https://forms.gle/HBso9StNt34hdtFw9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-400/30 rounded-full font-semibold hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 pulse-glow"
            >
              Register Your Team
            </a>
          </div>
          
          {/* Enhanced Contact Section */}
          <div
            className="mt-20 text-center fade-in-up"
            style={{ animationDelay: '1.6s' }}
          >
            <h2 className="text-4xl md:text-5xl font-bold orbitron holographic-text mb-8">
              Contact Us
            </h2>
            <p className="text-gray-300 mb-10">
              Get in touch with us for event registration, partnership opportunities, or any questions about QUIZ 2025.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm md:text-base">
              
              {/* Email Card */}
              <div className="glassmorphism rounded-2xl p-6 space-y-2 glowing-box">
                <div className="bg-white/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-bold text-gray-300">Email Us</h3>
                <p className="text-purple-300 break-words">visions.adc25@gmail.com</p>
                <p className="text-gray-500 text-xs mt-2">General Inquiries & Registration</p>
              </div>

              {/* Phone Card */}
              <div className="glassmorphism rounded-2xl p-6 space-y-2 glowing-box">
                <div className="bg-white/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <Phone className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-bold text-gray-300">Call Us</h3>
                <p className="text-cyan-300">+91 85007 08626</p>
                <p className="text-cyan-300">+91 84998 59036</p>
                <p className="text-gray-500 text-xs mt-2">Event Coordination & Support</p>
              </div>
              
              {/* Venue Card */}
              <div className="glassmorphism rounded-2xl p-6 space-y-2 glowing-box">
                <div className="bg-white/10 rounded-full p-3 w-fit mx-auto mb-2">
                  <MapPinned className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="font-bold text-gray-300">Visit Us</h3>
                <p className="text-yellow-300">Aditya Degree College, Gajuwaka</p>
                <p className="text-yellow-300">Visakhapatnam, Andhra Pradesh, India</p>
                <p className="text-gray-500 text-xs mt-2">Event Location</p>
              </div>
            </div>
          </div>

          <p className="mt-16 text-xs text-gray-500">© 2025 Quiz Competition. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

// Main App component to render the HomePage
const App = () => {
  return <HomePage />;
};

export default App;
