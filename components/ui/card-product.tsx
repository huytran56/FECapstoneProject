import { Image, VStack, Text, HStack, Box } from "@chakra-ui/react";

export function CardProduct({
  product_id,
  product_status_id,
  product_name,
  price,
  imageUrl,
}) {
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
          src={imageUrl}
          alt={product_name}
          minWidth="300px"
          maxWidth="200px"
          w={{
            base: "300px", // 0-48em
            md: "300px", // 48em-80em,
            xl: "200px", // 80em+
          }}
          h={{ xl: "200px" }}
          borderRadius="8px"
          transition="all 0.5s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        <VStack alignItems="flex-start" mt={3}>
          <Text as="body" fontWeight="bold">
            {product_name}
          </Text>
          {/* <Text fontWeight="light">{product_name}</Text> */}
          <HStack>
            <Text fontWeight="bold">${price}</Text>
            {/* <Text fontWeight="thin" textDecoration="line-through">
              ${oldPrice}
            </Text> */}
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
