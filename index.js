import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Form, Icon, Modal } from 'antd';
import SearchForm from './components/SearchForm';
import './index.css';

const { Header, Content, Footer } = Layout;
const ApiSearchForm = Form.create()(SearchForm);

const info = () => (
  Modal.info({
    title: 'Transport API',
    content: (
      <div className="app__modalContent">
        <p>
          This application was created to make some experience in interaction with different APIs
        </p>
        <h3>Used libraries:</h3>
        <ul>
          <li><a href="https://facebook.github.io/react/">React</a></li>
          <li><a href="https://ant.design/">Ant Design</a></li>
          <li><a href="https://github.com/istarkov/google-map-react">google-map-react</a></li>
        </ul>
        <h3>Used APIs:</h3>
        <ul>
          <li><a href="https://developers.google.com/maps/documentation/geocoding/">Google Maps Geocoding API</a></li>
          <li><a href="https://developers.google.com/maps/documentation/javascript/">Google Maps JavaScript API</a></li>
          <li><a href="https://www.transportapi.com/">TransportAPI</a></li>
        </ul>
      </div>
    ),
    okText: 'Close',
  })
);

const App = () => (
  <Layout className="app__layout">
    <Header className="app__header">
      <div className="app__title">
        <div className="app__logo" />
        <h1>Transport API</h1>
      </div>
      <Icon className="app__info" type="info-circle-o" onClick={info} />
    </Header>
    <Content className="app__wrapper">
      <div className="app__content">
        <ApiSearchForm />
      </div>
    </Content>
    <Footer className="app__footer">
      Created by Andrey Karpenko - 2017
    </Footer>
  </Layout>
);


ReactDOM.render(<App />, document.getElementById('root'));
