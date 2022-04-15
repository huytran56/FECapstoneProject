import { useAppDispatch, useAppSelector } from "@app/hook";
import { Button, Stack } from "@chakra-ui/react";
import { adminAction, selectCurrentEditCategory } from "@store/admin";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { TextField } from ".";

export function EditCategory() {
  const dispatch = useAppDispatch();
  const validate = () => {};
  const currentEditCategorySelector = useAppSelector(selectCurrentEditCategory);
  const [id, setId] = useState<string>("");
  const handleOnClickEditCategory = (value) => {
    console.log(value);
    dispatch(
      adminAction.preUpdateCategory({
        createCategoryPayload: {
          id,
          category_name: value.category_name,
        },
      })
    );
  };

  useEffect(() => {
    if (currentEditCategorySelector) {
      setId(currentEditCategorySelector.id);
    }
  }, [currentEditCategorySelector]);
  return (
    <Formik
      initialValues={{
        category_name: currentEditCategorySelector?.category_name,
        id: currentEditCategorySelector?.id,
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickEditCategory}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <TextField
              label="Danh mục"
              name="category_name"
              type="text"
              value={currentEditCategorySelector?.category_name}
              onChange={(e) => {
                dispatch(
                  adminAction.setCurrentEditCategory({
                    currentEditAccount: {
                      ...currentEditCategorySelector,
                      category_name: e.target.value,
                    },
                  })
                );
                setFieldValue("category_name", e.target.value);
              }}
            />
            <Button type="submit">Xác nhận</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
