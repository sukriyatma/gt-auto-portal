import type { Metadata } from "next";
import { Anonymous_Pro, Poppins } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AuthProvider from "@/config/AuthProvider";
import FcmTokenComp from "@/hook/notificationForeground";
import { NotificationProvider } from "@/context/NotificationContext";
import { GAPSettingsProvider } from "@/context/GAPSettingsContext";
import { IndexDbProvider } from "@/hook/IndexedDB";
import { ToastProvider } from "@/context/ToastContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: "normal",
  variable: "--font-poppins",
  display: "swap"
});

const anonymPro = Anonymous_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anonympro",
  weight: ['400', '700'],  
});

export const metadata: Metadata = {
  title: "GT Auto Portal",
  description: "Automate GT Activity",
  icons: '/favicon.ico'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} ${anonymPro.variable}`}>
      <AuthProvider>
        <ConfigProvider theme={{
          token: {
            fontFamily: "inherit",
            colorBgBase: "#FFFFFF"
          }
        }}>
          <body>
            <AntdRegistry>
              <IndexDbProvider>
                <GAPSettingsProvider>
                  <NotificationProvider>
                    <ToastProvider>
                      <FcmTokenComp/>
                      {children}  
                    </ToastProvider>
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
