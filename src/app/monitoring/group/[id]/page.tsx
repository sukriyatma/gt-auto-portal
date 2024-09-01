"use client";

import BotItem from "@/components/elements/BotItem";
import StatusIcon from "@/components/elements/StatusIcon";
import CPUIcon from "@/components/icons/CPUIcon";
import DiamondIcon from "@/components/icons/DiamondIcon";
import HumanIcon from "@/components/icons/HumanIcon";
import RAMIcon from "@/components/icons/RAMIcon";
import Progress from "antd/es/progress";

interface GroupProps {
    id: number;
}

const Group: React.FC<GroupProps> = (props : GroupProps ) => {

    const id = props.id

    return (
        <div className="w-full h-full flex items-start self-stretch p-[1.88rem_6.25rem] gap-[1.5625rem]">

            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="25" viewBox="0 0 13 25" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4166 20.2479L9.32805 21.3541L1.34263 13.2396C1.15044 13.0413 1.04297 12.7761 1.04297 12.5C1.04297 12.2239 1.15044 11.9586 1.34263 11.7604L9.32805 3.64581L10.4166 4.7531L2.79367 12.5L10.4166 20.2479Z" fill="#656E86"/>
                </svg>
            </div>

            <div className="w-full flex flex-col items-start self-stretch gap-[1.5625rem]">
                <div className="flex flex-col items-start">
                    <p className="text-sm text-[#919299]">2 Hours . 1 Minutes Ago</p>
                    <p className="text-4xl text-[#202020] font-medium">#RDP Prod 1</p>
                </div>
                <div className="w-full flex items-start gap-[1.875rem] self-stretch">
                    <div className="w-full flex flex-col items-start gap-[1.5625rem]">
                        <div className="w-full flex flex-col items-start gap-[0.6875rem]">
                            <p className="text-xl text-[#202020]">Resource</p>
                            <div className="w-full flex items-center gap-[0.625rem]">
                                <div className="flex flex-col items-start gap-[0.625rem] rounded-[0.625rem] border outline-[#919299] w-full p-[0.6875rem_0.625rem]">
                                    <CPUIcon/>
                                    <p className="text-sm font-medium text-[#919299]">CPU usage at 13:54</p>
                                    <Progress 
                                        percent={70} 
                                        percentPosition={{ align: 'end', type: 'outer' }} 
                                        // size={{width: 175, height: 5}}
                                        type="line"
                                        status="normal"/>
                                </div>
                                <div className="flex flex-col items-start gap-[0.625rem] rounded-[0.625rem] border outline-[#919299] w-full p-[0.6875rem_0.625rem]">
                                    <RAMIcon/>
                                    <p className="text-sm font-medium text-[#919299]">RAM usage at 13:54</p>
                                    <Progress 
                                        percent={70} 
                                        percentPosition={{ align: 'end', type: 'outer' }} 
                                        // size={{width: 175, height: 5}}
                                        type="line"
                                        status="normal"/>
                                </div>
                            </div>
                            <div className="flex items-center gap-[0.625rem]">
                                <div className="flex flex-col justify-between items-start border rounded-[0.625rem] outline-[#919299] w-[10.625rem] h-[4.687rem] p-[0.625rem_1.0625rem]">
                                    <div className="flex justify-between items-start self-stretch">
                                        <p className="text-xs text-[#656E86]">Total</p>
                                        <HumanIcon/>
                                    </div>
                                    <p className="font-semibold text-2xl text-[#202020]">19</p>
                                </div>
                                <div className="flex flex-col justify-between items-start border rounded-[0.625rem] outline-[#919299] w-[10.625rem] h-[4.687rem] p-[0.625rem_1.0625rem]">
                                    <div className="flex justify-between items-start self-stretch">
                                        <p className="text-xs text-[#656E86]">Connected</p>
                                        <StatusIcon size="1.3rem" color="#57C922"/>
                                    </div>
                                    <p className="font-semibold text-2xl text-[#202020]">12</p>
                                </div>
                                <div className="flex flex-col justify-between items-start border rounded-[0.625rem] outline-[#919299] w-[10.625rem] h-[4.687rem] p-[0.625rem_1.0625rem]">
                                    <div className="flex justify-between items-start self-stretch">
                                        <p className="text-xs text-[#656E86]">Disconnected</p>
                                        <StatusIcon size="1.3rem" color="#C92222"/>
                                    </div>
                                    <p className="font-semibold text-2xl text-[#202020]">12</p>
                                </div>
                                <div className="flex flex-col justify-between items-start border rounded-[0.625rem] outline-[#919299] w-[10.625rem] h-[4.687rem] p-[0.625rem_1.0625rem]">
                                    <div className="flex justify-between items-start self-stretch">
                                        <p className="text-xs text-[#656E86]">Suspended</p>
                                        <StatusIcon size="1.3rem" color="#E0E0E0"/>
                                    </div>
                                    <p className="font-semibold text-2xl text-[#202020]">12</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-start gap-[0.625rem] self-stretch">
                        <p className="text-xl text-[#202020]">Assets</p>
                        <div className="flex flex-col justify-between items-start self-stretch rounded-[0.625rem] border outline-[#919299] p-[1.25rem_1.875rem] gap-[0.3125rem]">
                            <div className="flex flex-col justify-center items-center gap-[0.625rem]">
                                <DiamondIcon/>
                                <p className="text-base text-[#919299]">Gems</p>
                            </div>
                            <p className="text-[#202020] text-5xl">3.000.000</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-[0.5rem] self-stretch overflow-auto max-h-fit">
                    <p className="text-xl text-[#202020]">Bot List</p>
                    <div className=" flex p-[1.5rem] justify-between items-start self-stretch flex-wrap gap-x-[0.625rem] rounded-[0.625rem] border outline-[#919299] overflow-auto">
                        <div className="flex flex-col items-start w-[23.125rem] gap-[0.625rem]">
                            <BotItem status={"DISCONNECTED"}/>
                            <BotItem status={"DISCONNECTED"}/>
                            <BotItem status={"DISCONNECTED"}/>
                        </div>
                        <div className="flex flex-col items-start w-[23.125rem] gap-[0.625rem]">
                            <BotItem status={"SUSPENDED"}/>
                            <BotItem status={"SUSPENDED"}/>
                            <BotItem status={"SUSPENDED"}/>
                        </div>
                        <div className="flex flex-col items-start w-[23.125rem] gap-[0.625rem]">
                            <BotItem status={"CONNECTED"}/>
                            <BotItem status={"CONNECTED"}/>
                            <BotItem status={"CONNECTED"}/>
                            <BotItem status={"CONNECTED"}/>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Group;