import { NavigationBar } from "../containers";
import { Container } from "@chakra-ui/react";

export function MainLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <Container maxWidth={{ lg: "3718px" }}>
        <main>{children}</main>
      </Container>
    </>
  );
}
