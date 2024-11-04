// controllers/unofficialHunts.js
import { Server } from 'socket.io';

const rooms = {}; // Object to track room participants

export const initializeHuntSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Adjust this to your frontend URL
            credentials: true,
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        // Join room event
        socket.on("joinHuntRoom", (roomName) => {
            // Add user to the room
            socket.join(roomName);
            
            // Initialize the room if it doesn't exist
            if (!rooms[roomName]) {
                rooms[roomName] = new Set(); // Use a Set to store unique users
            }
            
            // Add the user to the room
            rooms[roomName].add(socket.id);
            
            // Emit the number of users in the room
            io.to(roomName).emit("roomUsers", rooms[roomName].size);
            console.log(`User joined room: ${roomName}. Total users: ${rooms[roomName].size}`);
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log("A user disconnected");
            // Remove user from all rooms
            for (const roomName of Object.keys(rooms)) {
                if (rooms[roomName].has(socket.id)) {
                    rooms[roomName].delete(socket.id);
                    io.to(roomName).emit("roomUsers", rooms[roomName].size);
                    console.log(`User left room: ${roomName}. Total users: ${rooms[roomName].size}`);
                    // Clean up the room if it's empty
                    if (rooms[roomName].size === 0) {
                        delete rooms[roomName];
                    }
                }
            }
        });
    });
};
