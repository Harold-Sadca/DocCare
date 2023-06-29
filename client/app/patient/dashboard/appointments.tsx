import './appointments.css';

export default function Appointments() {
  // choose the date (no time)
  // choose the illness
  // submit -> (filter doctos and map) show list of doctors (name, picture, about and availability + button) based on the illness
  // choose the doctor and the time
  // submit ->
  // pass the day and the time slot
  // backend: go to the doctor, availability and
  // availability.day.push(time slot)
  // return doctor
  // success message and redirect to /patient

  return (
    <main>
      <div className='apponitments-container'>
        <h1>Upcoming Appointments:</h1>
        <div className='appointment-list'>
          <div className='appointment-list-container'>
            <div className='each-appointment'>
              <img src='/checkup-emoji.png' />
              <div className='each-appointment-text'>
                <h2>Check up</h2>
                <p>Aug 18</p>
              </div>
            </div>
          </div>
          <div className='appointment-list-container'>
            <div className='other-appointment'>
              <img src='/checkup-emoji.png' />
              <div className='other-appointment-text'>
                <h2>ANOTHER one</h2>
                <p>Nov 28</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
