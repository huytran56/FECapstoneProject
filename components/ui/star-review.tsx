import { HStack } from "@chakra-ui/layout";
import { Star } from "./star";

export function StarReview() {
  return (
    <HStack>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star index={index} key={index} />
      ))}
    </HStack>
  );
}
