"use client";
import Progress from "antd/es/progress/progress";
import IpIcon from "../icons/IpIcon";
import Popconfirm from "antd/es/popconfirm";
import Button from "antd/es/button/button";
import { convertNumsToMoneyFormat } from "@/uitls/StringUtils";
import { useRouter } from "next/navigation";
import { deleteGroup } from "@/service/groupService";

interface GroupItemProps {
    id: string;
    name: string;
    ip: string;
    botsTotal: number;
    onlinePercentage: number;
    ramPercentage: number;
    cpuPercentage: number;
    gems: number;
    updatedAt: number;
}

const GroupItem: React.FC<GroupItemProps> = (props: GroupItemProps) => {

    const router = useRouter()

    const onConfirmRemoveGroup = (e: any) => {
        stopPropagation(e);
        
    }

    const onClick = () => {
        router.push(`/monitoring/group/${props.id}`);
    }

    const stopPropagation = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    } 

    return (
        <div className="cursor-pointer flex flex-col items-start w-[25rem] p-[1.875rem] rounded-[1.25rem] border outline-[#919299] bg-[#FFF] gap-[0.93rem] hover:outline-[#5542F6] hover:outline hover:bg-[#F4F4F4]"
            onClick={onClick}>
            <div className="flex flex-col items-start">
                <p className="text-3xl text-[#202020]">{props.name}</p>
                <div className="flex items-center">
                    <IpIcon/>
                    <p className="text-[#656E86] text-lg font-medium">{props.ip}</p>
                </div>
            </div>
            <div className="flex flex-col items-start self-stretch gap-[0.625rem]">
                <div className="flex self-stretch justify-between items-center border-b border-[#919299] p-[0.3125rem_0rem]">
                    <p className="text-base text-[#656E86]">Bots</p>
                    <p className="text-2xl text-[#202020]">{props.botsTotal}</p>
                </div>
                <div className="flex self-stretch justify-between items-center border-b border-[#919299]">
                    <p className="text-base text-[#656E86]">Status statistics</p>
                    <p className="text-2xl text-[#202020]">{props.onlinePercentage}%</p>
                </div>
                <div className="flex self-stretch justify-between items-center border-b border-[#919299]">
                    <p className="text-base text-[#656E86]">RAM usage</p>
                    <div className="items-center">
                        <Progress 
                                percent={props.ramPercentage} 
                                percentPosition={{ align: 'end', type: 'outer' }} 
                                size={{width: 175, height: 5}}
                                type="line"
                                status="normal"/>
                    </div>
                </div>
                <div className="flex self-stretch justify-between items-center border-b border-[#919299]">
                    <p className="text-base text-[#656E86]">CPU usage</p>
                    <div className="items-center">
                        <Progress 
                                percent={props.cpuPercentage} 
                                percentPosition={{ align: 'end', type: 'outer' }} 
                                size={{width: 175, height: 5}}
                                type="line"
                                status="normal"/>
                    </div>
                </div>
                <div className="flex self-stretch justify-between items-center border-b border-[#919299]">
                    <p className="text-base text-[#656E86]">Gems Total</p>
                    <p className="text-2xl text-[#202020]">{convertNumsToMoneyFormat(props.gems)}</p>
                </div>
            </div>
            <div className="flex justify-between items-center self-stretch">
                <Popconfirm
                    title="Delete the group"
                    description="Are you sure to remove this group?"
                    onConfirm={onConfirmRemoveGroup}
                    onCancel={stopPropagation}
                >
                    <Button type="text" danger onClick={stopPropagation}>Remove</Button>
                </Popconfirm>
                <p className="text-base text-[#656E86]">Last updated {props.updatedAt} ago</p>
            </div>
        </div>
    )
}

export default GroupItem;