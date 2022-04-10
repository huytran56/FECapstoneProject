import { useAppDispatch, useAppSelector } from "@app/hook";
import { Button, FormLabel, Input, useToast, VStack } from "@chakra-ui/react";
import { adminAction, selectIsChangePasswordSuccess } from "@store/admin";
import { Form, Formik } from "formik";
import { useEffect } from "react";

export function ChangePasswordForm() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const isChangePasswordSuccessSelector = useAppSelector(
    selectIsChangePasswordSuccess
  );
  const handleOnClickEditAccount = (value) => {
    dispatch(
      adminAction.setIsChangePasswordSuccess({
        isChangePasswordSuccess: true,
      })
    );
    console.log(Object.values(value));
    if (!Object.values(value).every((item) => item !== "")) {
      toast({
        title: "Nhập đầy đủ thông tin",
        description: "Vui lòng kiểm tra lại",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    if (value.newPassword !== value.repeatNewPassword) {
      toast({
        title: "Mật khẩu mới không khớp",
        description: "Vui lòng kiểm tra lại",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    dispatch(adminAction.preUpdatePassword({ changePasswordPayload: value }));
  };

  useEffect(() => {
    if (!isChangePasswordSuccessSelector) {
      toast({
        title: "Thay đổi mật khẩu không thành công",
        description: "Vui lòng kiểm tra lại",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  }, [isChangePasswordSuccessSelector]);

  return (
    <Formik
      initialValues={{
        newPassword: "",
        oldPassword: "",
        repeatNewPassword: "",
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickEditAccount}
    >
      {({ setFieldValue }) => (
        <Form>
          <VStack alignItems="flex-start">
            <FormLabel as="legend">Mật khẩu cũ</FormLabel>
            <Input
              type="password"
              placeholder="Enter old Password"
              name="oldPassword"
              onChange={(e) => {
                setFieldValue("oldPassword", e.target.value);
              }}
            />
            <FormLabel as="legend">Mật khẩu mới</FormLabel>
            <Input
              type="password"
              placeholder="Enter new Password"
              name="newPassword"
              onChange={(e) => {
                setFieldValue("newPassword", e.target.value);
              }}
            />
            <FormLabel as="legend">Nhập lại mật khẩu mới</FormLabel>
            <Input
              type="password"
              placeholder="Enter new Password"
              name="repeatNewPassword"
              onChange={(e) => {
                setFieldValue("repeatNewPassword", e.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
