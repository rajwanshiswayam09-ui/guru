import { placeImages } from "./placeImages";

export interface DestinationGalleryItem {
  id: string;
  name: string;
  state: string;
  image: string;
  alt: string;
  description: string;
  highlights: string[];
  query: string;
}

export const destinationGallery: DestinationGalleryItem[] = [
  {
    id: "shimla",
    name: "Shimla",
    state: "Himachal Pradesh",
    image: placeImages.shimlaRidge,
    alt: "The Ridge and Christ Church area in Shimla, Himachal Pradesh",
    description: "Heritage walks, ridge viewpoints, Kufri snow belt, and family-friendly hill stays.",
    highlights: ["Mall Road", "Kufri", "Jakhu Temple"],
    query: "Shimla",
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    image: placeImages.manaliSolang,
    alt: "Solang Valley near Manali, Himachal Pradesh",
    description: "Snow valleys, Old Manali cafes, Solang adventure, and Rohtang permit routes.",
    highlights: ["Solang Valley", "Hadimba Temple", "Rohtang"],
    query: "Manali",
  },
  {
    id: "kasol",
    name: "Kasol",
    state: "Parvati Valley",
    image: placeImages.kasolParvati,
    alt: "Parvati Valley view from Kasol, Himachal Pradesh",
    description: "Riverside cafes, Parvati Valley drives, Manikaran, Chalal walks, and youth trips.",
    highlights: ["Parvati River", "Manikaran", "Chalal"],
    query: "Kasol",
  },
  {
    id: "jibhi",
    name: "Jibhi",
    state: "Tirthan Valley",
    image: placeImages.jibhiWaterfall,
    alt: "Jibhi Waterfall in Tirthan Valley, Himachal Pradesh",
    description: "Forest cottages, waterfalls, slow cafes, wooden stays, and peaceful offbeat roads.",
    highlights: ["Jibhi Waterfall", "Chehni Kothi", "Tirthan"],
    query: "Jibhi",
  },
  {
    id: "dharamshala",
    name: "Dharamshala",
    state: "Dhauladhar Range",
    image: placeImages.dharamshalaDhauladhar,
    alt: "Dhauladhar mountain range above Dharamshala, Himachal Pradesh",
    description: "McLeod Ganj, monasteries, tea gardens, waterfalls, and Dhauladhar valley views.",
    highlights: ["McLeod Ganj", "Bhagsu", "Dal Lake"],
    query: "Dharamshala",
  },
  {
    id: "kinnaur",
    name: "Kinnaur",
    state: "Sangla, Chitkul and Kalpa",
    image: placeImages.kinnaurKalpa,
    alt: "Kinnaur Kailash range viewed from Kalpa in Himachal Pradesh",
    description: "Kalpa viewpoints, Sangla Valley, Chitkul village, apple orchards, and dramatic mountain roads.",
    highlights: ["Kalpa", "Sangla", "Chitkul"],
    query: "Kinnaur",
  },
  {
    id: "spiti",
    name: "Spiti",
    state: "Lahaul and Spiti",
    image: placeImages.spitiKeyMonastery,
    alt: "Key Monastery in Spiti Valley, Himachal Pradesh",
    description: "Kaza, Key Monastery, Chandratal, high villages, and open-season trans-Himalayan drives.",
    highlights: ["Key Monastery", "Kaza", "Chandratal"],
    query: "Spiti",
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab Extension",
    image: placeImages.amritsarGoldenTemple,
    alt: "Golden Temple in Amritsar, Punjab",
    description: "Golden Temple finale, heritage walks, food streets, and Wagah Border evenings.",
    highlights: ["Golden Temple", "Wagah Border", "Food Trail"],
    query: "Amritsar",
  },
];
