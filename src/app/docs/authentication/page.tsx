"use client";
import RequestHeaderItem from "@/components/elements/RequestHeaderItem";
import CopyIcon from "@/components/icons/CopyIcon";
import EyeClose from "@/components/icons/EyeCloseIcon";
import EyeOpen from "@/components/icons/EyeOpenIcon";
import { getApiKey } from "@/service/apiKey";
import { toClipboard } from "@/uitls/ClipboardUtils";
import { Button, notification } from "antd";
import { useEffect, useState } from "react";

const Authentication = () => {

    const [openVal, setOpenVal] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string>("");
    const [api, contextHolder] = notification.useNotification();
    const [statusReset, setStatusReset] = useState<boolean>(false);

    const onResetAPIKey = () => {
        setStatusReset(true);
    }

    const initData = () => {
        getApiKey().then(res => {
            setApiKey(res.apiKey);
        });
    }

    useEffect(() => {
        initData();
    }, []);

    const headerDataSource = [{
        key: "1",
        title: "x-api-key",
        value: "<API KEY>"
    }];

    return (
        <>
            {contextHolder}
            <div className="flex max-w-[34.37rem] flex-col items-start gap-[1.5625rem]">
                <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
                    <p className="font-bold text-xl text-[#202020]">API Key</p> 
                    <p className="text-justify text-base text-[#656E86]">To communicate with the API, authentication is required. The GAP API uses API keys for request authentication. You can generate your API Keys below, dont share the API Keys to others.</p>
                </div>
                <div className="w-[70%] flex flex-col content-center items-start gap-[0.625rem]">
                    <div className="w-full flex gap-[0.625rem] items-center ">
                        <div className="w-full flex p-[0.625rem] items-center gap-[0.3125rem] border rounded-lg border-[#919299]">
                            <input
                                style={{}}
                                type={openVal ? "text" : "password"}
                                value={apiKey}
                                className={`w-full text-lg text-[#202020] font-semibold bg-transparent border-none outline-none`}
                                disabled
                            />
                            <Button
                                icon={openVal? <EyeOpen/>: <EyeClose/>}
                                onClick={() => setOpenVal(prev => !prev)}
                                type="text"
                            />
                        </div>
                        <Button
                            type="text"
                            icon={<CopyIcon/>}
                            onClick={() => toClipboard(apiKey, api)}
                        />
                    </div>
                    <div className="flex gap-[0.625rem] items-center">
                        <Button
                            variant="solid"
                            onClick={onResetAPIKey}
                            style={{
                                backgroundColor: "#0C111D",
                                color: "#919299"
                            }}
                        >Reset API Key</Button>
                        {
                            statusReset && <p className="text-xs text-[#656E86]">Success reset API Key</p>
                        }
                    </div>
                </div>
                <div className="w-full">
                    <RequestHeaderItem
                        headerDataSource={headerDataSource as []}
                    />
                </div>
            </div>
        </>
        
    )
}

export default Authentication;