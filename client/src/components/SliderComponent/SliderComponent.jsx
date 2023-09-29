import React from "react";
import Slider from "react-slick";
import "./style.scss";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        {arrImages.map((img) => (
          <img src={img} key={img} alt="slider" />
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
