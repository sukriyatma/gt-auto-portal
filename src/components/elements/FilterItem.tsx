"use client";
import { Filter } from "@/consts/filter";
import OrderIcon from "../icons/OrderIcon"
import { Button } from "antd";
import { useSearchParams } from "next/navigation";

interface FIlterItemProps {
    keyword: Filter | string | undefined;
    status: Filter | string | undefined;
    updated: Filter | string | undefined;
    ram: Filter | string | undefined;
    cpu: Filter | string | undefined;
    setKeyword: React.Dispatch<React.SetStateAction<Filter | string | undefined>>;
    setStatus: React.Dispatch<React.SetStateAction<Filter | string | undefined>>;
    setUpdated: React.Dispatch<React.SetStateAction<Filter | string | undefined>>;
    setRam: React.Dispatch<React.SetStateAction<Filter | string | undefined>>;
    setCpu: React.Dispatch<React.SetStateAction<Filter | string | undefined>>;
}

const FilterItem: React.FC<FIlterItemProps> = ({
        keyword, status, updated, cpu, ram,
        setCpu,setKeyword,setRam,setStatus,setUpdated
}: FIlterItemProps) => {

    const params = useSearchParams();
    
    const changeFilter = (prev: Filter | string | undefined) => {
        if (prev === undefined) {
            return Filter.ASC;
        } else if (prev === Filter.ASC) {
            return Filter.DESC;
        } else {
            return undefined;
        }
    }

    return (
        <div className="flex items-center text-base text-[#656E86]  lg:gap-[1.56rem] py-[0.625rem] px-[1.56rem] overflow-auto">
            <div className="flex flex-row items-center lg:w-[25rem] bg-[#FAFAFA] rounded-[0.1875rem]  gap-[0.62rem] p-[0.31rem]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M17.5 18L13.8808 14.3808M13.8808 14.3808C14.4999 13.7617 14.991 13.0268 15.326 12.2179C15.661 11.4091 15.8335 10.5422 15.8335 9.66666C15.8335 8.79115 15.6611 7.92422 15.326 7.11537C14.991 6.30651 14.4999 5.57156 13.8808 4.95249C13.2617 4.33342 12.5268 3.84234 11.7179 3.5073C10.9091 3.17226 10.0422 2.99982 9.16666 2.99982C8.29115 2.99982 7.42422 3.17226 6.61537 3.5073C5.80651 3.84234 5.07156 4.33342 4.45249 4.95249C3.20221 6.20276 2.49982 7.8985 2.49982 9.66666C2.49982 11.4348 3.20221 13.1305 4.45249 14.3808C5.70276 15.6311 7.3985 16.3335 9.16666 16.3335C10.9348 16.3335 12.6305 15.6311 13.8808 14.3808Z" stroke="#656E86" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input className="bg-inherit w-full" placeholder="Search by group, ip" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(event) => {
                        const target = event.target as HTMLInputElement
                        if (event.code === 'Enter') {
                            setKeyword(target.value.length > 0? target.value : undefined)
                        }
                    }}/>
            </div>
            <div className="flex flex-row items-center p-[0.31rem_0.44rem] gap-[0.31rem]">
                <Button 
                    type={'text'} 
                    icon={<OrderIcon filter={status}/>}
                    iconPosition={'end'}
                    onClick={() => setStatus(prev => changeFilter(prev))}
                >
                    <p className="text-sm lg:text-base">Status</p>
                </Button>
            </div>
            <div className="flex flex-row items-center p-[0.31rem_0.44rem] gap-[0.31rem]">
                <Button 
                    type={'text'} 
                    icon={<OrderIcon filter={updated}/>}
                    iconPosition={'end'}
                    onClick={() => setUpdated(prev => changeFilter(prev))}
                >
                    <p className="text-sm lg:text-base">Updated</p>
                </Button>
            </div>
            <div className="flex flex-row items-center p-[0.31rem_0.44rem] gap-[0.31rem]">
                <Button 
                    type={'text'} 
                    icon={<OrderIcon filter={ram}/>}
                    iconPosition={'end'}
                    onClick={() => setRam(prev => changeFilter(prev))}
                    >
                    <p className="text-sm lg:text-base">RAM</p>
                </Button>
            </div>
            <div className="flex flex-row items-center p-[0.31rem_0.44rem] gap-[0.31rem]">
                <Button 
                    type={'text'} 
                    icon={<OrderIcon filter={cpu}/>}
                    iconPosition={'end'}
                    onClick={() => setCpu(prev => changeFilter(prev))}
                >
                    <p className="text-sm lg:text-base">CPU</p>
                </Button>
            </div>
        </div>
    )
}

export default FilterItem;