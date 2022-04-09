import SidebarWithHeader from "@components/ui/sidebar";
import { AdminAccount } from "@components/ui/index";
import { useAppSelector } from "@app/hook";
import { selectNumberIndex } from "@store/admin";
import { AdminCategory } from "@components/ui";

export const DashBoard = () => {
  const pageIndexSelector = useAppSelector(selectNumberIndex);
  return (
    <SidebarWithHeader>
      {pageIndexSelector === 2 ? (
        <AdminAccount />
      ) : pageIndexSelector === 5 ? (
        <AdminCategory />
      ) : null}
    </SidebarWithHeader>
  );
};
