import { Flex, Heading, Text, Image, Box, Icon } from "@chakra-ui/react"; // Importing Chakra UI components
import React, { useContext } from "react";
import Theme from "./Theme"; // Importing custom theme
import FaceBook from "./../assets/FacebookCircled.png"; // Importing Facebook icon
import Instagram from "./../assets/InstagramIcon.png"; // Importing Instagram icon // Importing Google Plus icon
import Twitter from "./../assets/TwitterCircled.png"; // Importing Twitter icon // Importing YouTube icon
import Phone from "./../assets/TelephoneReceiver.png"; // Importing phone icon
import GmailIcon from "./../assets/GmailIcon.png"; // Importing Gmail icon
import { RiCopyrightLine } from "react-icons/ri";
import { AppContext } from "../Context/ParentContext";
// import CopyrightIcon from "./../assets/CopyrightIcon.png"; // Importing copyright icon

const Footer = () => {
  const {footerRef} = useContext(AppContext)
  return (
    <Box ref={footerRef} pb={10}>
      {/* Footer section */}
      <Flex
        backgroundColor={`${Theme.colors.secondary[100]}20`}
        color={Theme.colors.secondary[100]}
        px={10}
        pt={"70px"}
        textAlign={"left"} // Align text to left
        fontSize={"16px"}
        gap={"140px"}
        width={'90vw'}
        m={'0 auto'}
        borderRadius={20}
        justifyContent={"center"}
        // pb={20}
      >
        {/* Section: More About Edu Flex */}
        <Flex flexDirection="column">
          <Heading size={"md"} mb={5}>
            More About Edu Flex
          </Heading>
          <Text width={290}>
          EduFlex is an innovative e-learning platform designed to revolutionize online learning experiences by prioritizing user engagement and offering personalized learning paths. Powered by AI-based technologies, EduFlex enables users to learn any topic of their choice through interactive content and quizzes.
          </Text>
        </Flex>
        {/* Section: Stay Connected */}
        <Flex flexDirection="column">
          <Heading
            size={"md"}
            mb={5}
            textAlign={"center"}
          >
            Stay Connected
          </Heading>
          <Flex direction={"column"} gap={5}>
            {/* Social media links */}
            <Flex alignItems={"center"} gap={6}>
              <Image src={FaceBook} width={"30px"} height={"30px"} />
              <Text>Facebook</Text>
            </Flex>
            <Flex alignItems={"center"}  gap={6}>
              <Image src={Instagram} width={"25px"} height={"25px"} />
              <Text>Instagram</Text>
            </Flex>
            <Flex alignItems={"center"} gap={6}>
              <Image src={Twitter} width={"30px"} height={"30px"} />
              <Text>Twitter</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* Section: Contact Information */}
        <Flex flexDirection="column" gap={6}>
          <Heading size={"md"} mb={5}>
            Contact Information
          </Heading>
          <Flex gap={6}>
            {/* Phone contact */}
            <Image src={Phone} width={"25px"} height={"25px"} />
            <Text>Contact Us</Text>
          </Flex>
          <Flex gap={6} cursor={'pointer'} onClick={()=>{
            window.location.href = "mailto:meghawadhwa20@gmail.com"
          }}>
            {/* Gmail contact */}
            <Image src={GmailIcon} width={"25px"} height={"25px"} />
            <Text>meghawadhwa20@gmail.com</Text>
          </Flex>
          <Flex gap={6} cursor={"pointer"} onClick={()=>{
            window.location.href = "mailto:sp577152@gmail.com"
          }}>
            {/* Gmail contact */}
            <Image src={GmailIcon} width={"25px"} height={"25px"} />
            <Text>sp577152@gmail.com</Text>
          </Flex>
          {/* Copyright */}
          <Flex gap={0} mt={250} mb={5} align={'center'}>
            {/* <Image src={CopyrightIcon} width={3} /> */}
              <Icon as={RiCopyrightLine} mr={1}/>
              
            <Text fontSize={12}>
              2024 Edu Flex. All rights are reserved | Designed by Megha
              Wadhwa & S P Jyotiranjan Sahoo
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;