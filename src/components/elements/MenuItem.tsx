"use client";
import useGAPSettings from "@/context/GAPSettingsContext";
import { Button, Switch } from "antd"
import React, { useEffect, useState } from "react";
import LogOutIcon from "../icons/LogOutIcon";
import { signOut } from "next-auth/react";

interface MenuItemProps {
    name: string;
    email: string;
    imageUrl?: string | null;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {

    const { enableNotif, enableNotifBg, enableAutoUpdate, setEnableNotif, setEnableNotifBg, setEnableAutoUpdate } = useGAPSettings();
    const onEnableNotifClick = () => {
        setEnableNotif(prev => {
          const newValue = !prev;
          if (!newValue) setEnableNotifBg(false);
          return newValue;
        });
    };

    const onBackgroundNotifClick = () => {
        setEnableNotifBg(prev => !prev);
    };

    const onAutoUpdateClick = () => {
        setEnableAutoUpdate(prev => !prev)
    }

    const onClickLogOut = () => {
        signOut({
            callbackUrl: "/auth/login"
        })
    }

    return (
        <div className="flex w-[18rem] lg:w-[29.625rem] h-[14rem] lg:h-[24rem] overflow-auto p-[1.25rem] flex-col items-start gap-[0.625rem] rounded-[1.25rem] border outline-[#919299]">
            <div className="flex flex-col items-start gap-[0.3125rem] self-stretch">
                <div className="flex flex-wrap justify-between items-center self-stretch">
                    <div className="flex items-center gap-[0.625rem]">
                        <div >
                            <img className=" h-[1.875rem] rounded-[1.875rem]" src={props.imageUrl || "_blank"} alt="pp" />
                        </div>
                        <p className="text-[#202020] text-base lg:text-xl font-semibold">{props.name}</p>
                    </div>

                    {/* Logout */}
                    <Button
                        icon={<LogOutIcon/>}
                        type={'text'}
                        danger
                        onClick={onClickLogOut}
                    >
                    </Button>
                </div>
                <p className="text-sm text-[#656E86]">{props.email}</p>
            </div>
            <div className="flex flex-col items-start gap-[0.625rem] self-stretch rounded-[0.625rem] bg-[#F2F2F2] p-[0.625rem]">
                <div className="flex item-center gap-[0.625rem] content-center">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.53728 9.72934C2.53728 13.788 5.47995 16.5533 8.78528 17.1253C8.87519 17.1409 8.96116 17.1741 9.03826 17.2229C9.11536 17.2717 9.1821 17.3352 9.23466 17.4098C9.28722 17.4844 9.32457 17.5686 9.34458 17.6576C9.36459 17.7467 9.36687 17.8388 9.35128 17.9287C9.3357 18.0186 9.30256 18.1045 9.25375 18.1817C9.20495 18.2588 9.14143 18.3255 9.06684 18.3781C8.99224 18.4306 8.90802 18.468 8.81899 18.488C8.72996 18.508 8.63786 18.5103 8.54795 18.4947C4.66662 17.8227 1.14795 14.5507 1.14795 9.72934C1.14795 7.68001 2.07995 6.06934 3.16795 4.84534C3.94795 3.96801 4.83995 3.25467 5.55728 2.70934H3.37595C3.19914 2.70934 3.02957 2.6391 2.90454 2.51408C2.77952 2.38905 2.70928 2.21948 2.70928 2.04267C2.70928 1.86586 2.77952 1.69629 2.90454 1.57127C3.02957 1.44625 3.19914 1.37601 3.37595 1.37601H7.37595C7.55276 1.37601 7.72233 1.44625 7.84735 1.57127C7.97238 1.69629 8.04262 1.86586 8.04262 2.04267V6.04267C8.04262 6.21948 7.97238 6.38905 7.84735 6.51408C7.72233 6.6391 7.55276 6.70934 7.37595 6.70934C7.19914 6.70934 7.02957 6.6391 6.90454 6.51408C6.77952 6.38905 6.70928 6.21948 6.70928 6.04267V3.58134L6.70795 3.58401C5.94528 4.15734 5.01462 4.86001 4.20795 5.76801C3.25462 6.84001 2.53728 8.13734 2.53728 9.72934ZM17.3479 10.2693C17.3479 6.25334 14.4679 3.50534 11.2053 2.89201C11.1143 2.87658 11.0274 2.84319 10.9495 2.7938C10.8716 2.74441 10.8043 2.68 10.7516 2.60433C10.6988 2.52866 10.6617 2.44325 10.6423 2.35307C10.6229 2.2629 10.6217 2.16976 10.6387 2.07911C10.6557 1.98845 10.6906 1.90209 10.7413 1.82506C10.7921 1.74803 10.8576 1.68187 10.9342 1.63045C11.0108 1.57902 11.0968 1.54336 11.1873 1.52555C11.2778 1.50773 11.3709 1.50811 11.4613 1.52667C15.2933 2.24667 18.7373 5.50001 18.7373 10.2693C18.7373 12.3187 17.8053 13.928 16.7173 15.1533C15.9373 16.0307 15.0453 16.744 14.3279 17.2893H16.5093C16.6861 17.2893 16.8557 17.3596 16.9807 17.4846C17.1057 17.6096 17.1759 17.7792 17.1759 17.956C17.1759 18.1328 17.1057 18.3024 16.9807 18.4274C16.8557 18.5524 16.6861 18.6227 16.5093 18.6227H12.5093C12.3325 18.6227 12.1629 18.5524 12.0379 18.4274C11.9129 18.3024 11.8426 18.1328 11.8426 17.956V13.956C11.8426 13.7792 11.9129 13.6096 12.0379 13.4846C12.1629 13.3596 12.3325 13.2893 12.5093 13.2893C12.6861 13.2893 12.8557 13.3596 12.9807 13.4846C13.1057 13.6096 13.1759 13.7792 13.1759 13.956V16.416H13.1786C13.9399 15.84 14.872 15.1387 15.6773 14.2293C16.6306 13.1587 17.3479 11.8627 17.3479 10.2693Z" fill="#919299"/>
                        </svg>
                    </div>
                    <p className="font-bold text-[#202020] text-base">Auto Update Settings</p>
                </div>
                <div className="flex p-[0rem_1.875rem] flex-col items-start gap-[0.625rem] self-stretch">
                    <div className="flex items-start gap-[0.625rem] self-stretch">
                        <Switch checked={enableAutoUpdate} onClick={onAutoUpdateClick}/>
                        <div className="flex flex-col items-start flex-[1 0 0]">
                            <p className="text-[#202020] text-base">Enable auto update</p>
                            <p className="text-[#656E86] text-sm">Receive all data every 25 seconds without refreshing the page</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start gap-[0.625rem] self-stretch rounded-[0.625rem] bg-[#F2F2F2] p-[0.625rem]">
                <div className="flex item-center gap-[0.625rem] content-center">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99994 1.25C9.66842 1.25 9.35047 1.3817 9.11605 1.61612C8.88163 1.85054 8.74994 2.16848 8.74994 2.5V2.625C7.33823 2.91316 6.06944 3.68023 5.1583 4.79637C4.24717 5.91252 3.74964 7.30918 3.74994 8.75V13.75L2.24369 15.41C1.51494 16.2137 2.08494 17.5 3.16869 17.5H7.83494C8.05437 17.88 8.36996 18.1956 8.74999 18.415C9.13003 18.6344 9.56112 18.7499 9.99994 18.7499C10.4388 18.7499 10.8698 18.6344 11.2499 18.415C11.6299 18.1956 11.9455 17.88 12.1649 17.5H16.8312C17.9149 17.5 18.4849 16.2125 17.7562 15.41L16.2499 13.75V8.75C16.2502 7.30918 15.7527 5.91252 14.8416 4.79637C13.9304 3.68023 12.6616 2.91316 11.2499 2.625V2.5C11.2499 2.16848 11.1182 1.85054 10.8838 1.61612C10.6494 1.3817 10.3315 1.25 9.99994 1.25ZM5.62494 14.475L5.13744 15.01L4.57994 15.625H15.4199L14.8612 15.01L14.3749 14.4737V8.75C14.3749 8.17547 14.2618 7.60656 14.0419 7.07576C13.822 6.54496 13.4998 6.06266 13.0935 5.65641C12.6873 5.25015 12.205 4.92789 11.6742 4.70803C11.1434 4.48816 10.5745 4.375 9.99994 4.375C9.4254 4.375 8.8565 4.48816 8.3257 4.70803C7.7949 4.92789 7.3126 5.25015 6.90634 5.65641C6.50009 6.06266 6.17783 6.54496 5.95796 7.07576C5.7381 7.60656 5.62494 8.17547 5.62494 8.75V14.475Z" fill="#919299"/>
                        </svg>
                    </div>
                    <p className="font-bold text-[#202020] text-base">Notifications Settings</p>
                </div>
                <div className="flex p-[0rem_1.875rem] flex-col items-start gap-[0.625rem] self-stretch">
                    <div className="flex items-start gap-[0.625rem] self-stretch">
                        <Switch checked={enableNotif} onClick={onEnableNotifClick}/>
                        <div className="flex flex-col items-start flex-[1 0 0]">
                            <p className="text-[#202020] text-base">Enable notifications</p>
                            <p className="text-[#656E86] text-sm">Receive all notifications from Groups and Bots</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-[0.625rem] self-stretch">
                        <Switch checked={enableNotifBg} onClick={onBackgroundNotifClick}/>
                        <div className="flex flex-col items-start flex-[1 0 0]">
                            <p className="text-[#202020] text-base">On-Background notifications</p>
                            <p className="text-[#656E86] text-sm">Receive all notification even app on background</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;