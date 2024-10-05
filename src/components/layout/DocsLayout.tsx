import { PropsWithChildren } from "react";
import DefaultHeader from "../section/DefaultHeader";
import SideBarMenu from "../section/SideBarMenu";

export default function DocsLayout({children}: PropsWithChildren) {
    return (
        <>
            <DefaultHeader>
                <div className="flex p-[1.875rem_3.25rem] lg:p-[1.875rem_6.25rem] items-start gap-[1.5625rem] self-stretch">
                    <SideBarMenu/>
                    {children}
                </div>
            </DefaultHeader>
        </>
    )
}