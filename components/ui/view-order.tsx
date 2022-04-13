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
  selectCurrentViewOrder,
  selectProductDetailFull,
} from "@store/admin";
import React, { useEffect, useState } from "react";
import { EditProductSKU, ModalGeneralTwo } from ".";

export function ViewOrders() {
  const dispatch = useAppDispatch();
  //   dispatch(adminAction.preSetCurrentViewOrder({}));
  const currentOrderSelector = useAppSelector(selectCurrentViewOrder);
  console.log(currentOrderSelector);

  //   useEffect(() => {
  //     dispatch(
  //       adminAction.preSetProductDetailFull({
  //         productDetailFullPayLoad: currentProductSelector.product_id,
  //       })
  //     );
  //   }, []);
  //   function handleOnClickUpdateButton(productSKU) {
  //     console.log(productSKU);
  //     dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
  //     dispatch(
  //       adminAction.setCurrentProductSKU({ currentProductSKU: productSKU })
  //     );
  //   }
  const validate = () => {};

  return (
    <Stack>
      <ModalGeneralTwo>
        <EditProductSKU />
      </ModalGeneralTwo>
      <Stack alignItems="center">
        <Text fontSize="xl">Chi tiết đơn hàng</Text>
      </Stack>
      <HStack justifyContent="space-between">
        <HStack>
          <Text> - ID: </Text>
          <Text>{currentOrderSelector ? currentOrderSelector.id : null}</Text>
        </HStack>
        <HStack>
          <Text> - Tên tài khoản: </Text>
          <Text>
            {currentOrderSelector ? currentOrderSelector.username : null}
          </Text>
        </HStack>
      </HStack>
      <HStack>
        <Text> - Trạng thái đơn hàng: </Text>
        <Text>
          {currentOrderSelector ? currentOrderSelector.orderStatus : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Trạng thái thanh toán: </Text>
        <Text>
          {currentOrderSelector ? currentOrderSelector.paymentStatus : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Phương thức thanh toán: </Text>
        <Text>
          {currentOrderSelector ? currentOrderSelector.payment : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Ngày thanh toán: </Text>
        <Text>
          {currentOrderSelector ? currentOrderSelector.paymentDate : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Ngày đặt hàng: </Text>
        <Text>
          {currentOrderSelector ? currentOrderSelector.orderDate : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Giá trị hàng: </Text>
        <Text>
          {currentOrderSelector
            ? currentOrderSelector.subTotal.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Phí vận chuyển: </Text>
        <Text>
          {currentOrderSelector
            ? currentOrderSelector.deliveryFeeTotal.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            : null}
        </Text>
      </HStack>
      <HStack>
        <Text> - Giá trị tổng: </Text>
        <Text>
          {currentOrderSelector
            ? currentOrderSelector.paymentTotal.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            : null}
        </Text>
      </HStack>
      {/* <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Hàng Trong Kho</Th>
            <Th>Size</Th>
            <Th>Sale tối đa</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody> */}
      {/* {productDetailFullSelector
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
            : null} */}
      {/* </Tbody>
      </Table> */}
      ;
    </Stack>
  );
}
