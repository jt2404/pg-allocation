import React from 'react'
import { Layout } from 'antd';
import HeaderBar from '../Header'

function Navigation() {
    return (
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Layout className="site-layout">
          <HeaderBar></HeaderBar>
          </Layout>
        </Layout>
      );
}

export default Navigation