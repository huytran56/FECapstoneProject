import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";

export function NavigationButton({ label, smallMenuList }) {
  console.log("aaaaa", smallMenuList);
  return (
    <Menu>
      <MenuButton
        backgroundColor="white"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {label}
      </MenuButton>
      <MenuList>
        {smallMenuList.map(({ label, href }) => (
          <MenuItem>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
