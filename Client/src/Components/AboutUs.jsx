import { Center, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import Theme from "./Theme";
import { AppContext } from "../Context/ParentContext";

const AboutUs = () => {
    const {aboutRef} = useContext(AppContext)
  return (
    <Center ref={aboutRef} w={'100vw'}>
        <Flex my={'5vw'} direction={'column'} align={"center"}>
          <Heading size={'3xl'} color={Theme.colors.secondary[100]}>About Us</Heading>
          <Text color={Theme.colors.secondary[100]} mt={'3vw'} textAlign={'center'} w={'80vw'}>
            At EduFlex, we are passionate about redefining the landscape of online
            learning. Our platform is not just another e-learning solution; it's a
            revolution in education technology. With a steadfast commitment to user
            engagement and personalized learning, we strive to empower learners of
            all backgrounds to reach their full potential. Powered by cutting-edge
            AI algorithms, EduFlex offers a dynamic and interactive learning
            environment that adapts to each user's unique preferences and learning
            style. Whether you're a student eager to explore new subjects or a
            professional seeking to enhance your skills, EduFlex provides the tools
            and resources to help you succeed.
            <br /><br />
            At the heart of EduFlex lies a
            dedication to fostering active learning experiences. Our AI-driven
            content and quizzes provide targeted feedback, encouraging learners to
            engage with the material in meaningful ways. Furthermore, our gamified
            approach, complete with leaderboards, adds an element of excitement and
            healthy competition to the learning process. We believe that learning
            should be enjoyable, and at EduFlex, we're committed to making it a
            rewarding and enriching journey. Join us as we redefine online learning
            and unlock the full potential of education for learners around the
            globe.
          </Text>
        </Flex>
    </Center>
  );
};

export default AboutUs;
