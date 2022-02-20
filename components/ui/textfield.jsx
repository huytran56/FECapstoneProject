import React from "react";
import { ErrorMessage, useField } from "formik";
import { VStack,HStack, Input, Text } from "@chakra-ui/react";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <VStack alignItems="start" fontSize="13" fontFamily="body" width="100%">
      <Text>{label}</Text>
      <Input maxHeight="auto" variant="flushed" placeholder = {label} {...field} {...props} />
      <ErrorMessage name={field.name}></ErrorMessage>
    </VStack>
  );
};
