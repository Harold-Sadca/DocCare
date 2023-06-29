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

const socket = io("ws://localhost:3001");


// export default function JuniorDoctorMessages() {
// export default function JuniorDoctorMessages({currentJunior}) {

interface Props {
  currentJunior: TUser;
}
export default function JuniorDoctorMessages({ currentJunior }: Props) {
  const initialState = { message: '', user: '' };
  const [messageState, setMessageState] = useState(initialState);
  const [allReceivedMessages, setAllReceivedMessages] = useState<TypeMessage[]>([])
  const [allSentMessages, setSentAllMessages] = useState<TypeMessage[]>([])
  const [onlinePatients, seOnlinePatients] = useState<TypeChatUser[]>([])
  // const [selectedPatient, setSelectedPatient] = useState<TypeChatUser>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // const currentJunior = useAppSelector((state) => state.currentPatientReducer.value);
  const selectedPatient = useAppSelector((state) => state.chatPatientReducer.value);
  console.log(selectedPatient)

  // console.log(currentJunior)

  //socket.io room name
  const name = 'junior';

  useEffect(() => {
    socketConnect();
  }, []);

  function handleClick() {
    const newMessage = {
      content:messageState.message,
      sender_id:currentJunior.id,
      sender_name:currentJunior.name,
      receiver_id:selectedPatient.id,
      receiver_name:selectedPatient.name
    }
    // console.log(newMessage)
    // replace halord with currentPatient.name sadly
    socket.emit("from junior", newMessage, selectedPatient.name);
  }

  function socketConnect() {
    socket.auth = {name}
    console.log(socket.auth, 'room name')
    socket.connect()
  }

  socket.on('patient message', (args) => {
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