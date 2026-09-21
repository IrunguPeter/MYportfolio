import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ClipboardList, ExternalLink, LayoutDashboard, Loader2, LogOut, Save, Settings2, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { clearEnquiries, defaultSettings, getEnquiries, getSiteSettings, loadEnquiries, loadSiteSettings, saveSiteSettings, supabase, type Enquiry, type SiteSettings } from "@/lib/siteSettings";

const ADMIN_EMAIL = "irungupeter204@gmail.com";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "settings", label: "Site settings", icon: Settings2 },
  { id: "enquiries", label: "Enquiries", icon: ClipboardList },
] as const;
type Tab = (typeof tabs)[number]["id"];

export default function Admin() {
  const [tab, setTab] = useState<Tab>("overview");
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(getEnquiries);
  const [saved, setSaved] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email?.toLowerCase() || null);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSessionEmail(session?.user.email?.toLowerCase() || null));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (sessionEmail !== ADMIN_EMAIL) return;
    void Promise.all([loadSiteSettings(), loadEnquiries()]).then(([remoteSettings, remoteEnquiries]) => {
      setSettings(remoteSettings);
      setEnquiries(remoteEnquiries);
    });
  }, [sessionEmail]);

  const update = (field: keyof SiteSettings, value: string) => setSettings((current) => ({ ...current, [field]: value }));
  const updateTier = (index: number, field: "name" | "price" | "description", value: string) => setSettings((current) => ({ ...current, pricing: current.pricing.map((tier, tierIndex) => tierIndex === index ? { ...tier, [field]: value } : tier) }));
  const handleSave = async () => { try { await saveSiteSettings(settings); setSaved(true); window.setTimeout(() => setSaved(false), 2200); } catch { window.alert("Could not save changes. Please try again."); } };
  const reset = async () => { setSettings(defaultSettings); try { await saveSiteSettings(defaultSettings); setSaved(true); } catch { window.alert("Could not reset settings. Please try again."); } };
  const latest = useMemo(() => enquiries.slice(0, 5), [enquiries]);

  if (authLoading) return <div className="grid min-h-screen place-items-center bg-[#f3f1eb]"><Loader2 className="h-6 w-6 animate-spin text-[#1747d1]" /></div>;
  if (sessionEmail !== ADMIN_EMAIL) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-[#f3f1eb] text-[#171717]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-[#171717]/10 bg-[#171717] text-white lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-7"><img src="/logo-mark.svg" alt="" className="h-9 w-9 rounded-xl" /><div><p className="text-sm font-bold">DevStudio</p><p className="text-[10px] uppercase tracking-[0.18em] text-white/45">Admin workspace</p></div></div>
        <nav className="flex-1 space-y-2 p-4" aria-label="Admin navigation">{tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setTab(id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${tab === id ? "bg-[#1747d1] text-white" : "text-white/55 hover:bg-white/10 hover:text-white"}`}><Icon className="h-4 w-4" />{label}</button>)}</nav>
        <div className="border-t border-white/10 p-4"><Link href="/" className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white/55 transition hover:bg-white/10 hover:text-white"><ExternalLink className="h-4 w-4" />View live site</Link></div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between border-b border-[#171717]/10 bg-[#f3f1eb]/90 px-5 backdrop-blur-xl sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1747d1]">DevStudio / control room</p><h1 className="mt-1 font-display text-2xl font-medium tracking-tight sm:text-3xl">{tabs.find((item) => item.id === tab)?.label}</h1></div><div className="flex items-center gap-2"><button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 px-4 py-2.5 text-xs font-semibold"><LogOut className="h-4 w-4" />Sign out</button><Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1747d1]">Public site <ArrowUpRight className="h-4 w-4" /></Link></div></header>
        <div className="border-b border-[#171717]/10 bg-[#171717] px-5 py-3 text-xs text-white/65 sm:px-8 lg:hidden"><div className="flex gap-2 overflow-x-auto">{tabs.map(({ id, label }) => <button key={id} onClick={() => setTab(id)} className={`shrink-0 rounded-full px-3 py-1.5 font-semibold ${tab === id ? "bg-[#c8f169] text-[#171717]" : "bg-white/10"}`}>{label}</button>)}</div></div>

        <div className="mx-auto max-w-6xl space-y-8 p-5 sm:p-8">
          {tab === "overview" && <>
            <div className="grid gap-4 md:grid-cols-3"><Stat label="Enquiries captured" value={String(enquiries.length)} /><Stat label="Pricing packages" value={String(settings.pricing.length)} /><Stat label="Site status" value="Ready" /></div>
            <section className="rounded-2xl border border-[#171717]/10 bg-white/75 p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Quick start</p><h2 className="mt-2 font-display text-3xl font-medium">Keep the site fresh.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#171717]/60">Update your contact details and starting prices here. Changes are saved to Supabase and become available to visitors on every device.</p></div><button onClick={() => setTab("settings")} className="inline-flex items-center gap-2 rounded-full bg-[#1747d1] px-4 py-3 text-xs font-semibold text-white">Edit settings <ArrowUpRight className="h-4 w-4" /></button></div></section>
            <section className="rounded-2xl border border-[#171717]/10 bg-white/75"><div className="flex items-center justify-between border-b border-[#171717]/10 p-6"><div><p className="eyebrow">Latest leads</p><h2 className="mt-2 font-display text-2xl font-medium">Recent enquiries</h2></div><button onClick={() => setTab("enquiries")} className="text-xs font-bold uppercase tracking-[0.12em] text-[#1747d1]">View all</button></div><EnquiryList enquiries={latest} /></section>
          </>}

          {tab === "settings" && <section className="max-w-4xl space-y-6"><div className="rounded-2xl border border-[#171717]/10 bg-white/75 p-6 sm:p-8"><div className="mb-7 flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Public content</p><h2 className="mt-2 font-display text-3xl font-medium">Site settings</h2><p className="mt-2 text-sm text-[#171717]/55">These values are stored in Supabase and update the public website for every visitor.</p></div><div className="flex gap-2"><button onClick={reset} className="rounded-full border border-[#171717]/15 px-4 py-2.5 text-xs font-semibold">Reset</button><button onClick={handleSave} className="inline-flex items-center gap-2 rounded-full bg-[#1747d1] px-4 py-2.5 text-xs font-semibold text-white"><Save className="h-4 w-4" />{saved ? "Saved" : "Save changes"}</button></div></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Business name" value={settings.businessName} onChange={(value) => update("businessName", value)} /><Field label="Tagline" value={settings.tagline} onChange={(value) => update("tagline", value)} /><Field label="Email" value={settings.email} onChange={(value) => update("email", value)} /><Field label="Phone" value={settings.phone} onChange={(value) => update("phone", value)} /><label className="field-label sm:col-span-2">Description<textarea value={settings.description} onChange={(event) => update("description", event.target.value)} rows={3} className="field-input resize-none" /></label></div></div>
            <div className="rounded-2xl border border-[#171717]/10 bg-white/75 p-6 sm:p-8"><div className="mb-7"><p className="eyebrow">Starting prices</p><h2 className="mt-2 font-display text-3xl font-medium">Pricing packages</h2></div><div className="space-y-5">{settings.pricing.map((tier, index) => <div key={tier.name} className="grid gap-4 rounded-xl border border-[#171717]/10 bg-[#f8f6f1] p-4 sm:grid-cols-[0.55fr_0.55fr_1.5fr]"><Field label="Package" value={tier.name} onChange={(value) => updateTier(index, "name", value)} /><Field label="Price (KSh)" value={tier.price} onChange={(value) => updateTier(index, "price", value)} /><Field label="Description" value={tier.description} onChange={(value) => updateTier(index, "description", value)} /></div>)}</div><button onClick={handleSave} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-xs font-semibold text-white"><Save className="h-4 w-4" />{saved ? "Saved" : "Save pricing"}</button></div>
          </section>}

          {tab === "enquiries" && <section className="rounded-2xl border border-[#171717]/10 bg-white/75"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#171717]/10 p-6"><div><p className="eyebrow">Lead inbox</p><h2 className="mt-2 font-display text-3xl font-medium">Project enquiries</h2></div><button onClick={async () => { try { await clearEnquiries(); setEnquiries([]); } catch { window.alert("Could not clear enquiries. Please try again."); } }} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"><Trash2 className="h-4 w-4" />Clear inbox</button></div><EnquiryList enquiries={enquiries} /></section>}
        </div>
      </main>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const sendMagicLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError("This workspace is restricted to the DevStudio admin email.");
      return;
    }
    setBusy(true);
    const { error: authError } = await supabase.auth.signInWithOtp({ email: ADMIN_EMAIL, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    setBusy(false);
    if (authError) setError(authError.message);
    else setSent(true);
  };

  return <div className="grid min-h-screen place-items-center bg-[#f3f1eb] px-5 text-[#171717]"><div className="w-full max-w-md rounded-[28px] border border-[#171717]/10 bg-white/80 p-7 shadow-[0_24px_80px_rgba(23,23,23,0.08)] sm:p-10"><div className="flex items-center gap-3"><img src="/logo-mark.svg" alt="" className="h-10 w-10 rounded-xl" /><div><p className="font-semibold">DevStudio</p><p className="text-[10px] uppercase tracking-[0.18em] text-[#171717]/45">Admin workspace</p></div></div><p className="eyebrow mt-12">Secure sign in</p><h1 className="mt-3 font-display text-4xl font-medium tracking-tight">Manage your site.</h1>{sent ? <div className="mt-6 rounded-2xl bg-[#c8f169]/45 p-5 text-sm leading-6">Magic link sent. Check <strong>{ADMIN_EMAIL}</strong>, then open the link to continue.</div> : <form onSubmit={sendMagicLink} className="mt-7"><label className="field-label">Admin email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field-input" required /></label>{error && <p className="mt-3 text-sm text-red-600">{error}</p>}<button disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#1747d1] px-5 py-4 text-sm font-semibold text-white disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin" />}Send magic link <ArrowUpRight className="h-4 w-4" /></button></form>}<Link href="/" className="mt-7 block text-center text-xs font-semibold text-[#1747d1]">Back to public site</Link></div></div>;
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-[#171717]/10 bg-white/75 p-5"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#171717]/45">{label}</p><p className="mt-4 font-display text-4xl font-medium text-[#1747d1]">{value}</p></div>; }
function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="field-label">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="field-input" /></label>; }
function EnquiryList({ enquiries }: { enquiries: Enquiry[] }) { return enquiries.length === 0 ? <div className="p-8 text-sm text-[#171717]/50">No enquiries yet. New submissions from this browser will appear here.</div> : <div className="divide-y divide-[#171717]/10">{enquiries.map((item) => <article key={item.id} className="grid gap-3 p-6 sm:grid-cols-[0.7fr_1fr_1.5fr]"><div><p className="font-semibold">{item.name}</p><a href={`mailto:${item.email}`} className="mt-1 block text-xs text-[#1747d1]">{item.email}</a></div><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1747d1]">{item.project}</p><p className="mt-1 text-xs text-[#171717]/45">{new Date(item.createdAt).toLocaleString()}</p></div><p className="text-sm leading-6 text-[#171717]/65">{item.message}</p></article>)}</div>; }
