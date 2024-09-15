"use client";

import DisconnectNotifIcon from "@/components/icons/DisconnectNotifIcon";
import ModsEnteredNotifIcon from "@/components/icons/ModsEnteredNotifIcon";
import NukedWorldNotifIcon from "@/components/icons/NukedWorldNotifIcon";
import SuspendedNotifIcon from "@/components/icons/SuspendedNotifIcon";
import { BotActivity } from "@/consts/bot-activity";
import { BotStatus } from "@/consts/bot-status";
import { joinStr } from "@/uitls/StringUtils";
import { Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { readNotif } from "@/service/notifService";
dayjs.extend(relativeTime);

interface NotifitemProps {
    id: string;
    description: string;
    createdAt: number;
    readAt: number | null;
    type: BotStatus | BotActivity;
}

const Notifitem: React.FC<NotifitemProps> = (props: NotifitemProps) => {

    const [read, setRead] = useState<boolean>(props.readAt != null);
    
    const onMarkAsRead = async () => {
        await readNotif(props.id)
            .then(res => setRead(prev => !prev));
    }
    
    useEffect(() => {
        setRead(props.readAt != null)
    }, [props.readAt])

    return (
        <div className="w-[18rem] 2xl:w-[32rem]">
            <div className="flex p-[0.1875rem] content-between items-center rounded-[1.25rem] border border-[#919299]">
                    <div className={joinStr([
                        "flex p-[0rem_0.5rem] content-between items-center self-stretch rounded-[1.25rem_0rem_0rem_1.25rem]",
                        props.type === BotStatus.DISCONNECTED? "bg-[#C92222]" : '',
                        props.type === BotStatus.SUSPENDED? "bg-[#919299]" : ''])
                    }>
                        {
                            props.type === BotStatus.DISCONNECTED && <DisconnectNotifIcon/>
                        }
                        {
                            props.type === BotStatus.SUSPENDED && <SuspendedNotifIcon/>
                        }
                        {
                            props.type === BotActivity.FOUND_NUKED_WORLD && <NukedWorldNotifIcon/>
                        }
                        {
                            props.type === BotActivity.MODS_ENTERED && <ModsEnteredNotifIcon/>
                        }
                    </div>
                <div className="flex items-center">
                    <div className="flex p-[0rem_1.25rem_0rem_1.1875rem] flex-col items-start gap-[0.125rem]">
                        <p className="text-sm text-[#656E86]">{props.description}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Tooltip 
                        title={
                            !read? "mark as read": "mark as unread"
                        } 
                        color="blue">
                        <Button 
                            type="text" 
                            shape="circle"
                            size="small"
                            icon={
                                !read &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="5" viewBox="0 0 6 5" fill="none">
                                    <circle cx="3" cy="2.5" r="2.5" fill="#5542F6"/>
                                </svg>
                            }
                            onClick={onMarkAsRead}>
                        </Button>
                    </Tooltip>
                    <p className="text-xs text-[#656E86]">{dayjs(Number(props.createdAt)).fromNow()}</p>
                </div>
            </div>
        </div>
    )
}

export default Notifitem;