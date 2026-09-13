import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Globe2,
  Menu,
  MessageCircle,
  MousePointer2,
  Palette,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const work = [
  { label: "01 / Wellness", title: "Move more freely.", accent: "cobalt", imagePosition: "object-left" },
  { label: "02 / Commerce", title: "Made to be worn.", accent: "lime", imagePosition: "object-right" },
  { label: "03 / Personal brand", title: "Make your next move.", accent: "ink", imagePosition: "object-center" },
];

const faqs = [
  ["How long does a website take?", "Most launch websites are ready in 7–14 days. Larger stores and custom builds get a tailored timeline after the first call."],
  ["Do you work with clients outside Kenya?", "Yes. DevStudio is based in Kenya and works with ambitious people anywhere. Pricing is available in KSh or USD."],
  ["What happens after launch?", "Every project includes a handover, launch support, and a clear path for updates as your business grows."],
];

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="DevStudio home">
      <img src="/logo-mark.svg" alt="" className="h-9 w-9 rounded-xl shadow-[0_6px_14px_rgba(23,71,209,0.22)] transition-transform duration-200 group-hover:-rotate-6" />
      <span className="text-[15px] font-semibold tracking-[-0.03em] text-[#171717]">DevStudio<span className="text-[#1747d1]">.</span></span>
    </a>
  );
}

function ArrowButton({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 rounded-full px-5 py-3 text-[13px] font-semibold transition duration-200 group-hover:gap-4 ${dark ? "bg-[#171717] text-white" : "bg-[#1747d1] text-white"}`}>
      {children}
      <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    toast.success("Message received — we’ll be in touch within 24 hours.");
  };

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#171717] selection:bg-[#c8f169] selection:text-[#171717]">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] noise" />
      <header className="relative z-40 border-b border-[#171717]/10 bg-[#f7f5ef]/90 backdrop-blur-xl">
        <nav className="container flex h-[76px] items-center justify-between" aria-label="Main navigation">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <button onClick={() => scrollTo("work")} className="nav-link">Work</button>
            <button onClick={() => scrollTo("services")} className="nav-link">Services</button>
            <button onClick={() => scrollTo("process")} className="nav-link">Process</button>
            <button onClick={() => scrollTo("about")} className="nav-link">About</button>
          </div>
          <button onClick={() => scrollTo("contact")} className="group hidden items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#1747d1] md:flex">
            Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-[#171717]/15 p-2 md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {menuOpen && (
          <div className="container border-t border-[#171717]/10 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-lg font-medium">
              <button onClick={() => scrollTo("work")} className="text-left">Work</button>
              <button onClick={() => scrollTo("services")} className="text-left">Services</button>
              <button onClick={() => scrollTo("process")} className="text-left">Process</button>
              <button onClick={() => scrollTo("about")} className="text-left">About</button>
              <button onClick={() => scrollTo("contact")} className="mt-2 flex w-fit items-center gap-2 rounded-full bg-[#1747d1] px-4 py-3 text-sm font-semibold text-white">Start a project <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="container relative grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:py-20">
          <div className="relative z-10 max-w-[620px] animate-rise">
            <div className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1747d1]">
              <span className="h-2 w-2 rounded-full bg-[#c8f169] ring-4 ring-[#c8f169]/30" />
              Web studio · Nairobi / everywhere
            </div>
            <h1 className="max-w-[650px] font-display text-[clamp(3.6rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#171717]">
              Get your<br /><span className="relative inline-block text-[#1747d1]">business</span> online.
            </h1>
            <p className="mt-8 max-w-[470px] text-[17px] leading-7 text-[#171717]/65 sm:text-[19px]">
              DevStudio designs and builds fast, beautiful websites and online stores that help Kenyan businesses get discovered, trusted, and paid.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button onClick={() => scrollTo("contact")} className="group">
                <ArrowButton>Start a project</ArrowButton>
              </button>
              <button onClick={() => scrollTo("work")} className="group inline-flex items-center gap-2 px-1 py-3 text-[13px] font-semibold text-[#171717]">
                See selected work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-[#171717]/50">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-[#1747d1]" /> Replies within 24h</span>
              <span className="inline-flex items-center gap-2"><Globe2 className="h-3.5 w-3.5 text-[#1747d1]" /> KSh + USD pricing</span>
            </div>
          </div>
          <div className="relative animate-float lg:translate-x-8">
            <div className="absolute -left-6 top-9 z-20 hidden rounded-2xl border border-[#171717]/10 bg-white/90 px-4 py-3 shadow-[0_20px_50px_rgba(23,23,23,0.12)] backdrop-blur-sm sm:block">
              <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1747d1]"><span className="h-1.5 w-1.5 rounded-full bg-[#c8f169]" /> Ready to launch</div>
              <p className="font-display text-xl font-medium tracking-tight">From idea to live.</p>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-[#171717]/10 bg-[#e9e3d8] shadow-[0_30px_80px_rgba(23,23,23,0.18)]">
              <img src="/assets/devstudio-hero.webp" alt="Website mockup for a modern restaurant brand" className="h-auto w-full object-cover" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold shadow-lg backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-[#c8f169]" /> Made for mobile first</div>
            </div>
            <div className="absolute -bottom-6 -right-4 grid h-20 w-20 place-items-center rounded-full bg-[#c8f169] text-center text-[10px] font-bold uppercase leading-3 tracking-[0.12em] text-[#171717] shadow-[0_15px_30px_rgba(200,241,105,0.35)] sm:-right-10">Built<br />to move</div>
          </div>
        </section>

        <section className="border-y border-[#171717]/10 bg-[#1747d1] text-white">
          <div className="container flex min-h-[82px] flex-wrap items-center justify-between gap-4 py-5">
            <p className="font-display text-lg font-medium tracking-[-0.02em] sm:text-xl">A digital home that works as hard as you do.</p>
            <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-white/70"><span>Websites</span><span className="h-1 w-1 rounded-full bg-[#c8f169]" /><span>E-commerce</span><span className="h-1 w-1 rounded-full bg-[#c8f169]" /><span>Web apps</span></div>
          </div>
        </section>

        <section id="work" className="container scroll-mt-20 py-24 sm:py-32">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Selected work / 01</p>
              <h2 className="section-title mt-4 max-w-[600px]">Good design gets attention.<br /><span className="text-[#1747d1]">Good websites get action.</span></h2>
            </div>
            <p className="max-w-[250px] text-sm leading-6 text-[#171717]/55">A few directions we love building for people with something to say, sell, or start.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {work.map((item, index) => (
              <article key={item.label} className={`group relative overflow-hidden rounded-[24px] border border-[#171717]/10 ${index === 0 ? "bg-[#d9e2ff]" : index === 1 ? "bg-[#dff1a8]" : "bg-[#222]"}`}>
                <div className="aspect-[0.86] overflow-hidden">
                  <img src="/assets/devstudio-work.webp" alt={`${item.title} website concept`} className={`h-full w-full object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 ${item.imagePosition}`} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${index === 2 ? "from-black/70" : "from-black/35"} via-transparent to-transparent`} />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">{item.label}</p>
                  <div className="flex items-end justify-between gap-3"><h3 className="font-display text-2xl font-medium tracking-tight">{item.title}</h3><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-[#c8f169] group-hover:text-[#171717]"><ArrowUpRight className="h-4 w-4" /></span></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-[#e8e2d8] py-24 sm:py-32">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="eyebrow">What we make / 02</p>
                <h2 className="section-title mt-4">Choose your<br /><span className="text-[#1747d1]">next move.</span></h2>
                <p className="mt-6 max-w-[310px] text-sm leading-6 text-[#171717]/60">No jargon, no mysterious packages. Pick the direction that matches where your business is today.</p>
                <button onClick={() => scrollTo("contact")} className="group mt-9"><ArrowButton dark>Talk through your idea</ArrowButton></button>
              </div>
              <div className="divide-y divide-[#171717]/15 border-y border-[#171717]/15">
                {[
                  { number: "01", title: "Launch", text: "A clear, credible home for your personal brand, service, or local business.", tags: "Portfolio · Landing page · Microbusiness site", icon: Sparkles },
                  { number: "02", title: "Sell", text: "A storefront that makes it easy for customers to browse, pay, book, and come back.", tags: "E-store · M-Pesa · Bookings", icon: MousePointer2 },
                  { number: "03", title: "Scale", text: "Custom digital tools for the way your team actually works — not the other way around.", tags: "POS · Dashboards · Web apps", icon: Code2 },
                ].map(({ number, title, text, tags, icon: Icon }) => (
                  <div key={number} className="group grid gap-5 py-7 sm:grid-cols-[72px_1fr_auto] sm:items-start">
                    <span className="font-display text-lg font-medium text-[#1747d1]">{number}</span>
                    <div><h3 className="flex items-center gap-3 font-display text-3xl font-medium tracking-tight">{title}<Icon className="h-5 w-5 text-[#1747d1] opacity-0 transition group-hover:opacity-100" /></h3><p className="mt-2 max-w-[420px] text-sm leading-6 text-[#171717]/60">{text}</p><p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#171717]/45">{tags}</p></div>
                    <ArrowUpRight className="mt-1 hidden h-5 w-5 text-[#1747d1] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="container scroll-mt-20 py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="eyebrow">How it works / 03</p><h2 className="section-title mt-4">Simple by<br /><span className="text-[#1747d1]">design.</span></h2></div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[{ num: "01", title: "Share the idea", text: "Tell us what you need, who it is for, and where you want to go." }, { num: "02", title: "We build it", text: "You get a polished working site, with updates and no surprise jargon." }, { num: "03", title: "Launch & grow", text: "Go live with confidence, plus support for the next version." }].map((step) => <div key={step.num} className="border-t-2 border-[#1747d1] pt-5"><span className="font-display text-sm font-semibold text-[#1747d1]">{step.num}</span><h3 className="mt-7 font-display text-2xl font-medium tracking-tight">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#171717]/55">{step.text}</p></div>)}
            </div>
          </div>
          <div id="about" className="mt-24 grid scroll-mt-20 gap-8 rounded-[28px] bg-[#171717] p-7 text-white sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div><p className="eyebrow text-[#c8f169]">About the studio</p><h2 className="mt-4 max-w-[600px] font-display text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl">Small studio.<br />Big digital energy.</h2></div>
            <div><p className="max-w-[450px] text-base leading-7 text-white/65">We help Kenyan professionals and small businesses turn their ideas into digital experiences that are easy to understand, easy to use, and built to generate business.</p><div className="mt-8 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55"><span className="rounded-full border border-white/15 px-3 py-2">Nairobi based</span><span className="rounded-full border border-white/15 px-3 py-2">Worldwide reach</span><span className="rounded-full border border-white/15 px-3 py-2">Human support</span></div></div>
          </div>
        </section>

        <section className="border-y border-[#171717]/10 bg-[#c8f169] py-20 sm:py-28">
          <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="eyebrow">A little reassurance / 04</p><h2 className="section-title mt-4">Questions,<br /><span className="text-[#1747d1]">answered.</span></h2></div><div className="divide-y divide-[#171717]/20 border-y border-[#171717]/20">{faqs.map(([question, answer], index) => <div key={question} className="py-5"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 text-left font-display text-xl font-medium tracking-tight"><span>{question}</span><ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#171717]/60">{answer}</p>}</div>)}</div></div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-[#1747d1] py-24 text-white sm:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div><p className="eyebrow text-[#c8f169]">Let’s make it real / 05</p><h2 className="mt-4 max-w-[600px] font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.08em]">Ready to be<br /><span className="text-[#c8f169]">seen?</span></h2><p className="mt-7 max-w-[400px] text-base leading-7 text-white/70">Tell us a little about what you’re building. We’ll reply with a useful next step, not a generic sales pitch.</p><a href="https://wa.me/254791555419" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#c8f169] underline decoration-[#c8f169]/40 underline-offset-4"><MessageCircle className="h-4 w-4" /> Prefer WhatsApp? Start there.</a></div>
            <form onSubmit={handleSubmit} className="rounded-[24px] bg-white p-6 text-[#171717] shadow-[0_24px_80px_rgba(10,42,125,0.32)] sm:p-8">
              {formSent ? <div className="flex min-h-[350px] flex-col items-center justify-center text-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#c8f169] text-[#1747d1]"><Check className="h-7 w-7" /></span><h3 className="mt-6 font-display text-3xl font-medium tracking-tight">You’re on our list.</h3><p className="mt-3 max-w-[280px] text-sm leading-6 text-[#171717]/55">We’ll get back to you within 24 hours with a clear next step.</p><button type="button" onClick={() => setFormSent(false)} className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#1747d1]">Send another message</button></div> : <><div className="mb-7 flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1747d1]">Project enquiry</p><h3 className="mt-2 font-display text-3xl font-medium tracking-tight">What are we building?</h3></div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f1eee7]"><Send className="h-4 w-4 text-[#1747d1]" /></span></div><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Your name<input required name="name" placeholder="Jane Wanjiku" className="field-input" /></label><label className="field-label">Email address<input required type="email" name="email" placeholder="jane@business.com" className="field-input" /></label><label className="field-label sm:col-span-2">What do you need?<select name="project" className="field-input"><option>Launch a new website</option><option>Sell online / add M-Pesa</option><option>Build a custom web app</option><option>Not sure yet — let’s talk</option></select></label><label className="field-label sm:col-span-2">Tell us a little more<textarea required name="message" rows={3} placeholder="A sentence or two about your business and goals..." className="field-input resize-none" /></label></div><button type="submit" className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#1747d1]">Send enquiry <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button><p className="mt-4 text-center text-[11px] text-[#171717]/45">No commitment required · Honest pricing · Response within 24 hours</p></>}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#171717] py-8 text-white">
        <div className="container flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><img src="/logo-mark.svg" alt="" className="h-8 w-8 rounded-lg" /><span className="text-sm font-semibold">DevStudio<span className="text-[#c8f169]">.</span></span></div><div className="flex flex-wrap gap-5 text-xs text-white/50"><a href="mailto:irungupeter204@gmail.com" className="transition hover:text-white">Email</a><a href="tel:+254791555419" className="transition hover:text-white">+254 791 555 419</a><span>© 2026 DevStudio</span></div></div>
      </footer>
    </div>
  );
}
