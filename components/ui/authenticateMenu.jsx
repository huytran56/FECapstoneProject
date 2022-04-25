import {
  HStack,
  Text,
  Icon,
  VStack,
  Code,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Cart } from "@components/ui/index";
import { selectNumberItem, selectCartItemList } from "@store/user";
import { useAppDispatch, useAppSelector } from "@app/hook";
import { useEffect } from "react";
import { adminAction, selectUserInfo } from "@store/admin";
import { useRouter } from "next/router";
import { useState } from "react";
export function AuthenticationMenu() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const numberItemSelector = useAppSelector(selectNumberItem);
  useEffect(() => {
    dispatch(adminAction.preSetUserInfo({}));
  }, [dispatch]);

  const userInforSelector = useAppSelector(selectUserInfo);
  const cartItemListSelector = useAppSelector(selectCartItemList);
  console.log(userInforSelector);
  const handleOnClickSignOut = () => {
    dispatch(adminAction.preSignout({}));
    router.push("/signin");
  };

  // console.log(userInforSelector);

  return (
    <HStack>
      <VStack justifyContent="space-around">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={
              <Code colorScheme="yellow" m={0}>
                {cartItemListSelector ? cartItemListSelector.length : 0}
              </Code>
            }
            colorScheme="white"
          >
            <Icon
              as={AiOutlineShoppingCart}
              m={0}
              fontSize={25}
              _hover={{ cursor: `pointer` }}
              color="white"
            />
          </MenuButton>
          <MenuList>
            <Cart />
          </MenuList>
        </Menu>
      </VStack>
      {userInforSelector !== null ? (
        <HStack _hover={{ cursor: `pointer` }}>
          <Text fontWeight="bold" textColor="white" fontSize={20}>
            Xin chào,
          </Text>
          <Menu>
            <MenuButton color="white" fontSize={20}>
              <Link>{userInforSelector.username}</Link>
            </MenuButton>
            <MenuList>
              {/* MenuItems are not rendered unless Menu is open */}
              <MenuItem>
                <Link href="/address">Tạo địa chỉ</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/orderHistory">Xem lịch sử mua hàng</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/changeInfo">Thay đổi thông tin</Link>
              </MenuItem>
              <MenuItem onClick={handleOnClickSignOut}>Đăng xuất</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      ) : (
        <Link href="/signin">
          <Text ml="auto" mr={5} fontWeight="bold" fontSize="17">
            Sign In
          </Text>
        </Link>
      )}
    </HStack>
  );
}
