"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Confirmation() {
  const searchParams = useSearchParams();
  const trainData = searchParams.get("train");
  const passengersData = searchParams.get("passengers");
  const bookingID = searchParams.get("booking");

  const [train, setTrain] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trainData) setTrain(JSON.parse(decodeURIComponent(trainData)));
    if (passengersData) setPassengers(JSON.parse(decodeURIComponent(passengersData)));
  }, [trainData, passengersData]);

  const generatePDF = () => {
    if (!pdfRef.current) return;

    html2canvas(pdfRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Adjusted for A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Train-Ticket-${bookingID}.pdf`);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl mt-16 font-bold text-green-600 mb-6">🎟️ Booking Confirmed!</h1>

      {/* Ticket Content (For PDF Generation) */}
      <div ref={pdfRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2 text-center">E-Ticket Details</h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Booking ID: <span className="font-bold">{bookingID}</span>
        </p>

        {/* Train Details */}
        {train ? (
          <div className="mb-4">
            <h3 className="text-md font-semibold">Train Details</h3>
            <p><strong>Train Number:</strong> {train.train_number}</p>
            <p><strong>Name:</strong> {train.train_name}</p>
            <p><strong>From:</strong> {train.source_name} → <strong>To:</strong> {train.destination_name}</p>
            <p><strong>Departure:</strong> {train.departure_time}</p>
            <p><strong>Arrival:</strong> {train.arrival_time}</p>
          </div>
        ) : (
          <p className="mb-4 text-red-500">⚠️ No train details found!</p>
        )}

        {/* Passenger List */}
        <div>
          <h3 className="text-md font-semibold mb-2">Passengers</h3>
          {passengers.length > 0 ? (
            <ul>
              {passengers.map((p, index) => (
                <li key={index} className="border-b py-2">
                  {p.name} ({p.age}, {p.gender}, {p.preference}, {p.coach})
                </li>
              ))}
            </ul>
          ) : (
            <p>No passenger details found!</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => window.location.href = "/"}
        >
          Go Back to Home
        </button>
        
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          onClick={generatePDF}
        >
          Download Ticket 📄
        </button>
      </div>
    </div>
  );
}
