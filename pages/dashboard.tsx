import { useAppDispatch, useAppSelector } from "@app/hook";
import { DashBoard } from "@components/containers/index";
import { AuthenticateLayout } from "@components/layout";
import { adminAction } from "@store/admin";
import { selectUserRole, userAction } from "@store/user";
import { useEffect } from "react";

export default function DashBoardPage() {
  return <DashBoard />;
}

DashBoardPage.Layout = AuthenticateLayout;
