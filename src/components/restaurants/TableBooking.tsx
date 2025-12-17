'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, ArrowRight } from 'lucide-react';

/**
 * TableBooking
 * - Interactive seat map (grid)
 * - Choose seat, date/time, and number of guests
 * - Simple validation and "reservation" flow (mock)
 *
 * Props:
 *  - restaurantId?: string
 *  - restaurantName?: string
 */
interface TableBookingProps {
  restaurantId?: string;
  restaurantName?: string;
}

type Seat = {
  id: string;          // e.g., "A1"
  row: string;         // e.g., "A"
  number: number;      // e.g., 1
  status: 'available' | 'reserved' | 'selected' | 'unavailable';
  type?: 'regular' | 'vip';
};

const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLS = 8;

export default function TableBooking({ restaurantId, restaurantName }: TableBookingProps) {
  const router = useRouter();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [timeSlot, setTimeSlot] = useState<string>('19:00');
  const [guests, setGuests] = useState<number>(2);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize seat map with some reserved seats for the demo
  const reservedSeatIds = useMemo(() => {
    // reserve a few seats randomly for demo
    return new Set(['A2', 'A3', 'B5', 'C1']);
  }, []);

  useEffect(() => {
    const map: Seat[] = [];
    ROWS.forEach((r) => {
      for (let c = 1; c <= COLS; c++) {
        const id = `${r}${c}`;
        const isReserved = reservedSeatIds.has(id);
        const isVip = r === 'A'; // Row A is VIP
        map.push({
          id,
          row: r,
          number: c,
          status: isReserved ? 'reserved' : 'available',
          type: isVip ? 'vip' : 'regular',
        });
      }
    });
    setSeats(map);
  }, [reservedSeatIds]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'reserved' || seat.status === 'unavailable') return;
    if (selectedSeat?.id === seat.id) {
      // deselect
      setSelectedSeat(null);
      setSeats((prev) => prev.map(s => (s.id === seat.id ? { ...s, status: 'available' } : s)));
      return;
    }
    // clear previous selection
    setSeats((prev) => prev.map(s => s.id === selectedSeat?.id ? { ...s, status: 'available' } : s));
    setSelectedSeat(seat);
    setSeats((prev) => prev.map(s => (s.id === seat.id ? { ...s, status: 'selected' } : s)));
  };

  const handleReserve = async () => {
    if (!selectedSeat) {
      alert('Please select a seat before reserving.');
      return;
    }
    setLoading(true);
    setSuccessMessage(null);
    // Mock API call - replace with apiService call to create reservation in real app
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(`Successfully reserved ${selectedSeat.id} for ${date} at ${timeSlot} (${guests} guests).`);
      // Mark seat as reserved
      setSeats((prev) => prev.map(s => s.id === selectedSeat.id ? { ...s, status: 'reserved' } : s));
      setSelectedSeat(null);
      // Optional: redirect to reservations page
      // router.push('/reservations');
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Table booking
            <span className="text-sm text-gray-500 ml-2"> — {restaurantName}</span>
          </h3>
          <p className="text-gray-600 mt-1">Pick your seat and time below. Instant confirmation.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div>{date}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="col-span-1 md:col-span-2">
          <div className="mb-3 text-sm text-gray-600">Click a seat to select it. Hover to preview.</div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex flex-col gap-2">
              {ROWS.map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <div className="w-6 text-sm text-gray-600">{r}</div>
                  <div className="flex gap-3 flex-wrap">
                    {seats.filter(s => s.row === r).map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === 'reserved' || seat.status === 'unavailable'}
                        aria-label={`Seat ${seat.id} ${seat.type}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold border transition-colors duration-150
                          ${seat.type === 'vip' ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'bg-white'}
                          ${seat.status === 'available' ? 'border-gray-200 hover:border-blue-300' : ''}
                          ${seat.status === 'reserved' ? 'bg-gray-200 border-gray-200 opacity-70 cursor-not-allowed' : ''}
                          ${seat.status === 'selected' ? 'bg-blue-600 text-white border-blue-600' : ''}
                        `}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-white border border-gray-200" />
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-gray-200 border border-gray-200" />
              <span className="text-gray-600">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-blue-600" />
              <span className="text-gray-600">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-yellow-300 border border-yellow-400" />
              <span className="text-gray-600">VIP</span>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="mb-4 text-sm text-gray-600">Reservation details</div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Time</label>
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">Guests</label>
                <input
                  type="number"
                  value={guests}
                  min={1}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Selected Seat</label>
                <div className="mt-1 text-sm text-gray-700 font-semibold">
                  {selectedSeat ? `${selectedSeat.id} (${selectedSeat.type})` : 'No seat selected'}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReserve}
                  disabled={!selectedSeat || loading}
                  className={`w-full px-4 py-3 text-white rounded-lg font-semibold transition-all ${
                    selectedSeat ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg' : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Reserving...' : 'Reserve Table'}
                </button>
              </div>

              {successMessage && (
                <div className="mt-3 text-sm text-green-700 bg-green-50 border border-green-100 rounded p-2">
                  {successMessage}
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-4 flex gap-2">
            <button className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50" onClick={() => { setSelectedSeat(null); setGuests(2); }}>
              Clear
            </button>
            <button className="w-full px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 hover:bg-blue-100" onClick={() => setSelectedSeat(seats.find(s => s.status === 'available') ?? null)}>
              Auto-select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}