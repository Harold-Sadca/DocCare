// /* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Form, Input, Radio, RadioChangeEvent, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { saveToDatabase } from '../../_actions';

import Navbar from './navbar';
import Footer from '@/app/(components)/footer';
import apiService from '@/services/APIservices';
import { useRouter } from 'next/navigation';

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
    dateOfBirth: '',
    bloodType: '',
    medications: '',
    allergies: '',
    surgicalHistory: '',
    familyMedicalHistory: '',
    profilePicture: '',
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
        router.push('/patient/dashboard');
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
  const [images, setImages] = useState([]);
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const data = await apiService.register(state, 'patient');
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImages((prevImg) => ({
        ...prevImg,
        profilePicture: file,
      }));
    }
  };

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fileInput = e.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', process.env.CLOUDINARY_API_KEY as string);
    // formData.append('timestamp', timestamp.toString());
    // formData.append('signature', signature);
    formData.append('folder', 'next');
    formData.append('upload_preset', 'wzvpvzn8');

    const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const data = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
    await saveToDatabase(data);
    // write to database using server actions
    // await saveToDatabase({
    //   public_id: data?.public_id,
    //   version: data?.version,
    //   signature: data?.signature,
    // });
  }

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
            style={{ maxWidth: 900, minWidth: 600 }}
            action='/'
            method='post'
            onFinish={handleFormSubmit}
          >
            {/* <Form.Item label='Name' htmlFor='name'>
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
            <Form.Item label='Date of Birth' htmlFor='dateOfBirth'>
              <Input
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                value={state.dateOfBirth}
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
            </Form.Item> */}
            {/* <Form.Item label='Profile Picture' htmlFor='profile'>
              <Upload action={cloudinaryURL} listType='picture-card'>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item> */}
            <Form.Item label='Profile Picture' htmlFor='profilePicture'>
              <input
                type='file'
                id='profilePicture'
                name='profilePicture'
                accept='image/*'
                value={state.profilePicture}
                onChange={handleImageChange}
                required
              />
            </Form.Item>
            {/* <Form.Item label='Blood Type' htmlFor='bloodType'>
              <Input
                type='text'
                id='bloodType'
                name='bloodType'
                value={state.bloodType}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Allergies' htmlFor='allergies'>
              <TextArea
                rows={2}
                id='allergies'
                name='allergies'
                value={state.allergies}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Medications' htmlFor='medications'>
              <TextArea
                rows={2}
                id='medications'
                name='medications'
                value={state.medications}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item>
            <Form.Item label='Surgical History' htmlFor='surgicalHistory'>
              <TextArea
                rows={2}
                id='surgicalHistory'
                name='surgicalHistory'
                value={state.surgicalHistory}
                onChange={(e) => handleChange(e)}
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
                value={state.familyMedicalHistory}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Item> */}
            <button
              className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
              type='submit'
            >
              Register
            </button>
          </Form>
          <form onSubmit={handleFormSubmit}>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              required
            />
            <button type='submit'>Upload</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
