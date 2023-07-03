"use client";
import { io } from "socket.io-client";
import "../junior-doctor.css";
import { useEffect, useState } from "react";
import { TypeChatUser, TypeMessage } from "../../../../server/types/types";
import { useAppSelector } from "@/redux/store";
import { TUser } from "@/types/types";
import apiService from "@/services/APIservices";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setAllMessages } from "@/redux/features/messages-slice";

const socket = io("ws://localhost:3001");

interface Props {
  currentJunior: TUser;
}
export default function JuniorDoctorMessages({ currentJunior }: Props) {
  const initialState = { message: "", user: "" };
  const [messageState, setMessageState] = useState(initialState);
  // const [allMessages, setAllMessages] = useState<TypeMessage[]>([]);
  const [onlinePatients, seOnlinePatients] = useState<TypeChatUser[]>([]);
  const [messages, setMessages] = useState<TypeMessage[]>([]);
  const allMessages = useAppSelector(state => state.allMessagesReducer.value)
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const chatToPatient = useAppSelector(
    (state) => state.chatPatientReducer.value
  );
  const selectedPatient = useAppSelector(
    (state) => state.chatPatientReducer.value
  );

  useEffect(() => {
    setMessages(allMessages.filter(mes => mes.sender_id === selectedPatient.id || mes.receiver_id === selectedPatient.id))
  }, [chatToPatient.name])


  function handleClick() {
    const newMessage = {
      content: messageState.message,
      sender_id: currentJunior.id,
      sender_name: "Doctor",
      receiver_id: selectedPatient.id,
      receiver_name: selectedPatient.name,
    } as TypeMessage;

    socket.auth = { name: "junior" };
    socket.connect();
    socket.emit("from junior", newMessage, selectedPatient.id);
    setMessages([...messages, newMessage]);
    dispatch(setAllMessages([...allMessages, newMessage]))
    setMessageState(initialState);
  }

  socket.on("patient message", (message) => {
    setMessages([...messages, message]);
  });

  return (
    <section className="chat">
      <div className="header-chat">
        <p className="name">{selectedPatient.name}</p>
      </div>
      <div className="messages-chat">
        {messages.map((mes) => {
          return mes.sender_name === "Doctor" ? (
            <div className="message text-only">
              <div className="response">
                <div className="text" key={mes.id}>
                  {mes.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="message">
              <div className="response">
                <div className="text" key={mes.id}>
                  {mes.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer-chat">
        <div className="send-container">
          <input
            className="write-message"
            name="message"
            value={messageState.message}
            onChange={(e) => handleChange(e)}
            placeholder="Type your message..."
          ></input>
          <button className="send-button" onClick={handleClick}>
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
