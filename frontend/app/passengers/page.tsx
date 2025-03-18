"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Train {
  id: number;
  name: string;
  from: string;
  to: string;
  time: string;
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

  const train: Train | null = trainData ? JSON.parse(decodeURIComponent(trainData)) : null;

  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [newPassenger, setNewPassenger] = useState<Passenger>({
    name: "",
    age: "",
    gender: "Male",
    preference: "Lower Berth",
    coach: "Sleeper",
  });

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
    router.push(`/payment?train=${encodeURIComponent(trainData ?? "{}")}&passengers=${queryParams}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Passenger Details</h1>

      {/* Train Details */}
      {train ? (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-6">
          <h2 className="text-lg font-semibold mb-2">Train Details</h2>
          <p><strong>Name:</strong> {train.name}</p>
          <p><strong>Route:</strong> {train.from} ➝ {train.to}</p>
          <p><strong>Departure:</strong> {train.time}</p>
        </div>
      ) : (
        <p className="text-red-500 mb-6">Train details not found!</p>
      )}

      {/* Passenger Input Form */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
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

        <select
          className="w-full px-4 py-2 border rounded-lg mb-2"
          value={newPassenger.gender}
          onChange={(e) => setNewPassenger({ ...newPassenger, gender: e.target.value })}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          className="w-full px-4 py-2 border rounded-lg mb-2"
          value={newPassenger.preference}
          onChange={(e) => setNewPassenger({ ...newPassenger, preference: e.target.value })}
        >
          <option value="Lower Berth">Lower Berth</option>
          <option value="Middle Berth">Middle Berth</option>
          <option value="Upper Berth">Upper Berth</option>
          <option value="Side Lower Berth">Side Lower Berth</option>
          <option value="Side Upper Berth">Side Upper Berth</option>
        </select>

        <select
          className="w-full px-4 py-2 border rounded-lg mb-2"
          value={newPassenger.coach}
          onChange={(e) => setNewPassenger({ ...newPassenger, coach: e.target.value })}
        >
          <option value="Sleeper">Sleeper</option>
          <option value="3-tier A/C">3-tier A/C</option>
          <option value="2-tier A/C">2-tier A/C</option>
          <option value="1-tier A/C">1-tier A/C</option>
        </select>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
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
        className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        onClick={proceedToPayment}
        disabled={passengers.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
