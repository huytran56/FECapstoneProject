import "../styles/globals.css";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import {EmptyLayout} from "../components/layout/empty-layout";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
