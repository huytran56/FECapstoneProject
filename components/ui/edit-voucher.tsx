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
import * as Yup from "yup";

export function EditVoucher() {
  const dispatch = useAppDispatch();
  const validate = Yup.object({
    code: Yup.string().required("Không được bỏ trống"),
    name: Yup.string().required("Không được bỏ trống"),
    description: Yup.string().required("Không được bỏ trống"),
    minSpend: Yup.string().required("Không được bỏ trống"),
    maxDiscount: Yup.number().required("Không được bỏ trống"),
    fromDate: Yup.string().required("Không được bỏ trống"),
    toDate: Yup.string().required("Không được bỏ trống"),
    type: Yup.string().required("Không được bỏ trống"),
    discountAmount: Yup.string().required("Không được bỏ trống"),
    active: Yup.string().required("Không được bỏ trống"),
    quantity: Yup.number().required("Không được bỏ trống"),
  });
  const handleOnClickEditVoucher = (value) => {
    dispatch(adminAction.preEditVoucher({ editVoucherPayLoad: value }));
  };
  const currentEditVoucherSelector = useAppSelector(selectCurrentEditVoucher);
  function convertTZ(date, tzString) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }
  const formatDate = (dateString: string, full = true) => {
    let t = new Date(dateString);
    // t = new Date().setHours(t.getHours() - 7);
    let utc = new Date(t.getTime() + t.getTimezoneOffset() * 60000);
    console.log(utc);

    const date = ("0" + utc.getDate()).slice(-2);
    const month = ("0" + (utc.getMonth() + 1)).slice(-2);
    const year = utc.getFullYear();
    const hours = ("0" + utc.getHours()).slice(-2);
    const minutes = ("0" + utc.getMinutes()).slice(-2);
    const seconds = ("0" + utc.getSeconds()).slice(-2);
    return full
      ? `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`
      : `${date}/${month}/${year}`;
  };
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
        quantity: currentEditVoucherSelector.quantity,
        fromDate: currentEditVoucherSelector.fromDate,
        toDate: currentEditVoucherSelector.toDate,
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickEditVoucher}
      validationSchema={validate}
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
              {/* <TextField
                label="ID"
                name="id"
                type="text"
                value={currentEditVoucherSelector.id}
              /> */}
              <TextField
                label="Tên mã giảm"
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
            <HStack w="100%" justifyContent="space-around">
              <TextField
                label="Mã giảm giá"
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
                label="Số lượng"
                name="quantity"
                type="text"
                value={
                  currentEditVoucherSelector
                    ? currentEditVoucherSelector.quantity
                    : ""
                }
                onChange={(e) => {
                  dispatch(
                    adminAction.setCurrentEditVoucher({
                      currentEditVoucher: {
                        ...currentEditVoucherSelector,
                        quantity: e.target.value,
                      },
                    })
                  );
                  setFieldValue("quantity", e.target.value);
                }}
              />
            </HStack>
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
                label="Ngày bắt đầu"
                name="fromDate"
                type="datetime-local"
                place
                value={
                  currentEditVoucherSelector
                    ? currentEditVoucherSelector.fromDate
                    : ""
                }
                onChange={(e) => {
                  dispatch(
                    adminAction.setCurrentEditVoucher({
                      currentEditVoucher: {
                        ...currentEditVoucherSelector,
                        fromDate: e.target.value,
                      },
                    })
                  );
                  setFieldValue("fromDate", e.target.value);
                }}
              />
              <TextField
                label="Ngày kết thúc"
                name="toDate"
                type="datetime-local"
                value={
                  currentEditVoucherSelector
                    ? currentEditVoucherSelector.toDate
                    : ""
                }
                onChange={(e) => {
                  dispatch(
                    adminAction.setCurrentEditVoucher({
                      currentEditVoucher: {
                        ...currentEditVoucherSelector,
                        toDate: e.target.value,
                      },
                    })
                  );
                  setFieldValue("toDate", e.target.value);
                }}
              />
            </HStack>
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
              {/* <TextField
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
              /> */}
              <VStack w="100%" alignItems="start">
                <Text fontWeight="semibold" fontSize="16px">
                  Kích hoạt
                </Text>
                <Select
                  placeholder="-"
                  name="active"
                  onChange={(e) => setFieldValue("active", e.target.value)}
                >
                  <option value="true">Có</option>
                  <option value="false">Không</option>
                </Select>
              </VStack>
            </HStack>
            <VStack w="100%" alignItems="start">
              <Text fontWeight="semibold" fontSize="16px">
                Loại mã giảm giá
              </Text>
              <Select
                placeholder="Type"
                name="type"
                onChange={(e) => setFieldValue("type", e.target.value)}
              >
                <option value="PERCENTAGE">PERCENTAGE</option>
                <option value="FIX_VALUE">FIX_VALUE</option>
              </Select>
            </VStack>
            <Button type="submit">Xác nhận</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
