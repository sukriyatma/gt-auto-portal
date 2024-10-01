"use client";
import CopyIcon from "@/components/icons/CopyIcon";
import {toClipboard} from "@/uitls/ClipboardUtils";
import { Button, notification } from "antd";

interface DocsProps {
    params: {
        slug: string
    }
}

const Introduction = () => {

    const [api, contextHolder] = notification.useNotification();

    return (
        <>
        {contextHolder}
        <div className="flex max-w-[34.37rem] flex-col items-start gap-[0.625rem]">
            <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
                <p className="font-bold text-xl text-[#202020]">Service endpoint</p> 
                <p className="text-justify text-base text-[#656E86]">A service endpoint is a base URL that specifies the network address of an API service. This service has the following service endpoint and all URIs below are relative to this service endpoint:</p>
            </div>
            <div className="flex items-center gap-[0.625rem]">
                <p className="text-xl text-[#656E86]">https://api.gaportal.yatma.me</p>
                <Button
                    type="text"
                    icon={<CopyIcon/>}
                    onClick={() => toClipboard("https://api.gaportal.yatma.me", api)}
                />
            </div>
        </div>
        </>
    )
}

export default Introduction;