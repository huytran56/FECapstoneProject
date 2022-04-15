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
import { selectNumberItem } from "@store/user";
import { useAppDispatch, useAppSelector } from "@app/hook";
import { useEffect } from "react";
import { adminAction, selectUserInfo } from "@store/admin";
export function AuthenticationMenu() {
  const dispatch = useAppDispatch();
  const numberItemSelector = useAppSelector(selectNumberItem);
  useEffect(() => {
    dispatch(adminAction.preSetUserInfo({}));
  }, [dispatch]);

  const userInforSelector = useAppSelector(selectUserInfo);
  console.log(userInforSelector);

  return (
    <HStack>
      <VStack justifyContent="space-around">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={
              <Code colorScheme="yellow" m={0}>
                {numberItemSelector}
              </Code>
            }
          >
            <Icon
              as={AiOutlineShoppingCart}
              m={0}
              fontSize={25}
              _hover={{ cursor: `pointer` }}
            />
          </MenuButton>
          <MenuList>
            <Cart />
          </MenuList>
        </Menu>
      </VStack>
      {userInforSelector ? (
        <Link>{userInforSelector.username}</Link>
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
