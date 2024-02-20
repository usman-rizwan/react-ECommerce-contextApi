import { CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import {  Tag } from 'antd';

const log = (e) => {
  console.log(e);
};
const MessageTag = () => {
  return (
    <div className='flex justify-center mt-6 '>
    <Tag  closeIcon={<CloseCircleOutlined className='text-white text-lg ' />} className='bg-red-400 p-2 text-white text-lg' onClose={log}>
      Delivery charges 100/- are applicable
    </Tag>

    </div>
  )
}

export default MessageTag;
