import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";
type ResponseData = {
  message: string;
};

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res);
    // let accessToken = cookies.get("bezkoder");
    // if (accessToken) {
    //   req.headers.cookie = `bezkoder ${accessToken}`;
    // }
    // req.headers.cookie = "";
    proxy.web(req, res, {
      target: "http://localhost:8080/",
      changeOrigin: true,
      selfHandleResponse: true,
    });

    proxy.once("proxyRes", (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });

      proxyRes.on("end", function () {
        (res as NextApiResponse).status(200).json(body);
        resolve(true);
      });
    });

    // res.status(200).json({ message: "Hello from Next.js haha!" });
  });
}
