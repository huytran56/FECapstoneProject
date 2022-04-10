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
} from "@chakra-ui/react";
import {
  adminAction,
  selectCurrentChangeStatusOrder,
  selectCurrentEditAccount,
  selectCurrentEditVoucher,
} from "@store/admin";
import { Field, Form, Formik } from "formik";
import React from "react";
import { TextField } from ".";

export function ChangeStatus() {
  const dispatch = useAppDispatch();
  const handleOnClickChangeStatusButton = (value) => {
    console.log(value);
    dispatch(
      adminAction.preChangeStatusOrder({ changeStatusOrderPayLoad: value })
    );
  };
  const validate = () => {};
  const currentChangeStatusOrderSelector = useAppSelector(
    selectCurrentChangeStatusOrder
  );
  return (
    <Formik
      initialValues={{
        id: currentChangeStatusOrderSelector.id,
        orderStatus: currentChangeStatusOrderSelector.orderStatus,
        paymentStatus: currentChangeStatusOrderSelector.paymentStatus,
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickChangeStatusButton}
    >
      {({ setFieldValue }) => (
        <Form>
          <Stack>
            <TextField
              label="id"
              name="id"
              type="text"
              value={currentChangeStatusOrderSelector.id}
            />
            <Text>Order Status</Text>
            <Select
              placeholder="Order Status"
              name="orderStatus"
              onChange={(e) => setFieldValue("orderStatus", e.target.value)}
            >
              <option value="INCOMPLETE">INCOMPLETE</option>
              <option value="PENDING">PENDING</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="DECLINED">DECLINED</option>
              <option value="PROCCESSING">PROCCESSING</option>
              <option value="COMPLETED">COMPLETED</option>
            </Select>
            <Text>Payment Status</Text>
            <Select
              placeholder="Payment Status"
              name="paymentStatus"
              onChange={(e) => setFieldValue("paymentStatus", e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
              <option value="DENIED">DENIED</option>
              <option value="REFUNDED">REFUNDED</option>
              <option value="AWAITING_REFUND">AWAITING_REFUND</option>
              <option value="COMPLETED">COMPLETED</option>
            </Select>
            <Button type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
