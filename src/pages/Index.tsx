import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Recommendations } from "@/components/Recommendations";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ChatbotContainer } from "@/components/Chatbot/ChatbotContainer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Recommendations />
        <Contact />
        <Footer />
      </div>
      <ChatbotContainer />
    </div>
  );
};

export default Index;
