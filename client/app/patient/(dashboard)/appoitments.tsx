import "./appoitments.css";


export default function Appoitments() {
  return (
    <main>
      <div className="appoitments-container">
      <h1>Upcoming Appoitments:</h1>
      <div className="appoitment-list">
       <div className="appoitment-list-container">
       <div className="each-appoitment">
        <img src='/checkup-emoji.png'/>
        <div className="each-appoitment-text">
        <h2>Check up</h2>
        <p>Aug 18</p>
        </div>
       </div>
       </div>
       <div className="appoitment-list-container">
       <div className="other-appoitment">
        <img src='/checkup-emoji.png'/>
        <div className="other-appoitment-text">
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
