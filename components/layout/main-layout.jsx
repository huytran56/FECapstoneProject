import { NavigationBar } from "../containers";
import { Container, Stack, Box, Center } from "@chakra-ui/react";
import { Footer } from "../containers";

export function MainLayout({ children }) {
  return (
    <>
      <Center m={0} p={0}>
        <Container maxWidth={{ lg: "3000px" }} p={0}>
          <Stack minHeight="100vh" w="100%">
            <NavigationBar />
            <Box as="main" flexGrow={1}>
              {children}
            </Box>
            <Footer />
          </Stack>
        </Container>
      </Center>
    </>
  );
}
