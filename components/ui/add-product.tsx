import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  Button,
  Checkbox,
  HStack,
  Input,
  ListItem,
  OrderedList,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { adminAction, selectCategoryList } from "@store/admin";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { TextField } from ".";
import * as Yup from "yup";

export function AddProduct() {
  const [category, setCategory] = useState<string[]>([]);
  const validate = Yup.object({
    product_id: Yup.string().required("Không được bỏ trống"),
    price: Yup.string().required("Không được bỏ trống"),
    product_status_id: Yup.string().required("Không được bỏ trống"),
    product_name: Yup.string().required("Không được bỏ trống"),
    description_details: Yup.string().required("Không được bỏ trống"),
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetCategoryList({}));
  }, [dispatch]);
  const categoryListSelector = useAppSelector(selectCategoryList);
  const handleOnClickAddNewProduct = (value) => {
    console.log(category);

    console.log(value);
    dispatch(
      adminAction.preCreateProduct({
        createProductPayLoad: { ...value, category },
      })
    );
  };

  return (
    <Formik
      initialValues={{
        product_id: "",
        price: 0,
        product_status_id: "",
        description_details: "",
        product_name: "",
        category: [],
        fileImage: [],
      }}
      //   validationSchema={validate}
      onSubmit={handleOnClickAddNewProduct}
      validationSchema={validate}
    >
      {({ setFieldValue }) => (
        <Form>
          <VStack>
            <Text fontWeight="bold" fontSize="30px">
              Tạo sản phẩm
            </Text>
            <HStack w="100%" justifyContent="space-around">
              <TextField label="Mã sản phẩm" name="product_id" type="text" />
              <TextField label="Tên sản phẩm" name="product_name" type="text" />
            </HStack>
            <Select
              placeholder="Trạng thái"
              name="product_status_id"
              onChange={(e) =>
                setFieldValue("product_status_id", e.target.value)
              }
            >
              <option value="outstock">Hết hàng</option>
              <option value="instock">Còn hàng</option>
            </Select>
            <TextField label="Giá tiền" name="price" type="number" />
            <TextField
              label="Chi tiết sản phẩm"
              name="description_details"
              type="text"
            />
            {/* style={{ border: "1px dotted blue", margin: 0, padding: 0 }} */}
            <VStack w="100%" alignItems="start">
              <Text fontWeight="bold">Danh mục: </Text>
              <SimpleGrid column={2} gap={2} w="100%">
                {categoryListSelector.map((categoryTwo, index) => (
                  <OrderedList key={index}>
                    <ListItem
                      display="inline-block"
                      width="45%"
                      margin="0"
                      padding="0"
                      verticalAlign="top"
                    >
                      <Checkbox
                        name="category"
                        value={categoryTwo.category_name}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCategory([...category, e.target.value]);
                          } else {
                            const newList = category.filter(
                              (c) => c !== e.target.value
                            );
                            setCategory(newList);
                          }
                          // setFieldValue("category", category);
                        }}
                      >
                        {categoryTwo.category_name}
                      </Checkbox>{" "}
                    </ListItem>
                  </OrderedList>
                ))}
              </SimpleGrid>
            </VStack>
            <VStack w="100%" alignItems="start">
              <Text fontWeight="bold">Chọn ảnh</Text>
              <Input
                type="file"
                name="fileImage"
                multiple={true}
                onChange={(e) => {
                  console.log(e.target.files);
                  setFieldValue("fileImage", e.target.files);
                }}
              />
            </VStack>
            {/* <Checkbox
              name="category"
              value="mu"
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory([...category, e.target.value]);
                } else {
                  const newList = category.filter((c) => c !== e.target.value);
                  setCategory(newList);
                }
                setFieldValue("category", category);
              }}
            >
              mu
            </Checkbox>
            <Checkbox
              name="category"
              value="quan"
              onChange={(e) => {
                if (e.target.checked) {
                  setCategory([...category, e.target.value]);
                } else {
                  const newList = category.filter((c) => c !== e.target.value);
                  setCategory(newList);
                }
              }}
            >
              quan
            </Checkbox> */}

            <Button type="submit">Xác nhận</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
