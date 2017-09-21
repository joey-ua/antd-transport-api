import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Layout, Input, Icon } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="app__layout">
      <Header className="app__header">
        <div className="app__logo" />
        <h1>Transport API</h1>
      </Header>
      <Content className="app__wrapper">
        <div className="app__content">
          <Input suffix={<Icon type="search" />} placeholder="Please, enter the location" />
        </div>
      </Content>
      <Footer className="app__footer">
        Created by Andery Karpenko - 2017
      </Footer>
    </Layout>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
