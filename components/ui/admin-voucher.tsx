import { useAppDispatch, useAppSelector } from "@app/index";
import {
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
import {
  adminAction,
  selectIsAddNewState,
  selectVoucherList,
} from "@store/admin";
import React, { useEffect } from "react";
import { AddVoucher } from "./add-voucher";
import { EditVoucher } from "./edit-voucher";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineEye,
  AiFillPlusCircle,
  AiOutlineBulb,
} from "react-icons/ai";

export function AdminVoucher() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetVoucherList({}));
  }, [dispatch]);
  const voucherListSeclector = useAppSelector(selectVoucherList);
  console.log(voucherListSeclector);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);

  const handleOnClickEditButton = (voucher) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(
      adminAction.setCurrentEditVoucher({ currentEditVoucher: voucher })
    );
  };

  const handleOnClickAddNew = () => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  };
  const handleOnClickDeleteButton = (voucher) => {
    dispatch(
      adminAction.setDeleteVoucher({
        deleteVoucherPayLoad: { id: voucher.id },
      })
    );
  };
  const handleOnClickChangeActivateButton = (voucher) => {
    dispatch(
      adminAction.setChangeActivateVoucher({
        changeActivateVoucherPayLoad: { id: voucher.id },
      })
    );
  };
  return (
    <Stack p={4} borderRadius="8px" border="1px solid #d8d8d8">
      <VStack alignItems="flex-start">
        <ModalGeneral>
          {isAddNewStateSelector ? <AddVoucher /> : <EditVoucher />}
        </ModalGeneral>
        <Button zIndex="0" colorScheme="linkedin" onClick={handleOnClickAddNew}>
          <AiFillPlusCircle size="25px" />
        </Button>
      </VStack>
      <Divider orientation="horizontal" variant="solid" colorScheme="orange" />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Mã giảm giá</Th>
            <Th>Tên</Th>
            <Th>Mô tả</Th>
            <Th>Số lượng mã</Th>
            <Th>Hình thức giảm</Th>
            <Th>Tiền tối thiểu</Th>
            <Th>Giảm giá tối đa</Th>
            <Th>Tỉ lệ discount</Th>
            <Th>Kích hoạt</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {voucherListSeclector
            ? voucherListSeclector.map((voucher, index) => (
                <Tr key={index}>
                  <Td>{voucher.id}</Td>
                  <Td>{voucher.code}</Td>
                  <Td>{voucher.name}</Td>
                  <Td>{voucher.description}</Td>
                  <Td>{voucher.quantity}</Td>
                  {voucher.type === "PERCENTAGE" ? (
                    <Td>Phần trăm</Td>
                  ) : (
                    <Td>Giảm tiền</Td>
                  )}
                  <Td overflow="hidden" whiteSpace="nowrap">
                    {voucher.minSpend.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Td>
                  <Td>
                    {voucher.maxDiscount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Td>
                  <Td>{voucher.discountAmount}</Td>
                  {voucher.active === false ? <Td>Không</Td> : <Td>Có</Td>}
                  <Td>
                    <HStack alignItems="flex-start">
                      <Button
                        colorScheme="blue"
                        onClick={() => handleOnClickEditButton(voucher)}
                      >
                        <AiFillEdit size="20" />
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleOnClickDeleteButton(voucher)}
                      >
                        <AiOutlineDelete size="20" />
                      </Button>
                      <Button
                        colorScheme="yellow"
                        onClick={() =>
                          handleOnClickChangeActivateButton(voucher)
                        }
                      >
                        <AiOutlineBulb size="20" />
                      </Button>
                    </HStack>
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
