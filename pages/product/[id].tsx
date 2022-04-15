import { handleGetProductDetailFull } from "@api/auth-api";
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

import { MainLayout } from "@components/layout";

import React, { useState } from "react";
import { useAppDispatch } from "@app/hook";
import { userAction } from "@store/user";

export default function ProductDetail({
  productImage,
  price,
  product_name,
  product_status_id,
  productSKUs,
  description_details,
  category,
}: IProductFull) {
  const dispatch = useAppDispatch();
  const [productSKUId, setProductSKUId] = useState("");
  const [quantity, setQuantity] = useState(0);
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
  console.log(quantity);
  return (
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

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  if (typeof id === "string") {
    const product_detail = await handleGetProductDetailFull({ product_id: id });
    if (!product_detail) return { notFound: true };
    if (product_detail) return { props: { ...product_detail } };
  }

  return { notFound: true };
};
ProductDetail.Layout = MainLayout;
