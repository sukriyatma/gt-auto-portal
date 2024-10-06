"use client";

import { NotificationInstance } from "antd/es/notification/interface";
import useNotification from "antd/es/notification/useNotification";
import { createContext, useContext } from "react";

interface ToastContext {
    api: NotificationInstance;
  }
  const defaultValueToastContext: ToastContext = {
    api: {
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
      open: () => {},
      destroy: (key?: React.Key) => {},
    },
  };
  
  const ToastContext = createContext<ToastContext>(defaultValueToastContext);
  
  export const ToastProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [api, contextHolder] = useNotification();
  
    return (
      <ToastContext.Provider value={{ api }}>
        {props.children}
        {contextHolder}
      </ToastContext.Provider>
    );
  };
  
  const useToast = () => {
    const data = useContext(ToastContext);
    return { ...data };
  };
  
  export default useToast;
