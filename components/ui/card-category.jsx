import { VStack, Image, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export function CardCategory({
  product_name,
  price,
  imageUrl,
  index,
  product_id,
}) {
  const router = useRouter();
  return (
    <VStack
      mx="auto"
      key={index}
      boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;"
      w="100%"
      borderRadius="base"
      py={8}
      _hover={{ transform: "scale(1.1)" }}
      transition="all 0.5s ease"
    >
      <Box
        backgroundImage={`url("${imageUrl}")`}
        w={{
          base: "300px", // 0-48em
          md: "200px", // 48em-80em,
          xl: "300px", // 80em+
        }}
        h={{ xl: "200px" }}
        transition="all 0.5s ease"
        borderRadius="8px"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        _hover={{ transform: "rotate(2deg)" }}
        alt={product_name}
        maxWidth="200px"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        border="1px solid #f8f8f8"
        onClick={() => router.push(`/product/${product_id}`)}
      />
      <Text textDecor="aqua" fontWeight="bold" textAlign="center">
        {product_name}
      </Text>
      <Text textColor="red" fontWeight="bold" fontSize={13}>
        {price.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </Text>
    </VStack>
  );
}
