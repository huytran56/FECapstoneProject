import { useAppDispatch } from "@app/hook";
import { Button, Select, Stack } from "@chakra-ui/react";
import { adminAction } from "@store/admin";
import { Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";
import * as Yup from "yup";

export function AddVoucher() {
  const validate = Yup.object({
    code: Yup.string().required("Không được bỏ trống"),
    name: Yup.string().required("Không được bỏ trống"),
    description: Yup.string().required("Không được bỏ trống"),
    minSpend: Yup.string().required("Không được bỏ trống"),
    maxDiscount: Yup.number().required("Không được bỏ trống"),
    discountAmount: Yup.string().required("Không được bỏ trống"),
    active: Yup.string().required("Không được bỏ trống"),
  });
  const dispatch = useAppDispatch();
  const handleOnClickAddNewVoucher = (value) => {
    console.log(value);
    dispatch(
      adminAction.preSetCreateVoucherList({
        createVoucherPayLoad: value,
      })
    );
  };
  return (
    <Formik
      initialValues={{
        id: 0,
        code: "",
        name: "",
        description: "",
        type: "",
        minSpend: 0,
        maxDiscount: 0,
        discountAmount: 0,
        active: "",
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddNewVoucher}
      validationSchema={validate}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <TextField label="Code" name="code" type="text" />
            <TextField label="name" name="name" type="text" />
            <TextField label="description" name="description" type="text" />
            <Select
              placeholder="type"
              name="type"
              onChange={(e) => setFieldValue("type", e.target.value)}
            >
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="FIX_VALUE">FIX_VALUE</option>
            </Select>
            <TextField label="minSpend" name="minSpend" type="number" />
            <TextField label="maxDiscount" name="maxDiscount" type="number" />
            <TextField
              label="discountAmount"
              name="discountAmount"
              type="number"
            />
            <TextField label="active" name="active" type="active" />
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
