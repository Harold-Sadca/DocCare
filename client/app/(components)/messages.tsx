import { io } from "socket.io-client";
import { Form, Input } from 'antd';
import { useState } from "react";

const socket = io("ws://localhost:3000");

export default function Messages () {

  const [message, setMessage] = useState('')

  // send a message to the server
  socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // receive a message from the server
  socket.on("hello from server", (...args) => {
    // ...
  });
  console.log("GOT IT")

  function handleClick() {
    console.log('clicked')
    socket.emit("click", 'This is my first message');
    socket.on("hello back", (...args) => {
      console.log(args)
    })
  }
  return (
    <>

    <button onClick={handleClick}
      className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
    >
      Message
    </button>
    </>
  )
}
