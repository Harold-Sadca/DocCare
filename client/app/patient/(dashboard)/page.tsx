import './dashboard.css'
import Profile from './profile';
import Appoitments from './appointments';
import CheckUp from './last-checkup'
// import Cal from './calendar'

export default function Patient() {
  return (
    <main>
    <Profile/>
    <div className='appoitments-box'>
    <CheckUp/>
    </div>
    {/* <Cal cellRender={cellRender} /> */}
    <Appoitments/>
    </main>
  );
}
