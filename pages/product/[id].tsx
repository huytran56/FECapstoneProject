import {
  handleGetProductDetailFull,
  handleGetProductDetailFullServer,
} from "@api/auth-api";
import { IProductFull } from "@models/admin";
import { GetServerSideProps } from "next";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  ChakraProvider,
  Tag,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { AiOutlineUser, AiOutlineStar } from "react-icons/ai";

import { MainLayout } from "@components/layout";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  selectRecommendListByProduct,
  selectReviewList,
  userAction,
} from "@store/user";
import { adminAction, selectRecommendationList } from "@store/admin";
import { Carousel } from "@components/containers/carousel";
import { CardCategory } from "@components/ui";

export default function ProductDetail({
  productImage,
  price,
  product_name,
  product_status_id,
  productSKUs,
  description_details,
  category,
  product_id,
}: IProductFull) {
  const dispatch = useAppDispatch();
  const [productSKUId, setProductSKUId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(-1);
  function handleOnClickButtonSize(sku, index) {
    setProductSKUId(sku);
    setActive(index);
  }
  const handleChange = (quantity) => setQuantity(quantity);
  function handleOnClickAddToCart() {
    dispatch(
      userAction.preSetAddToCartItem({
        addToCardPayload: { quantity, productSKUId, price },
      })
    );
  }

  useEffect(() => {
    dispatch(
      userAction.preSetRecommendListByProduct({ productIDPayload: product_id })
    );
  }, [dispatch, product_id]);

  useEffect(() => {
    dispatch(
      userAction.preSetReviewList({ productIdReviewListPayload: product_id })
    );
  }, [dispatch]);

  const reviewListSelector = useAppSelector(selectReviewList);

  const recommendationListSelector = useAppSelector(
    selectRecommendListByProduct
  );
  console.log(recommendationListSelector);
  // console.log(recommendationListSelector);
  // console.log(quantity);
  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <ChakraProvider>
              <Container
                py={8}
                px={0}
                maxW={{
                  base: "100%",
                  sm: "35rem",
                  md: "43.75rem",
                  lg: "57.5rem",
                  xl: "75rem",
                  xxl: "87.5rem",
                }}
              >
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={productImage[0].url}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                />
              </Container>
            </ChakraProvider>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {product_name}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                {price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                {/* <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
               
              </Text> */}
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                >
                  Chọn Kích cỡ
                </Text>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  {productSKUs.map((sku, index) => (
                    <Button
                      m={3}
                      onClick={() => handleOnClickButtonSize(sku.id, index)}
                      isActive={active === index ? true : false}
                      key={index}
                    >
                      {sku.size}
                    </Button>
                  ))}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Mô tả
                </Text>
                <Text fontSize={"lg"}>{description_details}</Text>
                {/* {productSKUs.map(sku, index)=>(
                  

                  
              )} */}
              </Box>
            </Stack>
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              color={useColorModeValue("yellow.500", "yellow.300")}
              fontWeight={"500"}
              textTransform={"uppercase"}
            >
              Chọn số lượng
            </Text>
            <NumberInput
              size="md"
              defaultValue={1}
              min={1}
              w={100}
              onChange={handleChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={handleOnClickAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Carousel gap={10} header="Sản phẩm gợi ý">
        {recommendationListSelector
          ? recommendationListSelector.map((p, index) => (
              <CardCategory {...p} key={index} index />
            ))
          : null}
      </Carousel>

      <VStack
        boxShadow=" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        backgroundColor="white"
        marginTop="40px"
        w="100%"
        alignItems="start"
        p={4}
      >
        <Text fontWeight="bold" fontSize="20px">
          Đánh giá sản phẩm
        </Text>
        {reviewListSelector
          ? reviewListSelector.map((review, index) => (
              <VStack
                w="100%"
                alignItems="start"
                boxShadow="rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"
                borderRadius="20px"
                p={3}
                key={index}
              >
                <HStack>
                  <AiOutlineUser size={30} />
                  <Text>{review.fullname}</Text>
                </HStack>
                <HStack paddingLeft="35px">
                  <AiOutlineStar size="30px" color="orange" />
                  <Text>{review.numberRating}</Text>
                </HStack>
                <HStack paddingLeft="35px">
                  <Text fontWeight="medium">{review.description}</Text>
                </HStack>
                <br />
              </VStack>
            ))
          : null}

        {/* <VStack
          w="100%"
          alignItems="start"
          boxShadow="rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"
          borderRadius="20px"
          p={3}
        >
          <HStack>
            <AiOutlineUser size={30} />
            <Text>huytran</Text>
          </HStack>
          <HStack paddingLeft="35px">
            <AiOutlineStar size="30px" color="orange" />
            <Text>4</Text>
          </HStack>
          <HStack paddingLeft="35px">
            <Text fontWeight="medium">
              Áo đẹp, mình mua cho vợ và vợ mặc lên form rất xinh, sẽ ủng hộ
              shop thêm.
            </Text>
          </HStack>
          <br />
        </VStack> */}
      </VStack>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
  req,
}) => {
  const { id } = query;
  // console.log(id);
  console.log({ req: req.cookies.token });
  if (typeof id === "string") {
    const product_detail = await handleGetProductDetailFullServer({
      product_id: id,
      token: req.cookies.token,
    });
    // console.log(product_detail);

    if (!product_detail) return { notFound: true };
    if (product_detail) return { props: { ...product_detail } };
  }

  return { notFound: true };
};
ProductDetail.Layout = MainLayout;
