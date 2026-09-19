import amazonCloneImg from "../assets/amazon-clone.png";
import todolistImg from "../assets/todolist.png";
import chatappImg from "../assets/chatapp.png";

// PIMS gallery screenshots
import pimsImg1 from "../assets/pims/pims-1.png";
import pimsImg2 from "../assets/pims/pims-2.png";
import pimsImg3 from "../assets/pims/pims-3.png";
import pimsImg4 from "../assets/pims/pims-4.png";
import pimsImg5 from "../assets/pims/pims-5.png";
import pimsImg6 from "../assets/pims/pims-6.png";

// Expense Tracker gallery screenshots
import etImg1 from "../assets/expense-tracker/et-1.png";
import etImg2 from "../assets/expense-tracker/et-2.png";
import etImg3 from "../assets/expense-tracker/et-3.png";
import etImg4 from "../assets/expense-tracker/et-4.png";
import etImg5 from "../assets/expense-tracker/et-5.png";
import etImg6 from "../assets/expense-tracker/et-6.png";
import etImg7 from "../assets/expense-tracker/et-7.png";

export const projects = [
  {
    id: 1,
    title: "Expense Tracker",
    description:
      "A production-grade full-stack personal finance application. Helps users track expenses, manage income streams, set dynamic budgets, and visualize financial health through interactive reports — featuring secure JWT authentication, advanced filtering, custom categorization, and real-time data export.",
    image: etImg1,
    tags: [
      "FastAPI", "PostgreSQL", "SQLAlchemy",
      "React 18", "TailwindCSS", "Recharts", "Docker",
    ],
    techStack: {
      backend: [
        { name: "Python 3.12 + FastAPI 0.115", note: "Async REST framework" },
        { name: "PostgreSQL 16", note: "via SQLAlchemy 2.x async ORM" },
        { name: "JWT + bcrypt", note: "Authentication & password hashing" },
        { name: "Alembic", note: "Database migrations" },
        { name: "Pytest", note: "Testing" },
      ],
      frontend: [
        { name: "React 18 + Vite", note: "UI framework & build tool" },
        { name: "TailwindCSS 3.4", note: "Dark-themed styling" },
        { name: "Recharts", note: "Interactive charts & visualizations" },
        { name: "React Hook Form", note: "Form handling" },
        { name: "React Router v6", note: "Navigation" },
        { name: "Axios", note: "HTTP client" },
      ],
    },
    githubUrl: "https://github.com/temesgenmeharie/Expense-Tracker",
    liveUrl: null,
    hasVideo: false,
    gallery: [etImg1, etImg2, etImg3, etImg4, etImg5, etImg6, etImg7],
    category: "Full Stack",
    isShowcase: true,
  },
  {
    id: 2,
    title: "Pharmacy Inventory Management System",
    description:
      "A full-stack pharmacy management platform built with NestJS and React. Features real-time stock tracking, medicine expiration alerts, prescription sales reporting, supplier management, JWT-secured authentication, AWS S3 file storage, automated reordering, and Swagger API documentation.",
    image: pimsImg1,
    tags: [
      "NestJS", "PostgreSQL", "Prisma ORM",
      "React 19", "TypeScript", "Tailwind CSS 4",
    ],
    techStack: {
      backend: [
        { name: "NestJS 10.x", note: "TypeScript Node.js framework" },
        { name: "PostgreSQL 16", note: "via Prisma ORM" },
        { name: "JWT + Passport.js", note: "Authentication" },
        { name: "AWS S3 / MinIO", note: "File storage" },
      ],
      frontend: [
        { name: "React 19 + TypeScript", note: "UI framework" },
        { name: "Tailwind CSS 4.x", note: "Styling" },
        { name: "Zustand + React Query", note: "State management" },
        { name: "Recharts", note: "Charts & analytics" },
      ],
    },
    githubUrl: "https://github.com/temesgenmeharie/PIMS",
    liveUrl: null,
    hasVideo: false,
    gallery: [pimsImg1, pimsImg2, pimsImg3, pimsImg4, pimsImg5, pimsImg6],
    category: "Full Stack",
    isShowcase: true,
  },
  {
    id: 3,
    title: "Amazon Website Clone",
    description:
      "A full-stack e-commerce platform inspired by Amazon. Features category browsing (Electronics, Clothing, Home & Kitchen, Books, etc.), product search, interactive shopping cart, user sign-in, and responsive product showcases.",
    image: amazonCloneImg,
    tags: ["React", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/temesgenmeharie/amazon-frontend-clone.git",
    liveUrl: "https://amazon-frontend-clone-phi.vercel.app",
    hasVideo: false,
    gallery: [amazonCloneImg],
  },
  {
    id: 4,
    title: "Task Manager & Todo List",
    description:
      "A feature-rich task management web application. Supports scheduling tasks with date & time pickers, status filtering ('All Tasks', 'Active', 'Completed'), editing, deleting, and visual completion status.",
    image: todolistImg,
    tags: ["React", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/temesgenmeharie/ToDoList.git",
    liveUrl: "https://todolist-three-olive-11.vercel.app",
    hasVideo: false,
    gallery: [todolistImg],
  },
  {
    id: 5,
    title: "Real-Time Chat Application",
    description:
      "A sleek real-time messaging application featuring instant group & private messaging, online status indicators, file/media sharing, and dark mode customization built with WebSockets.",
    image: chatappImg,
    tags: ["React", "Node.js", "Socket.io", "Tailwind CSS"],
    githubUrl: "https://github.com/temesgenmeharie",
    liveUrl: null,
    hasVideo: false,
    gallery: [chatappImg],
  },
];

export default projects;
