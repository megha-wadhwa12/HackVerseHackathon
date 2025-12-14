import {
  Box,
  Button,
  Code,
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Theme from "../Theme";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const CodeGenerator = () => {
  const [content, setContent] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const gemini_key = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(gemini_key);

  async function genChat(history, prompt) {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: "I want you act as a  proper Coder and give proper code. I will give you prompt to only generate code. Don't convert the code. If language is not provided for generating code take python as the language. dont give pseudo code.",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Ok I am ready as a Coder. Lets proceed with the task",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: "If user asks to convert any code to any other language in any part of chat, then tell him to try code converter Feature",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Ok, If user tries to convert the code to another language, I will tell the user to use Code converter Feature",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: "If you find any similar code generated before in the history in the chat, rephrase the prompt and give code for that",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "I got it, If i encounter similar prompt, I will rephrase the prompt and give the code for the generated prompt.",
              },
            ],
          },
          {
            role: "user",
            parts: [
              {
                text: `Give it in a proper markdown format. give comments such that it matches the appropriate language. give minimal comments`,
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Ok I will keep that in mind,  Lets proceed with the task",
              },
            ],
          },
          ...history,
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
      const res = await chat.sendMessage(prompt);
      const text = res.response.text();
      //   const withoutAsterisks = removeAsterisks(text);
      setContent(text);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error) {
        genChat(history, prompt);
      }
    }
  }
  useEffect(() => {
    if (content != "") {
      setChatHistory([
        ...chatHistory,
        { role: "model", parts: [{ text: content }] },
      ]);
      setContent("");
    }
  }, [content]);
  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value != "") {
      genChat(chatHistory, value);
      setChatHistory([
        ...chatHistory,
        { role: "user", parts: [{ text: value }] },
      ]);
      setValue("");
    }
  };
  console.log(isLoading);

  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box overflow={"hidden"}>
      <form onSubmit={handleSubmit}>
        <Flex
          direction={"column"}
          w={{ base: "90vw", md: "80vw" }}
          h={{ base: "20vh", md: "10vw" }}
          justify={"space-between"}
          align={"center"}
          px={isMobile ? "0" : "2vw"}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              height: isMobile ? "15vw" : "4vw",
              backgroundColor: `${Theme.colors.primary[200]}40`,
              borderRadius: "2vw",
              backdropFilter: "blur(7px)",
              outline: "none",
              padding: "0",
              margin: "0",
              color: "white",
              border: "2px solid #ffffff30",
              filter: "drop-shadow(0 0 1vw #ffffff90)",
              fontSize: isMobile ? "4vw" : "1.4vw",
              textAlign: "center",
              letterSpacing: "0.1vw",
              //   textTransform: "uppercase",
              marginBottom: "10px",
            }}
            placeholder="WRITE A PROMPT TO GENERATE CODE"
          />
          <Button
            w={{ base: "40vw", md: "10vw" }}
            h={{ base: "10vw", md: "3vw" }}
            mb={"1vw"}
            color={Theme.colors.secondary[100]}
            backgroundColor={`${Theme.colors.primary[200]}90`}
            _hover={{ backgroundColor: Theme.colors.primary[200] }}
            fontSize={{ base: "4vw", md: "1.3vw" }}
            type="submit"
          >
            Generate
          </Button>
        </Flex>
      </form>
      <Flex
        direction={"column"}
        align={"start"}
        w={"80vw"}
        p={["3vw", "1vw"]}
        borderRadius={"1vw"}
        border={"0.2vw solid White"}
        h={["100vw", "50vw"]}
        overflow={"auto"}
      >
        {chatHistory.map((e, i) => {
          return e.role == "user" ? (
            <Box key={i} marginBottom={"1vw"}>
              <Text color={"white"} fontSize={["4vw", "1.3vw"]}>
                <ReactMarkdown>{`**User**: ${e.parts[0].text}`}</ReactMarkdown>
              </Text>
            </Box>
          ) : (
            <Code
              key={i}
              bgColor={"#00000090"}
              color={"white"}
              w={"100%"}
              overflowY={"auto"}
              textAlign={"left"}
              p={["5vw", "3vw"]}
              mb={"2vw"}
              borderRadius={"0.5vw"}
              border={"0.1vw solid #ffffff20"}
            >
              <ReactMarkdown style={{ textAlign: "left" }}>
                {`${e.parts[0].text}`}
              </ReactMarkdown>
            </Code>
          );
        })}
        {isLoading && <Spinner color="white" size={"lg"} />}
      </Flex>
    </Box>
  );
};

export default CodeGenerator;
