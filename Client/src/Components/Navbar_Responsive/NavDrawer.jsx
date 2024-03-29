import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Img,
  VStack,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "./../../assets/CodeGen.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/ParentContext";
import Theme from "../Theme";

const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { login, setLogin, setCookies, getCookie,aboutRef,footerRef }  = useContext(AppContext);
  const navigate = useNavigate(null)
  const btnRef = useRef();
  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
      <Button ref={btnRef} color="white" onClick={onOpen} variant={"link"}>
        <HamburgerIcon boxSize={7} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={"#220339e6"}>
          <DrawerCloseButton color={"white"} />
          <DrawerHeader>
            <Img src={Logo} maxH={"8vw"} />
          </DrawerHeader>
          <DrawerBody mt={"5vw"}>
            <VStack align={"start"}>
            <Link to={"/"}>
              <Button
                variant={"link"}
                fontSize={"5vw"}
                color={"white"}
                h={[null, "5vw", null, "4.4vw"]}
                _hover={{
                  filter: "drop-shadow(0 0 0.2vw #ffffff90)",
                }}
                transition={"all 0.2s"}
                onClick={onClose}
              >
                Home
              </Button>
              </Link>
              <Button
                variant={"link"}
                fontSize={"5vw"}
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
                  onClose();
                }}
              >
                Contact Us
              </Button>
              <Button
                variant={"link"}
                fontSize={"5vw"}
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
                  onClose();
                }}
              >
                About
              </Button>
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
                onClose()
              }}
              borderRadius={"5vw"}
              h={"10vw"}
              w={"30vw"}
              fontSize={"5vw"}
              bgColor={`${Theme.colors.primary[200]}40`}
              _hover={{ backgroundColor: Theme.colors.primary[200] }}
              color={"white"}
            >
              {login ? "LOGOUT" : "LOGIN"}
            </Button>
          </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
