import React, { useRef, useState, useContext, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table ,Modal } from "antd";
import Highlighter from "react-highlight-words";
import { collection, query, where, onSnapshot, db } from "../db/index";
import {EyeOutlined}  from "@ant-design/icons"
import User from "../context";

const OrderData = () => {
  const { login } = useContext(User);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [userData, setUserData] = useState([]);
  const searchInput = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [visible, setVisible] = useState(false);
  
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
    setVisible(true);
  };

  const handleItemsModalCancel = () => {
    setVisible(false);
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
            close
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      width: "30%",
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
      className="mt-5 container mx-auto"
    />
    <Modal
      title="Order Items"
      visible={visible}
      onCancel={handleItemsModalCancel}
      footer={null}
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      <ul>
        {selectedItems.map((item, index) => (
          <li className="capitalize" key={index}>
            <h1>Item{index + 1}</h1>
            {item.category}
          <br/>
          Description: {item.description}
          <br/>
           - Quantity: {item.qty}
           <hr/>
           </li>
        ))}
      </ul>
    </Modal>
  </>
  );
};

export default OrderData;
