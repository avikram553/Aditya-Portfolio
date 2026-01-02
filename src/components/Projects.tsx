import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const projects = [
  {
    title: "DMTL Pump Predictive Maintenance",
    description: "Machine learning model for automotive predictive maintenance",
    image: "🔧",
    tags: ["Machine Learning", "Python", "Predictive Analytics", "Automotive"],
    details: "Developed a machine-learning model to predict Diagnostic Module Tank Leakage (DMTL) pump replacement times at Bosch, achieving 30% reduction in maintenance downtime. Applied deep understanding of automotive sensors and actuators to optimize embedded systems. Built end-to-end ML pipeline: data collection from ECU logs, feature engineering, model training with scikit-learn, and deployment to production environment.",
    github: null,
    demo: null,
    isProprietaryWork: true,
    companyLogo: "/assets/bosch-logo.png",
    caseStudyLink: "#contact",
    nda: "Proprietary work developed at Bosch Global Software Technologies"
  },
  {
    title: "VS Code MISRA Extension",
    description: "AI-powered code compliance tool with Copilot integration",
    image: "💻",
    tags: ["VS Code", "GitHub Copilot", "Code Quality", "MISRA-C"],
    details: "Created a Visual Studio Code extension integrated with GitHub Copilot to provide real-time MISRA-C compliant coding suggestions, ensuring adherence to automotive industry coding standards. Reduced code review time by 40% and improved first-pass compliance rate by 65% across the development team. Utilized VS Code Extension API, TypeScript, and GitHub Copilot API.",
    github: null,
    demo: null,
    isProprietaryWork: true,
    companyLogo: "/assets/bosch-logo.png",
    caseStudyLink: "#contact",
    nda: "Proprietary work developed at Bosch Global Software Technologies"
  },
  {
    title: "Algorithm Visualizer",
    description: "Interactive tool for demonstrating sorting algorithms",
    image: "📊",
    tags: ["Python", "Flask", "Visualization", "Education"],
    details: "Designed a visual tool demonstrating sorting algorithm performance with adjustable parameters. Built using Python and Flask, this educational tool helps understand algorithm complexity and performance characteristics through interactive visualizations and comparative analysis.",
    github: "https://github.com/avikram553/Algorithm-Visualizer",
    demo: "#",
  },
  {
    title: "Image Steganography",
    description: "Secure data transmission through image encryption",
    image: "🔐",
    tags: ["Python", "Security", "Signal Processing", "Encryption"],
    details: "Developed a secure system for confidential data transmission by embedding encrypted information within images. This project combines signal processing techniques with modern encryption methods for covert communication, ensuring data security and minimal visual impact on carrier images.",
    github: "https://github.com/avikram553/crypto-stego",
    demo: "#",
  },
];

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all hover:-translate-y-2">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
                    {project.image}
                  </div>
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-base mt-4">
              {selectedProject?.details}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject?.isProprietaryWork && selectedProject?.nda && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <span className="font-semibold">Note:</span> {selectedProject.nda}
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject?.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            {selectedProject?.github ? (
              <Button asChild className="flex-1">
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            ) : selectedProject?.isProprietaryWork ? (
              <Button disabled className="flex-1" title="Source code not available for proprietary work">
                <Github className="mr-2 h-4 w-4" />
                Private Repository
              </Button>
            ) : null}
            
            {selectedProject?.demo ? (
              <Button asChild variant="outline" className="flex-1">
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            ) : selectedProject?.isProprietaryWork && selectedProject?.caseStudyLink ? (
              <Button asChild variant="outline" className="flex-1">
                <a href={selectedProject.caseStudyLink}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Discuss Project
                </a>
              </Button>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
