
interface RequestBodyItemProps extends RequestBody {
    children?: JSX.Element[]
}

interface RequestBody {
    title: string;
    dataType: string;
    required: boolean;
    desc: string;
}

const RequestBodyItem: React.FC<RequestBodyItemProps> = (props: RequestBodyItemProps) => {

    return (
        <>
            <div className="flex flex-col gap-[0.62rem]">
                <div className="flex gap-[0.62rem] items-center">
                    <div className="flex p-[0.31rem] content-center items-center bg-[#919299] rounded-md">
                        <p className="font-medium text-sm">{props.title}</p>
                    </div>
                    <div>
                        <p className="text-[#202020] text-sm font-normal">{props.dataType}</p>
                    </div>
                    {
                        props.required && (
                            <div className="flex p-[0.18rem] content-center items-center rounded-md bg-[#1F242F]">
                                <p className="text-xs">Required</p>
                            </div>
                        )
                    }
                </div>
                <div>
                    <p className="text-[#202020] text-xs">{props.desc}</p>
                </div>
                <div className="m-[0rem_1rem] p-[0rem_1rem] border-l border-[#919299]">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default RequestBodyItem;