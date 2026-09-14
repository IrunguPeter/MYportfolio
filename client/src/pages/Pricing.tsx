import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Link } from "wouter";

const packages = [
  {
    label: "For getting started",
    name: "Launch",
    price: "25,000",
    description: "A polished online home for your personal brand, service, or small business.",
    features: ["Up to 5 pages", "Mobile-first design", "WhatsApp + contact links", "Basic SEO setup", "7–14 day turnaround"],
    accent: "paper",
  },
  {
    label: "Most popular",
    name: "Sell",
    price: "70,000",
    description: "A storefront that helps customers browse, pay, book, and come back.",
    features: ["Everything in Launch", "Product or service catalog", "M-Pesa payment setup", "Order or booking flow", "Launch training + support"],
    accent: "cobalt",
  },
  {
    label: "For bigger ideas",
    name: "Scale",
    price: "100,000",
    description: "Custom digital tools for the way your team actually works.",
    features: ["Custom functionality", "Dashboards or POS", "Memberships or portals", "API integrations", "Tailored delivery plan"],
    accent: "ink",
  },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="DevStudio home">
      <img src="/logo-mark.svg" alt="" className="h-9 w-9 rounded-xl shadow-[0_6px_14px_rgba(23,71,209,0.22)] transition-transform duration-200 group-hover:-rotate-6" />
      <span className="text-[15px] font-semibold tracking-[-0.03em] text-[#171717]">DevStudio<span className="text-[#1747d1]">.</span></span>
    </Link>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#171717] selection:bg-[#c8f169] selection:text-[#171717]">
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] noise" />
      <header className="relative z-40 border-b border-[#171717]/10 bg-[#f7f5ef]/90 backdrop-blur-xl">
        <nav className="container flex h-[76px] items-center justify-between" aria-label="Pricing navigation">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#work" className="nav-link">Work</Link>
            <Link href="/#services" className="nav-link">Services</Link>
            <Link href="/pricing" className="nav-link text-[#1747d1]">Pricing</Link>
            <Link href="/#about" className="nav-link">About</Link>
          </div>
          <Link href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#1747d1]">
            Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>
      </header>

      <main>
        <section className="container pb-14 pt-20 sm:pb-20 sm:pt-28">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1747d1] transition hover:gap-3">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="max-w-[780px]">
            <p className="eyebrow">Straightforward pricing / Kenya-first</p>
            <h1 className="mt-5 font-display text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.075em]">A clear price for<br /><span className="text-[#1747d1]">your next move.</span></h1>
            <p className="mt-8 max-w-[570px] text-lg leading-8 text-[#171717]/65">Choose a starting point, then we shape the details around your business. Every project is quoted in KSh, with USD pricing available for international clients.</p>
          </div>
        </section>

        <section className="container pb-24 sm:pb-32">
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <article key={item.name} className={`relative flex flex-col overflow-hidden rounded-[26px] border border-[#171717]/10 p-6 sm:p-8 ${item.accent === "cobalt" ? "bg-[#1747d1] text-white shadow-[0_24px_60px_rgba(23,71,209,0.22)]" : item.accent === "ink" ? "bg-[#171717] text-white" : "bg-white/65"}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${item.accent === "paper" ? "text-[#1747d1]" : "text-[#c8f169]"}`}>{item.label}</p>
                  {item.name === "Sell" && <span className="rounded-full bg-[#c8f169] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#171717]">Popular</span>}
                </div>
                <h2 className="mt-8 font-display text-5xl font-medium tracking-[-0.055em]">{item.name}</h2>
                <p className={`mt-4 min-h-[72px] text-sm leading-6 ${item.accent === "paper" ? "text-[#171717]/60" : "text-white/65"}`}>{item.description}</p>
                <div className="mt-8 border-t border-current/15 pt-6"><p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">Starting from</p><p className="mt-2 font-display text-4xl font-medium tracking-[-0.04em]">KSh {item.price}</p></div>
                <ul className="mt-8 space-y-4 border-t border-current/15 pt-6 text-sm">
                  {item.features.map((feature) => <li key={feature} className="flex items-start gap-3"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${item.accent === "paper" ? "text-[#1747d1]" : "text-[#c8f169]"}`} /> <span className={item.accent === "paper" ? "text-[#171717]/70" : "text-white/75"}>{feature}</span></li>)}
                </ul>
                <Link href="/#contact" className={`group mt-9 inline-flex w-fit items-center gap-3 rounded-full px-5 py-3 text-[13px] font-semibold transition hover:gap-4 ${item.accent === "paper" ? "bg-[#171717] text-white hover:bg-[#1747d1]" : "bg-white text-[#171717] hover:bg-[#c8f169]"}`}>Choose {item.name} <ArrowUpRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#e8e2d8] py-20 sm:py-24">
          <div className="container grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div><p className="eyebrow">Need something different?</p><h2 className="section-title mt-4">Let’s price the<br /><span className="text-[#1747d1]">real thing.</span></h2></div>
            <div><p className="max-w-[520px] text-base leading-7 text-[#171717]/65">Some projects need a lighter starting point. Others need integrations, content support, or a custom workflow. Tell us what you are building and we’ll recommend the most sensible route — no pressure and no mystery extras.</p><div className="mt-7 flex flex-wrap gap-4"><Link href="/#contact" className="group inline-flex items-center gap-3 rounded-full bg-[#1747d1] px-5 py-3 text-[13px] font-semibold text-white transition hover:gap-4">Talk through your idea <ArrowUpRight className="h-4 w-4" /></Link><a href="https://wa.me/254791555419" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#171717]/15 px-5 py-3 text-[13px] font-semibold text-[#171717] transition hover:border-[#1747d1] hover:text-[#1747d1]"><MessageCircle className="h-4 w-4" /> WhatsApp us</a></div></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#171717] py-8 text-white"><div className="container flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><img src="/logo-mark.svg" alt="" className="h-8 w-8 rounded-lg" /><span className="text-sm font-semibold">DevStudio<span className="text-[#c8f169]">.</span></span></div><div className="flex flex-wrap gap-5 text-xs text-white/50"><a href="mailto:irungupeter204@gmail.com" className="transition hover:text-white">Email</a><a href="tel:+254791555419" className="transition hover:text-white">+254 791 555 419</a><span>© 2026 DevStudio</span></div></div></footer>
    </div>
  );
}
