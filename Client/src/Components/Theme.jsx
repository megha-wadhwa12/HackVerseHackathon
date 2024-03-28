import { extendTheme } from "@chakra-ui/react";
import '@fontsource/roboto';

const Theme = extendTheme({
  // Define custom colors
  colors: {
    primary: {
      100: "#220339",
      200: '#9200FF',
      300: '#5B3477',
    },
    secondary: {
      100: "#ffffff",
    }
  },
  fonts:{
    heading: "'Roboto', sans-serif",
    subHeading: "'Roboto',sans-serif"
  }
});

export default Theme;
