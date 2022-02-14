import React from "react";
import "./Preloader.css";

function Preloader({ preloader }) {
  return (
    <div
      className={`preloader ${preloader ? "" : "preloader_hidden"}`}
      id="preloader"
    >
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
}

export default Preloader;
