import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section 
      id="about" 
      className="py-20 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 
            className="text-5xl lg:text-6xl font-bold mb-12 text-center"
            style={{ 
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
              fontWeight: 700
            }}
          >
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="/profile-picture.jpg"
                  alt="Aditya Vikram"
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ transform: 'scale(0.95)' }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p 
                className="text-lg leading-relaxed"
                style={{
                  lineHeight: '1.8',
                  fontWeight: 400,
                  color: '#2c3e50'
                }}
              >
                From debugging{" "}
                <span style={{ fontWeight: 600, color: '#2196F3', cursor: 'pointer' }} className="transition-colors hover:text-[#1976D2]">
                  automotive CAN protocols
                </span>{" "}
                to training{" "}
                <span style={{ fontWeight: 600, color: '#2196F3', cursor: 'pointer' }} className="transition-colors hover:text-[#1976D2]">
                  neural networks
                </span>
                —I've evolved from <em style={{ fontStyle: 'italic', fontWeight: 500, color: '#34495e' }}>Embedded Software Engineer</em> to{" "}
                <em style={{ fontStyle: 'italic', fontWeight: 500, color: '#34495e' }}>AI enthusiast</em>. My journey started at Bosch developing ECU systems, but creating a machine learning model that predicted maintenance failures{" "}
                <span style={{ fontWeight: 700, color: '#FF6B35' }}>
                  (30% downtime reduction)
                </span>{" "}
                ignited my AI passion.
              </p>
              <p 
                className="text-lg leading-relaxed"
                style={{
                  lineHeight: '1.8',
                  fontWeight: 400,
                  color: '#2c3e50'
                }}
              >
                Now pursuing my Master's in Web Engineering at TU Chemnitz while researching{" "}
                <span style={{ fontWeight: 600, color: '#2196F3', cursor: 'pointer' }} className="transition-colors hover:text-[#1976D2]">
                  LLM-based semantic matching
                </span>, I combine automotive domain knowledge with modern AI skills{" "}
                <span style={{ fontWeight: 600, color: '#2196F3', cursor: 'pointer' }} className="transition-colors hover:text-[#1976D2]">
                  (PyTorch, TensorFlow, LangChain)
                </span>. Seeking AI/ML roles where my unique background in{" "}
                <em style={{ fontStyle: 'italic', fontWeight: 500, color: '#34495e' }}>safety-critical systems</em> and{" "}
                <em style={{ fontStyle: 'italic', fontWeight: 500, color: '#34495e' }}>production ML</em> can drive innovation.
              </p>
              <p 
                className="text-lg leading-relaxed"
                style={{
                  lineHeight: '1.8',
                  fontWeight: 400,
                  color: '#2c3e50'
                }}
              >
                <span style={{ fontWeight: 700, color: '#FF6B35' }}>
                  Star Performer for 8 consecutive quarters.
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
