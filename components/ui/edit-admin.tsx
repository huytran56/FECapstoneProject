import { IUserInformationRes } from "@api/auth-api";
import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  Button,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  adminAction,
  selectAdminEditInformation,
  selectUserInfo,
} from "@store/admin";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { ChangePasswordForm } from "./change-password-form";
import { ModalGeneral } from "./modal";
import { TextField } from "./textfield";

export function EditAdmin() {
  const dispatch = useAppDispatch();

  const handleOnClickEditAccount = (value) => {
    dispatch(
      adminAction.preUpdateAdminProfile({
        preUpdateAdminProfilePayload: adminEditInformationSelector,
      })
    );
  };
  const validate = () => {};
  const userInfoSelector = useAppSelector(selectUserInfo);
  const adminEditInformationSelector = useAppSelector(
    selectAdminEditInformation
  );

  const initialValues: IUserInformationRes = {
    id: adminEditInformationSelector?.id,
    email: adminEditInformationSelector?.email,
    first_name: adminEditInformationSelector?.first_name,
    last_name: adminEditInformationSelector?.last_name,
    phone_number: adminEditInformationSelector?.phone_number,
    gender_id: adminEditInformationSelector?.gender_id,
    username: adminEditInformationSelector?.username,
    birthday: adminEditInformationSelector?.birthday,
  };

  useEffect(() => {
    if (userInfoSelector)
      dispatch(
        adminAction.setEditAdminInformation({
          adminEditInformation: userInfoSelector,
        })
      );
  }, [userInfoSelector, dispatch]);

  const onClickChangePassword = () => {
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  };

  return (
    <>
      <ModalGeneral>
        <ChangePasswordForm />
      </ModalGeneral>
      <Button colorScheme="red" onClick={onClickChangePassword}>
        Đổi mật khẩu
      </Button>
      <Formik
        initialValues={initialValues}
        //   validationSchema={validate}
        onSubmit={handleOnClickEditAccount}
      >
        {({ setFieldValue }) => (
          <Form>
            <Stack border="1px solid #d8d8d8" p={4} borderRadius="8px" my={4}>
              <TextField
                label="Username"
                name="username"
                type="text"
                value={adminEditInformationSelector?.username}
                onChange={(e) => {
                  dispatch(
                    adminAction.setEditAdminInformation({
                      adminEditInformation: {
                        ...adminEditInformationSelector,
                        username: e.target.value,
                      },
                    })
                  );
                  setFieldValue("username", e.target.value);
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="text"
                value={adminEditInformationSelector?.email}
                onChange={(e) => {
                  dispatch(
                    adminAction.setEditAdminInformation({
                      adminEditInformation: {
                        ...adminEditInformationSelector,
                        email: e.target.value,
                      },
                    })
                  );
                  setFieldValue("email", e.target.value);
                }}
              />
              <TextField
                label="First Name"
                name="first_name"
                type="text"
                value={adminEditInformationSelector?.first_name}
                onChange={(e) => {
                  dispatch(
                    adminAction.setEditAdminInformation({
                      adminEditInformation: {
                        ...adminEditInformationSelector,
                        first_name: e.target.value,
                      },
                    })
                  );
                  setFieldValue("first_name", e.target.value);
                }}
              />
              <TextField
                label="Last Name"
                name="last_name"
                type="text"
                value={adminEditInformationSelector?.last_name}
                onChange={(e) => {
                  dispatch(
                    adminAction.setEditAdminInformation({
                      adminEditInformation: {
                        ...adminEditInformationSelector,
                        last_name: e.target.value,
                      },
                    })
                  );
                  setFieldValue("last_name", e.target.value);
                }}
              />
              <TextField
                label="Phone Number"
                name="phone_number"
                type="text"
                value={adminEditInformationSelector?.phone_number}
                onChange={(e) => {
                  dispatch(
                    adminAction.setEditAdminInformation({
                      adminEditInformation: {
                        ...adminEditInformationSelector,
                        phone_number: e.target.value,
                      },
                    })
                  );
                  setFieldValue("phone_number", e.target.value);
                }}
              />
              <FormLabel as="legend">Giới tính</FormLabel>
              <RadioGroup
                defaultValue={adminEditInformationSelector?.gender_id.toString()}
                name="gender_id"
                onChange={(e) => {
                  dispatch(
                    adminAction.setEditAdminInformation({
                      adminEditInformation: {
                        ...adminEditInformationSelector,
                        gender_id: +e,
                      },
                    })
                  );
                  setFieldValue("gender_id", +e);
                }}
              >
                <HStack spacing="24px">
                  <Radio value="0">Nữ</Radio>
                  <Radio value="1">Nam</Radio>
                </HStack>
              </RadioGroup>
              <Button type="submit">Submit</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
