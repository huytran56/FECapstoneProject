import React from "react";
import { useAppDispatch } from "@app/hook";
import { adminAction } from "@store/admin";
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
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export const ForgotPassword = () => {
  // let navigate = useNavigate()

  //   const validate = Yup.object({
  //     first_name: Yup.string().required("Không được để trống"),
  //     last_name: Yup.string().required("Không được để trống"),
  //     email: Yup.string()
  //       .email("Email is invalid")
  //       .required("Không được để trống"),
  //     password: Yup.string()
  //       .min(6, "Must be at least 6 characters")
  //       .required("Không được để trống"),
  //     phone_number: Yup.string().required("Không được để trống"),
  //     username: Yup.string().required("Không được để trống"),
  //     birthday: Yup.string().required("Không được để trống"),
  //   });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleOnClickLogin = async (value) => {
    dispatch(adminAction.addNewStaff({ createStaffPayload: value }));
    console.log("huy");
    router.push("/signup-wait");
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
      //   validationSchema={validate}
      onSubmit={handleOnClickLogin}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading fontSize={"3xl"}>Nhập email tài khoản</Heading>
                {/* <FormControl id="username">
                  <TextField label="Email" name="username" type="text" />
                </FormControl> */}
                <FormControl id="username">
                  <TextField label="Email" name="username" type="text" />
                </FormControl>
                {/* <FormControl id="username">
                  <TextField
                    label="Nhập mật khẩu mới"
                    name="username"
                    type="text"
                  />
                </FormControl>
                <FormControl id="username">
                  <TextField
                    label="Nhập lại mật khẩu mới"
                    name="username"
                    type="text"
                  />
                </FormControl> */}
                <Stack spacing={6}>
                  <Button colorScheme={"blue"} variant={"solid"} type="submit">
                    Xác nhận
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
