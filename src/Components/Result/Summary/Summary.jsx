import React from "react";
import "./Summary.css";

const Summary = ({ score, noq }) => {

  const getKeyword = () => {
    if (score / (noq * 5) * 100 < 50) {
      return "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (score / (noq * 5) * 100 < 75) {
      return "https://images.pexels.com/photos/653429/pexels-photo-653429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else if (score / (noq * 5) * 100 < 100) {
      return "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    } else {
      return "https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    }
  }

  return (
    <div className="summary">
      <div className="point">
        <p className="score">
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>
     
        <div className="badge">
          <img src={getKeyword()} alt="Success" />
        </div>
    </div>
  );
};

export default Summary;
