import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import HuntForm from "./HuntForm";
import UnofficialHuntsList from "./UnoffHuntsList";
const newSocket = io("http://localhost:8000", {
  autoConnect: false,
});

function UnoffHuntsPage() {
  const [socket, setSocket] = useState(newSocket);
  const [isConnected, setIsConnected] = useState(false);
  const [renderCount, setRenderCount] = useState(0); // Add render counter
  const { roomId } = useParams();
  const User = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => {
      setIsConnected(true);
      if (roomId) {
        socket.emit("joinRoom", roomId);
        console.log(`socket ${socket.id} joined room: ${roomId}`);
      }
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      if (roomId) {
        socket.emit("leaveRoom", roomId);
      }
    };
  }, [roomId]);

  useEffect(() => {
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="space-y-4">
        {isConnected ? (
          <div>
            <div className="mb-4">
              Hello {User.username} welcome to the room {roomId}
            </div>
            <div className=" flex justify-start">
              <HuntForm isUnoff={true} roomId={roomId} />
            </div>
            <div>
              <UnofficialHuntsList roomId={roomId} />
            </div>
          </div>
        ) : (
          <div>Connecting...</div>
        )}
      </div>
    </div>
  );
}

export default UnoffHuntsPage;
