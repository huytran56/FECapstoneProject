import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../ui";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";

import { handleSignIn, handleTest, handleGetAccount } from "@api/index";
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
  cookieStorageManager,
} from "@chakra-ui/react";
import { useAppDispatch } from "@app/index";
import { userAction } from "@store/user";

export const SignIn = () => {
  // let navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const validate = Yup.object({
    usernameOrEmail: Yup.string().required("Không được bỏ trống"),
    password: Yup.string()
      .min(6, "Cần ít nhất 6 kí tự")
      .required("Không được bỏ trống"),
  });

  function createCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  const handleOnClickLogin = async (value) => {
    dispatch(userAction.setIsFirstGetRole({ isFisrtGetRole: true }));
    const { password, usernameOrEmail } = value;
    const res = await handleSignIn({ password, usernameOrEmail });
    console.log(res);
    const { accessToken, roles } = res.token;
    console.log(roles);

    localStorage.setItem("token", accessToken);
    createCookie("token", accessToken);
    // console.log(localStorage.getItem("token"));
    if (!res.success) {
      console.log("Fail");
    } else {
      if (
        roles.includes("ROLE_USER") &&
        !roles.includes("ROLE_ADMIN") &&
        !roles.includes("ROLE_STAFF")
      ) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  };
  const handleTestClick = async (value) => {
    const res = await handleGetAccount();
    console.log(res);
  };

  return (
    <Formik
      initialValues={{
        usernameOrEmail: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={handleOnClickLogin}
    >
      {(formik) => (
        <Form>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading fontSize={"3xl"}>Đăng nhập vào tài khoản</Heading>
                <FormControl id="email">
                  <FormLabel>Tên tài khoản hoặc Email</FormLabel>
                  <TextField
                    // label="Email"
                    name="usernameOrEmail"
                    type="text"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Mật khẩu</FormLabel>
                  <TextField name="password" type="password" />
                </FormControl>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.500"}>Quên mật khẩu?</Link>
                  </Stack>
                  <Button colorScheme={"blue"} variant={"solid"} type="submit">
                    Đăng nhập
                  </Button>
                </Stack>
                <VStack width="100%">
                  <Text textAlign="center" fontSize="10" fontFamily="body">
                    Hoặc
                  </Text>
                  <Link
                    href="/signup"
                    textAlign="center"
                    fontSize="13"
                    fontFamily="body"
                  >
                    Đăng kí
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
