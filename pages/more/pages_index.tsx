import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { 
  ArrowRight, Github, Linkedin, Mail, ExternalLink, 
  Code2, Briefcase, User, Sparkles, Download, ChevronDown 
} from 'lucide-react';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Setup & Utilities ---
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const DATA = {
  hero: {
    title1: "Creative",
    title2: "Developer",
    subtitle: "Crafting immersive digital experiences at the intersection of art and code."
  },
  projects: [
    {
      id: 'p0',
      type: 'intro',
      title: "Selected Works",
      description: "A showcase of my best projects, ranging from experimental web apps to full-scale production applications."
    },
    {
      id: 'p1',
      title: "Nebula OS",
      category: "Web App",
      description: "A web-based operating system exploring futuristic UI paradigms with WebGL.",
      tags: ["React", "Three.js", "GSAP"],
      color: "from-violet-500 to-fuchsia-500"
    },
    {
      id: 'p2',
      title: "Chronos Shift",
      category: "Productivity",
      description: "AI-powered time management specifically designed for chaotic creatives.",
      tags: ["Next.js", "OpenAI", "Tailwind"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 'p3',
      title: "Aether Finance",
      category: "Fintech",
      description: "Decentralized dashboard with real-time data visualization and predictive analytics.",
      tags: ["Vue", "D3.js", "Web3"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 'p4',
      title: "Lumina Studio",
      category: "Design Tool",
      description: "Browser-based generative design tool for creating marketing assets.",
      tags: ["Canvas API", "React", "Node.js"],
      color: "from-orange-500 to-amber-500"
    }
  ],
  experience: [
    {
      role: "Senior Frontend Engineer",
      company: "Apex Digital",
      period: "2022 - Present",
      duties: "Leading the core product team, migrating to Next.js app router, improving LCP by 40%."
    },
    {
      role: "Creative Developer",
      company: "Studio Kinetic",
      period: "2019 - 2022",
      duties: "Developed award-winning campaign sites for Fortune 500 clients using WebGL."
    },
    {
      role: "UI Engineer",
      company: "TechNova",
      period: "2017 - 2019",
      duties: "Built and maintained the company's internal design system component library."
    }
  ],
  skills: [
    "JavaScript (ES6+)", "TypeScript", "React / Next.js", "GSAP Animation",
    "Three.js / WebGL", "Tailwind CSS", "Node.js", "PostgreSQL",
    "GraphQL", "Figma", "AWS", "CI/CD Pipelines"
  ]
};

// --- Sub-Components ---

const LiquidBackground = () => {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      blobRefs.current.forEach((blob, i) => {
        if (!blob) return;
        gsap.to(blob, {
          x: "random(-200, 200)",
          y: "random(-150, 150)",
          scale: "random(0.8, 1.4)",
          ease: "sine.inOut",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          delay: i * 2,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const addBlobRef = (el: HTMLDivElement | null) => {
    if (el && !blobRefs.current.includes(el)) {
      blobRefs.current.push(el);
    }
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light pointer-events-none" />
      <div ref={addBlobRef} className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[128px] opacity-40" />
      <div ref={addBlobRef} className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-fuchsia-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-40" />
      <div ref={addBlobRef} className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[96px] opacity-30" />
    </div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        gsap.to(cursorRef.current, { x: clientX, y: clientY, duration: 0 });
        gsap.to(followerRef.current, { x: clientX, y: clientY, duration: 0.3, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none mix-blend-difference z-[999] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none mix-blend-difference z-[999] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
    </>
  );
};

const Navigation = () => {
  const [active, setActive] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'work', label: 'Work', icon: Code2 },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleScroll = (id: string) => {
    gsap.to(window, { duration: 1.2, scrollTo: `#${id}`, ease: 'power4.inOut' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      navItems.forEach((item) => {
        ScrollTrigger.create({
          trigger: `#${item.id}`,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setActive(item.id),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-2 py-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-full shadow-2xl flex gap-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleScroll(item.id)}
          className={cn(
            "relative px-4 py-3 md:py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
            active === item.id ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          <item.icon className={cn("w-5 h-5 md:w-4 md:h-4", active === item.id ? "text-indigo-400" : "")} />
          <span className={cn("hidden md:inline-block", active !== item.id && "lg:inline-block md:hidden")}>
            {item.label}
          </span>
          {active === item.id && (
            <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 animate-pulse" />
          )}
        </button>
      ))}
    </nav>
  );
};

// --- Page Sections ---

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.5 } });

      tl.from(title1Ref.current, { y: 120, opacity: 0, rotate: 7 }, 0.2)
        .from(title2Ref.current, { y: 120, opacity: 0, rotate: -7 }, 0.4)
        .from('.hero-sub', { y: 50, opacity: 0, duration: 1 }, 0.8)
        .from('.hero-cta', { scale: 0.9, opacity: 0, duration: 1, stagger: 0.2 }, 1);

      gsap.to('.scroll-indicator', {
        y: 15,
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative z-10 text-center">
        <h1 className="text-[13vw] sm:text-[11vw] font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 select-none">
          <div className="overflow-hidden py-2">
            <div ref={title1Ref} className="origin-bottom-left">{DATA.hero.title1}</div>
          </div>
          <div className="overflow-hidden py-2">
            <div ref={title2Ref} className="origin-bottom-right">{DATA.hero.title2}</div>
          </div>
        </h1>
        <p className="hero-sub mt-8 text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light">
          {DATA.hero.subtitle}
        </p>
        
        <div className="hero-cta flex flex-wrap gap-4 justify-center mt-12">
          <button onClick={() => gsap.to(window, {scrollTo: '#work', duration: 1.5, ease: 'power4.inOut'})} className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold flex items-center gap-2 overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10">See My Work</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-indigo-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          <button className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
            <Download className="w-5 h-5" />
            <span>Resume</span>
          </button>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-32 md:bottom-12 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};

const WorkSection = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !triggerRef.current) return;

      // Calculate total width to scroll
      const getScrollAmount = () => {
        let sectionWidth = sectionRef.current!.scrollWidth;
        return -(sectionWidth - window.innerWidth);
      };

      const tween = gsap.to(sectionRef.current, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1 + 200}`, // Dynamic end based on content width
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={triggerRef} className="overflow-hidden bg-slate-950">
      <div 
        ref={sectionRef} 
        className="h-screen flex items-center px-6 md:px-24 gap-6 md:gap-20 w-max will-change-transform"
      >
        {DATA.projects.map((item, index) => {
          if (item.type === 'intro') {
            return (
              <div key={item.id} className="w-[80vw] md:w-[30vw] flex-shrink-0 flex flex-col justify-center z-10">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
                  Selected <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
                    Works
                  </span>
                </h2>
                <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                  {item.description}
                </p>
                <div className="flex gap-2 mt-8 items-center text-indigo-300">
                  <ArrowRight className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-sm font-bold">Drag or Scroll</span>
                </div>
              </div>
            );
          }
          return (
            <div 
              key={item.id}
              className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] h-[60vh] md:h-[75vh] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 transition-all duration-500 hover:border-white/20"
            >
               <div className={cn(
                 "absolute inset-0 opacity-20 mix-blend-soft-light bg-gradient-to-br transition-opacity duration-700 group-hover:opacity-50",
                 item.color
               )} />
               
               {/* Content Overlay */}
               <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.tags?.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/90 border border-white/5 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-slate-300 md:text-xl max-w-xl mb-8 line-clamp-2 group-hover:line-clamp-none transition-all">{item.description}</p>
                  
                  <div className="flex">
                    <button className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-indigo-300 transition-colors">
                      View Project <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
               </div>

               {/* Placeholder Image Area */}
               <div className="absolute inset-0 z-0 p-4 md:p-6">
                  <div className="w-full h-full bg-slate-950/20 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-1000 ease-out">
                    <div className="text-slate-500/50 flex flex-col items-center">
                      <Code2 className="w-24 h-24 mb-6 opacity-20" />
                    </div>
                  </div>
               </div>
            </div>
          );
        })}
        {/* Extra space at end */}
        <div className="w-[10vw] flex-shrink-0" />
      </div>
    </section>
  );
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.about-item', {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
      <div className="about-item opacity-0 translate-y-12">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-24">
          About <span className="text-indigo-400">Me</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-20">
        <div>
          <h3 className="about-item opacity-0 translate-y-12 text-2xl font-bold mb-10 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-indigo-400" /> Experience
          </h3>
          <div className="space-y-12">
            {DATA.experience.map((job, i) => (
              <div key={i} className="about-item opacity-0 translate-y-12 relative pl-8 border-l-2 border-slate-800 hover:border-indigo-500/50 transition-colors duration-500">
                <div className="absolute left-[-7px] top-2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-slate-950" />
                <h4 className="text-2xl font-bold text-white mb-1">{job.role}</h4>
                <div className="flex justify-between text-sm font-medium text-indigo-300 mb-4">
                  <span>{job.company}</span>
                  <span>{job.period}</span>
                </div>
                <p className="text-slate-400 leading-relaxed">{job.duties}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="about-item opacity-0 translate-y-12 text-2xl font-bold mb-10 flex items-center gap-3">
            <Code2 className="w-6 h-6 text-indigo-400" /> Skills & Tech
          </h3>
          <div className="flex flex-wrap gap-3">
            {DATA.skills.map((skill, i) => (
              <div 
                key={i} 
                className="about-item opacity-0 translate-y-12 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-sm font-medium hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
          
          <div className="about-item opacity-0 translate-y-12 mt-16 p-8 md:p-10 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2rem] border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
            <p className="text-xl text-slate-300 leading-relaxed relative z-10">
              <span className="text-indigo-400 font-bold">
                Obsessed with performance and interaction.
              </span>{' '}
              I build accessible, pixel-perfect digital experiences that feel natural and engaging. When I'm not shipping code, I'm exploring generative art or hiking offline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-6 flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
      {/* Background Glow for Contact */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter">
        Let's build something <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 animate-gradient-x">
          extraordinary.
        </span>
      </h2>
      <p className="text-slate-400 text-xl md:text-2xl mb-16 max-w-xl leading-relaxed">
        Open for freelance opportunities, collaborations, or just a friendly tech chat.
      </p>
      
      <a 
        href="mailto:hello@example.com"
        className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-slate-900 rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-2xl hover:shadow-indigo-500/25"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out group-hover:h-full opacity-100 group-hover:opacity-0" />
        <span className="relative z-10 flex items-center gap-3">
          Say Hello <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </span>
      </a>

      <div className="mt-24 flex gap-6">
        {[Github, Linkedin, Code2].map((Icon, i) => (
          <a key={i} href="#" className="p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-indigo-500/20">
            <Icon className="w-6 h-6" />
          </a>
        ))}
      </div>
      
      <footer className="absolute bottom-6 text-slate-600 text-sm font-medium">
        © {new Date().getFullYear()} Creative Developer Portfolio.
      </footer>
    </section>
  );
};

// --- Main Component ---

export default function Portfolio() {
  return (
    <main className="bg-slate-950 text-slate-50 min-h-screen selection:bg-indigo-500/90 selection:text-white overflow-x-hidden">
      <LiquidBackground />
      <CustomCursor />
      <Navigation />
      
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
