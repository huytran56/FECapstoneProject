import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Button,
  Divider,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ModalGeneral } from "@components/ui/index";
import {
  adminAction,
  selectIsAddNewState,
  selectOrderList,
} from "@store/admin";
import React, { useEffect } from "react";
import { ChangeStatus } from "./change-status-order";
import { ViewOrder } from "./view-orderitem";

export function AdminOrder() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetOrderList({}));
  }, [dispatch]);
  const orderListSeclector = useAppSelector(selectOrderList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);

  const handleOnClickEditButton = (voucher) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(
      adminAction.setCurrentEditVoucher({ currentEditVoucher: voucher })
    );
  };
  const handleOnClickDeleteButton = (voucher) => {
    dispatch(
      adminAction.setDeleteVoucher({
        deleteVoucherPayLoad: { id: voucher.id },
      })
    );
  };
  const handleOnClickChangeStatusButton = (order) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(
      adminAction.setChangeStatusOrder({
        currentChangeStatusOrder: order,
      })
    );
  };
  const handleOnClickOrderItemButton = (order) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(adminAction.setCurrentOrderItem({ currentOrderItem: order }));
  };
  return (
    <Stack p={4} borderRadius="8px" border="1px solid #d8d8d8">
      <VStack alignItems="flex-start">
        <ModalGeneral>
          {isAddNewStateSelector ? <ViewOrder /> : <ChangeStatus />}
        </ModalGeneral>
        {/* <Button zIndex="0" colorScheme="linkedin" onClick={handleOnClickAddNew}>
          Thêm Order
        </Button> */}
      </VStack>
      <Divider orientation="horizontal" variant="solid" colorScheme="orange" />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Order Status</Th>
            <Th>username</Th>
            <Th>PaymentStatus</Th>
            <Th>OrderItem</Th>
            <Th>SubTotal</Th>
            <Th>VoucherCode</Th>
            <Th>Phí vận chuyển</Th>
            <Th>PaymentTotal</Th>
            <Th>OrderDate</Th>
            <Th>PaymentDate</Th>
            <Th>AddressID</Th>
            <Th>Thao Tác </Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderListSeclector
            ? orderListSeclector.map((order, index) => (
                <Tr key={index}>
                  <Td>{order.id}</Td>
                  <Td>{order.orderStatus}</Td>
                  <Td>{order.username}</Td>
                  <Td>{order.paymentStatus}</Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      onClick={() =>
                        handleOnClickOrderItemButton(order.orderItemDtos)
                      }
                    >
                      Xem OrderItem
                    </Button>
                  </Td>
                  <Td overflow="hidden" whiteSpace="nowrap">
                    {order.subTotal}
                  </Td>
                  <Td>{order.voucherCode}</Td>
                  <Td>{order.deliveryFeeTotal}</Td>
                  <Td>{order.paymentTotal}</Td>
                  <Td>{order.orderDate}</Td>
                  <Td>{order.paymentDate}</Td>
                  <Td>{order.addressId}</Td>
                  <Td>
                    <VStack alignItems="flex-start">
                      {/* <Button
                        minWidth="100"
                        marginTop="2"
                        colorScheme="red"
                        onClick={() => handleOnClickDeleteButton(order)}
                      >
                        Delete
                      </Button> */}
                      <Button
                        minWidth="100"
                        marginTop="2"
                        colorScheme="yellow"
                        onClick={() => handleOnClickChangeStatusButton(order)}
                      >
                        Đổi trạng thái
                      </Button>
                    </VStack>
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
