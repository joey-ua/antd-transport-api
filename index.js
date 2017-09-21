import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Form } from 'antd';
import SearchForm from './components/SearchForm';
import './index.css';

const { Header, Content, Footer } = Layout;
const ApiSearchForm = Form.create()(SearchForm);

function App() {
  return (
    <Layout className="app__layout">
      <Header className="app__header">
        <div className="app__logo" />
        <h1>Transport API</h1>
      </Header>
      <Content className="app__wrapper">
        <div className="app__content">
          <ApiSearchForm />
        </div>
      </Content>
      <Footer className="app__footer">
        Created by Andery Karpenko - 2017
      </Footer>
    </Layout>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
