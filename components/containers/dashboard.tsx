import SidebarWithHeader from "@components/ui/sidebar";
import {
  AdminAccount,
  AdminVoucher,
  CarouselImage,
  EditAdmin,
} from "@components/ui/index";
import { useAppSelector } from "@app/hook";
import { selectNumberIndex } from "@store/admin";
import { AdminCategory } from "@components/ui";
import { AdminOrder } from "@components/ui/admin-order";
import { AdminProduct } from "@components/ui/admin-product";
import React from "react";
import BasicStatistics from "@components/ui/dasboard";

export const DashBoard = () => {
  const pageIndexSelector = useAppSelector(selectNumberIndex);

  return (
    <SidebarWithHeader>
      {pageIndexSelector === 2 ? (
        <AdminAccount />
      ) : pageIndexSelector === 5 ? (
        <AdminCategory />
      ) : pageIndexSelector === 3 ? (
        <AdminProduct />
      ) : pageIndexSelector === 6 ? (
        <AdminVoucher />
      ) : pageIndexSelector === 4 ? (
        <AdminOrder />
      ) : pageIndexSelector === 7 ? (
        <EditAdmin />
      ) : pageIndexSelector === 1 ? (
        <BasicStatistics />
      ) : null}
    </SidebarWithHeader>
  );
};
