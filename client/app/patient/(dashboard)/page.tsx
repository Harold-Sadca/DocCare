import './dashboard.css'
import Profile from './profile';
import Appoitments from './appointments';
import CheckUp from './last-checkup'
import Prescriptions from './prescriptions'
// import Cal from './calendar'

export default function Patient() {
  return (
    <main className="grid-container">
    <div className="profile-box">
    <Profile/>
    </div>
    <div className='last-checkup-box'>
    <CheckUp/>
    </div>
    <div>
    <div className="prescriptions-box">
    <Prescriptions/>
    </div>
    </div>
    {/* <Cal cellRender={cellRender} /> */}
    <div className='appoitment-box'>
    <Appoitments/>
    </div>
    </main>
  );
}
