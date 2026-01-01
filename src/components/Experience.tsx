import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Bosch Global Software Technologies",
    companyUrl: "https://www.bosch-softwaretechnologies.com",
    location: "Bangalore, India",
    period: "March 2022 - September 2025",
    achievements: [
      "Developed machine-learning model to predict DMTL pump replacement times, enhancing maintenance strategies and reducing downtime by 30%",
      "Created Visual Studio Code extension integrated with GitHub Copilot for real-time MISRA-compliant code suggestions, improving code quality",
      "Developed and optimized Python-based backend APIs using FastAPI and Flask for cloud deployments on AWS and Azure",
      "Collaborated in cross-functional teams to design web applications supporting Bosch's sustainability and efficiency goals",
      "Implemented cybersecurity features with AES-128 encryption algorithm for embedded systems",
      "Optimized embedded systems for real-time applications, improving performance metrics by 25%",
      "Awarded Star Performer each quarter from Q1 2023 to Q3 2025",
    ],
    technologies: ["Python", "FastAPI", "Flask", "AWS", "Azure", "Machine Learning", "VS Code Extension", "Docker", "Git"],
  },
];

// Individual Experience Card Component
interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
  inView: boolean;
}

const ExperienceCard = ({ experience, index, inView }: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative"
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
        className="absolute left-0 top-8 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 hidden lg:block z-10"
        whileHover={{ scale: 1.3 }}
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
      </motion.div>

      {/* Experience Card */}
      <div className="lg:ml-12 bg-card rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-primary/10 mt-1">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                  {experience.role}
                </h3>
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold transition-colors group text-lg"
                >
                  {experience.company}
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Date & Location */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:text-right">
            <div className="flex items-center gap-2 sm:justify-end">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{experience.period}</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <ul className="space-y-3">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.3 + i * 0.05 }}
                className="flex items-start gap-3 text-muted-foreground leading-relaxed"
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span className="text-sm lg:text-base">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="border-t border-border/50 pt-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Technologies & Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.15 + 0.5 + i * 0.03 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-xs font-medium bg-secondary/50 hover:bg-secondary/70 text-foreground border border-border/30 transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Experience Timeline Component
export const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block p-4 bg-primary/10 rounded-2xl mb-4"
            >
              <Briefcase className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Work Experience
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Building innovative solutions at the intersection of AI, cloud, and software engineering
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden lg:block" />

            {/* Experience Cards */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
