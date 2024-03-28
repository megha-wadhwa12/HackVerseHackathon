import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  Link,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Theme from "./Theme";
import Background from "./../assets/EduFlexBackground.jpg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "../Context/ParentContext";
import Logo from "./../assets/EduFlexLogo.png";

const Login = () => {
  const Navigate = useNavigate();
  const { login, setLogin, errorMessage, setErrorMessage, setCookies } =
    useContext(AppContext);
  const [data, setData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();
  const FormSubmitHandler = (formData) => {
    setData(formData);
    trigger();
    ErrorToastHandler();
    PostRequest(formData);
  };

  const PostRequest = async (data) => {
    try {
      setIsLoading(true)
      console.log("data", data);
      const res = await axios.post(
        "https://eduflex-dieh.onrender.com/api/Users/login",
        {
          ...data,
        }
      );
      console.log("res", res);
      setLogin(true);
      setIsLoading(false)
      setErrorMessage("")
      SuccessToastHandler();

      setCookies("UserName", res.data.user.UserName, 30);
      setCookies("Password", res.data.user.Password, 30);
      setCookies("Name", res.data.user.Name, 30);
    } catch (error) {
      setIsLoading(false)
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const SuccessToastHandler = () => {
    toast.success("Logged In Successfully", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      Navigate("/");
    }, 5000);
  };
  const ErrorToastHandler = () => {
    if (isSubmitted && !isSubmitSuccessful) {
      for (const errorKey in errors) {
        const errorMessage = errors[errorKey]?.message;
        if (errorMessage) {
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
  };

  useEffect(() => {
    ErrorToastHandler();
  }, [isSubmitted]);
  return (
    <Box>
      <ToastContainer />
      <Navbar />
      <Box
        backgroundImage={Background}
        backgroundSize={"cover"}
        width={"100vw"}
        height={"100vh"}
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Flex
            borderRadius={12}
            width={"30vw"}
            height={"27vw"}
            backgroundColor={`${Theme.colors.primary[300]}90`}
            flexDir={"column"}
            p={"3vw"}
            mt={"10vw"}
          >
            <Image
              src={Logo}
              alt="logo"
              width={"170px"}
              height={"40px"}
              mb={"30px"}
              alignSelf={"center"}
            />

            <form onSubmit={handleSubmit(FormSubmitHandler)}>
              <FormControl>
                <FormControl isInvalid={errors.UserName} height={70}>
                  <Input
                    focusBorderColor={Theme.colors.primary[100]}
                    variant="flushed"
                    placeholder="Username"
                    mb={"0.1vw"}
                    type="text"
                    color={"#ffffff90"}
                    {...register("UserName", {
                      required: "Enter your UserName",
                      minLength: {
                        value: 4,
                        message: "Minimum 4 characters required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters allowed",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.UserName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.Password} height={70}>
                  <Input
                    focusBorderColor={Theme.colors.primary[100]}
                    variant="flushed"
                    placeholder="Password"
                    mb={"0.1vw"}
                    type="password"
                    color={"#ffffff90"}
                    {...register("Password", {
                      required: "Enter your Password",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters required",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Invalid Password",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.Password?.message}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent={"center"} gap={3} flexDir={"column"}>
                  <Flex
                    justifyContent={"center"}
                    color={Theme.colors.primary[300]}
                  >
                    {errorMessage && <Center color={'red'}>{errorMessage}</Center>}
                  </Flex>
                  <Button
                    isLoading={isLoading}
                    // onClick={()=>{
                    //   setIsLoading(true);
                    //   if(login){
                    //     setIsLoading(false)
                    //   }
                    // }}
                    bgColor={Theme.colors.primary[100]}
                    color={"white"}
                    borderRadius={4}
                    mt={2}
                    px={8}
                    py={5}
                    fontSize={12}
                    mx={"auto"}
                    type="submit"
                  >
                    LOGIN
                  </Button>
                </Flex>
                <Flex justifyContent={"center"} gap={2} mt={5}>
                  <Center color={Theme.colors.secondary[100]}>
                    Don't have an account?
                  </Center>
                  <Link href={"/signup"} color={Theme.colors.primary[200]}>
                    Sign up
                  </Link>
                </Flex>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;
