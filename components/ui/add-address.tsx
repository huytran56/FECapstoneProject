import { useAppDispatch } from "@app/hook";
import {
  Button,
  HStack,
  Stack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { adminAction } from "@store/admin";
import { Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";
import * as Yup from "yup";
import { ModalGeneralTwo } from "./modal";
import { AddStaff } from "./add-staff";
import { userAction } from "@store/user";

export function AddAddress() {
  //   const validate = Yup.object({
  //     category_name: Yup.string().required("Không được bỏ trống"),
  //   });
  const dispatch = useAppDispatch();
  //   const handleOnClickAddNewCategory = ({ category_name }) => {
  //     console.log(category_name);
  //     dispatch(
  //       adminAction.preCreateCategoryList({
  //         createCategoryPayload: { category_name },
  //       })
  //     );
  //   };
  const handleOnClickAddNewAddress = (value) => {
    dispatch(userAction.preSetAddNewAddress({ addNewAddressPayload: value }));
  };
  function handleOnClickButton() {
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
  }
  return (
    <Formik
      initialValues={{
        city: "",
        district: "",
        id: 0,
        phoneNumber: "",
        postalCode: "",
        province: "",
        receiverName: "",
        street: "",
        subDistrict: "",
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddNewAddress}
      //   validationSchema={validate}
    >
      {({ setFieldValue }) => (
        <Form>
          <VStack>
            <HStack w="100%" justifyContent="space-between">
              <TextField
                label="Tên người nhận"
                name="receiverName"
                type="text"
              />
              <TextField label="Số điện thoại" name="phoneNumber" type="text" />
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <TextField label="Đường" name="street" type="text" />
              <TextField label="Phường" name="subDistrict" type="text" />
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <TextField label="Quận" name="district" type="text" />
              <TextField label="Thành phố" name="city" type="text" />
              <TextField label="Tỉnh " name="province" type="text" />
            </HStack>
            <TextField label="Mã bưu chính" name="postalCode" type="text" />
          </VStack>
          <Button type="submit" bg={"gray.900"} color={"white"}>
            Xác nhận
          </Button>
        </Form>
      )}
    </Formik>
  );
}
