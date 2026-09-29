export const DATA = {
  name: "Earl D.",
  lastName: "Ang",
  title: "Developer",
  heroShort: "Recent IT graduate and developer turning complex ideas into clean, high-performing web applications.",
  aboutFull: "I’m a BSIT graduate from the University of the Immaculate Conception in Davao City. After completing my 481-hour practicum in network and hardware operations, I shifted my focus entirely to software development. Today, I specialize in building clean, functional web applications using React, Vue, and Supabase.",
  avatar: "https://ui-avatars.com/api/?name=Earl+Ang&background=FF3B30&color=fff&size=256",
  email: "earl.ang.business@gmail.com",
  phone: "+639602378766",
  links: {
    github: "https://github.com/Yukiiii2",
    linkedin: "https://linkedin.com/in/yourhandle", 
    twitter: "https://x.com/YukiiWEEB",
  },
  skills: {
    frontend: ["Vue.js", "React.js", "Tailwind CSS", "HTML/CSS/JavaScript"],
    backend: ["Supabase", "PostgreSQL / SQL", "API Integration"],
    tools: ["Git & GitHub", "Figma", "AWS"],
    currentlyLearning: ["Django"]
  },
  projects: [
    {
      title: "Voclaria",
      category: "AI / MOBILE",
      coverColor: "#211d38",
      accentColor: "#8a63e8",
      blurb: "Assisted in the development of an AI-powered mobile app for students, supporting the frontend team and backend service integrations.",
      tags: ["React Native", "Supabase", "AI"],
      image: "/Speaksy.png",
      imageStyle: "object-cover",
      github: "https://github.com/Yukiiii2/Voclaria/tree/final-najud", 
      live: "https://voclaria.uic.edu.ph/", 
      liveLabel: "Landing Page"     
    },
    {
      title: "MarianTBI Connect",
      category: "WEB PLATFORM",
      coverColor: "#282126",
      accentColor: "#bc3479",
      blurb: "An alumni engagement web platform that integrates user profiling and project management systems.",
      tags: ["Vue.js", "Supabase", "Web"],
      image: "/MarianTBI.jpg",
      imageStyle: "object-contain p-8", // <-- Change this line
      github: "https://github.com/BantawigP/TBI_marian",
      live: "#"
    },
    {
      title: "BrightMinds",
      category: "E-LEARNING",
      coverColor: "#1e2938",
      accentColor: "#4a90e2",
      blurb: "A web-based e-learning system built to streamline course management and student assessments.",
      tags: ["Vue.js", "Supabase", "Web"],
      image: "/BrightMinds.svg", 
      imageStyle: "object-contain p-8",
      github: "https://github.com/lnxexu/BrightMinds",
      live: "#"
    }
  ],
  // Add this right after the projects array, before the final closing brace
  experience: [
    {
      role: "IT Support Intern",
      company: "Samal Local Government Unit",
      period: "Jan - Apr 2026",
      description: "Completed a 481-hour practicum managing network connectivity, hardware maintenance, and helpdesk ticketing for various city departments."
    }
  ],
  certifications: [
    {
      title: "Cloud Solutions Architect Professional",
      issuer: "Coursera / Amazon Web Services",
      icon: "AWS"
    },
    {
      title: "Frontend Development using React",
      issuer: "Coursera / Board Infinity",
      icon: "React"
    }
  ]
};
