import "@/styles/status-icon.css"
import React from "react";

interface StatusIconProp {
	size?: number | 50;
	color?: string
}

const StatusIcon: React.FC<StatusIconProp> = (props) => {
    return (
        <div
            className="blob up"
			style={{
				height: `${props.size}px`,
				width: `${props.size}px`
			}}
        ></div>
    )
}

export default StatusIcon;