import './dashboard.css'
import Profile from './profile';
import Appoitments from './appoitments'
import Prescriptions from './prescriptions'
// import Cal from './calendar'

export default function Patient() {
  return (
    <main className="grid-container">
    <div className="profile-box">
    <Profile/>
    </div>
    <div className='appoitment-box'>
    <Appoitments/>
    </div>
    <div>
    <div className="prescriptions-box">
    <Prescriptions/>
    </div>
    </div>
    {/* <Cal cellRender={cellRender} /> */}
    </main>
  );
}
