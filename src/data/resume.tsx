import { Icons } from "@/components/icons";
import { FileUser, HomeIcon, ImageIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Laravel } from "@/components/ui/svgs/laravel";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Html } from "@/components/ui/svgs/html";
import { Css } from "@/components/ui/svgs/css";
import { TailwindCSS } from "@/components/ui/svgs/tailwind";
import { Php } from "@/components/ui/svgs/php";
import { Bootstrap } from "@/components/ui/svgs/bootstrap";
import { Livewire } from "@/components/ui/svgs/livewire";
import { Mysql } from "@/components/ui/svgs/mysql";
import { Flutter } from "@/components/ui/svgs/flutter";

export const DATA = {
  name: "Allen Labrague",
  initials: "AL",
  url: "https://allenlabrague.dev",
  location: "Philippines, Cavite",
  locationLink: "https://maps.app.goo.gl/uUps2NoHR76q8EiaA",
  description:
    "Computer Science student building web and mobile projects. Curious about new tech and collecting interesting things in my free time.",
  summary: `I’m a third-year Computer Science student who has been actively working on commission-based projects and business-driven applications alongside my studies. Through building web and mobile solutions for real clients, I’ve gained hands-on experience turning ideas and requirements into production-ready products.

  I enjoy working closely with clients to understand their goals, translate business needs into technical solutions, and deliver reliable, maintainable software. My focus is on combining strong technical skills with practical business thinking, continuous learning, and real-world impact.

  I’m currently open to freelance opportunities where I can help individuals and businesses build, improve, or scale their digital products.`,
  avatarUrl: "/allen.png",
  skills: [
    { name: "HTML", icon: Html },
    { name: "CSS", icon: Css },
    { name: "TailwindCSS", icon: TailwindCSS },
    { name: "Bootstrap", icon: Bootstrap },
    { name: "JavaScript", icon: Javascript },
    { name: "Typescript", icon: Typescript },
    { name: "React", icon: ReactLight },
    { name: "React Native", icon: ReactLight },
    { name: "Flutter", icon: Flutter },
    { name: "PHP", icon: Php },
    { name: "Laravel", icon: Laravel },
    { name: "Livewire", icon: Livewire },
    { name: "Node.js", icon: Nodejs },
    { name: "MySQL", icon: Mysql },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/gallery", icon: ImageIcon, label: "Gallery" },
  ],
  contact: {
    email: "allenlabrague06@gmail.com",
    tel: "+63 992 846 6547",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/codeweb-dev",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/allenlabrague/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Facebook: {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=61581024022869",
        icon: Icons.facebook,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/def.initelynotallen?igsh=NDBpcm04cmY4d3Fn&utm_source=qr",
        icon: Icons.instagram,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:allenlabrague06@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Commission-Based",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Software Developer",
      logoUrl: "/comms.jpg",
      start: "Dec 2024",
      end: null,
      description:
        "Developed web and mobile applications for real clients. Focused on practical solutions, usability, and real-world impact. Worked across the full development lifecycle.",
    },
  ],
  education: [
    {
      school: `EULOGIO "AMANG" RODRIGUEZ INSTITUTE OF SCIENCE AND TECHNOLOGY`,
      href: "https://earist.edu.ph/",
      degree: "Bachelor of Science in Computer Science (BSCS)",
      logoUrl: "/earist.png",
      start: "2023",
      end: "Present",
    },
    {
      school: `General Mariano Alvarez Technical SHS`,
      href: "https://gmaths.edu.ph/",
      degree: "Senior High School Diploma",
      logoUrl: "/gmaths.png",
      start: "2021",
      end: "2023",
    },
    {
      school: `General Mariano Alvarez Technical HS`,
      href: "https://gmaths.edu.ph/",
      degree: "High School Diploma",
      logoUrl: "/gmaths.png",
      start: "2017",
      end: "2021",
    },
    {
      school: `Family Village Resources ES`,
      href: "https://fvres.edu.ph/",
      degree: "Elementary School Diploma",
      logoUrl: "/fvres.png",
      start: "2011",
      end: "2017",
    },
    // {
    //   school: "Wilfrid Laurier University",
    //   href: "https://wlu.ca",
    //   degree: "Bachelor's Degree of Business Administration (BBA)",
    //   logoUrl: "/laurier.png",
    //   start: "2016",
    //   end: "2021",
    // },
    // {
    //   school: "International Baccalaureate",
    //   href: "https://ibo.org",
    //   degree: "IB Diploma",
    //   logoUrl: "/ib.png",
    //   start: "2012",
    //   end: "2016",
    // },
  ],
  projects: [
    {
      title: "META MADNESS",
      href: "https://next-js-metaverse.vercel.app/",
      dates: "Jan 2022 - Feb 2022",
      active: true,
      description:
        "META MADNESS is a 3D-inspired metaverse-style web experience built to explore immersive UI and spatial interactions on the web. The project focuses on smooth animations, responsive layouts, and interactive components to simulate a virtual environment directly in the browser.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Framer Motion",
        "Shadcn UI",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://next-js-metaverse.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "madness.webp",
      video: "",
    },
    {
      title: "Cowboy 4",
      href: "https://next-js-modernbike.vercel.app/",
      dates: "June 2022 - July 2023",
      active: true,
      description:
        "Cowboy 4 is a modern product landing experience inspired by premium electric bikes. The project focuses on sleek UI design, smooth animations, and interactive components to showcase a high-end product in a clean, engaging way.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Framer Motion",
        "Shadcn UI",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://next-js-modernbike.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/codeweb-dev/next-js-modernbike",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "modernbike.webp",
      video: "cowboy-vid.mp4",
    },
    {
      title: "Unikorns",
      href: "https://next-js-unikornsclone.vercel.app/",
      dates: "September 2023 - December 2023",
      active: true,
      description:
        "A modern web application featuring animated sections, interactive charts, and smooth transitions. Built to explore motion-heavy UI, data visualization, and responsive layouts using modern frontend technologies.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Framer Motion",
        "Shadcn UI",
        "GSAP",
        "Chart.js",
        "Vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://next-js-unikornsclone.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "unikorns-vid.mp4",
    },
    {
      title: "Bookstack",
      href: "https://example.com/",
      dates: "March 2024 - April 2024",
      active: true,
      description:
        "Bookstack is a full-stack web application featuring user and admin dashboards for managing book collections. The project includes authentication, role-based access, CRUD operations, and a responsive interface, focusing on real-world backend workflows and practical full-stack architecture.",
      technologies: [
        "HTML",
        "CSS",
        "TailwindCSS",
        "JavaScript",
        "PHP",
        "Mailtrap API",
        "Bootstrap",
      ],
      links: [
        {
          type: "Source",
          href: "https://example.com/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "bookstack-vid.mp4",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
  ],
} as const;
