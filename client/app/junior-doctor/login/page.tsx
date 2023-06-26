'use client';
import { Form, Input } from 'antd';

const { TextArea } = Input;
import React, { useState } from 'react';

import Navbar from './navbar';
import Footer from '@/app/(components)/footer';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function Login() {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [state, setState] = useState(initialState);
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
            <h2 className='font-bold text-2xl text-primary'>Login</h2>
            <h3>Explore the future with us.</h3>
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
              <Form.Item label='Email' htmlFor='email'>
                <Input type='email' id='email' name='email' required />
              </Form.Item>
              <Form.Item label='Password' htmlFor='password'>
                <Input type='password' id='password' name='password' required />
              </Form.Item>

              <button
                className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
                type='submit'
              >
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
