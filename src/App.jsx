import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";
import emailjs from "emailjs-com";

export default function App() {

  // SCROLL PROGRESS
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  // LOADER
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  

  // CURSOR GLOW
  const [cursor, setCursor] = useState({ x: 0, y: 0 });


  const form = useRef();

  const [loadingMail, setLoadingMail] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get("name");
    const contact = formData.get("contact");
    const message = formData.get("message");

    // simple validation
    if (!name || !contact || !message) {
      toast.error("Fill all fields");
      return;
    }

    setLoadingMail(true);

    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_PUBLIC_KEY
    )
      .then(() => {
        toast.success("Message sent");
        form.current.reset();
        setLoadingMail(false);
      })
      .catch(() => {
        toast.error("Failed to send");
        setLoadingMail(false);
      });
  };

  return (
    <div
      className="bg-black text-white min-h-screen relative overflow-hidden"
      onMouseMove={(e) => {
        setCursor({ x: e.clientX, y: e.clientY });
      }}
    >

      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Loading...
          </motion.h1>
        </div>
      )}

      {/* SCROLL BAR */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
      />

      {/* CURSOR GLOW */}
      <motion.div
        className="fixed w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 pointer-events-none z-0"
        animate={{ x: cursor.x - 80, y: cursor.y - 80 }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between px-8 py-4 bg-black/30 backdrop-blur-md z-40">
        <h1>Dheenadhayalan</h1>

        <div className="space-x-6">
          <a href="#about" className="hover:text-purple-400 transition">About</a>
          <a href="#skills" className="hover:text-purple-400 transition">Skills</a>
          <a href="#projects" className="hover:text-purple-400 transition">Projects</a>
          <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center text-center pt-20"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Hi, I'm Dheenadhayalan
        </h1>

        <TypeAnimation
          sequence={[
            "MERN Stack Developer", 2000,
            "React Developer", 2000,
            "Frontend Specialist", 2000
          ]}
          repeat={Infinity}
          className="mt-4 text-gray-400"
        />
      </motion.section>



      {/* ABOUT */}
      <section id="about" className="py-28 px-6 relative overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >

          {/* HEADING (center OR slight left) */}
          <h2 className="text-5xl font-bold mb-10 text-center md:text-left bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>

          {/* CONTENT */}
          <div className="space-y-6 text-gray-400 leading-relaxed text-left">

            <p>
              I'm a <span className="text-purple-400 font-medium">MERN Stack Developer</span> passionate about building modern,
              responsive, and scalable web applications with clean UI and smooth user experiences. I enjoy creating clean user
              interfaces and delivering seamless experiences using React and modern frontend technologies.
            </p>

            <p>
              I completed my Bachelor's degree in Electrical and Electronics Engineering from
              <span className="text-purple-400 font-medium"> Bannari Amman Institute of Technology </span>
              (2018 – 2022) with a GPA of 7.98/10. My transition into web development was driven by a strong interest in technology and problem-solving.
            </p>

            <p>
              I specialize in building full-stack applications using MongoDB, Express, React, and Node.js,
              and I’m constantly learning new tools and techniques to improve performance, design, and scalability.
              I’m actively seeking opportunities where I can contribute, grow, and build impactful digital products.
            </p>

          </div>

        </motion.div>

      </section>



      {/* SKILLS */}
      <motion.section 
        id="skills"
        className="py-24 px-6 text-center"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold mb-14 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">

          {["React", "Node.js", "MongoDB", "Express", "JavaScript", "Tailwind", "HTML", "CSS", "Bootstrap", "GitHub", "Vercel", "Postman", "VS Code"].map((skill) => (

            <div key={skill}
              className="relative group p-[1px] rounded-xl 
              bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition duration-300"
            >

              {/* INNER CARD */}
              <div
                className="bg-black/80 backdrop-blur-xl rounded-xl py-6 px-4 
                flex items-center justify-center group-hover:bg-black/60 transition duration-300">

                <span className="text-lg font-semibold text-purple-300 group-hover:text-white transition">
                  {skill}
                </span>

              </div>

            </div>

          ))}

        </div>
      </motion.section>


      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 grid md:grid-cols-2 gap-10">

        {/* ComicSense */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 
          transition duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        >
          <img src="/images/ComicSense.png" className="rounded-lg mb-4" />
          {/* CONTENT */}
          <div className="p-6">
            <h3 className="text-xl font-bold">ComicSense E-commerce</h3>
            <p className="text-gray-400 mt-2">
              Anime merchandise e-commerce platform featuring product filtering, cart functionality, and seamless EmailJS integration.
            </p>


            <div className="opacity-0 group-hover:opacity-100 transition mt-6 flex gap-4">

              {/* LIVE BUTTON */}
              <a
                href="https://comic-sense.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-purple-400 text-purple-300 font-semibold 
                transition duration-300 ease-out hover:scale-105 hover:text-white hover:border-transparent
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
                hover:shadow-lg hover:shadow-purple-500/40"
              >
                Live
              </a>

              {/* CODE BUTTON */}
              <a
                href="https://github.com/DheenadhayalanP/ComicSense"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-purple-400 text-purple-300 font-semibold 
                transition duration-300 ease-out hover:scale-105 hover:text-white hover:border-transparent
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
                hover:shadow-lg hover:shadow-purple-500/40"
              >
                Code
              </a>
            </div>
          </div>

        </motion.div>

        {/* Starbucks */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 
          transition duration-300 
          hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        >
          <img src="/images/Starbucks.png" className="rounded-lg mb-4" />

          {/* CONTENT */}
          <div className="p-6">
            <h3 className="text-xl font-bold">Starbucks UI </h3>
            <p className="text-gray-400 mt-2">
              Responsive UI inspired by Starbucks, featuring modern layout, smooth animations, and clean design.
            </p>

            <div className="opacity-0 group-hover:opacity-100 transition mt-4 flex gap-4">

              {/* LIVE BUTTON */}
              <a
                href="https://starbucks-sable-five.vercel.app"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-purple-400 text-purple-300 font-semibold 
                transition duration-300 ease-out hover:scale-105 hover:text-white hover:border-transparent
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
                hover:shadow-lg hover:shadow-purple-500/40"
              >
                Live
              </a>

              {/* CODE BUTTON */}
              <a
                href="https://github.com/DheenadhayalanP/Starbucks"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-purple-400 text-purple-300 font-semibold 
                transition duration-300 ease-out hover:scale-105 hover:text-white hover:border-transparent
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
                hover:shadow-lg hover:shadow-purple-500/40"
              >
                Code
              </a>
            </div>
          </div>
        </motion.div>

        {/* Edusity */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 
          transition duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        >
          <img src="/images/Edusity.png" className="rounded-lg mb-4" />

          {/* CONTENT */}
          <div className="p-6">
            <h3 className="text-xl font-bold">Edusity University</h3>
            <p className="text-gray-400 mt-2">
              Responsive university website showcasing programs, campus life, and student testimonials with a clean and modern UI.
            </p>

            <div className="opacity-0 group-hover:opacity-100 transition mt-4 flex gap-4">

              {/* LIVE BUTTON */}
              <a
                href="https://react-code-dzjb.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-purple-400 text-purple-300 font-semibold 
                transition duration-300 ease-out hover:scale-105 hover:text-white hover:border-transparent
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
                hover:shadow-lg hover:shadow-purple-500/40"
              >
                Live
              </a>

              {/* CODE BUTTON */}
              <a
                href="https://github.com/DheenadhayalanP/Edusity"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg border border-purple-400 text-purple-300 font-semibold 
                transition duration-300 ease-out hover:scale-105 hover:text-white hover:border-transparent
                hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500
                hover:shadow-lg hover:shadow-purple-500/40"
              >
                Code
              </a>
            </div>
          </div>

        </motion.div>

      </section>

      {/* CONTACT */}

      <section id="contact" className="relative py-28 px-6 overflow-hidden">

        {/* BACKGROUND DEPTH */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-2xl"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-md">
              I'm always open to discussing new opportunities, creative ideas, or collaborations.
            </p>

            <div className="space-y-4 text-gray-300">

              <p className="flex items-center gap-3 hover:text-purple-400 transition duration-300">
                📧
                <a
                  href="mailto:dheenadd18@gmail.com"
                  className="hover:underline"
                >
                  dheenadd18@gmail.com
                </a>
              </p>

              <p className="flex items-center gap-3 hover:text-purple-400 transition duration-300">
                💻
                <a
                  href="https://github.com/DheenadhayalanP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  github.com/DheenadhayalanP
                </a>
              </p>

              <p className="flex items-center gap-3 hover:text-purple-400 transition duration-300">
                🔗
                <a
                  href="https://www.linkedin.com/in/dheenadhayalanpalanisamy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/dheenadhayalanpalanisamy
                </a>
              </p>

            </div>

          </div>


          <form ref={form} onSubmit={sendEmail} className="space-y-14" noValidate>

            {/* NAME */}
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-gray-600 py-3 text-white 
      focus:outline-none focus:border-purple-500 
      focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
              />

              <label
                className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-200
      peer-focus:opacity-0 peer-valid:opacity-0"
              >
                Your Name
              </label>

              <span
                className="absolute bottom-0 left-0 w-0 h-[2px] 
      bg-gradient-to-r from-blue-500 to-purple-500 
      transition-all duration-500 peer-focus:w-full"
              ></span>
            </div>

            {/* CONTACT */}
            <div className="relative">
              <input
                type="text"
                name="contact"
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-gray-600 py-3 text-white 
      focus:outline-none focus:border-purple-500 
      focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
              />

              <label
                className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-200
      peer-focus:opacity-0 peer-valid:opacity-0"
              >
                GitHub / LinkedIn / Email
              </label>

              <span
                className="absolute bottom-0 left-0 w-0 h-[2px] 
      bg-gradient-to-r from-blue-500 to-purple-500 
      transition-all duration-500 peer-focus:w-full"
              ></span>
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <textarea
                name="message"
                rows="4"
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-gray-600 py-3 text-white 
      focus:outline-none focus:border-purple-500 
      focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 resize-none"
              ></textarea>

              <label
                className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-200
      peer-focus:opacity-0 peer-valid:opacity-0"
              >
                Your Message
              </label>

              <span
                className="absolute bottom-0 left-0 w-0 h-[2px] 
      bg-gradient-to-r from-blue-500 to-purple-500 
      transition-all duration-500 peer-focus:w-full"
              ></span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loadingMail}
              className="px-10 py-3 rounded-full font-semibold
    bg-gradient-to-r from-blue-500 to-purple-500
    hover:scale-105 transition duration-300
    hover:shadow-lg hover:shadow-purple-500/40
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMail ? "Sending..." : "Send Message →"}
            </button>

          </form> 
          



        </div>

      </section>

    </div>
  );
}



