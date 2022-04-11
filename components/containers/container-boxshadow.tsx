import { useAppDispatch, useAppSelector } from "@app/hook";
import { VStack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import {
  adminAction,
  selectPaginationIndex,
  selectProductList,
  selectRecommendationList,
} from "@store/admin";
import { useEffect } from "react";
import { flashSales } from "../../util";
import { CardProduct } from "../ui";

export function ContainerBoxShadow() {
  const dispatch = useAppDispatch();
  const productListSelector = useAppSelector(selectProductList);
  const paginationIndexSelector = useAppSelector(selectPaginationIndex);
  useEffect(() => {
    dispatch(
      adminAction.preSetProductList({
        paginationIndex: paginationIndexSelector,
      })
    );
  }, [paginationIndexSelector, dispatch]);
  console.log(productListSelector);

  return (
    <VStack
      boxShadow="rgba(0, 0, 0, 0.05) 0px 24px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
      my={8}
      borderRadius="base"
      mx="auto"
      fontWeight="semibold"
      alignItems="flex-start"
      px="15px"
      py="15px"
    >
      <Text as="h1" ml="10px">
        Sản phẩm
      </Text>
      <SimpleGrid columns={4} gap={3}>
        {productListSelector.map((product, index) => (
          <CardProduct {...product} key={index} />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
