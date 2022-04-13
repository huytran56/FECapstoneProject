import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../ui";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";

export const SignUp = () => {
  // let navigate = useNavigate()

  const validate = Yup.object({
    firstname: Yup.string()
      .required("Không được để trống"),
    lastName: Yup.string()
      .required("Không được để trống"),
    email: Yup.string().email("Email is invalid").required("Không được để trống"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Không được để trống"),
    phone_number: Yup.string().required("Không được để trống")
  });

  const handleOnClickLogin = async (value) => {
    const { email, password } = value;
    const res = await signin(email, password);
    console.log(res.data.roles);
    if (res.data.roles == "ROLE_ADMIN") {
      return navigate("/admin");
    }
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
        roles: ["user"],
        username: "",
      }}
      validationSchema={validate}
      onSubmit={handleOnClickLogin}
    >
      {(formik) => (
        <Form>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading fontSize={"3xl"}>Đăng kí tài khoản mới</Heading>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <TextField
                    // label="Email"
                    name="username"
                    type="text"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Mật khẩu</FormLabel>
                  <TextField name="password" type="password" />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <TextField name="email" type="text" />
                </FormControl>
                <FormControl id="birthday">
                  <FormLabel>Ngày Sinh</FormLabel>
                  <TextField name="birthday" type="text" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Số điện thoại</FormLabel>
                  <TextField name="phone_number" type="number" />
                </FormControl>
                <FormControl id="ho">
                  <FormLabel>Họ</FormLabel>
                  <TextField name="last_name" type="text" />
                </FormControl>
                <FormControl id="ten">
                  <FormLabel>Mật khẩu</FormLabel>
                  <TextField name="first_name" type="text" />
                </FormControl>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"blue.500"}>Quên mật khẩu?</Link>
                  </Stack>
                  <Button colorScheme={"blue"} variant={"solid"} type="submit">
                    Đăng kí
                  </Button>
                </Stack>
                <VStack width="100%">
                  <Text textAlign="center" fontSize="10" fontFamily="body">
                    Hoặc
                  </Text>
                  <Link
                    href="/signin"
                    textAlign="center"
                    fontSize="13"
                    fontFamily="body"
                  >
                    Quay lại đăng nhập
                  </Link>
                </VStack>
              </Stack>
            </Flex>
            <Flex flex={1}>
              <Image
                alt={"Login Image"}
                objectFit={"cover"}
                src={
                  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                }
              />
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

//box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
