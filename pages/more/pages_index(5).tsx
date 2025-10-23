import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import {
  Github,
  Terminal,
  Cpu,
  Coffee,
  Heart,
  ExternalLink,
  Smartphone,
  Brain,
  Wrench,
  MessageCircle,
  Code2,
  Sparkles,
  Monitor,
  Ghost
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function DevProfile() {
  const comp = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  // --- Custom Cursor Logic ---
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;
    if (!cursor || !follower) return;

    const posX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' });
    const posY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' });
    const followerX = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const followerY = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      posX(e.clientX);
      posY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 4, opacity: 0.1, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, backgroundColor: '#a855f7', duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, opacity: 0.8, duration: 0.3 });
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
      });
    });

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // --- Main GSAP Animations ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Scramble & Cycle
      const roles = ['Yeshiva Bochur', 'Vibe Coder', 'App Modder', 'Linux Enthusiast'];
      let roleIndex = 0;
      const roleElement = document.querySelector('.role-text');

      if (roleElement) {
        const tl = gsap.timeline({ repeat: -1 });
        roles.forEach((role) => {
          tl.to(roleElement, {
            duration: 1.5,
            text: { value: role, delimiter: "" },
            ease: "none",
          });
          tl.to({}, { duration: 2 }); // Wait
        });
      }

      // General Section Reveals
      gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.animate-up'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        );
      });

      // Parallax Background Elements
      gsap.to('.parallax-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Skills Floating Animation
      gsap.to('.skill-pill', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 1.5,
          from: 'random',
        },
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={comp} className="bg-slate-950 min-h-screen text-slate-200 overflow-hidden selection:bg-purple-500/30">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none mix-blend-difference z-50 -translate-x-1/2 -translate-y-1/2 opacity-80" />
      <div ref={cursorFollowerRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300" />

      {/* Animated Background Mesh */}
      <div className="fixed inset-0 pointer-events-none parallax-bg opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 inset-x-0 z-30 h-16 px-6 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-slate-950/50">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2 interactive">
          <Terminal className="text-purple-400" size={20} />
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Dev-in-the-BM
          </span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-cyan-400 transition-colors interactive">About</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors interactive">Projects</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors interactive">Skills</a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        <div className="text-center space-y-6 max-w-4xl z-10">
          {/* Top Badge */}
          <div className="animate-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-sm mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300">Online & Coding</span>
          </div>

          {/* Main Title with Gradient */}
          <h1 className="animate-up text-6xl md:text-8xl font-black tracking-tighter leading-none">
            Hi, I'm <br className="md:hidden" />
            <span className="bg-gradient-to-br from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
              Dev-in-the-BM
            </span>
            <span className="inline-block animate-bounce ml-4">👋</span>
          </h1>

          {/* Morphing Role Text */}
          <div className="animate-up text-2xl md:text-4xl font-light h-12 text-purple-400">
            <span className="text-slate-500 mr-3">I am a</span>
            <span className="role-text font-mono font-bold border-r-2 border-cyan-400 pr-1"></span>
          </div>

          <p className="animate-up text-slate-400 max-w-xl mx-auto text-lg md:text-xl leading-relaxed">
            Blending Yeshiva life with high-tech vibes. Crafting code, modding apps, and pushing for a Linux-powered future.
          </p>

          {/* CTAs */}
          <div className="animate-up flex gap-4 justify-center mt-8">
            <a href="#projects" className="interactive group relative px-8 py-3 bg-slate-100 text-slate-950 font-bold rounded-full overflow-hidden">
              <div className="absolute inset-0 w-0 bg-cyan-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="relative group-hover:text-white transition-colors flex items-center gap-2">
                See My Work <Sparkles size={16} />
              </span>
            </a>
            <a href="https://github.com/Dev-in-the-BM" target="_blank" rel="noreferrer" className="interactive px-8 py-3 rounded-full border-2 border-slate-700 hover:border-slate-100 transition-colors font-bold flex items-center gap-2">
              <Github size={20} /> GitHub
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <h2 className="animate-up text-4xl md:text-5xl font-bold flex items-center gap-4">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  <Ghost size={32} />
                </div>
                About Me
              </h2>
              <div className="space-y-4 text-lg text-slate-300">
                <div className="animate-up p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-500/30 transition-colors flex gap-4 items-start">
                  <div className="bg-blue-950 p-2 rounded-md mt-1"><Brain size={20} className="text-blue-400" /></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Yeshiva Bochur</h4>
                    <p className="text-slate-400">Currently immersed in learning <span className="text-purple-300 font-mono">בתולה נשאת</span>.</p>
                  </div>
                </div>

                <div className="animate-up p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-500/30 transition-colors flex gap-4 items-start">
                  <div className="bg-green-950 p-2 rounded-md mt-1"><Smartphone size={20} className="text-green-400" /></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Flip Phone Modder</h4>
                    <p className="text-slate-400">I love making app mods, straight out of my <em>flip phone</em>. Yes, really.</p>
                  </div>
                </div>

                <div className="animate-up p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-500/30 transition-colors flex gap-4 items-start">
                  <div className="bg-orange-950 p-2 rounded-md mt-1"><MessageCircle size={20} className="text-orange-400" /></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Community Active</h4>
                    <p className="text-slate-400">Discussing filtering, Linux, and tech on <a href="http://forums.jtechforums.org" className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300">JTech Forums</a>.</p>
                  </div>
                </div>

                <div className="animate-up p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-500/30 transition-colors flex gap-4 items-start">
                  <div className="bg-yellow-950 p-2 rounded-md mt-1"><Monitor size={20} className="text-yellow-400" /></div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Linux Advocate</h4>
                    <p className="text-slate-400">Somehow my environment still works. Let's <a href="#" className="text-cyan-400 underline underline-offset-4">Make Linux Mainstream</a>.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Visual - Abstract flip phone representation */}
            <div className="animate-up flex-1 flex justify-center items-center perspective-1000">
               <div className="relative w-64 h-[400px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden group hover:-rotate-y-12 transition-transform duration-500 ease-out interactive">
                 {/* Screen */}
                 <div className="absolute top-12 inset-x-4 h-64 bg-slate-950 rounded-2xl overflow-hidden flex flex-col p-4 border border-slate-800">
                    <div className="font-mono text-xs text-green-500">$ mod_app.sh --target=kosher_nav</div>
                    <div className="font-mono text-xs text-slate-500 mt-2">&gt; Decompiling APK...</div>
                    <div className="font-mono text-xs text-slate-500">&gt; Patching manifest...</div>
                    <div className="font-mono text-xs text-green-500 blinking-cursor mt-2">_</div>
                 </div>
                 {/* Keypad hint */}
                 <div className="absolute bottom-8 inset-x-12 grid grid-cols-3 gap-2 opacity-50">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-slate-700 mx-auto" />
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECTS --- */}
      <section id="projects" className="py-32 px-6 bg-slate-950/80 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="animate-up text-4xl md:text-6xl font-black text-center mb-24">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Featured Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="animate-up group relative interactive">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative h-full bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between overflow-hidden hover:-translate-y-2 transition-all duration-300">
                 <div>
                   <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-slate-800 rounded-2xl">
                       <Code2 className="text-purple-400" size={32} />
                     </div>
                     <a href="https://github.com/Dev-in-the-BM/JDate-devinthebm.com" target="_blank" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                       <ExternalLink size={24} className="text-slate-400" />
                     </a>
                   </div>
                   <h3 className="text-3xl font-bold mb-4">JDate GNOME</h3>
                   <p className="text-slate-400 text-lg mb-8">
                     A sleek GNOME extension adding the Jewish date seamlessly to your top bar. Integrated perfectly for Linux users.
                   </p>
                 </div>
                 <div className="flex gap-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-300">GNOME</span>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-300">JavaScript</span>
                 </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="animate-up group relative interactive">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative h-full bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between overflow-hidden hover:-translate-y-2 transition-all duration-300">
                 <div>
                   <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-slate-800 rounded-2xl">
                       <Wrench className="text-orange-400" size={32} />
                     </div>
                     <a href="https://github.com/Dev-in-the-BM/Crescent-Remixer" target="_blank" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                       <ExternalLink size={24} className="text-slate-400" />
                     </a>
                   </div>
                   <h3 className="text-3xl font-bold mb-4">Crescent Remixer</h3>
                   <p className="text-slate-400 text-lg mb-8">
                     Nano Banana powered image remixer. A powerful tool for on-the-fly creative image manipulation.
                   </p>
                 </div>
                 <div className="flex gap-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-300">Image Processing</span>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-300">Tools</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILLS & TOOLS --- */}
      <section id="skills" className="py-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="animate-up text-4xl md:text-5xl font-bold mb-16 flex justify-center items-center gap-4">
            <Brain className="text-pink-500" size={40} />
            Skills & Tools
          </h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
             {[ 
               { name: 'Yiddeshe Kup', color: 'bg-pink-950 text-pink-300 border-pink-800', icon: <Brain size={18}/> },
               { name: 'Python', color: 'bg-blue-950 text-blue-300 border-blue-800', icon: <Terminal size={18}/> },
               { name: 'Linux', color: 'bg-yellow-950 text-yellow-300 border-yellow-800', icon: <Cpu size={18}/> },
               { name: 'Ubuntu', color: 'bg-orange-950 text-orange-300 border-orange-800', icon: <Terminal size={18}/> },
               { name: 'GNOME', color: 'bg-blue-950 text-blue-200 border-blue-700', icon: <Monitor size={18}/> },
               { name: 'Git', color: 'bg-red-950 text-red-300 border-red-800', icon: <Code2 size={18}/> },
               { name: 'VS Code', color: 'bg-sky-950 text-sky-300 border-sky-800', icon: <Code2 size={18}/> },
               { name: 'Zen Browser', color: 'bg-slate-800 text-slate-300 border-slate-700', icon: <ExternalLink size={18}/> },
             ].map((skill) => (
               <div key={skill.name} className={`animate-up skill-pill interactive px-6 py-3 rounded-full border ${skill.color} font-bold flex items-center gap-3 shadow-lg hover:scale-110 transition-transform cursor-default`}>
                 {skill.icon}
                 {skill.name}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- SPONSOR & STATS --- */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Sponsorship Area */}
          <div className="animate-up rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900/20 border border-slate-800 p-8 md:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full" />
             
             <Heart className="text-red-500 mx-auto mb-6 animate-pulse" size={48} />
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Support My Work</h2>
             <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
               Your sponsorship helps me dedicate more time to FOSS projects, Android App Mods for kashrus, and community building on JTech Forums.
             </p>
             
             <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a href="https://buymeacoffee.com/devinthebm" target="_blank" className="interactive group relative inline-flex items-center gap-3 px-8 py-4 bg-[#FFDD00] text-slate-900 font-black rounded-full overflow-hidden hover:scale-105 transition-transform">
                  <Coffee size={24} className="group-hover:rotate-12 transition-transform" />
                  <span>Buy me some chocolate</span>
                </a>
             </div>
          </div>

          {/* GitHub Stats Image Grid (Styled) */}
          <div className="animate-up space-y-6 opacity-80 hover:opacity-100 transition-opacity duration-500">
             <h3 className="text-center text-xl font-bold text-slate-500 mb-8 tracking-widest uppercase">GitHub Vitality</h3>
             <div className="flex justify-center">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=Dev-in-the-BM&show_icons=true&theme=radical&bg_color=0f172a&hide_border=true" 
                alt="GitHub Stats" 
                className="rounded-xl shadow-2xl"
              />
             </div>
             <div className="hidden md:flex justify-center">
               <img src="https://github-profile-trophy.vercel.app/?username=Dev-in-the-BM&theme=radical&column=7&margin-w=15&margin-h=15&no-bg=true" alt="Trophies" className="grayscale hover:grayscale-0 transition-all duration-500" />
             </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center text-slate-500 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=0f172a&section=footer" className="w-full absolute bottom-full" alt="" />
        <p className="flex items-center justify-center gap-2 mb-4">
           Made with <Heart size={16} className="text-red-500 fill-red-500" /> by Dev-in-the-BM
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/Dev-in-the-BM" className="hover:text-cyan-400 transition-colors"><Github size={20} /></a>
        </div>
      </footer>

    </div>
  );
}
