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
  selectCurrentProductSKU,
} from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";
import * as Yup from "yup";

export function EditProductSKU() {
  const validate = Yup.object({
    stock: Yup.string().required("Không được bỏ trống"),
    size: Yup.string().required("Không được bỏ trống"),
    sale_limit: Yup.string().required("Không được bỏ trống"),
  });
  const dispatch = useAppDispatch();
  const handleOnClickEditProductSKU = (value) => {
    console.log(value);
    dispatch(
      adminAction.preEditProductSKU({ editProductSKUPayLoad: { ...value } })
    );
  };

  const currentEditProductSKUSelector = useAppSelector(selectCurrentProductSKU);
  //   console.log(currentEditProductSKUSelector.id);
  return (
    <Formik
      initialValues={{
        id: currentEditProductSKUSelector
          ? currentEditProductSKUSelector.id
          : "",
        stock: currentEditProductSKUSelector
          ? currentEditProductSKUSelector.stock
          : "",
        size: currentEditProductSKUSelector
          ? currentEditProductSKUSelector.size
          : "",
        sale_limit: currentEditProductSKUSelector
          ? currentEditProductSKUSelector.sale_limit
          : "",
        product_id: currentEditProductSKUSelector
          ? currentEditProductSKUSelector.product_id
          : "",
      }}
      validationSchema={validate}
      onSubmit={handleOnClickEditProductSKU}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <VStack w="100%">
              <Text fontWeight="bold" fontSize="30px">
                Chỉnh sửa chi tiết sản phẩm
              </Text>
              <br />
            </VStack>
            <TextField
              label="ID"
              name="id"
              type="text"
              value={
                currentEditProductSKUSelector
                  ? currentEditProductSKUSelector.id
                  : ""
              }
            />
            <TextField
              label="Số lượng hàng"
              name="stock"
              type="text"
              value={currentEditProductSKUSelector?.stock}
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentProductSKU({
                    currentProductSKU: {
                      ...currentEditProductSKUSelector,
                      stock: e.target.value,
                    },
                  })
                );
                setFieldValue("stock", e.target.value);
              }}
            />
            <TextField
              label="Kích cỡ"
              name="size"
              type="text"
              value={currentEditProductSKUSelector?.size}
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentProductSKU({
                    currentProductSKU: {
                      ...currentEditProductSKUSelector,
                      size: e.target.value,
                    },
                  })
                );
                setFieldValue("size", e.target.value);
              }}
            />
            <TextField
              label="Số lượng mua tối đa"
              name="sale_limit"
              type="text"
              value={currentEditProductSKUSelector?.sale_limit}
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentProductSKU({
                    currentProductSKU: {
                      ...currentEditProductSKUSelector,
                      sale_limit: e.target.value,
                    },
                  })
                );
                setFieldValue("sale_limit", e.target.value);
              }}
            />
            <Button type="submit">Xác nhận</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
