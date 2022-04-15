import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  Button,
  Checkbox,
  Input,
  ListItem,
  OrderedList,
  Select,
  Stack,
  Text,
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
    product_id_status: Yup.string().required("Không được bỏ trống"),
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
          <Stack>
            <TextField label="Mã sản phẩm" name="product_id" type="text" />
            <TextField label="Tên sản phẩm" name="product_name" type="text" />
            <Select
              placeholder="Trạng thái"
              name="product_id_status"
              onChange={(e) =>
                setFieldValue("product_id_status", e.target.value)
              }
            >
              <option value="outstock">Hết hàng</option>
              <option value="instock">Còn hàng</option>
            </Select>
            <TextField label="Price" name="price" type="number" />
            <TextField
              label="Chi tiết sản phẩm"
              name="description_details"
              type="text"
            />
            {/* style={{ border: "1px dotted blue", margin: 0, padding: 0 }} */}

            <Text>Danh mục: </Text>
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
            <Text>Chọn ảnh</Text>
            <Input
              type="file"
              name="fileImage"
              multiple={true}
              onChange={(e) => {
                console.log(e.target.files);
                setFieldValue("fileImage", e.target.files);
              }}
            />
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
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
