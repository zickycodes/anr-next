import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Heading,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FaUserCircle, FaRebel } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const [msg, setmsg] = React.useState(null);

  const [signUpDetails, setSignUpDetails] = React.useState({
    username: "",
    email: "",
    password: "",
    conpassword: "",
  });

  const handleChange = (e) => {
    setSignUpDetails({
      ...signUpDetails,
      [e.target.name]: e.target.value,
    });
  };

  const postSignupDetails = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        ...signUpDetails,
        userole: "admin",
      });

      if (res.status === 200) {
        setmsg(res.data.message);
        setTimeout(() => {
          router.push("/");
        }, 15000);
      }
    } catch (e) {
      console.log(e.response);
      setmsg(e.response.data.message);
      console.log(e.response);
    }
  };

  const handleSignUp = () => {
    console.log(signUpDetails);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/i;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    console.log(passwordRegex.test(signUpDetails.password));

    if (!emailRegex.test(signUpDetails.email)) {
      setmsg("Enter a valid email");
    } else if (!passwordRegex.test(signUpDetails.password)) {
      setmsg("Password must contain uppercase, lowercase, number & 6+ chars");
    } else if (signUpDetails.password !== signUpDetails.conpassword) {
      setmsg("Passwords do not match");
    } else {
      setmsg(null);
    }

    postSignupDetails();
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

      <Box maxW="960px" m="2rem auto">
        <Box
          w={["100%", "60%"]}
          m={["3rem auto", "5rem auto"]}
          p="2rem"
          boxShadow="xl"
        >
          <Heading as="h3" size="md" textAlign={"center"} mt="1rem">
            {" "}
            Sign Up To Art And Rebellion <Icon as={FaRebel} />
          </Heading>
          {msg && (
            <Text
              textAlign={"center"}
              m="2"
              w="100%"
              border={"1px solid #A7A7A7"}
              fontSize={["1rem"]}
              bg="#A7A7A7"
            >
              {msg}
            </Text>
          )}
          <FormControl mt="1rem">
            <FormLabel>
              <Icon as={FaUserCircle} /> Email{" "}
            </FormLabel>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
              value={signUpDetails.email}
            />
          </FormControl>
          <FormControl mt="1rem">
            <FormLabel>
              <Icon as={FaUserCircle} /> Username{" "}
            </FormLabel>
            <Input
              placeholder="Username"
              type="text"
              name="username"
              onChange={(e) => {
                handleChange(e);
              }}
              value={signUpDetails.username}
            />
          </FormControl>
          <FormControl mt="1rem">
            <FormLabel>
              <Icon as={FaUserCircle} /> Password{" "}
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={signUpDetails.password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl mt="1rem">
            <FormLabel>
              {" "}
              <Icon as={RiLockPasswordFill} /> Confirm Password{" "}
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showConfirm ? "text" : "password"}
                placeholder="Enter password"
                name="conpassword"
                onChange={(e) => {
                  handleChange(e);
                }}
                value={signUpDetails.conpassword}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
                  {showConfirm ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <br />
          <Button
            mt={1}
            borderStyle={"solid"}
            borderWidth={"1px"}
            w="100%"
            bg="#626262"
            _hover={{ bg: "#A7A7A7" }}
            onClick={() => {
              handleSignUp();
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
}
