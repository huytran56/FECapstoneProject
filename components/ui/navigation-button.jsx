import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";

export function NavigationButton({ label, smallMenuList }) {
  return (
    <Menu>
      <MenuButton
        backgroundColor="white"
        as={Button}
        fontSize={20}
        rightIcon={<ChevronDownIcon />}
      >
        {label}
      </MenuButton>
      <MenuList>
        {smallMenuList.map(({ label, href }) => (
          <MenuItem key={label}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
