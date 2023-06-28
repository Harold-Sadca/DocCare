import './appointments.css';

export default function Appointments() {
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
