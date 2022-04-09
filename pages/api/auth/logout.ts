import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies, { Cookie } from "cookies";
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
  const cookie = new Cookies(req, res);
  cookie.set("bezkoder");
  res.status(200).json({ message: "Logout successfully" });
}
