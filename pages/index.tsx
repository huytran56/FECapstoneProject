import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MainLayout } from "../components/layout";
import { BannerAdvertiser } from "../components/containers";
import { ContainerBoxShadow } from "../components/containers";
import { Carousel } from "../components/containers/carousel";
import { productCategory } from "../util";
import { CardCategory, CarouselImage } from "../components/ui";
import { VStack } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  adminAction,
  selectCurrentProduct,
  selectRecommendationList,
  selectUserInfo,
} from "@store/admin";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetCommendationList({}));
  }, [dispatch]);
  useEffect(() => {
    dispatch(adminAction.preSetUserInfo({}));
  }, [dispatch]);
  const userInforSelector = useAppSelector(selectUserInfo);
  const recommendationListSelector = useAppSelector(selectRecommendationList);
  console.log(recommendationListSelector);

  return (
    <>
      {/* <BannerAdvertiser /> */}
      <CarouselImage />
      <Carousel
        gap={10}
        header={`${
          userInforSelector
            ? userInforSelector.username.toLocaleUpperCase()
            : "XIN CHÀO"
        }, CÓ THỂ BẠN SẼ MUỐN NHỮNG MẶT HÀNG SAU: `}
        
      >
        {recommendationListSelector
          ? recommendationListSelector.map((p, index) => (
              <CardCategory {...p} key={index} index />
            ))
          : null}
      </Carousel>
      <ContainerBoxShadow />
    </>
  );
}

Home.Layout = MainLayout;
