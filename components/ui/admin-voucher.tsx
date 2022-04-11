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
  selectVoucherList,
} from "@store/admin";
import React, { useEffect } from "react";
import { AddVoucher } from "./add-voucher";
import { EditVoucher } from "./edit-voucher";

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
          Thêm voucher
        </Button>
      </VStack>
      <Divider orientation="horizontal" variant="solid" colorScheme="orange" />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>Mô tả</Th>
            <Th>Type</Th>
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
                  <Td>{voucher.type}</Td>
                  <Td overflow="hidden" whiteSpace="nowrap">
                    {voucher.minSpend}
                  </Td>
                  <Td>{voucher.maxDiscount}</Td>
                  <Td>{voucher.discountAmount}</Td>
                  {voucher.active === false ? <Td>Không</Td> : <Td>Có</Td>}
                  <Td>
                    <VStack alignItems="flex-start">
                      <Button
                        minWidth="100"
                        colorScheme="green"
                        onClick={() => handleOnClickEditButton(voucher)}
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        minWidth="100"
                        marginTop="2"
                        colorScheme="red"
                        onClick={() => handleOnClickDeleteButton(voucher)}
                      >
                        Xoá
                      </Button>
                      <Button
                        minWidth="100"
                        marginTop="2"
                        colorScheme="yellow"
                        onClick={() =>
                          handleOnClickChangeActivateButton(voucher)
                        }
                      >
                        Đổi Activation
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
