import { NavigationBar } from "../containers";
import { Container, Stack, Box, Center } from "@chakra-ui/react";
import { Footer } from "../containers";

export function MainLayout({ children }) {
  return (
    <>
      <Center>
        <Container maxWidth={{ lg: "3000px" }}>
          <Stack minHeight="100vh">
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
