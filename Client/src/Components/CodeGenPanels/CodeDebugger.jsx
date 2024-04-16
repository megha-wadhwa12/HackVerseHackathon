import { Button, Container, Flex, Textarea, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import Theme from "../Theme";

const CodeDebugger = () => {
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const gemini_key = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(gemini_key);
  async function genChat(prompt) {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: "I want you act as a Code debugger rectify the error in the given code and respond with the rectified code. ",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: "Ok I am ready as a Code Debugger. Lets proceed with the task",
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 10000,
          temperature: 0.7,
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
    }
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          genChat(value);
        }}
      >
        <Flex
          w={["100%", "80%"]}
          mx={"auto"}
          h={["60vh", "70vh"]}
          justify={"space-between"}
        >
          <Textarea
            color={"white"}
            borderRadius={"1vw"}
            border={"0.2vw solid White"}
            p={"1vw"}
            placeholder="Please Give code to debug"
            w={"45%"}
            h={["50vh", "65vh"]}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Container
            overflow={"auto"}
            style={{ textAlign: "left" }}
            bgColor={"#00000090"}
            color={"white"}
            borderRadius={"1vw"}
            w={"45%"}
            h={["50vh", "65vh"]}
            border={"0.2vw solid White"}
            p={"1vw"}
          >
            {isLoading ? (
              <Spinner color="white" size={"lg"} />
            ) : (
              <ReactMarkdown style={{ textAlign: "left" }}>
                {content}
              </ReactMarkdown>
            )}
          </Container>
        </Flex>
        <Button
          w={{ base: "40vw", md: "10vw" }}
          h={{ base: "10vw", md: "3vw" }}
          color={Theme.colors.secondary[100]}
          backgroundColor={`${Theme.colors.primary[200]}90`}
          _hover={{ backgroundColor: Theme.colors.primary[200] }}
          fontSize={{ base: "4vw", md: "1.3vw" }}
          type="submit"
        >
          Generate
        </Button>
      </form>
    </>
  );
};

export default CodeDebugger;
