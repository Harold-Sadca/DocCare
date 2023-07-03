/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import './patient-messagess.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { TypeMessage } from '../../../../server/types/types';
import { useAppSelector } from '@/redux/store';
import { Button, Popover, Space } from 'antd';


// sets the connection path for the socket
const socket = io('ws://localhost:3001');

export default function PatientMessages() {
  const initialState = { message: '', sender_name: '', receiver_name: '' };
  const [messageState, setMessageState] = useState(initialState);
  const [allMessages, setAllMessages] = useState<TypeMessage[]>([]);
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
    if(name != '') {
      socketConnect();
    }
  }, [name]);

  let newMessage

  function handleClick() {
    newMessage = {
      content: messageState.message,
      sender_id: id as string,
      sender_name: name,
      receiver_name: 'Doctor',
      date: Date.now() as unknown as string
    } as TypeMessage;
    // 'patient message' is an event name we define
    // which we can use on the backend to separate events and handle them accordingly
    // 'emit' is a socket method that would send an event to the backend
    // 'emit' sends an event to everyone except the sender
    socket.emit('patient message', newMessage);
    setAllMessages([...allMessages, newMessage])
  }

  function socketConnect() {
    //assigns a 'name' property on the socket auth for us to use on tha backend
    //to authenticate and create a private room
    socket.auth = {name}
    socket.connect()
  }
  // 'from junior' is an event we defined in the backend
  // when we called emit we are invoking an event with that name
  // and the backend will capture it when it spots it

  socket.on('from junior', (message) => {
    setAllMessages([...allMessages, message])
  });

  return (
    <main className='ChatBox-container'>
      <div className='Chatbox'>
        {allMessages.map((mes) => {
          return (mes.receiver_name === 'Doctor' ? <div className='patient-message' key={mes.id}>
          {mes.content}
        </div> : <div className='junior-doctor-message' key={mes.id}>
            {mes.content}
          </div>)
        })}
        <div className='send-container'>
          <input
            className='chat-input'
            name='message'
            value={messageState.message}
            onChange={(e) => handleChange(e)}
            placeholder='Type your message...'
          ></input>
          <button className='send' onClick={handleClick}>
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
