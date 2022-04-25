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
  selectIsAddNewState,
  selectProductDetailFull,
  selectProductSKUList,
} from "@store/admin";
import { selectUserRole } from "@store/user";
import React, { useEffect, useState } from "react";
import { AiOutlineFileAdd, AiFillPlusCircle, AiFillEdit } from "react-icons/ai";
import { AddProductSKU, EditProductSKU, ModalGeneralTwo } from ".";

export function ViewProduct() {
  const dispatch = useAppDispatch();
  const currentProductSelector = useAppSelector(selectCurrentProduct);
  const productDetailFullSelector = useAppSelector(selectProductDetailFull);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
  const userRoleSelector = useAppSelector(selectUserRole);

  useEffect(() => {
    dispatch(
      adminAction.preSetProductDetailFull({
        productDetailFullPayLoad: currentProductSelector.product_id,
      })
    );
  }, [dispatch]);
  function handleOnClickUpdateButton(productSKU) {
    console.log(productSKU);
    dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
    dispatch(
      adminAction.setCurrentProductSKU({ currentProductSKU: productSKU })
    );
  }
  function handleOnClickAddButton(id) {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
    dispatch(adminAction.setCurrentProductId({ productIdPayload: id }));
  }

  // console.log(productDetailFullSelector);
  const validate = () => {};

  return (
    <Stack>
      <ModalGeneralTwo>
        {isAddNewStateSelector ? <AddProductSKU /> : <EditProductSKU />}
      </ModalGeneralTwo>
      <VStack>
        <Stack alignItems="center">
          <Text fontSize="30px" fontWeight="bold">
            Chi tiết sản phẩm
          </Text>
        </Stack>
        <HStack>
          <Text fontWeight="bold"> - ID: </Text>
          <Text>
            {productDetailFullSelector
              ? productDetailFullSelector.product_id
              : null}
          </Text>
        </HStack>
      </VStack>
      <br />
      <Stack
        w="100%"
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        p={4}
      >
        <HStack>
          <Text fontWeight="bold"> - Tên sản phẩm: </Text>
          <Text>
            {productDetailFullSelector
              ? productDetailFullSelector.product_name
              : null}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold"> - Tên danh mục: </Text>
          <Text>
            {productDetailFullSelector
              ? productDetailFullSelector.category[0].category_name
              : null}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="bold"> - Trạng thái sản phẩm: </Text>
          <Text>
            {productDetailFullSelector
              ? productDetailFullSelector.product_status_id
              : null}
          </Text>
        </HStack>
        <VStack w="100%" alignItems="start">
          <Text fontWeight="bold"> - Mô tả sản phẩm: </Text>
          <Text>
            {productDetailFullSelector
              ? productDetailFullSelector.description_details
              : null}
          </Text>
        </VStack>
        <HStack>
          <Text fontWeight="bold"> - Giá tiền: </Text>
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
          {productDetailFullSelector
            ? productDetailFullSelector.productImage.map((image, index) => (
                <Image
                  src={image.url}
                  w="100px"
                  h="100px"
                  alt="image1"
                  key={index}
                />
              ))
            : null}
        </HStack>
      </Stack>
      {userRoleSelector.map((role) => {
        if (role === "ROLE_ADMIN") {
          return (
            <Button
              colorScheme="linkedin"
              w="50px"
              onClick={() =>
                handleOnClickAddButton(productDetailFullSelector.product_id)
              }
            >
              <AiFillPlusCircle size="25px" />
            </Button>
          );
        }
      })}
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Hàng Trong Kho</Th>
            <Th>Size</Th>
            <Th>Sale tối đa</Th>
            {userRoleSelector.map((role) => {
              if (role === "ROLE_ADMIN") {
                return <Th>Thao tác</Th>;
              }
            })}
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
                  {userRoleSelector.map((role) => {
                    if (role === "ROLE_ADMIN") {
                      return (
                        <Td>
                          <Button
                            colorScheme="twitter"
                            onClick={() =>
                              handleOnClickUpdateButton(productSKU)
                            }
                          >
                            <AiFillEdit fontSize={25} />
                          </Button>
                        </Td>
                      );
                    }
                  })}
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
      ;
    </Stack>
  );
}
