import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Badge,
  Button,
  Divider,
  HStack,
  Image,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { AddProduct, ModalGeneral, ProductDetail } from "@components/ui/index";
import {
  adminAction,
  selectCurrentProduct,
  selectIsAddNewState,
  selectIsSearchKeyword,
  selectOpenModalProduct,
  selectPaginationIndex,
  selectProductList,
  selectSearchKeyWord,
} from "@store/admin";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineEye,
  AiFillPlusCircle,
} from "react-icons/ai";
import React, { useEffect } from "react";
import { ChangeStatus } from "./change-status-order";
import { EditProduct } from "./edit-product";
import { ViewProduct } from "./view-product";
import { selectUserRole } from "@store/user";

export function AdminProduct() {
  const dispatch = useAppDispatch();
  const productListSelector = useAppSelector(selectProductList);
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
  const paginationIndexSelector = useAppSelector(selectPaginationIndex);
  const isSearchKeywordSelector = useAppSelector(selectIsSearchKeyword);
  const searchKeywordSelector = useAppSelector(selectSearchKeyWord);
  const openModalProductSelector = useAppSelector(selectOpenModalProduct);
  const currenProduct = useAppSelector(selectCurrentProduct);
  const userRoleSelector = useAppSelector(selectUserRole);
  useEffect(() => {
    dispatch(
      adminAction.preSetProductList({
        paginationIndex: paginationIndexSelector,
      })
    );
  }, [paginationIndexSelector, dispatch]);
  // const handleOnClickEditButton = (voucher) => {
  //   // dispatch(adminAction.setOpenModalProduct({ openModalProduct: 3 }));
  //   dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  //   dispatch(
  //     adminAction.setCurrentEditVoucher({ currentEditVoucher: voucher })
  //   );
  // };
  // const handleOnClickAddNew = () => {
  //   dispatch(adminAction.setOpenModalProduct({ openModalProduct: 1 }));
  //   dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  // };
  function handleOnClickAddButton() {
    dispatch(adminAction.setOpenModalProduct({ openModalProduct: 1 }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  }
  const handleOnClickOrderItemButton = (order) => {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(adminAction.setCurrentOrderItem({ currentOrderItem: order }));
  };
  function handleOnClickNextButton() {
    dispatch(
      adminAction.setPaginationIndex({
        paginationIndex: paginationIndexSelector + 10,
      })
    );
  }

  function handleOnClickPreviousButton() {
    if (paginationIndexSelector === 0) return;
    dispatch(
      adminAction.setPaginationIndex({
        paginationIndex: paginationIndexSelector - 10,
      })
    );
  }

  function handleSearchProduct() {
    if (!searchKeywordSelector) return;
    dispatch(
      adminAction.preSearchProduct({ searchKeyWord: searchKeywordSelector })
    );
    dispatch(adminAction.setSearchingKeyWord({ isSearchingProduct: false }));
  }

  function handleOnClickViewProduct(product) {
    dispatch(adminAction.setOpenModalProduct({ openModalProduct: 3 }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(adminAction.setCurrentProduct({ currentProduct: product }));
  }

  function handleOnClickDelete(product) {
    dispatch(
      adminAction.setDeleteProduct({
        deleteProductPayload: { product_id: product.product_id },
      })
    );
  }
  function handleOnClickEditProduct(product) {
    console.log(product);
    dispatch(adminAction.setOpenModalProduct({ openModalProduct: 4 }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    dispatch(adminAction.setCurrentProduct({ currentProduct: product }));

    console.log(currenProduct);
  }
  return (
    <Stack p={4} borderRadius="8px" border="1px solid #d8d8d8">
      <VStack alignItems="flex-start">
        <ModalGeneral>
          {openModalProductSelector === 3 ? (
            <ViewProduct />
          ) : openModalProductSelector === 2 ? (
            <ChangeStatus />
          ) : openModalProductSelector === 1 ? (
            <AddProduct />
          ) : openModalProductSelector === 4 ? (
            <EditProduct />
          ) : null}
        </ModalGeneral>
        <HStack justifyContent="space-between" w="100%">
          {userRoleSelector.map((role) => {
            if (role === "ROLE_ADMIN") {
              return (
                <>
                  <Button
                    zIndex="0"
                    colorScheme="linkedin"
                    onClick={handleOnClickAddButton}
                  >
                    <AiFillPlusCircle size="20px" />
                  </Button>
                  <Button
                    zIndex="0"
                    colorScheme="whatsapp"
                    onClick={handleOnClickAddButton}
                  >
                    Trích xuất đặc trưng
                  </Button>
                </>
              );
            }
          })}

          <HStack w="40%" minW="400px">
            <Input
              type="text"
              placeholder="Nhập từ khoá"
              onChange={(e) =>
                dispatch(
                  adminAction.setSearchKeyWord({
                    searchKeyWord: e.target.value,
                  })
                )
              }
            />
            <Button colorScheme="orange" onClick={handleSearchProduct}>
              <AiOutlineSearch />
            </Button>
          </HStack>
        </HStack>
      </VStack>
      <Divider orientation="horizontal" variant="solid" colorScheme="orange" />
      <Table variant="striped">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Mã sản phẩm</Th>
            <Th>Trạng thái sản phẩm</Th>
            <Th>Tên sản phẩm</Th>
            <Th>Giá tiền</Th>
            {/* <Th>Hình ảnh </Th> */}
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productListSelector
            ? productListSelector.map((product, index) => (
                <Tr key={index}>
                  <Td>{product.product_id}</Td>
                  {product.product_status_id === "instock" ? (
                    <Td>
                      <Badge colorScheme="green" fontSize={15}>
                        Còn hàng
                      </Badge>
                    </Td>
                  ) : (
                    <Td>
                      <Badge colorScheme="red" fontSize={15}>
                        Hết hàng
                      </Badge>
                    </Td>
                  )}
                  <Td>{product.product_name}</Td>
                  <Td>
                    {product.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Td>
                  {/* <Td>
                    <Image
                      src={product.imageUrl}
                      alt={product.product_name}
                      w="100px"
                      h="100px"
                    />
                  </Td> */}
                  <Td>
                    <HStack>
                      {/* <Button
                          minWidth="100"
                          marginTop="2"
                          colorScheme="red"
                          onClick={() => handleOnClickDeleteButton(order)}
                        >
                          Delete
                        </Button> */}
                      {userRoleSelector.map((role) => {
                        if (role === "ROLE_ADMIN") {
                          return (
                            <>
                              <Button
                                colorScheme="red"
                                onClick={() => handleOnClickDelete(product)}
                              >
                                <AiFillDelete size={25} />
                              </Button>
                            </>
                          );
                        }
                      })}

                      {/* <Button
                        minWidth="100"
                        marginTop="2"
                        w="170px"
                        colorScheme="green"
                        // onClick={() => handleOnClickDelete(product)}
                      >
                        Thêm thông tin chi tiết
                      </Button> */}
                      <Button
                        colorScheme="yellow"
                        onClick={() => handleOnClickViewProduct(product)}
                      >
                        <AiOutlineEye size={25} />
                      </Button>
                      {userRoleSelector.map((role) => {
                        if (role === "ROLE_ADMIN") {
                          return (
                            <>
                              <Button
                                colorScheme="blue"
                                onClick={() =>
                                  handleOnClickEditProduct(product)
                                }
                              >
                                <AiFillEdit size={25} />
                              </Button>
                            </>
                          );
                        }
                      })}
                    </HStack>
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
      ;
      {isSearchKeywordSelector ? (
        <Stack alignItems="center">
          <HStack>
            <Button onClick={handleOnClickPreviousButton}>Trang trước</Button>
            <Button onClick={handleOnClickNextButton}>Trang tiếp</Button>
          </HStack>
        </Stack>
      ) : (
        <Stack />
      )}
    </Stack>
  );
}
