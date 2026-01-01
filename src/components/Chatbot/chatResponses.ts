// Intelligent chatbot responses about Aditya Vikram

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const getAdityaChatResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Experience related questions
  if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job")) {
    return "Aditya has 3.5+ years of professional experience as a Senior Software Engineer at Bosch Global Software Technologies. He's been recognized as a Star Performer every quarter from Q4 2022 through 2025! He specializes in ML, backend development, and cloud technologies.";
  }

  // Skills related questions
  if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech stack")) {
    return "Aditya's core skills include:\n\n💻 Languages: Python (Expert), JavaScript, TypeScript, C\n🔧 Backend: FastAPI, Flask, Django, RESTful APIs\n🤖 AI/ML: Machine Learning, Deep Learning, TensorFlow, PyTorch, Scikit-Learn\n☁️ Cloud: AWS, Azure, Docker\n📊 Data: Pandas, NumPy, Data Analysis";
  }

  // Python specific
  if (lowerMessage.includes("python")) {
    return "Aditya is an expert Python developer with 3.5+ years of experience! He specializes in FastAPI, Flask, and Django for backend development, and has extensive experience in ML/AI libraries like TensorFlow, PyTorch, and Scikit-Learn. He's built production APIs and predictive maintenance systems using Python.";
  }

  // Machine Learning / AI
  if (lowerMessage.includes("machine learning") || lowerMessage.includes("ml") || lowerMessage.includes("ai") || lowerMessage.includes("artificial intelligence")) {
    return "Aditya has strong ML/AI expertise! He developed a Machine Learning model for predictive maintenance that reduced equipment downtime by 30%. He's skilled in TensorFlow, PyTorch, Keras, Scikit-Learn, and has experience with both supervised and unsupervised learning algorithms.";
  }

  // Projects
  if (lowerMessage.includes("project")) {
    return "Key projects include:\n\n🔧 Predictive Maintenance ML Model - Reduced downtime by 30%\n💻 VS Code Extension with GitHub Copilot integration\n☁️ Cloud-Native APIs on AWS/Azure\n🔒 Cybersecurity implementation with AES-128\n📊 Algorithm Visualizer using Python & Flask\n🖼️ Image Steganography for secure data transmission";
  }

  // Achievements
  if (lowerMessage.includes("achievement") || lowerMessage.includes("award") || lowerMessage.includes("recognition")) {
    return "Aditya's key achievements:\n\n⭐ Star Performer award EVERY quarter from Q4 2022 through 2025\n📉 Reduced equipment downtime by 30% with ML predictive models\n⚡ Improved system performance by 25%\n💡 Created MISRA-compliant VS Code extension\n🏆 4-star rating on CodeChef";
  }

  // Education
  if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("study") || lowerMessage.includes("university")) {
    return "Aditya's education:\n\n🎓 Master's in Web Engineering - TU Chemnitz, Germany (2025-Present)\n🎓 B.Tech in Electronics & Communication - Netaji Subhash Engineering College, India (2017-2021)\n\nHe's currently pursuing advanced studies while building his professional career!";
  }

  // Why hire / strengths
  if (lowerMessage.includes("why") && (lowerMessage.includes("hire") || lowerMessage.includes("should"))) {
    return "Here's why you should hire Aditya:\n\n✅ Proven Track Record: Star Performer every quarter for 2.5+ years\n✅ Measurable Impact: 30% downtime reduction, 25% performance improvement\n✅ Modern Tech Stack: Expert in Python, FastAPI, AWS, Azure, ML/AI\n✅ Full-Stack Capabilities: From ML models to production APIs and cloud deployment\n✅ Quality Focus: MISRA-compliant code, AES-128 security implementation\n✅ Continuous Learner: Pursuing Master's in Web Engineering";
  }

  // Contact information
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach") || lowerMessage.includes("phone")) {
    return "You can reach Aditya at:\n\n📧 Email: vkrm.aditya553@gmail.com\n📱 Phone: +49 015510469686\n💼 LinkedIn: linkedin.com/in/avikram553\n\nFeel free to get in touch for opportunities or collaborations!";
  }

  // Location
  if (lowerMessage.includes("location") || lowerMessage.includes("where") || lowerMessage.includes("based")) {
    return "Aditya is currently based in Chemnitz, Germany, where he's pursuing his Master's in Web Engineering at TU Chemnitz.";
  }

  // Available / looking for job
  if (lowerMessage.includes("available") || lowerMessage.includes("looking") || lowerMessage.includes("job") || lowerMessage.includes("opportunity")) {
    return "Yes, Aditya is open to new opportunities! He's interested in roles involving:\n\n💻 Backend Development (Python, FastAPI, Flask)\n🤖 Machine Learning & AI\n☁️ Cloud Architecture (AWS, Azure)\n🔧 Full-Stack Development\n\nReach out at vkrm.aditya553@gmail.com to discuss opportunities!";
  }

  // AWS / Cloud
  if (lowerMessage.includes("aws") || lowerMessage.includes("azure") || lowerMessage.includes("cloud")) {
    return "Aditya has extensive cloud experience! He's built and deployed Python-based backend APIs on both AWS and Azure, implemented cloud-native architectures, and worked with Docker for containerization. He's comfortable with cloud infrastructure, deployment pipelines, and scalable system design.";
  }

  // Bosch
  if (lowerMessage.includes("bosch")) {
    return "Aditya worked at Bosch Global Software Technologies as a Senior Software Engineer from March 2022 to September 2025. During his time there, he was recognized as a Star Performer every single quarter and made significant contributions in ML, backend development, and embedded systems.";
  }

  // FastAPI / Flask / Django
  if (lowerMessage.includes("fastapi") || lowerMessage.includes("flask") || lowerMessage.includes("django")) {
    return "Aditya is highly proficient in Python web frameworks! He's expert-level in FastAPI (90%), Flask (88%), and Django (85%). He's built production-grade RESTful APIs, implemented authentication systems, and optimized backend performance using these frameworks.";
  }

  // Greetings
  if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
    return "Hello! I'm ADI, Aditya's AI Assistant. I can answer questions about Aditya's experience, skills, projects, and achievements. What would you like to know? 😊";
  }

  // Thanks
  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
    return "You're welcome! Feel free to ask me anything else about Aditya's background and experience. Happy to help! 😊";
  }

  // Default response
  return "I can help you learn about Aditya's:\n\n💼 Professional Experience\n💻 Technical Skills\n🤖 Machine Learning & AI Projects\n🏆 Achievements & Awards\n🎓 Education\n📧 Contact Information\n\nWhat would you like to know?";
};
