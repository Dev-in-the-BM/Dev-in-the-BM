import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  HeartHandshake, 
  Coffee, 
  Github, 
  ArrowUpRight,
  Wrench,
  MessageCircle,
  Linux,
  Smartphone
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function UserProfile() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  // Custom Cursor Logic
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isHoveringLink) {
      gsap.to(cursor, { scale: 3, opacity: 0.2, duration: 0.3 });
    } else {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    }
  }, [isHoveringLink]);

  const onLinkEnter = () => setIsHoveringLink(true);
  const onLinkLeave = () => setIsHoveringLink(false);


  // Main Animations
  useGSAP(() => {
    // Initial reveal
    const tl = gsap.timeline();
    tl.to('.loader-overlay', {
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut',
      delay: 0.5
    })
    .from('.hero-title-char', {
      y: 150,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'back.out(1.7)',
    }, '-=0.8')
    .from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6');

    // Parallax Banner
    gsap.to('.hero-banner', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Section Headers Reveal
    gsap.utils.toArray('.section-header').forEach((header: any) => {
      gsap.from(header, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // About Cards Stagger
    gsap.from('.about-card', {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 75%',
      }
    });

    // Project Cards Parallax/Rotate
    gsap.utils.toArray('.project-card').forEach((card: any) => {
      gsap.from(card, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      });
    });

  }, { scope: mainRef });


  return (
    <div ref={mainRef} className="bg-zinc-950 text-zinc-100 min-h-screen overflow-hidden selection:bg-purple-500/30">
      <Head>
        <title>Dev-in-the-BM | Vibe Coder</title>
      </Head>

      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-purple-500 rounded-full pointer-events-none mix-blend-difference z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      {/* Loader Overlay */}
      <div className="loader-overlay fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-purple-500 animate-pulse font-mono text-xl">INITIALIZING VIBES...</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center mix-blend-difference">
        <span className="font-bold font-mono text-xl tracking-tighter">DEV-IN-THE-BM</span>
        <div className="flex gap-6 font-mono text-sm">
          {['About', 'Projects', 'Sponsor'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>
              // {item}
            </a>
          ))}
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image Parallax */}
          <div className="absolute inset-0 z-0 opacity-40">
             <div 
                className="hero-banner w-full h-[120%] bg-cover bg-center"
                style={{ backgroundImage: 'url(https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/banner.png?raw=true)' }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-purple-900/20" />
          </div>

          <div className="relative z-10 text-center space-y-8 px-4">
            <div className="overflow-hidden">
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter flex justify-center gap-1 md:gap-4">
                {"DEV-IN-THE-BM".split('').map((char, i) => (
                  <span key={i} className="hero-title-char inline-block">{char}</span>
                ))}
              </h1>
            </div>
            
            <div className="hero-subtitle flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-3xl font-light">
              <span className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-6 py-3 rounded-full border border-zinc-800">
                 <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Top%20Hat.png" alt="Top Hat" className="w-8 h-8" />
                 Yeshiva Bochur
              </span>
              <span className="hidden md:inline text-purple-500">•</span>
              <span className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-6 py-3 rounded-full border border-purple-500/30 text-purple-300">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" className="w-8 h-8" />
                Vibe Coder
              </span>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowUpRight className="rotate-135 text-zinc-600" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="section-header text-5xl md:text-7xl font-bold mb-24 flex items-center gap-6">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png" alt="Info" className="w-16 h-16" />
            About Me
          </h2>

          <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <AboutCard 
              icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Top%20Hat.png" alt="Top Hat" className="w-12 h-12" />}
              title="Yeshiva Bochur"
              description="Currently learning בתולה נשאת. Balancing tradition with tech."
              gradient="from-blue-900/20 to-zinc-900"
            />
            <AboutCard 
              icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer" className="w-12 h-12" />}
              title="App Modder"
              description="I love making app mods, right out of my flip phone. Yes, really."
              gradient="from-amber-900/20 to-zinc-900"
              special={true}
            />
            <AboutCard 
              icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Left%20Speech%20Bubble.png" alt="Chat" className="w-12 h-12" />}
              title="Community Active"
              description="Discussing filtering, Linux, and kosher tech on JTech Forums."
              link="http://forums.jtechforums.org/invites/8jD5U8NMxr"
              gradient="from-green-900/20 to-zinc-900"
            />
            <AboutCard 
              icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Penguin.png" alt="Linux" className="w-12 h-12" />}
              title="Linux Enthusiast"
              description="Advocating to make Linux mainstream on desktop. It still works on my machine, somehow."
              link="https://forums.jtechforums.org/t/make-linux-mainstream/1754"
              gradient="from-purple-900/20 to-zinc-900"
            />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32 px-6 md:px-12 bg-zinc-900/50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="section-header text-5xl md:text-7xl font-bold mb-24 flex items-center gap-6">
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Star" className="w-16 h-16" />
              Featured Work
            </h2>

            <div className="space-y-32">
              <ProjectCard 
                title="Jdate"
                description="A GNOME extension adding the Jewish date to the top bar. Seamlessly integrates halachic times into your daily Linux workflow."
                tags={["GNOME", "JavaScript", "Linux"]}
                link="https://github.com/Dev-in-the-BM/JDate-devinthebm.com"
                align="left"
                onEnter={onLinkEnter}
                onLeave={onLinkLeave}
              />
              <ProjectCard 
                title="Crescent Remixer"
                description="Nano Banana powered image remixer. A creative tool for rapid image manipulation and remixing."
                tags={["Image Processing", "Remix", "Creative Tool"]}
                link="https://github.com/Dev-in-the-BM/Crescent-Remixer"
                align="right"
                onEnter={onLinkEnter}
                onLeave={onLinkLeave}
              />
            </div>
          </div>
        </section>

        {/* SPONSOR & SKILLS HYBRID SECTION */}
        <section id="sponsor" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          
          {/* Skills Grid - Magnetic Style */}
          <div className="mb-48">
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-4 text-zinc-400">
               <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Brain.png" alt="Brain" className="w-10 h-10" />
               Skills & Arsenal
            </h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
               <SkillBadge label="Yiddeshe Kup" emoji="🧠" bgColor="bg-zinc-800" textColor="text-white" />
               <SkillBadge label="Python" color="#3776AB" />
               <SkillBadge label="Linux" color="#FCC624" textColor="text-black" />
               <SkillBadge label="Ubuntu" color="#E95420" />
               <SkillBadge label="GNOME" color="#4A86CF" />
               <SkillBadge label="Git" color="#F05032" />
               <SkillBadge label="VS Code" color="#007ACC" />
               <SkillBadge label="Zen Browser" color="#000000" />
            </div>
          </div>

          {/* Sponsorship Pillars */}
          <div className="relative">
            <h2 className="section-header text-center text-5xl md:text-7xl font-bold mb-16">
              <span className="inline-block">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Toolbox.png" alt="Toolbox" className="w-16 h-16 inline-block mr-4 align-middle" />
                Support the Craft
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <SponsorPillar 
                icon={<img src="https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/Assets/Tux.PNG?raw=true" alt="Tux" className="w-20 h-20 object-contain" />}
                title="FOSS Projects"
                description="Contributing to and creating open-source software for the community."
              />
              <SponsorPillar 
                icon={<img src="https://raw.githubusercontent.com/Dev-in-the-BM/Dev-in-the-BM/5faee36148d23546f43bd27b61012bec21164caa/android-head_flat.svg" alt="Android" className="w-20 h-20 object-contain" />}
                title="Android App Mods"
                description="Modifying Android apps for kashrus and better usability on filtered devices."
                highlight
              />
              <SponsorPillar 
                icon={<img src="https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/Jtech%20Logo.png?raw=true" alt="JTech" className="w-20 h-20 object-contain" />}
                title="JTech Forums"
                description="Active participation in kosher tech, filtering, and Linux discussions."
              />
            </div>

            <div className="text-center space-y-8">
              <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">Your sponsorship helps me dedicate more time to these projects.</p>
              
              <a 
                href="https://buymeacoffee.com/devinthebm"
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4D3833] to-[#8B4513] px-8 py-4 rounded-xl text-white font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-lg shadow-orange-900/20"
              >
                <Coffee className="animate-spin-slow" />
                Buy me some chocolate
              </a>

              <div className="pt-8 flex items-center justify-center gap-3 text-zinc-300">
                Thank you for your support! <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Folded%20Hands.png" alt="Thanks" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER / STATS */}
        <footer className="relative pt-32 pb-12 px-6 bg-zinc-900 mt-32">
          {/* Wave Separator handled by an image for exact match to readme style but made fluid */}
          <div className="absolute top-0 left-0 right-0 -translate-y-full">
             <img src="https://capsule-render.vercel.app/api?type=waving&height=150&color=gradient&section=footer" alt="wave" className="w-full h-auto object-cover" />
          </div>

          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold mb-12 flex items-center gap-3 text-zinc-300">
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png" alt="Chart" className="w-8 h-8" />
              GitHub Neural Net
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start opacity-80 hover:opacity-100 transition-opacity duration-500">
              <div className="space-y-4">
                <img src="https://github-readme-stats.vercel.app/api?username=Dev-in-the-BM&show_icons=true&theme=radical" alt="GitHub Stats" className="w-full h-auto rounded-xl shadow-2xl shadow-purple-900/20" />
                <div className="flex flex-wrap gap-4">
                   <img src="https://komarev.com/ghpvc/?username=Dev-in-the-BM&label=Profile%20Visitors&color=blueviolet&style=flat-square" alt="Visitors" className="h-8" />
                   <img src="https://hit.yhype.me/github/profile?account_id=214166829" alt="Hits" className="h-8" />
                </div>
              </div>
              <div>
                <img src="https://github-profile-trophy.vercel.app/?username=Dev-in-the-BM&theme=radical&column=7&margin-w=15&margin-h=15&title=Followers,Commit,Issues,Repositories,Stars" alt="Trophies" className="w-full h-auto" />
              </div>
            </div>
            
            <div className="mt-32 text-center text-zinc-600 font-mono text-sm">
              © {new Date().getFullYear()} DEV-IN-THE-BM. TERMINAL SESSION ENDED.
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

// Sub-components

function AboutCard({ icon, title, description, link, gradient, special = false }: any) {
  return (
    <div className={`about-card group relative p-[1px] rounded-3xl overflow-hidden ${special ? 'md:col-span-2' : ''}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative h-full bg-zinc-950/90 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between border border-zinc-800/50 group-hover:border-zinc-700 transition-colors">
        <div>
          <div className="mb-6">{icon}</div>
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-zinc-400 text-lg leading-relaxed">{description}</p>
        </div>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 uppercase font-bold tracking-wider text-sm">
            Learn more <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
        {special && (
            <div className="absolute top-4 right-4 opacity-20 rotate-12">
                <Smartphone size={120} />
            </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ title, description, tags, link, align = 'left', onEnter, onLeave }: any) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Tilt Effect
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const xPct = x / bounds.width - 0.5;
    const yPct = y / bounds.height - 0.5;
    
    gsap.to(cardRef.current, {
      rotationY: xPct * 10,
      rotationX: -yPct * 10,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const onReset = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
    if (onLeave) onLeave();
  };

  return (
    <div 
      className={`project-card flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
      onMouseEnter={onEnter}
    >
      <div className="flex-1 space-y-6 text-left">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 text-xs font-mono bg-zinc-800 rounded-full text-zinc-400 border border-zinc-700">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter">{title}</h3>
        <p className="text-xl text-zinc-400 leading-relaxed">{description}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-purple-400 transition-colors"
        >
          <Github className="w-5 h-5" />
          View Project
        </a>
      </div>

      <div className="flex-1 w-full perspective-1000">
        <div 
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onReset}
          className="w-full aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden relative group"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Mock UI for project visualization */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
            <Terminal className="w-20 h-20 text-zinc-700 group-hover:text-purple-500/50 transition-colors" />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-mono tracking-widest border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
              ACCESS_TERMINAL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsorPillar({ icon, title, description, highlight = false }: any) {
  return (
    <div className={`relative p-8 rounded-2xl border ${highlight ? 'border-purple-500/50 bg-purple-900/10' : 'border-zinc-800 bg-zinc-900/30'} text-center flex flex-col items-center gap-6 hover:-translate-y-2 transition-all duration-300`}>
      <div className="h-24 flex items-center justify-center drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
        {icon}
      </div>
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}

function SkillBadge({ label, color, textColor = 'text-white', bgColor, emoji }: any) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Simple magnetic effect on hover
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = e.clientX - (bounds.left + bounds.width / 2);
    const y = e.clientY - (bounds.top + bounds.height / 2);
    gsap.to(ref.current, { x: x * 0.2, y: y * 0.2, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg cursor-default transition-transform hover:z-10 hover:scale-110 ${textColor}`}
      style={{ backgroundColor: bgColor || color }}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </div>
  );
}
