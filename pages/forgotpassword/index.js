import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export default ForgotPassword = () => {
  const [email, setEmail] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/forgotpasscheck",
        {
          email,
        }
      );
    } catch (e) {
      console.log(e.response);
      setmsg(e.response.data.message);
    }
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
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onchange={(e) => {
            handleChange(e);
          }}
        />
        <Button onClick={handleClick}>Submit</Button>
      </FormControl>
    </>
  );
};
