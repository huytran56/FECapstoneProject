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
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { AiOutlineFileProtect, AiOutlineDollarCircle } from "react-icons/ai";

interface StatsCardProps {
  title: string;
  stat: string;
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
          stat={"500"}
          icon={<AiOutlineFileProtect size={"3em"} />}
        />
        <StatsCard
          title={"Số đơn thành công"}
          stat={"300"}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Số đơn đã xác nhận"}
          stat={"450"}
          icon={<AiOutlineDollarCircle size={"3em"} />}
        />
        <StatsCard
          title={"Đơn đang chờ xử lý"}
          stat={"50"}
          icon={<AiOutlineFileProtect size={"3em"} />}
        />
        <StatsCard
          title={"Số đơn bị huỷ"}
          stat={"50"}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Doanh thu"}
          stat={"39.000.000"}
          icon={<AiOutlineDollarCircle size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
