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
  selectCurrentProduct,
} from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { number } from "yup/lib/locale";
import { TextField } from ".";

export function EditProduct() {
  const dispatch = useAppDispatch();
  const handleOnClickEditProduct = (value) => {
    dispatch(adminAction.preEditProduct({ editProductPayLoad: value }));
  };
  const validate = () => {};
  const currentProductSelector = useAppSelector(selectCurrentProduct);
  return (
    <Formik
      initialValues={{
        product_id: currentProductSelector.product_id,
        product_status_id: currentProductSelector.product_status_id,
        product_name: currentProductSelector.product_name,
        description_list: "",
        description_details: "",
        price: 0,
        search_word: currentProductSelector.search_word,
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickEditProduct}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <TextField
              label="Mã Sản phẩm"
              name="product_id"
              type="text"
              value={currentProductSelector.product_id}
            />
            <TextField
              label="Trạng thái"
              name="product_status_id"
              type="text"
              value={
                currentProductSelector
                  ? currentProductSelector.product_status_id
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentProduct({
                    currentProduct: {
                      ...currentProductSelector,
                      product_status_id: e.target.value,
                    },
                  })
                );
                setFieldValue("product_status_id", e.target.value);
              }}
            />
            <TextField
              label="Tên sản phẩm"
              name="product_name"
              type="text"
              value={
                currentProductSelector
                  ? currentProductSelector.product_name
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentProduct({
                    currentProduct: {
                      ...currentProductSelector,
                      product_name: e.target.value,
                    },
                  })
                );
                setFieldValue("product_name", e.target.value);
              }}
            />
            <TextField
              label="Description List"
              name="description_list"
              type="text"
            />
            <TextField
              label="Description Details"
              name="description_details"
              type="text"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={currentProductSelector ? currentProductSelector.price : ""}
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentProduct({
                    currentProduct: {
                      ...currentProductSelector,
                      price: e.target.value,
                    },
                  })
                );
                setFieldValue("price", e.target.value);
              }}
            />
            <TextField
              label="Search Word"
              name="search_word"
              type="text"
              value={
                currentProductSelector ? currentProductSelector.search_word : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentProduct({
                    currentProduct: {
                      ...currentProductSelector,
                      search_word: e.target.value,
                    },
                  })
                );
                setFieldValue("search_word", e.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
