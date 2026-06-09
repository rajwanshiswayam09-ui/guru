import { placeImages } from "./placeImages";

export interface DestinationFaq {
  question: string;
  answer: string;
}

export interface WhyVisitItem {
  title: string;
  description: string;
}

export interface DestinationDetail {
  slug: string;
  name: string;
  heroImage: string;
  heroTagline: string;
  overview: string;
  history: string;
  climate: string;
  culture: string;
  bestTimeToVisit: string;
  whyVisitItems: WhyVisitItem[];
  attractions: string[];
  travelInfo: string[];
  whyVisit: string[];
  faqs: DestinationFaq[];
  gallery: { url: string; alt: string }[];
}

export const destinationDetails: DestinationDetail[] = [
  {
    slug: "shimla",
    name: "Shimla",
    heroImage: placeImages.shimlaRidgeHero,
    heroTagline: "Colonial charm, ridge sunsets, and pine valleys in one easy mountain circuit.",
    overview:
      "Shimla, the capital of Himachal Pradesh and the former summer capital of British India, remains one of India's most popular hill stations. Perched at an altitude of 2,205 meters, it is famous for its Victorian architecture, the historic Kalka-Shimla toy train, and the vibrant Mall Road. The city is surrounded by dense forests of oak and pine, offering a perfect blend of heritage and natural beauty.",
    history:
      "Established as a hill station by the British in the early 19th century, Shimla became the summer capital of British India in 1864. The city hosted many significant political meetings, including the Simla Conference of 1945. Today, it stands as a testament to colonial-era planning and architecture.",
    climate:
      "Shimla enjoys a subtropical highland climate. Summers (March to June) are pleasant with temperatures between 15°C and 25°C. Winters (November to February) are cold, with temperatures often dropping below freezing, bringing magical snowfall to the ridge.",
    culture:
      "The local culture is a beautiful blend of traditional Himachali customs and colonial influences. Festivals like the Summer Festival and Lavi Fair are celebrated with great enthusiasm, showcasing local folk music, dance, and handicrafts.",
    bestTimeToVisit: "March to June for pleasant weather; December to January for snowfall.",
    whyVisitItems: [
      { title: "Mall Road", description: "The social hub of Shimla, perfect for shopping and evening walks." },
      { title: "Kufri", description: "A nearby hill station famous for its zoo and winter sports." },
      { title: "Jakhoo Temple", description: "Ancient temple dedicated to Lord Hanuman with a giant statue." },
      { title: "Toy Train", description: "The UNESCO World Heritage Kalka-Shimla rail journey." },
      { title: "Colonial Architecture", description: "Stunning buildings like the Viceregal Lodge and Christ Church." },
    ],
    attractions: ["The Ridge and Mall Road", "Christ Church", "Kufri snow points", "Jakhu Temple", "Naldehra and Mashobra"],
    travelInfo: [
      "Best season: March to June and October to January",
      "Nearest railhead: Kalka; nearest airport: Chandigarh",
      "Ideal stay: 2 to 3 nights",
      "Road conditions are smooth for all car categories in regular season",
    ],
    whyVisit: [
      "Easy accessibility for first-time mountain travelers",
      "Balanced mix of viewpoints, walks, and local culture",
      "Great extension with Kufri and Narkanda day routes",
    ],
    faqs: [
      { question: "Is Shimla good for a honeymoon?", answer: "Yes, Shimla is a classic honeymoon destination offering romantic ridge walks, cozy stays, and beautiful viewpoints." },
      { question: "Can we see snow in Shimla?", answer: "Snowfall typically occurs from late December to early February. Kufri, located nearby, often has snow for a longer duration." },
      { question: "How many days are enough for Shimla?", answer: "2 to 3 days are ideal to cover the main attractions of Shimla and Kufri." },
      { question: "Is it safe to drive to Shimla in winter?", answer: "Yes, but it requires caution during heavy snowfall. Our experienced mountain drivers ensure a safe journey." },
      { question: "What should I buy in Shimla?", answer: "Wooden handicrafts, Himachali caps, shawls, and local fruit jams are popular purchases." },
    ],
    gallery: [
      { url: placeImages.shimlaRidge, alt: "Shimla Ridge view" },
      { url: placeImages.shimlaChurch, alt: "Christ Church Shimla" },
      { url: placeImages.manaliSolang, alt: "Snow points near Shimla" },
    ],
  },
  {
    slug: "manali",
    name: "Manali",
    heroImage: placeImages.manaliSolangHero,
    heroTagline: "Snow valleys, riverside roads, and adventure-ready alpine landscapes.",
    overview:
      "Manali is a high-altitude Himalayan resort town known as a backpacking center and honeymoon destination. Set on the Beas River, it’s a gateway for skiing in the Solang Valley and trekking in Parvati Valley. It's also a jumping-off point for paragliding, rafting, and mountaineering in the Pir Panjal mountains, home to the 4,000m-high Rohtang Pass.",
    history:
      "Named after the Sanatan Hindu lawgiver Manu, Manali is believed to be the place where Sage Manu stepped off his ark to recreate human life after a great flood. The Old Manali village still retains its traditional charm with old wooden houses and narrow lanes.",
    climate:
      "Manali experiences cool summers and very cold winters. The best time for snow lovers is December to February, while those seeking pleasant weather should visit between April and June.",
    culture:
      "The culture of Manali is deeply rooted in local legends and deities. The Hadimba Devi Temple is the center of many cultural activities. The town also has a vibrant cafe culture, especially in Old Manali, influenced by international travelers.",
    bestTimeToVisit: "April to June for pleasant weather; October to February for snow and winter sports.",
    whyVisitItems: [
      { title: "Solang Valley", description: "The hub for adventure sports like paragliding and zorbing." },
      { title: "Rohtang Pass", description: "A high mountain pass offering snow year-round (seasonal)." },
      { title: "Hadimba Temple", description: "An ancient wooden temple dedicated to Hadimba Devi." },
      { title: "Adventure Activities", description: "Rafting in Beas river and trekking in nearby valleys." },
    ],
    attractions: ["Solang Valley", "Hadimba Temple", "Old Manali", "Atal Tunnel route", "Rohtang axis (seasonal)"],
    travelInfo: [
      "Best season: April to June and October to February",
      "Nearest major access point: Chandigarh / Delhi road corridors",
      "Ideal stay: 3 to 4 nights",
      "Snow travel months require early cab planning",
    ],
    whyVisit: [
      "High visual diversity from forests to snow belts",
      "Suitable for family, honeymoon, and adventure travel",
      "Strong connectivity with Kasol, Sissu, and Kullu routes",
    ],
    faqs: [
      { question: "When is the best time to visit Rohtang Pass?", answer: "Rohtang Pass usually opens in May and stays open until November, depending on weather conditions." },
      { question: "Is Manali safe for solo travelers?", answer: "Yes, Manali is very safe and welcoming for solo travelers, with many hostels and group activities." },
      { question: "What are the top adventure sports in Manali?", answer: "Paragliding, river rafting, skiing, and mountain biking are the most popular activities." },
      { question: "How far is Solang Valley from Manali?", answer: "It is approximately 14 km from the main town and takes about 30-40 minutes by cab." },
      { question: "Are there good cafes in Manali?", answer: "Yes, Old Manali is famous for its vibrant cafe scene offering diverse cuisines and live music." },
    ],
    gallery: [
      { url: placeImages.manaliSolang, alt: "Solang Valley Manali" },
      { url: placeImages.manaliSolangHero, alt: "Manali landscapes" },
      { url: placeImages.shimlaRidge, alt: "Nearby scenic views" },
    ],
  },
  {
    slug: "dharamshala",
    name: "Dharamshala",
    heroImage: placeImages.dharamshalaDhauladhar,
    heroTagline: "Dhauladhar peaks, monasteries, and peaceful mountain culture.",
    overview:
      "Dharamshala is a city in the Indian state of Himachal Pradesh. Surrounded by cedar forests on the edge of the Himalayas, this hillside city is home to the Dalai Lama and the Tibetan government-in-exile. The Thekchen Chöling Temple Complex is a spiritual center for Tibetan Buddhism, while the Library of Tibetan Works and Archives houses thousands of precious manuscripts.",
    history:
      "Dharamshala was a quiet British hill station until 1959, when the 14th Dalai Lama fled Tibet and was offered sanctuary here. Since then, McLeod Ganj (Upper Dharamshala) has become a global center for Tibetan culture and Buddhism.",
    climate:
      "The city has a humid subtropical climate. Summers are mild, while the monsoon season brings heavy rainfall. Winters are cold but often sunny, with occasional snowfall in the higher reaches of McLeod Ganj.",
    culture:
      "Dharamshala is a unique melting pot of Tibetan and Himachali cultures. It is a center for meditation, yoga, and Buddhist studies, attracting seekers from all over the world.",
    bestTimeToVisit: "March to June for sightseeing; September to December for clear mountain views.",
    whyVisitItems: [
      { title: "McLeod Ganj", description: "The vibrant home of the Tibetan community and Dalai Lama." },
      { title: "Bhagsu Waterfall", description: "A scenic waterfall located near the ancient Bhagsunath Temple." },
      { title: "Dal Lake", description: "A small, serene lake surrounded by deodar trees." },
      { title: "Namgyal Monastery", description: "The personal monastery of the 14th Dalai Lama." },
      { title: "Tea Gardens", description: "Beautiful lush green tea plantations in the Kangra Valley." },
    ],
    attractions: ["McLeod Ganj", "Bhagsu Waterfall", "Dal Lake", "Namgyal Monastery", "Tea garden viewpoints"],
    travelInfo: [
      "Best season: March to June and September to December",
      "Nearest airport: Gaggal (season-dependent flight operations)",
      "Ideal stay: 2 to 3 nights",
      "Road travel from Chandigarh and Delhi is popular",
    ],
    whyVisit: [
      "Strong spiritual and cultural travel appeal",
      "Cool weather and excellent mountain ridge views",
      "Can be combined with Dalhousie in one route plan",
    ],
    faqs: [
      { question: "Where does the Dalai Lama live?", answer: "The Dalai Lama resides in McLeod Ganj, which is the upper part of Dharamshala." },
      { question: "Is Dharamshala worth visiting?", answer: "Absolutely. It offers a unique mix of spirituality, mountain scenery, and Tibetan culture." },
      { question: "How to reach Dharamshala?", answer: "You can fly to Gaggal Airport, take a train to Pathankot, or drive from Chandigarh/Delhi." },
      { question: "What is the famous food in Dharamshala?", answer: "Momos, Thukpa, and various Tibetan breads are a must-try in McLeod Ganj." },
      { question: "Can we trek in Dharamshala?", answer: "Yes, the Triund trek is one of the most popular and accessible treks in the region." },
    ],
    gallery: [
      { url: placeImages.dharamshalaDhauladhar, alt: "Dhauladhar range views" },
      { url: placeImages.kinnaurKalpa, alt: "Mountain monasteries" },
    ],
  },
  {
    slug: "dalhousie",
    name: "Dalhousie",
    heroImage: placeImages.dalhousieKhajjiar,
    heroTagline: "Cedar forests, colonial town lanes, and Khajjiar meadow panoramas.",
    overview:
      "Dalhousie is a high-altitude town spread across five hills near the Dhauladhar mountain range in the north Indian state of Himachal Pradesh. It's home to colonial-era buildings, including St. Francis and St. John’s Protestant churches, which date to the rule of the British Raj in the 1800s. A trek up Dainkund Peak leads to Pholani Devi Temple.",
    history:
      "Established in 1854 by the British Empire's government in India as a summer retreat for its troops and officials, the town was named after Lord Dalhousie, the then Viceroy of India.",
    climate:
      "Dalhousie has a humid subtropical climate. Summers are pleasant, and winters are cold with frequent snowfall. The air is remarkably fresh and clean due to the surrounding pine and cedar forests.",
    culture:
      "The town retains a quiet, old-world charm with its Victorian architecture and peaceful atmosphere. It is less crowded than other hill stations, making it ideal for those seeking solitude.",
    bestTimeToVisit: "April to June for pleasant weather; October to December for a quiet winter experience.",
    whyVisitItems: [
      { title: "Khajjiar", description: "Often called 'Mini Switzerland of India' for its stunning meadows." },
      { title: "Panchpula", description: "A scenic spot with waterfalls and monuments dedicated to freedom fighters." },
      { title: "Dainkund Peak", description: "The highest point in Dalhousie offering 360-degree views." },
      { title: "St. John's Church", description: "The oldest church in the town, known for its Victorian style." },
    ],
    attractions: ["Khajjiar", "Panchpula", "Subhash Baoli", "St. John's Church", "Dainkund Peak"],
    travelInfo: [
      "Best season: April to June and October to December",
      "Nearest major rail/road access: Pathankot",
      "Ideal stay: 2 nights",
      "Combines well with Dharamshala and Chamba",
    ],
    whyVisit: [
      "Relaxed pace with scenic meadow and forest belts",
      "Excellent short-stay hill retreat",
      "Family-friendly sightseeing circuit",
    ],
    faqs: [
      { question: "Why is Khajjiar famous?", answer: "Khajjiar is famous for its saucer-shaped meadow, floating island, and dense cedar forests, earning it the title 'Mini Switzerland'." },
      { question: "Is Dalhousie good for kids?", answer: "Yes, the gentle slopes and beautiful meadows like Khajjiar are perfect for family outings." },
      { question: "How far is Dalhousie from Dharamshala?", answer: "It is about 120 km and takes approximately 4-5 hours by road." },
      { question: "Can we see the Himalayas from Dalhousie?", answer: "Yes, the Dainkund Peak offers stunning views of the snow-capped Dhauladhar range." },
      { question: "What is the best way to travel locally in Dalhousie?", answer: "Hiring a private taxi is the most convenient way to explore the town and nearby Khajjiar." },
    ],
    gallery: [
      { url: placeImages.dalhousieKhajjiar, alt: "Khajjiar Meadow" },
      { url: placeImages.dharamshalaDhauladhar, alt: "Nearby mountains" },
    ],
  },
  {
    slug: "kinnaur-valley",
    name: "Kinnaur Valley",
    heroImage: placeImages.kinnaurKalpa,
    heroTagline: "Apple orchards, dramatic mountain roads, and Himalayan valley villages.",
    overview:
      "Kinnaur is one of the twelve administrative districts in the Indian state of Himachal Pradesh. It is a mountainous area, ranging in altitude from 2,320 to 6,816 meters. Known for its 'Kinnauri apples' and the sacred Kinnaur Kailash peak, the valley offers some of the most dramatic landscapes in the Himalayas.",
    history:
      "Kinnaur was part of the ancient Bushahr kingdom and was once an important stop on the old silk route to Tibet. The region is mentioned in many ancient Indian texts as the land of the Kinners, celestial musicians.",
    climate:
      "Kinnaur has a temperate climate. Summers are pleasant and short, while winters are long and harsh with heavy snowfall that often cuts off the higher regions.",
    culture:
      "The culture is a unique blend of Hinduism and Buddhism. Many villages have both a temple and a monastery. The local people are known for their traditional green caps and warm hospitality.",
    bestTimeToVisit: "May to October when the roads are clear and the orchards are in bloom.",
    whyVisitItems: [
      { title: "Sangla Valley", description: "A beautiful valley known for its river, trout, and scenic villages." },
      { title: "Chitkul", description: "The last inhabited village near the Indo-Tibetan border." },
      { title: "Kalpa", description: "Famous for its apple orchards and views of the Kinnaur Kailash." },
      { title: "Apple Orchards", description: "Kinnaur produces some of the finest apples in the world." },
    ],
    attractions: ["Kalpa viewpoint", "Sangla Valley", "Chitkul village", "Rakcham", "Nako route extension"],
    travelInfo: [
      "Best season: May to October",
      "Road travel required from Shimla side",
      "Ideal stay: 4 to 5 nights",
      "Weather shifts quickly; layered clothing is essential",
    ],
    whyVisit: [
      "One of Himachal's best mountain road experiences",
      "Distinct local culture and architecture",
      "Gateway for deeper Spiti circuit routes",
    ],
    faqs: [
      { question: "Is Chitkul the last village of India?", answer: "Chitkul is the last inhabited village on the old Hindustan-Tibet road near the border." },
      { question: "What is special about Kalpa?", answer: "Kalpa is famous for its stunning views of the Kinnaur Kailash range and its high-quality apple orchards." },
      { question: "Are roads in Kinnaur safe?", answer: "The roads are dramatic and carved into cliffs. Our experienced mountain drivers are specialized in these routes." },
      { question: "Do we need permits for Kinnaur?", answer: "Indian citizens don't need permits for most areas, but foreigners may need an Inner Line Permit for certain stretches." },
      { question: "What is Kinnauri culture like?", answer: "It's a harmonious mix of Buddhist and Hindu traditions, reflected in their festivals and architecture." },
    ],
    gallery: [
      { url: placeImages.kinnaurKalpa, alt: "Kalpa view" },
      { url: placeImages.spitiKeyMonastery, alt: "High altitude landscape" },
    ],
  },
  {
    slug: "lahaul-and-spiti-valley",
    name: "Lahaul And Spiti Valley",
    heroImage: placeImages.spitiKeyMonastery,
    heroTagline: "High-altitude deserts, monasteries, lakes, and legendary trans-Himalayan roads.",
    overview:
      "The Lahaul and Spiti district in the Indian state of Himachal Pradesh consists of the two formerly separate districts of Lahaul and Spiti. The present administrative centre is Kyelang in Lahaul. Spiti is a high-altitude desert, while Lahaul is slightly greener but equally rugged. The region is home to some of the world's highest villages and ancient monasteries.",
    history:
      "Spiti has a long history as a cultural bridge between India and Tibet. The Tabo Monastery, founded in 996 AD, is one of the oldest continuously functioning Buddhist monasteries in India.",
    climate:
      "The region has an arid, cold desert climate. Summers are short and dry, while winters are long and extremely cold, with temperatures dropping to -30°C in some parts.",
    culture:
      "The culture is predominantly Tibetan Buddhist. Life in Spiti revolves around the monasteries. The people are resilient, living in harmony with the harsh environment.",
    bestTimeToVisit: "June to October when the high passes like Rohtang and Kunzum are open.",
    whyVisitItems: [
      { title: "Chandratal Lake", description: "A high-altitude lake shaped like a crescent moon." },
      { title: "Key Monastery", description: "An iconic Tibetan Buddhist monastery perched on a hilltop." },
      { title: "Langza", description: "Famous for its giant Buddha statue and ancient fossils." },
      { title: "Hikkim", description: "Home to the world's highest post office." },
    ],
    attractions: ["Key Monastery", "Kaza", "Chandratal Lake", "Langza and Hikkim", "Kunzum Pass (seasonal)"],
    travelInfo: [
      "Best season: June to October",
      "Ideal stay: 6 to 8 nights",
      "High altitude itinerary should be paced with acclimatization",
      "SUV category recommended for comfort on remote stretches",
    ],
    whyVisit: [
      "Most cinematic scenery in Himachal road travel",
      "Rare blend of culture, silence, and wilderness",
      "Best suited for travelers wanting signature mountain expeditions",
    ],
    faqs: [
      { question: "Is Spiti Valley very cold?", answer: "Yes, even in summer, nights can be chilly. In winter, it is one of the coldest inhabited places in India." },
      { question: "What is the altitude of Kaza?", answer: "Kaza is located at an altitude of approximately 3,650 meters (11,980 feet)." },
      { question: "Can we visit Spiti in winter?", answer: "Yes, the 'Winter Spiti' expedition is popular but requires specialized planning and high-altitude gear." },
      { question: "How to reach Chandratal Lake?", answer: "It is reached via the Kunzum Pass from Kaza or the Rohtang/Atal Tunnel route from Manali." },
      { question: "What is the best vehicle for Spiti?", answer: "We recommend a sturdy SUV like Innova or Scorpio for the rugged mountain roads of Spiti." },
    ],
    gallery: [
      { url: placeImages.spitiKeyMonastery, alt: "Key Monastery" },
      { url: placeImages.kinnaurKalpa, alt: "Himalayan peaks" },
    ],
  },
];

export const destinationDetailsMap = Object.fromEntries(destinationDetails.map((item) => [item.slug, item]));
