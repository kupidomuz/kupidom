import type { MetadataRoute } from "next";
import { getPublicProperties } from "@/lib/propertyService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getPublicProperties();

  const propertyUrls = properties.map((property: any) => ({
    url: `https://kupidom.uz/property/${property.id}`,
    lastModified: property.created_at
      ? new Date(property.created_at)
      : new Date(),
  }));

  return [
    {
      url: "https://kupidom.uz",
      lastModified: new Date(),
    },
    {
      url: "https://kupidom.uz/properties",
      lastModified: new Date(),
    },
    
    ...propertyUrls,
  ];
}