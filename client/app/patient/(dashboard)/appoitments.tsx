import './appoitments.css';

export default function Appoitments() {
  // choose the date (no time)
  // choose the illness
  // submit -> show list of doctors (name, picture, about and availability) based on the illness
  // choose the doctor and the time
  // submit ->
  // pass the day and the time slot
  // backend: go to the doctor, availability and
  // availability.day.push(time slot)
  // return doctor
  // success message and redirect to /patient

  return (
    <main>
      <div className='appoitments-container'>
        <h1>Upcoming Appoitments:</h1>
        <div className='appoitment-list'>
          <div className='appoitment-list-container'>
            <div className='each-appoitment'>
              <img src='/checkup-emoji.png' />
              <div className='each-appoitment-text'>
                <h2>Check up</h2>
                <p>Aug 18</p>
              </div>
            </div>
          </div>
          <div className='appoitment-list-container'>
            <div className='other-appoitment'>
              <img src='/checkup-emoji.png' />
              <div className='other-appoitment-text'>
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
