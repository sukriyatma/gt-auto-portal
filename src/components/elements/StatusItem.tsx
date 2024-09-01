
interface StatusItemProps {
    icon: JSX.Element;
    title: string;
    value: number | string;
}

const StatusItem: React.FC<StatusItemProps> = (props: StatusItemProps) => {
    return (
        <div className="flex flex-col justify-between items-start border rounded-[0.625rem] outline-[#919299] w-full h-[4.687rem] p-[0.625rem_1.0625rem]">
            <div className="flex justify-between items-start self-stretch">
                <p className="text-xs text-[#656E86]">{props.title}</p>
                {props.icon}
            </div>
            <p className="font-semibold text-2xl text-[#202020]">{props.value}</p>
        </div>
    )
}

export default StatusItem;