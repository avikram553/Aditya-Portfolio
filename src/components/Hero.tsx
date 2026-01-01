import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Hero.module.css";
import { SonarEffect } from "./SonarEffect";
export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<
    | "typing-name"
    | "fading-name"
    | "typing-badminton"
    | "fading-badminton"
    | "typing-code"
    | "fading-code"
    | "typing-coffee"
    | "fading-coffee"
  >("typing-name");

  const fullName = "Hallo, Ich bin Aditya";
  const badmintonText = "I like playing 🏸";
  const codeText = "I_like_to_code.py";
  const coffeeText = "And I am addicted to ☕";
  const highlightName = "Aditya";
  const nameStart = fullName.indexOf(highlightName);
 
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFadingOutRef = useRef(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle text erasure and next phase
  const startErasing = useCallback(
    (nextPhase: "typing-badminton" | "typing-code" | "typing-coffee" | "typing-name") => {
    cleanup();
    const chars = Array.from(displayText); // code-point aware split
    let currentIndex = chars.length;

    const eraseInterval = setInterval(() => {
      if (currentIndex > 0) {
        // remove one grapheme at a time
        setDisplayText(chars.slice(0, currentIndex - 1).join(""));
        currentIndex--;
      } else {
        clearInterval(eraseInterval);
        setDisplayText("");
        isFadingOutRef.current = false;
        // advance to next phase
        setPhase(nextPhase);
      }
    }, 50); // Erase one grapheme every 50ms

    intervalRef.current = eraseInterval;
  }, [cleanup, displayText]);

  // Update fade ref when phase changes and trigger erasing for fading states
  useEffect(() => {
    if (
      phase === "fading-name" ||
      phase === "fading-badminton" ||
      phase === "fading-code" ||
      phase === "fading-coffee"
    ) {
      isFadingOutRef.current = true;
      startErasing(
        phase === "fading-name" ? "typing-badminton" :
        phase === "fading-badminton" ? "typing-code" :
        phase === "fading-code" ? "typing-coffee" : "typing-name"
      );
    }
  }, [phase, startErasing]);

  // Typing animation function
  const startTyping = useCallback((text: string, onComplete: () => void, speed: number = 100) => {
    cleanup();
    const chars = Array.from(text); // handle emojis properly
    let currentIndex = 0;
    intervalRef.current = setInterval(() => {
      if (currentIndex < chars.length) {
        setDisplayText(chars.slice(0, currentIndex + 1).join(""));
        currentIndex++;
      } else {
        cleanup();
        timeoutRef.current = setTimeout(onComplete, 1500);
      }
    }, speed);
  }, [cleanup]);

  useEffect(() => {
    // Phase 1: Type name quickly
    if (phase === "typing-name") {
      startTyping(fullName, () => setPhase("fading-name"), 80);
      return cleanup;
    }

    // Phase 2: Fade away name - handled by eraser
    if (phase === "fading-name") {
      return cleanup;
    }

    // Phase 3: Type badminton text
    if (phase === "typing-badminton") {
      startTyping(badmintonText, () => setPhase("fading-badminton"), 100);
      return cleanup;
    }

    // Phase 4: Fade away badminton - handled by eraser
    if (phase === "fading-badminton") {
      return cleanup;
    }

    // Phase 5: Type code text
    if (phase === "typing-code") {
      startTyping(codeText, () => setPhase("fading-code"), 100);
      return cleanup;
    }

    // Phase 6: Fade away code - handled by eraser
    if (phase === "fading-code") {
      return cleanup;
    }

    // Phase 7: Type coffee text
    if (phase === "typing-coffee") {
      startTyping(coffeeText, () => setPhase("fading-coffee"), 100);
      return cleanup;
    }

    // Phase 8: Fade away coffee - handled by eraser
    if (phase === "fading-coffee") {
      return cleanup;
    }
  }, [phase, fullName, coffeeText, codeText, startTyping, cleanup]);



  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden text-black">
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: "var(--hero-gradient)" }}
      />
      
      {/* Sonar Effect */}
      <SonarEffect />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <p className="text-xl sm:text-2xl text-black mb-4 tracking-wider uppercase">
              Senior Software Engineer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex items-center justify-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight">
              {(phase === "typing-name" || phase === "fading-name") && (
                <motion.span
                  key="prefix"
                  initial={false}
                >
                  {" "}
                </motion.span>
              )}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase}
                  initial={false}
                  className={`text-black inline-block`}
                  onAnimationEnd={() => {
                    if (isFadingOutRef.current) {
                      if (phase === "fading-name") {
                        startErasing("typing-badminton");
                      } else if (phase === "fading-badminton") {
                        startErasing("typing-code");
                      } else if (phase === "fading-code") {
                        startErasing("typing-coffee");
                      } else if (phase === "fading-coffee") {
                        startErasing("typing-name");
                      }
                    }
                  }}
                >
                  {
                    // When typing the full name, highlight the "Aditya" portion in cyan
                    (phase === "typing-name" || phase === "fading-name") && nameStart >= 0
                      ? (
                        displayText.length <= nameStart
                          ? displayText
                          : (
                            <>
                              <span>{displayText.slice(0, nameStart)}</span>
                              <span style={{ color: '#9d0208' }}>{displayText.slice(nameStart)}</span>
                            </>
                          )
                      )
                      : displayText
                  }
                  <span
                    className={styles.blinkingCursor}
                    style={{ color: "#000" }}
                  >
                    |
                  </span>
                </motion.span>
              </AnimatePresence>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-black mb-12 max-w-3xl mx-auto"
          >
            Proficient in machine learning, predictive maintenance, and embedded systems
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              onClick={scrollToContact}
            >
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              onClick={() => {
                const element = document.querySelector("#projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
            </Button>
          </motion.div>
        </div>
      </div>

          <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => {
          const element = document.querySelector("#about");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-black hover:scale-110 transition-transform" />
        </motion.div>
      </motion.div>
    </section>
  );
};
