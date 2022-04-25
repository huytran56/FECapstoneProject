import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { AiOutlineFileProtect, AiOutlineDollarCircle } from "react-icons/ai";
import { useAppDispatch } from "@app/hook";
import { useAppSelector } from "@app/hook";
import { adminAction, selectDashboard } from "@store/admin";

interface StatsCardProps {
  title: string;
  stat: number;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  const dispatch = useAppDispatch();
  const dashboardSelector = useAppSelector(selectDashboard);
  useEffect(() => {
    dispatch(adminAction.preSetDashboard({}));
  }, [dispatch]);
  console.log(dashboardSelector);
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Trong tháng 4, đã có:
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Đơn hàng"}
          stat={dashboardSelector ? dashboardSelector.numOfOrders : 0}
          icon={<AiOutlineFileProtect size={"3em"} />}
        />
        <StatsCard
          title={"Số đơn thành công"}
          stat={dashboardSelector ? dashboardSelector.numOfSuccessfulOrder : 0}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Số đơn đã xác nhận"}
          stat={dashboardSelector ? dashboardSelector.numOfConfirmedOrder : 0}
          icon={<AiOutlineDollarCircle size={"3em"} />}
        />
        <StatsCard
          title={"Đơn đang chờ xử lý"}
          stat={dashboardSelector ? dashboardSelector.numOfPendingOrder : 0}
          icon={<AiOutlineFileProtect size={"3em"} />}
        />
        <StatsCard
          title={"Số đơn bị huỷ"}
          stat={
            dashboardSelector ? dashboardSelector.numOfUnsuccessfulOrder : 0
          }
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Doanh thu"}
          stat={dashboardSelector ? dashboardSelector.totalSale : 0}
          icon={<AiOutlineDollarCircle size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
