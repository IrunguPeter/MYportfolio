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

const SETTINGS_KEY = "devstudio.site-settings";
const ENQUIRIES_KEY = "devstudio.enquiries";

export function getSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const stored = window.localStorage.getItem(SETTINGS_KEY);
    if (!stored) return defaultSettings;
    const parsed = JSON.parse(stored) as Partial<SiteSettings>;
    return {
      ...defaultSettings,
      ...parsed,
      pricing: Array.isArray(parsed.pricing) && parsed.pricing.length === 3 ? parsed.pricing as PricingTier[] : defaultSettings.pricing,
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSiteSettings(settings: SiteSettings) {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent("devstudio:settings-updated"));
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

export function saveEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt">) {
  const next: Enquiry = { ...enquiry, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  const enquiries = [next, ...getEnquiries()];
  window.localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
  return next;
}

export function clearEnquiries() {
  window.localStorage.removeItem(ENQUIRIES_KEY);
}
