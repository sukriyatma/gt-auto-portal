"use client";

interface BotItemProps {
    status: "CONNECTED" | "DISCONNECTED" | "SUSPENDED"
}

const BotItem = (props: BotItemProps) => {

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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.6667 4.99996H13.3333V4.16663C13.3333 3.50358 13.0699 2.8677 12.6011 2.39886C12.1323 1.93002 11.4964 1.66663 10.8333 1.66663H9.16667C8.50363 1.66663 7.86774 1.93002 7.3989 2.39886C6.93006 2.8677 6.66667 3.50358 6.66667 4.16663V4.99996H3.33333C3.11232 4.99996 2.90036 5.08776 2.74408 5.24404C2.5878 5.40032 2.5 5.61228 2.5 5.83329C2.5 6.05431 2.5878 6.26627 2.74408 6.42255C2.90036 6.57883 3.11232 6.66663 3.33333 6.66663H4.16667V15.8333C4.16667 16.4963 4.43006 17.1322 4.8989 17.6011C5.36774 18.0699 6.00363 18.3333 6.66667 18.3333H13.3333C13.9964 18.3333 14.6323 18.0699 15.1011 17.6011C15.5699 17.1322 15.8333 16.4963 15.8333 15.8333V6.66663H16.6667C16.8877 6.66663 17.0996 6.57883 17.2559 6.42255C17.4122 6.26627 17.5 6.05431 17.5 5.83329C17.5 5.61228 17.4122 5.40032 17.2559 5.24404C17.0996 5.08776 16.8877 4.99996 16.6667 4.99996ZM8.33333 4.16663C8.33333 3.94561 8.42113 3.73365 8.57741 3.57737C8.73369 3.42109 8.94565 3.33329 9.16667 3.33329H10.8333C11.0543 3.33329 11.2663 3.42109 11.4226 3.57737C11.5789 3.73365 11.6667 3.94561 11.6667 4.16663V4.99996H8.33333V4.16663ZM14.1667 15.8333C14.1667 16.0543 14.0789 16.2663 13.9226 16.4225C13.7663 16.5788 13.5543 16.6666 13.3333 16.6666H6.66667C6.44565 16.6666 6.23369 16.5788 6.07741 16.4225C5.92113 16.2663 5.83333 16.0543 5.83333 15.8333V6.66663H14.1667V15.8333Z" fill="#494949"/>
                </svg>
            </div>
        </div>
    )
}

export default BotItem;