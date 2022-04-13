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

export function EditProductSKU() {
  const dispatch = useAppDispatch();
  const handleOnClickEditProductSKU = (value) => {
    dispatch(adminAction.preEditProductSKU({ editProductSKUPayLoad: value }));
  };
  const validate = () => {};
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
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickEditProductSKU}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
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
              label="Stock"
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
              label="Size"
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
              label="Sale Limit"
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
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
