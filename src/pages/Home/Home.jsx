import React from "react";
import budget from "./budget.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container">
      <img src={budget} alt="budget" />
      <br />
      <br />
      <br />
      <p style={{color:"white"}}>
        {" "}
        Please <Link to="/login">Login</Link>/<Link to="/signup">Create</Link>{" "}
        account to view your dashboard
      </p>
    </div>
  );
};

export default Home;
