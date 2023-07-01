/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { TypeMessage } from '../../../../server/types/types';
import { useAppSelector } from '@/redux/store';
import { SendOutlined } from '@ant-design/icons';

const socket = io('ws://localhost:3001');

export default function PatientMessages() {
  const initialState = { message: '', sender_name: '', receiver_name: '' };
  const [messageState, setMessageState] = useState(initialState);
  const [sentMessages, setSentMessages] = useState<TypeMessage[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<TypeMessage[]>([]);
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const { id } = currentPatient;
  const name = currentPatient.name;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // console.log(name, 'name')

  useEffect(() => {
    if (name != '') {
      socketConnect();
    }
  }, [name]);

  let newMessage;
  // let socketId:string

  function handleClick() {
    newMessage = {
      content: messageState.message,
      sender_id: id,
      sender_name_: name,
      receiver_id: 2,
      receiver_name: 'Junior',
    };

    socket.emit('patient message', newMessage);
  }

  function socketConnect() {
    socket.auth = { name };
    // console.log(socket.auth, 'socket name')
    socket.connect();
  }

  socket.on('returned', (args) => {
    console.log(args);
  });

  socket.on('from junior', (args) => {
    console.log(args);
  });

  // socket.on("your id", (args:string) => {
  //   console.log(args)
  //   socketId = args
  //   console.log(socketId)
  // })

  // socket.on("patient sent", (args:TypeMessage) => {
  //   console.log(args)
  //   setSentMessages([...sentMessages, args])
  //   setMessageState(initialState)
  // })
  // socket.on('from junior', (args:TypeMessage) => {
  //   setReceivedMessages([...sentMessages, args])
  // })

  return (
    <main className='messages-box'>
      <div className='messages-container dashboard-container'>
        <div className='messages-container-top'>
          <div className='chat-container'>
            {sentMessages.map((mes) => {
              return (
                <div className='user-message patient-message' key={mes.id}>
                  <div className='message'>
                    <span id='bot-response'>{mes.content}</span>
                  </div>
                </div>
              );
            })}
            {receivedMessages.map((mes) => {
              return (
                <div
                  className='user-message junior-doctor-message'
                  key={mes.id}
                >
                  <div className='message'>
                    <span id='bot-response'>{mes.content}</span>
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
      </div>
    </main>
  );
}
