import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Select,
  Link,
  RadioGroup,
  Radio,
  Input,
  Button,
  Box,
  Divider,
  Image,
  Badge,
} from "@chakra-ui/react";
import { MainLayout } from "@components/layout";
import { AddAddress, ModalGeneral, OrderHistoryDetail } from "@components/ui";
import { adminAction, selectIsAddNewState } from "@store/admin";
import {
  selectCartItemList,
  selectOrderListUser,
  userAction,
} from "@store/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  AiOutlineLine,
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";

export default function OrderHistory() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);

  useEffect(() => {
    dispatch(userAction.preSetCartItemList({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(userAction.preSetOrderListUser({}));
  }, [dispatch]);

  const CartItemListSelector = useAppSelector(selectCartItemList);
  const OrderListUserSelector = useAppSelector(selectOrderListUser);
  // console.log(OrderListUserSelector);
  // let sum;
  // if (CartItemListSelector !== undefined) {
  //   sum = CartItemListSelector.reduce(
  //     (sum, element) => sum + element.price * element.quantity,
  //     0
  //   );
  // }
  function handleOnClickDetailButton(order) {
    // console.log("click");
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(
      userAction.preSetCurrentOrderDetailPopup({
        currentOrderDetailPayload: order,
      })
    );
    dispatch(
      userAction.setCurrentOrderDetail({
        currentOrderDetailPayload: order,
      })
    );
  }
  function handleOnClickCancelButton(id) {
    dispatch(userAction.preSetCancelOrder({ cancelOrderPayload: id }));
  }
  return (
    <VStack>
      <br />
      <br />
      <br />
      <br />
      <ModalGeneral>
        <OrderHistoryDetail />
      </ModalGeneral>
      <Text fontWeight="bold" fontSize={30}>
        Lịch sử mua hàng
      </Text>
      <VStack marginTop="100px">
        <AiOutlineLine size={50} />
      </VStack>
      <VStack w="100%">
        {OrderListUserSelector
          ? OrderListUserSelector.map((order, index) => (
              <VStack
                w="50%"
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                key={index}
              >
                <HStack w="100%" p={2}>
                  <HStack>
                    <Text fontWeight="bold">Mã đơn hàng: </Text>
                    <Text> {order.id}</Text>
                  </HStack>
                  <HStack pl={44}>
                    <Text fontWeight="Bold">Tổng tiền đơn hàng: </Text>
                    <Text>
                      {order.paymentTotal.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  </HStack>
                </HStack>
                <HStack w="100%" justifyContent="space-between" p={2}>
                  <HStack>
                    <Text fontWeight="bold">Ngày Order</Text>
                    <Text>{order.orderDate}</Text>
                  </HStack>
                  {order.orderStatus === "PENDING" ? (
                    <Button
                      colorScheme="red"
                      onClick={() => handleOnClickCancelButton(order.id)}
                    >
                      <AiOutlineDelete fontSize={25} />
                    </Button>
                  ) : null}
                </HStack>
                <HStack w="100%" justifyContent="space-between" p={2}>
                  <HStack>
                    <Text fontWeight="bold">Trạng thái đơn hàng</Text>
                    {order.orderStatus === "SUCCESSFUL" ? (
                      <Badge colorScheme="green" fontSize={15}>
                        Hoàn thành
                      </Badge>
                    ) : order.orderStatus === "CONFIRMED" ? (
                      <Badge colorScheme="purple" fontSize={15}>
                        Đã xác nhận
                      </Badge>
                    ) : order.orderStatus === "PENDING" ? (
                      <Badge colorScheme="yellow" fontSize={15}>
                        Đang xử lý
                      </Badge>
                    ) : order.orderStatus === "UNSUCCESSFUL" ? (
                      <Badge colorScheme="red" fontSize={15}>
                        Đã huỷ
                      </Badge>
                    ) : null}
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Trạng thái thanh toán</Text>
                    {order.paymentStatus === "SUCCESSFUL" ? (
                      <Badge colorScheme="green" fontSize={15}>
                        Thành công
                      </Badge>
                    ) : order.paymentStatus === "PENDING" ? (
                      <Badge colorScheme="yellow" fontSize={15}>
                        Chờ thanh toán
                      </Badge>
                    ) : order.paymentStatus === "UNSUCCESSFUL" ? (
                      <Badge colorScheme="red" fontSize={15}>
                        Không thành công
                      </Badge>
                    ) : null}
                  </HStack>
                  <HStack>
                    <Button
                      colorScheme="yellow"
                      onClick={() => handleOnClickDetailButton(order)}
                    >
                      <AiOutlineEye fontSize={25} />
                    </Button>
                  </HStack>
                </HStack>
              </VStack>
            ))
          : null}

        <br />
      </VStack>
      <br />
    </VStack>
  );
}
OrderHistory.Layout = MainLayout;
