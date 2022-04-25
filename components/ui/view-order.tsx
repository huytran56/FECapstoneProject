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
  Divider,
} from "@chakra-ui/react";
import { IProductSKU } from "@models/admin";
import {
  adminAction,
  selectCurrentOrderItem,
  selectCurrentProduct,
  selectCurrentViewOrder,
  selectIsAddNewState,
  selectProductDetailFull,
} from "@store/admin";
import { selectCurrentAdress, userAction } from "@store/user";
import Order from "pages/order";
import React, { useEffect, useState } from "react";
import {
  EditProductSKU,
  ModalGeneralTwo,
  OrderHistoryDetail,
  OrderHistoryDetailAdmin,
} from ".";

export function ViewOrders() {
  const dispatch = useAppDispatch();
  //   dispatch(adminAction.preSetCurrentViewOrder({}));
  const currentOrderSelector = useAppSelector(selectCurrentViewOrder);
  

  // console.log(currentOrderSelector);
  useEffect(() => {
    dispatch(
      userAction.preSetCurrentAddress({
        addressByIdPayload: currentOrderSelector.addressId,
      })
    );
  }, [dispatch]);
  const currentAddressSelector = useAppSelector(selectCurrentAdress);
  console.log(currentAddressSelector);

  function handleOnClickDetailButton(currentOrderSelector) {
    // console.log("click");
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
    dispatch(
      userAction.preSetCurrentOrderDetailPopup({
        currentOrderDetailPayload: currentOrderSelector,
      })
    );
    dispatch(
      userAction.setCurrentOrderDetail({
        currentOrderDetailPayload: currentOrderSelector,
      })
    );
  }

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

  return (
    <Stack>
      <ModalGeneralTwo>
        <OrderHistoryDetailAdmin />
      </ModalGeneralTwo>
      <Stack alignItems="center">
        <Text fontSize="30px" fontWeight="bold">
          Chi tiết đơn hàng
        </Text>
        <br />
        <HStack>
          <Text fontWeight="semibold"> Mã đơn hàng: </Text>
          <Text>{currentOrderSelector ? currentOrderSelector.id : null}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="semibold"> Tên tài khoản: </Text>
          <Text>
            {currentOrderSelector ? currentOrderSelector.username : null}
          </Text>
        </HStack>
        <br />
        <HStack
          w="100%"
          alignItems="flex-start"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
          p={1}
        >
          <HStack w="15%">
            <Text fontWeight="semibold">Địa chỉ:</Text>
          </HStack>
          {currentAddressSelector ? (
            <Text fontSize="15px">
              {" "}
              {currentAddressSelector.street}, phường{" "}
              {currentAddressSelector.subDistrict}, quận{" "}
              {currentAddressSelector.district}, {currentAddressSelector.city} ,
              {currentAddressSelector.province}
            </Text>
          ) : (
            ""
          )}
        </HStack>
      </Stack>
      <VStack
        boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
        p={4}
      >
        <HStack w="100%" justifyContent="space-between">
          <HStack>
            <Text fontWeight="semibold">Ngày thanh toán: </Text>
            <Text>
              {currentOrderSelector ? currentOrderSelector.paymentDate : null}
            </Text>
          </HStack>
          <HStack>
            <Text fontWeight="semibold">Ngày đặt hàng: </Text>
            <Text>
              {currentOrderSelector ? currentOrderSelector.orderDate : null}
            </Text>
          </HStack>
        </HStack>
        <HStack w="100%" justifyContent="space-between">
          <HStack>
            <Text fontWeight="semibold"> Giá trị hàng: </Text>
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
            <Text fontWeight="semibold"> Phí vận chuyển: </Text>
            <Text>
              {currentOrderSelector
                ? currentOrderSelector.deliveryFeeTotal.toLocaleString(
                    "it-IT",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )
                : null}
            </Text>
          </HStack>
        </HStack>
        <HStack>
          <Text fontWeight="semibold"> Giá trị tổng: </Text>
          <Text>
            {currentOrderSelector
              ? currentOrderSelector.paymentTotal.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
              : null}
          </Text>
        </HStack>
        <br />
        <Divider />
        <br />
        <HStack>
          <Text fontWeight="semibold">Phương thức thanh toán: </Text>
          <Text>
            {currentOrderSelector ? currentOrderSelector.payment : null}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="semibold"> Trạng thái đơn hàng: </Text>
          {currentOrderSelector.orderStatus === "SUCCESSFUL" ? (
            <Text>Hoàn thành</Text>
          ) : currentOrderSelector.orderStatus === "UNSUCCESSFUL" ? (
            <Text>Đã huỷ</Text>
          ) : currentOrderSelector.orderStatus === "CONFIRMED" ? (
            <Text>Đã xác nhận</Text>
          ) : currentOrderSelector.orderStatus === "PENDING" ? (
            <Text>Đang xử lý</Text>
          ) : (
            ""
          )}
        </HStack>
        <HStack>
          <Text fontWeight="semibold"> Trạng thái thanh toán: </Text>
          {currentOrderSelector.paymentStatus === "SUCCESSFUL" ? (
            <Text>Thành công</Text>
          ) : currentOrderSelector.paymentStatus === "UNSUCCESSFUL" ? (
            <Text>Không thành công</Text>
          ) : currentOrderSelector.paymentStatus === "PENDING" ? (
            <Text>Đang xử lý</Text>
          ) : (
            ""
          )}
        </HStack>
        <br />
        <Button onClick={() => handleOnClickDetailButton(currentOrderSelector)}>
          Xem chi tiết đơn hàng
        </Button>
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
      </VStack>
    </Stack>
  );
}
