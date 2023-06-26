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
} from 'antd';
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
      <div className='flex min-h-screen flex-col'>
        <div className='grid grid-cols-2 gap-4 h-screen'>
          <div className='flex flex-col items-center justify-evenly'>
            <div className='flex flex-row items-start justify-start'>
              <img
                className='h-auto w-44 rounded'
                src='/doctor-mobile.png'
                alt='Your Company'
              />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='font-bold text-2xl text-primary'>Register</h2>
            <h3>Explore the future with us.</h3>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout='horizontal'
              initialValues={{ size: componentSize }}
              onValuesChange={onFormLayoutChange}
              size={componentSize as SizeType}
              style={{ maxWidth: 600 }}
              action='/'
              method='post'
            >
              <Form.Item label='Name' htmlFor='name'>
                <Input type='text' id='name' name='name' required />
              </Form.Item>
              <Form.Item label='Email' htmlFor='email'>
                <Input type='email' id='email' name='email' required />
              </Form.Item>

              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' name='password' required />
              <label htmlFor='phone'>Phone Number:</label>
              <input type='tel' id='phone' name='phone' required />
              <label htmlFor='address'>Address:</label>
              <input type='text' id='address' name='address' required />
              <label htmlFor='license'>License Number:</label>
              <input type='text' id='license' name='license' required />
              <label htmlFor='gender'>Gender:</label>
              <div>
                <input type='radio' id='male' name='gender' value='male' />
                <label htmlFor='male'>Male</label>
                <input type='radio' id='female' name='gender' value='female' />
                <label htmlFor='female'>Female</label>
              </div>
              <label htmlFor='about'>About:</label>
              <textarea id='about' name='about' required></textarea>
              <label htmlFor='profile'>Profile Picture:</label>
              <input
                type='file'
                id='profile'
                name='profile'
                accept='image/*'
                required
              />
              <label htmlFor='specialisation'>Specialisation:</label>
              <div>
                <input
                  type='radio'
                  id='specialisation1'
                  name='specialisation'
                  value='specialisation1'
                />
                <label htmlFor='specialisation1'>Specialisation 1</label>
                <input
                  type='radio'
                  id='specialisation2'
                  name='specialisation'
                  value='specialisation2'
                />
                <label htmlFor='specialisation2'>Specialisation 2</label>
                <input
                  type='radio'
                  id='specialisation3'
                  name='specialisation'
                  value='specialisation3'
                />
                <label htmlFor='specialisation3'>Specialisation 3</label>
              </div>

              <button
                className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
                type='submit'
              >
                Register
              </button>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
