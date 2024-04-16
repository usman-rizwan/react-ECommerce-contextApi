import React from 'react';
import { Tabs } from 'antd';
import AddItems from '../components/AddItems';
import AdminDataCard from './AdminCardData';

// const { TabPane } = Tabs;

// const AdminTabs = () => (
//   <Tabs defaultActiveKey="1" centered>
//     <Tabs.TabPane tab="Add Product" key="1">
//       <AddItems />
//     </Tabs.TabPane>
//     <Tabs.TabPane tab="My Products" key="2">
//       <AdminDataCard/>
//       </Tabs.TabPane>
//   </Tabs>
// );

// export default AdminTabs;



// works when >=4.23.0, recommended ✅
// import { Tabs } from 'antd';
// import React from 'react';
const AdminTabs = () => (
  <Tabs defaultActiveKey="1" centered>
    <Tabs.TabPane tab="Add Product" key="1">
     <AddItems/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Manage Product" key="2">
     < AdminDataCard/>
    </Tabs.TabPane>
  
  </Tabs>
);
export default AdminTabs;