import React, { useEffect } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

export default changePass = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [showPassConfirm, setShowPassConfirm] = React.useState(false);
  const handleClickPassConfirm = () => setShow(!showPassConfirm);

  const [loginDetails, setLoginDetails] = React.useState({
    email: "",
    password: "",
    conpassword: "",
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const pushChanges = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/newpassword", {
        ...loginDetails,
      });
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
        <FormLabel>
          <Icon as={FaUserCircle} /> Email{" "}
        </FormLabel>

        <Input
          type="email"
          value={email}
          onchange={(e) => {
            handleChange(e);
          }}
        />
      </FormControl>

      <FormControl>
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

      <FormControl>
        <FormLabel>
          {" "}
          <Icon as={RiLockPasswordFill} /> Confirm Password{" "}
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
            value={loginDetails.conpassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickPassConfirm}>
              {showPassConfirm ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        onClick={() => {
          pushChanges();
        }}
      >
        Submit
      </Button>
    </>
  );
};
