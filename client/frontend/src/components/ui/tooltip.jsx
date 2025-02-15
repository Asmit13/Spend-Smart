import { useState } from "react";
import { motion } from "framer-motion";

const Tooltip = ({ text, children, position = "right" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center"
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, x: position === "right" ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position === "right" ? 10 : -10 }}
          transition={{ duration: 0.3 }}
          className={`absolute whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg 
                     ${position === "right" ? "left-full ml-2" : "right-full mr-2"}`}>
          <div className={`absolute top-1/2 transform -translate-y-1/2 
                          border-8 border-transparent 
                          ${position === "right" ? "-left-4 border-r-gray-800" : "-right-4 border-l-gray-800"}`}></div>
          {text}
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;
