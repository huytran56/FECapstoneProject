import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MainLayout } from "../components/layout";
import { BannerAdvertiser } from "../components/containers";
import { ContainerBoxShadow } from "../components/containers";
import { Carousel } from "../components/containers/carousel";
import { productCategory } from "../util";
import { CardCategory } from "../components/ui";

export default function Home() {
  return (
    <>
      <BannerAdvertiser />
      <ContainerBoxShadow />
      <Carousel gap={10} header="Category">
        {productCategory.map((p,index) => (
          <CardCategory {...p} key={index}/>
        ))}
      </Carousel>
    </>
  );
}

Home.Layout = MainLayout;
