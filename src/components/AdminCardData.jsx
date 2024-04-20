import React, { useCallback, useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Image } from "antd";
import { collection, getDocs, db, doc, deleteDoc } from "../db/index";
import "./style.scss";
import LoadSpin from "./LoadSpin";
import { toast } from "sonner";
import EmptyCart from "./EmptyCart";
import AdminEditModal from "./AdminEditModal";

const AdminDataCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      const firestoreProducts = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        firestoreProducts.push({ id: doc.id, ...doc.data() });
      });
      setProducts(firestoreProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const delProduct = async (id) => {
    try {
      toast.promise(deleteDoc(doc(db, "products", id)), {
        loading: "Deleting...",
        success: "Product deleted successfully!",
        error: (err) => err.message || "Something went wrong.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  useEffect(() => {
    getProducts();
  }, [delProduct]);

  return (
    <div className="flex flex-wrap justify-center">
      {loading ? (
        <LoadSpin />
      ) : (
        products.length > 0 ? (
          products.map((value) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4" key={value.id}>
              <Card
                className="w-full h-full"
                actions={[
                  <span key="delete" onClick={() => delProduct(value.id)} className="text-red-400 text-lg cursor-pointer"><DeleteOutlined /></span>,
                  <span key="edit" className="text-blue-400 text-lg cursor-pointer" onClick={() => editProduct(value)}><EditOutlined /></span>,
                ]}
              >
                <div className="flex justify-center items-center max-h-[200px] overflow-hidden">
                  <Image
                    src={value.imageUrl}
                    alt="example"
                    className="w-full flex justify-center items-center"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="overflow-y-auto overflow-x-hidden h-[150px]">
               <span className="text-lg font-medium mt-2 poppins"> <span className="font-bold "> TITLE :</span>  {value.title.length > 150 ? value.title.slice(0, 180) + "..." : value.title}</span>
                  <br/>
                  <div className="border-t border-gray-300 my-1"></div>
                  <span className="font-bold text-lg"> Description :</span>
                  {value.description.match(/.{1,30}/g).map((desc, index) => (
                    <div key={index} className="poppins text-base">
                       {desc}
                      <br />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))
        ) : (
          <EmptyCart description={"No products posted yet :( "} show={"none"} />
        )
      )}
      <AdminEditModal visible={modalVisible} onClose={closeModal} product={selectedProduct} />
    </div>
  );
};

export default AdminDataCard;