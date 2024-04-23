import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { doc, updateDoc , db} from "../db/index.js";
import { toast } from "sonner";

export default function AdminEditModal({ product, visible, onClose }) {
  const { handleSubmit, register, formState: { errors }, reset } = useForm();
  const [editedProduct, setEditedProduct] = useState(null);


  useEffect(() => {
    if (product) {
      setEditedProduct(product);
      console.log("chala");
    } else {
      setEditedProduct(null); 
    }
  }, [product ]);

  // useEffect(() => {
  //   if (editedProduct) {
  //     // Merge the edited product data with the form data
  //     const updatedData = { ...editedProduct };
  //     setUpdatedData(updatedData);
  //   }
  // }, [editedProduct]);

  const onSubmit = async (data) => {
    // Merge the edited product data with the form data
    const updatedData = { ...editedProduct, ...data };
    const { id } = updatedData;
  
    const productRef = doc(db, "products", id);
  
    // let hasChanges = Object.keys(data).some(key => updatedData[key] === editedProduct[key]);
    // console.log(hasChanges);
    // console.log("data==>", data);
    // console.log("editedProduct", editedProduct);
    // console.log("updatedData", updatedData);
  
   
      try {
        // await updateDoc(productRef, updatedData); // Await the promise here
        // toast.success("Your Product has been updated !");
              toast.promise(updateDoc(productRef, updatedData), {
        loading: "Updating...",
        success: "Product updated successfully!",
        error: (err) => err.message || "Something went wrong.",
      });
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Failed to update product");
      }
    
    onCloseModal();
  };
  

  const onCloseModal = () => {
    setEditedProduct(null); // Reset editedProduct when modal is closed
    onClose();
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={visible}
      onClose={onCloseModal}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        }
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
          <ModalBody>
            {editedProduct && (
              <>
                <Input
                  type="text"
                  label="Title"
                  labelPlacement="outside"
                  defaultValue={editedProduct.title} 
                  {...register(
                    "title", { required: "Title is required", minLength: { value: 25, message: "Title must be at least 25 characters long" } })}
                  className="w-full poppins"
                  error={errors.title ? errors.title.message : ""}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                <Textarea
                  label="Description"
                  type="text"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  disableAutosize
                  className="poppins"
                  classNames={{
                    input: "min-h-[80px]",
                  }}
                  defaultValue={editedProduct.description}
                  {...register("description", { required: "Description is required", minLength: { value: 75, message: "Description must be at least 75 characters long" } })}
                  error={errors.description ? errors.description.message : ""}
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="default" className="poppins" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" className="poppins" type="submit">
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
