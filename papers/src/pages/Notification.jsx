import React, { useEffect, useState } from "react";
import "../components/Notification.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { fetchNotifications } from "../hooks/notificationLogic.js";
import Layout from "./Layout";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications().then((data) => setNotifications(data));
  }, []);

  const toggleCheck = (index) => {
    const updated = [...notifications];
    updated[index].checked = !updated[index].checked;
    setNotifications(updated);
  };

  const toggleFavorite = (index) => {
    const updated = [...notifications];
    updated[index].favorite = !updated[index].favorite;
    setNotifications(updated);
  };

  return (
    <Layout>
        <div className="notif-wrapper">
        <div className="notif-box">

            <h2 className="notif-title">Notificaciones</h2>

            {/* Si no hay notificaciones */}
            {notifications.length === 0 ? (
            <p className="no-notif">No hay notificaciones</p>
            ) : (
            <div className="notif-list">
                {notifications.map((n, index) => (
                <div className="notif-row" key={index}>
                    <input
                    className="notif-check"
                    type="checkbox"
                    checked={n.checked}
                    onChange={() => toggleCheck(index)}
                    />

                    <span
                    className="notif-star"
                    onClick={() => toggleFavorite(index)}
                    >
                    {n.favorite ? <FaStar /> : <FaRegStar />}
                    </span>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    </Layout>
  );
}
