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
          Chi ti???t ????n h??ng
        </Text>
        <br />
        <HStack>
          <Text fontWeight="semibold"> M?? ????n h??ng: </Text>
          <Text>{currentOrderSelector ? currentOrderSelector.id : null}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="semibold"> T??n t??i kho???n: </Text>
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
            <Text fontWeight="semibold">?????a ch???:</Text>
          </HStack>
          {currentAddressSelector ? (
            <VStack w="100%" alignItems="start">
              <Text fontSize="15px">
                {" "}
                {currentAddressSelector.street}, ph?????ng{" "}
                {currentAddressSelector.subDistrict}, qu???n{" "}
                {currentAddressSelector.district}, {currentAddressSelector.city}{" "}
                ,{currentAddressSelector.province}.
              </Text>
              <Text fontSize="15px">
                S??? ??i???n tho???i: {currentAddressSelector.phoneNumber}
              </Text>
            </VStack>
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
            <Text fontWeight="semibold">Ng??y thanh to??n: </Text>
            <Text>
              {currentOrderSelector ? currentOrderSelector.paymentDate : null}
            </Text>
          </HStack>
          <HStack>
            <Text fontWeight="semibold">Ng??y ?????t h??ng: </Text>
            <Text>
              {currentOrderSelector ? currentOrderSelector.orderDate : null}
            </Text>
          </HStack>
        </HStack>
        <HStack w="100%" justifyContent="space-between">
          <HStack>
            <Text fontWeight="semibold"> Gi?? tr??? h??ng: </Text>
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
            <Text fontWeight="semibold"> Ph?? v???n chuy???n: </Text>
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
          <Text fontWeight="semibold"> Gi?? tr??? t???ng: </Text>
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
          <Text fontWeight="semibold">Ph????ng th???c thanh to??n: </Text>
          <Text>
            {currentOrderSelector ? currentOrderSelector.payment : null}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight="semibold"> Tr???ng th??i ????n h??ng: </Text>
          {currentOrderSelector.orderStatus === "SUCCESSFUL" ? (
            <Text>Ho??n th??nh</Text>
          ) : currentOrderSelector.orderStatus === "UNSUCCESSFUL" ? (
            <Text>???? hu???</Text>
          ) : currentOrderSelector.orderStatus === "CONFIRMED" ? (
            <Text>???? x??c nh???n</Text>
          ) : currentOrderSelector.orderStatus === "PENDING" ? (
            <Text>??ang x??? l??</Text>
          ) : (
            ""
          )}
        </HStack>
        <HStack>
          <Text fontWeight="semibold"> Tr???ng th??i thanh to??n: </Text>
          {currentOrderSelector.paymentStatus === "SUCCESSFUL" ? (
            <Text>Th??nh c??ng</Text>
          ) : currentOrderSelector.paymentStatus === "UNSUCCESSFUL" ? (
            <Text>Kh??ng th??nh c??ng</Text>
          ) : currentOrderSelector.paymentStatus === "PENDING" ? (
            <Text>??ang x??? l??</Text>
          ) : (
            ""
          )}
        </HStack>
        <br />
        <Button onClick={() => handleOnClickDetailButton(currentOrderSelector)}>
          Xem chi ti???t ????n h??ng
        </Button>
        {/* <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>H??ng Trong Kho</Th>
            <Th>Size</Th>
            <Th>Sale t???i ??a</Th>
            <Th>Thao t??c</Th>
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
                      Ch???nh S???a
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
