import React, { useState, useCallback, useContext, useEffect } from "react";
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
} from "@ant-design/icons";
import Cart from "../context/cart";
import axios from "axios";
import { Spinner, Chip } from "@nextui-org/react";
import ImageLoading from "../assets/loading.gif";
import { Image, Space, notification } from "antd";
import { db, collection, getDocs } from "../db/index";
import User from "../context";
import ToolTip from "./PopOver";

export default function ProductModal({ id }) {
  const { cart, setCart } = useContext(Cart);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const {login } = useContext(User)

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let productData = {};
      const docRef = collection(db, "products");
      const querySnapshot = await getDocs(docRef);
      const firestoreProducts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === id) {
          productData = data;
        }
      });

      if (Object.keys(productData).length === 0) {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        productData = response.data;
      }

      setProductDetails(productData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addToCartHandler = (data) => {
    console.log(data);

    // Add quantity field to the API data
    const dataWithQty = { ...data, qty: 1 };
    const storedCartData = localStorage.getItem("cart");
    let cartData = storedCartData ? JSON.parse(storedCartData) : [];
    const existingItemIndex = cartData.findIndex(
      (item) => item.id === dataWithQty.id
    );
    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].qty += 1;
    } else {
      cartData.push(dataWithQty);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart(cartData);
    console.log("Cart Data:", cartData);

    notification.success({
      message: "Item Added Successfully",
      description: `${dataWithQty.title.length > 150 ?dataWithQty.title.slice(0,125) + "..." : dataWithQty.title }!`,
      duration: 1.5,
    });

    onClose();
  };

  return (
    <div className="outfit">
      <div className="flex flex-wrap gap-3 ">
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
      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior={scrollBehavior}
      >
        <ModalContent className="{`md:h-[50vh]`}">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {loading ? (
                  <img
                    className="w-50 h-40 object-contain rounded-lg"
                    src={ImageLoading}
                  />
                ) : (
                  <div className=" flex justify-center items-center">
                    <Image
                      width={200}
                      src={productDetails.image || productDetails.imageUrl}
                      preview={{
                        toolbarRender: (
                          _,
                          {
                            transform: { scale },
                            actions: {
                              onFlipY,
                              onFlipX,
                              onRotateLeft,
                              onRotateRight,
                              onZoomOut,
                              onZoomIn,
                            },
                          }
                        ) => (
                          <Space size={12} className="toolbar-wrapper">
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined
                              disabled={scale === 1}
                              onClick={onZoomOut}
                            />
                            <ZoomInOutlined
                              disabled={scale === 50}
                              onClick={onZoomIn}
                            />
                          </Space>
                        ),
                      }}
                    />
                  </div>
                )}
                {loading ? (
                  <Spinner color="primary" className="mt-10 " />
                ) : (
                  <div className="capitalize outfit">
                    {productDetails.title.length > 150
                      ? productDetails.title?.slice(0, 125) + "...."
                      : productDetails.title}
                  </div>
                )}
              </ModalHeader>
              <ModalBody
                className="capitalize outfit"
                style={{ overflowWrap: "break-word" }}
              >
                {productDetails.description}
                <div>
                  {loading ? (
                    ""
                  ) : (
                    <div>
                      {" "}
                      <Chip
                        color="warning"
                        variant="dot"
                        className="bg-[#27272a] text-white "
                      >
                        {productDetails.category}
                      </Chip>
                      <br />
                      <p className="mt-5">
                        Price : <b> ${productDetails.price}/-</b>
                      </p>{" "}
                    </div>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  className="poppins"
                  onPress={onClose}
                >
                  Close
                </Button>
             {login.userStatus ?   <Button
                  color="primary"
                  className="poppins"
                  onClick={() => addToCartHandler(productDetails)}
                 
                  // onPress={() => console.log(productDetails)}
                >
                  Add To Cart
                </Button> : <ToolTip title={"Add To Cart "} val={`Please login to add to cart ↑ `}   />}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
