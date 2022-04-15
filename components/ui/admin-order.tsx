import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Badge,
  Button,
  Divider,
  HStack,
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
import { IOrder } from "@models/admin";
import {
  adminAction,
  selectCurrentViewOrder,
  selectIsAddNewState,
  selectOrderList,
} from "@store/admin";
import React, { useEffect } from "react";
import { ChangeStatus } from "./change-status-order";
import { ViewOrders } from "./view-order";
import { ViewOrder } from "./view-orderitem";
import { FaCircle, FaCheck, FaWindowClose, FaEye } from "react-icons/fa";

export function AdminOrder() {
  const dispatch = useAppDispatch();

  const orderListSeclector = useAppSelector(selectOrderList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
  const currentOrderSelector = useAppSelector(selectCurrentViewOrder);
  useEffect(() => {
    dispatch(adminAction.preSetOrderList({}));
  }, [dispatch]);

  const handleOnClickConfirm = ({ id, orderStatus, paymentStatus }: IOrder) => {
    dispatch(
      adminAction.preChangeStatusOrder({
        changeStatusOrderPayLoad: {
          id,
          orderStatus: "CONFIRMED",
          paymentStatus,
        },
      })
    );
  };

  const handleOnClickComplete = ({
    id,
    orderStatus,
    paymentStatus,
  }: IOrder) => {
    dispatch(
      adminAction.preChangeStatusOrder({
        changeStatusOrderPayLoad: {
          id,
          orderStatus: "SUCCESSFUL",
          paymentStatus: "SUCCESSFUL",
        },
      })
    );
  };
  const handleOnClickCancel = ({ id, orderStatus, paymentStatus }: IOrder) => {
    dispatch(
      adminAction.preChangeStatusOrder({
        changeStatusOrderPayLoad: {
          id,
          orderStatus: "UNSUCCESSFUL",
          paymentStatus: "UNSUCCESSFUL",
        },
      })
    );
  };
  // const handleOnClickEditButton = (voucher) => {
  //   dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
  //   dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  //   dispatch(
  //     adminAction.setCurrentEditVoucher({ currentEditVoucher: voucher })
  //   );
  // };
  // const handleOnClickDeleteButton = (voucher) => {
  //   dispatch(
  //     adminAction.setDeleteVoucher({
  //       deleteVoucherPayLoad: { id: voucher.id },
  //     })
  //   );
  // };

  const handleOnClickChangeStatusButton = (order) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(
      adminAction.setChangeStatusOrder({
        currentChangeStatusOrder: order,
      })
    );
  };
  // const handleOnClickOrderItemButton = (order) => {
  //   dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
  //   dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  //   dispatch(adminAction.setCurrentOrderItem({ currentOrderItem: order }));
  // };
  const handleOnclickViewOrderButton = (order) => {
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(adminAction.SetCurrentViewOrder({ currentViewOrder: order }));
  };
  return (
    <Stack p={4} borderRadius="8px" border="1px solid #d8d8d8">
      <VStack alignItems="flex-start">
        <ModalGeneral>
          <ViewOrders />
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
            <Th>Mã đơn hàng</Th>
            <Th textAlign="center">Trạng thái đơn hàng</Th>
            {/* <Th>username</Th> */}
            <Th textAlign="center">Trạng thái thanh toán</Th>
            {/* <Th>OrderItem</Th> */}
            {/* <Th>SubTotal</Th> */}
            {/* <Th>VoucherCode</Th> */}
            {/* <Th>Phí vận chuyển</Th> */}
            <Th>Tổng tiền</Th>
            {/* <Th>OrderDate</Th> */}
            {/* <Th>PaymentDate</Th> */}
            {/* <Th>AddressID</Th> */}
            <Th>Thao Tác </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderListSeclector
            ? orderListSeclector.map((order, index) => (
                <Tr key={index}>
                  <Td alignItems="center">{order.id}</Td>
                  {order.orderStatus === "SUCCESSFUL" ? (
                    <Td textAlign="center">
                      <Badge colorScheme="green" fontSize={15}>
                        Hoàn thành
                      </Badge>
                    </Td>
                  ) : order.orderStatus === "UNSUCCESSFUL" ? (
                    <Td textAlign="center">
                      <Badge colorScheme="red" fontSize={15}>
                        Đã huỷ
                      </Badge>
                    </Td>
                  ) : order.orderStatus === "CONFIRMED" ? (
                    <Td textAlign="center">
                      <Badge colorScheme="purple" fontSize={15}>
                        Đã xác nhận
                      </Badge>
                    </Td>
                  ) : order.orderStatus === "PENDING" ? (
                    <Td textAlign="center">
                      <Badge colorScheme="yellow" fontSize={15}>
                        Chờ xác nhận
                      </Badge>
                    </Td>
                  ) : null}
                  {/* <Td>{order.username}</Td> */}

                  {order.paymentStatus === "PENDING" ? (
                    <Td textAlign="center">
                      <Badge colorScheme="green" fontSize={15}>
                        Chờ thanh toán
                      </Badge>
                    </Td>
                  ) : order.paymentStatus === "SUCCESSFUL" ? (
                    <Td textAlign="center">
                      <Badge colorScheme="green" fontSize={15}>
                        Thành công
                      </Badge>
                    </Td>
                  ) : order.paymentStatus === "UNSUCCESSFUL" ? (
                    <Td textAlign="center">
                      <Badge colorScheme="red" fontSize={15}>
                        Không thành công
                      </Badge>
                    </Td>
                  ) : null}

                  <Td>
                    {order.paymentTotal.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Td>
                  {/* <Td>
                    <Button
                      colorScheme="green"
                      onClick={() =>
                        handleOnClickOrderItemButton(order.orderItemDtos)
                      }
                    >
                      Xem OrderItem
                    </Button>
                  </Td> */}
                  {/* <Td overflow="hidden" whiteSpace="nowrap">
                    {order.subTotal}
                  </Td> */}
                  {/* <Td>{order.voucherCode}</Td> */}
                  {/* <Td>{order.deliveryFeeTotal}</Td> */}

                  {/* <Td>{order.orderDate}</Td> */}
                  {/* <Td>{order.paymentDate}</Td> */}
                  {/* <Td>{order.addressId}</Td> */}
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
                      {/* <Button
                        minWidth="100"
                        marginTop="2"
                        colorScheme="yellow"
                        onClick={() => handleOnClickChangeStatusButton(order)}
                      >
                        Xem chi tiết đơn hàng
                      </Button> */}
                      <HStack>
                        {(order.orderStatus === "SUCCESSFUL" &&
                          order.paymentStatus === "SUCCESSFUL") ||
                        (order.orderStatus === "UNSUCCESSFUL" &&
                          order.paymentStatus ===
                            "UNSUCCESSFUL") ? null : order.orderStatus ===
                          "CONFIRMED" ? (
                          <Button
                            colorScheme="green"
                            onClick={() => handleOnClickComplete(order)}
                          >
                            Hoàn thành
                          </Button>
                        ) : (
                          <HStack>
                            <Button
                              colorScheme="blue"
                              onClick={() => handleOnClickConfirm(order)}
                            >
                              <FaCheck />
                            </Button>
                            {order.paymentStatus === "SUCCESSFUL" ? null : (
                              <Button
                                colorScheme="red"
                                onClick={() => handleOnClickCancel(order)}
                              >
                                <FaWindowClose />
                              </Button>
                            )}
                          </HStack>
                        )}
                      </HStack>
                    </VStack>
                  </Td>
                  <Td>
                    {" "}
                    <Button
                      marginTop="2"
                      colorScheme="yellow"
                      onClick={() => handleOnclickViewOrderButton(order)}
                    >
                      <FaEye />
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
