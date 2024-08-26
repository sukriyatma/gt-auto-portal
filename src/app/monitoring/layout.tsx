import DefaultLayout from "@/components/layout/DefaultLayout";
import React from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <DefaultLayout>{children}</DefaultLayout>
        </>
    )
}