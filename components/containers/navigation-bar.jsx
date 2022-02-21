import { HStack } from "@chakra-ui/react";
import { menu } from "../../util/constant";
import { SearchBox, Logo, NavigationButton, AuthenticationMenu } from "../ui";

export function NavigationBar() {
  return (
    <HStack
      maxHeight="60px"
      justifyContent="space-between"
      px={5}
      position="fixed"
      w="100%"
      backgroundColor="white"
    >
      <div>
        <HStack>
          <Logo />
          {menu.map(({ label, smallMenuList }) => (
            <NavigationButton
              key={label}
              label={label}
              smallMenuList={smallMenuList}
            />
          ))}
          <SearchBox />
        </HStack>
      </div>
      <AuthenticationMenu />
    </HStack>
  );
}
