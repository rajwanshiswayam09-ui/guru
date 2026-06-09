import { useEffect } from "react";
import { placeImages } from "../data/placeImages";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const siteUrl = "https://gurukripaholiday.com";
const defaultImage = placeImages.manaliSolang;

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const upsertSchema = (schema: SEOProps["schema"]) => {
  const existing = document.head.querySelector<HTMLScriptElement>('script[data-guru-schema="true"]');

  if (!schema) {
    existing?.remove();
    return;
  }

  const element = existing || document.createElement("script");
  element.type = "application/ld+json";
  element.dataset.guruSchema = "true";
  element.textContent = JSON.stringify(schema);

  if (!existing) {
    document.head.appendChild(element);
  }
};

const SEO = ({ title, description, keywords = [], path = "/", image = defaultImage, schema }: SEOProps) => {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords.join(", "));
    upsertMeta("name", "robots", "index, follow");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Guru Kripa Travels");
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", "Guru Kripa Travels Himachal route and destination preview");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertCanonical(canonicalUrl);
    upsertSchema(schema);
  }, [description, image, keywords, path, schema, title]);

  return null;
};

export default SEO;
