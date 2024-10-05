"use client";
import { Button } from "antd";
import NotifItem from "@/components/elements/notif/NotifItem";
import { useEffect, useState } from "react";
import { getListnotif, NotificationRes, readNotif } from "@/service/notifService";
import useNotification from "@/context/NotificationContext";
import DoubleCheckIcon from "../icons/DoubleCheckIcon";


const NotifModalItem: React.FC = () => {

    const [nextPage, setNextPage] = useState<string | null>();
    const {data, setData} = useNotification();

    const onMarkAllAsRead = async () => {
        await readNotif()
            .then(() => {
                const updatedData = data?.map(notif => ({
                    ...notif,
                    readAt: new Date().getTime()
                }));
                setData(updatedData);
            });
    }

    const onClickLoadMore = async () => {
        if (!nextPage) {
            return;
        }

        await getListnotif(nextPage)
        .then(res => {
            setData(prev => prev?.concat(res.data.data));
            setNextPage(res.data.pagination.nextPage || null);
            console.log(res)
        });
    }

    const fetchData = async () => {
        await getListnotif()
        .then(res => {
            setData(prev => prev?.concat(res.data.data));
            setNextPage(res.data.pagination.nextPage || null);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="inline-flex p-[0.625rem] gap-[0.625rem] flex-col items-start rounded-[1.25rem] border outline-[#919299]">
            <div className="flex flex-row justify-between items-center self-stretch">
                <p className="text-base font-bold text-[#202020]">Notifications</p>
                <Button 
                    type="text"
                    shape="round" 
                    onClick={onMarkAllAsRead}
                    icon={<DoubleCheckIcon/>}
                >
                    <p className="text-xs text-[#5542F6]">Mark all as read</p>
                </Button>
            </div>
            <div className="max-h-[15rem] py-2 flex flex-col items-center gap-[0.3125rem] overflow-auto">
                {
                    data && data.map((notif) => (
                        <NotifItem 
                            key={notif.notificationId}
                            id={notif.notificationId}
                            description={notif.description}
                            type={notif.type}
                            createdAt={notif.createdAt} 
                            readAt={notif.readAt}/>
                    ))
                }
                {
                    nextPage &&
                    <Button type="text" size="small" onClick={onClickLoadMore}>
                        Load More
                    </Button>
                }
                
            </div>
        </div>
    )
}

export default NotifModalItem;

