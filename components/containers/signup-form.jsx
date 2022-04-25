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
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export const SignUp = () => {
  // let navigate = useNavigate()

  const validate = Yup.object({
    first_name: Yup.string().required("Không được để trống"),
    last_name: Yup.string().required("Không được để trống"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Không được để trống"),
    password: Yup.string()
      .required("Không được bỏ trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số"
      ),
    phone_number: Yup.string().required("Không được bỏ trống"),
    // .matches(
    //   /((09|03|07|08|05)+([0-9]{8})\b)/g,
    //   "Đủ 10 số và bắt đầu bằng 0"
    // ),
    username: Yup.string().required("Không được để trống"),
    birthday: Yup.string().required("Không được để trống"),
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleOnClickLogin = async (value) => {
    // const { email, password } = value;
    // const res = await signin(email, password);
    // console.log(res.data.roles);
    // if (res.data.roles == "ROLE_ADMIN") {
    //   return navigate("/admin");
    // }
    dispatch(adminAction.addNewStaff({ createStaffPayload: value }));
    // console.log("huy");
    // router.push("/signup-wait");
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
      {({ setFieldValue }) => (
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
                <HStack>
                  <FormControl id="ho">
                    <FormLabel>Họ</FormLabel>
                    <TextField name="last_name" type="text" />
                  </FormControl>
                  <FormControl id="ten">
                    <FormLabel>Tên</FormLabel>
                    <TextField name="first_name" type="text" />
                  </FormControl>
                </HStack>
                <HStack>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <TextField name="email" type="text" />
                  </FormControl>
                  <FormControl id="birthday">
                    <FormLabel>Ngày Sinh</FormLabel>
                    <TextField name="birthday" type="date" />
                  </FormControl>
                </HStack>
                <HStack>
                  <FormControl id="password">
                    <FormLabel>Số điện thoại</FormLabel>
                    <TextField name="phone_number" type="number" />
                  </FormControl>
                  <FormControl id="gender_id">
                    <FormLabel mb={3}>Giới tính</FormLabel>
                    <Select
                      mt={5}
                      placeholder="Giới tính"
                      name="gender_id"
                      h="42px"
                      onChange={(e) =>
                        setFieldValue("gender_id", e.target.value)
                      }
                    >
                      <option value="0">Nam</option>
                      <option value="1">Nữ</option>
                    </Select>
                  </FormControl>
                </HStack>

                <Stack spacing={6}>
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
