"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [train, setTrain] = useState<any>(null);
  const [passengers, setPassengers] = useState<any[]>([]);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const trainData = searchParams.get("train");
    const passengerData = searchParams.get("passengers");

    // ✅ Use `decodeURIComponent()` only, no need for `JSON.parse()`
    if (trainData) {
      try {
        const decodedTrain = JSON.parse(decodeURIComponent(trainData));
        setTrain(decodedTrain);
      } catch (error) {
        console.error("Error decoding train data:", error);
        setTrain(null);
      }
    }

    if (passengerData) {
      try {
        const decodedPassengers = JSON.parse(decodeURIComponent(passengerData));
        setPassengers(decodedPassengers);
      } catch (error) {
        console.error("Error decoding passenger data:", error);
        setPassengers([]);
      }
    }
  }, [searchParams]);

  // ✅ Define prices based on coach class
  const coachPrices: Record<string, number> = {
    sleeper: 500,
    "3-tier A/C": 700,
    "2-tier A/C": 1000,
    "1-tier A/C": 1500,
  };

  // ✅ Calculate total amount
  const totalAmount = useMemo(() => {
    return passengers.reduce((sum, p) => sum + (coachPrices[p.coach] || 500), 0);
  }, [passengers]);

  const handleFakePayment = async () => {
    setIsPaying(true);
    const response = await fetch("http://localhost:8000/api/confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        train_name: train.train_name,
        train_number: train.train_number,
        passenger_name: passengers[0].name,
      })
    });

    const data = await response.json();
    console.log("Payment Response:", data);

    
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        router.push(
          `/confirmation?train=${encodeURIComponent(JSON.stringify(train))}&passengers=${encodeURIComponent(JSON.stringify(passengers))}&booking=${Math.floor(100000 + Math.random() * 900000)}`
        );

      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Payment Page</h1>

      {/* Train Details
      {train ? (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-4">
          <h2 className="text-lg font-semibold">Train Details:</h2>
          <p><strong>Train:</strong> {train.train_name} ({train.train_number})</p>
          <p><strong>From:</strong> {train.source_name} ({train.source_code})</p>
          <p><strong>To:</strong> {train.destination_name} ({train.destination_code})</p>
          <p><strong>Departure:</strong> {train.departure_time}</p>
          <p><strong>Arrival:</strong> {train.arrival_time}</p>
          <p><strong>Duration:</strong> {train.duration}</p>
          <p><strong>Status:</strong> {train.status}</p>
          <p><strong>Days of Operation:</strong> {train.days_of_operation.join(", ")}</p>
        </div>
      ) : (
        <p className="mb-4 text-red-500">No train details found!</p>
      )} */}

      {/* Passenger List */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Passengers:</h2>
        {passengers.length > 0 ? (
          <ul>
            {passengers.map((p, index) => (
              <li key={index} className="border-b py-2">
                {p.name} ({p.age}, {p.gender}, {p.preference}) -
                <span className="text-blue-600"> {p.coach} </span>
                (<strong>₹{coachPrices[p.coach] || 500}</strong>)
              </li>
            ))}
          </ul>
        ) : (
          <p>No passenger details found!</p>
        )}
      </div>

      {/* Total Amount */}
      <div className="mt-4 text-lg font-semibold text-gray-800">
        Total Amount: <span className="text-green-600">₹{totalAmount}</span>
      </div>

      {/* Payment Button */}
      {!isPaying && !paymentSuccess && (
        <button
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          onClick={handleFakePayment}
        >
          Pay ₹{totalAmount} & Confirm Booking
        </button>
      )}

      {/* Processing Indicator */}
      {isPaying && (
        <div className="mt-6 flex items-center">
          <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mr-2"></div>
          <span className="text-blue-500 font-semibold">Processing Payment...</span>
        </div>
      )}

      {/* Payment Success */}
      {paymentSuccess && (
        <div className="mt-6 text-green-600 font-semibold">
          ✅ Payment Successful! Redirecting...
        </div>
      )}
    </div>
  );
}
