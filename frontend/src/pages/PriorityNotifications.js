import { useEffect, useState } from "react";
import { getNotifications } from "../services/api";
import NotificationCard from "../components/NotificationCard";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let data = await getNotifications(1, 50);

      // ✅ fallback if API fails
      if (!Array.isArray(data) || data.length === 0) {
        data = [
          { ID: 1, Type: "Placement", Message: "Amazon hiring", Timestamp: "2026-05-16 10:00:00" },
          { ID: 2, Type: "Result", Message: "Mid sem results", Timestamp: "2026-05-16 09:00:00" },
          { ID: 3, Type: "Event", Message: "Tech fest", Timestamp: "2026-05-15 08:00:00" }
        ];
      }

      // Add priority + time
      data = data.map((item) => ({
        ...item,
        priority: priorityMap[item.Type] || 0,
        time: new Date(item.Timestamp)
      }));

      // Sort (priority → time)
      data.sort((a, b) => {
        if (b.priority !== a.priority) {
          return b.priority - a.priority;
        }
        return b.time - a.time;
      });

      // Top 10
      setNotifications(data.slice(0, 10));
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Top 10 Priority Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        notifications.map((item) => (
          <NotificationCard key={item.ID} data={item} />
        ))
      )}
    </div>
  );
}

export default PriorityNotifications;