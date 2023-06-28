'use client';
import "./patient-messagess.css";
import { io } from "socket.io-client";
import { useState } from "react";
import { TypeMessage } from "../../../../server/types/types";

const socket = io("ws://localhost:3001");


export default function PatientMessages() {

  const initialState = { message: '', sender_name: '' , receiver_name:''};
  const [messageState, setMessageState] = useState(initialState);
  const [sentMessages, setSentMessages] = useState<TypeMessage[]>([])
  const [receivedMessages, setReceivedMessages] = useState<TypeMessage[]>([])
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
      sender_id:1,
      sender_name_:'Patient',
      receiver_id:2,
      receiver_name:'Junior'
    }
    socket.emit("send", newMessage);
    socket.on("sent", (args:TypeMessage) => {
      setSentMessages([...sentMessages, args])
      setMessageState(initialState)
    })
    socket.on('send', (args:TypeMessage) => {
      setReceivedMessages([...sentMessages, args])
    })
  }


  return (
    <main className="ChatBox-container">
      <div className="Chatbox">
       {sentMessages.map((mes) => {
        return <div className="patient-message" key={mes.id}>{mes.content}</div>
       })}
       {receivedMessages.map((mes) => {
        return <div className="junior-doctor-message" key={mes.id}>{mes.content}</div>
       })}
       {/* <div className="junior-doctor-message"></div> */}
       <div className="send-container">
       <input className="chat-input" name="message" value={messageState.message} onChange={(e) => handleChange(e)} placeholder="Type your message..."></input>
       <button className="send" onClick={handleClick}>Send</button>
       </div>
      </div>
    </main>
  );
}
