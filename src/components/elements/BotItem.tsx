"use client";

import { Button, Popconfirm } from "antd";
import RemoveIcon from "../icons/RemoveIcon";
import { BotStatus } from "@/consts/bot-status";
import { BotDetail } from "@/service/groupService";
import { deleteBot } from "@/service/botService";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { convertNumsToMoneyFormat } from "@/uitls/StringUtils";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: 'a few seconds',
        m: "a minute",
        mm: "%dm",
        h: "an hour",
        hh: "%d h",
        d: "a day",
        dd: "%d d",
        M: "a month",
        MM: "%d m",
        y: "a year",
        yy: "%d y"
    }
})

interface BotItemProps {
    groupId: string;
    data: BotDetail
}

const BotItem = (props: BotItemProps) => {
    const data = props.data;

    const onConfirmRemoveBot = async ()=> {
        await deleteBot({
            id: data.id,
            groupId: props.groupId
        }).then(res => {
            window.location.reload();
        })
    }

    return (
        <div className="flex p-[0.625rem] justify-between items-center self-stretch border outline-[#919299] rounded-[1.25rem] w-full">
            <div className="w-full flex p-[0rem_0.625rem] items-center gap-[1.25rem]">
                <div className="flex justify-end items-end">
                    <div className="flex flex-col items-start gap-[0.375rem]">
                        <div className="flex justify-center items-center gap-[0.625rem]">
                            {
                                data.status == BotStatus.CONNECTED &&
                                <div className="flex justify-center items-center bg-[#57C922] gap-[0.625rem] p-[0.1875rem_0.3125rem] border outline-[#E0E0E0] rounded-[0.625rem]">
                                    <p className="text-xs">CONNECTED</p>
                                </div>
                            }
                            {
                                data.status == BotStatus.DISCONNECTED &&
                                <div className="flex justify-center items-center bg-[#C92222] gap-[0.625rem] p-[0.1875rem_0.3125rem] border outline-[#E0E0E0] rounded-[0.625rem]">
                                    <p className="text-xs">DISCONNECTED</p>
                                </div>
                            }
                            {
                                data.status == BotStatus.SUSPENDED &&
                                <div className="flex justify-center items-center bg-[#E0E0E0] gap-[0.625rem] p-[0.1875rem_0.3125rem] border outline-[#E0E0E0] rounded-[0.625rem]">
                                    <p className="text-xs">SUSPENDED</p>
                                </div>
                            }
                            <p className="text-base font-semibold text-[#202020]">{data.name}</p>
                        </div>
                        <div className="flex items-end gap-[0.5rem]">
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]">Last Update</p>
                                <p className="text-[#545454] text-xs">
                                    {(data.updatedAt || data.createdAt) && 
                                        dayjs(Number(data.updatedAt || data?.createdAt)).fromNow()}
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]">Level</p>
                                <p className="text-[#545454] text-xs">{data.lvl}</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]">World</p>
                                <p className="text-[#545454] text-xs">{data.world.toUpperCase()}</p>
                            </div>
                            <div className="flex flex-col justify-center items-start">
                                <p className="text-[#9D9D9D] text-[0.5rem]"></p>
                                <p className="text-[#545454] text-xs flex gap-[0.4375rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4.06594 1.4375C4.04649 1.43733 4.02731 1.44199 4.01012 1.45107C3.99293 1.46015 3.97827 1.47336 3.96746 1.48952C3.95665 1.50568 3.95003 1.52428 3.94819 1.54363C3.94636 1.56299 3.94937 1.58249 3.95695 1.6004L4.02433 1.75948L5.21672 4.53975C5.22482 4.55866 5.23776 4.57511 5.25423 4.58743C5.27071 4.59975 5.29013 4.60752 5.31056 4.60996C5.33099 4.61239 5.3517 4.60941 5.37061 4.6013C5.38952 4.59319 5.40596 4.58025 5.41828 4.56378L7.61906 1.62501C7.63212 1.60759 7.64007 1.58689 7.64202 1.56522C7.64398 1.54354 7.63986 1.52175 7.63013 1.50228C7.62039 1.48282 7.60543 1.46645 7.58692 1.45501C7.56841 1.44357 7.54707 1.4375 7.52531 1.4375H4.06594ZM12.8026 2.20098L11.5932 5.02432C11.5856 5.04215 11.5825 5.06158 11.5843 5.08088C11.586 5.10018 11.5925 5.11875 11.6032 5.13492C11.6139 5.15109 11.6284 5.16435 11.6455 5.17353C11.6625 5.18271 11.6816 5.18751 11.701 5.18751H14.66C14.6809 5.18751 14.7014 5.18194 14.7194 5.17135C14.7374 5.16077 14.7523 5.14556 14.7624 5.1273C14.7726 5.10904 14.7777 5.0884 14.7772 5.06751C14.7767 5.04663 14.7706 5.02625 14.7596 5.0085L13.0097 2.18545C12.9984 2.16728 12.9823 2.15255 12.9632 2.14286C12.9441 2.13317 12.9228 2.12889 12.9014 2.13049C12.8801 2.13209 12.8596 2.13951 12.8421 2.15194C12.8247 2.16436 12.811 2.18132 12.8026 2.20098ZM2.99015 2.18663L1.24084 5.0085C1.22982 5.02625 1.22374 5.04663 1.22324 5.06751C1.22274 5.0884 1.22784 5.10904 1.238 5.1273C1.24815 5.14556 1.26301 5.16077 1.28102 5.17135C1.29904 5.18194 1.31955 5.18751 1.34045 5.18751H4.29943C4.31882 5.18748 4.33791 5.18265 4.35497 5.17343C4.37204 5.16422 4.38655 5.15092 4.3972 5.13471C4.40786 5.11851 4.41433 5.09992 4.41603 5.0806C4.41773 5.06128 4.41461 5.04184 4.40695 5.02403L3.19523 2.20215C3.18657 2.18298 3.1729 2.1665 3.15567 2.15444C3.13844 2.14237 3.11827 2.13516 3.0973 2.13358C3.07632 2.13199 3.0553 2.13608 3.03645 2.14541C3.0176 2.15474 3.00161 2.16898 2.99015 2.18663ZM12.0215 1.4375H8.34621C8.3356 1.43744 8.32519 1.44034 8.31615 1.44588C8.30711 1.45142 8.29979 1.45938 8.29504 1.46886C8.29028 1.47834 8.28828 1.48896 8.28924 1.49952C8.29021 1.51008 8.29411 1.52016 8.30051 1.52862L10.6419 4.64756C10.6479 4.65558 10.6559 4.66187 10.6651 4.66581C10.6742 4.66975 10.6843 4.6712 10.6942 4.67001C10.7042 4.66883 10.7136 4.66504 10.7216 4.65904C10.7296 4.65304 10.7358 4.64504 10.7398 4.63585L11.9726 1.75977L12.0722 1.51543C12.0757 1.50705 12.0771 1.49794 12.0763 1.48888C12.0756 1.47982 12.0726 1.47109 12.0677 1.46342C12.0628 1.45576 12.0561 1.4494 12.0482 1.44489C12.0403 1.44038 12.0315 1.43784 12.0224 1.4375H12.0215ZM7.50187 13.625L4.88185 6.19854C4.87416 6.17697 4.85997 6.15832 4.84124 6.14515C4.82251 6.13199 4.80016 6.12495 4.77726 6.12501H1.25285C1.23243 6.12495 1.21241 6.13062 1.19507 6.14139C1.17772 6.15216 1.16374 6.16758 1.15474 6.1859C1.14573 6.20423 1.14205 6.22471 1.14411 6.24502C1.14618 6.26533 1.15391 6.28465 1.16642 6.30079L7.49455 14.4983C7.51597 14.5261 7.54653 14.5453 7.5808 14.5527C7.61508 14.56 7.65084 14.555 7.68176 14.5385C7.71285 14.5221 7.73703 14.4951 7.74988 14.4624C7.76273 14.4297 7.76341 14.3935 7.75178 14.3604L7.50187 13.625ZM14.747 6.12501H11.2226C11.1998 6.125 11.1776 6.13207 11.159 6.14525C11.1404 6.15842 11.1264 6.17704 11.1189 6.19854L8.24191 14.3478C8.22983 14.382 8.23033 14.4194 8.24332 14.4532C8.25631 14.4871 8.28095 14.5153 8.31281 14.5326C8.34468 14.5499 8.38164 14.5553 8.41711 14.5478C8.45258 14.5403 8.48424 14.5205 8.50646 14.4919L14.8334 6.30079C14.8459 6.28465 14.8537 6.26533 14.8557 6.24502C14.8578 6.22471 14.8541 6.20423 14.8451 6.1859C14.8361 6.16758 14.8221 6.15216 14.8048 6.14139C14.7874 6.13062 14.7674 6.12495 14.747 6.12501ZM8.09367 2.81241L9.7343 5.00001C9.74735 5.01742 9.7553 5.03812 9.75726 5.05979C9.75921 5.08147 9.75509 5.10326 9.74536 5.12273C9.73563 5.14219 9.72067 5.15856 9.70216 5.17C9.68364 5.18145 9.66231 5.18751 9.64055 5.18751H6.3593C6.33753 5.18751 6.3162 5.18145 6.29769 5.17C6.27917 5.15856 6.26421 5.14219 6.25448 5.12273C6.24475 5.10326 6.24063 5.08147 6.24258 5.05979C6.24454 5.03812 6.25249 5.01742 6.26555 5.00001L7.90617 2.81241C7.91709 2.79785 7.93124 2.78604 7.94751 2.7779C7.96378 2.76977 7.98173 2.76553 7.99992 2.76553C8.01811 2.76553 8.03606 2.76977 8.05233 2.7779C8.0686 2.78604 8.08276 2.79785 8.09367 2.81241ZM7.88859 11.9035L5.90519 6.28116C5.89896 6.26349 5.89706 6.24459 5.89965 6.22603C5.90223 6.20748 5.90922 6.18982 5.92004 6.17452C5.93086 6.15923 5.94518 6.14675 5.96182 6.13813C5.97845 6.12952 5.99691 6.12502 6.01564 6.12501H9.9842C10.0029 6.12502 10.0214 6.12952 10.038 6.13813C10.0547 6.14675 10.069 6.15923 10.0798 6.17452C10.0906 6.18982 10.0976 6.20748 10.1002 6.22603C10.1028 6.24459 10.1009 6.26349 10.0946 6.28116L8.11037 11.9035C8.10228 11.9263 8.08731 11.9461 8.06753 11.9601C8.04776 11.974 8.02414 11.9815 7.99992 11.9815C7.97571 11.9815 7.95208 11.974 7.93231 11.9601C7.91253 11.9461 7.89756 11.9263 7.88947 11.9035H7.88859Z" fill="#A8009E"/>
                                    </svg>
                                    {convertNumsToMoneyFormat(data.gems)}
                                </p>
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