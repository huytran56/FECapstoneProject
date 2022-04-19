import { HStack, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export function SearchBox() {
  return (
    <HStack>
      <Input
        type="text"
        placeholder="Search..."
        size="md"
        backgroundColor="white"
        width="300px"
      />
      <Search2Icon color="white" fontSize="23px" />
    </HStack>
  );
}
