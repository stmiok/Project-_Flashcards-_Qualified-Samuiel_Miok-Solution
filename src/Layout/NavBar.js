import React from "react";
import { Link } from "react-router-dom";

function NavBar({ linkName = "", link = "", pageName = "" }) {
  const multiple = (
    <>
      <li className="breadcrumb-item">
        <Link to={link}>{linkName}</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        {pageName}
      </li>
    </>
  );

  const current = (
    <li className="breadcrumb-item active" aria-current="page">
      {pageName}
    </li>
  );

  return (
    <nav className="w-100" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-secondary">
          <Link to={"/"}>
            <i className="fas fa-house-chimney"></i> Home
          </Link>
        </li>
        {link !== "" ? multiple : current}
      </ol>
    </nav>
  );
}

export default NavBar;
