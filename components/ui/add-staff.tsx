import { useAppDispatch } from "@app/hook";
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
import { adminAction } from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";
import * as Yup from "yup";

export function AddStaff() {
  const validate = Yup.object({
    birthday: Yup.string().required("Không được bỏ trống"),
    email: Yup.string()
      .required("Không được bỏ trống")
      .email("Email không đúng"),
    first_name: Yup.string().required("Không được bỏ trống"),
    last_name: Yup.string().required("Không được bỏ trống"),
    password: Yup.string()
      .required("Không được bỏ trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số"
      ),
    phone_number: Yup.string()
      .required("Không được bỏ trống")
      .matches(
        /((09|03|07|08|05)+([0-9]{8})\b)/g,
        "Đủ 10 số và bắt đầu bằng 0"
      ),
    username: Yup.string().required("Không được bỏ trống"),
    gender_id: Yup.string().required("Không được bỏ trống"),
  });
  const dispatch = useAppDispatch();
  const handleOnClickAddNewStaff = (value) => {
    console.log("Click");
    dispatch(adminAction.addNewStaff({ createStaffPayload: value }));
  };
  return (
    <Formik
      initialValues={{
        birthday: "",
        email: "",
        first_name: "",
        gender_id: "",
        last_name: "",
        password: "",
        phone_number: "",
        roles: ["staff"],
        username: "",
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddNewStaff}
      validationSchema={validate}
    >
      {({ setFieldValue }) => (
        <Form>
          <VStack w="100%" alignItems="start">
            <VStack w="100%">
              <Text fontWeight="bold" fontSize="30px">
                Tạo nhân viên mới
              </Text>
              <br />
            </VStack>
            <HStack w="100%" justifyContent="space-around">
              <TextField label="Username" name="username" type="text" />
              <TextField label="Email" name="email" type="text" />
            </HStack>
            <TextField label="Mật Khẩu" name="password" type="password" />
            <HStack w="100%" justifyContent="space-around">
              <TextField label="Ngày sinh" name="birthday" type="date" />
              <TextField
                label="Số điện thoại"
                name="phone_number"
                type="text"
              />
            </HStack>
            <HStack w="100%" justifyContent="space-around">
              <TextField label="Họ" name="last_name" type="text" />
              <TextField label="Tên" name="first_name" type="text" />
            </HStack>
            <Select
              placeholder="Giới tính"
              name="gender_id"
              onChange={(e) => setFieldValue("gender_id", e.target.value)}
              mb={5}
            >
              <option value="0">Nữ</option>
              <option value="1">Nam</option>
              <option value="2">Khác</option>
            </Select>
            {/* <FormLabel htmlFor="roles">Nhân viên</FormLabel> */}
            <Button type="submit">Xác nhận</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
