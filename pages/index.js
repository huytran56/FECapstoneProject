import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MainLayout } from "../components/layout";
import { BannerAdvertiser } from "../components/containers";
import { ContainerBoxShadow } from "../components/containers";

export default function Home() {
  return (
    <>
      <BannerAdvertiser />
      <ContainerBoxShadow />
    </>
  );
}

Home.Layout = MainLayout;
