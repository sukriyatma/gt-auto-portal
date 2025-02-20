import { Filter } from "@/consts/filter";

interface OrderIconProps {
    filter: Filter | string | undefined
}

const OrderIcon = ({filter}: OrderIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
        <path d="M2.06345 8.4375H9.0361C9.66306 8.4375 9.97653 9.19629 9.53415 9.63867L6.04782 13.125C5.77243 13.4004 5.32712 13.4004 5.05466 13.125L1.5654 9.63867C1.12302 9.19629 1.43649 8.4375 2.06345 8.4375Z" 
            fill={ filter === Filter.DESC? "#5542F6" : "#202020"}/>
        <path d="M9.53415 5.36133L6.04782 1.875C5.77243 1.59961 5.32712 1.59961 5.05466 1.875L1.5654 5.36133C1.12302 5.80371 1.43649 6.5625 2.06345 6.5625H9.0361C9.66306 6.5625 9.97653 5.80371 9.53415 5.36133Z" 
            fill={ filter === Filter.ASC? "#5542F6" : "#202020"}/>
    </svg>
)

export default OrderIcon;