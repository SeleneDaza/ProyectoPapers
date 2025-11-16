import React from "react";
import "../components/PopUp.css";

const PopUp = ({
  show = false,
  title = "Advertencia",
  message = "",
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-icon">!</div>

        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>

        <div className="popup-buttons">
          <button className="btn-cancel" onClick={onCancel}>NO</button>
          <button className="btn-confirm" onClick={onConfirm}>SI</button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
