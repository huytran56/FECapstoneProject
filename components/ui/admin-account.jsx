import { useAppDispatch, useAppSelector } from "@app/index";
import { AiFillEdit, AiOutlineDelete, AiFillPlusCircle } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
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
  HStack,
  Text,
} from "@chakra-ui/react";
import { AddStaff, ModalGeneral } from "@components/ui/index";
import {
  adminAction,
  selectAccountList,
  selectIsAddNewState,
} from "@store/admin";
import { selectUserRole } from "@store/user";
import { useEffect } from "react";
import { EditAccount } from "./edit-account";
import { FiActivity } from "react-icons/fi";
import { FcBusinessman, FcAssistant, FcPortraitMode } from "react-icons/fc";

export function AdminAccount() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetAccountList());
  }, [dispatch]);
  const accountListSeclector = useAppSelector(selectAccountList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
  const userRoleSelector = useAppSelector(selectUserRole);

  const handleOnClickEditButton = (account) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: false }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(
      adminAction.setCurrentEditAccount({ currentEditAccount: account })
    );
  };

  const handleOnClickAddNew = () => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  };
  const handleOnClickDeleteButton = (account) => {
    dispatch(
      adminAction.setDeleteAccount({
        deleteAccountPayLoad: { username: account.username },
      })
    );
  };
  return (
    <Stack>
      <VStack alignItems="flex-start">
        <ModalGeneral>
          {isAddNewStateSelector ? <AddStaff /> : <EditAccount />}
        </ModalGeneral>
        {userRoleSelector.map((role) => {
          if (role === "ROLE_ADMIN") {
            return (
              <Button
                zIndex="0"
                colorScheme="linkedin"
                onClick={handleOnClickAddNew}
              >
                <AiFillPlusCircle size="30px" />
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
            <Th>Tên tài khoản</Th>
            {/* <Th>Họ</Th>
            <Th>Tên</Th> */}
            <Th>Email</Th>
            {/* <Th overflow="hidden" whiteSpace="nowrap">
              Ngày Sinh
            </Th> */}
            <Th>Vai trò</Th>
            {userRoleSelector.map((role) => {
              if (role === "ROLE_ADMIN") {
                return <Th>Thao tác</Th>;
              }
            })}
          </Tr>
        </Thead>
        <Tbody>
          {accountListSeclector
            ? accountListSeclector.map((account, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{account.username}</Td>
                  {/* <Td>{account.first_name}</Td> */}
                  {/* <Td>{account.last_name}</Td> */}
                  <Td>{account.email}</Td>
                  {/* <Td overflow="hidden" whiteSpace="nowrap">
                    {account.birthday}
                  </Td> */}
                  {/* {account.gender_id == "0" ? (
                    <Td>Nữ</Td>
                  ) : account.gender_id == "1" ? (
                    <Td>Nam</Td>
                  ) : (
                    <Td>Khác</Td>
                  )} */}
                  <Td>
                    {account.roles.map((role) => (
                      <>
                        <span>
                          {role === "ROLE_ADMIN" ? (
                            <HStack>
                              <FcBusinessman size="23px" />
                              <Text>Quản trị viên</Text>
                            </HStack>
                          ) : role === "ROLE_STAFF" ? (
                            <HStack>
                              <FcAssistant size="23px" />
                              <Text>Nhân viên</Text>
                            </HStack>
                          ) : role === "ROLE_USER" ? (
                            <HStack>
                              <FcPortraitMode size="23px" />
                              <Text>Người dùng</Text>
                            </HStack>
                          ) : null}
                        </span>
                        <br />
                      </>
                    ))}
                  </Td>
                  <Td>
                    {userRoleSelector.map((role) => {
                      if (role === "ROLE_ADMIN") {
                        return (
                          <HStack>
                            <Button
                              colorScheme="linkedin"
                              onClick={() => handleOnClickEditButton(account)}
                            >
                              <AiFillEdit fontSize={25} />
                            </Button>
                            <Button
                              marginTop="2"
                              colorScheme="red"
                              onClick={() => handleOnClickDeleteButton(account)}
                            >
                              <AiOutlineDelete fontSize={25} />
                            </Button>
                          </HStack>
                        );
                      }
                    })}
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
      ;
    </Stack>
  );
}
