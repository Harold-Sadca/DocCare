import { AppDispatch } from "@/redux/store";
import { TypePatient } from "../../../../server/types/types";
import { useDispatch } from "react-redux";
import { setChatPatient } from "@/redux/features/chat-patient-slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { TUser } from "@/types/types";
import { toggleDisplayChat } from "@/redux/features/display-chat";
import JuniorDoctorMessages from "./messages";
import { MessageOutlined } from "@ant-design/icons";
import { setPatientToView } from "@/redux/features/patient-to-view-slice";
import { SearchOutlined } from "@ant-design/icons";
import { setFilteredPatients } from "@/redux/features/search-patient";

interface Props {
  allPatients: TypePatient[];
}

export default function AllPatients({ allPatients }: Props) {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const userType =
    typeof window !== "undefined" &&
    (localStorage.getItem("userType") as string);
  // const [displayChat, setDisplayChat] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const displayChat = useAppSelector((state) => state.toggleDisplayChat.value);
  const currentJunior = useAppSelector(
    (state) => state.currentJuniorReducer.value
  );
  const filteredPatients = useAppSelector(
    (state) => state.patients.filteredPatients
  );
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  function chatToPatient(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    patient: TypePatient
  ) {
    console.log('invoked')
    console.log(e)
    //@ts-ignore
    const target = e.target.name? e.target as HTMLButtonElement : e.target.parentNode.parentNode;
    if (target.name === "patient-details") {
      // navigate to the patient details
      dispatch(setPatientToView(patient));
      router.push(`dashboard/patient/${target.id}`);
    } else if (target.name === "chat") {
      // set the selected patient
      dispatch(toggleDisplayChat());
      console.log("chat");
      const patientToChat = {
        id: target.id,
        name: target.title,
      };
      // console.log(patientToChat);
      dispatch(setChatPatient(patientToChat));
    }
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value)
    const filteredPatients = allPatients.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch(setFilteredPatients(filteredPatients));
  }
  return (
    <section className="discussions">
      <div className="discussion search">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button onClick={handleSearch}>
            <SearchOutlined />
          </button>
        </div>
      </div>
      {searchQuery === ""
        ? allPatients &&
          allPatients.map((patient: TypePatient) => (
            <div className="discussion" key={patient.id}>
              <div className="desc-contact">
                <h2 className="name">{patient.name}</h2>
                <div className="buttons-see-more-detail">
                  <button
                    id={patient.id}
                    name="patient-details"
                    title={patient.name}
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    Patient Details
                  </button>
                  <button
                    id={patient.id}
                    title={patient.name}
                    name="chat"
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    <MessageOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))
        : filteredPatients &&
          filteredPatients.map((patient: TypePatient) => (
            <div className="discussion" key={patient.id}>
              <div className="desc-contact">
                <h2 className="name">{patient.name}</h2>
                <div className="buttons-see-more-detail">
                  <button
                    id={patient.id}
                    name="patient-details"
                    title={patient.name}
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    Patient Details
                  </button>
                  <button
                    id={patient.id}
                    title={patient.name}
                    name="chat"
                    onClick={(e) => chatToPatient(e, patient)}
                  >
                    <MessageOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
    </section>
  );
}
