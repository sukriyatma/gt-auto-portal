import { NotificationInstance } from "antd/es/notification/interface";

export const toClipboard = (value: string, api: NotificationInstance) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        api.open({
            message: "Copied to clipboard",
            description: null,
            placement: "bottom",
            closeIcon: null,
            duration: 1,
            icon: null,
            style: { margin: 0, padding: 10, justifyItems: 'center', justifyContent: 'center', display: 'flex'},
        })
      })
      .catch((error) => {
        console.log(error);
      });
};