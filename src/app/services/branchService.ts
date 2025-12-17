import axiosInstance from "./axiosInstance";

export const getBranchesByOwner = async () => {
  try {
    const res = await axiosInstance.get("/restaurants/owner/branches");

    /**
     * BACKEND RESPONSE CAN BE:
     * 1) { data: [] }
     * 2) { data: { branches: [] } }
     * This HANDLES BOTH
     */

    if (Array.isArray(res.data?.data)) {
      return res.data.data;
    }

    if (Array.isArray(res.data?.data?.branches)) {
      return res.data.data.branches;
    }

    console.error("Unexpected branch response shape:", res.data);
    return [];
  } catch (err) {
    console.error("Failed to fetch branches", err);
    return [];
  }
};

export const addBranch = async (branchData: any) => {
  try {
    const restaurantId = "693d30df2da3de861d4648f9"; // hardcoded restaurant id
    const res = await axiosInstance.post(`/restaurants/${restaurantId}/branches`, branchData);

    if (res.data?.data) {
      return res.data.data;
    }

    console.error("Unexpected add branch response:", res.data);
    return null;
  } catch (err) {
    console.error("Failed to add branch", err);
    throw err;
  }
};