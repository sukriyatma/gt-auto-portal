"use client"

import { ConfigProvider, Layout, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { PropsWithChildren, useEffect, useState } from "react";
import MenuIcon from "../icons/menu_icon";
import { usePathname, useRouter } from "next/navigation";
import MonitoringIcon from "../icons/MonitoringIcon";
import DocsIcon from "../icons/DocsIcon";
import GAPIcon from "../icons/GAPIcon";


const items: ItemType<MenuItemType>[] = [
    {
        key: 'monitoring',
        label: "Monitoring",
        icon: <MonitoringIcon/>,
        style: {
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
            gap: "0.875rem",
            color: "#656E86"
        },
        className: "text-lg",
    },
    {
        key: 'docs',
        label: "API Docs",
        icon: <DocsIcon/>,
        style: {
            display: "flex",
            flexDirection: "row",
            alignItems: 'center',
            gap: "0.875rem",
            color: "#656E86"
        },
        className: "text-lg"
    }
]

export default function DefaultHeader({children}: PropsWithChildren) {
    const router = useRouter()
    const pathName = usePathname()
    const path = pathName.split("/")

    const onClick: MenuProps['onClick'] = (e) => {
        router.push("/" + e.key)

    }

    const onCLickWebLogo = () => {
        router.push("/monitoring")
    }
    
    return (
        <>
            <Layout>
                <Header 
                    style={{
                        position: "fixed",
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        height: 'auto',
                        padding: "0.7rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#FFF",
                        borderBottomColor: "#C0C0C0",
                        borderBottomWidth: 1
                    }}
                >
                    <div className="w-full flex flex-nowrap justify-between">
                        <div className="flex items-center justify-center text-lg font-bold gap-[0.62rem] cursor-pointer" onClick={onCLickWebLogo}>
                            <GAPIcon/>
                            <p>GT Auto Portal</p>
                        </div>
                        <div>
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={[path[1]]}
                                items={items}
                                style={{
                                    flex: 1,
                                    paddingRight: "0.94rem",
                                    paddingLeft: "0.94rem",
                                    paddingTop: "0.31rem",
                                    paddingBottom: "0.31rem",
                                    border: "none",
                                    gap: "0.5rem"
                                }}
                                onClick={onClick}
                                className="flex"
                            />
                        </div>
                        <div className="flex content-center justify-center">
                            <div className="flex items-center border-[1px] p-[0.6rem] rounded-[0.625rem]">
                                <MenuIcon/>
                            </div>
                        </div>
                    </div>
                </Header>
            </Layout>
            <Layout className="py-5 h-[calc(100vh-60px)] !mt-[60px] scrollbar-hidden">
                {children}
            </Layout>
        </>
    )
}