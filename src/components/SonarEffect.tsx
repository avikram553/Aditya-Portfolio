import { motion } from "framer-motion";

export const SonarEffect = () => {
  // Heartbeat pattern: two pulses (lub-dub) then pause
  // Reduced number of rings and optimized for performance
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* First heartbeat pulse (lub) - reduced to 4 rings for better performance */}
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={`beat1-${index}`}
          className="absolute rounded-full border border-foreground/20"
          style={{
            // Use transform for GPU acceleration
            willChange: "transform, opacity",
            width: "1200px",
            height: "1200px",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 2],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 1.2,
            delay: index * 0.15,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Second heartbeat pulse (dub) - reduced to 4 rings */}
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={`beat2-${index}`}
          className="absolute rounded-full border border-foreground/15"
          style={{
            // Use transform for GPU acceleration
            willChange: "transform, opacity",
            width: "1200px",
            height: "1200px",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 2],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 1.2,
            delay: 0.6 + index * 0.15, // Second beat starts after 0.6s
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
