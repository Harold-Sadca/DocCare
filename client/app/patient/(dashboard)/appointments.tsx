import "./appoitments.css";




export default function Appoitments() {
  return (
    <main>
      <div className="appoitments-container">
      <h1>Upcoming Appoitments:</h1>
      <div className="appoitment-list">
       <div className="appoitment-list-container">
       <div>
        <img src='../../../public/appoitment-emoji.png'></img>
        <h2>Check up</h2>
        <p>Aug 18</p>
       </div>
       </div>
      </div>
      </div>
    </main>
  );
}
