'use client'

import React, { useState } from 'react';
import { HomeOutlined, BankOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: <a href='/'>TRANG CHỦ</a>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <a href='/khach-san.htm'><span>KHÁCH SẠN</span></a>,
    key: 'hotel',
    icon: <BankOutlined />
  },
  {
    label: <a href='/tour.htm'><span>TOUR DU LỊCH</span></a>,
    key: 'tour',
    children: [
      {
        label: <a href='/tour/trong-nuoc.htm'><span>TRONG NƯỚC</span></a>,
        key: 'local'
      },
      {
        label: <a href='/tour/ngoai-nuoc.htm'><span>NGOÀI NƯỚC</span></a>,
        key: 'global'
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Vé máy bay
      </a>
    ),
    key: 'airplane',
  },
];

const Navigation: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <nav>
    <Menu className="dk-text-[#222] dk-text-lg dk-font-medium dk-pb-3 dk-border-none dk-shadow-sm" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </nav>;
};

export default Navigation;