import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Img,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import React, { useContext, useLayoutEffect, useState } from "react";
import Logo from "./../assets/EduFlexLogo.png";
import Theme from "./Theme";
import { AppContext } from "../Context/ParentContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const { login, setLogin, setCookies, getCookie, aboutRef, footerRef } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCookie = (name) => {
    setCookies(name, null, null);
  };

  useLayoutEffect(() => {
    if (getCookie("UserName")) {
      setLogin(true);
    }
  }, []);

  return (
    <Center display={["none", "flex"]} w={"99vw"}>
      <Flex
        backdropFilter={"auto"}
        zIndex={10}
        backdropBlur={"5px"}
        pos={"fixed"}
        w={"98%"}
        h={[null, "5vw", null, "4.4vw"]}
        bgColor={"#220339e6"}
        top={"1vw"}
        borderRadius={"5vh"}
        align={"center"}
        px={"3vw"}
        border={"3px solid #22033960"}
        filter={"drop-shadow(0 0.5vw 0.3vw #00000040 )"}
      >
        <Box
          w={"33%"}
          _hover={{
            filter: "drop-shadow(0 0 0.5vw #01EAF980)",
          }}
          transition={"all 0.2s"}
        >
          <Link to={"/"}>
            <Img src={Logo} maxH={"3vw"} />
          </Link>
        </Box>
        <Flex w={"33%"} justify={"space-between"}>
          <Link to={"/"}>
            <Button
              variant={"link"}
              fontSize={"1.3vw"}
              color={"white"}
              h={[null, "5vw", null, "4.4vw"]}
              _hover={{
                filter: "drop-shadow(0 0 0.2vw #ffffff90)",
              }}
              transition={"all 0.2s"}
            >
              Home
            </Button>
          </Link>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.2vw #ffffff90)",
            }}
            transition={"all 0.2s"}
            onClick={() => {
              if (footerRef.current) {
                footerRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Contact Us
          </Button>
          <Center>
            <Divider orientation="vertical" opacity={"0.1"} h={"2.2vw"} />
          </Center>
          <Button
            variant={"link"}
            fontSize={"1.3vw"}
            color={"white"}
            h={[null, "5vw", null, "4.4vw"]}
            _hover={{
              filter: "drop-shadow(0 0 0.2vw #ffffff90)",
            }}
            transition={"all 0.2s"}
            onClick={() => {
              if (aboutRef.current) {
                aboutRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            About
          </Button>
        </Flex>
        <Flex w={"33%"} justify={"end"}>
          <Link to={"/login"}>
            <Button
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);
                if (login) {
                  setLogin(false);
                  deleteCookie("UserName");
                  deleteCookie("Password");
                  deleteCookie("Name");
                } else {
                  navigate("/login");
                }
                setTimeout(() => {
                  setIsLoading(false);
                }, 2000);
              }}
              borderRadius={"1.4vw"}
              h={"3vw"}
              w={"7vw"}
              fontSize={"1.2vw"}
              bgColor={`${Theme.colors.primary[200]}40`}
              _hover={{ backgroundColor: Theme.colors.primary[200] }}
              color={"white"}
            >
              {login ? "LOGOUT" : "LOGIN"}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Center>
  );
};

export default Navbar;
