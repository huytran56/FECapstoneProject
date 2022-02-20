import { Box } from "@chakra-ui/react";

export const AuthenticateLayout = ({ children }) => {
  return (
    <Box
      width="100vw"
      height="100vh"
      backgroundColor="#8EC5FC"
      backgroundImage="linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
    >
      {children}
    </Box>
  );
};
