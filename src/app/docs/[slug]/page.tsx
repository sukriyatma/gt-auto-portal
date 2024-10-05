"use client";
import RequestBodyItem from "@/components/elements/RequestBodyItem";
import RequestHeaderItem from "@/components/elements/RequestHeaderItem";
import RequestSample from "@/components/elements/RequestSample";
import CopyIcon from "@/components/icons/CopyIcon";
import docs, { Docs } from "@/data/docs"
import { Button, ConfigProvider, Table, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react"

interface DocsProps {
    params: {
        slug: string
    }
}

const Documentation: React.FC<DocsProps> = (props: DocsProps) => {

    const [dataDocs, setDataDocs] = useState<Docs>();
    const [headerDataSource, setHeaderDataSource] = useState<[]>([]);

    useEffect(() => {
        const data = docs.filter(d => d.slug == props.params.slug).at(0);
        const header = data?.details.headers?.map(h => ({
            key: h.title,
            title: h.title,
            value: h.value
        })) as [];

        setDataDocs(data);
        setHeaderDataSource(header);
    }, []);

    return (
        <>
        <div className="flex gap-[2rem] items-start">
            <div className="max-w-[70%] flex flex-col items-start gap-[2rem]">
                <div className="flex flex-col items-start gap-[0.625rem] self-stretch">
                    <p className="font-bold text-xl text-[#202020]">{dataDocs?.name}</p> 
                    <p className="text-justify text-base text-[#656E86]">{dataDocs?.details.desc}</p>
                </div>
                <div className="flex items-center gap-[0.625rem]">
                    <div className="flex p-[0.625rem] bg-[#1F242F] rounded-lg">
                        <p className="font-bold text-sm">{dataDocs?.details.method}</p>
                    </div>
                    <div className="flex p-[0.312rem] bg-[#919299] rounded-md">
                        <p className="font-medium text-sm">{dataDocs?.details.path}</p>
                    </div>
                </div>
                <div className="w-full">
                    <RequestHeaderItem
                        headerDataSource={headerDataSource}
                    />
                </div>
                <div className="flex flex-col w-full gap-[0.62rem]">
                    <p className="text-[#202020] text-sm font-semibold">Request Body</p>
                    {
                        dataDocs?.details.body?.map(b => (
                            <RequestBodyItem
                                title={b.title}
                                dataType={b.dataType}
                                required={b.required}
                                desc={b.desc}
                            >
                                {b.children?.map(bc => (
                                        <RequestBodyItem
                                            title={bc.title}
                                            dataType={bc.dataType}
                                            desc={bc.desc}
                                            required={bc.required}
                                        />
                                    ))}
                            </RequestBodyItem>
                        ))
                    }
                </div>
            </div>

            <RequestSample
                dataDocs={dataDocs}
            />
        </div>
        </>
    )
}

export default Documentation;