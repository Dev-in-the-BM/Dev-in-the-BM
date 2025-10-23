import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaGithub, FaLinux, FaUbuntu, FaPython, FaGitAlt } from 'react-icons/fa';
import { SiGnome, SiVisualstudiocode } from 'react-icons/si';
import { ExternalLink, Coffee, Heart, Terminal, Cpu, Sparkles, Globe, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Assets & Data ---
const ASSETS = {
  banner: "https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/banner.png?raw=true",
  wavingHand: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png",
  topHat: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Top%20Hat.png",
  sparkles: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png",
  penguin: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Penguin.png",
  tux: "https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/Assets/Tux.PNG?raw=true",
  android: "https://raw.githubusercontent.com/Dev-in-the-BM/Dev-in-the-BM/5faee36148d23546f43bd27b61012bec21164caa/android-head_flat.svg",
  jtech: "https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/Jtech%20Logo.png?raw=true",
  footerWave: "https://capsule-render.vercel.app/api?type=waving&height=200&color=gradient&section=footer",
};

const PROJECTS = [
  {
    title: "Jdate",
    description: "A GNOME extension adding the Jewish date to the top bar.",
    link: "https://github.com/Dev-in-the-BM/JDate-devinthebm.com",
    icon: <SiGnome className="w-8 h-8" />,
  },
  {
    title: "Crescent Remixer",
    description: "Nano Banana powered image remixer.",
    link: "https://github.com/Dev-in-the-BM/Crescent-Remixer",
    icon: <Sparkles className="w-8 h-8" />,
  },
];

const SPONSOR_TIERS = [
  {
    title: "FOSS Projects",
    desc: "Contributing to and creating open-source software for the community.",
    img: ASSETS.tux,
  },
  {
    title: "Android App Mods",
    desc: "Modifying Android apps for kashrus and better usability on filtered devices.",
    img: ASSETS.android,
  },
  {
    title: "JTech Forums",
    desc: "Active participation and contributions to discussions about kosher tech, filtering, Linux, and more.",
    img: ASSETS.jtech,
  },
];

export default function UserProfile() {
  const mainContainer = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const aboutCardsRef = useRef<HTMLDivElement>(null);

  // --- GSAP Animations ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Intro Sequence
      const tl = gsap.timeline();
      tl.from('.hero-bg', { scale: 1.2, opacity: 0, duration: 2, ease: 'power4.out' })
        .from('.hero-title-char', {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.05,
          duration: 1,
          ease: 'back.out(1.7)',
        }, '-=1.5')
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.scroll-indicator', { opacity: 0, y: -20, duration: 1 }, '-=0.2');

      // 2. Parallax Banner
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 3. About Section Stagger
      gsap.from('.about-card', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        rotateY: 15,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

      // 4. Projects Reveal
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 75%',
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        stagger: 0.3,
        duration: 1,
        ease: 'elastic.out(1, 0.75)',
      });

      // 5. Skills Marquee (Infinite)
      const marquee = document.querySelector('.skills-marquee-inner');
      if (marquee) {
        const marqueeWidth = marquee.scrollWidth;
        gsap.to('.skills-marquee-inner', {
          x: -marqueeWidth / 2,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }

      // 6. Stats Fade In
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '#stats',
          start: 'top 80%',
        },
        scale: 0.5,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'back.out(1.5)',
      });

    }, mainContainer);

    return () => ctx.revert();
  }, []);


  // Helper to split text for animation
  const SplitText = ({ children, className }: { children: string, className?: string }) => (
    <span className={`inline-block ${className}`}>
      {children.split('').map((char, i) => (
        <span key={i} className="hero-title-char inline-block whitespace-pre">
          {char}
        </span>
      ))}
    </span>
  );

  return (
    <div ref={mainContainer} className="bg-zinc-950 text-zinc-100 min-h-screen overflow-x-hidden font-sans selection:bg-violet-500/30">
      
      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Layer */}
        <div className="hero-bg absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-violet-950/20 z-10" />
           <img 
             src={ASSETS.banner} 
             alt="Banner" 
             className="w-full h-full object-cover filter blur-sm scale-105"
           />
        </div>

        <div className="relative z-20 text-center px-4">
          <div className="mb-6 inline-block">
             <img src={ASSETS.wavingHand} alt="Waving" className="w-20 h-20 animate-pulse inline-block" />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter" ref={heroTextRef}>
            <span className="block text-2xl md:text-4xl font-medium text-zinc-400 mb-2 hero-subtitle">Hi, I'm</span>
            <SplitText className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-zinc-400">
              Dev-in-the-BM
            </SplitText>
          </h1>

          <div className="hero-subtitle flex flex-col md:flex-row items-center justify-center gap-4 text-lg md:text-2xl font-mono text-violet-300">
            <div className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-full border border-violet-500/20 backdrop-blur-md">
              <img src={ASSETS.topHat} alt="Top Hat" className="w-6 h-6" />
              <span>Yeshiva Bochur</span>
            </div>
            <span className="hidden md:inline opacity-50">•</span>
            <div className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-full border border-violet-500/20 backdrop-blur-md">
              <img src={ASSETS.sparkles} alt="Sparkles" className="w-6 h-6" />
              <span>Vibe Coder</span>
            </div>
          </div>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <Globe className="w-5 h-5" />
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 px-4 max-w-5xl mx-auto relative">
        <div className="flex items-center gap-4 mb-16">
           <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full opacity-30" />
           <h2 className="text-4xl font-bold whitespace-nowrap flex items-center gap-3">
             <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png" alt="Info" className="w-10 h-10" />
             About Me
           </h2>
           <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full opacity-30" />
        </div>

        <div ref={aboutCardsRef} className="grid gap-6 md:grid-cols-2">
          <AboutCard 
            icon={ASSETS.topHat} 
            text={<>Yeshiva bochur - currently learning <span className="font-hebrew text-violet-300 font-bold">בתולה נשאת</span></>}
          />
          <AboutCard 
            icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png"
            text={<>App modder - I love making app mods, out of my <em>flip phone</em></>}
          />
          <AboutCard 
            icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Left%20Speech%20Bubble.png"
            text={<>Active on <a href="http://forums.jtechforums.org/invites/8jD5U8NMxr" className="text-violet-400 hover:underline decoration-wavy">JTech Forums</a> — discussing filtering, Linux, & app modding</>}
          />
          <AboutCard 
            icon={ASSETS.penguin}
            text={<>Do you think Linux on desktop is ready to go mainstream? <strong><a href="https://forums.jtechforums.org/t/make-linux-mainstream/1754" className="text-violet-400 hover:underline">Make Linux Mainstream</a></strong></>}
          />
          <AboutCard 
             className="md:col-span-2 bg-gradient-to-r from-zinc-900 to-violet-900/20"
             icon="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png"
             text="Somehow my Linux environment still works. Not sure why."
          />
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-32 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 flex items-center justify-center gap-3">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Star" className="w-10 h-10" />
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <div 
                key={idx} 
                className="project-card group relative p-8 rounded-3xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 hover:border-violet-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-zinc-950 rounded-2xl text-violet-400 shadow-lg shadow-violet-900/10 group-hover:scale-110 transition-transform">
                      {project.icon}
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                      <FaGithub className="w-8 h-8" />
                    </a>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-violet-300 transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 text-lg mb-8 flex-grow">{project.description}</p>
                  <a 
                    href={project.link} 
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-violet-400 hover:text-violet-300"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SPONSORSHIP SECTION --- */}
      <section id="sponsorship" className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 flex items-center justify-center gap-3">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Toolbox.png" alt="Toolbox" className="w-10 h-10" />
            Sponsor My Work
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {SPONSOR_TIERS.map((tier, idx) => (
              <div key={idx} className="about-card flex flex-col items-center p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm text-center hover:bg-zinc-800/40 transition-colors">
                <img src={tier.img} alt={tier.title} className="w-20 h-20 object-contain mb-6 drop-shadow-2xl" />
                <h4 className="font-bold text-xl mb-3">{tier.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-violet-900/20 via-fuchsia-900/20 to-violet-900/20 p-12 rounded-[3rem] border border-violet-500/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Your sponsorship helps me dedicate more time to these projects.
            </h3>
            <a 
              href="https://buymeacoffee.com/devinthebm"
              target="_blank"
              rel="noreferrer"
              className="inline-block hover:scale-110 transition-transform duration-300 ease-out"
            >
              <img 
                src="https://readme-components.vercel.app/api?component=logo&logo=%F0%9F%8D%AB&desc=Buy%20me%20some%20chocolate&fill=linear-gradient%2890deg%2C%20%234D3833%200%25%2C%20%238B4513%20100%25%29&animation=spin&textfill=FFFFFF" 
                alt="Buy me chocolate"
                className="h-16 drop-shadow-2xl"
              />
            </a>
            <p className="mt-8 text-xl flex items-center justify-center gap-2 text-violet-200">
              Thank you for your support! 
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Folded%20Hands.png" alt="Thanks" className="w-8 h-8" />
            </p>
          </div>
        </div>
      </section>

      {/* --- SKILLS MARQUEE --- */}
      <section id="skills" className="py-20 bg-zinc-900 border-y border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-center gap-3 mb-12">
           <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Brain.png" alt="Brain" className="w-10 h-10" />
           <h2 className="text-2xl font-bold uppercase tracking-widest text-zinc-400">Skills & Tools</h2>
        </div>
        
        <div className="skills-marquee relative w-full overflow-hidden py-4">
          {/* Inner container duplicated for seamless loop */}
          <div className="skills-marquee-inner flex w-fit gap-8 px-4">
             {[...SKILLS_BADGES, ...SKILLS_BADGES].map((badge, i) => (
               <img 
                 key={i} 
                 src={badge} 
                 alt="Skill Badge" 
                 className="h-12 md:h-16 object-contain hover:brightness-125 transition-all"
               />
             ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-900 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-900 to-transparent z-10" />
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section id="stats" className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 flex items-center justify-center gap-3">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png" alt="Chart" className="w-8 h-8" />
            GitHub Stats
          </h2>
          
          <div className="flex flex-col gap-8 items-center">
            <img 
              className="stat-item w-full max-w-2xl drop-shadow-2xl"
              src="https://github-readme-stats.vercel.app/api?username=Dev-in-the-BM&show_icons=true&theme=radical" 
              alt="GitHub Stats" 
            />
            <div className="stat-item overflow-x-auto w-full flex justify-center">
               <img 
                 className="max-w-full drop-shadow-lg"
                 src="https://github-profile-trophy.vercel.app/?username=Dev-in-the-BM&theme=radical&column=7&margin-w=15&margin-h=15&title=Followers,Commit,Issues,Repositories,Stars" 
                 alt="Trophies" 
               />
            </div>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <img 
                className="stat-item h-10"
                src="https://komarev.com/ghpvc/?username=Dev-in-the-BM&label=Profile%20Visitors&color=blueviolet&style=flat-square" 
                alt="Visitors" 
              />
              <img 
                className="stat-item h-10"
                src="https://hit.yhype.me/github/profile?account_id=214166829" 
                alt="Hits" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative pt-32 pb-8">
        <img 
          src={ASSETS.footerWave} 
          alt="Footer Wave" 
          className="absolute bottom-0 left-0 w-full h-auto object-cover opacity-50 pointer-events-none"
        />
        <div className="relative z-10 text-center text-zinc-500 text-sm">
          <p>Crafted with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> by Dev-in-the-BM</p>
          <p className="mt-2 opacity-50">© {new Date().getFullYear()}</p>
        </div>
      </footer>

    </div>
  );
}

// --- Sub-components & Data ---

function AboutCard({ icon, text, className = "" }: { icon: string, text: React.ReactNode, className?: string }) {
  return (
    <div className={`about-card flex items-start gap-4 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 transition-colors ${className}`}>
      <img src={icon} alt="Icon" className="w-8 h-8 shrink-0" />
      <p className="text-zinc-300 leading-relaxed">{text}</p>
    </div>
  );
}

const SKILLS_BADGES = [
  "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
  "https://img.shields.io/static/v1?label=🧠&message=Yiddeshe%20Kup&labelColor=000000&color=333333&style=for-the-badge",
  "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
  "https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white",
  "https://img.shields.io/badge/GNOME-4A86CF?style=for-the-badge&logo=gnome&logoColor=white",
  "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
  "https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white",
  "https://img.shields.io/badge/Zen%20Browser-black?style=for-the-badge&logo=zenbrowser&logoColor=white"
];
