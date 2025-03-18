import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "Full Stack Architecture application",
    desc:
      "We developed a visually stunning and user-friendly website for Architecture to showcase their architectural portfolio and services. The site features a responsive design, an interactive project gallery, and dedicated service pages that highlight their expertise in residential and commercial architecture. Utilizing a user-friendly content management system, Pravin can easily update content and manage inquiries, enhancing client engagement and streamlining communication. The new website effectively reflects their brand identity and elevates their online presence.",
    link: "https://palegoldenrod-quail-469644.hostingersite.com/",
  },
  {
    id: 2,
    img: "/p2.png",
    title: "Digital Marketing Agency",
    desc:
      "We developed a visually stunning and user-friendly website for jupiter, designed to effectively showcase their digital marketing services and portfolio. The site features a responsive design, an interactive case study gallery, and dedicated service pages that highlight their expertise in SEO, social media marketing, and content creation. With a user-friendly content management system in place, pravin can easily update content and manage client inquiries, enhancing engagement and streamlining communication. The new website not only reflects their brand identity but also elevates their online presence, positioning them as a leader in the digital marketing space.",
    link: "https://lightgreen-echidna-563324.hostingersite.com/",
  },
  {
    id: 3,
    img: "/p3.webp",
    title: "DentCare Dentist appointment booking Application",
    desc:
      "We developed a user-friendly and visually appealing appointment booking application for Dentacre, designed to streamline the patient experience. The app features a responsive design, allowing users to easily schedule, reschedule, or cancel appointments from any device. With an intuitive interface, patients can view available time slots, receive appointment reminders, and access their dental history. The application also includes a secure messaging system for communication between patients and dental staff, enhancing engagement and ensuring timely responses. The new Dentacre app effectively reflects the brand's commitment to patient care and convenience, making dental visits easier and more accessible.",
    link: "https://lemonchiffon-emu-933995.hostingersite.com/",
  },
  {
    id: 4,
    img: "/p4.png",
    title: "SsquareIT placement servises ",
    desc:
      "We developed a dynamic and user-friendly platform for SSquare IT Placement Services, designed to connect job seekers with top IT companies. The platform features a responsive design, allowing users to easily browse job listings, submit applications, and track their application status from any device. With an intuitive interface, candidates can create personalized profiles, upload resumes, and receive tailored job recommendations based on their skills and experience. The application also includes a secure messaging system for seamless communication between candidates and recruiters, enhancing engagement and facilitating timely updates. The new SSquare platform effectively reflects the brand's commitment to empowering job seekers and streamlining the placement process in the IT industry.",
    link: "https://www.ssquareit.in/",
  },
  {
    id: 5,
    img: "/p5.png",
    title: "Indradatta Textiles E-commerce project",
    desc:
      "We developed a user-friendly e-commerce website for Indradatta Textile using WooCommerce, featuring a responsive design for seamless shopping on any device. Customers can easily browse a wide range of textile products, view detailed descriptions, and enjoy a secure checkout process. The platform allows Indradatta Textile to manage inventory and update product listings effortlessly. This new site enhances their online presence and reflects their commitment to quality and customer satisfaction.",
    link: "https://financeinfo.blog/",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Projects;
