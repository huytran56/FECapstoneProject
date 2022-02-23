import { VStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function FooterColumn({ title, listInformation }) {
  return (
    <VStack>
      <i class="fa-brands fa-instagram"></i>
      <Text as="h3">{title}</Text>
      {listInformation.map((infor) => (
        <Text as="h6" fontWeight="light">
          {infor.title}
        </Text>
      ))}
    </VStack>
  );
}
