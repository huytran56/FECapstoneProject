import { HStack, Image, VStack, Grid, GridItem } from "@chakra-ui/react";
import { bannerAdvertisers } from "../../util";
import Link from "next/link";

export function BannerAdvertiser() {
  return (
    <VStack w="100%">
      {bannerAdvertisers.map((banner) => (
        <Grid
          templateColumns="repeat(4,1fr)"
          key={banner[0].img}
          gap={2}
          maxWidth="100%"
        >
          {banner.map(({ img, href, alt, col }) => (
            <GridItem colSpan={col} rowSpan={1} key={img} maxHeight="300px">
              <Link passHref={true} href={href}>
                <Image src={img} alt={alt} w="100%" h="100%" />
              </Link>
            </GridItem>
          ))}
        </Grid>
      ))}
    </VStack>
  );
}
