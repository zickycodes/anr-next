import {
  Box,
  Textarea,
  Text,
  ModalOverlay,
  ModalContent,
  Input,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const Addpost = () => {
  const [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <Box maxW={"960px"} m={"5px auto"}>
      <Text mt="4" ml="2" mr="2">
        Write your post:
      </Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Write your post"
        size="sm"
        m="2"
      />
      <Input type="file" name="postPic" m="2" p="1.35" />
    </Box>
  );
};

export default Addpost;
