'use client';
import {
  Form,
  Input,
  Radio,

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
            style={{ maxWidth: 900 }}
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
            <Form.Item label='License Number' htmlFor='license'>
              <Input type='text' id='license' name='license' required />
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
            <Form.Item label='About' htmlFor='about'>
              <TextArea rows={4} id='about' name='about' required />
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
                <Radio id='specialisation1' value='General Practice'>
                  General Practice
                </Radio>
                <Radio id='specialisation2' value='Internal Medicine'>
                  Internal Medicine
                </Radio>
                <Radio id='specialisation3' value='Pediatrics'>
                  Pediatrics
                </Radio>
                <Radio id='specialisation4' value='Obstetrics and Gynecology'>
                  Obstetrics and Gynecology
                </Radio>
                <Radio id='specialisation5' value='Surgery'>
                  Surgery
                </Radio>
                <Radio id='specialisation6' value='Psychiatry'>
                  Psychiatry
                </Radio>
                <Radio id='specialisation7' value='Dermatology'>
                  Dermatology
                </Radio>
                <Radio id='specialisation8' value='Ophthalmology'>
                  Ophthalmology
                </Radio>
                <Radio id='specialisation9' value='Ear Nose and Throat (ENT)'>
                  Ear Nose and Throat (ENT)
                </Radio>
                <Radio id='specialisation10' value='Cardiology'>
                  Cardiology
                </Radio>
                <Radio id='specialisation11' value='Endocrinology'>
                  Endocrinology
                </Radio>
                <Radio id='specialisation12' value='Gastroenterology'>
                  Gastroenterology
                </Radio>
                <Radio id='specialisation13' value='Neurology'>
                  Neurology
                </Radio>
                <Radio id='specialisation14' value='Oncology'>
                  Oncology
                </Radio>
              </Radio.Group>
            </Form.Item>
            {formError && <p className='error-message'>{formError}</p>}
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
