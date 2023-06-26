import "./last-checkup.css";


export default function CheckUp() {
  return (
    <main>
      <div className="checkups-container">
      <h1>Upcoming Appoitments:</h1>
      <div className="checkup-list">
       <div className="checkup-list-container">
       <div>
        <img src='../../../public/checkup-emoji.png'></img>
        <h2>Check up</h2>
        <p>Aug 18</p>
       </div>
       </div>
      </div>
      </div>
    </main>
  );
}
