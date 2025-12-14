import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import Theme from "./Theme";
import { AppContext } from "../Context/ParentContext";

const AboutUs = () => {
  const { aboutRef } = useContext(AppContext);

  return (
    <Center ref={aboutRef} w="100%">
      <Flex
        my={["5vw", "5vw", "5vw", "3vw", "3vw"]} // Responsive margin top
        direction="column"
        align="center"
        px={["5vw", "5vw", "5vw", "3vw", "3vw"]} // Responsive padding X
      >
        <Heading
          size={["xl", "2xl", "2xl", "xl", "2xl"]}
          color={Theme.colors.secondary[100]}
        >
          About Us
        </Heading>
        <Text
          color={Theme.colors.secondary[100]}
          mt={["3vw", "3vw", "3vw", "2vw", "2vw"]} // Responsive margin top
          textAlign="center"
          w={["80vw", "85vw", "90vw", "95vw", "95vw"]} // Responsive width
        >
          CodeGen is a transformative platform revolutionizing the coding
          experience through the seamless integration of AI technologies. With
          an AI-powered chatbot for efficient navigation, a code debugger
          capable of swiftly identifying and resolving errors, and an
          educational topic searcher providing comprehensive insights, CodeGen
          offers a comprehensive toolkit for both novice and experienced
          programmers alike.
          <br />
          <br />
          Furthermore, CodeGen's commitment to community involvement is evident
          through its open invitation for contributions. By following
          straightforward contribution guidelines, users can actively
          participate in refining the platform, making it more robust and
          beneficial for all. With its innovative approach and dedication to
          user empowerment, CodeGen stands at the forefront of transforming
          coding practices and paving the way for a more efficient and effective
          coding landscape.
        </Text>
      </Flex>
    </Center>
  );
};

export default AboutUs;
