import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "../ui";
import * as Yup from "yup";
import {
  Button,
  ButtonGroup,
  VStack,
  Text,
  Box,
  HStack,
  Stack,
  Link,
} from "@chakra-ui/react";

export const SignUp = () => {
  // let navigate = useNavigate()

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(15, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Required"),
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validate}
      onSubmit={handleOnClickLogin}
    >
      {(formik) => (
        <Form>
          <VStack
            alignItems="start"
            w="30%"
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            backgroundColor="white"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            borderRadius="8px"
            px="30px"
            py="10px"
          >
            <Text as="h1" fontWeight="bold" fontSize="30px" mx="auto" mb="20px">
              Sign Up
            </Text>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="Last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="Comfirm Password"
              name="confirmPassword"
              type="password"
            />

            <HStack fontSize="13" fontFamily="body" width="100%">
              <Link ml="auto">Forgot Password</Link>
            </HStack>
            <VStack alignItems="center" height="100" width="100%">
              <Button
                type="submit"
                width="100%"
                backgroundColor="#8EC5FC"
                backgroundImage="linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
              >
                Create
              </Button>
            </VStack>
            <VStack width="100%">
              <Text textAlign="center" fontSize="10" fontFamily="body">
                Or
              </Text>
              <Link href="/signin" textAlign="center" fontSize="13" fontFamily="body">
                Back to signin
              </Link>
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

//box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
