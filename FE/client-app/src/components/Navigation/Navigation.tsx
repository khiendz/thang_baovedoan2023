'use client'

import React, { useState } from 'react';
import { HomeOutlined, BankOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
  {
    label: <Link href='/'>TRANG CHỦ</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link href='/khach-san.htm'><span>KHÁCH SẠN</span></Link>,
    key: 'hotel',
    icon: <BankOutlined />
  },
  {
    label: <Link href='/tour.htm'><span>TOUR DU LỊCH</span></Link>,
    key: 'tour',
    children: [
      {
        label: <Link href='/tour/trong-nuoc.htm'><span>TRONG NƯỚC</span></Link>,
        key: 'local'
      },
      {
        label: <Link href='/tour/ngoai-nuoc.htm'><span>NGOÀI NƯỚC</span></Link>,
        key: 'global'
      },
    ],
  },
  {
    label: (
      <Link href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Vé máy bay
      </Link>
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