"use client";
import { useSearchParams } from "next/navigation";

export default function Confirmation() {
  const searchParams = useSearchParams();

  const trainData = searchParams.get("train");
  const passengersData = searchParams.get("passengers");
  const bookingID = searchParams.get("booking");

  const train = trainData ? JSON.parse(decodeURIComponent(trainData)) : null;

  const passengers = passengersData ? JSON.parse(decodeURIComponent(passengersData)) : [];

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl mt-16 font-bold text-green-600 mb-6">🎟️ Booking Confirmed!</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2 text-center">E-Ticket Details</h2>
        <p className="text-sm text-gray-500 mb-4 text-center">Booking ID: <span className="font-bold">{bookingID}</span></p>

        {train ? (
          <div className="mb-4">
            <h3 className="text-md font-semibold">Train Details</h3>
            <p><strong>Name:</strong> {train.name}</p>
            <p><strong>From:</strong> {train.from} → <strong>To:</strong> {train.to}</p>
            <p><strong>Departure:</strong> {train.time}</p>
          </div>
        ) : (
          <p className="mb-4 text-red-500">No train details found!</p>
        )}

        {/* Passenger List */}
        <div>
          <h3 className="text-md font-semibold mb-2">Passengers</h3>
          {passengers.length > 0 ? (
            <ul>
              {passengers.map((p: any, index: number) => (
                <li key={index} className="border-b py-2">
                  {p.name} ({p.age}, {p.gender}, {p.preference})
                </li>
              ))}
            </ul>
          ) : (
            <p>No passenger details found!</p>
          )}
        </div>
      </div>

      {/* Back to Home */}
      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        onClick={() => window.location.href = "/"}
      >
        Go Back to Home
      </button>
    </div>
  );
}
