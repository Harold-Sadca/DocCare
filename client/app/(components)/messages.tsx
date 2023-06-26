import { io } from "socket.io-client";
import { Form, Input } from 'antd';

const socket = io("ws://localhost:3000");

export default function Messages () {
    // send a message to the server
  socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // receive a message from the server
  socket.on("hello from server", (...args) => {
    // ...
  });
  console.log("GOT IT")

  return (
    <>
      <Form
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 14 }}
    layout='horizontal'
    style={{ maxWidth: 900 }}
    action='/junior-doctor'
    method='post'
  >
    <Form.Item label='message' htmlFor='message'>
      <Input
        type='message'
        id='message'
        name='message'
        required
      />
    </Form.Item>
    <button
      className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
      type='submit'
    >
      Message
    </button>
  </Form>
    </>
  )
}
