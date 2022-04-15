import { useAppSelector, useAppDispatch } from "@app/hook";
import {
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Link,
  Button,
  MenuItem,
} from "@chakra-ui/react";
import {
  adminAction,
  selectCategoryList,
  selectIsAddNewState,
} from "@store/admin";
import { selectNumberItem } from "@store/user";
import { menu } from "../../util/constant";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiFillHome, AiFillDatabase, AiOutlineContacts } from "react-icons/ai";

import { SearchBox, Logo, NavigationButton, AuthenticationMenu } from "../ui";
import { useEffect } from "react";

export function NavigationBar() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminAction.preSetCategoryList({}));
  }, [dispatch]);
  const categoryListSelector = useAppSelector(selectCategoryList);

  console.log(categoryListSelector);

  return (
    <HStack
      maxHeight="200px"
      height="80px"
      justifyContent="space-between"
      px={5}
      position="fixed"
      w="100%"
      backgroundColor="white"
      zIndex="1000"
      paddingRight={10}
    >
      <HStack>
        <Link href="/">
          <Logo />
        </Link>
        <Menu>
          <MenuButton
            backgroundColor="white"
            as={Button}
            fontSize={20}
            leftIcon={<AiFillHome />}
          >
            <Link href="/">Trang chủ</Link>
          </MenuButton>
          {/* <MenuList>
            <MenuItem>
              <Link href="/">
                <a></a>
              </Link>
            </MenuItem>
          </MenuList> */}
        </Menu>
        <Menu>
          <MenuButton
            backgroundColor="white"
            as={Button}
            fontSize={20}
            leftIcon={<AiFillDatabase />}
          >
            Danh mục
          </MenuButton>
          <MenuList>
            {categoryListSelector
              ? categoryListSelector.map((c, index) => (
                  <MenuItem key={index}>
                    <Link href="/">
                      <a></a>
                    </Link>
                  </MenuItem>
                ))
              : null}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            backgroundColor="white"
            as={Button}
            fontSize={20}
            leftIcon={<AiOutlineContacts />}
            href="/"
          >
            Giới thiệu
          </MenuButton>
        </Menu>
        <SearchBox />
      </HStack>
      <AuthenticationMenu />
    </HStack>
  );
}
