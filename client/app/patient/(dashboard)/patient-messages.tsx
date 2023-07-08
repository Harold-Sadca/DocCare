/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { TypeMessage } from '../../../../server/types/types';
import { useAppSelector } from '@/redux/store';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Popover, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import LoadingSpinner from '@/app/(components)/loading';

// sets the connection path for the socket
const socket = io('ws://localhost:3001');

export default function PatientMessages() {
  const initialState = { message: '', sender_name: '', receiver_name: '' };
  const [messageState, setMessageState] = useState(initialState);
  const [startChat, setStartChat] = useState<boolean>(false);
  const allMessages = useAppSelector((state) => state.allMessagesReducer.value);
  const [patientMessages, setPatientMessages] = useState<TypeMessage[]>([]);
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const { id } = currentPatient;
  const name = id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (name != '') {
      socketConnect();
      socket.emit('patient logged');
      setPatientMessages(
        allMessages.filter(
          (mes) => mes.sender_id === id || mes.receiver_id === id
        )
      );
    }
  }, [name]);

  let newMessage;

  function handleClick() {
    newMessage = {
      content: messageState.message,
      sender_id: id as string,
      sender_name: name,
      receiver_name: 'Doctor',
      date: Date.now() as unknown as string,
    } as TypeMessage;
    // 'patient message' is an event name we define
    // which we can use on the backend to separate events and handle them accordingly
    // 'emit' is a socket method that would send an event to the backend
    // 'emit' sends an event to everyone except the sender
    socket.emit('patient message', newMessage);
    setPatientMessages([...patientMessages, newMessage]);
    messageState.message = '';
  }

  function socketConnect() {
    //assigns a 'name' property on the socket auth for us to use on the backend
    //to authenticate and create a private room
    socket.auth = { name };
    socket.connect();
  }
  // 'from junior' is an event we defined in the backend
  // when we called emit we are invoking an event with that name
  // and the backend will capture it when it spots it

  socket.on('from junior', (message) => {
    setPatientMessages([...patientMessages, message]);
  });

  return (
    <main className={startChat ? 'messages-box-start-chat' : 'messages-box'}>
      <div
        className={
          startChat
            ? 'messages-container-start-chat dashboard-container'
            : 'messages-container dashboard-container'
        }
      >
        <h3 onClick={() => setStartChat(!startChat)}>
          <MessageOutlined /> Talk to the doctor
        </h3>
        {startChat && (
          <>
            <div className='messages-container-top'>
              <div className='chat-container'>
                {patientMessages.map((mes) => {
                  return mes.receiver_name === 'Doctor' ? (
                    <div className='user-message patient-message' key={mes.id}>
                      <div className='message'>
                        <p>
                          {' '}
                          <span id='bot-response'>{mes.content}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className='user-message junior-doctor-message'
                      key={mes.id}
                    >
                      <div className='message'>
                        <p>
                          {' '}
                          <span id='bot-response'>{mes.content}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='messages-container-bottom'>
              <div className='chat-input'>
                <input
                  name='message'
                  value={messageState.message}
                  onChange={(e) => handleChange(e)}
                  placeholder='Type a message...'
                ></input>
                <button className='send' onClick={handleClick}>
                  <SendOutlined />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
