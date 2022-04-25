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
        paginationIndex: paginationIndexSelector + 10,
      })
    );
  }

  function handleOnClickPreviousButton() {
    if (paginationIndexSelector === 0) return;
    dispatch(
      adminAction.setPaginationIndex({
        paginationIndex: paginationIndexSelector - 10,
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
      <Text fontWeight="bold" fontSize="23px" ml="10px">
        SẢN PHẨM
      </Text>
      <SimpleGrid columns={4} spacing={4} w="100%" minChildWidth="400px">
        {productListSelector
          ? productListSelector.map((product, index) => (
              <Box key={index}>
                <CardProduct {...product} key={index} />
              </Box>
            ))
          : null}
      </SimpleGrid>
      <HStack w="100%" alignItems="center" justifyContent="center">
        <Button onClick={handleOnClickPreviousButton} w="100px">
          <AiOutlineDoubleLeft />
        </Button>
        <Button onClick={handleOnClickNextButton} w="100px">
          <AiOutlineDoubleRight />
        </Button>
      </HStack>
    </VStack>
  );
}
