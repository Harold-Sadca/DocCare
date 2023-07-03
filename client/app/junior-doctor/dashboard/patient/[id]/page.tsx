"use client";
import { TypePatient } from "@/../server/types/types";
import AuthNavbar from "@/app/(components)/auth-navbar";
import { calculateAge, toFirstLetterUpperCase } from "@/app/helper";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { FieldTimeOutlined } from "@ant-design/icons";
import "../../../junior-doctor.css";
import Image from "next/image";

export default function Patient({ params }: { params: { id: string } }) {
  const router = useRouter();

  const selectedPatient = useAppSelector(
    (state) => state.patientToViewReducer.value
  );
  console.log(selectedPatient);

  interface Appointment {
    date: string;
    time: string;
    attended: boolean;
  }

  return (
    <main>
      <AuthNavbar user={"doctor"} auth={"login"} />
      <div className="patient">
        <Image
          src={selectedPatient.profilePicture as string}
          alt="patient-profile"
          height={150}
          width={150}
        ></Image>
        <div className="appointments-container">
          <h2 id="heading-appointments">Next appointments</h2>
          <div className="all-appointments">
            {selectedPatient &&
              selectedPatient.patientAppointments &&
              selectedPatient.patientAppointments.map(
                (appointment: Appointment, idx: number) => (
                  <div key={idx} className="each-appointment">
                    <p id="appointment-date">{appointment.date}</p>
                    <p id="appointment-time">
                      <FieldTimeOutlined />
                      {appointment.time}
                    </p>
                    <p id="appointment-attended">{appointment.attended}</p>
                  </div>
                )
              )}
          </div>
        </div>

        <div className="all-info-about-patient">
          <div className="main-info-patient">
            <h2 id="name">{selectedPatient?.name}</h2>
            <h2 id="age">
              {calculateAge(selectedPatient?.dateOfBirth as string).toString()}{" "}
              years old
            </h2>
            <p>Allergies: {selectedPatient?.allergies}</p>
            <p>Blood Type: {selectedPatient?.bloodType}</p>
            <p>
              Family Medical History: {selectedPatient.familyMedicalHistory}
            </p>
            <p id="gender">{selectedPatient?.gender}</p>
            <h2 id="DOB">DOB: {selectedPatient?.dateOfBirth}</h2>
            <div className="phone-call">
              <a href={`tel:${selectedPatient?.phoneNumber}`}>
                {selectedPatient?.phoneNumber}
                <PhoneOutlined style={{ fontSize: "30px" }} />
              </a>
            </div>
            <div className="mail-to">
              <a href={`mailto:${selectedPatient?.email}`}>
                <p>{selectedPatient?.email}</p>
                <MailOutlined style={{ fontSize: "20px" }} id="icon-mail" />
              </a>
            </div>
          </div>
          <div className="medication-container">
            <h2>Medications</h2>
            <div className="each-medication-container">
              <p>{selectedPatient?.medications.toString()}</p>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </main>
  );
}
