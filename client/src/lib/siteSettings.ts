import { createClient } from "@supabase/supabase-js";

export type PricingTier = {
  name: string;
  price: string;
  description: string;
};

export type SiteSettings = {
  businessName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  pricing: PricingTier[];
};

export type Enquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  project: string;
  message: string;
};

export const defaultSettings: SiteSettings = {
  businessName: "DevStudio",
  tagline: "Get your business online.",
  description: "DevStudio designs and builds fast, beautiful websites and online stores that help Kenyan businesses get discovered, trusted, and paid.",
  email: "irungupeter204@gmail.com",
  phone: "+254 791 555 419",
  whatsapp: "254791555419",
  pricing: [
    { name: "Launch", price: "25,000", description: "Portfolio, landing page, or small business website." },
    { name: "Sell", price: "70,000", description: "Online store, catalogue, M-Pesa, or bookings." },
    { name: "Scale", price: "100,000", description: "Custom apps, POS systems, dashboards, or integrations." },
  ],
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ezxcnarhjalktgowonuq.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_g2oKbOZaRga4LxinS1njIA_BdwfpElj";
export const supabase = createClient(supabaseUrl, supabaseKey);

const SETTINGS_KEY = "devstudio.site-settings";
const ENQUIRIES_KEY = "devstudio.enquiries";

function cacheSettings(settings: SiteSettings) {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent("devstudio:settings-updated"));
}

function fromRow(row: Record<string, unknown>): SiteSettings {
  const pricing = Array.isArray(row.pricing) && row.pricing.length === 3 ? row.pricing as PricingTier[] : defaultSettings.pricing;
  return {
    businessName: String(row.business_name || defaultSettings.businessName),
    tagline: String(row.tagline || defaultSettings.tagline),
    description: String(row.description || defaultSettings.description),
    email: String(row.email || defaultSettings.email),
    phone: String(row.phone || defaultSettings.phone),
    whatsapp: String(row.whatsapp || defaultSettings.whatsapp),
    pricing,
  };
}

export function getSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const stored = window.localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...(JSON.parse(stored) as Partial<SiteSettings>) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export async function loadSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase.from("site_settings").select("business_name, tagline, description, email, phone, whatsapp, pricing").eq("id", 1).single();
  if (error || !data) return getSiteSettings();
  const settings = fromRow(data);
  cacheSettings(settings);
  return settings;
}

export async function saveSiteSettings(settings: SiteSettings) {
  const { error } = await supabase.from("site_settings").update({
    business_name: settings.businessName,
    tagline: settings.tagline,
    description: settings.description,
    email: settings.email,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    pricing: settings.pricing,
    updated_at: new Date().toISOString(),
  }).eq("id", 1);
  if (error) throw error;
  cacheSettings(settings);
}

function fromEnquiryRow(row: Record<string, unknown>): Enquiry {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    name: String(row.name),
    email: String(row.email),
    project: String(row.project),
    message: String(row.message),
  };
}

export function getEnquiries(): Enquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(ENQUIRIES_KEY);
    return stored ? JSON.parse(stored) as Enquiry[] : [];
  } catch {
    return [];
  }
}

export async function loadEnquiries(): Promise<Enquiry[]> {
  const { data, error } = await supabase.from("enquiries").select("id, created_at, name, email, project, message").order("created_at", { ascending: false });
  if (error || !data) return getEnquiries();
  const enquiries = data.map(fromEnquiryRow);
  window.localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
  return enquiries;
}

export async function saveEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt">) {
  const { data, error } = await supabase.from("enquiries").insert(enquiry).select("id, created_at, name, email, project, message").single();
  if (error || !data) throw error || new Error("Could not save enquiry");
  const next = fromEnquiryRow(data);
  window.localStorage.setItem(ENQUIRIES_KEY, JSON.stringify([next, ...getEnquiries()]));
  return next;
}

export async function clearEnquiries() {
  const { error } = await supabase.from("enquiries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) throw error;
  window.localStorage.removeItem(ENQUIRIES_KEY);
}
