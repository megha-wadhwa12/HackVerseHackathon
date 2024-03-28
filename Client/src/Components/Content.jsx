import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useContext, useEffect, useState } from "react";
import SubTopicDetail from "./SubTopicDetail";
import {
  Box,
  Center,
  Flex,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Text,
  Heading,
} from "@chakra-ui/react";
import Theme from "./Theme";
import Background from "./../assets/EduFlexBackground.jpg";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { AppContext } from "../Context/ParentContext";

const Content = () => {
  const [subTopics, setSubTopics] = useState([]);
  const [value, setValue] = useState("");
  const { login } = useContext(AppContext);
  const [fetched, setFetched] = useState(true);
  const [contentFetched, setContentFetched] = useState(true);
  const [content, setContent] = useState("");
  const navigate = useNavigate(null);
  const gemini_key = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(gemini_key);
  useLayoutEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, []);
  function removeAsterisks(str) {
    return str.replace(/\*/g, ""); // Using regular expression to replace all asterisks with an empty string
  }
  async function subtopic(topic) {
    try {
      setFetched(false);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are making a learning content for a topic. Give 10 subtopic about the topic. only give subtopics, don't include decalration of response`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "Ok, Please give me a topic" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 10000,
          temperature: 0.9,
          topK: 1,
          topP: 1,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });
      const res = await chat.sendMessage(topic);
      const text = res.response.text();
      const withoutAsterisks = removeAsterisks(text);
      let textArray = withoutAsterisks.split("\n");
      textArray = textArray.filter((item) => item !== "");
      textArray.shift();
      const UpdatedtextArray = textArray.map((e) => {
        return e.split(".").slice(1).join(".").trim();
      });
      setSubTopics(UpdatedtextArray);
      setFetched(true);
      // setSubTopicFetched(true)
    } catch (error) {
      console.log(error);
      subtopic(topic);
    }
  }
  async function genDescription(topic) {
    try {
      setContentFetched(false);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are making a learning content for a topic. Give 300 words description about the topic. only give description, don't include decalration of response`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: "Ok, Please give me a topic" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 10000,
          temperature: 0.9,
          topK: 1,
          topP: 1,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });
      const res = await chat.sendMessage(topic);
      const text = res.response.text();
      const withoutAsterisks = removeAsterisks(text);

      setContent(withoutAsterisks);
      setContentFetched(true);
    } catch (error) {
      console.log(error);
      genDescription(topic);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    subtopic(value);
    genDescription(value);
  };
  console.log(subTopics);
  console.log(gemini_key);
  return (
    <Box background={Theme.colors.primary[100]} width="99vw" minH={"100vh"}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        bgImage={`linear-gradient(0deg, #22033900 0.00%,#22033933 80.00%),linear-gradient(90deg, #22033966 0.00%,#22033900 30.00%),linear-gradient(90deg, #22033900 70.00%,#22033966 100.00%),linear-gradient(180deg, #22033900 30.00%,#220339 100.00%),url(${Background})`}
        width="100%"
        height="50vh"
        backgroundSize="cover"
      >
        <form onSubmit={handleSubmit} style={{ marginTop: "10vw" }}>
          <Flex
            direction={"column"}
            w={"80vw"}
            h={"10vw"}
            justify={"space-between"}
            align={"center"}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              style={{
                width: "100%",
                height: "4vw",
                backgroundColor: `${Theme.colors.primary[200]}40`,
                borderRadius: "2vw",
                backdropFilter: "blur(7px)",
                outline: "none",
                padding: "0 2vw",
                color: "white",
                border: "2px solid #ffffff30",
                filter: "drop-shadow(0 0 1vw #ffffff90)",
                fontSize: "1.4vw",
                textAlign: "center",
                letterSpacing: "0.1vw",
              }}
              placeholder="Write any topic you want to learn"
            />
            <Button
              w={"10vw"}
              h={"3vw"}
              color={Theme.colors.secondary[100]}
              // borderColor="blue.500"
              backgroundColor={`${Theme.colors.primary[200]}90`}
              _hover={{ backgroundColor: Theme.colors.primary[200] }}
              fontSize={"1.3vw"}
              type="submit"
            >
              Learn
            </Button>
          </Flex>
        </form>
      </Flex>
      {contentFetched ? (
        <Flex direction={"column"} align={"center"} my={"3vw"}>
          {content != "" && (
            <Heading color={"white"} mb={"2vw"}>
              {value}
            </Heading>
          )}
          <Text w={"80vw"} textAlign={"center"} color={"white"}>
            {content}
          </Text>
        </Flex>
      ) : (
        <Center>
          <Heading color={"white"}>Generating ...</Heading>
        </Center>
      )}
      {fetched ? (
        <Flex direction={"column"} align={"center"}>
          {subTopics.length != 0 && (
            <Heading color={"white"} mb={"2vw"}>
              Learn {value} in 10 parts
            </Heading>
          )}
          <Accordion w={"80vw"} allowToggle color={"white"} pb={"4vw"}>
            {subTopics.map((e) => {
              return <SubTopicDetail subTopics={e} />;
            })}
          </Accordion>
        </Flex>
      ) : (
        <Center>
          <Spinner
            color="blue"
            size={"xl"}
            thickness="0.3vw"
            speed="0.65s"
            emptyColor="gray.200"
          />
        </Center>
      )}
    </Box>
  );
};

export default Content;
