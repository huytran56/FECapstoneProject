import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  Button,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  HStack,
  Image,
  Box,
} from "@chakra-ui/react";
import { IProductSKU } from "@models/admin";
import {
  adminAction,
  selectCurrentOrderItem,
  selectCurrentProduct,
  selectProductDetailFull,
} from "@store/admin";
import React, { useEffect, useState } from "react";
import { EditProductSKU, ModalGeneralTwo } from ".";

export function ViewProduct() {
  const dispatch = useAppDispatch();
  const currentProductSelector = useAppSelector(selectCurrentProduct);
  const productDetailFullSelector = useAppSelector(selectProductDetailFull);

  useEffect(() => {
    dispatch(
      adminAction.preSetProductDetailFull({
        productDetailFullPayLoad: currentProductSelector.product_id,
      })
    );
  }, []);
  function handleOnClickUpdateButton(productSKU) {
    console.log(productSKU);
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
    dispatch(
      adminAction.setCurrentProductSKU({ currentProductSKU: productSKU })
    );
  }

  console.log(productDetailFullSelector);
  const validate = () => {};

  return (
    <Stack>
      <ModalGeneralTwo>
        <EditProductSKU />
      </ModalGeneralTwo>
      <Stack alignItems="center">
        <Text fontSize="xl">Chi tiết sản phẩm</Text>
      </Stack>
      <HStack>
        <Text> - ID: </Text>
        <Text>
          {productDetailFullSelector
            ? productDetailFullSelector.product_id
            : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Tên sản phẩm: </Text>
        <Text>
          {productDetailFullSelector
            ? productDetailFullSelector.product_name
            : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Tên danh mục: </Text>
        <Text>
          {productDetailFullSelector
            ? productDetailFullSelector.category[0].category_name
            : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Trạng thái sản phẩm: </Text>
        <Text>
          {productDetailFullSelector
            ? productDetailFullSelector.product_status_id
            : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Mô tả sản phẩm: </Text>
        <Text>
          {productDetailFullSelector
            ? productDetailFullSelector.description_details
            : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Giá tiền: </Text>
        <Text>
          {productDetailFullSelector
            ? productDetailFullSelector.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            : null}
        </Text>
      </HStack>
      <HStack alignItems="center">
        <Image
          src={
            productDetailFullSelector
              ? productDetailFullSelector.productImage[0].url
              : null
          }
          w="100px"
          h="100px"
        />
        <Image
          src={
            productDetailFullSelector
              ? productDetailFullSelector.productImage[0].url
              : null
          }
          w="100px"
          h="100px"
        />
      </HStack>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Hàng Trong Kho</Th>
            <Th>Size</Th>
            <Th>Sale tối đa</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productDetailFullSelector
            ? productDetailFullSelector.productSKUs.map((productSKU, index) => (
                <Tr key={index}>
                  <Td>{productSKU.id}</Td>
                  <Td>{productSKU.stock}</Td>
                  <Td>{productSKU.size}</Td>
                  <Td>{productSKU.sale_limit}</Td>
                  <Td>
                    <Button
                      colorScheme="yellow"
                      onClick={() => handleOnClickUpdateButton(productSKU)}
                    >
                      Chỉnh Sửa
                    </Button>
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
      ;
    </Stack>
  );
}
