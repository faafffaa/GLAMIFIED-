import React, { useEffect, useMemo } from "react"; 
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, BadgeCheck } from "lucide-react";

// ---- Force PURE LIGHT theme immediately
try { document.documentElement.classList.remove("dark"); localStorage.setItem("theme", "light"); } catch {}

/*
  Glamified Solutions — Light Theme (React preview)
  • Pages: Home, Services, Projects, About, Recruitment, Contact
  • Minimal luxury design (light only), smooth animations, responsive
  • WhatsApp floating button site‑wide, Contact uses mailto:
*/

// ===== Tiny self-tests
(function tests(){
  const cx = (...a) => a.filter(Boolean).join(" ");
  console.assert(cx("a", false, "b") === "a b", "cx joins truthy");
  console.assert(cx() === "", "cx empty case");
  console.assert(cx("x", "", "y") === "x y", "cx strips empty strings");
  const subject = encodeURIComponent("[Website] Test");
  const body = encodeURIComponent("Name: A\\nEmail: a@b.com\\nPhone: 1\\nMessage: Hi");
  const mailto = `mailto:glamifiedsolutions@gmail.com?subject=${subject}&body=${body}`;
  console.assert(/^mailto:/.test(mailto), "mailto prefix");
})();

// ===== Utilities
const cx = (...a) => a.filter(Boolean).join(" ");

// ===== Brand Logo (SVG)
function Logo({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bfa27a" />
          <stop offset="1" stopColor="#d9c6a1" />
        </linearGradient>
      </defs>
      <rect rx="14" width="64" height="64" fill="#f9f9f9" />
      <path d="M16 40c0-10.5 8.5-19 19-19h13v6H35c-7.2 0-13 5.8-13 13v0h26v6H16z" fill="url(#g)" />
    </svg>
  );
}

// ===== Marquee (logos from reputable CDNs)
function Marquee() {
  const logos = useMemo(() => ([
    { alt: 'Vite', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg' },
    { alt: 'React', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { alt: 'Tailwind', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
    { alt: 'Cloudflare', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg' },
    { alt: 'Supabase', src: 'https://supabase.com/images/logo-dark.svg' },
    { alt: 'Netlify', src: 'https://www.netlify.com/v3/img/components/logomark-dark.png' },
  ]), []);
  return (
    <div className="overflow-hidden bg-slate-50 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite] items-center opacity-70">
          {[...logos, ...logos].map((l, i) => (
            <img key={i} src={l.src} alt={l.alt} className="h-6 w-auto" loading="lazy" />
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%);} }`}</style>
    </div>
  );
}

// ===== Reusable
function Section({ children, className }) {
  return (
    <section className={cx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16", className)}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
        {children}
      </motion.div>
    </section>
  );
}
const H2 = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold tracking-tight luxe-underline inline-block">{children}</h2>
);
const CTA = ({ to, children }) => (
  <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
    <Link to={to} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-6 h-11 font-medium hover:brightness-110 transition-colors">
      {children} <ArrowRight className="w-4 h-4"/>
    </Link>
  </motion.div>
);

// ===== Shell/Layout
function Shell({ children }) {
  const loc = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [loc.pathname]);

  const NavLink = ({ to, label }) => (
    <Link to={to} className="hover:text-[#bfa27a] transition-colors">
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Glamified Solutions home">
            <Logo className="w-8 h-8" />
            <span className="font-semibold tracking-tight">Glamified Solutions</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" label="Home" />
            <NavLink to="/services" label="Services" />
            <NavLink to="/projects" label="Projects" />
            <NavLink to="/about" label="About" />
            <NavLink to="/recruitment" label="Recruitment" />
            <NavLink to="/contact" label="Contact" />
          </nav>
          <a href="tel:+919516929348" className="hidden sm:inline-flex">
            <button className="h-10 px-4 rounded-2xl bg-[#bfa27a] text-white font-medium">Call Us</button>
          </a>
        </div>
      </header>

      <Marquee />

      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} className="flex-1">
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2"><Logo className="w-7 h-7"/><span className="font-semibold">Glamified Solutions</span></div>
            <p className="mt-3 text-slate-600">We craft digital experiences with minimal luxury—fast, simple, and built to scale.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <div className="font-semibold">Company</div>
              <Link to="/about" className="block hover:text-[#bfa27a]">About</Link>
              <Link to="/projects" className="block hover:text-[#bfa27a]">Projects</Link>
              <Link to="/recruitment" className="block hover:text-[#bfa27a]">Careers</Link>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Services</div>
              <Link to="/services" className="block hover:text-[#bfa27a]">AI & Web Engineering</Link>
              <Link to="/services#uiux" className="block hover:text-[#bfa27a]">UI/UX</Link>
              <Link to="/services#perf" className="block hover:text-[#bfa27a]">Performance</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <p className="text-slate-600 mt-2">glamifiedsolutions@gmail.com</p>
            <p className="text-slate-600">+91 95169 29348</p>
          </div>
        </div>
        <div className="text-xs text-center text-slate-500 mt-6">© {new Date().getFullYear()} Glamified Solutions. All rights reserved.</div>
      </footer>

      {/* WhatsApp floating button */}
      <a href="https://wa.me/919516929348" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="rounded-full h-14 w-14 grid place-items-center shadow-xl bg-[#25D366] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true"><path fill="currentColor" d="M19.11 17.45c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.6.07-.27-.14-1.14-.42-2.17-1.34-.8-.7-1.34-1.56-1.5-1.82-.16-.27-.02-.41.12-.55.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.44-.82-1.98-.22-.53-.44-.46-.6-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.67 1.12 2.85.14.18 1.95 2.98 4.72 4.18.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.58-.64 1.81-1.26.23-.62.23-1.15.16-1.26-.07-.11-.25-.18-.52-.32zM16.05 28C9.94 28 5 23.06 5 16.95 5 10.84 9.94 5.9 16.05 5.9S27.1 10.84 27.1 16.95C27.1 23.06 22.16 28 16.05 28z"/></svg>
        </motion.button>
      </a>
    </div>
  );
}

// ===== Pages
function Home() {
  return (
    <>
      <Section className="py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Technology, AI & Product Development — <span className="text-[#bfa27a]">built to perform</span>
            </motion.h1>
            <p className="mt-4 text-lg text-slate-600">
              Glamified Solutions blends AI engineering, robust software craftsmanship, and sharp product sense. We deliver outcomes—faster releases, measurable SEO wins, and interfaces that feel effortless.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTA to="/services">Explore Services</CTA>
              <Link to="/projects" className="inline-flex items-center h-11 px-6 rounded-2xl border border-slate-300">View Case Studies</Link>
            </div>
            <ul className="mt-8 space-y-3">
              {["AI that ships (not slides).","Product strategy with technical depth.","Accessible, SEO-strong, and fast by default."].map((t,i)=> (
                <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-1 w-5 h-5"/> {t}</li>
              ))}
            </ul>
          </div>
          {/* FIX: correct object-literal syntax for motion props */}
          <motion.div initial={{}} animate={{}}></motion.div>
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.6, delay:.05}} className="lg:justify-self-end">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop" alt="AI & product engineering" className="w-full h-full object-cover" loading="lazy"/>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-white border-y border-slate-200">
        <H2>What we do best</H2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {t:"AI Engineering", d:"Applied ML, RAG pipelines, model evals, privacy‑minded deployment."},
            {t:"Software Development", d:"Type‑safe web apps, mobile‑ready frontends, scalable APIs & DevOps."},
            {t:"IT & Cloud Solutions", d:"Cloud architecture, cost optimization, observability, zero‑downtime releases."},
            {t:"Consulting & Strategy", d:"Roadmapping, UX audits, PMF experiments, growth SEO."},
          ].map((f,i)=> (
            <div key={i} className="rounded-2xl border border-slate-200 p-6">
              <div className="font-semibold">{f.t}</div>
              <p className="mt-2 text-sm text-slate-600">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <Metric value="1.6s" label="LCP on 4G"/>
          <Metric value="+28%" label="Lead conversion uplift"/>
          <Metric value="99.95%" label="Observed uptime"/>
        </div>
      </Section>
    </>
  );
}

function Services() {
  return (
    <Section>
      <H2>Services: AI, Product & IT—end to end</H2>
      <p className="mt-3 text-slate-600 max-w-3xl">From ideation to launch and ongoing growth, we combine strategy, design, and engineering. Engagements are transparent, sprint‑based, and outcome‑driven.</p>
      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ServiceCard title="AI Engineering" points={["RAG & vector search on your data","Model selection, evals & guardrails","LLM apps with observability & cost control"]} />
          <ServiceCard title="Software Development" points={["React/TypeScript frontends","Node/Edge APIs, GraphQL & REST","CI/CD, testing, performance budgets"]} />
          <ServiceCard title="IT & Cloud Solutions" points={["Cloud architecture & security baselines","Infra as Code, auto‑scaling, CDN","Monitoring, alerting, SLOs"]} />
          <ServiceCard title="Consulting & Product Strategy" points={["UX research & design systems","Roadmaps, OKRs, and ROI models","SEO/IA audits & experimentation"]} />
        </div>
        <div className="rounded-3xl overflow-hidden border border-slate-200">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop" alt="Engineering" className="w-full h-full object-cover" loading="lazy"/>
        </div>
      </div>
      <div className="mt-8"><CTA to="/contact">Book a discovery call</CTA></div>
    </Section>
  );
}
function ServiceCard({ title, points }){
  return (
    <div className="rounded-3xl border border-slate-200 p-6">
      <div className="font-semibold text-lg">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {points.map((p,i)=>(<li key={i} className="flex gap-2"><BadgeCheck className="w-4 h-4 mt-0.5"/> {p}</li>))}
      </ul>
    </div>
  )
}

function Projects(){
  const cases = [
    { slug: 'atlas-insights', client: 'Atlas Insights', title: 'RAG research assistant for 50k+ PDFs', summary: 'Retrieval‑augmented QA with hybrid search and deterministic citations—reducing research time by 63%.', stats: ['-63% research time','Grounded answers with sources','Cost‑optimized inference'], img: 'https://images.unsplash.com/photo-1587613865763-4b8b0b1a6a83?q=80&w=1600&auto=format&fit=crop' },
    { slug: 'vela-commerce', client: 'Vela Commerce', title: 'Headless storefront with AI‑led merchandising', summary: 'Design system + personalization that adapts collections in real time based on intent.', stats: ['+21% add-to-cart','1.7s mobile LCP','0 CLS transitions'], img: 'https://images.unsplash.com/photo-1520975922284-9c5c0d7c3ffe?q=80&w=1600&auto=format&fit=crop' },
    { slug: 'meridian-fintech', client: 'Meridian Fintech', title: 'Secure onboarding for a fintech scaleup', summary: 'KYC flow redesign, AA accessibility, and event‑driven microservices with audit trails.', stats: ['-35% dev time','99.95% uptime','AA contrast throughout'], img: 'https://images.unsplash.com/photo-1559523182-a284c3fb7ffd?q=80&w=1600&auto=format&fit=crop' },
  ];
  return (
    <Section>
      <H2>Case Studies</H2>
      <p className="mt-3 text-slate-600">A few recent outcomes across AI, product, and platform.</p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c)=> (
          <Link to={`/projects/${c.slug}`} key={c.slug} className="group rounded-3xl overflow-hidden border border-slate-200">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={c.img} alt={c.client} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" loading="lazy"/>
            </div>
            <div className="p-5">
              <div className="text-sm uppercase tracking-wide text-slate-500">{c.client}</div>
              <div className="font-semibold mt-1">{c.title}</div>
              <p className="text-sm text-slate-600 mt-2">{c.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                {c.stats.map((s,i)=>(<li key={i} className="rounded-full border px-2 py-1">{s}</li>))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8"><CTA to="/contact">Request a detailed deck</CTA></div>
    </Section>
  )
}

function About(){
  const values = [
    { t: 'Clarity over clutter', d: 'We remove friction until only the essential remains.' },
    { t: 'Integrity in delivery', d: 'Transparent scopes, predictable sprints, measurable outcomes.' },
    { t: 'Accessibility first', d: 'Inclusive design as a non‑negotiable baseline.' },
  ];
  return (
    <Section>
      <H2>About Glamified Solutions</H2>
      <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <p className="text-slate-600">Our mission is to elevate digital products through restraint and rigor—products that look calm and feel instant. We operate as a senior, cross‑functional pod that plugs into your roadmap and ships meaningful increments.</p>
          <p className="text-slate-600 mt-4">Leadership has delivered platforms for commerce, fintech, hospitality, and SaaS. We favor open standards, type safety, and observability.</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {values.map((v,i)=> (
              <div key={i} className="rounded-2xl border border-slate-200 p-4">
                <div className="font-semibold text-sm">{v.t}</div>
                <div className="text-xs text-slate-600 mt-1">{v.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-slate-200">
          <img src="https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop" alt="Studio" className="w-full h-full object-cover" loading="lazy"/>
        </div>
      </div>
    </Section>
  )
}

function Recruitment(){
  const roles = [
    { title: 'Senior Frontend Engineer', type:'Remote / India', bullets:['React + TypeScript expertise','Care about a11y & perf','Own features end-to-end'] },
    { title: 'Product Designer', type:'Remote / Hybrid', bullets:['Systems thinker','Micro-interactions & motion','Figma + tokens'] },
  ];
  return (
    <Section>
      <H2>Recruitment & Hiring Solutions</H2>
      <p className="mt-3 text-slate-600 max-w-3xl">We help clients hire exceptional tech talent and we also hire selectively for our own team. Our talent network spans frontend, backend, data, DevOps, and product design.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200 p-6">
          <div className="font-semibold text-lg">For Employers</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {['Role scoping & scorecards','2‑round technical screening','Onsite‑ready takehomes (optional)','Offer support & onboarding'].map((b,i)=>(
              <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5"/> {b}</li>
            ))}
          </ul>
          <div className="mt-4"><CTA to="/contact">Request talent shortlist</CTA></div>
        </div>
        <div className="rounded-3xl border border-slate-200 p-6">
          <div className="font-semibold text-lg">Join Our Team</div>
          <p className="text-sm text-slate-600 mt-2">We keep a high bar and a calm pace. If you value craft and kindness, we'd love to hear from you.</p>
          <div className="mt-4 grid gap-4">
            {roles.map((r,i)=> (
              <div key={i} className="rounded-2xl border border-slate-200 p-4">
                <div className="font-semibold">{r.title}</div>
                <div className="text-xs text-slate-500">{r.type}</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {r.bullets.map((b,j)=>(<li key={j} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5"/> {b}</li>))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4"><CTA to="/contact">Apply</CTA></div>
        </div>
      </div>
    </Section>
  )
}

function Contact(){
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`[Website] ${fd.get('name') || 'Inquiry'}`);
    const body = encodeURIComponent(`Name: ${fd.get('name')}\\nEmail: ${fd.get('email')}\\nPhone: ${fd.get('phone')}\\nMessage: ${fd.get('message')}`);
    window.location.href = `mailto:glamifiedsolutions@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <Section>
      <H2>Let's build something refined</H2>
      <p className="mt-2 text-slate-600">Tell us what you need. We respond within two business days.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-4 max-w-3xl">
        <input required name="name" placeholder="Your name" className="h-11 rounded-2xl border border-slate-300 bg-white px-4"/>
        <input required type="email" name="email" placeholder="Email" className="h-11 rounded-2xl border border-slate-300 bg-white px-4"/>
        <input name="phone" placeholder="Phone" className="h-11 rounded-2xl border border-slate-300 bg-white px-4 md:col-span-2"/>
        <textarea required name="message" placeholder="Message" rows={6} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 md:col-span-2"/>
        <div className="md:col-span-2 flex items-center gap-3">
          <Magnetic><button className="h-11 px-6 rounded-2xl bg-slate-900 text-white font-medium">Send Email</button></Magnetic>
          <a className="text-sm underline hover:no-underline" href="mailto:glamifiedsolutions@gmail.com">Or write to glamifiedsolutions@gmail.com</a>
        </div>
      </form>
      <div className="mt-8 grid md:grid-cols-3 gap-6 text-sm">
        <div className="rounded-2xl border p-5"><Mail className="w-4 h-4"/> glamifiedsolutions@gmail.com</div>
        <div className="rounded-2xl border p-5"><Phone className="w-4 h-4"/> +91 95169 29348</div>
        <div className="rounded-2xl border p-5"><MapPin className="w-4 h-4"/> India • Remote-first</div>
      </div>
    </Section>
  )
}

// ===== Small bits
function Metric({ value, label }){
  return (
    <div className="text-center">
      <motion.div initial={{opacity:0,y:6}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}} className="text-3xl font-bold">{value}</motion.div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  )
}
function Magnetic({ children }){
  const onMove = (e) => {
    const el = e.currentTarget; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2)/12; const y = (e.clientY - r.top - r.height/2)/12;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = (e) => { e.currentTarget.style.transform = `translate(0,0)` };
  return <div onMouseMove={onMove} onMouseLeave={onLeave} className="transition-transform will-change-transform">{children}</div>;
}

// ===== Router Mount
function App(){
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="services" element={<Services/>} />
          <Route path="projects" element={<Projects/>} />
          <Route path="about" element={<About/>} />
          <Route path="recruitment" element={<Recruitment/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

// ===== Global style helpers
const style = document.createElement('style');
style.innerHTML = `
  html { scroll-behavior: smooth; }
  .luxe-underline{position:relative}
  .luxe-underline:after{content:"";position:absolute;left:0;bottom:-6px;width:72px;height:2px;background:linear-gradient(90deg,#bfa27a 0%, #d9c6a1 100%);border-radius:999px}
`;
document.head.appendChild(style);

export default function Website(){
  return <App/>;
}
