import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter
import TourForm from "components/Form/Formix/TourForm/TourForm";
import LayoutDefault from "components/layouts/LayoutDefault";
import TourCard from "components/TourCard/indext";
import { getTourTypeById, typeRegion } from "services";
import { Tour, TourType } from "Models";

export default function LocalTour() {
  const router = useRouter(); // Get the router

  // Extract 'id' from the query parameters in the URL
  const { id } = router.query;
  const idString = Array.isArray(id) ? id[0] : id;
  const [tourTypes, setTourType] = useState<TourType>(new TourType());

  useEffect(() => {
    const initData = async () => {
      if (id === null || id === undefined)
        return; 
      try {
        const idParam = parseInt(id[0]);
        const rest = await getTourTypeById(idParam);
        debugger
        if (rest) {
          const data: TourType = rest;
          setTourType(data);
        }
      } catch (e) {
        // Xử lý lỗi nếu cần
      }
    };

    initData();
  }, [id]); // Trigger the effect whenever 'id' changes

  return (
    <LayoutDefault>
      <div className="dk-text-[#222] dk-font-Inter content-container content-miss dk-flex dk-flex-col dk-gap-2 dk-relative dk-z-10 dk-mb-5">
        <h1 className="dk-text-[#222] dk-font-semibold dk-text-4xl">
            {tourTypes?.Name}
        </h1> 
        <div className="rate">

        </div>
        {tourTypes ? (
          <div className="card-listing dk-flex dk-flex-wrap dk-gap-12 dk-justify-center dk-mt-8 dk-relative">

          </div>
        ) : null}
      </div>
    </LayoutDefault>
  );
}
