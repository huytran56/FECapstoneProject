import { useAppDispatch, useAppSelector } from "@app/hook";
import { Link, Flex, Icon, FlexProps } from "@chakra-ui/react";
import { adminAction, selectNumberIndex } from "@store/admin";
import { ReactText, useEffect, useState } from "react";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  numberIndex: number;
}
const NavItem = ({ icon, numberIndex, children, ...rest }: NavItemProps) => {
  const pageIndexSelector = useAppSelector(selectNumberIndex);

  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(numberIndex === pageIndexSelector);
  }, [pageIndexSelector, numberIndex]);
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "cyan.400",
        color: "white",
      }}
      {...rest}
      backgroundColor={isActive ? "cyan.400" : ""}
      color={isActive ? "white" : "black"}
      onClick={() => {
        if (numberIndex === 3) {
          dispatch(
            adminAction.setSearchingKeyWord({ isSearchingProduct: true })
          );
          dispatch(adminAction.setPaginationIndex({ paginationIndex: 0 }));
        }
        dispatch(adminAction.setPageIndex({ pageIndex: numberIndex }));
      }}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

export default NavItem;
