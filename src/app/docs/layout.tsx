import DefaultLayout from "@/components/layout/DefaultLayout";
import DocsLayout from "@/components/layout/DocsLayout";
import React from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <DocsLayout>{children}</DocsLayout>
        </>
    )
}