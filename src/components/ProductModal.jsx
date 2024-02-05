import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image
} from "@nextui-org/react";
import axios from "axios";

export default function ProductModal({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState();
  const [productDetails, setProductDetails] = useState({});

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const fetchData = useCallback(() => {
    axios(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProductDetails(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          key={"blur"}
          variant="flat"
          color="warning"
          onPress={() => handleOpen("blur")}
          className="capitalize"
        >
          View Details
        </Button>
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              <Image
              radius="lg"
              width="100%"
              alt={productDetails.title}
              className="w-full h-[160px] object-contain"
              src={productDetails.image}
            />
                {productDetails.title}
              </ModalHeader>
              <ModalBody>
              {productDetails.description}
              <div>
                  <p >Price : <b> ${productDetails.price}/-</b></p>
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
