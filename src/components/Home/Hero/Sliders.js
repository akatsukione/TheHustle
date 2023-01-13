import React from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";

const Sliders = () => {
  return (
    <div className="text-white">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={true}
        navigation={true}
        modules={[Navigation]}
        loop
      >
        <SwiperSlide>
          <Item />
        </SwiperSlide>
        <SwiperSlide>
          <Item />
        </SwiperSlide>
        <SwiperSlide>
          <Item />
        </SwiperSlide>
        <SwiperSlide>
          <Item />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Sliders;
