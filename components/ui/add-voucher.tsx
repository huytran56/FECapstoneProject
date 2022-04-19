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
    discountAmount: Yup.string().required("Không được bỏ trống"),
    active: Yup.string().required("Không được bỏ trống"),
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

            <TextField label="Mô tả" name="description" type="text" />
            <Select
              placeholder="Loại"
              name="type"
              onChange={(e) => setFieldValue("type", e.target.value)}
            >
              <option value="PERCENTAGE">Phần trăm</option>
              <option value="FIX_VALUE">Trừ tiền</option>
            </Select>
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

            <TextField label="Kích hoạt" name="active" type="active" />
            <Button type="submit">Xác nhận</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
