import { Layout } from "antd";
import React from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Layout className="h-[100vh]">
                {children}
            </Layout>
        </>
    )
}