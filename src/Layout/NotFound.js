import React from "react";
import { Link } from "react-router-dom";

function NotFound({backHome}) {


  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <h4>
        This is not the page you're looking for..move along now, move along..
      </h4>
      <Link to={"/"} className="btn btn-primary">
        ..This is not the page I'm looking for..
      </Link>
    </div>
  );
}

export default NotFound;
