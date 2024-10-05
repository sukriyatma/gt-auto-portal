"use client";
import CopyIcon from "@/components/icons/CopyIcon";
import {toClipboard} from "@/uitls/ClipboardUtils";
import { Button, notification } from "antd";


const Introduction = () => {
    const ENDPOINT = process.env.BACKEND_HOST || "https//:api.gaportal.yatma.me";
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
                <p className="text-xl font-normal text-[#656E86] ff-anonympro">{ENDPOINT}</p>
                <Button
                    type="text"
                    icon={<CopyIcon/>}
                    onClick={() => toClipboard(ENDPOINT, api)}
                />
            </div>
        </div>
        </>
    )
}

export default Introduction;