import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import data from "../data/skills.json";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] mt-4">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        effect="fade"
        loop={true}
        className="w-full h-full rounded-2xl overflow-hidden"
      >
        {data.slice(0, 5).map((skill) => (
          <SwiperSlide key={skill.skillId}>
            <div className="relative w-full h-full">
              {/* Background image */}
              <img
                src={skill.image}
                alt={skill.title}
                className="w-full h-full object-cover brightness-75"
              />

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-6 md:px-16 text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <h2
                  className="text-3xl md:text-5xl font-bold mb-4"
                  data-aos="fade-up"
                >
                  {skill.title}
                </h2>
                <p
                  className="max-w-xl text-gray-200 mb-6"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {skill.description}
                </p>
                <Link
                  to={`/skills/${skill.skillId}`}
                  className="btn btn-primary"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {skill.subject}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
