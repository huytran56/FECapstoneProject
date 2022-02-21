import { VStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export function CardCategory({ img, label, href }) {
  return (
    <VStack mx="auto">
      <Link href={href}>
        <Image
          src={img}
          w={{
            base: "300px", // 0-48em
            md: "350px", // 48em-80em,
            xl: "200px", // 80em+
          }}
          transition="all 0.5s ease"
          borderRadius="8px"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"
          _hover={{ transform: "scale(1.15)", transform: "rotate(2deg)" }}
        />
      </Link>
      <Text>{label}</Text>
    </VStack>
  );
}
