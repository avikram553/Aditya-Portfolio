import { motion } from "framer-motion";
import { Quote, Mail } from "lucide-react";

interface Recommendation {
  name: string;
  role: string;
  company: string;
  credentials?: string;
  highlight?: string;
  quote: string;
  tags: string[];
  email: string;
  featured?: boolean;
}

const recommendations: Recommendation[] = [
  {
    name: "Rohit Raj",
    role: "Lead Engineer",
    company: "Bosch Global Software Technologies",
    highlight: "Supervised for 3+ years | Promoted to Senior Engineer",
    quote: "Aditya's consistent excellence has been recognized through his designation as the 'Star Performer' in every quarter since 2023. He identified the root cause of critical CAN frame timing issues, leading to quick resolution and significant improvements in system performance.",
    tags: ["Powertrain ECU Expert", "CAN/UDS Specialist", "ML Innovation"],
    email: "rohit.raj2@in.bosch.com",
    featured: true
  },
  {
    name: "Dr. Koushik Dutta",
    role: "Associate Professor & HOD, ECE Department",
    company: "Netaji Subhash Engineering College",
    credentials: "Fellow IEI, SMIEEE, LMInRaSS",
    quote: "Aditya is the top student among more than 10 undergraduate students I taught. He has very good analytical capabilities to handle complex mathematical problems with maturity and is among the top 10% of his fellow mates.",
    tags: ["Top 10% Student", "Academic Excellence"],
    email: "koushikdutt@ieee.org"
  },
  {
    name: "Dr. Shilpi Bose",
    role: "Assistant Professor, Computer Science & Engineering",
    company: "Netaji Subhash Engineering College",
    quote: "He developed 'Algorithm Visualizer' that gave life to algorithms, making abstract concepts concrete. His 4-star CodeChef rating adds weight to his exceptional coding skills and problem-solving ability.",
    tags: ["4-Star CodeChef", "Software Innovation"],
    email: "shilpi.bose@nsec.ac.in"
  },
  {
    name: "Dr. Saheli Sarkhel",
    role: "Assistant Professor, ECE Department",
    company: "Netaji Subhash Engineering College",
    credentials: "SMIEEE",
    quote: "Highly motivated and eager for knowledge. His work on Image Steganography showed out-of-the-box thinking and keen eye for detail. His attentiveness and capacity for lucid presentation earned him a grade of 'O' (Outstanding).",
    tags: ["Grade: Outstanding", "Research-Oriented"],
    email: "saheli.sarkhel@nsec.ac.in"
  }
];

export const Recommendations = () => {
  return (
    <section id="recommendations" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            What Others Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Recommendations from industry leaders and academic mentors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-xl border-2 hover:shadow-xl transition-all duration-300 overflow-hidden ${
                rec.featured 
                  ? 'md:col-span-2 border-cyan-300 shadow-lg' 
                  : 'border-gray-200 hover:border-cyan-200'
              }`}
            >
              {/* Large Quote Mark */}
              <div className="absolute top-4 left-4 text-6xl font-serif text-cyan-200 leading-none">
                "
              </div>

              <div className="relative p-8 pt-16">
                {/* Quote */}
                <blockquote className="mb-6">
                  <p className="text-gray-800 text-lg leading-relaxed italic">
                    {rec.quote}
                  </p>
                </blockquote>

                {/* Recommender Info */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{rec.name}</h4>
                  <p className="text-sm text-gray-700 font-medium">{rec.role}</p>
                  <p className="text-sm text-cyan-600">{rec.company}</p>
                  {rec.credentials && (
                    <p className="text-xs text-gray-500 mt-1 font-medium">{rec.credentials}</p>
                  )}
                  {rec.highlight && (
                    <p className="text-xs text-amber-600 font-semibold mt-2 bg-amber-50 inline-block px-3 py-1 rounded-full">
                      {rec.highlight}
                    </p>
                  )}
                  {/* Email Contact */}
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    <a 
                      href={`mailto:${rec.email}`}
                      className="text-xs text-gray-600 hover:text-cyan-600 hover:underline transition-colors"
                    >
                      {rec.email}
                    </a>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {rec.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 text-xs font-semibold rounded-full border border-cyan-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg border border-cyan-200"
        >
          <p className="text-gray-700 font-semibold">
            ✓ All recommendations verified and available upon request
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <p className="text-gray-600">
            Want to add your recommendation?{" "}
            <a 
              href="https://www.linkedin.com/in/avikram553" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 hover:text-teal-600 font-medium underline"
            >
              Connect on LinkedIn
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
