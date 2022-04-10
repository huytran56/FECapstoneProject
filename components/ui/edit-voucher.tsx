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
} from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";

export function EditVoucher() {
  const dispatch = useAppDispatch();
  const handleOnClickEditVoucher = (value) => {
    console.log(value);
    dispatch(adminAction.preEditVoucher({ editVoucherPayLoad: value }));
  };
  const validate = () => {};
  const currentEditVoucherSelector = useAppSelector(selectCurrentEditVoucher);
  return (
    <Formik
      initialValues={{
        id: currentEditVoucherSelector.id,
        active: currentEditVoucherSelector.active,
        code: currentEditVoucherSelector.code,
        description: currentEditVoucherSelector.description,
        discountAmount: currentEditVoucherSelector.discountAmount,
        maxDiscount: currentEditVoucherSelector.maxDiscount,
        minSpend: currentEditVoucherSelector.minSpend,
        name: currentEditVoucherSelector.name,
        type: currentEditVoucherSelector.type,
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickEditVoucher}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <TextField
              label="id"
              name="id"
              type="text"
              value={currentEditVoucherSelector.id}
            />
            <TextField
              label="Active"
              name="active"
              type="text"
              value={
                currentEditVoucherSelector
                  ? currentEditVoucherSelector.active
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditVoucher({
                    currentEditVoucher: {
                      ...currentEditVoucherSelector,
                      active: e.target.value,
                    },
                  })
                );
                setFieldValue("active", e.target.value);
              }}
            />
            <TextField
              label="Code"
              name="code"
              type="text"
              value={
                currentEditVoucherSelector
                  ? currentEditVoucherSelector.code
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditVoucher({
                    currentEditVoucher: {
                      ...currentEditVoucherSelector,
                      code: e.target.value,
                    },
                  })
                );
                setFieldValue("code", e.target.value);
              }}
            />
            <TextField
              label="Description"
              name="description"
              type="text"
              value={
                currentEditVoucherSelector
                  ? currentEditVoucherSelector.description
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditVoucher({
                    currentEditVoucher: {
                      ...currentEditVoucherSelector,
                      description: e.target.value,
                    },
                  })
                );
                setFieldValue("description", e.target.value);
              }}
            />
            <TextField
              label="Discount Amount"
              name="discountAmount"
              type="text"
              value={
                currentEditVoucherSelector
                  ? currentEditVoucherSelector.discountAmount
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditVoucher({
                    currentEditVoucher: {
                      ...currentEditVoucherSelector,
                      discountAmount: e.target.value,
                    },
                  })
                );
                setFieldValue("discountAmount", e.target.value);
              }}
            />
            <TextField
              label="Max Discount"
              name="maxDiscount"
              type="text"
              value={
                currentEditVoucherSelector
                  ? currentEditVoucherSelector.maxDiscount
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditVoucher({
                    currentEditVoucher: {
                      ...currentEditVoucherSelector,
                      maxDiscount: e.target.value,
                    },
                  })
                );
                setFieldValue("maxDiscount", e.target.value);
              }}
            />
            <TextField
              label="Min Spend"
              name="minSpend"
              type="text"
              value={
                currentEditVoucherSelector
                  ? currentEditVoucherSelector.minSpend
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditVoucher({
                    currentEditVoucher: {
                      ...currentEditVoucherSelector,
                      minSpend: e.target.value,
                    },
                  })
                );
                setFieldValue("minSpend", e.target.value);
              }}
            />
            <TextField
              label="Name"
              name="name"
              type="text"
              value={
                currentEditVoucherSelector
                  ? currentEditVoucherSelector.name
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditVoucher({
                    currentEditVoucher: {
                      ...currentEditVoucherSelector,
                      name: e.target.value,
                    },
                  })
                );
                setFieldValue("name", e.target.value);
              }}
            />
            <Select
              placeholder="Type"
              name="type"
              onChange={(e) => setFieldValue("type", e.target.value)}
            >
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FIX_VALUE">FIX_VALUE</option>
            </Select>
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
