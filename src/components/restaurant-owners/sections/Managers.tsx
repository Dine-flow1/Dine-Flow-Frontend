"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { UserPlus, Search, Edit, Trash2 } from "lucide-react";

import {
  getAllManagers,
  createManager,
  updateManager,
  deleteManager,
  toggleManagerStatus,
} from "@/app/services/Restaurant/Manager/managerService";

import { getBranchesByOwner } from "@/app/services/branchService";

interface Manager {
  _id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  managedBranches: { _id: string; branchName: string }[];
}

interface Branch {
  _id: string;
  branchName: string;
}

export function Managers() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingManagerId, setEditingManagerId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    branchId: "",
  });

  // ---------------- FETCH MANAGERS ----------------
  const fetchManagers = async () => {
    try {
      const data = await getAllManagers();
      setManagers(data);
    } catch (err) {
      console.error("Fetch managers failed", err);
    }
  };

  // ---------------- FETCH BRANCHES (FIXED) ----------------
  const fetchBranches = async () => {
    try {
      const res = await getBranchesByOwner();
      console.log(res);
      
      setBranches(res || []);
    } catch (err) {
      console.error("Fetch branches failed", err);
      setBranches([]);
    }
  };

  useEffect(() => {
    fetchManagers();
    fetchBranches();

    gsap.from(".manager-row", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.05,
    });
  }, []);

  // ---------------- FILTER ----------------
  const filteredManagers = managers.filter(
    (m) =>
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------- ADD / UPDATE ----------------
  const handleSaveManager = async () => {
    try {
      if (!formData.branchId) {
        alert("Please select a branch");
        return;
      }

      if (editingManagerId) {
        await updateManager(editingManagerId, {
          fullName: formData.fullName,
          email: formData.email,
          branchIds: [formData.branchId], // ✅ REQUIRED BY BACKEND
        });
      } else {
        await createManager({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          branchIds: [formData.branchId], // ✅ REQUIRED BY BACKEND
        });
      }

      await fetchManagers();
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save manager");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this manager?")) return;
    await deleteManager(id);
    fetchManagers();
  };

  // ---------------- TOGGLE STATUS ----------------
  const handleToggleStatus = async (id: string) => {
    await toggleManagerStatus(id);
    fetchManagers();
  };

  // ---------------- RESET FORM ----------------
  const resetForm = () => {
    setShowAddForm(false);
    setEditingManagerId(null);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      branchId: "",
    });
  };

  // ---------------- UI ----------------
  console.log(branches);
  
  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Managers</h1>
          <p className="text-gray-600">
            Create, update and control restaurant managers
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <UserPlus size={18} /> Add Manager
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="font-semibold mb-4">
            {editingManagerId ? "Update Manager" : "Add Manager"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 rounded"
            />

            {!editingManagerId && (
              <input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="border p-2 rounded"
              />
            )}

            <select
              value={formData.branchId}
              onChange={(e) =>
                setFormData({ ...formData, branchId: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b.branchId} value={b.branchId}>
                  {b.branchName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={resetForm} className="border px-4 py-2 rounded">
              Cancel
            </button>
            <button
              onClick={handleSaveManager}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editingManagerId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border rounded"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Join Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredManagers.map((manager) => (
              <tr key={manager._id} className="manager-row border-t">
                <td className="p-3">{manager.fullName}</td>
                <td className="p-3">{manager.email}</td>
                <td className="p-3">
                  {manager.managedBranches.length
                    ? manager.managedBranches
                        .map((b) => b.branchName)
                        .join(", ")
                    : "N/A"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleStatus(manager._id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      manager.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {manager.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-3">
                  {new Date(manager.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingManagerId(manager._id);
                      setShowAddForm(true);
                      setFormData({
                        fullName: manager.fullName,
                        email: manager.email,
                        password: "",
                        branchId: manager.managedBranches[0]?._id || "",
                      });
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(manager._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
