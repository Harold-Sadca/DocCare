"use client";
import "./available-doctors.css";


export default function AvailableDoctorList() {
  return (
    <main>
      <div className="doctor-list-container">
      <h1>Your Doctors</h1>
      <div className="doctor-list">
       <div className="each-doctor">
        <img src="https://images.pexels.com/photos/4270088/pexels-photo-4270088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
       <div className="each-doctor-name">
        <h2>Michaela Hans</h2>
        <p>Dentist</p>
        </div>
       </div>
      </div>
      </div>
    </main>
  );
}
