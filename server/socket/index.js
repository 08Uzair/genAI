import { Server } from 'socket.io';
import { saveMessageToDB } from '../controllers/Message.js'

function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  const users = {}; // userId: { socket, name }
  const userSockets = {}; // socket.id: userId

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // 🔄 Get the user's name AND ID from the client upon connection
    socket.on("set-name", ({ userId, name }) => {
      console.log(userId)
      console.log(name)
      if (!userId || !name) {
        socket.emit("error", "Missing userId or name");
        return;
      }

      users[userId] = { socket: socket, name: name };
      userSockets[socket.id] = userId;
      socket.userId = userId;

      // ✅ Confirmation back to client
      socket.emit("userId", userId);

      console.log("Registered user:", userId, name);
      console.log("Current users:", Object.keys(users));


      // Optional (only if you still want to send updated list)
      // io.emit("user-list", getUserList());
    });

    // 📩 Handle messaging
    socket.on("message", async (data) => {
      console.log("yeh data ", data);
      const recipientId = data.recipientId;
      const messageText = data.message;
      const senderId = data.userId;
      console.log("******")
      console.log(recipientId);
      console.log(messageText);
      console.log(senderId)
      console.log("******")
      await saveMessageToDB(senderId, recipientId, messageText);
      if (users[recipientId]) {
        users[recipientId].socket.emit("message", {
          senderId: senderId,
          message: messageText,
        });

        // Optional echo back to sender
        socket.emit("message", {
          senderId: senderId,
          message: messageText,
        });
      } else {
        socket.emit("error", "Recipient not found");
      }
    });

    // 🔌 On disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      const userId = userSockets[socket.id];
      if (userId) {
        delete users[userId];
        delete userSockets[socket.id];
        // io.emit("user-list", getUserList()); // optional
      }
    });

    // ❗ Error handler
    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
      const userId = userSockets[socket.id];
      if (userId) {
        delete users[userId];
        delete userSockets[socket.id];
        // io.emit("user-list", getUserList()); // optional
      }
    });
  });

  // ⚠️ Function not needed unless you're using user list updates
  function getUserList() {
    const userList = [];
    for (const userId in users) {
      userList.push({ userId: userId, name: users[userId].name });
    }
    return userList;
  }

  return io;
}

export default setupSocket;
