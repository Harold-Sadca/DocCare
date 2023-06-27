'use client';

import "./messagess.css";
import { io } from "socket.io-client";
import { useState } from "react";
import { TypeMessage } from "../../../../server/types/types";

const socket = io("ws://localhost:3001");


export default function JuniorDoctorMessages() {

  const initialState = { message: '', user: '' };
  const [messageState, setMessageState] = useState(initialState);
  const [allReceivedMessages, setAllReceivedMessages] = useState<TypeMessage[]>([])
  const [allSentMessages, setSentAllMessages] = useState<TypeMessage[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleClick() {
    const newMessage = {
      content:messageState.message,
      sender_id:2,
      sender_name:'Junior',
      receiver_id:1,
      receiver_name:'Patient'
    }
    socket.emit("send", newMessage);
    socket.on("send", (args) => {
      console.log(args)
      setAllReceivedMessages([...allReceivedMessages, args])
    })
    socket.on('sent', (args) => {
      console.log(args)
      setSentAllMessages([...allSentMessages, args])
    })
  }


  return (
    <main className="ChatBox-container">
      <div className="Chatbox">
        {allReceivedMessages.map((mes) => {
          return <div className="patient-message" key={mes.id}><span>{mes.content}</span></div>
        })}
        {allReceivedMessages.map((mes) => {
          return <div className="junior-doctor-message" key={mes.id}>{mes.content}</div>
        })}
       {/* <div className="junior-doctor-message"></div> */}
       <div className="send-container">
       <input className="chat-input" name='message' value={messageState.message} onChange={(e) => handleChange(e)} placeholder="Type your message..."></input>
       <button className="send" onClick={handleClick}>Send</button>
       </div>
      </div>
    </main>
  );
}
