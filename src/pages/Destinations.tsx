import { useState } from "react";
import DestinationGallery from "../components/DestinationGallery";
import GeoLocationEngine from "../components/GeoLocationEngine";
import SEO from "../components/SEO";

const Destinations = () => {
  const [, setSearchQuery] = useState("");

  return (
    <>
      <SEO
        title="Destinations | Guru Kripa Travels"
        description="Explore Himachal destinations with curated gallery highlights and route planning support."
      />
      <DestinationGallery onSelectDestination={setSearchQuery} />
      <GeoLocationEngine />
    </>
  );
};

export default Destinations;
