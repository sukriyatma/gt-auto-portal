"use client";
import FilterItem from "@/components/elements/FilterItem";
import GroupItem from "@/components/elements/GroupItem";
import OrderIcon from "@/components/icons/OrderIcon";
import { Filter } from "@/consts/filter";
import useGAPSettings from "@/context/GAPSettingsContext";
import { getListGroup, GetListGroupReq, GetListGroupData } from "@/service/groupService";
import { PaginationResponse } from "@/type/pagination-response";
import { createQueryParams } from "@/uitls/QueryUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Monitoring: React.FC = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [params, setParams] = useState<GetListGroupReq>()
    const [data, setData] = useState<PaginationResponse<GetListGroupData>>()
    const { enableAutoUpdate } = useGAPSettings();
    const autoUpdateIntervalRef = useRef<NodeJS.Timeout>();

    const [cpu, setCpu] = useState<Filter | string | undefined>(() => searchParams.get('cpu') ?? undefined);
    const [ram, setRam] = useState<Filter | string | undefined>(() => searchParams.get('ram') ?? undefined);
    const [updated, setUpdated] = useState<Filter | string | undefined>(() => searchParams.get('updated') ?? undefined);
    const [status, setStatus] = useState<Filter | string | undefined>(() => searchParams.get('status') ?? undefined);
    const [keyword, setKeyword] = useState<Filter | string | undefined>(() => searchParams.get('keyword') ?? undefined);

    const fetchData = async () => {
        try {
            const res = await getListGroup(params);
            setData(res);
        } catch (error) {
            router.replace("/auth/login")
        }
    }

    const setQueryParams = () => {
        const queryObject = {
            'cpu': cpu,
            'ram': ram,
            'status': status,
            'updated': updated,
            'keyword': keyword
        } 
        setParams(({
            ...params,
            cpu: cpu,
            ram: ram,
            status: status,
            updated: updated,
            keyword: keyword
        }));
        
        const stringQuery = createQueryParams(queryObject);
        const location = `${pathname}?${stringQuery}`;
        router.push(location)
    }

    // useEffect( () => {
    //     fetchData();
    // }, [params])

    useEffect( () => {
        fetchData();
        
        if (autoUpdateIntervalRef.current) {
            clearInterval(autoUpdateIntervalRef.current);
        }

        if (enableAutoUpdate) {
            autoUpdateIntervalRef.current = setInterval(async () => {
                await fetchData()
            }, 25000);            
        }

        return () => {
            if (autoUpdateIntervalRef.current) {
                clearInterval(autoUpdateIntervalRef.current);
            }
        }
    }, [enableAutoUpdate, params])

    useEffect( () => {     
        setQueryParams()   
    }, [cpu, ram, status, updated, keyword]);

    return (
        <div className="overflow-y-auto flex flex-col items-start gap-[1.875rem] self-stretch">
            <div className="w-full bg-[#FFFFFF] border-b-[1px] border-[#C0C0C0]">
                <div className="flex flex-row flex-nowrap justify-end ">
                    <FilterItem
                        cpu={cpu}
                        ram={ram}
                        keyword={keyword}
                        updated={updated}
                        status={status}
                        setCpu={setCpu}
                        setKeyword={setKeyword}
                        setRam={setRam}
                        setStatus={setStatus}
                        setUpdated={setUpdated}
                    />
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