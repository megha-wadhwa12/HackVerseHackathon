import React, { useContext } from "react";
import { Box, Flex, Heading, Text, Image, Icon } from "@chakra-ui/react";
import Theme from "./Theme";
import FaceBook from "./../assets/FacebookCircled.png";
import Instagram from "./../assets/InstagramIcon.png";
import Twitter from "./../assets/TwitterCircled.png";
import Phone from "./../assets/TelephoneReceiver.png";
import GmailIcon from "./../assets/GmailIcon.png";
import { RiCopyrightLine } from "react-icons/ri";
import { AppContext } from "../Context/ParentContext";

const Footer = () => {
  const { footerRef } = useContext(AppContext);

  return (
    <Box ref={footerRef} pb={10}>
      <Flex
        backgroundColor={`${Theme.colors.secondary[100]}20`}
        color={Theme.colors.secondary[100]}
        px={[4, 6, 8, 10]} // Responsive padding
        pt={[8, 12, 16, "70px"]} // Responsive padding
        textAlign={"left"}
        fontSize={["14px", "16px", "18px", "14px", "14px"]} // Responsive font size
        gap={[6, 8, 10, 10]} // Responsive gap between sections
        width={["90%", "90%", "80%", "95%", "95%"]} // Responsive width
        m="0 auto" // Center align horizontally
        borderRadius={20}
        justifyContent="center"
        flexWrap="wrap" // Wrap content to new line on smaller screens
      >
        {/* Section: More About Edu Flex */}
        <Flex flexDirection="column" flex="1" mb={[6, 6, 6, 0]}>
          <Heading size="md" mb={5}>
            More About Code Gen
          </Heading>
          <Text width={["100%", "100%", "100%", 290]}>
            {" "}
            {/* Responsive text width */}
            CodeGen is a transformative platform revolutionizing the coding
            experience through the seamless integration of AI technologies. With
            an AI-powered chatbot for efficient navigation, a code debugger
            capable of swiftly identifying and resolving errors, and an
            educational topic searcher providing comprehensive insights, CodeGen
            offers a comprehensive toolkit for both novice and experienced
            programmers alike.{" "}
          </Text>
        </Flex>

        {/* Section: Stay Connected */}
        <Flex flexDirection="column" flex="1" mb={[6, 6, 6, 0]}>
          <Heading size="md" mb={5} textAlign="center">
            Stay Connected
          </Heading>
          <Flex direction="column" gap={5} alignItems="center">
            {/* Social media links */}
            <Flex alignItems="center" gap={6}>
              <Image src={FaceBook} width={"30px"} height={"30px"} />
              <Text>Facebook</Text>
            </Flex>
            <Flex alignItems="center" gap={6}>
              <Image src={Instagram} width={"25px"} height={"25px"} />
              <Text>Instagram</Text>
            </Flex>
            <Flex alignItems="center" gap={6}>
              <Image src={Twitter} width={"30px"} height={"30px"} />
              <Text>Twitter</Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Section: Contact Information */}
        <Flex flexDirection="column" flex="1" gap={6}>
          <Heading size="md" mb={5}>
            Contact Information
          </Heading>
          <Flex gap={6} alignItems="center">
            {/* Phone contact */}
            <Image src={Phone} width={"25px"} height={"25px"} />
            <Text>Contact Us</Text>
          </Flex>
          <Flex
            gap={6}
            alignItems="center"
            cursor="pointer"
            onClick={() => {
              window.location.href = "mailto:meghawadhwa20@gmail.com";
            }}
          >
            {/* Gmail contact */}
            <Image src={GmailIcon} width={"25px"} height={"25px"} />
            <Text>meghawadhwa20@gmail.com</Text>
          </Flex>
          <Flex
            gap={6}
            alignItems="center"
            cursor="pointer"
            onClick={() => {
              window.location.href = "mailto:sp577152@gmail.com";
            }}
          >
            {/* Gmail contact */}
            <Image src={GmailIcon} width={"25px"} height={"25px"} />
            <Text>sp577152@gmail.com</Text>
          </Flex>

          {/* Copyright */}
          <Flex gap={0} mt={12} mb={5} align="center">
            <Icon as={RiCopyrightLine} mr={1} />
            <Text
              fontSize={["10px", "10px", "12px", "10px"]}
              w={["210px", "310px", "410px"]}
            >
              2024 Code Gen. All rights are reserved | Designed by WebWizards
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
