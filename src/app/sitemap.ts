import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://royaltwelve.ca";
  const lastModified = new Date();

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/mississauga-airport-limo/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/airport-limo-toronto/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/wedding-limo-mississauga/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/corporate-limo/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/hourly-chauffeur/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/fleet/", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/rates/", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/service-areas/", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/get-a-quote/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy-policy/", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms/", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
