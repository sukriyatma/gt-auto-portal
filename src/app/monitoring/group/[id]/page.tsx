"use client";

import BotItem from "@/components/elements/BotItem";
import ResourceItem from "@/components/elements/ResourceItem";
import StatusIcon from "@/components/elements/StatusIcon";
import StatusItem from "@/components/elements/StatusItem";
import BackIcon from "@/components/icons/BackIcon";
import CPUIcon from "@/components/icons/CPUIcon";
import DiamondIcon from "@/components/icons/DiamondIcon";
import HumanIcon from "@/components/icons/HumanIcon";
import RAMIcon from "@/components/icons/RAMIcon";
import { Button } from "antd";
import Progress from "antd/es/progress";
import { useRouter } from "next/navigation";

interface GroupProps {
    id: string;
}

const Group: React.FC<GroupProps> = (props: GroupProps) => {
    const router = useRouter();
    const id = props.id;

    const onBack = () => router.back();

    return (
        <div className="w-full bg-current h-full flex flex-col md:flex-row items-start self-stretch p-4 sm:p-8 md:p-16 gap-4 md:gap-6">
            <div className="w-full md:w-auto mb-4 md:mb-0">
                <Button 
                    icon={<BackIcon />} 
                    type="text"
                    onClick={onBack}>
                </Button>
            </div>

            <div className="w-full flex flex-col items-start self-stretch gap-4 md:gap-6">
                <div className="flex flex-col items-start">
                    <p className="text-sm text-[#919299]">2 Hours . 1 Minutes Ago</p>
                    <p className="text-2xl md:text-4xl text-[#202020] font-medium">#RDP Prod 1</p>
                </div>
                <div className="w-full flex flex-col md:flex-row items-start gap-4 md:gap-6 self-stretch">
                    <div className="w-full flex flex-col items-start gap-4 md:gap-6">
                        <div className="w-full flex flex-col items-start gap-2">
                            <p className="text-lg md:text-xl text-[#202020]">Resource</p>
                            <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                                <ResourceItem 
                                    icon={<CPUIcon />}
                                    percentageProgress={70}
                                    desc="CPU usage at 13:54"
                                />
                                <ResourceItem 
                                    icon={<RAMIcon />}
                                    percentageProgress={70}
                                    desc="RAM usage at 13:54"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                                <StatusItem 
                                    icon={<HumanIcon />} 
                                    title="Total" 
                                    value={19} 
                                />
                                <StatusItem 
                                    icon={<StatusIcon size="1.3rem" color="#57C922" />} 
                                    title="Connected" 
                                    value={12} 
                                />
                                <StatusItem 
                                    icon={<StatusIcon size="1.3rem" color="#C92222" />} 
                                    title="Disconnected" 
                                    value={5} 
                                />
                                <StatusItem 
                                    icon={<StatusIcon size="1.3rem" color="#E0E0E0" />} 
                                    title="Suspended" 
                                    value={2} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-start gap-2 self-stretch">
                        <p className="text-lg md:text-xl text-[#202020]">Assets</p>
                        <div className="flex flex-col justify-between items-start self-stretch rounded-lg border outline-[#919299] p-4 gap-2">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <DiamondIcon />
                                <p className="text-base text-[#919299]">Gems</p>
                            </div>
                            <p className="text-[#202020] text-4xl md:text-5xl">3.000.000</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2 self-stretch overflow-auto max-h-fit">
                    <p className="text-lg md:text-xl text-[#202020]">Bot List</p>
                    <div className="flex p-4 justify-between items-start self-stretch flex-wrap rounded-lg gap-y-6 border outline-[#919299] overflow-auto">
                        <div className="flex flex-col items-start w-full sm:w-[23.125rem] gap-2">
                            <BotItem status={"DISCONNECTED"} />
                            <BotItem status={"DISCONNECTED"} />
                            <BotItem status={"DISCONNECTED"} />
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-[23.125rem] gap-2">
                            <BotItem status={"SUSPENDED"} />
                            <BotItem status={"SUSPENDED"} />
                            <BotItem status={"SUSPENDED"} />
                        </div>
                        <div className="flex flex-col items-start w-full sm:w-[23.125rem] gap-2">
                            <BotItem status={"CONNECTED"} />
                            <BotItem status={"CONNECTED"} />
                            <BotItem status={"CONNECTED"} />
                            <BotItem status={"CONNECTED"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Group;
