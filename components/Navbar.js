import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { HiOutlineLogin } from "react-icons/hi";
import { AiFillLinkedin } from "react-icons/ai";
import { MdImportContacts } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRebel } from "react-icons/fa";
import {
  Button,
  Heading,
  Icon,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Mobilemenu from "./Mobilemenu";
import axios from "axios";

const Navbar = ({ authenticated, setAuth }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [msg, setmsg] = React.useState(null);

  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };
  // "https://phpstack-831532-3878171.cloudwaysapps.com/auth/login/doctor",
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://phpstack-831532-3878171.cloudwaysapps.com/auth/login/doctor",
        {
          ...loginDetails,
        }
      );
      if (res.status === 200) {
        setmsg(res.data.message);

        const token = {
          expirytime: new Date().getTime(),
          token: res.data.token,
        };
        localStorage.setItem("token", JSON.stringify(token));
        onClose();
        router.push("/");
        setAuth(true);
        console.log(res.data);
      }
    } catch (e) {
      console.log(e.response);
      setmsg(e.response.data.message);
    }
  };

  return (
    <Box display={"flex"} justifyContent="space-between" boxShadow="md" p="2">
      {/* Heading */}
      <Box
        boxShadow={"sm"}
        w="fit-content"
        borderBottomWidth="1px"
        borderBottomColor={"grey"}
      >
        <Link
          as={NextLink}
          href="/"
          textDecoration="none"
          _hover={{ textDecoration: "none", color: "grey" }}
        >
          <Heading as="h6" size={["sm", "lg"]}>
            Art & Rebellion <Icon as={FaRebel} />
          </Heading>
        </Link>
      </Box>

      {/* About us */}

      <Box mt={2} display={["none", "none", "block"]}>
        <Link
          as={NextLink}
          href="/about"
          textDecoration="none"
          _hover={{ textDecoration: "none", color: "grey" }}
          fontSize="1.3rem"
        >
          About Us <Icon as={MdImportContacts} />
        </Link>
      </Box>

      {/* Socials */}

      <Box mt={["2"]} display={["none", "none", "block"]}>
        <Icon as={FiFacebook} m={2} />
        <Icon as={FiInstagram} m={2} />
        <Icon as={AiFillLinkedin} m={2} />
      </Box>

      {/*Auth stuff  */}
      <Box display={["none", "none", "block"]}>
        {!authenticated && (
          <Button
            onClick={onOpen}
            m={1}
            borderStyle={"solid"}
            borderWidth={"1px"}
            _hover={{ bg: "#A7A7A7" }}
          >
            Sign In
          </Button>
        )}

        {authenticated && (
          <Button
            m={1}
            borderStyle={"solid"}
            borderWidth={"1px"}
            _hover={{ bg: "#A7A7A7" }}
            onClick={() => {
              localStorage.removeItem("token");
              setAuth(false);
            }}
          >
            Sign Out
          </Button>
        )}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {msg && (
                <Text
                  textAlign={"center"}
                  mt="4"
                  w="100%"
                  fontSize={["1rem"]}
                  // bg="#A7A7A7"
                >
                  {msg}
                </Text>
              )}
              <Icon as={HiOutlineLogin} /> Login
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>
                  <Icon as={FaUserCircle} /> Username{" "}
                </FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Username"
                  name="username"
                  value={loginDetails.username}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>
                  {" "}
                  <Icon as={RiLockPasswordFill} /> Password{" "}
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
                    value={loginDetails.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Box mt={3}>
                <Button
                  onClick={() => {
                    handleLogin();
                  }}
                  bg="grey"
                >
                  Login
                </Button>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Text> Do not have an account?</Text>
              <Button
                onClick={onOpen}
                ml={1}
                borderStyle={"solid"}
                borderWidth={"1px"}
                bg="grey"
              >
                {" "}
                <Link
                  as={NextLink}
                  href="/signup"
                  _hover={{ textDecoration: "none" }}
                >
                  Sign up
                </Link>
              </Button>

              <Button
                onClick={onOpen}
                ml={1}
                borderStyle={"solid"}
                borderWidth={"1px"}
                bg="grey"
              >
                {" "}
                <Link
                  as={NextLink}
                  href="/forgotpassword"
                  _hover={{ textDecoration: "none" }}
                >
                  Forgot Password
                </Link>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      {/* End of auth stuff */}

      {/* Mobile Menu */}
      <Box display={["block", "block", "none"]}>
        <Mobilemenu auth={authenticated} setA={setAuth} />
      </Box>
    </Box>
  );
};

export default Navbar;
