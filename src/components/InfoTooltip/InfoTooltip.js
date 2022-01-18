import React from "react";

function InfoTooltip({ isOpen, onClose, info }) {
  return (
    <section className={`infotool ${isOpen && "infotool_is-opened"}`}>
      <div className="infotool__container">
        <button
          className="infotool__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img src={info.icon} alt="" className="infotool__icon" />
        <h2 className="infotool__title">{info.text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
