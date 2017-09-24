import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import { Form, Icon, Input, message, Button, Alert, Spin } from 'antd';
import ContainerDimensions from 'react-container-dimensions';
import Map from '../Map';
import './SearchForm.css';

const FormItem = Form.Item;

/* eslint-disable react/forbid-prop-types */

class SearchForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      location: '',
      stops: [],
      total: 0,
      current: 1,
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        fetch(`http://maps.google.com/maps/api/geocode/json?address=${this.state.location}&sensor=false&language=en`)
          .then(response => response.json())
          .then((response) => {
            if (response.status === 'OK') {
              this.setState({ data: response });
              fetch(`http://transportapi.com/v3/uk/bus/stops/near.json?lat=${response.results[0].geometry.location.lat}&lon=${response.results[0].geometry.location.lng}&api_key=6595ac315d0d3c31e2649cb82b5d885e&app_id=9f325c50`)
                .then(transport => transport.json())
                .then((transport) => {
                  this.setState({
                    stops: transport.total === 0 ? null : transport.stops,
                    total: transport.total,
                    current: 1,
                  });
                });
            } else {
              message.error('Failed to search');
            }
          });
      }
    });
  };

  loadMore = () => {
    const page = this.state.current + 1;
    fetch(`http://transportapi.com/v3/uk/bus/stops/near.json?lat=${this.state.data.results[0].geometry.location.lat}&lon=${this.state.data.results[0].geometry.location.lng}&api_key=6595ac315d0d3c31e2649cb82b5d885e&app_id=9f325c50&page=${page}`)
      .then(transport => transport.json())
      .then((transport) => {
        this.setState({
          stops: this.state.stops.concat(transport.stops),
          current: page,
        });
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem label="Search for bus stops in UK:">
          {getFieldDecorator('location', {
            rules: [{ required: true, message: 'Please, enter the location!' }],
          })(
            <Input
              suffix={<Icon type="search" />}
              placeholder="Please, enter the location"
              onChange={(event) => { this.setState({ location: event.target.value }); }}
            />,
          )}
        </FormItem>
        {this.state.data ?
          <div className="form__results">
            Results for {this.state.data.results[0].formatted_address}:
            {this.state.total > this.state.current * 25 &&
              <span><b> {this.state.current * 25}</b> loaded of</span>
            }
            <b> {this.state.total}</b> results
            {this.state.stops !== null ?
              <div className="form__map">
                <Spin className="form__mapSpin" size="large" />
                <ContainerDimensions>
                  <Map
                    stops={this.state.stops}
                    lat={this.state.data.results[0].geometry.location.lat}
                    lng={this.state.data.results[0].geometry.location.lng}
                  />
                </ContainerDimensions>
              </div>
            : <Alert message="Sorry, we cannot find any bus stops in this area" type="error" />}
            {this.state.total > this.state.current * 25 &&
              <Button type="primary" onClick={this.loadMore}>Load more</Button>
            }
          </div>
          : ''}
      </Form>
    );
  }
}

export default SearchForm;
