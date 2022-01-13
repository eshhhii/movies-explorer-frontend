import React from "react";

function InfoTooltip({ isOpen, onClose, info }) {
  return (
    <section className={`infotool ${isOpen && "infotool_is-opened"}`}>
      <div className="infotool__container">
        <button type="button" className="infotool__close" onClick={onClose} />
        <img src={info.icon} alt="" className="infotool__icon" />
        <p className="infotool__title">{info.text}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
