import { placeImages } from "./placeImages";

export interface TourPackageCategory {
  slug: string;
  title: string;
  heroImage: string;
  heroSubtitle: string;
  overview: string;
  itinerary: string[];
  inclusions: string[];
  exclusions: string[];
  vehicleOptions: string[];
  inquiryPrefill: string;
}

export const tourPackageCategories: TourPackageCategory[] = [
  {
    slug: "shimla-manali-tour-packages",
    title: "Shimla Manali Tour Packages",
    heroImage: placeImages.manaliSolangHero,
    heroSubtitle: "Classic Himachal hill circuit with ridge towns, snow valleys, and family-friendly pacing.",
    overview: "Ideal for first-time Himachal travelers covering Shimla highlights and Manali snow belt experiences.",
    itinerary: ["Arrival and transfer to Shimla", "Shimla local and Kufri sightseeing", "Drive to Manali via Kullu valley", "Solang and Manali local", "Return transfer"],
    inclusions: ["Private cab for complete route", "Hotel stays with breakfast and dinner", "Day-wise driver support and route planning", "Pickup and drop assistance"],
    exclusions: ["Entry tickets and activity charges", "Personal expenses and meals not listed", "Rohtang permit/union transport where applicable"],
    vehicleOptions: ["Sedan", "SUV / Ertiga", "Innova Crysta", "Tempo Traveller (group)"],
    inquiryPrefill: "Shimla Manali Tour Packages",
  },
  {
    slug: "complete-himachal-tour-packages",
    title: "Complete Himachal Tour Packages",
    heroImage: placeImages.shimlaRidgeHero,
    heroSubtitle: "Extended multi-destination Himachal planning for travelers wanting one complete circuit.",
    overview: "Covers major destinations with flexible nights across Shimla, Manali, Dharamshala, Dalhousie, and optional high-altitude sectors.",
    itinerary: ["Pickup and route briefing", "Shimla and nearby viewpoints", "Manali with adventure belt", "Dharamshala and monastery circuit", "Dalhousie and Khajjiar", "Departure transfer"],
    inclusions: ["Complete route curation by local team", "Private vehicle with experienced hill driver", "Hotel options by comfort category", "Live support for weather/route changes"],
    exclusions: ["Monument/activity fee tickets", "Airfare/train tickets", "Anything not mentioned in finalized quote"],
    vehicleOptions: ["Sedan (short route variant)", "SUV", "Innova Crysta", "Tempo Traveller"],
    inquiryPrefill: "Complete Himachal Tour Packages",
  },
  {
    slug: "kinnaur-valley-tour-packages",
    title: "Kinnaur Valley Tour Packages",
    heroImage: placeImages.kinnaurKalpa,
    heroSubtitle: "Apple valley roads, high ridge villages, and scenic trans-Himalayan mountain drives.",
    overview: "Built for travelers who want Kalpa, Sangla, Chitkul, and classic Kinnaur valley landscapes with measured travel days.",
    itinerary: ["Shimla side entry", "Sarahan and Sangla valley stay", "Chitkul excursion", "Kalpa and local ridge viewpoints", "Return journey"],
    inclusions: ["Dedicated mountain route vehicle", "Planned halt points for acclimatized pacing", "Hotel and homestay options", "Driver allowance and parking/toll support"],
    exclusions: ["Adventure activities and optional detours", "Medical and travel insurance", "Additional nights due to weather holds"],
    vehicleOptions: ["SUV", "Innova Crysta", "Tempo Traveller (on request)"],
    inquiryPrefill: "Kinnaur Valley Tour Packages",
  },
  {
    slug: "manali-tour-packages",
    title: "Manali Tour Packages",
    heroImage: placeImages.manaliSolang,
    heroSubtitle: "Focused Manali getaways featuring Solang, local culture, and valley road experiences.",
    overview: "Perfect for short breaks and honeymoon/family itineraries centered around Manali and nearby day routes.",
    itinerary: ["Pickup and transfer to Manali", "Manali local sightseeing", "Solang and optional snow point", "Atal Tunnel / Sissu day route", "Return transfer"],
    inclusions: ["Private car as per group size", "Hotel stay with meal plan options", "Route support for weather and permits", "Flexible local sightseeing windows"],
    exclusions: ["Snow activities and equipment rentals", "Meals not included in package plan", "Personal purchases"],
    vehicleOptions: ["Sedan", "SUV", "Innova Crysta", "Luxury cab options"],
    inquiryPrefill: "Manali Tour Packages",
  },
  {
    slug: "dharamshala-dalhousie-tour-packages",
    title: "Dharamshala Dalhousie Tour Packages",
    heroImage: placeImages.dharamshalaDhauladhar,
    heroSubtitle: "Monastery town calm plus meadow landscapes in one balanced Himachal itinerary.",
    overview: "Pairs Dharamshala's cultural mountain zones with Dalhousie's forest roads and Khajjiar meadow views.",
    itinerary: ["Arrival and Dharamshala transfer", "McLeod Ganj and local points", "Drive to Dalhousie", "Khajjiar and Dalhousie local", "Departure transfer"],
    inclusions: ["Intercity and local private cab", "Comfortable hill-station hotel options", "Driver-guided sightseeing support", "Trip coordination assistance"],
    exclusions: ["Entry fees and paid local attractions", "Any premium room upgrades", "Personal emergency costs"],
    vehicleOptions: ["Sedan", "SUV", "Innova Crysta", "Tempo Traveller for groups"],
    inquiryPrefill: "Dharamshala Dalhousie Tour Packages",
  },
  {
    slug: "kinnaur-and-spiti-tour-packages",
    title: "Kinnaur And Spiti Tour Packages",
    heroImage: placeImages.spitiKeyMonastery,
    heroSubtitle: "Signature high-altitude expedition with monasteries, valleys, passes, and iconic landscapes.",
    overview: "Advanced mountain route package covering Kinnaur and Spiti sectors with proper acclimatization and season-aware planning.",
    itinerary: ["Shimla - Kinnaur valley route", "Sangla and Kalpa sector", "Nako and Tabo transit", "Kaza local monasteries and villages", "Chandratal / exit route as per season", "Return via Manali or Shimla"],
    inclusions: ["High-altitude circuit route planning", "Experienced mountain driver", "Stay options across remote sectors", "On-route assistance for seasonal road conditions"],
    exclusions: ["Permit charges where required", "Medical evacuation or insurance cover", "Costs due to route closure delays"],
    vehicleOptions: ["SUV", "Innova Crysta", "4x4 options on request", "Tempo Traveller (limited routes)"],
    inquiryPrefill: "Kinnaur And Spiti Tour Packages",
  },
];

export const tourPackageCategoriesMap = Object.fromEntries(tourPackageCategories.map((item) => [item.slug, item]));
