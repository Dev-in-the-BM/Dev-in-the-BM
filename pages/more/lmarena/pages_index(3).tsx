import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline();
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
        .from(
          '.hero-subtitle',
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .from(
          '.hero-description',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          '-=0.6'
        );

      // Floating animation for hero elements
      gsap.to('.float', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Section animations with ScrollTrigger
      gsap.utils.toArray('.section').forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });

      // Project cards animation
      gsap.utils.toArray('.project-card').forEach((card: any, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 80,
          opacity: 0,
          rotation: 5,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'back.out(1.7)',
        });
      });

      // Skill badges animation
      gsap.utils.toArray('.skill-badge').forEach((badge: any, index) => {
        gsap.from(badge, {
          scrollTrigger: {
            trigger: badge,
            start: 'top 90%',
          },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.05,
          ease: 'back.out(2)',
        });

        // Continuous floating animation
        gsap.to(badge, {
          y: -10,
          duration: 2 + Math.random(),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.1,
        });
      });

      // Stats counter animation
      gsap.utils.toArray('.stat-number').forEach((stat: any) => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
          },
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          onUpdate: function () {
            stat.textContent = Math.ceil(stat.textContent);
          },
        });
      });

      // Parallax effect for background elements
      gsap.to('.parallax-slow', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: 200,
        ease: 'none',
      });

      gsap.to('.parallax-fast', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
        y: -150,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Magnetic effect for interactive elements
  useEffect(() => {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, {
          scale: 2,
          duration: 0.3,
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.3,
        });
      });

      el.addEventListener('mousemove', (e: any) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }, []);

  const projects = [
    {
      name: 'Jdate',
      description: 'A GNOME extension adding the Jewish date to the top bar.',
      icon: '📅',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Crescent Remixer',
      description: 'Nano Banana powered image remixer.',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const skills = [
    { name: 'Python', icon: '🐍', color: 'bg-blue-500' },
    { name: 'Linux', icon: '🐧', color: 'bg-yellow-500' },
    { name: 'Ubuntu', icon: '🟠', color: 'bg-orange-500' },
    { name: 'GNOME', icon: '👣', color: 'bg-blue-400' },
    { name: 'Git', icon: '📦', color: 'bg-red-500' },
    { name: 'VS Code', icon: '💻', color: 'bg-blue-600' },
    { name: 'Zen Browser', icon: '🌐', color: 'bg-purple-600' },
  ];

  const aboutItems = [
    { icon: '🎩', text: 'Yeshiva bochur - currently learning בתולה נשאת' },
    { icon: '🔧', text: 'App modder - I love making app mods, out of my flip phone' },
    { icon: '💬', text: 'Active on JTech Forums' },
    { icon: '🐧', text: 'Making Linux mainstream' },
    { icon: '🖥️', text: 'Somehow my Linux environment still works' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden relative">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-slow absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="parallax-fast absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="parallax-slow absolute bottom-20 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-4">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="hero-title mb-6">
            <h1 className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 float">
              Dev-in-the-BM
            </h1>
          </div>
          <div className="hero-subtitle mb-8">
            <p className="text-3xl md:text-5xl font-light text-purple-300 float">
              🎩 Yeshiva Bochur • ✨ Vibe Coder
            </p>
          </div>
          <div className="hero-description space-y-4 text-xl text-gray-300 max-w-3xl mx-auto">
            <p className="float">Building open-source magic from a flip phone</p>
            <p className="float">Making Linux mainstream, one commit at a time</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            ℹ️ About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {aboutItems.map((item, index) => (
              <div
                key={index}
                className="magnetic bg-white bg-opacity-5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500 border-opacity-20 hover:border-opacity-50 transition-all cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{item.icon}</span>
                  <p className="text-lg text-gray-300 flex-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            ⭐ Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card magnetic bg-gradient-to-br ${project.color} p-1 rounded-2xl shadow-lg cursor-pointer transform-gpu transition-transform duration-300 hover:scale-105 hover:rotate-1`}
              >
                <div className="bg-gray-900 bg-opacity-70 rounded-2xl p-6 flex flex-col h-full">
                  <div className="text-5xl mb-4 select-none">{project.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-300 flex-1">{project.description}</p>
                  <a
                    href={`https://github.com/Dev-in-the-BM/${project.name.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-purple-400 hover:text-purple-600 font-semibold"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            🧠 Skills & Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`skill-badge magnetic flex items-center space-x-3 px-5 py-3 rounded-full cursor-pointer shadow-lg ${skill.color} bg-opacity-80 text-white font-semibold select-none transform-gpu transition-transform duration-300 hover:scale-110`}
              >
                <span className="text-2xl select-none">{skill.icon}</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            📊 GitHub Stats
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            <div>
              <div className="text-4xl font-bold stat-number" data-target={1234}>
                0
              </div>
              <div className="text-gray-400 mt-2">Followers</div>
            </div>
            <div>
              <div className="text-4xl font-bold stat-number" data-target={567}>
                0
              </div>
              <div className="text-gray-400 mt-2">Commits</div>
            </div>
            <div>
              <div className="text-4xl font-bold stat-number" data-target={89}>
                0
              </div>
              <div className="text-gray-400 mt-2">Issues</div>
            </div>
            <div>
              <div className="text-4xl font-bold stat-number" data-target={45}>
                0
              </div>
              <div className="text-gray-400 mt-2">Repositories</div>
            </div>
            <div>
              <div className="text-4xl font-bold stat-number" data-target={234}>
                0
              </div>
              <div className="text-gray-400 mt-2">Stars</div>
            </div>
            <div>
              <div className="text-4xl font-bold stat-number" data-target={7890}>
                0
              </div>
              <div className="text-gray-400 mt-2">Profile Visits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with wave animation */}
      <footer className="relative w-full h-40 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradient)"
            fillOpacity="0.7"
            d="M0,160L48,165.3C96,171,192,181,288,197.3C384,213,480,235,576,240C672,245,768,235,864,224C960,213,1056,203,1152,197.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop stopColor="#7F00FF" />
              <stop offset="1" stopColor="#E100FF" />
            </linearGradient>
          </defs>
        </svg>
      </footer>
    </div>
  );
}
