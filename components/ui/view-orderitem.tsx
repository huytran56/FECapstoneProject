import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  FormControl,
  Stack,
  FormLabel,
  Input,
  HStack,
  VStack,
  Box,
  Select,
  Text,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  OrderedList,
} from "@chakra-ui/react";
import {
  adminAction,
  selectCurrentEditAccount,
  selectCurrentOrderItem,
} from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";

export function ViewOrder() {
  const dispatch = useAppDispatch();
  const validate = () => {};
  const currentOrderItem = useAppSelector(selectCurrentOrderItem);
  console.log(currentOrderItem);
  return (
    <Stack>
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>OrderId</Th>
            <Th>Price</Th>
            <Th>ProductSKUId</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentOrderItem.map((orderItem, index) => (
            <Tr>
              <Td>{orderItem.orderId}</Td>
              <Td>{orderItem.price}</Td>
              <Td>{orderItem.productSKUId}</Td>
              <Td>{orderItem.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      ;
    </Stack>
  );
}
