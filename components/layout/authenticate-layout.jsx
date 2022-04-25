import { useAppDispatch } from "@app/index";
import { useAppSelector } from "@app/index";
import { Box } from "@chakra-ui/react";
import {
  selectErrorPopup,
  selectSuccessPopup,
  selectWarningPopup,
  adminAction,
} from "@store/admin";
import { userAction, selectIsFirstGetRole } from "@store/user";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { selectUserRole } from "@store/user";
import { useRouter } from "next/router";

export const AuthenticateLayout = ({ children }) => {
  const errorPopupSelector = useAppSelector(selectErrorPopup);
  const successPopupSelector = useAppSelector(selectSuccessPopup);
  const warningPopupSelector = useAppSelector(selectWarningPopup);
  const isFirstGetRoleSelector = useAppSelector(selectIsFirstGetRole);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();
  const ERROR = {
    "Error: Email is already taken!": "Email đã tồn tại!",
    "Error: Username is already taken!": "Tài khoản đã tồn tại",
    "Error: Category has already existed": "Tên danh mục đã tồn tại",
    "Error: Product id is existed in database.": "Mã sản phẩm đã tồn tại",
    "Error: Code has already existed.": "Mã giảm giá đã tồn tại",
  };

  useEffect(() => {
    if (errorPopupSelector) {
      toast({
        title: "Lỗi",
        description: ERROR[errorPopupSelector],
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        dispatch(adminAction.setError({ errorPopup: null }));
      }, 2000);
    }
  }, [dispatch, errorPopupSelector]);
  useEffect(() => {
    if (successPopupSelector) {
      toast({
        title: "Thành Công",
        description: successPopupSelector,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        dispatch(adminAction.setSuccess({ successPopup: null }));
      }, 2000);
    }
  }, [dispatch, successPopupSelector]);
  useEffect(() => {
    if (warningPopupSelector) {
      toast({
        title: "Thông báo",
        description: warningPopupSelector,
        status: "warning",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        dispatch(adminAction.setWarning({ warningPopup: null }));
      }, 2000);
    }
  }, [dispatch, warningPopupSelector]);

  const userRoleSelector = useAppSelector(selectUserRole);

  useEffect(() => {
    dispatch(adminAction.preSetUserInfo({}));
  }, [dispatch]);
  useEffect(() => {
    dispatch(userAction.preSetUserRole({}));
  }, [dispatch]);

  useEffect(() => {
    if (
      !(
        userRoleSelector.includes("ROLE_ADMIN") ||
        userRoleSelector.includes("ROLE_STAFF")
      ) &&
      !isFirstGetRoleSelector
    ) {
      router.push("/signin");
    }
  }, [userRoleSelector]);

  return (
    <Box width="100vw" height="100vh">
      {userRoleSelector.includes("ROLE_ADMIN") ||
      userRoleSelector.includes("ROLE_STAFF")
        ? children
        : null}
    </Box>
  );
};
