'use client';
import { Form, Input, Radio, RadioChangeEvent, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

import Navbar from './navbar';
import Footer from '@/app/(components)/footer';
import apiService from '@/services/APIservices';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Register() {
  const router = useRouter();
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
    address: '',
    phoneNumber: '',
    licenseNumber: '',
    about: '',
  };
  const [state, setState] = useState(initialState);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');
  const key = 'updatable';

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: messageContent,
        duration: 2,
      });
      setTimeout(() => {
        router.push('/doctor');
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (messageContent) {
      openMessage();
    }
  }, [messageContent]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RadioChangeEvent
  ) => {
    const { name, value } = e.target;
    console.log({ name });
    console.log({ value });
    setState((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const data = await apiService.register(state, 'doctor');
    const { message, result, error, accessToken } = data;
    console.log(result);
    if (error) {
      setMessageContent(error);
    } else {
      if (result) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userType', result.userType as string);
        console.log(result);
        setMessageContent(message as string);
        // setIsAuthenticated(true);
      }
    }
    setState(initialState);
  };
  return (
    <>
      <Navbar />
      {contextHolder}
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
            style={{ maxWidth: 900 }}
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
            <Form.Item label='Phone Number' htmlFor='phoneNumber'>
              <Input
                type='tel'
                id='phoneNumber'
                name='phoneNumber'
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
            <Form.Item label='License Number' htmlFor='licenseNumber'>
              <Input
                type='text'
                id='licenseNumber'
                name='licenseNumber'
                value={state.licenseNumber}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Gender' htmlFor='gender'>
              <Radio.Group id='gender' name='gender'>
                <Radio
                  id='male'
                  value='male'
                  onChange={(value) => handleChange(value)}
                >
                  Male
                </Radio>
                <Radio
                  id='female'
                  value='female'
                  onChange={(value) => handleChange(value)}
                >
                  Female
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='About' htmlFor='about'>
              <TextArea
                rows={4}
                id='about'
                name='about'
                required
                value={state.about}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
            <Form.Item label='Profile Picture' htmlFor='profile'>
              <Upload action='/upload.do' listType='picture-card'>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label='Specialisation' htmlFor='specialisation'>
              <Radio.Group id='specialisation' name='specialisation'>
                <Radio
                  id='specialisation1'
                  value='General Practice'
                  onChange={(value) => handleChange(value)}
                >
                  General Practice
                </Radio>
                <Radio
                  id='specialisation2'
                  value='Internal Medicine'
                  onChange={(value) => handleChange(value)}
                >
                  Internal Medicine
                </Radio>
                <Radio
                  id='specialisation3'
                  value='Pediatrics'
                  onChange={(value) => handleChange(value)}
                >
                  Pediatrics
                </Radio>
                <Radio
                  id='specialisation4'
                  value='Obstetrics and Gynecology'
                  onChange={(value) => handleChange(value)}
                >
                  Obstetrics and Gynecology
                </Radio>
                <Radio
                  id='specialisation5'
                  value='Surgery'
                  onChange={(value) => handleChange(value)}
                >
                  Surgery
                </Radio>
                <Radio
                  id='specialisation6'
                  value='Psychiatry'
                  onChange={(value) => handleChange(value)}
                >
                  Psychiatry
                </Radio>
                <Radio
                  id='specialisation7'
                  value='Dermatology'
                  onChange={(value) => handleChange(value)}
                >
                  Dermatology
                </Radio>
                <Radio
                  id='specialisation8'
                  value='Ophthalmology'
                  onChange={(value) => handleChange(value)}
                >
                  Ophthalmology
                </Radio>
                <Radio
                  id='specialisation9'
                  value='Ear Nose and Throat (ENT)'
                  onChange={(value) => handleChange(value)}
                >
                  Ear Nose and Throat (ENT)
                </Radio>
                <Radio
                  id='specialisation10'
                  value='Cardiology'
                  onChange={(value) => handleChange(value)}
                >
                  Cardiology
                </Radio>
                <Radio
                  id='specialisation11'
                  value='Endocrinology'
                  onChange={(value) => handleChange(value)}
                >
                  Endocrinology
                </Radio>
                <Radio
                  id='specialisation12'
                  value='Gastroenterology'
                  onChange={(value) => handleChange(value)}
                >
                  Gastroenterology
                </Radio>
                <Radio
                  id='specialisation13'
                  value='Neurology'
                  onChange={(value) => handleChange(value)}
                >
                  Neurology
                </Radio>
                <Radio
                  id='specialisation14'
                  value='Oncology'
                  onChange={(value) => handleChange(value)}
                >
                  Oncology
                </Radio>
              </Radio.Group>
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
