import { useAppDispatch } from "@app/hook";
import { DashBoard } from "@components/containers/index";
import { adminAction } from "@store/admin";
import { useEffect } from "react";

export default function DashBoardPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetUserInfo({}));
  }, []);
  return <DashBoard />;
}
