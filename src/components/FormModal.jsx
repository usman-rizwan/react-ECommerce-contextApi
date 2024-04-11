import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { addDoc, db, serverTimestamp, collection,updateDoc } from "../db/index.js";
import { useNavigate } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
import Cart from "../context/cart.js";
import User from "../context/index.js";
import { toast } from "sonner";

const FormModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState();
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const { setCart } = useContext(Cart);
  const { login } = useContext(User);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedData) {
      const retrievedData = storedData;
      setCartData(retrievedData);
    }
  }, []);
  let deliveryCharges = 100;
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => {
      const itemQuantity = parseInt(item.qty);
      const itemPrice = parseFloat(item.price);

      if (!isNaN(itemQuantity) && !isNaN(itemPrice)) {
        let totalAmount = Math.round(total + itemQuantity * itemPrice);
        return totalAmount;
      } else {
        console.log(
          "Invalid item:",
          item,
          "Quantity:",
          item.quantity,
          "Price:",
          item.price
        );
        return Math.round(total);
      }
    }, 100);
  };

  const confirmOrder = async ({ name, email, address }) => {
    console.log(name, email, address);
    const orderDetails = {
      name,
      email,
      address,
      totalItems: cartData.length,
      totalAmount: calculateTotalPrice(),
      items: cartData,
      userUid: login?.user?.uid,
      status: "pending",
      timestamp: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "orders"), orderDetails);
    await updateDoc(docRef, {
      orderId: docRef.id
    });
    console.log("Document written with ID: ", docRef.id);
    toast.success("Your Order has been placed successfully!");
    setCartData([]);
    localStorage.clear();
    setCart(0);
    navigate('/orderstatus')
    console.log(orderDetails);
  };

  return (
    <>
      {cartData && cartData.length > 0 ? (
        <Button
          key={"blur"}
          variant="flat"
          backdrop={backdrop}
          color="primary"
          onPress={() => handleOpen("blur")}
        >
          Order Now
        </Button>
      ) : (
        ""
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="poppins"
      >
       <ModalContent style={{ overflow: 'hidden' }}>
  {() => (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Order Details
      </ModalHeader>
      <ModalBody>
        <div className="check-out-form-container">
          <CheckOutForm confirmOrder={confirmOrder} />
        </div>
        <div className="flex  px-1 justify-between poppins">
          <div>Total Items:</div>
          <div className="text-lg font-bold"> {cartData.length}</div>
        </div>
        <div className="flex  px-1 justify-between poppins">
          <div>Delivery Charges:</div>
          <div className="text-lg font-bold"> ${deliveryCharges}/-</div>
        </div>
        <div className="flex justify-between poppins">
          <div>Total Price:</div>
          <div className="text-lg font-bold">
            ${calculateTotalPrice()}/-
          </div>
        </div>
      </ModalBody>
    </>
  )}
</ModalContent>

      </Modal>
    </>
  );
};

export default FormModal;
