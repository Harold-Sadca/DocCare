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
import React, { useState } from 'react';

import Navbar from './navbar';
import Footer from '@/app/(components)/footer';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Register() {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
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
          >
            <Form.Item label='Name' htmlFor='name'>
              <Input type='text' id='name' name='name' required />
            </Form.Item>
            <Form.Item label='Email' htmlFor='email'>
              <Input type='email' id='email' name='email' required />
            </Form.Item>
            <Form.Item label='Password' htmlFor='password'>
              <Input type='password' id='password' name='password' required />
            </Form.Item>
            <Form.Item label='Phone Number' htmlFor='phone'>
              <Input type='tel' id='phone' name='phone' required />
            </Form.Item>
            <Form.Item label='Address' htmlFor='address'>
              <Input type='text' id='address' name='address' required />
            </Form.Item>
            <Form.Item label='Date of Birth' htmlFor='dob'>
              <Input type='date' id='dob' name='dob' required />
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
            <Form.Item label='Blood Type' htmlFor='bloodType'>
              <Input type='text' id='bloodType' name='bloodType' required />
            </Form.Item>
            <Form.Item label='Allergies' htmlFor='allergies'>
              <TextArea rows={2} id='allergies' name='allergies' required />
            </Form.Item>
            <Form.Item label='Medications' htmlFor='medications'>
              <TextArea rows={2} id='medications' name='medications' required />
            </Form.Item>
            <Form.Item label='Surgical History' htmlFor='surgicalHistory'>
              <TextArea
                rows={2}
                id='surgicalHistory'
                name='surgicalHistory'
                required
              />
            </Form.Item>
            <Form.Item
              label='Family Medical History'
              htmlFor='familyMedicalHistory'
            >
              <TextArea
                rows={2}
                id='familyMedicalHistory'
                name='familyMedicalHistory'
                required
              />
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
