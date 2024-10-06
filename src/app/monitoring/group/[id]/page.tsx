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
import { BotStatus } from "@/consts/bot-status";
import { BotDetail, getDetailsGroup, GetDetailsGroupData } from "@/service/groupService";
import { Button, StatisticProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";
import useGAPSettings from "@/context/GAPSettingsContext";
import IpIcon from "@/components/icons/IpIcon";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s Ago",
        s: 'A Few Seconds',
        m: "A Minute",
        mm: "%d Minutes",
        h: "an Hour",
        hh: "%d Hours",
        d: "A Day",
        dd: "%d Days",
        M: "A Month",
        MM: "%d Months",
        y: "A Year",
        yy: "%d Years"
    }
})

interface GroupProps {
    params: {
        id: string
    }
}

interface GemsValue {
    prev: number | 0;
    current: number | 0;
}


const Group: React.FC<GroupProps> = (props: GroupProps) => {
    const router = useRouter();
    const id = props.params.id; 

    const [data, setData] = useState<GetDetailsGroupData>();
    const [gems, setGems] = useState<GemsValue>({current: 0, prev: 0});    
    const [dataBotConnected, setDataBotConnected] = useState<BotDetail[]>();
    const [dataBotDisconnected, setDataBotDisconnected] = useState<BotDetail[]>();
    const [dataBotSuspended, setDataBotSuspended] = useState<BotDetail[]>();
    const { enableAutoUpdate } = useGAPSettings();
    const autoUpdateIntervalRef = useRef<NodeJS.Timeout>();

    const onBack = () => router.back();

    const separateData = () => {
        let currentGems = 0;
        const connectedBots: BotDetail[] = []
        const disconnectedBots: BotDetail[] = []
        const suspendedBots: BotDetail[] = []

        data?.bots.forEach(bot => {
            if (bot.status === BotStatus.CONNECTED) {
                currentGems += bot.gems;
                connectedBots.push(bot);
            }
            if (bot.status === BotStatus.DISCONNECTED) {
                currentGems += bot.gems;
                disconnectedBots.push(bot);
            }
            if (bot.status === BotStatus.SUSPENDED) {
                suspendedBots.push(bot);
            }
        })

        setDataBotConnected(connectedBots)
        setDataBotDisconnected(disconnectedBots);
        setDataBotSuspended(suspendedBots);
        setGems({current: currentGems, prev: gems.current})
    }

    const fetchData = async () => {
        try {
            const res = await getDetailsGroup(id);
            setData(res)
        } catch (error) {
            router.replace("/monitoring")
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect( () => {
        
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
    }, [enableAutoUpdate])

    useEffect( () => {
        
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
    }, [enableAutoUpdate])

    useEffect(() => {
        separateData()
    }, [data]);

    
    return (
        <div className="w-full bg-current h-full flex flex-col md:flex-row items-start self-stretch p-4 sm:p-8 md:p-16 gap-4 md:gap-6 overflow-auto">
            <div className="w-full md:w-auto mb-4 md:mb-0">
                <Button 
                    icon={<BackIcon />} 
                    type="text"
                    onClick={onBack}>
                </Button>
            </div>

            <div className="w-full flex flex-col items-start self-stretch gap-4 md:gap-6">
                <div className="flex flex-col items-start">
                    <p className="text-sm text-[#919299]">{
                        (data?.updatedAt || data?.createdAt) && 
                        dayjs(Number(data?.updatedAt || data?.createdAt)).fromNow()}
                    </p>
                    <p className="text-2xl md:text-4xl text-[#202020] font-medium">#{data?.groupName}</p>
                    {
                        data?.ip &&
                        <div className="flex items-center">
                                <IpIcon/>
                            <p className="text-[#656E86] text-lg font-medium">{data?.ip}</p>
                        </div>
                    }
                </div>
                <div className="w-full flex flex-col md:flex-row items-start gap-4 md:gap-6 self-stretch">
                    <div className="w-full flex flex-col items-start gap-4 md:gap-6">
                        <div className="w-full flex flex-col items-start gap-2">
                            <p className="text-lg md:text-xl text-[#202020]">Resource</p>
                            <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                                <ResourceItem 
                                    icon={<CPUIcon />}
                                    percentageProgress={data?.cpuPercentage || 0}
                                    desc={`CPU usage ${
                                        (data?.updatedAt || data?.createdAt) && 
                                        dayjs(Number(data?.updatedAt || data?.createdAt)).fromNow()}`}
                                />
                                <ResourceItem 
                                    icon={<RAMIcon />}
                                    percentageProgress={data?.ramPercentage || 0}
                                    desc={`RAM usage ${
                                        (data?.updatedAt || data?.createdAt) && 
                                        dayjs(Number(data?.updatedAt || data?.createdAt)).fromNow()}`}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-col md:flex-row items-center gap-2 w-full">
                                <StatusItem 
                                    icon={<HumanIcon />} 
                                    title="Total" 
                                    value={data?.bots.length || 0} 
                                />
                                <StatusItem 
                                    icon={<StatusIcon size="1.3rem" color="#57C922" />} 
                                    title="Connected" 
                                    value={dataBotConnected?.length || 0} 
                                />
                                <StatusItem 
                                    icon={<StatusIcon size="1.3rem" color="#C92222" />} 
                                    title="Disconnected" 
                                    value={dataBotDisconnected?.length || 0} 
                                />
                                <StatusItem 
                                    icon={<StatusIcon size="1.3rem" color="#E0E0E0" />} 
                                    title="Suspended" 
                                    value={dataBotSuspended?.length || 0} 
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
                            <div className="text-[#202020] text-4xl md:text-5xl">
                                <CountUp start={gems.prev} end={gems.current} separator="." duration={1} className="text-[#202020] text-4xl md:text-5xl"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-full flex flex-col items-start gap-2 self-stretch max-h-fit">
                    <p className="text-lg md:text-xl text-[#202020]">Bot List</p>
                    <div className="flex w-full h-full p-4 border outline-[#919299] rounded-lg">
                        <div className="flex h-full w-full justify-between items-start content-between flex-col xl:flex-row gap-x-4 gap-y-6 overflow-auto">
                            <div className="flex flex-col items-start w-full gap-2">
                                {
                                    dataBotDisconnected?.map(bot => <BotItem data={bot} groupId={data?.id as string} />)
                                }
                            </div>
                            <div className="flex flex-col items-start w-full gap-2">
                                {
                                    dataBotSuspended?.map(bot => <BotItem data={bot} groupId={data?.id as string} />)
                                }
                            </div>
                            <div className="flex flex-col items-start w-full gap-2">
                                {
                                    dataBotConnected?.map(bot => <BotItem data={bot} groupId={data?.id as string} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Group;
