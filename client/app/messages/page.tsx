'use client';
import { io } from "socket.io-client";
import logger from "../../../server/logger";

const socket = io("ws://localhost:3001");


// export default function Message () {
//   return <Messages />
// }

export default function Message() {

    // send a message to the server
    socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

    // receive a message from the server
    socket.on("hello from server", (...args) => {
      // ...
    });
    console.log("GOT IT")

    function handleClick() {
      socket.emit("click", 'This is my first message');
      socket.on("hello back", (...args) => {
        console.log(args)
      })
    }
  return (
    <main className='flex min-h-screen flex-col box-border'>
      {/* <Messages /> */}
      <button onClick={handleClick}>SEND</button>
      <h1>Messages!</h1>
    </main>
  );
}