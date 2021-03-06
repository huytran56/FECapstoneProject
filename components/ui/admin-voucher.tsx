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
import { ModalGeneralTwo } from "./modal";
import { ViewVoucher } from "./view-voucher";
import { selectUserRole } from "@store/user";

export function AdminVoucher() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetVoucherList({}));
  }, [dispatch]);
  const voucherListSeclector = useAppSelector(selectVoucherList);
  console.log(voucherListSeclector);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
  const userRoleSelector = useAppSelector(selectUserRole);

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
  const handleOnClickViewDetail = (voucher) => {
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
    dispatch(
      adminAction.setCurrentEditVoucher({ currentEditVoucher: voucher })
    );
  };
  return (
    <Stack p={4} borderRadius="8px" border="1px solid #d8d8d8">
      <VStack alignItems="flex-start">
        <ModalGeneral>
          {isAddNewStateSelector ? <AddVoucher /> : <EditVoucher />}
        </ModalGeneral>
        <ModalGeneralTwo>
          <ViewVoucher />
        </ModalGeneralTwo>
        {userRoleSelector.map((role) => {
          if (role === "ROLE_ADMIN") {
            return (
              <Button
                zIndex="0"
                colorScheme="linkedin"
                onClick={handleOnClickAddNew}
              >
                <AiFillPlusCircle size="25px" />
              </Button>
            );
          }
        })}
      </VStack>
      <Divider orientation="horizontal" variant="solid" colorScheme="orange" />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>M?? gi???m gi??</Th>
            {/* <Th>T??n</Th> */}
            {/* <Th>M?? t???</Th> */}
            <Th>S??? l?????ng m??</Th>
            <Th>H??nh th???c gi???m</Th>
            <Th>Ti???n t???i thi???u</Th>
            <Th>Gi???m gi?? t???i ??a</Th>
            <Th>T??? l???/ S??? ti???n gi???m</Th>
            {/* <Th>Ng??y ??p d???ng</Th> */}
            {/* <Th>Ng??y k???t th??c</Th> */}
            <Th>K??ch ho???t</Th>
            <Th>Thao t??c</Th>
          </Tr>
        </Thead>
        <Tbody>
          {voucherListSeclector
            ? voucherListSeclector.map((voucher, index) => (
                <Tr key={index}>
                  <Td>{voucher.id}</Td>
                  <Td>{voucher.code}</Td>
                  {/* <Td>{voucher.name}</Td> */}
                  {/* <Td>{voucher.description}</Td> */}
                  <Td>{voucher.quantity}</Td>
                  {voucher.type === "PERCENTAGE" ? (
                    <Td>Ph???n tr??m</Td>
                  ) : (
                    <Td>Gi???m ti???n</Td>
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
                  {/* <Td>{voucher.fromDate}</Td> */}
                  {/* <Td>{voucher.toDate}</Td> */}
                  {voucher.active === false ? <Td>Kh??ng</Td> : <Td>C??</Td>}
                  <Td>
                    <HStack alignItems="flex-start">
                      {userRoleSelector.map((role) => {
                        if (role === "ROLE_ADMIN") {
                          return (
                            <>
                              <Button
                                colorScheme="blue"
                                onClick={() => handleOnClickEditButton(voucher)}
                              >
                                <AiFillEdit size="20" />
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  handleOnClickDeleteButton(voucher)
                                }
                              >
                                <AiOutlineDelete size="20" />
                              </Button>
                              <Button
                                colorScheme="orange"
                                onClick={() =>
                                  handleOnClickChangeActivateButton(voucher)
                                }
                              >
                                <AiOutlineBulb size="20" />
                              </Button>
                            </>
                          );
                        }
                      })}

                      <Button
                        colorScheme="yellow"
                        onClick={() => handleOnClickViewDetail(voucher)}
                      >
                        <AiOutlineEye size="20" />
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
