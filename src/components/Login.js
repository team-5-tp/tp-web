import React, { Component } from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import { API_ROOT} from '../constants';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
  class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            //Fire api call
            fetch(`${API_ROOT}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                })
            }).then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error(response.statusText);
            }).then((data) => {
                message.success('Login Success!')
                this.props.handleLogin(data);
            }).catch((err) => {
                message.error('Login Failed!');
                console.log(err);
            });
          }
        });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,1)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,1)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to='/register'>register now!</Link>
          </Form.Item>
        </Form>
      );
    }
  }
  export const Login = Form.create({ name: 'LoginForm'})(NormalLoginForm);