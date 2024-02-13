import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
  Link,
} from "@nextui-org/react";

export default function FormModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState();
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };
  return (
    <>
      <Button
        key={"blur"}
        variant="flat"
        backdrop={backdrop}
        color="primary"
        onPress={() => handleOpen("blur")}
      >
        Order Now
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order Confirm
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  required
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  variant="bordered"
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Textarea
                  label="Address"
                  variant="bordered"
                  placeholder="Enter your address"
                  disableAnimation
                  disableAutosize
                  isRequired="true"
                  classNames={{
                    base: "w-full", 
                    input: "resize-y min-h-[40px] min-w-[200px]",
                  }}
                />
                <div className="flex py-2 px-1 justify-between"></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" >
                  Confirm Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
