'use client';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import React, { FormEvent, useState } from 'react';
// import { useRouter } from 'next/navigation';

import Navbar from './navbar';
import Footer from '@/app/(components)/footer';
import apiService from '@/services/APIservices';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Register() {
  // const router = useRouter();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const initialState = {
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: '',
    licenseNumber: '',
  };
  const [state, setState] = useState(initialState);
  const [formError, setFormError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({ name });
    console.log({ value });
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const data = await apiService.register(state, 'junior-doctor');
    const { message, result, error } = data;
    console.log({ result });
    if (error) {
      setFormError(`${error}`);
    } else {
      if (result) {
        localStorage.setItem('accessToken', result.accessToken);
        setFormError('');
        // router.push('/');
        // setIsAuthenticated(true);
      }
    }
    setState(initialState);
  };
  return (
    <>
      <Navbar />
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <h2 className='font-bold text-2xl text-primary'>Register</h2>
        <h3>Explore the future with us.</h3>
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout='horizontal'
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 900, minWidth: 600 }}
            action='/'
            method='post'
            onFinish={submitForm}
          >
            <Form.Item label='Name' htmlFor='name'>
              <Input
                type='text'
                id='name'
                name='name'
                value={state.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Email' htmlFor='email'>
              <Input
                type='email'
                id='email'
                name='email'
                value={state.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Password' htmlFor='password'>
              <Input
                type='password'
                id='password'
                name='password'
                value={state.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Phone Number' htmlFor='phone'>
              <Input
                type='tel'
                id='phone'
                name='phone'
                value={state.phoneNumber}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Address' htmlFor='address'>
              <Input
                type='text'
                id='address'
                name='address'
                value={state.address}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='License Number' htmlFor='license'>
              <Input
                type='text'
                id='license'
                name='license'
                value={state.licenseNumber}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Gender' htmlFor='gender'>
              <Radio.Group id='gender' name='gender'>
                <Radio id='male' value='male'>
                  Male
                </Radio>
                <Radio id='female' value='female'>
                  Female
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='Profile Picture' htmlFor='profile'>
              <Upload action='/upload.do' listType='picture-card'>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <button
              className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
              type='submit'
            >
              Register
            </button>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
