import { io } from 'socket.io-client';
import { Form, Input } from 'antd';
import { useState } from 'react';

const socket = io(process.env.SOCKET_URL || 'ws://localhost:3001');

export default function Messages() {
  const initialState = { message: '', sender_name: '', receiver_name: '' };
  const [messageState, setMessageState] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleClick() {
    const newMessage = {
      content: messageState.message,
      sender_id: 1,
      sender_name_: messageState.sender_name,
      receiver_id: 2,
      receiver_name: messageState.receiver_name,
    };
    socket.emit('click', newMessage);
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
        <Form.Item label='Sender'>
          <Input
            type='text'
            id='sender'
            name='sender_name'
            value={messageState.sender_name}
            onChange={(e) => handleChange(e)}
            required
          />
        </Form.Item>
        <Form.Item label='Receiver'>
          <Input
            type='text'
            id='receiver'
            name='receiver_name'
            value={messageState.receiver_name}
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
  );
}
