
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000"); // Adjust port if necessary

const UnoffHunts = () => {
    const [roomName, setRoomName] = useState("");
    const [userCount, setUserCount] = useState(0);
    const [error, setError] = useState("");

    const joinRoom = () => {
        if (!roomName) {
            setError("Please enter a room name");
            return;
        }

        socket.emit("joinHuntRoom", roomName);
    };

    useEffect(() => {
        socket.on("roomUsers", (count) => {
            setUserCount(count);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.off("roomUsers");
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h1 className="text-2xl font-bold mb-4 text-center">Join a Scavenger Hunt Room</h1>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name"
                    className="border border-gray-300 rounded p-2 mb-4 w-full"
                />
                <button
                    onClick={joinRoom}
                    className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
                >
                    Join Room
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <h2 className="text-lg mt-4 text-center">Current Users in Room: {userCount}</h2>
            </div>
        </div>
    );
};

export default UnoffHunts;
