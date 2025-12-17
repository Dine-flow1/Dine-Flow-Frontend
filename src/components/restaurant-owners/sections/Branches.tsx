'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {
  Store,
  Plus,
  Search,
  MapPin,
  Phone,
  Users,
  MoreVertical,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  X
} from 'lucide-react';

import { getBranchesByOwner, addBranch } from '@/app/services/branchService';

interface Branch {
  _id?: string;
  branchName: string;
  branchCode: string;
  branchType: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  landmark?: string;
  geoLocation?: { type: string; coordinates: [number, number] };
  contactPhone?: string;
  contactEmail?: string;
  whatsappNumber?: string;
  openingHours?: { openingTime: string; closingTime: string };
  workingDays?: string[];
  managerId?: string;
  totalTables?: number;
  totalSeats?: number;
  services?: { dineIn: boolean; takeaway: boolean; delivery: boolean; onlineOrders: boolean; tableReservation?: boolean };
  paymentMethods?: string[];
  gstNumber?: string;
  fssaiNumber?: string;
  notes?: string;
}

export function Branches() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const defaultBranch: Branch = {
    branchName: '',
    branchCode: '',
    branchType: 'Restaurant',
    address: '',
    city: '',
    state: '',
    geoLocation: { type: 'Point', coordinates: [76.308, 10.015] },
    contactPhone: '',
    contactEmail: '',
    whatsappNumber: '',
    openingHours: { openingTime: '10:00', closingTime: '22:00' },
    workingDays: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    totalTables: 10,
    totalSeats: 40,
    services: { dineIn: true, takeaway: true, delivery: true, onlineOrders: true },
    paymentMethods: ['cash','upi','creditCard'],
    gstNumber: '32ABCDE1234F1Z5',   // default required
    fssaiNumber: '12345678901234',  // default required
    notes: ''
  };

  const [newBranch, setNewBranch] = useState<Branch>(defaultBranch);

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      const data = await getBranchesByOwner();
      setBranches(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (branches.length > 0) {
      gsap.from('.branch-card', {
        duration: 0.4,
        y: 20,
        opacity: 0,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  }, [branches]);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch =
      branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
    console.log(filteredBranches);

  const handleAddBranch = async () => {
    try {
      const branchData = { ...newBranch };
      delete (branchData as any).status; // remove status
      const savedBranch = await addBranch(branchData);
      if (savedBranch) {
        setBranches(prev => [...prev, savedBranch]);
        setShowModal(false);
        setNewBranch(defaultBranch);
      }
    } catch (err) {
      console.error("Failed to add branch", err);
    }
  };

  const toggleService = (service: keyof Branch['services']) => {
    setNewBranch(prev => ({
      ...prev,
      services: { ...prev.services, [service]: !prev.services?.[service] }
    }));
  };

  const togglePaymentMethod = (method: string) => {
    setNewBranch(prev => {
      const currentMethods = prev.paymentMethods || [];
      if (currentMethods.includes(method)) {
        return { ...prev, paymentMethods: currentMethods.filter(m => m !== method) };
      } else {
        return { ...prev, paymentMethods: [...currentMethods, method] };
      }
    });
  };


  
  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Branch Controller</h1>
          <p className="text-gray-600">Manage your restaurant branches</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Branch
        </button>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-lg border mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search branch..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && <div className="text-center py-12 text-gray-500">Loading branches...</div>}

      {/* BRANCH LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBranches.map(branch => (
          <div key={branch.branchId || branch.branchCode} className="branch-card bg-white border rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Store className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{branch.branchName}</h3>
                </div>
              </div>
              <MoreVertical className="text-gray-400" />
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {branch.address}, {branch.city}
              </div>
              {branch.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} /> {branch.contactPhone}
                </div>
              )}
              {branch.managerId && (
                <div className="flex items-center gap-2">
                  <Users size={16} /> Manager ID: {branch.managerId}
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button className="text-red-600 hover:bg-red-50 p-2 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredBranches.length === 0 && (
        <div className="text-center py-12 text-gray-500">No branches found</div>
      )}

      {/* ADD BRANCH MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Add Branch</h2>

            <div className="space-y-3">
              <input placeholder="Branch Name" className="w-full border rounded p-2"
                value={newBranch.branchName}
                onChange={e => setNewBranch({ ...newBranch, branchName: e.target.value })}
              />
              <input placeholder="Branch Code" className="w-full border rounded p-2"
                value={newBranch.branchCode}
                onChange={e => setNewBranch({ ...newBranch, branchCode: e.target.value })}
              />
              <input placeholder="Branch Type" className="w-full border rounded p-2"
                value={newBranch.branchType}
                onChange={e => setNewBranch({ ...newBranch, branchType: e.target.value })}
              />
              <input placeholder="Address" className="w-full border rounded p-2"
                value={newBranch.address}
                onChange={e => setNewBranch({ ...newBranch, address: e.target.value })}
              />
              <input placeholder="City" className="w-full border rounded p-2"
                value={newBranch.city}
                onChange={e => setNewBranch({ ...newBranch, city: e.target.value })}
              />
              <input placeholder="State" className="w-full border rounded p-2"
                value={newBranch.state}
                onChange={e => setNewBranch({ ...newBranch, state: e.target.value })}
              />
              <input placeholder="Contact Phone" className="w-full border rounded p-2"
                value={newBranch.contactPhone}
                onChange={e => setNewBranch({ ...newBranch, contactPhone: e.target.value })}
              />
              <input placeholder="Contact Email" className="w-full border rounded p-2"
                value={newBranch.contactEmail}
                onChange={e => setNewBranch({ ...newBranch, contactEmail: e.target.value })}
              />
              <input placeholder="WhatsApp Number" className="w-full border rounded p-2"
                value={newBranch.whatsappNumber}
                onChange={e => setNewBranch({ ...newBranch, whatsappNumber: e.target.value })}
              />
              <input placeholder="GST Number" className="w-full border rounded p-2"
                value={newBranch.gstNumber}
                onChange={e => setNewBranch({ ...newBranch, gstNumber: e.target.value })}
              />
              <input placeholder="FSSAI Number" className="w-full border rounded p-2"
                value={newBranch.fssaiNumber}
                onChange={e => setNewBranch({ ...newBranch, fssaiNumber: e.target.value })}
              />

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="font-semibold">Services:</span>
                {['dineIn','takeaway','delivery','onlineOrders','tableReservation'].map(s => (
                  <label key={s} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newBranch.services?.[s as keyof Branch['services']] || false}
                      onChange={() => toggleService(s as keyof Branch['services'])}
                    />
                    {s}
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="font-semibold">Payment Methods:</span>
                {['cash','upi','creditCard','netBanking'].map(p => (
                  <label key={p} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newBranch.paymentMethods?.includes(p) || false}
                      onChange={() => togglePaymentMethod(p)}
                    />
                    {p}
                  </label>
                ))}
              </div>

              <input placeholder="Total Tables" type="number" className="w-full border rounded p-2"
                value={newBranch.totalTables}
                onChange={e => setNewBranch({ ...newBranch, totalTables: Number(e.target.value) })}
              />
              <input placeholder="Total Seats" type="number" className="w-full border rounded p-2"
                value={newBranch.totalSeats}
                onChange={e => setNewBranch({ ...newBranch, totalSeats: Number(e.target.value) })}
              />

              <textarea placeholder="Notes" className="w-full border rounded p-2"
                value={newBranch.notes}
                onChange={e => setNewBranch({ ...newBranch, notes: e.target.value })}
              />
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleAddBranch} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
