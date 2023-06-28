"use client";

import "./profile.css";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { calculateAge } from "@/app/helper";

export default function Profile() {
  const [message, setMessage] = useState("");
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );

  return (
    <main>
      <div className="profile">
        <div className="about-patient">
          <div className="profile-pic">
            <img src="https://images.pexels.com/photos/12495583/pexels-photo-12495583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
          </div>
          <h1>{currentDoctor.name}</h1>
        </div>
        <div className="general-info">
          <h2>General info:</h2>
          <p>{currentDoctor.gender}</p>
        </div>
      </div>
    </main>
  );
}
