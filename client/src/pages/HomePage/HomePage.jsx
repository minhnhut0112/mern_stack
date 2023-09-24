import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/image/slider1.jpg";
import slider2 from "../../assets/image/slider2.jpg";
import slider3 from "../../assets/image/slider3.jpg";
import "./styles.scss";
import CardComponent from "../../components/CardComponent/CardComponent";

const HomePage = () => {
  return (
    <div className="homepage">
      <SliderComponent arrImages={[slider1, slider2, slider3]} />
      <h1 className="homepage__title">New & Feature</h1>
      <div className="homepage__card">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
      <div className="homepage__button">
        <button>load</button>
      </div>
    </div>
  );
};

export default HomePage;
