import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { urlContext } from "../App";

const LandingPage = () => {
  const { setUrl } = useContext(urlContext);
  return (
    <div className="flex items-center justify-center h-screen ">
      <div>
        <h1 className="text-3xl font-semibold">Documents </h1>
        <hr className="bg-slate-900 w-40 my-1 " />
        <ul style={{ listStyleType: "circle" }}>
          <Link to="/annotation">
            <li
              onClick={() => {
                setUrl(0);
              }}
            >
              SampleDocument1.pdf
            </li>
          </Link>
          <Link to="/annotation">
            <li
              onClick={() => {
                setUrl(1);
              }}
            >
              SampleDocument2.pdf
            </li>
          </Link>
          <Link to="/annotation">
            <li
              onClick={() => {
                setUrl(2);
              }}
            >
              SampleDocument3.pdf
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
