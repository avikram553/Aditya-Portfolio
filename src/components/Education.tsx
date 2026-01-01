import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

const education = [
  {
    degree: "Master's Web Engineering",
    institution: "Technische Universität Chemnitz",
    location: "Chemnitz, Germany",
    period: "10/2025 - Present",
    description: "Advanced study focusing on modern web technologies, data management, and machine learning applications in web engineering.",
    achievements: [
      "Advance Management of Data",
      "XML and Web Technologies",
      "Machine Learning",
    ],
  },
  {
    degree: "BTech Electronics and Communication",
    institution: "Netaji Subhash Engineering College",
    location: "Kolkata, India",
    period: "06/2017 - 06/2021",
    description: "Comprehensive study of electronics, communication systems, and programming with focus on emerging technologies and ethical computing.",
    achievements: [
      "Neural Networks and Ethical Hacking",
      "Data Structures and Algorithms",
      "Object Oriented Programming",
    ],
  },
];

// Individual Education Card Component
interface EducationCardProps {
  edu: typeof education[0];
  index: number;
  inView: boolean;
}

const EducationCard = ({ edu, index, inView }: EducationCardProps) => {
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

      {/* Education Card */}
      <div className="lg:ml-12 bg-card rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-primary/10 mt-1">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                  {edu.degree}
                </h3>
                <p className="text-primary font-semibold text-lg">
                  {edu.institution}
                </p>
              </div>
            </div>
          </div>

          {/* Date & Location */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:text-right">
            <div className="flex items-center gap-2 sm:justify-end">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{edu.period}</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{edu.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed text-sm lg:text-base">
          {edu.description}
        </p>

        {/* Key Focus Areas */}
        <div className="border-t border-border/50 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Key Focus Areas
            </span>
          </div>
          <ul className="space-y-2">
            {edu.achievements.map((achievement, i) => (
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
      </div>
    </motion.div>
  );
};

// Main Education Timeline Component
export const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-20 lg:py-32 bg-secondary/30">
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
              <GraduationCap className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Education
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Academic background and continuous learning journey
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden lg:block" />

            {/* Education Cards */}
            <div className="space-y-12">
              {education.map((edu, index) => (
                <EducationCard
                  key={index}
                  edu={edu}
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
