import JuniorDoctorMessages from './messages';
import './dashboard.css'



export default function JuniorDoctorDashBoard() {
    return (
      <main>
        <h1>Junior DashBoard!</h1>
        <div className='chat-box'>
        <JuniorDoctorMessages/>
        </div>
      </main>
    );
  }
  