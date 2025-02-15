import { useState, useEffect } from "react";
import { FaCode, FaReact, FaPython, FaNodeJs } from "react-icons/fa";
import { gsap } from "gsap"; // Import GSAP
import { SiMongodb, SiTensorflow } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

const DevCardPopup = ({
  isOpen,
  closePopup,
  name,
  role,
  experience,
  skills,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 10 - 5;
    const y = (clientY / window.innerHeight) * 10 - 5;
    setTilt({ x, y });
  };

  // GSAP Animation Trigger
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".dev-card",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Animate Texts and Icons with delays
      gsap.fromTo(
        ".dev-card h1",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.2, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".dev-card p",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, delay: 0.4, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".dev-card .skills-icons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, delay: 0.6, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20"
      onClick={closePopup}
    >
      <div
        className="dev-card backdr relative w-80 h-48 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-6 rounded-xl shadow-2xl flex flex-col justify-between transform perspective-1000"
        onMouseMove={handleMouseMove}
        style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top section */}
        <div className="flex justify-between items-center" >
          <h1 className="text-lg font-bold hover:text-green-500 hover:-translate-y-2 transition-all duration-500">
            {name}
          </h1>

          <FaCode className="text-2xl  text-yellow-400 hover:-translate-y-2 hover:text-lime-500 transition-all duration-500" />
        
        
        </div>

        <p className="text-sm text-gray-200">
          {role} | {experience} Years
        </p>

        {/* Skills */}
        <div className="flex justify-between">
          <div className="flex space-x-3 mt-2 skills-icons">
            {skills.includes("React") && (
              <FaReact className="text-blue-400 text-xl hover:-translate-y-2 transition-all duration-500" />
            )}
            {skills.includes("Python") && (
              <>
                <FaPython className="text-yellow-400 text-xl hover:-translate-y-2 transition-all duration-500" />
                <SiMongodb className="text-green-400 text-xl hover:-translate-y-2 transition-all duration-500" />
                <RiNextjsFill className="text-white text-xl hover:-translate-y-2 transition-all duration-500" />
                <SiTensorflow className="text-amber-400 text-xl hover:-translate-y-2 transition-all duration-500" />
                <FaNodeJs className="text-green-400 text-xl hover:-translate-y-2 transition-all duration-500" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevCardPopup;
