import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthProvider from "@/config/AuthProvider";
import FcmTokenComp from "@/hook/notificationForeground";
import { NotificationProvider } from "@/context/NotificationContext";
import { GAPSettingsProvider } from "@/context/GAPSettingsContext";
import { IndexDbProvider } from "@/hook/IndexedDB";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: "normal",
  variable: "--font-poppins",
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
    <html lang="en" className={`${poppins.className}`}>
      <AuthProvider>
        <ConfigProvider>
          <body>
            <AntdRegistry>
              <IndexDbProvider>
                <GAPSettingsProvider>
                  <NotificationProvider>
                    <FcmTokenComp/>
                    {children}
                  </NotificationProvider>
                </GAPSettingsProvider>
              </IndexDbProvider>
            </AntdRegistry>
          </body>
        </ConfigProvider>
      </AuthProvider>
    </html>
  );
}
