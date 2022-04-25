import {
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export default function OrderSuccess() {
  const router = useRouter();
  return (
    <VStack>
      <Text fontWeight="bold" fontSize="40px">
        Đặt hàng thành công
      </Text>

      <AiFillCheckCircle color="green" fontSize="100px" />
      <br />
      <Text fontWeight="" fontSize="18px">
        Nhân viên shop sẽ liên lạc bạn để xác nhận
      </Text>
      <br />
      <Button
        onClick={() => router.push(`/`)}
        bg={useColorModeValue("gray.900", "gray.50")}
        color={useColorModeValue("white", "gray.900")}
      >
        Tiếp tục mua hàng
      </Button>
    </VStack>
  );
}
