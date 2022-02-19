import { VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { flashSales } from "../../util/constant";
import { CardProduct } from "../ui";

export function ContainerBoxShadow() {
  return (
    <VStack
      boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
      my={8}
      borderRadius="base"
      mx={5}
      fontWeight="semibold"
      alignItems="flex-start"
      px="15px"
      py="15px"
    >
      <Text as="h1" ml="10px">
        Flash Sales
      </Text>
      <SimpleGrid columns={4} gap={3}>
        {flashSales.map((product) => (
          <CardProduct {...product} key={product.label} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
