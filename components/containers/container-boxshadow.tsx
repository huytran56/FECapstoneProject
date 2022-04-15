import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  VStack,
  Text,
  SimpleGrid,
  Box,
  Button,
  Stack,
  HStack,
} from "@chakra-ui/react";
import {
  adminAction,
  selectPaginationIndex,
  selectProductList,
  selectRecommendationList,
} from "@store/admin";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import React, { useEffect } from "react";
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
  function handleOnClickNextButton() {
    dispatch(
      adminAction.setPaginationIndex({
        paginationIndex: paginationIndexSelector + 1,
      })
    );
  }

  function handleOnClickPreviousButton() {
    if (paginationIndexSelector === 0) return;
    dispatch(
      adminAction.setPaginationIndex({
        paginationIndex: paginationIndexSelector - 1,
      })
    );
  }

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
      <SimpleGrid columns={3} gap={2}>
        {productListSelector
          ? productListSelector.map((product, index) => (
              <Box key={index}>
                <CardProduct {...product} key={index} />
              </Box>
            ))
          : null}
      </SimpleGrid>
      <HStack w="100%" alignItems="center">
        <Button onClick={handleOnClickPreviousButton}>
          <AiOutlineDoubleLeft />
        </Button>
        <Button onClick={handleOnClickNextButton}>
          <AiOutlineDoubleRight />
        </Button>
      </HStack>
    </VStack>
  );
}
