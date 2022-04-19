import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  FormControl,
  Stack,
  FormLabel,
  Input,
  HStack,
  VStack,
  Box,
  Select,
  Text,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  OrderedList,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  adminAction,
  selectCurrentEditAccount,
  selectCurrentOrderItem,
  selectCurrentProduct,
} from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { ModalGeneralTwo, TextField } from ".";
import AddReview from "./add-review";

export function OrderHistoryDetail() {
  const dispatch = useAppDispatch();
  const validate = () => {};
  const currentProductSelector = useAppSelector(selectCurrentProduct);
  function handleOnClickReview() {
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
  }
  return (
    <VStack w="100%">
      <ModalGeneralTwo>
        <AddReview />
      </ModalGeneralTwo>
      <Text fontWeight="bold" fontSize="25">
        Chi tiết đơn hàng
      </Text>
      <br />

      <HStack w="100%" justifyContent="space-between">
        <Image
          src="https://vn-live-01.slatic.net/p/df067e4dc64aae9f17a69e54a4e7eaaf.jpg"
          h={120}
          w={120}
        />
        <VStack w="100%" alignItems="left" h="100%" marginTop="10px">
          <Text fontWeight="bold">Áo blazer nữ tay ngắn,Size S</Text>
          <Text>1</Text>
          <Text>200.000 VNĐ</Text>
        </VStack>
        <Button
          bg={useColorModeValue("gray.900", "gray.50")}
          color={useColorModeValue("white", "gray.900")}
          w="130px"
          onClick={handleOnClickReview}
        >
          Đánh giá
        </Button>
      </HStack>
    </VStack>
  );
}
