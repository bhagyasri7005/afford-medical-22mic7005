function logger(functionName) {
  console.log(`Function ${functionName} started at ${new Date().toLocaleString()}`);
}const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};
async function runProgram() {
  logger("runProgram");
 try {
    let notifications = [
      {
        Type: "Result",
        Message: "mid sem",
        Timestamp: "2026-04-22 17:51:30"
      },
      {
        Type: "Placement",
        Message: "CSX Corporation hiring",
        Timestamp: "2026-04-22 17:51:18"
      },
      {
        Type: "Event",
        Message: "farewell",
        Timestamp: "2026-04-22 17:51:06"
      },
      {
        Type: "Result",
        Message: "mid-sem",
        Timestamp: "2026-04-22 17:50:54"
      },
      {
        Type: "Result",
        Message: "project review",
        Timestamp: "2026-04-22 17:50:42"
      },
      {
        Type: "Result",
        Message: "external",
        Timestamp: "2026-04-22 17:50:30"
      },
      {
        Type: "Result",
        Message: "project review",
        Timestamp: "2026-04-22 17:50:18"
      },
      {
        Type: "Event",
        Message: "tech fest",
        Timestamp: "2026-04-22 17:50:06"
      },
      {
        Type: "Result",
        Message: "project review",
        Timestamp: "2026-04-22 17:49:54"
      },
      {
        Type: "Placement",
        Message: "Advanced Micro Devices Inc. hiring",
        Timestamp: "2026-04-22 17:49:42"
      }
    ];
    const processedList = notifications.map(item => ({
      ...item,
      priority: priorityMap[item.Type],
      time: new Date(item.Timestamp)
    }));
    processedList.sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return b.time - a.time;
    });
    const topNotifications = processedList.slice(0, 10);
    console.log("\nTop 10 Important Notifications:\n");
 topNotifications.forEach(n => {
      console.log(`[${n.Type}] ${n.Message} - ${n.Timestamp}`);
    });
 } catch (error) {
    console.log("Something went wrong:", error);
  }
}
runProgram();