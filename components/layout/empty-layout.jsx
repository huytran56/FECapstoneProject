import { useAppDispatch } from "@app/index";
import { useAppSelector } from "@app/index";
import { Box } from "@chakra-ui/react";
import {
  selectErrorPopup,
  selectSuccessPopup,
  selectWarningPopup,
} from "@store/admin";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
export function EmptyLayout({ children }) {
  const errorPopupSelector = useAppSelector(selectErrorPopup);
  const successPopupSelector = useAppSelector(selectSuccessPopup);
  const warningPopupSelector = useAppSelector(selectWarningPopup);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const ERROR = {
    "Error: Email is already taken!": "Email đã tồn tại!",
    "Error: Username is already taken!": "Tài khoản đã tồn tại",
    "Error: Category has already existed": "Tên danh mục đã tồn tại",
    "Error: Product id is existed in database.": "Mã sản phẩm đã tồn tại",
    "Error: Code has already existed.": "Mã giảm giá đã tồn tại",
  };
  const SUCCESS = {};
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
    }
  }, [dispatch, warningPopupSelector]);
  return (
    <>
      <main>{children}</main>
    </>
  );
}
