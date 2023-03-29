import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Button,
  Link,
  Icon,
  Heading,
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { FaRebel } from "react-icons/fa";
import axios from "axios";

import NextLink from "next/link";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { HiOutlineLogin } from "react-icons/hi";
import { AiFillLinkedin } from "react-icons/ai";
import { MdImportContacts } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

const Mobilemenu = ({ auth, setA }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const btnRef = React.useRef();
  const [msg, setmsg] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        ...loginDetails,
      });
      if (res.status === 200) {
        setmsg(res.data.message);

        const token = {
          expirytime: new Date().getTime(),
          token: res.data.token,
        };
        localStorage.setItem("token", JSON.stringify(token));
        onClose();
        // router.push("/");
        setA(true);
      }
    } catch (e) {
      setmsg(e.response.data.message);
    }
  };

  return (
    <>
      <Button ref={btnRef} bg="grey" onClick={onOpen}>
        <Icon as={GiHamburgerMenu} />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Box
                borderBottomWidth="0.2px"
                borderBottomColor={"grey"}
                m="2"
                w="fit-content"
              >
                <Link
                  as={NextLink}
                  href="/"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <Heading as="h5" size={["sm", "lg"]} pb={["2", "0"]}>
                    Art & Rebellion <Icon as={FaRebel} />
                  </Heading>
                </Link>
              </Box>

              {/* About Us */}
              <Box
                mt={2}
                fontSize="1.5rem"
                textAlign={"center"}
                _hover={{ textDecoration: "none", color: "grey", w: "100%" }}
              >
                <Link
                  as={NextLink}
                  href="/about"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  textAlign="center"
                >
                  About Us <Icon as={MdImportContacts} />
                </Link>
              </Box>

              {/* auth stuff */}
              {!auth && (
                <Box
                  m={["2"]}
                  display={"flex"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Tabs>
                    <TabList>
                      <Tab>
                        <Heading color="grey" as="h4" size="sm">
                          Sign In
                        </Heading>
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <FormControl>
                          <FormLabel>
                            <Icon as={FaUserCircle} /> Username{" "}
                          </FormLabel>
                          <Input
                            ref={initialRef}
                            placeholder="Username"
                            name="username"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={loginDetails.username}
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
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                              >
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
                            _hover={{ bg: "#A7A7A7" }}
                          >
                            Login
                          </Button>

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
                        </Box>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              )}

              {auth && (
                <Button
                  m={1}
                  borderStyle={"solid"}
                  borderWidth={"1px"}
                  _hover={{ bg: "#A7A7A7" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    setmsg(null);
                    setA(false);
                  }}
                >
                  Sign Out
                </Button>
              )}

              {!auth && (
                <Button
                  m={1}
                  borderStyle={"solid"}
                  borderWidth={"1px"}
                  _hover={{ bg: "#A7A7A7" }}
                >
                  <Link
                    as={NextLink}
                    href="/forgotpassword"
                    _hover={{ textDecoration: "none" }}
                  >
                    Sign Up
                  </Link>
                </Button>
              )}

              {!auth && (
                <Button
                  onClick={onOpen}
                  ml={1}
                  borderStyle={"solid"}
                  borderWidth={"1px"}
                  _hover={{ bg: "#A7A7A7" }}
                  // bg="grey"
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
              )}

              {/* Socials */}
              <Box
                m={["2"]}
                display={"flex"}
                justifyContent="center"
                alignItems="center"
              >
                <Icon as={FiFacebook} m={3} />
                <Icon as={FiInstagram} m={3} />
                <Icon as={AiFillLinkedin} m={3} />
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Mobilemenu;
