/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { LeftCircleOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import apiService from '@/services/APIservices';
import { getAccessToken, openMessage } from '@/app/helper';
import { useDispatch } from 'react-redux';
import { setPatientToView } from '@/redux/features/patient-to-view-slice';
import '../../../../css/globals.css';
import '../../../../css/patient.css';
import '../../../../css/doctor.css';

export default function AddInfo() {
  const router = useRouter();
  const [juniorNote, setJuniorNote] = useState<string>('');
  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const selectedPatient = useAppSelector(
    (state) => state.patientToViewReducer.value
  );

  useEffect(() => {
    if (messageContent) {
      openMessage(
        messageApi,
        'updatable',
        messageContent,
        router,
        `/junior-doctor/${selectedPatient?.id}`
      );
    }
  }, [messageContent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJuniorNote(value);
  };

  const handleNoteSubmit = async (
    e: FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const data = await apiService.addJuniorNote(
      selectedPatient?.id as string,
      juniorNote,
      getAccessToken() as string
    );
    const { message, result, error } = data;
    if (error) {
      setMessageContent(error);
    } else {
      if (result) {
        setMessageContent(message as string);
        dispatch(setPatientToView(result));
      }
    }
    setJuniorNote('');
  };

  return (
    <>
      <AuthNavbar user={'junior-doctor'} auth={'login'} />
      {contextHolder}
      <div className='button-and-title'>
        <button onClick={() => router.back()}>
          <LeftCircleOutlined />
        </button>
      </div>
      <main className='grid-container'>
        <div className='profile-box'>
          <div className='dashboard-container add-info-container'>
            <h3>Add note</h3>
            <div>
              <form onSubmit={handleNoteSubmit}>
                <Form.Item htmlFor='newPatientSummary'>
                  <Input
                    type='text'
                    id='newPatientSummary'
                    name='newPatientSummary'
                    value={juniorNote}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Form.Item>
                <button
                  className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
                  type='submit'
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
