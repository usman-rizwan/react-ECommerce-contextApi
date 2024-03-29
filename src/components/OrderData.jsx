import React, { useRef, useState, useContext, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button as NextButton
} from "@nextui-org/react";
import Highlighter from "react-highlight-words";
import { collection, query, where, onSnapshot, db } from "../db/index";
import { EyeOutlined } from "@ant-design/icons";
import User from "../context";
import { Link } from "react-router-dom";

const OrderData = () => {
  const { login } = useContext(User);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [userData, setUserData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalTableData, setModalTableData] = useState([]); 
  const searchInput = useRef(null);
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  useEffect(() => {
    getUserOrder();
  }, []);
  const getUserOrder = () => {
    const uid = login.user.uid;
    const q = query(collection(db, "orders"), where("userUid", "==", `${uid}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userOrderData = [];
      querySnapshot.forEach((doc) => {
        userOrderData.push({ key: doc.id, ...doc.data() });
      });
      setUserData(userOrderData);
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const showItemsModal = (items) => {
    setSelectedItems(items);
    
    const tableData = items.map((item, index) => ({
      key: index,
      name: item.title,
      quantity: item.qty,
      image: item.image || item.imageUrl,
      price: Math.round(item.price)
    }));
    setModalTableData(tableData);
    onOpen();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
            className="bg-blue-500"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            className="text-red-600 hover:text-red-600"
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, record) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "id",
      ...getColumnSearchProps("orderId"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showItemsModal(items)}
        >
          View Items
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      render: (text, record) => {
        let statusColor;
        switch (record.status) {
          case "accepted":
            statusColor = "bg-green-500";
            break;
          case "rejected":
            statusColor = "bg-red-500";
            break;
          default:
            statusColor = "bg-yellow-500";
        }
    
        return (
          <span className={`${statusColor} text-white p-1 rounded`}>
            {record.status}
          </span>
        );
      },
    },
    {
      title: " Amount",
      dataIndex: "totalAmount",
      key: "amount",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={userData}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        className="mt-5 container mx-auto capitalize"
      />
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior}>
      <ModalContent style={{height:"50vh"}}>
          {(onClose) => (
            <>
              <ModalHeader>Items Details</ModalHeader>
              <ModalBody>
              <ModalBody>
              <Table
                columns={[
                  {
                    title: "Image",
                    dataIndex: "image",
                    key: "image",
                    render: (image) => (
                      <img
                        src={image}
                        alt="Item"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ),
                  },
                  { title: "Name", dataIndex: "name", key: "name", },
                  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                  { title: "Price", dataIndex: "price", key: "price" },
                ]}
                dataSource={modalTableData}
              />
            </ModalBody>
              </ModalBody>
              <ModalFooter>
                <NextButton color="danger" variant="light" onPress={onClose} className="poppins">
                  Close
                </NextButton>
                <NextButton color="primary" variant="flat" className="poppins">
                <Link to={'/chat'}>Chat Seller</Link>
                </NextButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderData;
