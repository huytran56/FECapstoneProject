import { useAppDispatch, useAppSelector } from "@app/hook";
import { Stack, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { MainLayout } from "@components/layout";
import { ModalGeneral } from "@components/ui";
import { AddAddress } from "@components/ui/add-address";
import {
  adminAction,
  selectAccountList,
  selectIsAddNewState,
} from "@store/admin";
import { selectAddressList, userAction } from "@store/user";
import React, { useEffect } from "react";
import {
  AiOutlineLine,
  AiFillPlusCircle,
  AiOutlineDelete,
  AiFillEdit,
} from "react-icons/ai";

export default function Address() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAction.preSetAddressList({}));
  }, [dispatch]);

  const addressListSelector = useAppSelector(selectAddressList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);

  const handleOnClickAddNew = () => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  };
  function handleOnClickDeleteButton(a) {
    console.log(a);
    dispatch(userAction.preDeleteAddress({ deleteAddressPayload: a }));
  }

  return (
    <VStack>
      <br />
      <br />
      <br />
      <br />
      <ModalGeneral>
        <AddAddress />
      </ModalGeneral>
      <Text fontWeight="bold" fontSize={30}>
        Địa chỉ giao hàng
      </Text>
      <VStack marginTop="100px">
        <Text>Có {addressListSelector.length} địa chỉ đã tạo</Text>
        <AiOutlineLine size={50} />
      </VStack>
      <br />
      {addressListSelector
        ? addressListSelector.map((address, index) => (
            <HStack w="50%" p={4} key={index}>
              <VStack
                w="100%"
                alignItems="center"
                p={5}
                boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
              >
                <HStack w="100%" justifyContent="space-between">
                  <HStack>
                    <Text fontWeight="bold">Mã Địa Chỉ: </Text>
                    <span>{address.id}</span>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Tên người nhận: </Text>
                    <span>{address.receiverName}</span>
                  </HStack>
                  <Button
                    colorScheme="red"
                    onClick={() => handleOnClickDeleteButton(address.id)}
                  >
                    <AiOutlineDelete fontSize={25} />
                  </Button>
                </HStack>
                <HStack w="100%">
                  <Text w={20} fontWeight="bold">
                    Địa chỉ:
                  </Text>
                  <span>
                    {address.street}, {address.subDistrict},{address.district},
                    {address.city},{address.province}
                  </span>
                </HStack>
                <HStack w="100%" justifyContent="space-between">
                  <HStack>
                    <Text fontWeight="bold">Poscode: </Text>
                    <span>{address.postalCode}</span>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Số điện thoại: </Text>
                    <span>{address.phoneNumber}</span>
                  </HStack>
                  <Button colorScheme="yellow">
                    <AiFillEdit fontSize={25} />
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          ))
        : null}

      <Button onClick={handleOnClickAddNew} colorScheme="whiteAlpha">
        <AiFillPlusCircle size="30" color="black" />
      </Button>

      {/* <Image
    src={CartItemListSelector ? CartItemListSelector[1].imageUrl : null}
    w="300px"
    h="300px"
  /> */}
    </VStack>
  );
}
Address.Layout = MainLayout;
