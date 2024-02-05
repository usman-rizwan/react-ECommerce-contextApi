import React from 'react';
import { Flex, Spin } from 'antd';
const LoadSpin = () => (
  <Flex align="center" vertical gap="middle" className='flex justify-center items-center mt-52'>
    <Spin size="large" tip="Loading..."  ></Spin>
  </Flex>
);
export default LoadSpin;