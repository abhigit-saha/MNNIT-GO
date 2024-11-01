// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [hunts, setHunts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    image: '',
    difficulty: 'Medium',
    locations: [{ name: '', hint: '' }],
    clues: [{ text: '', answer: '', isUnlocked: false }],
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchHunts();
    } else {
      toast.error("Please log in to access the dashboard");
      navigate("/login");
    }
  }, [navigate]);

  const fetchHunts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:8000/hunts/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHunts(data.hunts);
      } else {
        toast.error("Failed to load hunts");
      }
    } catch (error) {
      toast.error("Error fetching hunts");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddHunt = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/hunts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Hunt created successfully!");
        setHunts((prevHunts) => [...prevHunts, data.hunt]);
        setFormData({
          name: '',
          title: '',
          description: '',
          image: '',
          difficulty: 'Medium',
          locations: [{ name: '', hint: '' }],
          clues: [{ text: '', answer: '', isUnlocked: false }],
        });
      } else {
        toast.error(data.message || "Failed to create hunt");
      }
    } catch (error) {
      toast.error("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to Your Dashboard, {user?.fullname}!</h1>

      <form onSubmit={handleAddHunt} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold mb-4">Create a New Hunt</h2>
        
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Hunt Name"
          className="mb-3 p-2 w-full border rounded-md"
          required
        />
        
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Hunt Title"
          className="mb-3 p-2 w-full border rounded-md"
          required
        />
        
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Hunt Description"
          className="mb-3 p-2 w-full border rounded-md"
          required
        />
        
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="mb-3 p-2 w-full border rounded-md"
          required
        />
        
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
          className="mb-3 p-2 w-full border rounded-md"
          required
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
          Create Hunt
        </button>
      </form>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Your Hunts</h2>
        {hunts.length > 0 ? (
          <ul className="space-y-4">
            {hunts.map((hunt) => (
              <li key={hunt._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">{hunt.name}</h3>
                <p>Title: {hunt.title}</p>
                <p>Description: {hunt.description}</p>
                <p>Difficulty: {hunt.difficulty}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No hunts created yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
