"use client";
import { useState } from "react";
import { FaTrain, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [trains] = useState([
    { id: 1, name: "Express 101", from: "Delhi", to: "Mumbai", time: "10:00 AM" },
    { id: 2, name: "Superfast 202", from: "Delhi", to: "Mumbai", time: "02:00 PM" },
    { id: 3, name: "Rajdhani 303", from: "Delhi", to: "Mumbai", time: "08:00 PM" }
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 flex items-center mb-6">
        <FaTrain className="mr-2" /> Train Ticket Booking
      </h1>

      {/* Train Search Section */}
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Trains</h2>
        <input type="text" placeholder="From" className="w-full px-4 py-2 border rounded-lg mb-2" />
        <input type="text" placeholder="To" className="w-full px-4 py-2 border rounded-lg mb-2" />
        <input type="date" className="w-full px-4 py-2 border rounded-lg mb-4" />
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
          <FaSearch className="mr-2" /> Find Trains
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Available Trains</h2>
        {trains.map((train) => (
          <div key={train.id} className="p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{train.name}</h3>
              <p className="text-gray-600">{train.from} ➝ {train.to} | {train.time}</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              onClick={() => 
                router.push(`/passengers?train=${encodeURIComponent(JSON.stringify(train))}`)
              }
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
