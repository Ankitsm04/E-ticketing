"use client";
import { useState } from "react";
import { FaTrain, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle Train Search
  const handleSearch = async () => {
    if (!source || !destination) {
      setError("Please enter both source and destination.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/train/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ source, destination })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trains");
      }

      const data = await response.json();
      setTrains(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 flex items-center mb-6">
        <FaTrain className="mr-2" /> Train Ticket Booking
      </h1>

      {/* Train Search Section */}
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Trains</h2>

        <input
          type="text"
          placeholder="Source Station Code"
          className="w-full px-4 py-2 border rounded-lg mb-2"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination Station Code"
          className="w-full px-4 py-2 border rounded-lg mb-4"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center"
        >
          <FaSearch className="mr-2" /> Find Trains
        </button>
      </div>

      {/* Train List Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Available Trains</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading trains...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : trains.length === 0 ? (
          <p className="text-center text-gray-500">No trains found</p>
        ) : (
          trains.map((train) => (
            <div key={train.train_number} className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{train.train_name}</h3>
                <p className="text-gray-600">
                  {train.source_name} ({train.source_code}) ➝ {train.destination_name} ({train.destination_code}) | {train.departure_time}
                </p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                onClick={() => {
                  const trainData = btoa(JSON.stringify(train));  // Base64 encoding
                  router.push(`/passengers?train=${trainData}`);
                }}
              >
                Select
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
