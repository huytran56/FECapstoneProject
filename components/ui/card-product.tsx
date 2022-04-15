import {
  VStack,
  Text,
  HStack,
  Stack,
  Button,
  Link,
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

export function CardProduct({
  product_id,
  product_status_id,
  product_name,
  price,
  imageUrl,
}) {
  const router = useRouter();
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {/* {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )} */}

        <Image
          src={imageUrl}
          alt={`Picture of ${product_name}`}
          roundedTop="lg"
          onClick={() => router.push(`/product/${product_id}`)}
          _hover={{ cursor: "pointer" }}
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {/* {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )} */}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              onClick={() => router.push(`/product/${product_id}`)}
              _hover={{ cursor: "pointer" }}
            >
              {product_name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
            <Box fontSize="xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg"></Box>
              {price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
{
  /* <Box
      boxShadow="rgba(100, 100, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      px="25px"
      py="40px"
      ml="auto"
      borderRadius="8px"
    >
      <VStack justifyContent="center">
        <Image
          src={imageUrl}
          alt={product_name}
          minWidth="300px"
          maxWidth="200px"
          w={{
            base: "300px", // 0-48em
            md: "300px", // 48em-80em,
            xl: "200px", // 80em+
          }}
          h={{ xl: "200px" }}
          borderRadius="8px"
          transition="all 0.5s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        <VStack alignItems="flex-start" mt={5}>
          <Link>
            <Text
              as="body"
              fontWeight="bold"
              fontSize="18"
              fontFamily="heading"
            >
              {product_name}
            </Text>
          </Link>
          {/* <Text fontWeight="light">{product_name}</Text> */
}
//     </VStack>
//     <Stack w="100%" justifyContent="space-between">
//       <VStack>
//         <Text fontWeight="bold" fontStyle="italic">
//           {price.toLocaleString("it-IT", {
//             style: "currency",
//             currency: "VND",
//           })}
//         </Text>
//         <Button>
//           <FaCartPlus size="30px" />
//         </Button>
//       </VStack>
//     </Stack>
//   </VStack>
// </Box> */}
