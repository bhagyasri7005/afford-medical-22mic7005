import { Card, CardContent, Typography } from "@mui/material";

function NotificationCard({ data, isRead = false, onClick }) {
  return (
    <Card
      onClick={onClick}
      style={{
        margin: "10px",
        padding: "10px",
        backgroundColor: isRead ? "#e0e0e0" : "#ffffff",
        cursor: "pointer",
        borderLeft: `5px solid ${
          data.Type === "Placement"
            ? "green"
            : data.Type === "Result"
            ? "blue"
            : "orange"
        }`
      }}
    >
      <CardContent>
        <Typography variant="h6">{data.Type}</Typography>
        <Typography>{data.Message}</Typography>
        <Typography variant="caption">
          {new Date(data.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;