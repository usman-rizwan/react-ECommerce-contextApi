import React, { useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import axios from "axios";
import {Spinner , Chip} from "@nextui-org/react";
import ImageLoading from '../assets/loading.gif'
import { Image, Space } from 'antd';

export default function ProductModal({ id }) {
  const { isOpen, onOpen, onOpenChange ,onClose} = useDisclosure();
  const [backdrop, setBackdrop] = useState();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setloading] = useState(true)

 

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const fetchData = useCallback(() => {
    axios(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {setProductDetails(res.data)
      setloading(false)
      })
      
      .catch((err) => console.log(err));
  });

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          key={"blur"}
          variant="flat"
          color="warning"
          onPress={() => handleOpen("blur")}
          className="capitalize"
          onClick={fetchData}
        >
          View Details
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              {loading ? <img  className="w-50 h-40 object-contain rounded-lg"  src={ImageLoading} />  :  <div className=" flex justify-center items-center"><Image
              className=" w-full h-[160px] object-contain "
      width={200}
      src={productDetails.image}
      preview={{
        toolbarRender: (
          _,
          {
            transform: { scale },
            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
          },
        ) => (
          <Space size={12} className="toolbar-wrapper">
            <SwapOutlined rotate={90} onClick={onFlipY} />
            <SwapOutlined onClick={onFlipX} />
            <RotateLeftOutlined onClick={onRotateLeft} />
            <RotateRightOutlined onClick={onRotateRight} />
            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
          </Space>
        ),
      }}
    /></div>}
                 {loading ?   <Spinner color="primary" className="mt-10"/> : `${productDetails.title}` }
              </ModalHeader>
              <ModalBody>
              {productDetails.description}
              <div>
              {loading ? "" : <div >  <Chip color="warning" variant="dot" className="bg-[#27272a] text-white ">{productDetails.category}</Chip><br/><p className="mt-5">Price : <b> ${productDetails.price}/-</b></p> </div>   }
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => console.log(productDetails)}
                >
                  Add To Cart
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

