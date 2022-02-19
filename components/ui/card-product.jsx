import { Image, VStack, Text, HStack, Box } from "@chakra-ui/react";

export function CardProduct({ img, label, description, oldPrice, newPrice }) {
  return (
    <Box
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      px="25px"
      py="40px"
      ml="auto"
      borderRadius="8px"
    >
      <VStack justifyContent="center">
        <Image
          src={img}
          alt={description}
          minWidth="100px"
          maxWidth="300px"
          minWidth="100px"
          maxWidth="300px"
          width="80%"
          height={{
            base: "50px",
            md: "100px",
            xl: "200px",
          }}
          transition="all 0.5s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        <VStack alignItems="flex-start" mt={3}>
          <Text as="body" fontWeight="bold">
            {label}
          </Text>
          <Text fontWeight="light">{description}</Text>
          <HStack>
            <Text fontWeight="bold">${newPrice}</Text>
            <Text fontWeight="thin" textDecoration="line-through">
              ${oldPrice}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
