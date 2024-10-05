import { Docs } from "@/data/docs";
import { Button, notification } from "antd"
import { useState } from "react";
import CopyIcon from "../icons/CopyIcon";
import { toClipboard } from "@/uitls/ClipboardUtils";

interface RequestSampleProps {
    dataDocs: Docs | undefined;
}

const RequestSample: React.FC<RequestSampleProps> = ({ dataDocs }: RequestSampleProps) => {

    const [api, contextHolder] = notification.useNotification();
    const [currentItem, setCurrentItem] = useState<number>(0);
    
    return (
        <>
            {contextHolder}
            <div className="flex p-[0.93rem] flex-col item-start gap-[0.62rem] rounded-xl bg-[#0C111D] min-h-[32rem]">
                <p className="text-base font-bold">REQUEST SAMPLE</p>
                <div className="flex content-center items-center gap-[0.62rem]">
                    {
                        dataDocs?.details.sample?.map((s, i) => (
                            <Button
                                key={i}
                                shape={"round"}
                                onClick={(e) => setCurrentItem(i)}
                                style={{
                                    backgroundColor: currentItem == i? "#1F242F" : "inherit" ,
                                    color: "white",
                                }}
                                className="font-medium text-sm"
                            >
                                {s.platform}
                            </Button>
                        ))
                    }
                </div>
                <div className="flex ">
                    <pre>{dataDocs?.details.sample?.at(currentItem)?.code}</pre>
                    <Button 
                        icon={<CopyIcon/>}
                        type="text"
                        onClick={() => toClipboard(dataDocs?.details.sample?.at(currentItem)?.code ?? "", api)}
                    />
                </div>
            </div>
        </>
    )
}

export default RequestSample;