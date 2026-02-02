const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", socket => {
    console.log("🟢 IoT device connected:", socket.id);

    socket.on("healthData", data => {
      console.log("📡 Live IoT data:", data);
      socket.broadcast.emit("liveUpdate", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Device disconnected");
    });
  });
};