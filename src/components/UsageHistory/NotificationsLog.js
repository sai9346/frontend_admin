import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../../services/api'; // Import the fetch API

const NotificationsLog = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching notifications log');
        setLoading(false);
      }
    };

    getNotifications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications Log</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Message</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(item => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.message}</td>
              <td className="py-2 px-4 border-b">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsLog;
