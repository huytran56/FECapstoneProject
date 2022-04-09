import { useAppDispatch } from "@app/hook";
import { Button, Stack } from "@chakra-ui/react";
import { adminAction } from "@store/admin";
import { Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";

export function AddCategory() {
  const dispatch = useAppDispatch();
  const handleOnClickAddNewCategory = ({ category_name }) => {
    console.log(category_name);
    dispatch(
      adminAction.preCreateCategoryList({
        createCategoryPayload: { category_name },
      })
    );
  };
  return (
    <Formik
      initialValues={{
        category_name: "",
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddNewCategory}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <TextField label="Category" name="category_name" type="text" />
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
