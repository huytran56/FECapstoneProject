import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { FooterColumn } from "../ui";
import { footerInformation } from "../../util";
import { Copyright } from "../ui";

export function Footer() {
  return (
    <VStack>
      <Grid templateColumns="repeat(6,1fr)" gap={6} py={20}>
        {footerInformation.map((infor) => (
          <GridItem key={infor.title}>
            <FooterColumn title={infor.title} listInformation={infor.infor} />
          </GridItem>
        ))}
      </Grid>
      <Copyright />
    </VStack>
  );
}
