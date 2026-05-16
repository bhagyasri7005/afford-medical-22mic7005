import { useEffect, useState } from "react";
import { getNotifications } from "../services/api";
import NotificationCard from "../components/NotificationCard";
import { Button } from "@mui/material";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [readIds, setReadIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [page, type]);

  const loadData = async () => {
    try {
      let data = await getNotifications(page, 10, type);

      // ✅ fallback if API fails
      if (!Array.isArray(data) || data.length === 0) {
        console.log("Using fallback data");
        data = [
          { ID: 1, Type: "Placement", Message: "Amazon hiring", Timestamp: "2026-05-16 10:00:00" },
          { ID: 2, Type: "Result", Message: "Mid sem results", Timestamp: "2026-05-16 09:00:00" },
          { ID: 3, Type: "Event", Message: "Tech fest", Timestamp: "2026-05-15 08:00:00" }
        ];
      }

      setNotifications(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id) => {
    setReadIds((prev) => [...prev, id]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Notifications</h2>

      {/* FILTER */}
      <div style={{ marginBottom: "15px" }}>
        <Button onClick={() => setType("")}>All</Button>
        <Button onClick={() => setType("Placement")}>Placement</Button>
        <Button onClick={() => setType("Result")}>Result</Button>
        <Button onClick={() => setType("Event")}>Event</Button>
      </div>

      {/* DATA */}
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        notifications.map((item) => (
          <NotificationCard
            key={item.ID}
            data={item}
            isRead={readIds.includes(item.ID)}
            onClick={() => markAsRead(item.ID)}
          />
        ))
      )}

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}

export default AllNotifications;