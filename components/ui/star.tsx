import { useAppDispatch, useAppSelector } from "@app/hook";
import { StarIcon } from "@chakra-ui/icons";
import { selectStarReview, userAction } from "@store/user";

export function Star({ index }: { index: number }) {
  const dispatch = useAppDispatch();
  const onClickStar = (index) => {
    dispatch(userAction.setStarReview({ starReview: index }));
  };
  const starReviewSelector = useAppSelector(selectStarReview);
  return (
    <StarIcon
      color={index <= starReviewSelector ? "red.400" : "gray.100"}
      onClick={() => onClickStar(index)}
    />
  );
}
