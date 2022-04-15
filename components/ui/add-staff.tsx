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
    password: Yup.string().required("Không được bỏ trống"),
    phone_number: Yup.string().required("Không được bỏ trống"),
    username: Yup.string().required("Không được bỏ trống"),
  });
  const dispatch = useAppDispatch();
  const handleOnClickAddNewStaff = (value) => {
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
          <Stack>
            <TextField label="Username" name="username" type="text" />
            <TextField label="Mật Khẩu" name="password" type="password" />
            <TextField label="Email" name="email" type="text" />
            <TextField label="Ngày sinh" name="birthday" type="date" />
            <TextField label="Số điện thoại" name="phone_number" type="text" />
            <TextField label="Họ" name="last_name" type="text" />
            <TextField label="Tên" name="first_name" type="text" />
            <Select
              placeholder="Giới tính"
              name="gender_id"
              onChange={(e) => setFieldValue("gender_id", e.target.value)}
            >
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
            </Select>
            <FormLabel htmlFor="roles">Role Staff</FormLabel>
            <Button type="submit">Xác nhận</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
