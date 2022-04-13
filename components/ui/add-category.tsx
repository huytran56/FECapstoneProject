import { useAppDispatch } from "@app/hook";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { adminAction } from "@store/admin";
import { Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";
import * as Yup from "yup";
import { ModalGeneralTwo } from "./modal";
import { AddStaff } from "./add-staff";

export function AddCategory() {
  const validate = Yup.object({
    category_name: Yup.string().required("Không được bỏ trống"),
  });
  const dispatch = useAppDispatch();
  const handleOnClickAddNewCategory = ({ category_name }) => {
    console.log(category_name);
    dispatch(
      adminAction.preCreateCategoryList({
        createCategoryPayload: { category_name },
      })
    );
  };
  function handleOnClickButton() {
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
  }
  return (
    <Formik
      initialValues={{
        category_name: "",
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddNewCategory}
      validationSchema={validate}
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
