import { io } from "socket.io-client";
import { Form, Input } from 'antd';
import { useState } from "react";

const socket = io("ws://localhost:3001");

export default function Messages () {

  const initialState = { message: '', user: '' };
  const [messageState, setMessageState] = useState(initialState);
  const [allMessages, setAllMessages] = useState<string[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // // send a message to the server
  // socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

  // // receive a message from the server
  // socket.on("hello from server", (...args) => {
  //   // ...
  // });

  function handleClick() {
    console.log('clicked')
    socket.emit("click", 'This is my first message');
    socket.on("hello back", (...args) => {
      console.log(args)
    })
  }
  return (
    <>
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout='horizontal'
      onFinish={handleClick}
    >
      <Form.Item label='Message'>
        <Input
          type='text'
          id='message'
          name='message'
          required
          value={messageState.message}
          onChange={(e) => handleChange(e)}
        />
      </Form.Item>
      <Form.Item label='Password' htmlFor='password'>
        <Input
          type='text'
          id='user'
          name='user'
          value={messageState.message}
          onChange={(e) => handleChange(e)}
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
