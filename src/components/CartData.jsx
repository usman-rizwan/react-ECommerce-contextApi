
import React, { useEffect, useState } from 'react';
import { Image, List, } from 'antd';
import { Button, Chip } from '@nextui-org/react';
import FormModal from './FormModal';
const CartData = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedData) {
      const retrievedData = storedData;
      setCartData(retrievedData);
    }
  }, []);

  return (
    <>

    <div className="container mx-auto mt-6 poppins" style={{ maxHeight: '500px' }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={cartData}
        renderItem={(item) => (
          <List.Item className='poppins'>
            <List.Item.Meta
              avatar={<Image src={item.image || item.imageUrl} style={{ width: '110px', height: '100px' }} />}
              title={<div className='flex justify-between'><span className='capitalize font-medium'>{item.title}</span><span><Chip color="warning" variant="dot" className="bg-[#27272a] text-white capitalize ">{item.category}</Chip></span></div>}
              description={<span className='capitalize'>{item.description}</span>}
            />
            <div className='flex justify-between'>
              <span className='font-bold'>Price: ${item.price}</span>
              <span className='font-bold'> Quantity: {item.qty}</span>
              <span className='font-bold'>Total Price: ${Math.round(item.price * item.qty)}</span>
            </div>
          </List.Item>
        )}
        />

      
    <div className='flex justify-center items-center'>
    {/* <Button color="primary" variant="ghost">
    <CheckCircleOutlined /> Order Now
      </Button>   */}
      <FormModal/>
    </div>
    </div>
  
    </>
    
  );
};

export default CartData;
