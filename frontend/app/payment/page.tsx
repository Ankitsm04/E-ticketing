"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract train details
  const trainData = searchParams.get("train");
  const train = trainData ? JSON.parse(decodeURIComponent(trainData)) : null;

  // Extract passenger details
  const passengerData = searchParams.get("passengers");
  const passengers = passengerData ? JSON.parse(decodeURIComponent(passengerData)) : [];

  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Define price based on coach class
  const coachPrices: Record<string, number> = {
    sleeper: 500,
    "3-tier A/C": 700,
    "2-tier A/C": 1000,
    "1-tier A/C": 1500,
  };

  // Calculate total amount based on passenger coach selection
  const totalAmount = useMemo(() => {
    return passengers.reduce((sum: number, p: any) => sum + (coachPrices[p.coach] || 500), 0);
  }, [passengers]);

  const handleFakePayment = () => {
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        router.push(
          `/confirmation?train=${encodeURIComponent(trainData ?? "{}")}&passengers=${encodeURIComponent(passengerData ?? "[]")}&booking=${Math.floor(100000 + Math.random() * 900000)}`
        );
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Payment Page</h1>

      {train ? (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-4">
          <h2 className="text-lg font-semibold">Train Details:</h2>
          <p><strong>Name:</strong> {train.name}</p>
          <p><strong>From:</strong> {train.from}</p>
          <p><strong>To:</strong> {train.to}</p>
          <p><strong>Departure:</strong> {train.time}</p>
        </div>
      ) : (
        <p className="mb-4">No train details found!</p>
      )}

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Passengers:</h2>
        {passengers.length > 0 ? (
          <ul>
            {passengers.map((p: any, index: number) => (
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

      <div className="mt-4 text-lg font-semibold text-gray-800">
        Total Amount: <span className="text-green-600">₹{totalAmount}</span>
      </div>

      {!isPaying && !paymentSuccess && (
        <button
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          onClick={handleFakePayment}
        >
          Pay ₹{totalAmount} & Confirm Booking
        </button>
      )}

      {isPaying && (
        <div className="mt-6 flex items-center">
          <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mr-2"></div>
          <span className="text-blue-500 font-semibold">Processing Payment...</span>
        </div>
      )}

      {paymentSuccess && (
        <div className="mt-6 text-green-600 font-semibold">
          ✅ Payment Successful! Redirecting...
        </div>
      )}
    </div>
  );
}
