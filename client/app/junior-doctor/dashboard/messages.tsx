'use client';

import './messagess.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import {
  TypeChatUser,
  TypeMessage,
  TypePatient,
} from '../../../../server/types/types';
import { useAppSelector } from '@/redux/store';
import { TUser } from '@/types/types';

const socket = io('ws://localhost:3001');

interface Props {
  currentJunior: TUser;
}
export default function JuniorDoctorMessages({ currentJunior }: Props) {
  const initialState = { message: '', user: '' };
  const [messageState, setMessageState] = useState(initialState);
  const [allReceivedMessages, setAllReceivedMessages] = useState<TypeMessage[]>(
    []
  );
  const [allSentMessages, setSentAllMessages] = useState<TypeMessage[]>([]);
  const [onlinePatients, seOnlinePatients] = useState<TypeChatUser[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<TypeChatUser>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(currentJunior);

  // const {name, id} = currentJunior

  useEffect(() => {
    socketConnect();
  }, []);

  function handleClick() {
    const newMessage = {
      content: messageState.message,
      sender_id: currentJunior.id,
      sender_name: currentJunior.name,
      receiver_id: 1,
      receiver_name: 'Patient',
    };
    console.log(newMessage);
    socket.emit('junior sent', newMessage, 1, currentJunior.id);
    socket.on('send', (args) => {
      console.log(args);
      setAllReceivedMessages([...allReceivedMessages, args]);
    });
    socket.on('junior sent', (args) => {
      console.log(args);
      setSentAllMessages([...allSentMessages, args]);
    });
  }

  function socketConnect() {
    socket.auth = { name };
    socket.connect();
  }

  socket.on('patients', (patients) => {
    patients.forEach((patient: TypeChatUser) => {
      patient.userID === socket.id;
    });
    // put the current user first, and then sort by username
    // this.patients = patients.sort((a, b) => {
    //   if (a.self) return -1;
    //   if (b.self) return 1;
    //   if (a.username < b.username) return -1;
    //   return a.username > b.username ? 1 : 0;
    // });
  });

  socket.on('returned', (args) => {
    console.log(args);
  });

  return (
    <main className='ChatBox-container'>
      <div className='Chatbox'>
        {allReceivedMessages.map((mes) => {
          return (
            <div className='patient-message' key={mes.id}>
              <span>{mes.content}</span>
            </div>
          );
        })}
        {allReceivedMessages.map((mes) => {
          return (
            <div className='junior-doctor-message' key={mes.id}>
              {mes.content}
            </div>
          );
        })}
        {/* <div className="junior-doctor-message"></div> */}
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
