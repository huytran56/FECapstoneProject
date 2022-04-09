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
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not supported" });
  }
  return new Promise((resolve) => {
    req.headers.cookie = "";
    const handleLoginResponse: httpProxy.ProxyResCallback = (
      proxyRes,
      req,
      res
    ) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });
      proxyRes.on("end", function () {
        try {
          const { accessToken, roles } = JSON.parse(body);
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("bezkoder", accessToken, {
            httpOnly: true,
            sameSite: "lax",
          });
          if (accessToken !== undefined) {
            (res as NextApiResponse)
              .status(200)
              .json({ message: "Login Successfully" });
          }
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Wrong email or password" });
        }
        resolve(true);
      });
    };

    proxy.web(req, res, {
      target: "http://localhost:8080/",
      changeOrigin: true,
      selfHandleResponse: true,
    });

    proxy.once("proxyRes", handleLoginResponse);
  });
}
