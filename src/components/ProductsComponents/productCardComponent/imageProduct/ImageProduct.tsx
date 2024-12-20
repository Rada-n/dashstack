import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import styles from "./ImageProduct.module.css";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import Arrow from "../../../../assets/products/Arrow.svg";

const ImageProduct: React.FC<{ image: string }> = ({ image }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        slidesPerGroup={2}
        centeredSlides={true}
      >
        <SwiperSlide>
          <div className={styles.imageContainer}>
            <img src={`/productImg/${image}`} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.imageContainer}>
            <img src={`/productImg/${image}`} />
          </div>
        </SwiperSlide>
      </Swiper>
      <button ref={prevRef} className={styles.prevButton}>
        {" "}
        <img src={Arrow} />
      </button>
      <button ref={nextRef} className={styles.nexButton}>
        <img src={Arrow} />
      </button>
    </div>
  );
};

export default ImageProduct;
