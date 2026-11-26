import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://royal12.ca";
  const lastModified = new Date();

  const services = [
    "airport-transfers",
    "limousine-service",
    "corporate-travel",
    "special-events",
    "private-chauffeur",
    "hourly-service",
    "city-to-city",
    "point-to-point",
  ];

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...serviceRoutes,
    {
      url: `${baseUrl}/policies/cancellation`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/policies/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
