import { Statistic, StatisticProps } from "antd";
import CountUp from "react-countup";

interface StatusItemProps {
    icon: JSX.Element;
    title: string;
    value: number | string;
}

const StatusItem: React.FC<StatusItemProps> = (props: StatusItemProps) => {
    const formatter: StatisticProps['formatter'] = (value) => (
        <CountUp start={0} end={value as number} separator="." duration={3} className="font-semibold text-2xl text-[#202020]"/>
    )
    return (
        <div className="flex flex-col justify-between items-start border rounded-[0.625rem] outline-[#919299] w-full h-[4.687rem] p-[0.625rem_1.0625rem]">
            <div className="flex justify-between items-start self-stretch">
                <p className="text-xs text-[#656E86]">{props.title}</p>
                {props.icon}
            </div>
            <div className="font-semibold text-2xl text-[#202020]">
                <Statistic value={props.value} formatter={formatter || 0}/>
            </div>
        </div>
    )
}

export default StatusItem;