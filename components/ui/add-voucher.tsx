import { useAppDispatch } from "@app/hook";
import { Button, Select, Stack, VStack, HStack, Text } from "@chakra-ui/react";
import { adminAction } from "@store/admin";
import { Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";
import * as Yup from "yup";

export function AddVoucher() {
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
  const dispatch = useAppDispatch();
  const handleOnClickAddNewVoucher = (value) => {
    console.log(value);
    dispatch(
      adminAction.preSetCreateVoucherList({
        createVoucherPayLoad: value,
      })
    );
  };
  return (
    <Formik
      initialValues={{
        id: 0,
        code: "",
        name: "",
        description: "",
        type: "",
        minSpend: 0,
        maxDiscount: 0,
        discountAmount: 0,
        active: "",
        quantity: 0,
        fromDate: "",
        toDate: "",
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddNewVoucher}
      validationSchema={validate}
    >
      {({ setFieldValue }) => (
        <Form>
          <VStack>
            <Text fontWeight="bold" fontSize="30px">
              Tạo mã giảm giá
            </Text>
            <br />
            <HStack w="100%" justifyContent="space-around">
              <TextField label="Mã Giảm giá" name="code" type="text" />
              <TextField label="Tên mã" name="name" type="text" />
            </HStack>
            <TextField label="Số lượng" name="quantity" type="text" />
            <TextField label="Mô tả" name="description" type="text" />
            <HStack w="100%" justifyContent="space-around">
              <TextField
                label="Ngày bắt đầu"
                name="fromDate"
                type="datetime-local"
              />
              <TextField
                label="Ngày kết thúc"
                name="toDate"
                type="datetime-local"
              />
            </HStack>
            <VStack w="100%" alignItems="start">
              <Text fontWeight="semibold" fontSize="16px">
                Loại mã giảm giá
              </Text>
              <Select
                placeholder="-"
                name="type"
                onChange={(e) => setFieldValue("type", e.target.value)}
              >
                <option value="PERCENTAGE">Phần trăm</option>
                <option value="FIX_VALUE">Trừ tiền</option>
              </Select>
            </VStack>
            <HStack w="100%" justifyContent="space-around">
              <TextField label="Tiền tối thiểu" name="minSpend" type="number" />
              <TextField
                label="Tiền giảm tối đa"
                name="maxDiscount"
                type="number"
              />
              <TextField
                label="Phần trăm giảm"
                name="discountAmount"
                type="number"
              />
            </HStack>

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
            <Button type="submit">Xác nhận</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
