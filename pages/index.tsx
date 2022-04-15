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
} from "@store/admin";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(adminAction.preSetCommendationList({}));
  }, [dispatch]);
  const recommendationListSelector = useAppSelector(selectRecommendationList);
  console.log(recommendationListSelector);

  return (
    <>
      {/* <BannerAdvertiser /> */}
      <CarouselImage />
      <Carousel gap={10} header="Sản phẩm gợi ý">
        {recommendationListSelector.map((p, index) => (
          <CardCategory {...p} key={index} />
        ))}
      </Carousel>
      <ContainerBoxShadow />
    </>
  );
}

Home.Layout = MainLayout;
