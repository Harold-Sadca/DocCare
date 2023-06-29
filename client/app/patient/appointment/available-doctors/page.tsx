'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import './available-doctors.css';

export default function AvailableDoctorList() {
  // specialists

  // currentSpecialists
  // in the return:
  // currentSpecialists.map((currSpecialist, idx) => {
  // const slot = currSpecialist.
  // return(
  // <div key={idx}>
  // <h2>{currSpecialist.name}</h2>
  // <p>{currSpecialist.specialisation}</p>
  // <button onClick={()=> chooseSlot()} id={slot}>{slot}:00</button>
  // </div>
  // )})
  return (
    <main>
      <AuthNavbar user={'patient'} auth={'login'} />
      <div className='doctor-list-container'>
        <h1>Your Doctors</h1>
        <div className='doctor-list'>
          <div className='each-doctor'>
            <img src='https://images.pexels.com/photos/4270088/pexels-photo-4270088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img>
            <div className='each-doctor-name'>
              <h2>Michaela Hans</h2>
              <p>General Practice</p>
              <button id=''>10:00</button>
              <button>11:00</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
