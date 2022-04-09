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
} from "@chakra-ui/react";
import { adminAction, selectCurrentEditAccount } from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";

export function EditAccount() {
  const dispatch = useAppDispatch();
  const handleOnClickEditAccount = (value) => {
    value.roles = value.roles.split(",");
    dispatch(adminAction.editRoleAccount({ editRoleAccountPayload: value }));
  };
  const validate = () => {};
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
              label="Username"
              name="username"
              type="text"
              value={currentEditAccountSelector.username}
            />
            <TextField
              label="Roles"
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
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
