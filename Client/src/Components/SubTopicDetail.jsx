import React, { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

const SubTopicDetail = ({ subTopics }) => {
  const gemini_key = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(gemini_key);
  const [details, setDetails] = useState([]);
  const [fetched, setFetched] = useState(true);
  function removeAsterisks(str) {
    return str.replace(/\*/g, ""); 
  }
  async function genContent(topic) {
    try {
      setFetched(false);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are making a learning content for a topic. Give a basic idea in 300 words and 3 paragraph about the topic. Don't include declaration of paragraphs`,
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
      const { totalTokens } = await model.countTokens(text);
      const withoutText = removeAsterisks(text);
      let contentArray = withoutText.split("\n");
      contentArray.shift();
      contentArray = contentArray.filter((e) => e !== "");
      contentArray = contentArray.filter((e) => !e.includes("Paragraph"));

      setDetails(contentArray);
      setFetched(true);
    } catch (error) {
      genContent(topic);
      console.log(error);
    }
  }
  useEffect(() => {
    genContent(subTopics);
  }, []);
  console.log(details);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontSize='2xl' >
            {subTopics}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {fetched ? (
          <UnorderedList>
            {details.map((e, i) => {
              return <ListItem key={i}>{e}</ListItem>;
            })}
          </UnorderedList>
        ) : (
          <UnorderedList>
            <Center>
              <Spinner />
            </Center>
          </UnorderedList>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SubTopicDetail;
