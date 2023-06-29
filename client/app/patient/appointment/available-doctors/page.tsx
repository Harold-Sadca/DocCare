'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import './available-doctors.css';
import { useAppSelector } from '@/redux/store';

export default function AvailableDoctorList() {
  const availableSpecialists = useAppSelector(
    (state) => state.AvailableSpecialist.value
  );

  console.log(availableSpecialists);
  // when choose the slot
  function makeAppointment(stateMonth: number, stateDay: number, time: number) {
    // time is the id of the button
    // pass the day and the time slot
    // backend: go to the doctor, availability and
    // availability.day.push(time slot)
  }

  function availableSlots(slots: []) {
    const filledSlots = [];
    if (slots.length === 0) {
      for (let slot = 9; slot <= 17; slot++) {
        filledSlots.push(slot);
      }
    }
  }

  // availableSpecialists

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
          {availableSpecialists.map((available, idx) => {
            const slots = available.slots;
            return (
              <div className='each-doctor' key={idx}>
                <img src='https://images.pexels.com/photos/4270088/pexels-photo-4270088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img>
                <div className='each-doctor-name'>
                  <h2>{available.doctor}</h2>
                  <p>General Practice</p>
                  {slots.map((slot, idx) => (
                    <div key={idx}>
                      <button id={slot.toString()}>{slot}:00</button>
                      <button>11:00</button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
