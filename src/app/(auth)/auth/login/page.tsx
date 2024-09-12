"use client";

import DiscordIcon from "@/components/icons/DiscordIcon";
import { Button } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignIn: React.FC = () => {
    const route = useRouter();
    const session = useSession();
    const [click, setClick] = useState<boolean>(false)

    const onClickLoginWithDiscord = async () => {
        setClick(true)
        await signIn("discord");
    }

    useEffect(() => {
        if(session.status == "authenticated" && session.data.user.data?.accessToken) {
            setClick(true)
            route.push("/monitoring")
        }
    }, [session]);

    return (
        <div className="w-full flex flex-col h-full items-center justify-center">
            <div className="flex flex-col justify-between items-center">
                <div className="flex flex-col items-center gap-[1.25rem] p-[1.25rem] rounded-[1.25rem] border outline-[#969696]">
                    <p className="text-xl font-semibold text-[#202020]">Login</p>
                    <div className="flex flex-col justify-start p-[0.625rem] gap-[0.625rem] bg-[#89B1FF] rounded-[0.312rem] text-sm font-medium">
                        <p>*There are still more features to come</p>
                        <p>*Currently login is only available using Discord</p>
                    </div>
                    <Button className="w-full bg-inherit flex flex-col items-center cursor-pointer self-stretch gap-[0.625rem] p-[0.625rem] rounded-[0.625rem] border outline-[#919299] hover:outline hover:outline-[#5868F2]"
                        onClick={onClickLoginWithDiscord} 
                        disabled={click} 
                        icon={<DiscordIcon/>} 
                        shape="round" 
                        size="large" 
                        loading={click}>
                    </Button> 
                </div>
            </div>
        </div>
    )
}

export default SignIn;