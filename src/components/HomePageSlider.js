import React from "react";
import Slider from "react-slick";
import styled from '@emotion/styled';
import img1 from '../assets/img/house/main-bg-1.jpeg';
import img2 from '../assets/img/house/main-bg-2.jpeg';
import img3 from '../assets/img/house/main-bg-3.jpeg';
import img4 from '../assets/img/house/main-bg-4.jpeg';

const Background1 = styled.div`
  background-image: url(${img1});
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Background2 = styled.div`
  background-image: url(${img2});
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Background3 = styled.div`
  background-image: url(${img3});
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Background4 = styled.div`
  background-image: url(${img4});
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;



const HomePageSlider = () => {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
      <Background1 />
      <Background2 />
      <Background3 />
      <Background4 />
    </Slider>
  );
};

export default HomePageSlider;