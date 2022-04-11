import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@app/index";
import {
  adminAction,
  selectIsOpenModal,
  selectIsOpenModalTwo,
} from "@store/admin";
import { ReactNode } from "react";
export function ModalGeneral({ children }: { children: ReactNode }) {
  const isOpenModalSelector = useAppSelector(selectIsOpenModal);
  const dispatch = useAppDispatch();
  const { onOpen, onClose } = useDisclosure();
  const handleOnClose = () => {
    dispatch(adminAction.setIsOpenModal({ isOpenModal: false }));
  };
  return (
    <>
      <Modal isOpen={isOpenModalSelector} onClose={handleOnClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export function ModalGeneralTwo({ children }: { children: ReactNode }) {
  const isOpenModalSelector = useAppSelector(selectIsOpenModalTwo);
  const dispatch = useAppDispatch();
  const handleOnClose = () => {
    dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: false }));
  };
  return (
    <>
      <Modal isOpen={isOpenModalSelector} onClose={handleOnClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader></ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
