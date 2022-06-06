import './InfoTooltip.css'

const InfoTooltip = ({ onClose, isOpen, image, message }) => {
  return (
    <section className={`infotool ${isOpen && "infotool_opened"}`}>
      <div className="infotool__container">
        <img className="infotool__result-icon" src={image} alt="" />
        <h2 className="infotool__message">{message}</h2>
        <button
          className="infotool__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
};

export default InfoTooltip;