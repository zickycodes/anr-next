import React from "react";
import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 9000,
  cssEase: "linear",
};

const ImageSlider = () => {
  return (
    <Box maxW={"960px"} m="4px auto">
      <Slider {...settings}>
        <Box w="400px" height={"400px"} bg="black">
          <Image
            h="100%"
            w="full"
            src="/anrforto.jpg"
            alt="Dan Abramov"
            objectFit={"contain"}
          />
        </Box>
        <Box w="400px" height={"400px"} bg="gray.100">
          <Image
            h="full"
            w="full"
            src="/anrforto1.jpg"
            alt="Dan Abramov"
            objectFit={"contain"}
          />
        </Box>
      </Slider>
    </Box>
  );
};

export default ImageSlider;
