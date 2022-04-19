import { Grid, GridItem, HStack, VStack, Text, Image } from "@chakra-ui/react";
import { FooterColumn } from "../ui";
import { footerInformation } from "../../util";
import { FcPhoneAndroid } from "react-icons/fc";
import { Copyright } from "../ui";
import { BsPinMapFill, BsTelephoneFill, BsMailbox } from "react-icons/bs";

export function Footer() {
  return (
    <VStack>
      <HStack backgroundColor="gray.100" w="100%" p={5}>
        <FcPhoneAndroid size="30px" />
        <Text>Hỗ trợ, mua hàng: </Text>
        <Text color="red">0848050620</Text>
      </HStack>
      <HStack w="100%" p={5}>
        <VStack w="40%" alignItems="start">
          <Text fontSize="28px">Giới thiệu</Text>
          <br />
          <Text fontSize="18px">
            SOS hướng đến sứ mệnh để trở thành một shop thời trang với các sản
            phẩm chất lượng tốt và giá thành dễ chịu với mọi người
          </Text>
          <Image src="https://n7.com.vn/wp-content/uploads/2021/07/logo_bct_019590229b4c4dfda690236b67f7aff4.png" />
        </VStack>
        <VStack w="40%" alignItems="start" pl={20}>
          <Text fontSize="28px">Thông tin liên hệ</Text>
          <br />
          <HStack>
            <BsPinMapFill size="25px" />
            <Text fontSize="18px">
              52 Nguyễn Thiện Kế, Hải Châu, Đà Nẵng, Việt Nam
            </Text>
          </HStack>
          <HStack>
            <BsTelephoneFill size="25px" />
            <Text fontSize="18px">0848050620</Text>
          </HStack>
          <HStack>
            <BsMailbox size="25px" />
            <Text fontSize="18px">sos@gmail.com</Text>
          </HStack>
          <HStack pt={3}>
            <Image
              h="40px"
              w="40px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"
            />
            <Image
              h="40px"
              w="40px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
            />
          </HStack>
        </VStack>
      </HStack>
      {/* <Grid templateColumns="repeat(6,1fr)" gap={6} py={20}>
        {footerInformation.map((infor) => (
          <GridItem key={infor.title}>
            <FooterColumn title={infor.title} listInformation={infor.infor} />
          </GridItem>
        ))}
      </Grid> */}
      <Copyright />
    </VStack>
  );
}
