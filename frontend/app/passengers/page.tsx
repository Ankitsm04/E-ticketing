"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Train {
  _id: string;
  train_number: string;
  train_name: string;
  source_code: string;
  source_name: string;
  destination_code: string;
  destination_name: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  days_of_operation: string[];
  status: string;
}

interface Passenger {
  name: string;
  age: string;
  gender: string;
  preference: string;
  coach: string;
}

export default function Passengers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainData = searchParams.get("train");

  const [train, setTrain] = useState<Train | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [newPassenger, setNewPassenger] = useState<Passenger>({
    name: "",
    age: "",
    gender: "Male",
    preference: "Lower Berth",
    coach: "Sleeper",
  });

  useEffect(() => {
    if (trainData) {
      try {
        const decodedData = JSON.parse(atob(decodeURIComponent(trainData)));  // Decode Base64 properly
        setTrain(decodedData);
      } catch (error) {
        console.error("Error decoding train data:", error);
        setTrain(null);
      }
    }
  }, [trainData]);

  const addPassenger = () => {
    if (!newPassenger.name || !newPassenger.age) {
      return alert("Please enter all passenger details!");
    }
    setPassengers([...passengers, newPassenger]);
    setNewPassenger({ name: "", age: "", gender: "Male", preference: "Lower Berth", coach: "Sleeper" });
  };

  const removePassenger = (index: number) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const proceedToPayment = () => {
    if (passengers.length === 0) return alert("Add at least one passenger!");
    const queryParams = encodeURIComponent(JSON.stringify(passengers));
    router.push(
      `/payment?train=${encodeURIComponent(JSON.stringify(train))}&passengers=${encodeURIComponent(JSON.stringify(passengers))}`
    );
    
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Passenger Details</h1>

      {/* Train Details */}
      {train ? (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-6">
          <h2 className="text-lg font-semibold mb-2">Train Details</h2>
          <p><strong>Train:</strong> {train.train_name} ({train.train_number})</p>
          <p><strong>Route:</strong> {train.source_name} ➝ {train.destination_name}</p>
          <p><strong>Departure:</strong> {train.departure_time}</p>
          <p><strong>Arrival:</strong> {train.arrival_time}</p>
          <p><strong>Duration:</strong> {train.duration}</p>
          <p><strong>Status:</strong> {train.status}</p>
          <p><strong>Days of Operation:</strong> {train.days_of_operation.join(", ")}</p>
        </div>
      ) : (
        <p className="text-red-500 mb-6">Train details not found!</p>
      )}

      {/* Passenger Form */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Add Passenger</h2>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full px-4 py-2 border rounded-lg mb-2"
          value={newPassenger.name}
          onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full px-4 py-2 border rounded-lg mb-2"
          value={newPassenger.age}
          onChange={(e) => setNewPassenger({ ...newPassenger, age: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-2">
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={newPassenger.gender}
            onChange={(e) => setNewPassenger({ ...newPassenger, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={newPassenger.coach}
            onChange={(e) => setNewPassenger({ ...newPassenger, coach: e.target.value })}
          >
            <option value="Sleeper">Sleeper</option>
            <option value="3-tier A/C">3-tier A/C</option>
            <option value="2-tier A/C">2-tier A/C</option>
            <option value="1-tier A/C">1-tier A/C</option>
          </select>
        </div>

        <select
          className="w-full px-4 py-2 border rounded-lg mt-2"
          value={newPassenger.preference}
          onChange={(e) => setNewPassenger({ ...newPassenger, preference: e.target.value })}
        >
          <option value="Lower Berth">Lower Berth</option>
          <option value="Middle Berth">Middle Berth</option>
          <option value="Upper Berth">Upper Berth</option>
          <option value="Side Lower Berth">Side Lower Berth</option>
          <option value="Side Upper Berth">Side Upper Berth</option>
        </select>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
          onClick={addPassenger}
        >
          Add Passenger
        </button>
      </div>

      {/* Passenger List */}
      {passengers.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Passengers Added:</h2>
          <ul className="bg-white p-4 rounded-lg shadow-md">
            {passengers.map((p, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <p>{p.name} ({p.age}, {p.gender}, {p.preference}, {p.coach})</p>
                <button
                  className="text-red-500 font-bold"
                  onClick={() => removePassenger(index)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Proceed to Payment */}
      <button
        className={`mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition ${
          passengers.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={proceedToPayment}
        disabled={passengers.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
