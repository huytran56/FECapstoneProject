import { useAppDispatch, useAppSelector } from "@app/hook";
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
import { ICategory } from "@models/admin";
import {
  adminAction,
  selectCategoryList,
  selectIsAddNewState,
} from "@store/admin";
import React, { useEffect } from "react";
import { ModalGeneral } from ".";
import { AddCategory } from "./add-category";
import { EditCategory } from "./edit-category";

export function AdminCategory() {
  const categoryListSelector = useAppSelector(selectCategoryList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetCategoryList({}));
  }, [dispatch]);

  const handleOnClickEditButton = (category) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(
      adminAction.setCurrentEditCategory({ currentEditCategory: category })
    );
  };
  const handleOnClickAddNew = () => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  };
  const handleOnClickDeleteButton = (category: ICategory) => {
    dispatch(
      adminAction.setDeleteCategory({
        deleteCategoryPayLoad: { id: category.id },
      })
    );
  };
  return (
    <Stack>
      <VStack alignItems="flex-start">
        <ModalGeneral>
          {isAddNewStateSelector ? <AddCategory /> : <EditCategory />}
        </ModalGeneral>
        <Button zIndex="0" colorScheme="linkedin" onClick={handleOnClickAddNew}>
          Thêm danh mục
        </Button>
      </VStack>
      <Divider orientation="horizontal" variant="solid" colorScheme="orange" />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Danh mục</Th>
            <Th>Is Delete</Th>
            <Th>Thao tac</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categoryListSelector.map((c, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{c.category_name}</Td>
              <Td>{c.is_deleted ? "true" : "false"}</Td>
              <Td>
                <VStack
                  w="100%"
                  alignItems="start"
                  justifyContent="space-around"
                >
                  <Button
                    minWidth="100"
                    colorScheme="twitter"
                    onClick={() => handleOnClickEditButton(c)}
                  >
                    Edit Category
                  </Button>
                  <Button
                    minWidth="100"
                    marginTop="2"
                    colorScheme="whatsapp"
                    onClick={() => handleOnClickDeleteButton(c)}
                  >
                    Delete
                  </Button>
                </VStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      ;
    </Stack>
  );
}
