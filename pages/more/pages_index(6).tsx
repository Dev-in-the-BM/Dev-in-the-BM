import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  Github,
  ExternalLink,
  Terminal,
  Coffee,
  Cpu,
  HeartHandshake,
  Wrench,
  BookOpen,
  MessageCircle,
  Star,
  Code2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function UserProfile() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Background Morphing Orbs Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Morphing background orbs
      const orbs = document.querySelectorAll('.orb');
      orbs.forEach((orb) => {
        gsap.to(orb, {
          x: 'random(-100, 100, 5)',
          y: 'random(-100, 100, 5)',
          scale: 'random(0.8, 1.2)',
          duration: 'random(3, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Hero animations
      const tl = gsap.timeline();
      tl.from('.hero-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      })
      .from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.5');

      // General Section Scroll Triggers
      gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section.querySelectorAll('.animate-up'), {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      });

      // Staggered list items
      gsap.utils.toArray('.stagger-list').forEach((list) => {
        gsap.from(list.children, {
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
          },
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      });

      // Stats parallax
      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: '.stats-section',
          scrub: true,
        },
        y: -100,
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0a0a0a] text-gray-100 overflow-hidden font-sans selection:bg-violet-500/30">
      <Head>
        <title>Dev-in-the-BM | Vibe Coder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Morphing Background Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] mix-blend-screen" />
        <div className="orb absolute top-3/4 right-1/4 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[128px] mix-blend-screen" />
        <div className="orb absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 space-y-24">
        
        {/* HERO SECTION */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center relative">
          <div className="hero-text mb-8 relative">
             {/* Banner recreated as a sleek glowing frame if image fails, or utilizing it if it works */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-white/10 max-w-2xl mx-auto mb-12 animate-up">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent mix-blend-overlay pointer-events-none" />
                <img 
                    src="https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/banner.png?raw=true" 
                    alt="Profile Banner" 
                    className="w-full h-auto object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Hi <span className="inline-block animate-wave origin-bottom-right">👋</span>, I'm 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-300 to-blue-400 ml-4">
                Dev-in-the-BM
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-4 hero-text">
            <Badge icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Top%20Hat.png" alt="Top Hat" className="w-6 h-6" />} text="Yeshiva Bochur" color="bg-blue-500/10 text-blue-300 border-blue-500/20" />
            <Badge icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" className="w-6 h-6" />} text="Vibe Coder" color="bg-violet-500/10 text-violet-300 border-violet-500/20" />
          </div>
          
          <div className="absolute bottom-10 animate-bounce">
            <Code2 className="w-6 h-6 text-gray-500 opacity-50" />
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="relative">
          <SectionHeader 
            icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png" alt="Info" className="w-8 h-8" />} 
            title="About Me"
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm animate-up">
             <div className="md:col-span-2 flex items-center justify-center p-6">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" alt="Computer" className="w-48 h-48 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
             </div>
             <div className="md:col-span-3 flex flex-col justify-center space-y-6 stagger-list">
                <InfoItem 
                  icon={<BookOpen className="w-5 h-5 text-blue-400" />}
                  text={<span><strong>Yeshiva bochur</strong> — currently learning בתולה נשאת</span>}
                />
                <InfoItem 
                  icon={<Wrench className="w-5 h-5 text-amber-400" />}
                  text={<span><strong>App modder</strong> — making mods on my <i>flip phone</i></span>}
                />
                 <InfoItem 
                  icon={<MessageCircle className="w-5 h-5 text-green-400" />}
                  text={<span>Active on <a href="http://forums.jtechforums.org/invites/8jD5U8NMxr" className="text-violet-400 hover:underline">JTech Forums</a> — discussing kosher tech & Linux</span>}
                />
                <InfoItem 
                  icon={<Terminal className="w-5 h-5 text-gray-400" />}
                  text={<span>Advocate for <strong><a href="https://forums.jtechforums.org/t/make-linux-mainstream/1754" className="text-violet-400 hover:underline">Linux Mainstream</a></strong> on desktop</span>}
                />
                 <InfoItem 
                  icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Penguin.png" alt="Penguin" className="w-5 h-5" />}
                  text="Somehow my Linux environment still works."
                />
             </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects">
          <SectionHeader 
             icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Star" className="w-8 h-8" />}
             title="Featured Projects"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard 
              title="Jdate"
              description="A GNOME extension adding the Jewish date to the top bar."
              link="https://github.com/Dev-in-the-BM/JDate-devinthebm.com"
              tags={['GNOME', 'Extension', 'Jewish Tech']}
            />
            <ProjectCard 
              title="Crescent Remixer"
              description="Nano Banana powered image remixer."
              link="https://github.com/Dev-in-the-BM/Crescent-Remixer"
              tags={['Image Processing', 'Remixer']}
            />
          </div>
        </section>

        {/* SPONSORSHIP */}
        <section id="sponsor" className="relative overflow-hidden p-1 rounded-3xl">
           {/* Animated border gradient attempt using straight CSS for performance */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 opacity-30 blur-xl animate-pulse" />
          
          <div className="relative bg-[#0F0F0F] rounded-3xl p-8 md:p-12 border border-white/10">
            <SectionHeader 
                icon={<HeartHandshake className="w-8 h-8 text-pink-400" />}
                title="Support My Work"
                className="!mb-8"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-up">
              <SponsorPillar 
                icon={<img src="https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/Assets/Tux.PNG?raw=true" alt="Tux" className="w-16 h-16 object-contain" />}
                title="FOSS Projects"
                desc="Contributing to and creating open-source software."
              />
              <SponsorPillar 
                icon={<img src="https://raw.githubusercontent.com/Dev-in-the-BM/Dev-in-the-BM/5faee36148d23546f43bd27b61012bec21164caa/android-head_flat.svg" alt="Android" className="w-16 h-16 object-contain" />}
                title="Android Mods"
                desc="Modifying apps for kashrus and filtered devices."
              />
              <SponsorPillar 
                icon={<img src="https://github.com/Dev-in-the-BM/Dev-in-the-BM/blob/main/Jtech%20Logo.png?raw=true" alt="JTech" className="w-16 h-16 object-contain" />}
                title="JTech Forums"
                desc="Active contribution to kosher tech discussions."
              />
            </div>

            <div className="text-center animate-up space-y-6">
              <p className="text-xl text-gray-300 font-medium">Your sponsorship helps me dedicate time to these projects.</p>
              <a 
                href="https://buymeacoffee.com/devinthebm"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-amber-900/80 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 overflow-hidden"
              >
                 <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800"></span>
                 <span className="relative flex items-center gap-3">
                    <Coffee className="w-6 h-6" /> Buy me some chocolate
                 </span>
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS & TOOLS */}
        <section id="skills">
          <SectionHeader 
             icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Brain.png" alt="Brain" className="w-8 h-8" />}
             title="Skills & Tools"
          />

          <div className="space-y-8 animate-up">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-300">
                <Terminal className="w-5 h-5" /> Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" className="h-10 rounded-md shadow-lg shadow-blue-900/20 hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-violet-300">
                <Cpu className="w-5 h-5" /> Environments & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                 <SkillBadge src="https://img.shields.io/static/v1?label=🧠&message=Yiddeshe%20Kup&labelColor=000000&color=333333&style=for-the-badge" alt="Yiddeshe Kup" />
                 <SkillBadge src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
                 <SkillBadge src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" alt="Ubuntu" />
                 <SkillBadge src="https://img.shields.io/badge/GNOME-4A86CF?style=for-the-badge&logo=gnome&logoColor=white" alt="GNOME" />
                 <SkillBadge src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
                 <SkillBadge src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code" />
                 <SkillBadge src="https://img.shields.io/badge/Zen%20Browser-black?style=for-the-badge&logo=zenbrowser&logoColor=white" alt="Zen Browser" />
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section id="stats" className="stats-section relative">
           <SectionHeader 
             icon={<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png" alt="Chart" className="w-8 h-8" />}
             title="GitHub Stats"
           />
           <div className="flex flex-col items-center space-y-6 animate-up p-6 bg-black/30 rounded-3xl border border-white/5 backdrop-blur-md">
              <img src="https://github-readme-stats.vercel.app/api?username=Dev-in-the-BM&show_icons=true&theme=radical" alt="GitHub Stats" className="w-full max-w-2xl drop-shadow-2xl" />
              
              <div className="w-full overflow-x-auto flex justify-center no-scrollbar">
                 <img src="https://github-profile-trophy.vercel.app/?username=Dev-in-the-BM&theme=radical&column=7&margin-w=15&margin-h=15&title=Followers,Commit,Issues,Repositories,Stars" alt="Trophies" className="h-32 md:h-auto min-w-[600px] object-contain drop-shadow-lg" />
              </div>

              <div className="flex flex-wrap justify-center gap-4 items-center pt-6">
                 <img src="https://komarev.com/ghpvc/?username=Dev-in-the-BM&label=Profile%20Visitors&color=blueviolet&style=flat-square" alt="Visitor Count" className="h-8" />
                 <img src="https://hit.yhype.me/github/profile?account_id=214166829" alt="Hit Counter" className="h-8" />
              </div>
           </div>
        </section>
      </main>

      {/* FOOTER WAVE */}
      <footer className="relative mt-32 w-full overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-violet-900/20 to-transparent" />
        <img 
            src="https://capsule-render.vercel.app/api?type=waving&height=150&color=gradient&section=footer"
            alt="Footer Wave" 
            className="w-full h-auto relative z-10 object-cover opacity-80 mix-blend-screen"
        />
      </footer>

      {/* Global styles for wave animation and scrollbar hiding */}
      <style>{`
        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .animate-wave {
          animation-name: wave;
          animation-duration: 2.5s;
          animation-iteration-count: infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        /* Hide scrollbar for horizontal scroll areas */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function Badge({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <div className={`hero-badge flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md ${color} font-medium shadow-lg`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

function SectionHeader({ icon, title, className = '' }: { icon: React.ReactNode; title: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 mb-8 animate-up ${className}`}>
      <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-inner">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
        {title}
      </h2>
    </div>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300">
      <div className="mt-1 shrink-0 p-2 bg-black/40 rounded-lg border border-white/5">
        {icon}
      </div>
      <p className="text-lg text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

function ProjectCard({ title, description, link, tags }: { title: string; description: string; link: string; tags: string[] }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 overflow-hidden hover:border-violet-500/50 transition-all duration-500 animate-up"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold group-hover:text-violet-300 transition-colors">{title}</h3>
        <Github className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
      </div>

      <p className="relative z-10 text-gray-400 mb-8 grow">{description}</p>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium text-violet-200 bg-violet-500/10 rounded-full border border-violet-500/20">
            {tag}
          </span>
        ))}
      </div>

      <ExternalLink className="absolute bottom-6 right-6 w-5 h-5 text-white/20 group-hover:text-violet-400 group-hover:scale-125 transition-all duration-300" />
    </a>
  );
}

function SponsorPillar({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-black/20 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors duration-300">
      <div className="mb-4 p-4 bg-gradient-to-b from-white/5 to-transparent rounded-2xl">
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function SkillBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-10 rounded-md shadow-lg shadow-black/20 hover:-translate-y-1 hover:shadow-violet-500/20 transition-all duration-300"
    />
  );
}
