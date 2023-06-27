'use client';
import { ChangeEvent, useState } from "react";
import Messages from "../(components)/messages";
import { io } from "socket.io-client";
// import logger from "../../../server/logger";
// import Messages from "../(components)/messages";

const socket = io("ws://localhost:3001");


// export default function Message () {
//   return <Messages />
// }

export default function Message() {
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState<string[]>([])
  const initialState = { message: '', user: '' };
  const [messageState, setMessageState] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setMessageState((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

    // send a message to the server
    socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

    // receive a message from the server
    socket.on("hello from server", (...args) => {
      // ...
    });

    function handleClick() {
      socket.emit("click", message);
      socket.on("hello back", (...args) => {
        setAllMessages([...allMessages, args as unknown as string])
        console.log(allMessages)
      })
      setMessage('')
    }
  return (
    <main className='flex min-h-screen flex-col box-border'>
      {/* <Message /> */}
      <input value={message} onChange={(e) => {handleChange(e)}} type="text" />
      <button onClick={handleClick}>SEND</button>
      {allMessages.map((mes) => {
        return <span key={mes}>{mes}</span>
      })}
    </main>
  );
}