"use client";
import docs, { Docs } from "@/data/docs";
import { ConfigProvider, Layout, Menu, MenuProps } from "antd"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    className?: string,
    children?: MenuItem[],
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,

): MenuItem {
    return {
      label,
      key,
      className,
      children,
      onClick,
    } as MenuItem;
}

const {Sider} = Layout;

const SideBarMenu: React.FC = () => {

    const router = useRouter();

    const path = usePathname();
    const paths = path.split("/");
    const docsName = paths.at(paths.length - 1) || "";

    const [openedKeys, setOpenedKeys] = useState<string[]>([]);
    const [docsItems, setDocsItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        setOpenedKeys(['general', 'interface']);

        const data = docs.map(d => getItem(d.name, d.slug))
        setDocsItems(data)
    }, []);
    
    const items: MenuItem[] = [
        getItem("General", 'general', '',[
            getItem("Introduction", 'introduction'),
            getItem("Authentication", 'authentication')
        ]),
        getItem("Interface", 'interface', '', docsItems),
    ];

    return (
        <>
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemColor: '#202020',
                        itemSelectedColor: '#202020 !important',
                        itemBg: 'inheritance',
                        itemHoverBg: 'null',
                        itemSelectedBg: '#F3F3F3 !important',
                        subMenuItemBg: 'inheritance',
                        activeBarBorderWidth: 0
                    }
                }
            }}
        >
            <Sider theme="light">
                <Menu
                    defaultSelectedKeys={['introduction']}
                    selectedKeys={[docsName]}
                    openKeys={openedKeys}
                    mode="inline"
                    items={items}
                    expandIcon={null}
                    onClick={(m) => (router.push("/docs/" + m.key))}
                    className=" bg-inherit"
                />
            </Sider>
        </ConfigProvider>
        </>
    )
} 

export default SideBarMenu;