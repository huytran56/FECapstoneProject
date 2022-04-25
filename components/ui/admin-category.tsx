import { useAppDispatch, useAppSelector } from "@app/hook";
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
  Text,
} from "@chakra-ui/react";
import { ICategory } from "@models/admin";
import {
  adminAction,
  selectCategoryList,
  selectIsAddNewState,
} from "@store/admin";
import React, { useEffect, useState } from "react";
import { ModalGeneral } from ".";
import { AddCategory } from "./add-category";
import { EditCategory } from "./edit-category";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineEye,
  AiFillPlusCircle,
} from "react-icons/ai";
import { selectUserRole } from "@store/user";

export function AdminCategory() {
  const categoryListSelector = useAppSelector(selectCategoryList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
  const userRoleSelector = useAppSelector(selectUserRole);

  console.log(userRoleSelector);

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
            <Th>STT</Th>
            <Th>Danh mục</Th>
            {userRoleSelector.map((role) => {
              if (role === "ROLE_ADMIN") {
                return <Th>Thao tác</Th>;
              }
            })}
          </Tr>
        </Thead>
        <Tbody>
          {categoryListSelector ? (
            categoryListSelector.map((c, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{c.category_name}</Td>
                {userRoleSelector.map((role) => {
                  if (role === "ROLE_ADMIN") {
                    return (
                      <Td>
                        <HStack alignItems="center">
                          <Button
                            colorScheme="twitter"
                            onClick={() => handleOnClickEditButton(c)}
                          >
                            <AiFillEdit size="24" />
                          </Button>
                          <Button
                            marginTop="2"
                            colorScheme="red"
                            onClick={() => handleOnClickDeleteButton(c)}
                          >
                            <AiFillDelete size="25" />
                          </Button>
                        </HStack>
                      </Td>
                    );
                  }
                })}
              </Tr>
            ))
          ) : (
            <Stack w="100%" h="100%" alignItems="center">
              <Text>Hiện không có danh mục nào</Text>
            </Stack>
          )}
        </Tbody>
      </Table>
    </Stack>
  );
}
