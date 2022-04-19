import {
  VStack,
  Text,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarReview } from "./star-review";

export default function AddReview() {
  return (
    <VStack w="100%" alignItems="start">
      <Text fontWeight="bold" fontSize="25px">
        Đánh giá sản phẩm
      </Text>
      <StarReview />
      <br />
      <Text>Nhận xét</Text>
      <Input type="text" w="500px" h="100px" variant="outline" />
      <Button
        type="submit"
        bg={useColorModeValue("gray.900", "gray.50")}
        color={useColorModeValue("white", "gray.900")}
      >
        Gửi đánh giá
      </Button>
    </VStack>
  );
}
