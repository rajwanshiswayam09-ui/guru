import { placeImages } from "./placeImages";
import { expandedPackages } from "./expandedPackages";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RouteStop {
  name: string;
  state: string;
  coords: Coordinates;
  description: string;
  attractions: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  from?: string;
  to?: string;
  distanceKm?: number;
  driveTime?: string;
  description: string;
  attractions: string[];
  stay: string;
  meals: string;
}

export interface PackageSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: number;
  days: number;
  totalDistanceKm: number;
  estimatedDriveTime: string;
  route: string[];
  routeStops: RouteStop[];
  itinerary: ItineraryDay[];
  badges: {
    label: string;
    text: string;
  }[];
  cabAllocation: {
    label: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions?: string[];
  faqs?: { question: string; answer: string }[];
  hotelInfo?: string;
  image: string;
  gallery: string[];
  destinations: string[];
  seo: PackageSeo;
}

export const packages: Package[] = [
  {
    id: "complete-himachal-amritsar",
    title: "Complete Himachal Tour with Amritsar",
    subtitle: "A grand Himachal circuit covering Shimla, Manali, Dharamshala, Dalhousie, and the Golden Temple.",
    duration: "8 Nights / 9 Days",
    nights: 8,
    days: 9,
    totalDistanceKm: 1420,
    estimatedDriveTime: "36 - 40 hours",
    route: ["Chandigarh", "Kufri", "Manali", "Solang Valley", "Naggar Castle", "Dharamshala", "Dalhousie", "Amritsar"],
    routeStops: [
      {
        name: "Chandigarh",
        state: "Chandigarh",
        coords: { lat: 30.7333, lng: 76.7794 },
        description: "Pickup hub with smooth airport, railway, and highway access.",
        attractions: ["Sukhna Lake", "Rock Garden", "Sector 17"],
      },
      {
        name: "Kufri",
        state: "Himachal Pradesh",
        coords: { lat: 31.0983, lng: 77.2679 },
        description: "Pine slopes and high-altitude viewpoints near Shimla.",
        attractions: ["Kufri Fun World", "Mahasu Peak", "Green Valley"],
      },
      {
        name: "Manali",
        state: "Himachal Pradesh",
        coords: { lat: 32.2432, lng: 77.1892 },
        description: "The classic Kullu Valley base for snow, cafes, temples, and river drives.",
        attractions: ["Hadimba Temple", "Mall Road", "Old Manali"],
      },
      {
        name: "Dharamshala",
        state: "Himachal Pradesh",
        coords: { lat: 32.219, lng: 76.3234 },
        description: "A peaceful Dhauladhar foothill stay with Tibetan culture and mountain views.",
        attractions: ["McLeod Ganj", "Bhagsu Waterfall", "Dal Lake"],
      },
      {
        name: "Dalhousie",
        state: "Himachal Pradesh",
        coords: { lat: 32.5387, lng: 75.9715 },
        description: "Colonial ridgelines, cedar forests, and quiet family-friendly mountain air.",
        attractions: ["Khajjiar", "Panchpula", "Dainkund Peak"],
      },
      {
        name: "Amritsar",
        state: "Punjab",
        coords: { lat: 31.634, lng: 74.8723 },
        description: "Golden Temple finale with Punjabi food streets and heritage evenings.",
        attractions: ["Golden Temple", "Jallianwala Bagh", "Wagah Border"],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Chandigarh pickup and Kufri ridge drive",
        from: "Chandigarh",
        to: "Kufri",
        distanceKm: 135,
        driveTime: "4 - 5 hours",
        description: "Meet your driver at Chandigarh and climb toward Shimla district through Parwanoo, Solan, and pine-lined bends.",
        attractions: ["Timber Trail viewpoint", "Solan bypass", "Evening ridge walk"],
        stay: "Shimla or Kufri premium hotel",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Kufri and Shimla sightseeing",
        description: "Explore the Kufri highlands, Green Valley viewpoints, and Shimla's heritage walking zone at a relaxed mountain pace.",
        attractions: ["Kufri", "Green Valley", "Mall Road", "Christ Church"],
        stay: "Shimla or Kufri premium hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 3,
        title: "Shimla to Manali via Kullu Valley",
        from: "Kufri",
        to: "Manali",
        distanceKm: 260,
        driveTime: "8 - 9 hours",
        description: "Travel through the Sutlej and Beas valley corridor with comfort breaks and photo stops along the river.",
        attractions: ["Pandoh Dam", "Kullu shawl factory", "Beas river viewpoints"],
        stay: "Manali resort",
        meals: "Breakfast and dinner",
      },
      {
        day: 4,
        title: "Manali, Solang Valley, and Naggar",
        from: "Manali",
        to: "Naggar Castle",
        distanceKm: 75,
        driveTime: "3 - 4 hours local",
        description: "Cover Manali icons, the Solang adventure belt, and Naggar's heritage castle with flexible sightseeing windows.",
        attractions: ["Hadimba Temple", "Solang Valley", "Naggar Castle", "Vashisht"],
        stay: "Manali resort",
        meals: "Breakfast and dinner",
      },
      {
        day: 5,
        title: "Manali to Dharamshala",
        from: "Manali",
        to: "Dharamshala",
        distanceKm: 240,
        driveTime: "7 - 8 hours",
        description: "A scenic transfer through Mandi, Palampur tea country, and the Dhauladhar foothills.",
        attractions: ["Mandi", "Palampur tea gardens", "Dhauladhar views"],
        stay: "Dharamshala hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 6,
        title: "Dharamshala to Dalhousie",
        from: "Dharamshala",
        to: "Dalhousie",
        distanceKm: 120,
        driveTime: "4 - 5 hours",
        description: "Begin with McLeod Ganj highlights and continue to Dalhousie for a cedar-forest evening.",
        attractions: ["Bhagsu Waterfall", "Dal Lake", "St. John's Church"],
        stay: "Dalhousie hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 7,
        title: "Khajjiar meadows and Dalhousie viewpoints",
        distanceKm: 55,
        driveTime: "3 - 4 hours local",
        description: "Spend the day around Khajjiar's meadows, Dainkund, and slow hillside viewpoints.",
        attractions: ["Khajjiar", "Dainkund Peak", "Panchpula"],
        stay: "Dalhousie hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 8,
        title: "Dalhousie to Amritsar",
        from: "Dalhousie",
        to: "Amritsar",
        distanceKm: 200,
        driveTime: "5 - 6 hours",
        description: "Descend from Himachal into Punjab and close the evening with Amritsar's spiritual and culinary energy.",
        attractions: ["Golden Temple evening visit", "Local food trail"],
        stay: "Amritsar hotel",
        meals: "Breakfast",
      },
      {
        day: 9,
        title: "Amritsar heritage and departure",
        description: "Visit the Golden Temple, Jallianwala Bagh, and Wagah Border as per departure timing.",
        attractions: ["Golden Temple", "Jallianwala Bagh", "Wagah Border"],
        stay: "Departure day",
        meals: "Breakfast",
      },
    ],
    badges: [
      { label: "Hotel", text: "3/4-star premium stays with upgrade options" },
      { label: "Food", text: "MAP meal plan on most mountain nights" },
      { label: "Fleet", text: "Sedan, SUV, and Tempo Traveller choices" },
    ],
    cabAllocation: [
      { label: "Sedan", description: "Dzire or Etios for up to 4 guests" },
      { label: "SUV", description: "Innova Crysta or Ertiga for family comfort" },
      { label: "Tempo Traveller", description: "12 to 26-seater options for groups" },
    ],
    inclusions: ["Private cab with driver", "Hotel stays", "Route assistance", "Toll and parking guidance", "24/7 trip support"],
    image: placeImages.shimlaRidge,
    gallery: [
      placeImages.shimlaChurch,
      placeImages.manaliSolang,
      placeImages.dharamshalaDhauladhar,
      placeImages.dalhousieKhajjiar,
      placeImages.amritsarGoldenTemple,
    ],
    destinations: ["Shimla", "Kufri", "Manali", "Dharamshala", "Dalhousie", "Amritsar"],
    seo: {
      title: "Complete Himachal Tour with Amritsar | Guru Kripa Travels",
      description: "Book a complete Himachal tour package with Amritsar covering Shimla, Manali, Dharamshala, Dalhousie, and Golden Temple.",
      keywords: ["Himachal Tour Packages", "Complete Himachal Tour", "Guru Kripa Travels", "Amritsar Himachal Tour"],
    },
  },
  {
    id: "heavenly-himachal",
    title: "Heavenly Himachal Tour Package",
    subtitle: "A refined Shimla and Manali itinerary built around comfort, snow points, and iconic valley drives.",
    duration: "9 Nights / 10 Days",
    nights: 9,
    days: 10,
    totalDistanceKm: 920,
    estimatedDriveTime: "25 - 29 hours",
    route: ["Chandigarh", "Shimla", "Kufri", "Manali", "Solang Valley", "Rohtang Pass", "Chandigarh"],
    routeStops: [
      {
        name: "Chandigarh",
        state: "Chandigarh",
        coords: { lat: 30.7333, lng: 76.7794 },
        description: "Primary arrival and departure hub for North India travellers.",
        attractions: ["Airport pickup", "Sukhna Lake", "Rock Garden"],
      },
      {
        name: "Shimla",
        state: "Himachal Pradesh",
        coords: { lat: 31.1048, lng: 77.1734 },
        description: "Heritage hill capital with colonial walks and ridge viewpoints.",
        attractions: ["Mall Road", "Christ Church", "Jakhu Temple"],
      },
      {
        name: "Kufri",
        state: "Himachal Pradesh",
        coords: { lat: 31.0983, lng: 77.2679 },
        description: "Snow-season fun zone and family viewpoints near Shimla.",
        attractions: ["Mahasu Peak", "Green Valley", "Kufri Fun World"],
      },
      {
        name: "Manali",
        state: "Himachal Pradesh",
        coords: { lat: 32.2432, lng: 77.1892 },
        description: "High-valley base for Solang, temples, cafes, and river drives.",
        attractions: ["Hadimba Temple", "Old Manali", "Vashisht"],
      },
      {
        name: "Solang Valley",
        state: "Himachal Pradesh",
        coords: { lat: 32.3162, lng: 77.1579 },
        description: "Adventure valley with snow activities, ropeway, and wide mountain views.",
        attractions: ["Ropeway", "Snow activities", "Paragliding zone"],
      },
      {
        name: "Rohtang Pass",
        state: "Himachal Pradesh",
        coords: { lat: 32.3719, lng: 77.2468 },
        description: "High-altitude seasonal pass subject to permit, weather, and local rules.",
        attractions: ["Snow point", "Glacier views", "Permit-assisted visit"],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Chandigarh to Shimla",
        from: "Chandigarh",
        to: "Shimla",
        distanceKm: 115,
        driveTime: "4 - 5 hours",
        description: "Begin the hill ascent through Kalka, Parwanoo, and Solan with planned comfort stops.",
        attractions: ["Timber Trail", "Solan valley", "Shimla Mall Road"],
        stay: "Shimla hotel",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Shimla heritage and Jakhu",
        description: "A relaxed local circuit covering ridge views, heritage buildings, and Jakhu hill.",
        attractions: ["Christ Church", "Jakhu Temple", "The Ridge"],
        stay: "Shimla hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 3,
        title: "Kufri snow belt and Naldehra option",
        distanceKm: 65,
        driveTime: "3 - 4 hours local",
        description: "Explore Kufri and add Naldehra if the group wants a quieter cedar-and-golf-course detour.",
        attractions: ["Kufri", "Green Valley", "Naldehra"],
        stay: "Shimla hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 4,
        title: "Shimla to Manali",
        from: "Shimla",
        to: "Manali",
        distanceKm: 250,
        driveTime: "8 - 9 hours",
        description: "A full-day scenic transfer through Bilaspur, Mandi, Pandoh, and Kullu Valley.",
        attractions: ["Pandoh Dam", "Kullu Valley", "Beas river"],
        stay: "Manali resort",
        meals: "Breakfast and dinner",
      },
      {
        day: 5,
        title: "Manali local experience",
        description: "Cover temples, cafes, hot springs, and the relaxed Old Manali belt.",
        attractions: ["Hadimba Temple", "Vashisht", "Old Manali", "Mall Road"],
        stay: "Manali resort",
        meals: "Breakfast and dinner",
      },
      {
        day: 6,
        title: "Solang Valley adventure day",
        from: "Manali",
        to: "Solang Valley",
        distanceKm: 28,
        driveTime: "2 - 3 hours local",
        description: "Visit Solang Valley for ropeway, snow activities in season, and wide valley viewpoints.",
        attractions: ["Solang Ropeway", "Snow activities", "Valley photography"],
        stay: "Manali resort",
        meals: "Breakfast and dinner",
      },
      {
        day: 7,
        title: "Rohtang Pass or Atal Tunnel snow point",
        from: "Manali",
        to: "Rohtang Pass",
        distanceKm: 100,
        driveTime: "5 - 6 hours seasonal",
        description: "Proceed to Rohtang when permits and weather allow, or switch to Atal Tunnel/Sissu as a live-condition alternative.",
        attractions: ["Rohtang Pass", "Atal Tunnel option", "Sissu waterfall option"],
        stay: "Manali resort",
        meals: "Breakfast and dinner",
      },
      {
        day: 8,
        title: "Kullu, Naggar, and river viewpoints",
        distanceKm: 85,
        driveTime: "4 - 5 hours local",
        description: "Balance the trip with Naggar Castle, art stops, and Kullu shopping before returning to Manali.",
        attractions: ["Naggar Castle", "Roerich Gallery", "Kullu shawls"],
        stay: "Manali resort",
        meals: "Breakfast and dinner",
      },
      {
        day: 9,
        title: "Manali to Chandigarh",
        from: "Manali",
        to: "Chandigarh",
        distanceKm: 305,
        driveTime: "9 - 10 hours",
        description: "Descend through Kullu and Mandi with timed breaks for a comfortable return to Chandigarh.",
        attractions: ["Mandi", "Bilaspur", "Chandigarh evening"],
        stay: "Chandigarh hotel",
        meals: "Breakfast",
      },
      {
        day: 10,
        title: "Departure from Chandigarh",
        description: "Drop at airport, railway station, or hotel as per final schedule.",
        attractions: ["Flexible drop", "Optional local stop"],
        stay: "Departure day",
        meals: "Breakfast",
      },
    ],
    badges: [
      { label: "Hotel", text: "Luxury resort options in Shimla and Manali" },
      { label: "Permit", text: "Rohtang and snow-point permit support" },
      { label: "Drive", text: "Balanced long-drive and rest-day planning" },
    ],
    cabAllocation: [
      { label: "Prime Sedan", description: "efficient for couples and light luggage" },
      { label: "Ertiga or Innova", description: "comfort upgrade for families" },
      { label: "4x4 option", description: "available when weather and route require" },
    ],
    inclusions: ["Private cab", "Hotel stays", "Breakfast and dinner plan", "Permit assistance", "Local support desk"],
    image: placeImages.manaliSolang,
    gallery: [
      placeImages.shimlaRidge,
      placeImages.shimlaChurch,
      placeImages.manaliHadimba,
      placeImages.manaliSolang,
    ],
    destinations: ["Shimla", "Kufri", "Manali", "Solang Valley", "Rohtang Pass"],
    seo: {
      title: "Heavenly Himachal Tour Package | Shimla Manali Taxi Service",
      description: "Premium Shimla Manali tour with private taxi, Solang Valley, Rohtang permit support, luxury stays, and Guru Kripa Travels planning.",
      keywords: ["Shimla Manali Taxi Service", "Himachal Tour Packages", "Best Himachal Travel Agency", "Guru Kripa Travels"],
    },
  },
  {
    id: "kullu-manali-kasol-jibhi",
    title: "Kullu Manali Kasol and Jibhi Circuit",
    subtitle: "A valley-to-forest route for travellers who want Manali comfort, Kasol cafes, and Jibhi wooden stays.",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    totalDistanceKm: 1120,
    estimatedDriveTime: "28 - 32 hours",
    route: ["Delhi", "Manali", "Solang Valley", "Kullu", "Kasol", "Manikaran", "Jibhi", "Delhi"],
    routeStops: [
      {
        name: "Delhi",
        state: "Delhi",
        coords: { lat: 28.6139, lng: 77.209 },
        description: "Common overnight departure hub for Himachal road trips.",
        attractions: ["Airport pickup", "Railway pickup", "NCR pickup"],
      },
      {
        name: "Manali",
        state: "Himachal Pradesh",
        coords: { lat: 32.2432, lng: 77.1892 },
        description: "High-valley stay with classic sightseeing and cafes.",
        attractions: ["Hadimba Temple", "Old Manali", "Mall Road"],
      },
      {
        name: "Solang Valley",
        state: "Himachal Pradesh",
        coords: { lat: 32.3162, lng: 77.1579 },
        description: "Adventure belt with seasonal snow and ropeway options.",
        attractions: ["Ropeway", "Snow activities", "Valley views"],
      },
      {
        name: "Kullu",
        state: "Himachal Pradesh",
        coords: { lat: 31.9579, lng: 77.1095 },
        description: "Beas river valley stop for rafting and shawl shopping.",
        attractions: ["River rafting", "Shawl factory", "Vaishno Devi Temple"],
      },
      {
        name: "Kasol",
        state: "Himachal Pradesh",
        coords: { lat: 32.009, lng: 77.315 },
        description: "Parvati Valley base with riverside cafes and easy walks.",
        attractions: ["Parvati river", "Chalal walk", "Cafe trail"],
      },
      {
        name: "Manikaran",
        state: "Himachal Pradesh",
        coords: { lat: 32.0279, lng: 77.3499 },
        description: "Hot springs and spiritual stop near Kasol.",
        attractions: ["Gurudwara", "Hot springs", "Temple complex"],
      },
      {
        name: "Jibhi",
        state: "Himachal Pradesh",
        coords: { lat: 31.5946, lng: 77.3533 },
        description: "Forest village with cottages, waterfall walks, and slow evenings.",
        attractions: ["Jibhi Waterfall", "Mini Thailand", "Chehni Kothi"],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi to Manali overnight drive",
        from: "Delhi",
        to: "Manali",
        distanceKm: 540,
        driveTime: "12 - 14 hours overnight",
        description: "Depart from Delhi/NCR in the evening and travel overnight through Punjab and the Kullu corridor.",
        attractions: ["Comfort stops", "Beas valley morning entry"],
        stay: "Overnight drive",
        meals: "On request",
      },
      {
        day: 2,
        title: "Manali arrival and local sightseeing",
        description: "Check in, rest, and explore Manali's temples, cafes, hot springs, and Mall Road.",
        attractions: ["Hadimba Temple", "Vashisht", "Old Manali", "Mall Road"],
        stay: "Manali hotel",
        meals: "Dinner",
      },
      {
        day: 3,
        title: "Solang Valley and Kullu",
        from: "Manali",
        to: "Solang Valley",
        distanceKm: 95,
        driveTime: "5 - 6 hours local",
        description: "Spend the morning in Solang Valley and continue through Kullu for river and craft stops.",
        attractions: ["Solang Ropeway", "Kullu rafting point", "Shawl factory"],
        stay: "Manali hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 4,
        title: "Manali to Kasol and Manikaran",
        from: "Manali",
        to: "Kasol",
        distanceKm: 95,
        driveTime: "4 - 5 hours",
        description: "Drive into Parvati Valley, visit Manikaran, and settle into Kasol's riverside cafe energy.",
        attractions: ["Manikaran Gurudwara", "Parvati river", "Chalal walk"],
        stay: "Kasol riverside camp or hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 5,
        title: "Kasol to Jibhi forest stay",
        from: "Kasol",
        to: "Jibhi",
        distanceKm: 85,
        driveTime: "4 - 5 hours",
        description: "Cross into Tirthan valley terrain for a quieter wooden-stay evening in Jibhi.",
        attractions: ["Aut tunnel", "Jibhi Waterfall", "Forest cafe evening"],
        stay: "Jibhi cottage or woodhouse",
        meals: "Breakfast and dinner",
      },
      {
        day: 6,
        title: "Jibhi to Delhi return",
        from: "Jibhi",
        to: "Delhi",
        distanceKm: 505,
        driveTime: "12 - 13 hours",
        description: "Begin early for Delhi/NCR drop with comfort breaks through Aut, Mandi, and Chandigarh corridor.",
        attractions: ["Tirthan valley views", "Return comfort stops"],
        stay: "Departure day",
        meals: "Breakfast",
      },
    ],
    badges: [
      { label: "Hotel", text: "Riverside camps in Kasol and woodhouse stays in Jibhi" },
      { label: "Route", text: "Delhi pickup, Manali, Parvati Valley, and Jibhi" },
      { label: "Style", text: "Comfortable for families, couples, and youth groups" },
    ],
    cabAllocation: [
      { label: "AC Sedan", description: "sanitized commercial sedan for couples" },
      { label: "SUV", description: "recommended for luggage and mountain comfort" },
      { label: "Tempo Traveller", description: "best for group batches and music-friendly drives" },
    ],
    inclusions: ["Private cab", "Driver allowance", "Hotel/camp stays", "Route coordinator", "Custom pickup options"],
    image: placeImages.kasolParvati,
    gallery: [
      placeImages.manaliSolang,
      placeImages.kasolParvati,
      placeImages.jibhiWaterfall,
    ],
    destinations: ["Manali", "Kullu", "Kasol", "Manikaran", "Jibhi"],
    seo: {
      title: "Kullu Manali Kasol Jibhi Tour | Guru Kripa Travels",
      description: "Book Kullu Manali Kasol and Jibhi circuit from Delhi with private cab, riverside stays, Parvati Valley route, and Jibhi cottages.",
      keywords: ["Himachal Tour Packages", "Kullu Manali Kasol Jibhi", "Guru Kripa Travels", "Best Himachal Travel Agency"],
    },
  },
  {
    id: "offbeat-himachal",
    title: "Offbeat Himachal and Hidden Gems",
    subtitle: "A premium offbeat mountain plan for travellers who want Tosh, Kasol, Jibhi, and quiet valley stays.",
    duration: "7 Nights / 8 Days",
    nights: 7,
    days: 8,
    totalDistanceKm: 1240,
    estimatedDriveTime: "32 - 36 hours",
    route: ["Delhi", "Manali", "Solang", "Kasol", "Tosh", "Jibhi", "Delhi"],
    routeStops: [
      {
        name: "Delhi",
        state: "Delhi",
        coords: { lat: 28.6139, lng: 77.209 },
        description: "Flexible pickup from airport, railway station, hotel, or NCR address.",
        attractions: ["NCR pickup", "Airport pickup", "Overnight start"],
      },
      {
        name: "Manali",
        state: "Himachal Pradesh",
        coords: { lat: 32.2432, lng: 77.1892 },
        description: "Comfort base before entering quieter valley routes.",
        attractions: ["Hadimba Temple", "Old Manali", "Vashisht"],
      },
      {
        name: "Solang Valley",
        state: "Himachal Pradesh",
        coords: { lat: 32.3162, lng: 77.1579 },
        description: "Adventure and snow-valley stop close to Manali.",
        attractions: ["Ropeway", "Snow activities", "Photography"],
      },
      {
        name: "Kasol",
        state: "Himachal Pradesh",
        coords: { lat: 32.009, lng: 77.315 },
        description: "Riverside cafe culture and Parvati Valley base.",
        attractions: ["Chalal walk", "Parvati river", "Cafe trail"],
      },
      {
        name: "Tosh",
        state: "Himachal Pradesh",
        coords: { lat: 32.0149, lng: 77.4544 },
        description: "High village valley views with slow cafe evenings and short walks.",
        attractions: ["Tosh village", "Parvati viewpoints", "Cafe evenings"],
      },
      {
        name: "Jibhi",
        state: "Himachal Pradesh",
        coords: { lat: 31.5946, lng: 77.3533 },
        description: "Forest hideaway with waterfalls, cottages, and peaceful routes.",
        attractions: ["Jibhi Waterfall", "Mini Thailand", "Chehni Kothi"],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi to Manali overnight",
        from: "Delhi",
        to: "Manali",
        distanceKm: 540,
        driveTime: "12 - 14 hours overnight",
        description: "Start from Delhi/NCR and travel overnight toward the Kullu-Manali valley.",
        attractions: ["Comfort stops", "Morning valley arrival"],
        stay: "Overnight drive",
        meals: "On request",
      },
      {
        day: 2,
        title: "Manali recovery and cafe evening",
        description: "Check in, rest, and keep the day light with Manali local icons and cafes.",
        attractions: ["Hadimba Temple", "Old Manali", "Mall Road"],
        stay: "Manali boutique hotel",
        meals: "Dinner",
      },
      {
        day: 3,
        title: "Solang Valley and mountain viewpoints",
        from: "Manali",
        to: "Solang Valley",
        distanceKm: 35,
        driveTime: "3 - 4 hours local",
        description: "Cover Solang Valley and optional Atal Tunnel side depending on live conditions.",
        attractions: ["Solang Ropeway", "Snow activities", "Atal Tunnel option"],
        stay: "Manali boutique hotel",
        meals: "Breakfast and dinner",
      },
      {
        day: 4,
        title: "Manali to Kasol",
        from: "Manali",
        to: "Kasol",
        distanceKm: 75,
        driveTime: "3 - 4 hours",
        description: "Drive through Kullu and enter the Parvati Valley for Kasol riverside time.",
        attractions: ["Kullu", "Parvati river", "Chalal walk"],
        stay: "Kasol riverside stay",
        meals: "Breakfast and dinner",
      },
      {
        day: 5,
        title: "Kasol to Tosh village",
        from: "Kasol",
        to: "Tosh",
        distanceKm: 40,
        driveTime: "3 - 4 hours with local transfer",
        description: "Move toward Tosh for high-valley views, short walks, and offbeat cafe stops.",
        attractions: ["Tosh village", "Parvati viewpoints", "Local cafes"],
        stay: "Tosh guesthouse or Kasol stay",
        meals: "Breakfast and dinner",
      },
      {
        day: 6,
        title: "Tosh to Jibhi",
        from: "Tosh",
        to: "Jibhi",
        distanceKm: 125,
        driveTime: "5 - 6 hours",
        description: "Cross from Parvati Valley toward Tirthan terrain and settle into Jibhi's forest pace.",
        attractions: ["Aut tunnel", "Tirthan views", "Jibhi cafe evening"],
        stay: "Jibhi woodhouse",
        meals: "Breakfast and dinner",
      },
      {
        day: 7,
        title: "Jibhi waterfall and hidden trails",
        distanceKm: 45,
        driveTime: "3 - 4 hours local",
        description: "Explore Jibhi waterfall, Chehni Kothi, and quiet forest pockets with flexible timing.",
        attractions: ["Jibhi Waterfall", "Chehni Kothi", "Mini Thailand"],
        stay: "Jibhi woodhouse",
        meals: "Breakfast and dinner",
      },
      {
        day: 8,
        title: "Jibhi to Delhi departure",
        from: "Jibhi",
        to: "Delhi",
        distanceKm: 505,
        driveTime: "12 - 13 hours",
        description: "Return to Delhi/NCR with early start and planned highway breaks.",
        attractions: ["Tirthan valley views", "Return comfort stops"],
        stay: "Departure day",
        meals: "Breakfast",
      },
    ],
    badges: [
      { label: "Hotel", text: "Boutique cafes, premium homestays, and forest cottages" },
      { label: "Road", text: "SUV recommended for high-clearance offbeat stretches" },
      { label: "Pace", text: "Designed with rest windows and flexible viewpoints" },
    ],
    cabAllocation: [
      { label: "Hardened SUV", description: "Innova, Scorpio, or equivalent for offbeat roads" },
      { label: "Sedan", description: "possible for lighter routes after road-condition check" },
      { label: "Traveller", description: "for groups with adjusted access points" },
    ],
    inclusions: ["Private cab", "Offbeat route planning", "Stays", "Driver allowance", "Live condition support"],
    image: placeImages.jibhiWaterfall,
    gallery: [
      placeImages.kasolParvati,
      placeImages.jibhiWaterfall,
      placeImages.manaliSolang,
    ],
    destinations: ["Manali", "Solang Valley", "Kasol", "Tosh", "Jibhi"],
    seo: {
      title: "Offbeat Himachal Hidden Gems Tour | Guru Kripa Travels",
      description: "Premium offbeat Himachal package covering Manali, Solang, Kasol, Tosh, and Jibhi with private SUV planning.",
      keywords: ["Offbeat Himachal Tour", "Himachal Tour Packages", "Best Himachal Travel Agency", "Guru Kripa Travels"],
    },
  },
  ...expandedPackages,
];

export const allRouteStops: RouteStop[] = packages
  .flatMap((pkg) => pkg.routeStops)
  .filter((stop, index, allStops) => allStops.findIndex((item) => item.name === stop.name) === index);
