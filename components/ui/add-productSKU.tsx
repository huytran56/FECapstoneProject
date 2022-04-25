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
} from "@chakra-ui/react";
import {
  adminAction,
  selectCurrentEditAccount,
  selectCurrentEditVoucher,
  selectCurrentProductId,
  selectCurrentProductSKU,
} from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";

export function AddProductSKU() {
  const dispatch = useAppDispatch();
  const currentProductIdSelector = useAppSelector(selectCurrentProductId);
  console.log(currentProductIdSelector);
  const handleOnClickAddProductSKU = (value) => {
    dispatch(
      adminAction.preAddProductSKU({
        createProductSKUPayload: {
          product_id: currentProductIdSelector,
          ...value,
        },
      })
    );
    console.log(value);
  };
  const validate = () => {};

  //   console.log(currentEditProductSKUSelector.id);
  return (
    <Formik
      initialValues={{
        id: 0,
        stock: 0,
        size: "",
        sale_limit: 0,
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddProductSKU}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
          <VStack w="100%">
              <Text fontWeight="bold" fontSize="30px">
                Tạo chi tiết sản phẩm
              </Text>
              <br />
            </VStack>
            {/* <TextField label="ID" name="id" type="text" /> */}
            <TextField label="Stock" name="stock" type="text" />
            <TextField label="Size" name="size" type="text" />
            <TextField label="Sale Limit" name="sale_limit" type="text" />
            <Button type="submit">Xác nhận</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
