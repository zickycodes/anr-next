import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Addpost from "@/components/addpost";
import ImageSlider from "@/components/ImageSlider";
import { Text } from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const [authenticated, setauthenticated] = useState(false);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      let currentTime = new Date().getTime();
      let timeDifference = currentTime - token.expirytime;
      let oneHour = 3600 * 1000;
      if (timeDifference > oneHour) {
        localStorage.removeItem("token");
        setauthenticated(false);
      } else {
        setauthenticated(true);
      }
    } else {
      setauthenticated(false);
    }
  }, [authenticated]);

  // useEffect(() => {
  //   async function fetchLocation() {
  //     const response = await axios.get(
  //       "https://get.geojs.io/v1/ip/country.json"
  //     );
  //     const { name } = response.data;

  //     setCountry(name);
  //   }

  //   fetchLocation();
  // }, []);

  const setAuth = (val) => {
    setauthenticated(val);
  };

  return (
    <>
      <Head>
        <title>Art & Rebellion</title>
        <meta
          name="description"
          content="Home where art is the air we breathe"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar authenticated={authenticated} setAuth={setAuth} />

      <ImageSlider />
      {authenticated && <Addpost />}
      <Text>{country} ihof</Text>
    </>
  );
}
