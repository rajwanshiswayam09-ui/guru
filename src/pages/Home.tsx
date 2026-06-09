import { useRef, useState } from "react";
import EnquiryHub from "../components/EnquiryHub";
import FleetRibbon from "../components/FleetRibbon";
import FeedbackWall from "../components/FeedbackWall";
import GeoLocationEngine from "../components/GeoLocationEngine";
import Hero from "../components/Hero";
import FeaturedPackages from "../components/FeaturedPackages";
import TopDestinations from "../components/TopDestinations";
import PackageMatrix from "../components/PackageMatrix";
import SEO from "../components/SEO";
import SocialProof from "../components/SocialProof";
import ValueMatrixRibbon from "../components/ValueMatrixRibbon";
import { allModularPackages as packages } from "../data/packages/index";
import { placeImages } from "../data/placeImages";

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Guru Kripa Travels",
    url: "https://gurukripaholiday.com",
    description:
      "Solan-based Himachal travel agency offering tour packages, Shimla Manali taxi service, Tempo Traveller bookings, and live route planning.",
    image: placeImages.manaliSolang,
    priceRange: "Seasonal quote by call or WhatsApp",
    telephone: "+917018972255",
    email: "info@gurukripaholiday.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+917018972255",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Village Kawgari, Post Office Shamti",
      addressLocality: "Solan",
      addressRegion: "Himachal Pradesh",
      postalCode: "173212",
      addressCountry: "IN",
    },
    areaServed: ["Himachal Pradesh", "Punjab", "Delhi", "Chandigarh"],
    sameAs: ["https://instagram.com/gurukripaholiday79"],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: packages.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristTrip",
        name: pkg.name,
        description: pkg.overview,
        url: `https://gurukripaholiday.com/tour-packages/${pkg.category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}/${pkg.slug}`,
      },
    })),
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const packageSectionRef = useRef<HTMLElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (packageSectionRef.current) {
      packageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Guru Kripa Travels | Himachal Tour Packages and Shimla Manali Taxi Service"
        description="Guru Kripa Travels offers premium Himachal tour packages, Shimla Manali taxi service, live route planning, private cabs, and Solan-based travel support."
        keywords={[
          "Himachal Tour Packages",
          "Shimla Manali Taxi Service",
          "Best Himachal Travel Agency",
          "Guru Kripa Travels",
        ]}
        schema={homeSchema}
      />
      <Hero onSearch={handleSearch} />
      <ValueMatrixRibbon />
      <FeaturedPackages />
      <TopDestinations />
      <EnquiryHub />
      <div id="distance-map">
        <GeoLocationEngine />
      </div>
      <PackageMatrix
        ref={packageSectionRef}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery("")}
      />
      <FeedbackWall />
      <FleetRibbon />
      <div id="instagram">
        <SocialProof />
      </div>
    </>
  );
};

export default Home;
