import "./patient-messagess.css";


export default function PatientMessages() {
  return (
    <main className="ChatBox-container">
      <div className="Chatbox">
       <div className="patient-message"></div>
       <div className="junior-doctor-message"></div>
       <div className="send-container">
       <input className="chat-input" placeholder="Type your message..."></input>
       <button className="send">Send</button>
       </div>
      </div>
    </main>
  );
}
