import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  VStack,
  Button,
  Stack,
  Divider,
  FormControl,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  adminAction,
  selectAccountList,
  selectCurrentEditAccount,
  selectIsAddNewState,
  selectUserInfo,
} from "@store/admin";
import { useEffect } from "react";
import { ModalGeneral } from "@components/ui/index";
import { AddStaff } from "@components/ui/index";
import { EditAccount } from "./edit-account";

export function AdminAccount() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetAccountList());
  }, []);
  const accountListSeclector = useAppSelector(selectAccountList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
  

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
        <Button zIndex="0" colorScheme="linkedin" onClick={handleOnClickAddNew}>
          Thêm tài khoản
        </Button>
      </VStack>
      <Divider orientation="horizontal" variant="solid" colorScheme="orange" />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Tên tài khoản</Th>
            <Th>Họ</Th>
            <Th>Tên</Th>
            <Th>Email</Th>
            <Th overflow="hidden" whiteSpace="nowrap">
              Ngày Sinh
            </Th>
            <Th>Giới tính</Th>
            <Th>Vai trò</Th>
            <Th>Thao tac</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accountListSeclector
            ? accountListSeclector.map((account, index) => (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{account.username}</Td>
                  <Td>{account.first_name}</Td>
                  <Td>{account.last_name}</Td>
                  <Td>{account.email}</Td>
                  <Td overflow="hidden" whiteSpace="nowrap">
                    {account.birthday}
                  </Td>
                  {account.gender_id == "0" ? <Td>Nam</Td> : <Td>Nữ</Td>}
                  <Td>
                    {account.roles.map((role) => (
                      <>
                        <span>{role}</span>
                        <br />
                      </>
                    ))}
                  </Td>
                  <Td>
                    <Button
                      minWidth="100"
                      colorScheme="twitter"
                      onClick={() => handleOnClickEditButton(account)}
                    >
                      Edit Role
                    </Button>
                    <Button
                      minWidth="100"
                      marginTop="2"
                      colorScheme="whatsapp"
                      onClick={() => handleOnClickDeleteButton(account)}
                    >
                      Delete
                    </Button>
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
