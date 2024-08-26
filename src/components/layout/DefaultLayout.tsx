import { PropsWithChildren } from "react";
import DefaultHeader from "../section/DefaultHeader";

export default function DefaultLayout({children}: PropsWithChildren) {
    return (
        <>
            <DefaultHeader>{children}</DefaultHeader>
        </>
    )
}