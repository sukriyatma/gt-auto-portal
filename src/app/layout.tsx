import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100" , "300" , "400" , "500" , "700" , "900"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "GT Auto Portal",
  description: "Automate GT Activity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className}`}>
      <ConfigProvider>
        <body>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </ConfigProvider>
    </html>
  );
}
