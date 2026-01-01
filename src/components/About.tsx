import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
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
              className="space-y-4"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hey 👋 I'm a Dynamic Senior Software Engineer with over 3.5 years of experience in 
                developing innovative software solutions. Currently pursuing my Master's in Web Engineering 
                at Technische Universität Chemnitz, Germany.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm proficient in machine learning, predictive maintenance, and embedded systems, 
                excelling at enhancing operational efficiency and safety in automotive technologies. 
                My expertise spans Python, FastAPI, Flask, Django, and cloud deployments on AWS and Azure.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you can find me on the badminton court or exploring the latest 
                advancements in AI and machine learning. I absolutely love all things to do with AI and innovation.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
