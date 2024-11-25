import React, { useState } from "react";
import { offers } from "../utils/offers";
import OfferCard from "../components/Cards/OfferCard";
import { Breadcrumb, Cta2 } from "./../components/index";
import { offer, offer1, offer2, offer3 } from "../assets/imges/images";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const Offers = () => {
  const images = [{src: offer},{src: offer1},{src: offer2},{src: offer3},];
  const [isOpen,setIsOpen]=useState(false);

  return (
    <>
      <Breadcrumb pageName={"Offers"} />
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-pink-50 ">
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            img={offer.img}
            title={offer.title}
            nights={offer.nights}
            price={offer.price}
            slug={offer.slug}
            isOffer={offer.isOffer}
            onClick={()=>setIsOpen(true)}
          />
        ))}
        <Lightbox
          open={isOpen}
          close={()=>setIsOpen(false)}
          slides={images}
        />
      </div>
      <Cta2 />
    </>
  );
};

export default Offers;
