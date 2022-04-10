import { useAppDispatch, useAppSelector } from "@app/hook";
import { Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { selectCurrentOrderItem } from "@store/admin";
import React from "react";

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
            <Tr key={index}>
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
