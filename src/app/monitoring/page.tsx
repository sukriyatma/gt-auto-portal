"use client";
import GroupItem from "@/components/elements/GroupItem";
import OrderIcon from "@/components/icons/OrderIcon";
import { getListGroup, GetListGroupReq, GetListGroupData } from "@/service/groupService";
import { PaginationResponse } from "@/type/pagination-response";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Monitoring: React.FC = () => {

    const router = useRouter() 
    const [params, setParams] = useState<GetListGroupReq>()
    const [data, setData] = useState<PaginationResponse<GetListGroupData>>()

    useEffect( () => {        
        getListGroup(params).then((res: PaginationResponse<GetListGroupData>) => {
            setData(res)
         });
    }, [])

    return (
        <div className="overflow-y-auto flex flex-col items-start gap-[1.875rem] self-stretch">
            <div className="w-full bg-[#FFFFFF] border-b-[1px] border-[#C0C0C0]">
                <div className="flex flex-row flex-nowrap justify-end ">
                    <div className="flex items-center text-base text-[#656E86] gap-[1.56rem] py-[0.625rem] px-[1.56rem]">
                        <div className="flex flex-row items-center w-[25rem] bg-[#FAFAFA] rounded-[0.1875rem]  gap-[0.62rem] p-[0.31rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path d="M17.5 18L13.8808 14.3808M13.8808 14.3808C14.4999 13.7617 14.991 13.0268 15.326 12.2179C15.661 11.4091 15.8335 10.5422 15.8335 9.66666C15.8335 8.79115 15.6611 7.92422 15.326 7.11537C14.991 6.30651 14.4999 5.57156 13.8808 4.95249C13.2617 4.33342 12.5268 3.84234 11.7179 3.5073C10.9091 3.17226 10.0422 2.99982 9.16666 2.99982C8.29115 2.99982 7.42422 3.17226 6.61537 3.5073C5.80651 3.84234 5.07156 4.33342 4.45249 4.95249C3.20221 6.20276 2.49982 7.8985 2.49982 9.66666C2.49982 11.4348 3.20221 13.1305 4.45249 14.3808C5.70276 15.6311 7.3985 16.3335 9.16666 16.3335C10.9348 16.3335 12.6305 15.6311 13.8808 14.3808Z" stroke="#656E86" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input className="bg-inherit" placeholder="Search by group, ip, bots"/>
                        </div>
                        <div>Status</div>
                        <div className="flex flex-row items-center p-[0.31rem_0.44rem] gap-[0.31rem]">
                            Updated
                            <OrderIcon/></div>
                        <div className="flex flex-row items-center p-[0.31rem_0.44rem] gap-[0.31rem]">
                            RAM
                            <OrderIcon/></div>
                        <div className="flex flex-row items-center p-[0.31rem_0.44rem] gap-[0.31rem]">
                            CPU
                            <OrderIcon/></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start self-stretch p-[0rem_6.25rem] gap-[0.625rem]">
                <p className="text-3xl text-[#202020] font-medium">Group Collections</p>
                <p className="text-base text-[#656E86]">Oversee and evaluate each of your groups</p>
            </div>

            <div className="flex flex-col items-start self-stretch p-[0rem_6.25rem] gap-[0.625rem]">
                <div className="flex items-center content-center gap-[1.25rem] self-stretch flex-wrap py-1">
                    {
                        data?.data
                            .map((group, index) => 
                                group &&
                                <GroupItem 
                                    key={index}
                                    id={group.id}
                                    name={group.groupName}
                                    ip={group.ip}
                                    botsTotal={group.botsMeta.total}
                                    cpuPercentage={group.cpuPercentage}
                                    ramPercentage={group.ramPercentage}
                                    gems={group.botsMeta.gems}
                                    onlinePercentage={group.botsMeta.onlinePercentage}
                                    updatedAt={group.updatedAt}
                                />
                            )
                    }
                </div>
            </div>
        </div>        
    )
}

export default Monitoring;