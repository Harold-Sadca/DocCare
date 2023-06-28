'use client';
import "./patient-messagess.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { TypeMessage } from "../../../../server/types/types";
import { useAppSelector } from "@/redux/store";

const socket = io("ws://localhost:3001");


export default function PatientMessages() {

  const initialState = { message: '', sender_name: '' , receiver_name:''};
  const [messageState, setMessageState] = useState(initialState);
  
  const [sentMessages, setSentMessages] = useState<TypeMessage[]>([])
  const [receivedMessages, setReceivedMessages] = useState<TypeMessage[]>([])
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const {name, id} = currentPatient

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    socketConnect()
  }, [])

  let newMessage
  let socketId:string

  function handleClick() {
    
    newMessage = {
      content:messageState.message,
      sender_id:id,
      sender_name_:name,
      receiver_id:2,
      receiver_name:'Junior'
    }
    
    socket.emit("patient message", newMessage, socketId, 2);
  }
  
  function socketConnect() {
    socket.auth = {name}
    socket.connect()
  }

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

  console.log(sentMessages)


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
