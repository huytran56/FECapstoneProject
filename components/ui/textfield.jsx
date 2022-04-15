import { Input, Text, VStack } from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";
import React from "react";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <VStack alignItems="start" fontSize="13" fontFamily="body" width="100%">
      <Text fontSize="16" fontWeight="bold">
        {label}
      </Text>
      <Input
        maxHeight="auto"
        variant="flushed"
        placeholder={label}
        {...field}
        {...props}
      />
      <Text textColor="red">
        <ErrorMessage name={field.name}></ErrorMessage>
      </Text>
    </VStack>
  );
};
