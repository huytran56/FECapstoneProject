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
import * as Yup from "yup";

export function AddProductSKU() {
  const validate = Yup.object({
    stock: Yup.string().required("Không được bỏ trống"),
    size: Yup.string().required("Không được bỏ trống"),
    sale_limit: Yup.string().required("Không được bỏ trống"),
  });
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
      validationSchema={validate}
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
            <TextField label="Số lượng hàng" name="stock" type="text" />
            <TextField label="Kích Cỡ" name="size" type="text" />
            <TextField label="Giảm giá tối đa" name="sale_limit" type="text" />
            <Button type="submit">Xác nhận</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
