import { Progress } from "antd";

interface ResourceItemProps {
    icon: JSX.Element;
    desc: string;
    percentageProgress: number;
}

const ResourceItem: React.FC<ResourceItemProps> = (props: ResourceItemProps) => {
    
    return (
        <div className="flex flex-col items-start gap-[0.625rem] rounded-[0.625rem] border outline-[#919299] w-full p-[0.6875rem_0.625rem]">
            {props.icon}
            <p className="text-sm font-medium text-[#919299]">{props.desc}</p>
            <Progress 
                percent={props.percentageProgress} 
                percentPosition={{ align: 'end', type: 'outer' }} 
                type="line"
                status="normal"/>
        </div>
    )
}

export default ResourceItem;