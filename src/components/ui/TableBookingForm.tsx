import React, { useState } from "react";

interface TableBookingFormProps {
  restaurant: any;
  tables?: {
    _id: string;
    tableNumber: number;
    capacity: number;
    status: "available" | "booked";
  }[];
}

export default function TableBookingForm({
  restaurant,
  tables = [],
}: TableBookingFormProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Book a Table at {restaurant.restaurantName}
      </h2>
      <p className="text-gray-500 mb-6">
        Choose your table and complete your reservation.
      </p>

      {/* TABLE LAYOUT */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Available Tables</h3>

        {tables.length === 0 ? (
          <p className="text-gray-500">No table data available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {tables.map((table) => {
              const isBooked = table.status === "booked";
              const isSelected = selectedTable === table._id;

              return (
                <button
                  key={table._id}
                  onClick={() => !isBooked && setSelectedTable(table._id)}
                  className={`border rounded-xl p-4 flex flex-col items-center transition 
                    ${
                      isBooked
                        ? "bg-red-100 border-red-300 cursor-not-allowed opacity-60"
                        : isSelected
                        ? "bg-yellow-500 text-white border-yellow-700 shadow-lg"
                        : "bg-gray-50 border-gray-300 hover:bg-yellow-50"
                    }
                  `}
                >
                  <div className="text-xl font-bold">Table {table.tableNumber}</div>
                  <div className="text-sm">
                    Capacity: {table.capacity} people
                  </div>
                  <div
                    className={`mt-1 text-xs font-medium 
                      ${
                        isBooked
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    `}
                  >
                    {isBooked ? "Booked" : "Available"}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* BOOKING FORM */}
      {selectedTable && (
        <div className="p-4 border rounded-xl bg-gray-50 mb-6">
          <p className="text-gray-800 font-semibold">
            Selected Table:{" "}
            <span className="text-yellow-600">
              Table {tables.find((t) => t._id === selectedTable)?.tableNumber}
            </span>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* DATE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* TIME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* GUESTS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
            <option>1 person</option>
            <option>2 people</option>
            <option>3 people</option>
            <option>4 people</option>
            <option>5+ people</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          disabled={!selectedTable}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors 
            ${
              selectedTable
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }
          `}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
