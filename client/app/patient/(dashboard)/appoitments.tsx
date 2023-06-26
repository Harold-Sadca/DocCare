import "./appoitments.css";


export default function Appoitments() {
  return (
    <main>
      <div className="appoitments-container">
      <h1>Upcoming Appoitments:</h1>
      <div className="appoitment-list">
       <div className="appoitment-list-container">
       <div className="each-appoitment">
        <img src='../../../public/checkup-emoji.png'></img>
        <div className="each-appoitment-text">
        <h2>Check up</h2>
        <p>Aug 18</p>
        </div>
       </div>
       </div>
      </div>
      </div>
    </main>
  );
}
