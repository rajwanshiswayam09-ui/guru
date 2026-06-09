export interface PackageItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface PackageFaq {
  question: string;
  answer: string;
}

export interface ModularPackage {
  name: string;
  slug: string;
  duration: string;
  category: string;
  heroImage: string;
  overview: string;
  destinations: string[];
  highlights: string[];
  itinerary: PackageItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs: PackageFaq[];
  travelTips?: string[];
  seo?: {
    title: string;
    description: string;
  };
}

// Dynamically import all JSON files from the packages directory
const packageFiles = import.meta.glob("./**/*.json", { eager: true });

export const allModularPackages: ModularPackage[] = Object.values(packageFiles).map(
  (module: any) => module.default as ModularPackage
);

export const packages = allModularPackages;

export const packagesByCategory = allModularPackages.reduce((acc, pkg) => {
  if (!acc[pkg.category]) {
    acc[pkg.category] = [];
  }
  acc[pkg.category].push(pkg);
  return acc;
}, {} as Record<string, ModularPackage[]>);

export const getPackageBySlug = (slug: string) => {
  return allModularPackages.find((pkg) => pkg.slug === slug);
};

export const categories = Array.from(new Set(allModularPackages.map((pkg) => pkg.category)));

export const getPackagesByCategory = (category: string) => {
  return allModularPackages.filter((pkg) => pkg.category === category);
};
