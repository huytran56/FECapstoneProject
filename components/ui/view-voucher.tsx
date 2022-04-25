import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
} from "@chakra-ui/react";
import { selectCurrentEditVoucher, selectCurrentOrderItem } from "@store/admin";
import React from "react";
import * as moment from "moment";

export function ViewVoucher() {
  const dispatch = useAppDispatch();
  const validate = () => {};
  const currentEditVoucherSelector = useAppSelector(selectCurrentEditVoucher);
  console.log(currentEditVoucherSelector);

  const formatDate = (dateString: string, full = true) => {
    let t = new Date(dateString);
    // t = new Date().setHours(t.getHours() - 7);
    let utc = new Date(t.getTime() + t.getTimezoneOffset() * 60000);
    console.log(utc);

    const date = ("0" + utc.getDate()).slice(-2);
    const month = ("0" + (utc.getMonth() + 1)).slice(-2);
    const year = utc.getFullYear();
    const hours = ("0" + utc.getHours()).slice(-2);
    const minutes = ("0" + utc.getMinutes()).slice(-2);
    const seconds = ("0" + utc.getSeconds()).slice(-2);
    return full
      ? `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`
      : `${date}/${month}/${year}`;
  };
  return (
    <VStack w="100%">
      <Text fontWeight="bold" fontSize="30px">
        Chi tiết mã giảm giá
      </Text>
      <br />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Tên mã giảm</Th>
            <Th>Mô tả</Th>
            <Th>Ngày áp dụng</Th>
            <Th>Ngày hết hạn</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Td>
            {currentEditVoucherSelector ? currentEditVoucherSelector.name : ""}
          </Td>
          <Td>
            {currentEditVoucherSelector
              ? currentEditVoucherSelector.description
              : ""}
          </Td>
          <Td>
            {currentEditVoucherSelector
              ? formatDate(currentEditVoucherSelector.fromDate)
              : ""}
          </Td>
          <Td>
            {currentEditVoucherSelector
              ? formatDate(currentEditVoucherSelector.toDate)
              : ""}
          </Td>
        </Tbody>
      </Table>
      ;
    </VStack>
  );
}
