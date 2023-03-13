import React from 'react'
import { Layout } from 'antd';
import HeaderBar from '../Header'
import Homescreen from '../HomeScreen/Home';

function Navigation() {
    return (
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Layout className="site-layout">
          {/* <HeaderBar></HeaderBar> */}
          <Homescreen  />
        </Layout>
      </Layout>
    );
}

export default Navigation