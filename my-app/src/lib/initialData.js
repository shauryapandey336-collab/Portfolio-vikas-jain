export const initialData = {
  profile: {
    name: "Vikas Jain",
    designation: "Director – PNINFOSYS",
    titles: ["Data Analytics Expert", "Full Stack Developer", "Corporate IT Trainer", "IT Leader"],
    bio: "IT leader and web development expert with over 10 years of experience managing technology initiatives, digital transformation, and advanced technical training programs. As Director of PNINFOSYS, led the organization's growth into a provider of web solutions, software development, and IT training services.",
    phone: "+91 7000846823",
    email: "jainvikas887@gmail.com",
    website: "http://pninfosys.com",
    location: "Gwalior, Madhya Pradesh, India",
    profileImage: null,
  },
  stats: [
    { id: 1, label: "Years Experience", value: "10+", icon: "calendar" },
    { id: 2, label: "Students Trained", value: "3000+", icon: "users" },
    { id: 3, label: "Applications Developed", value: "150+", icon: "code" },
    { id: 4, label: "Improved Placement", value: "40%", icon: "trending-up" },
  ],
  about: {
    overview: "IT leader and web development expert with over 10 years of experience managing technology initiatives, digital transformation, and advanced technical training programs. As Director of PNINFOSYS, led the organization's growth into a provider of web solutions, software development, and IT training services.",
    responsibilities: [
      "Strategic and technical leadership in Web Development, Data Analytics and Corporate IT Training",
      "Customized training programs in Full Stack Web Development, Python, JavaScript, React and Node.js",
      "Conduct workshops and industrial training sessions at ITM University, Prestige Institute, MPCT College and RJIT College, Gwalior",
      "Deliver seminars and hands-on project sessions focusing on Data Analysis and Data Visualization",
      "Lead web and analytics projects for education, healthcare and business sectors",
    ],
  },
  experience: [
    { id: 1, role: "Director", company: "PNINFOSYS", duration: "2014 – Present", location: "Gwalior, MP", description: "Leading the organization's growth as a premier provider of web solutions, software development, and IT training services.", highlights: ["Founded PNINFOSYS Industrial Training Program", "Trained 3000+ students", "Developed 150+ applications", "Improved placement outcomes by 40%"] },
  ],
  education: [
    { id: 1, degree: "Master of Computer Applications (MCA)", institution: "Rustamji Institute of Technology (RJIT)", location: "Gwalior", year: "2012–2015", description: "Specialized in advanced computing, software engineering and system design." },
    { id: 2, degree: "Bachelor of Computer Applications (BCA)", institution: "MAIPS College", location: "Gwalior", year: "2009–2012", description: "Core foundation in computer science, programming and application development." },
  ],
  skills: [
    { id: 1, category: "Data Analytics", icon: "bar-chart", color: "#2563EB", items: ["Python", "Pandas", "NumPy", "Data Visualization", "Power BI", "Tableau"] },
    { id: 2, category: "Full Stack Development", icon: "code", color: "#102A56", items: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Next.js", "MongoDB", "Express.js"] },
    { id: 3, category: "Programming Languages", icon: "terminal", color: "#D99A22", items: ["Python", "JavaScript", "Java"] },
    { id: 4, category: "Corporate Training", icon: "users", color: "#059669", items: ["Industrial Training", "Technical Workshops", "Project-Based Learning", "Student Mentorship"] },
  ],
  // The résumé confirms partner institutions but does not provide individual event details.
  // Add workshop records from the dashboard when verified details are available.
  workshops: [],
  trainingPrograms: [
    { id: 1, title: "Full Stack Web Development", duration: "3 Months", level: "Beginner to Advanced", description: "Comprehensive training covering front-end and back-end web development.", curriculum: ["HTML, CSS, Bootstrap", "JavaScript (ES6+)", "React.js", "Node.js & Express", "MongoDB", "REST APIs", "Deployment"], icon: "code", color: "#102A56" },
    { id: 2, title: "Python Programming", duration: "2 Months", level: "Beginner to Intermediate", description: "Complete Python course from basics to advanced with OOP and libraries.", curriculum: ["Python Basics", "Data Structures", "OOP Concepts", "File Handling", "NumPy, Pandas", "Mini Projects"], icon: "terminal", color: "#7C3AED" },
    { id: 3, title: "Data Analytics", duration: "2.5 Months", level: "Intermediate", description: "Industry-ready data analytics training with Python, Power BI and Tableau.", curriculum: ["Data Analysis with Python", "Pandas & NumPy", "Data Visualization", "Power BI", "Tableau", "Capstone Project"], icon: "bar-chart", color: "#2563EB" },
    { id: 4, title: "React & Next.js", duration: "2 Months", level: "Intermediate", description: "Advanced front-end development with React and Next.js.", curriculum: ["React Fundamentals", "Hooks & Context", "Next.js App Router", "API Integration", "State Management", "Deployment"], icon: "layers", color: "#0891B2" },
    { id: 5, title: "JavaScript Development", duration: "1.5 Months", level: "Beginner to Intermediate", description: "Modern JavaScript development covering ES6+, DOM and async programming.", curriculum: ["JS Fundamentals", "ES6+ Features", "DOM Manipulation", "Async JS", "Fetch API", "Intro to Frameworks"], icon: "zap", color: "#D97706" },
    { id: 6, title: "Industrial Training Program", duration: "6 Months", level: "All Levels", description: "Industry-ready training for engineering and MCA students.", curriculum: ["Domain Selection", "Core Tech Training", "Project Development", "Industry Practices", "Presentation Skills", "Placement Prep"], icon: "briefcase", color: "#059669" },
    { id: 7, title: "Corporate IT Training", duration: "Custom", level: "Professional", description: "Customized corporate training for organizations.", curriculum: ["Needs Assessment", "Custom Curriculum", "Hands-on Training", "Assessments", "Certification", "Follow-up Support"], icon: "users", color: "#D99A22" },
  ],
  // No specific project names or client details were supplied, so this begins empty.
  projects: [],
  achievements: [
    { id: 1, title: "Trained 3,000+ Students", description: "Successfully trained and mentored over 3,000 students across multiple institutions.", icon: "users", year: "2014–Present" },
    { id: 2, title: "150+ Applications Developed", description: "Designed and deployed over 150 web and data-driven applications.", icon: "code", year: "2014–Present" },
    { id: 3, title: "Founded PNINFOSYS Industrial Training Program", description: "Established industry-ready training for engineering and MCA students.", icon: "award", year: "2014" },
    { id: 4, title: "40% Improved Placement Outcomes", description: "Improved placement outcomes through project-based learning.", icon: "trending-up", year: "2018–Present" },
    { id: 5, title: "Multi-Institutional Partnerships", description: "Partnerships with ITM University, Prestige Institute, MPCT College and RJIT College.", icon: "building", year: "2015–Present" },
  ],
  gallery: [],
  testimonials: [],
  socialLinks: { linkedin: "", github: "", twitter: "", youtube: "", instagram: "" },
  seo: {
    title: "Vikas Jain – Director PNINFOSYS | Data Analytics Expert | Corporate IT Trainer",
    description: "Portfolio of Vikas Jain, Director of PNINFOSYS, Data Analytics Expert, Full Stack Developer and Corporate IT Trainer based in Gwalior, MP.",
    keywords: "Vikas Jain, PNINFOSYS, Data Analytics, Full Stack Developer, Corporate IT Trainer, Gwalior",
  },
  settings: { siteName: "Vikas Jain – Portfolio", primaryColor: "#102A56", accentColor: "#D99A22", showTestimonials: true },
};
