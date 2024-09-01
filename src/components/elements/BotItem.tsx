"use client";

import { Button, Popconfirm } from "antd";
import RemoveIcon from "../icons/RemoveIcon";

interface BotItemProps {
    status: "CONNECTED" | "DISCONNECTED" | "SUSPENDED"
}

const BotItem = (props: BotItemProps) => {

    const onConfirmRemoveBot = ()=> {

    }

    return (
        <div className="flex p-[0.625rem] justify-between items-center self-stretch border outline-[#919299] rounded-[1.25rem]">
            <div className="flex p-[0rem_0.625rem] items-center gap-[1.25rem]">
                <div className="flex justify-end items-end">
                    <div className="flex flex-col items-start gap-[0.375rem]">
                        <div className="flex justify-center items-center gap-[0.625rem]">
                            {
                                props.status == "CONNECTED" &&
                                <div className="flex justify-center items-center bg-[#57C922] gap-[0.625rem] p-[0.1875rem_0.3125rem] border outline-[#E0E0E0] rounded-[0.625rem]">
                                    <p className="text-xs">CONNECTED</p>
                                </div>
                            }
                            {
                                props.status == "DISCONNECTED" &&
                                <div className="flex justify-center items-center bg-[#C92222] gap-[0.625rem] p-[0.1875rem_0.3125rem] border outline-[#E0E0E0] rounded-[0.625rem]">
                                    <p className="text-xs">DISCONNECTED</p>
                                </div>
                            }
                            {
                                props.status == "SUSPENDED" &&
                                <div className="flex justify-center items-center bg-[#E0E0E0] gap-[0.625rem] p-[0.1875rem_0.3125rem] border outline-[#E0E0E0] rounded-[0.625rem]">
                                    <p className="text-xs">SUSPENDED</p>
                                </div>
                            }
                            <p className="text-base font-semibold text-[#202020]">Superman New York</p>
                        </div>
                        <div className="flex items-end gap-[0.5rem]">
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]">Last Update</p>
                                <p className="text-[#545454] text-xs">1m ago</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]">Level</p>
                                <p className="text-[#545454] text-xs">71</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]">World</p>
                                <p className="text-[#545454] text-xs">KAMPUNGJAGO</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]"></p>
                                <p className="text-[#545454] text-xs">50000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Popconfirm
                    title="Delete the Bot"
                    description="Are you sure to remove this Bot?"
                    onConfirm={onConfirmRemoveBot}
                    okText="Yes"
                    okType="danger"
                >
                    <Button icon={<RemoveIcon/>} danger>
                    </Button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default BotItem;