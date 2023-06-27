'use client';
import { Form, Input } from 'antd';

import React, { FormEvent, useState } from 'react';

import Footer from '@/app/(components)/footer';
import apiService from '@/services/APIservices';
import { login } from '../../redux/features/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';

type SizeType = Parameters<typeof Form>[0]['size'];

interface Props {
  user: string;
}

export default function Login(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default'
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const initialState = { email: '', password: '' };
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
    const data = await apiService.login(state, props.user);
    const { message, result, error } = data;
    console.log({ result });
    if (error) {
      setFormError(`${error}`);
    } else {
      if (result) {
        const username = result.userAuthenticated.name as string;
        const userType = result.userAuthenticated.userType as string;
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('userType', userType);
        setFormError('');

        dispatch(login(username));
        router.push(`/${userType}`);
      }
    }
    setState(initialState);
  };

  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <div className='grid grid-cols-2 gap-4 h-screen'>
          <div className='flex flex-col items-center justify-evenly'>
            <div className='flex flex-row items-start justify-start'>
              {/* <img
                className='h-auto w-44 rounded'
                src='/doctor-mobile.png'
                alt='Your Company'
              /> */}
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
              action={`${props.user}`}
              method='post'
              onFinish={submitForm}
            >
              <Form.Item label='Email' htmlFor='email'>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  required
                  value={state.email}
                  onChange={(e) => handleChange(e)}
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
              {formError && <p className='error-message'>{formError}</p>}
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
