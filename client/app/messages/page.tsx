'use client';
import { ChangeEvent, useState } from "react";
import Messages from "../(components)/messages";
import { io } from "socket.io-client";
import { TypeMessage } from "../../../server/types/types";
// import logger from "../../../server/logger";
// import Messages from "../(components)/messages";

const socket = io("ws://localhost:3001");


// export default function Message () {
//   return <Messages />
// }

export default function Message() {
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState<TypeMessage[]>([])
  const initialState = { message: '', user: '' };
  const [messageState, setMessageState] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  };
    function handleClick() {
      const newMessage = {

      }
      socket.emit("click", message);
      socket.on("hello back", (...args) => {
        setAllMessages([...allMessages, args as unknown as TypeMessage])
        console.log(allMessages)
      })
      setMessage('')
    }
  return (
    <main className='flex min-h-screen flex-col box-border'>
      <Messages />
      {/* <input value={message} onChange={(e) => {handleChange(e)}} type="text" />
      <button onClick={handleClick}>SEND</button>
      {allMessages.map((mes) => {
        return <span key={mes.id}>{mes.content}</span>
      })} */}
    </main>
  );
}