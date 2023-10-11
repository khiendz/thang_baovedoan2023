import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

type Props = {
  img: string,
  title: string
};

const TourCard: React.FC<Props> = (props: Props) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={props.img}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title={props.title}
      description="This is the description"
    />
  </Card>
);

export default TourCard;