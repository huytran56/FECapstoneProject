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
  Checkbox,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { adminAction, selectCurrentEditAccount } from "@store/admin";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { TextField } from ".";

export function EditAccount() {
  const [roles, setRoles] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const handleOnClickEditAccount = (value) => {
    console.log(roles);
    console.log(value);
    // value.roles = value.roles.split(",");
    dispatch(
      adminAction.editRoleAccount({
        editRoleAccountPayload: { ...value, roles },
      })
    );
  };

  const currentEditAccountSelector = useAppSelector(selectCurrentEditAccount);
  return (
    <Formik
      initialValues={{
        roles: currentEditAccountSelector.roles,
        username: currentEditAccountSelector.username,
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickEditAccount}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <TextField
              label="Tên tài khoản"
              name="username"
              type="text"
              value={currentEditAccountSelector.username}
            />
            <VStack spacing={5} direction="row" w="100%" alignItems="start">
              <Text fontWeight="semibold" fontSize="16px">
                Vai trò
              </Text>
              <Checkbox
                colorScheme="green"
                value="admin"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRoles([...roles, e.target.value]);
                  } else {
                    const newList = roles.filter((c) => c !== e.target.value);
                    setRoles(newList);
                  }
                  // setFieldValue("category", category);
                }}
              >
                Quản trị viên
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="staff"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRoles([...roles, e.target.value]);
                  } else {
                    const newList = roles.filter((c) => c !== e.target.value);
                    setRoles(newList);
                  }
                  // setFieldValue("category", category);
                }}
              >
                Nhân viên
              </Checkbox>
              <Checkbox
                colorScheme="green"
                value="user"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRoles([...roles, e.target.value]);
                  } else {
                    const newList = roles.filter((c) => c !== e.target.value);
                    setRoles(newList);
                  }
                  // setFieldValue("category", category);
                }}
              >
                Người dùng
              </Checkbox>
            </VStack>
            {/* <OrderedList key={index}>
              <ListItem
                display="inline-block"
                width="45%"
                margin="0"
                padding="0"
                verticalAlign="top"
              >
                <Checkbox
                  name="roles"
                  value={
                    currentEditAccountSelector
                      ? currentEditAccountSelector.roles
                      : ""
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategory([...category, e.target.value]);
                    } else {
                      const newList = category.filter(
                        (c) => c !== e.target.value
                      );
                      setCategory(newList);
                    }
                    // setFieldValue("category", category);
                  }}
                >
                  {categoryTwo.category_name}
                </Checkbox>{" "}
              </ListItem>
            </OrderedList> */}
            {/* <TextField
              label="Vai trò"
              name="roles"
              type="text"
              value={
                currentEditAccountSelector
                  ? currentEditAccountSelector.roles
                  : ""
              }
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditAccount({
                    currentEditAccount: {
                      ...currentEditAccountSelector,
                      roles: e.target.value,
                    },
                  })
                );
                setFieldValue("roles", e.target.value);
              }}
            /> */}
            {/* <Checkbox defaultChecked>Quản trị viên</Checkbox>
            <Checkbox defaultChecked>Nhân viên</Checkbox>
            <Checkbox defaultChecked>Người dùng</Checkbox> */}
            <Button type="submit">Xác nhận</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
