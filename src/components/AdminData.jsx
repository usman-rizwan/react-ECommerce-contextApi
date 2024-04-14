import React, { useRef, useState, useContext, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select } from "antd";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button as NextButton,
} from "@nextui-org/react";
import Highlighter from "react-highlight-words";
import {
  collection,
  onSnapshot,
  db,
  doc,
  updateDoc,
  query,
  orderBy,
} from "../db/index";
import { EyeOutlined } from "@ant-design/icons";
import User from "../context";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminData = () => {
  const { login } = useContext(User);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [userData, setUserData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalTableData, setModalTableData] = useState([]);
  const searchInput = useRef(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderState, setSelectedOrderState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");


  useEffect(() => {
    getUserOrder();
  }, []);

  // Get all users orders
  const getUserOrder = () => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userOrderData = [];
      querySnapshot.forEach((doc) => {
        userOrderData.push({ key: doc.id, ...doc.data() });
      });
      setUserData(userOrderData);
    });
  };
  // {
  //   console.log(userData , "userData<<<<<<");
  // }

  // Item search
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Item reset
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // User ordered items in table
  const showItemsModal = (items) => {
    setSelectedItems(items);

    const tableData = items.map((item, index) => ({
      key: index,
      name:
        item.title.length > 200 ? item.title.slice(0, 50) + "..." : item.title,
      quantity: item.qty,
      image: item.image || item.imageUrl,
      price: Math.round(item.price),
    }));

    setModalTableData(tableData);
    onOpen();
  };

  // Update user order status
  const updateOrderState = async () => {
    if (selectedOrderState !== null && selectedOrderId) {
      setLoading(true);
      const docRef = doc(db, "orders", `${selectedOrderId}`);

      toast.promise(updateDoc(docRef, { status: selectedOrderState }), {
        loading: "Updating Order Status...",
        success: "Order Status updated !",
        error: (err) => err.message || "Something went wrong.",
      });

      console.log(
        selectedOrderId,
        selectedOrderState,
        "selectedItems,selectedOrderId"
      );
      console.log(
        `Order id  ${selectedOrderId} state updated to ${selectedOrderState}`
      );
      setSelectedOrderState(null);
      setSelectedOrderId(null);
      setLoading(false);
    } else {
      // message.error("Please select an order and a new status.");
      toast.error("Please select an order and a new status.");
      console.error(
        `Selected order ID ${selectedOrderId} or state ${selectedOrderState} is missing`
      );
      setLoading(false);
    }
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


  // Added Columns  
  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      ...getColumnSearchProps("orderId"),
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
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
      width: 100,
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
          <span
            className={`${statusColor} text-gray-100 p-1 rounded font-bold`}
          >
            {record.status}
          </span>
        );
      },
    },
    {
      title: " Amount",
      dataIndex: "totalAmount",
      key: "amount",
      ...getColumnSearchProps("totalAmount"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => {
        // Define character limits for line break and Next Line
        const lineBreakLimit = 30;
        const nextLineLimit = 70;
    
        // Check if address exceeds the Next Line limit
        if (text.length > nextLineLimit) {
          return (
            <div>
              <div>{text.slice(0, lineBreakLimit)}</div>
              <div>{text.slice(lineBreakLimit, nextLineLimit) + "..."}</div>
            </div>
          );
        }
        // Check if address exceeds the line break limit
        else if (text.length > lineBreakLimit) {
          return (
            <div>
              <div>{text.slice(0, lineBreakLimit)}</div>
              <div>{text.slice(lineBreakLimit)}</div>
            </div>
          );
        }
        // If address does not exceed any limit
        else {
          return text;
        }
      },
    },
    {
      title: "Order state",
      key: "state",
      render: (text, record) => {
        return (
          <>
            <Select
              defaultValue={record.status}
              style={{ width: 120 }}
              onChange={(value) => {
                setSelectedOrderState(value);
                setSelectedOrderId(record.key);
              }}
            >
              <Select.Option value="accepted">Accepted</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
            <NextButton
              disabled={loading}
              className="lg:ml-3 sm:ml-0 mt-1 lg:w-24 md:w-28 sm:w-32  bg-white border-3 hover:bg-blue-200 hover:text-blue-500"
              onClick={() => {
                updateOrderState();
              }}
            >
              Save
            </NextButton>
          </>
        );
      },
    },
  ];
  return (
    <>
    {/* Main Table */}
      <Table
        columns={columns}
        dataSource={userData}
        className="mt-5 container mx-auto capitalize"
        pagination={{ pageSize: 6 }}
        scroll={{ x: true }}
        size="small"
      />
      {/* Ordered items modal */}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Order Details</ModalHeader>

              <ModalBody>
                <Table
                  pagination={{ pageSize: 4 }}
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
                    { title: "Name", dataIndex: "name", key: "name" },
                    {
                      title: "Quantity",
                      dataIndex: "quantity",
                      key: "quantity",
                    },
                    { title: "Price", dataIndex: "price", key: "price" },
                  ]}
                  dataSource={modalTableData}
                />
                {console.log(modalTableData)}
              </ModalBody>
              <ModalFooter>
                <NextButton
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="poppins"
                >
                  Close
                </NextButton>
                <NextButton color="primary" variant="flat" className="poppins">
                  <Link to={"/chat"}>Chat Now</Link>
                </NextButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminData;
