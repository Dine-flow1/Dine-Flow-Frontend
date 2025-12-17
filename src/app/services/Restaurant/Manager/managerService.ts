import axiosInstance from "../../axiosInstance";

// GET ALL MANAGERS
export const getAllManagers = async () => {
  const res = await axiosInstance.get(
    "/restaurants/getall-manager"
  );
  console.log("getall", res.data.data);
  return res.data.data;
};

// GET MANAGER BY ID (optional)
export const getManagerById = async (id: string) => {
  const res = await axiosInstance.get(
    `/restaurants/getall-manager/${id}`
  );
  return res.data.data;
};

// CREATE MANAGER (✅ BRANCH-BASED)
export const createManager = async (data: {
  fullName: string;
  email: string;
  password: string;
  branchId: string; // ✅ CORRECT
}) => {
  const res = await axiosInstance.post(
    "/restaurants/create-manager",
    data
  );
  return res.data.data;
};

// UPDATE MANAGER
export const updateManager = async (
  id: string,
  data: {
    fullName: string;
    email: string;
    branchIds: string[]; // ✅ IMPORTANT
  }
) => {
  console.log("SERVICE UPDATE PAYLOAD:", data);

  const res = await axiosInstance.put(
    `/restaurants/update-manager/${id}`,
    {
      fullName: data.fullName,
      email: data.email,
      branchIds: data.branchIds, // ✅ PASS THROUGH
    }
  );

  return res.data.data;
};


// DELETE MANAGER
export const deleteManager = async (id: string) => {
  const res = await axiosInstance.delete(
    `/restaurants/delete-manager/${id}`
  );
  return res.data;
};

// TOGGLE MANAGER STATUS
export const toggleManagerStatus = async (id: string) => {
  const res = await axiosInstance.patch(
    `/restaurants/toggle-manager-status/${id}`
  );
  return res.data.data;
};
