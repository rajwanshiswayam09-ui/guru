import { placeImages } from "./placeImages";
import { getPackagesByCategory } from "./packages/index";

export interface TourPackageItem {
  slug: string;
  name: string;
  duration: string;
  image: string;
  quickHighlights: string[];
  destinations: string[];
  overview: string;
}

export interface TourPackageCategoryData {
  slug: string;
  name: string;
  heroImage: string;
  heroSubtitle: string;
  seoDescription: string;
  packages: TourPackageItem[];
}

const getCategoryPackages = (categoryName: string): TourPackageItem[] => {
  return getPackagesByCategory(categoryName).map((pkg) => ({
    slug: pkg.slug,
    name: pkg.name,
    duration: pkg.duration,
    image: pkg.heroImage,
    quickHighlights: pkg.highlights,
    destinations: pkg.destinations,
    overview: pkg.overview,
  }));
};

export const tourPackageCategoriesCatalog: TourPackageCategoryData[] = [
  {
    slug: "shimla-manali-tour-packages",
    name: "Shimla Manali Tour Packages",
    heroImage: placeImages.manaliSolangHero,
    heroSubtitle: "Snow belts, ridge walks, Kufri drives, and premium Shimla-Manali route planning.",
    seoDescription: "Explore Shimla Manali tour packages with private cab, curated stays, and seasonal route support.",
    packages: getCategoryPackages("Shimla Manali Tour Packages"),
  },
  {
    slug: "complete-himachal-tour-packages",
    name: "Complete Himachal Tour Packages",
    heroImage: placeImages.shimlaRidgeHero,
    heroSubtitle: "Comprehensive Himachal circuits covering major destinations in one premium route.",
    seoDescription: "Browse complete Himachal tour packages with multi-destination itineraries and private travel support.",
    packages: getCategoryPackages("Complete Himachal Tour Packages"),
  },
  {
    slug: "kinnaur-valley-tour-packages",
    name: "Kinnaur Valley Tour Packages",
    heroImage: placeImages.kinnaurKalpa,
    heroSubtitle: "Sangla, Chitkul, and Kalpa mountain roads with dramatic valley landscapes.",
    seoDescription: "Discover Kinnaur Valley tour packages with Kalpa, Sangla, and Chitkul route planning.",
    packages: getCategoryPackages("Kinnaur Valley Tour Packages"),
  },
  {
    slug: "manali-tour-packages",
    name: "Manali Tour Packages",
    heroImage: placeImages.manaliSolang,
    heroSubtitle: "Solang valley views, snow points, and curated Manali hill experiences.",
    seoDescription: "Explore Manali tour packages with Solang Valley routes, private cab options, and premium stays.",
    packages: getCategoryPackages("Manali Tour Packages"),
  },
  {
    slug: "dharamshala-dalhousie-tour-packages",
    name: "Dharamshala Dalhousie Tour Packages",
    heroImage: placeImages.dharamshalaDhauladhar,
    heroSubtitle: "Dhauladhar range views, cedar forests, and peaceful mountain routes.",
    seoDescription: "Book Dharamshala and Dalhousie tour packages with McLeod Ganj, Khajjiar, and private taxi support.",
    packages: getCategoryPackages("Dharamshala Dalhousie Tour Packages"),
  },
  {
    slug: "kinnaur-and-spiti-tour-packages",
    name: "Kinnaur And Spiti Tour Packages",
    heroImage: placeImages.spitiKeyMonastery,
    heroSubtitle: "Trans-Himalayan circuits covering Spiti Valley and Kinnaur's high-altitude roads.",
    seoDescription: "Explore Kinnaur and Spiti Valley tour packages with Kaza, Key Monastery, and Chandratal routes.",
    packages: getCategoryPackages("Kinnaur And Spiti Tour Packages"),
  },
];

export const tourPackageCategoryMap = tourPackageCategoriesCatalog.reduce((acc, category) => {
  acc[category.slug] = category;
  return acc;
}, {} as Record<string, TourPackageCategoryData>);
