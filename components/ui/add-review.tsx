import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  VStack,
  Text,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  selectCurrentOrderDetail,
  selectCurrentOrderDetailPopup,
  selectCurrentProductSKUs,
  selectStarReview,
  userAction,
} from "@store/user";
import { useEffect, useState } from "react";
import { StarReview } from "./star-review";

export default function AddReview() {
  const dispatch = useAppDispatch();
  const currentOrderDetailSelector = useAppSelector(selectCurrentOrderDetail);
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  // const currentOrderDetailPopupSelector = useAppSelector(
  //   selectCurrentOrderDetailPopup
  // );
  const starReviewSelector = useAppSelector(selectStarReview);
  const productSKUSelector = useAppSelector(selectCurrentProductSKUs);
  console.log(value);
  console.log(currentOrderDetailSelector.id);
  console.log(productSKUSelector);
  console.log(starReviewSelector);
  function handleOnClickButtonReview() {
    dispatch(
      userAction.preAddReview({
        addReviewPayload: {
          description: value,
          numberRating: starReviewSelector,
          orderId: currentOrderDetailSelector.id,
          productSKUId: productSKUSelector,
        },
      })
    );
  }

  // useEffect(() => {
  //   console.log({ currentOrderDetailPopupSelector });
  // }, [dispatch, currentOrderDetailPopupSelector]);
  return (
    <VStack w="100%" alignItems="start">
      <Text fontWeight="bold" fontSize="25px">
        Đánh giá sản phẩm
      </Text>
      <StarReview />
      <br />
      <Text>Nhận xét</Text>
      <Input
        type="text"
        w="500px"
        h="100px"
        variant="outline"
        value={value}
        onChange={handleChange}
      />
      <Button
        type="submit"
        bg={useColorModeValue("gray.900", "gray.50")}
        color={useColorModeValue("white", "gray.900")}
        onClick={handleOnClickButtonReview}
      >
        Gửi đánh giá
      </Button>
    </VStack>
  );
}
