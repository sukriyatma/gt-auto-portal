"use client"

import { Button, ConfigProvider, Layout, Menu, MenuProps, Modal, Popover, Switch } from "antd";
import { Header } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { PropsWithChildren, useEffect, useState } from "react";
import MenuIcon from "../icons/menu_icon";
import { usePathname, useRouter } from "next/navigation";
import MonitoringIcon from "../icons/MonitoringIcon";
import DocsIcon from "../icons/DocsIcon";
import GAPIcon from "../icons/GAPIcon";
import MenuItem from "../elements/MenuItem";
import NotificationIcon from "../icons/NotificationIcon";
import NotifModalItem from "@/components/elements/NotifModalItem";


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
    const router = useRouter();
    const pathName = usePathname();
    const path = pathName.split("/");

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openNotif, setOpenNotif] = useState<boolean>(false);

    const onClick: MenuProps['onClick'] = (e) => {
        router.push("/" + e.key)

    }

    const onCLickWebLogo = () => {
        router.push("/monitoring")
    }

    const onClickMenu = () => {
        setOpenMenu(prev => !prev);
    }

    const onClickNotif = () => {
        setOpenNotif(prev => !prev);
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
                        borderBottomWidth: 1,
                        overflow: 'auto'
                    }}
                >
                    <div className="w-full flex flex-nowrap justify-between ">
                        <div className="flex items-center justify-center text-lg font-bold gap-[0.62rem] cursor-pointer" onClick={onCLickWebLogo}>
                            <GAPIcon/>
                            <p className="lg:text-lg text-xs">GT Auto Portal</p>
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
                        <div className="flex content-center items-center justify-center gap-[1rem]">

                            <Popover
                                open={openNotif}
                                onOpenChange={onClickNotif}
                                trigger={'click'}
                                content={
                                    <NotifModalItem />
                                }
                            >
                                <Button icon={<NotificationIcon/>} type={'text'}/>
                            </Popover>

                            <Popover
                                open={openMenu}
                                onOpenChange={onClickMenu}
                                trigger={'click'}
                                content={
                                    <MenuItem 
                                        name="yaTma"
                                        email="sukriyatma@gmail.com"
                                        imageUrl={"https://i.ytimg.com/vi/Ng6COehRHdU/hqdefault.jpg"}
                                        />
                                }
                            >
                                <Button icon={<MenuIcon/>}/>
                            </Popover>
                        </div>
                    </div>
                </Header>
            </Layout>
            <Layout className="bg-[#fff] py-5 h-[calc(100vh-60px)] !mt-[60px] scrollbar-hidden">                
                {children}
            </Layout>
        </>
    )
}