import { HStack, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export function SearchBox() {
  return (
    <HStack>
      <Input type="text" placeholder="Search..." size="sm" />
      <Search2Icon />
    </HStack>
  );
}
