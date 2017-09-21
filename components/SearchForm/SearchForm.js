import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import { Form, Icon, Input, message, Alert } from 'antd';
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
    };
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        fetch(`http://maps.google.com/maps/api/geocode/json?address=${this.state.location}&sensor=false`)
          .then(response => response.json())
          .then((response) => {
            if (response.status === 'OK') {
              this.setState({ data: response.results[0] });
              fetch(`http://transportapi.com/v3/uk/bus/stops/near.json?lat=${response.results[0].geometry.location.lat}lon=${response.results[0].geometry.location.lng}&api_key=6595ac315d0d3c31e2649cb82b5d885e&app_id=9f325c50`)
                .then(transport => transport.json())
                .then((transport) => {
                  this.setState({ stops: transport.total === 0 ? null : transport.stops });
                });
              message.success('Success search');
            } else {
              message.error('Failed to search');
            }
          });
      }
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
            Results for {this.state.data.formatted_address}:
            {this.state.stops !== null ?
              this.state.stops.map(
                stop => <Alert key={stop.atcocode} message={stop.name} type="info" closable />,
              )
            : <Alert message="No bus stops find" type="error" />}
          </div>
          : ''}
      </Form>
    );
  }
}

export default SearchForm;
