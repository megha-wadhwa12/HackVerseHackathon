import { Box, Flex, TabIndicator } from "@chakra-ui/react";
import React from "react";
import Background from "./../assets/EduFlexBackground.jpg";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Theme from "./Theme";
import CodeGenerator from "./CodeGenPanels/CodeGenerator";
import CodeDebugger from "./CodeGenPanels/CodeDebugger";
import CodeConverter from "./CodeGenPanels/CodeConverter";

const CodeGen = () => {
  return (
    <Box background={Theme.colors.primary[100]} width="100vw" minH={"100vh"}>
      <Box
        direction="column"
        justify="center"
        align="center"
        bgImage={`linear-gradient(0deg, #22033900 0.00%,#22033933 80.00%),linear-gradient(90deg, #22033966 0.00%,#22033900 30.00%),linear-gradient(90deg, #22033900 70.00%,#22033966 100.00%),linear-gradient(180deg, #22033900 30.00%,#220339 100.00%),url(${Background})`}
        width="100%"
        height="90vh"
        backgroundSize="cover"
        pt="8vw"
      >
        <Tabs variant={"unstyled"}>
          <TabList color={"white"} w={"30%"} justifyContent={"center"}>
            <Tab>Code Generator</Tab>
            <Tab>Code Debugger</Tab>
            <Tab>Code Converter</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="white"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <CodeGenerator/>
            </TabPanel>
            <TabPanel>
              <CodeDebugger/>
            </TabPanel>
            <TabPanel>
              <CodeConverter/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default CodeGen;
