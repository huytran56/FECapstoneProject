import { VStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export function CardCategory({ product_name, price, imageUrl }) {
  return (
    <VStack mx="auto">
      <Link passHref={true} href="/">
        <Image
          src={imageUrl}
          w={{
            base: "300px", // 0-48em
            md: "300px", // 48em-80em,
            xl: "200px", // 80em+
          }}
          h={{ xl: "200px" }}
          transition="all 0.5s ease"
          borderRadius="8px"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
          _hover={{ transform: "scale(1.15)", transform: "rotate(2deg)" }}
          alt={product_name}
        />
      </Link>
      <Text>{product_name}</Text>
    </VStack>
  );
}
