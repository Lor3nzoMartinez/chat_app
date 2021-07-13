import React from "react";
import { Link } from "react-router-dom";
import "./NavigateBar.scss";

export default function NavigateBar() {
  return (
    <div className="lower-nav d-flex justify-content-between px-4 py-4">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/messages">
        <button>Messages</button>
      </Link>
    </div>
  );
}
