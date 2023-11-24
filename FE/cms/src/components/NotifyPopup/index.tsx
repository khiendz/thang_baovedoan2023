import React, { useEffect, useRef, useState, useMemo } from "react";
import { notification } from "antd";
import { SmileOutlined, RobotOutlined } from '@ant-design/icons';
import { NotificationPlacement } from "antd/es/notification/interface";

const Context = React.createContext({ name: "Default" });

interface Props {
  messagePopup: string,
  setPopup: any,
  title: string,
  state: boolean
}

const NotifYPopup: React.FC<Props> = (props: Props) => {
  const [api, contextHolder] = notification.useNotification();
  const { messagePopup, setPopup, state, title } = props;

  useEffect(() => {
    if (messagePopup && messagePopup != "")
    openNotification('topRight');
  }, [messagePopup]);

  const openNotification = (placement: NotificationPlacement) => {
    api.info(
      {
      
      message: `${title ? title : "Thành công"}`,
      description: (
          messagePopup || ""
      ),
      placement,
      icon: state ? <SmileOutlined style={{ color: '##a0db8e' }} /> : <RobotOutlined style={{ color: '##f26522' }} />,
    });
    setPopup("");
  };
  
  return <>
  {contextHolder}
  </>;
};

export default NotifYPopup;