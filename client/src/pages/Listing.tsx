import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingProps } from "../types";
import ImageSlider from "./ImageSlider";

import "swiper/css/bundle";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState<ListingProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  console.log("listing ", listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await response.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setListing(data);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    setImages(listing?.imageUrls || []);
  }, [listing]);

  return (
    <main>
      {loading && <div className="text-center my-7 text-2xl">Loading...</div>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}

      <ImageSlider slides={images} />
    </main>
  );
}
