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
          <VStack>
            <Text fontWeight="bold" fontSize="30px">
              Thay đổi thông tin mã giảm giá
            </Text>
            <br />
            <br />
            <HStack w="100%" justifyContent="space-around">
              <TextField
                label="ID"
                name="id"
                type="text"
                value={currentEditVoucherSelector.id}
              />
              <TextField
                label="Tên"
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
            </HStack>
            <TextField
              label="Mã giảm"
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
              label="Mô tả"
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
            <HStack w="100%" justifyContent="space-around">
              <TextField
                label="Tỉ lệ giảm giá"
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
                label="Giảm giá nhiều nhất"
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
            </HStack>
            <HStack w="100%" justifyContent="space-around">
              <TextField
                label="Số tiền sử dụng tối thiểu"
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
                label="Kích hoạt"
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
            </HStack>
            <Select
              placeholder="Type"
              name="type"
              onChange={(e) => setFieldValue("type", e.target.value)}
            >
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FIX_VALUE">FIX_VALUE</option>
            </Select>
            <Button type="submit">Xác nhận</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
