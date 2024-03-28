import React, { useContext } from "react";
import Background from "./../assets/EduFlexBackground.jpg";
import { Box, Text, Center, Heading, Flex, Button } from "@chakra-ui/react";
import Theme from "./Theme";
import AboutUs from "./AboutUs";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { AppContext } from "../Context/ParentContext";

const Home = () => {
  return (
    <>
      <Box width="99vw">
        <Flex
          direction="column"
          justify="center"
          align="center"
          bgImage={`linear-gradient(0deg, #22033900 0.00%,#22033933 80.00%),linear-gradient(90deg, #22033966 0.00%,#22033900 30.00%),linear-gradient(90deg, #22033900 70.00%,#22033966 100.00%),linear-gradient(180deg, #22033900 30.00%,#220339 100.00%),url(${Background})`}
          width="100%"
          height="90vh"
          backgroundSize="cover"
          pt="12vw"
        >
          <Heading
            fontFamily={Theme.fonts.heading}
            color={Theme.colors.secondary[100]}
            fontSize="7vw"
          >
            EDUFLEX
          </Heading>
          <Text
            fontFamily={Theme.fonts.subHeading}
            color={Theme.colors.secondary[100]}
            fontSize="2.3vw"
            my="2vw"
          >
            Redefining online learning through AI
          </Text>
          <Link to={"/content"}>
            {" "}
            <Button
              height={["36px", "36px", "40px", "40px", "40px"]} // Reversed responsive height
              width={["140px", "140px", "160px", "160px", "160px"]} // Reversed responsive width
              color={Theme.colors.secondary[100]}
              backgroundColor={`${Theme.colors.primary[200]}90`}
              _hover={{ backgroundColor: Theme.colors.primary[200] }}
            >
              Try Now
            </Button>
          </Link>
        </Flex>
        <AboutUs />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
