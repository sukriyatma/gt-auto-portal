import "@/styles/status-icon.css"
import React from "react";

interface StatusIconProp {
	size?: string | "50rem";
	color?: string
}

const StatusIcon: React.FC<StatusIconProp> = (props) => {
    return (
        <div
            className="blob"
			style={{
				height: `${props.size}`,
				width: `${props.size}`,
				background: `${props.color}`,
				boxShadow: `${props.color}`
			}}
        ></div>
    )
}

export default StatusIcon;