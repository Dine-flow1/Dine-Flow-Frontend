import axiosInstance from "../../axiosInstance";

/* ================= CATEGORY SERVICES ================= */

// ADD CATEGORY
export const addCategory = async (data: {
  name: string;
  description?: string;
}) => {
  const res = await axiosInstance.post("/menu/category", data);
  return res.data;
};

// GET ALL CATEGORIES
export const getAllCategories = async () => {
  const res = await axiosInstance.get("/menu/categories");
  
  return res.data.data;
};

// GET CATEGORY BY ID
export const getCategoryById = async (categoryId: string) => {
  const res = await axiosInstance.get(`/menu/category/${categoryId}`);
  return res.data;
};

// UPDATE CATEGORY
export const updateCategory = async (
  categoryId: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  const res = await axiosInstance.put(
    `/menu/category/${categoryId}`,
    data
  );
  return res.data;
};

// DELETE CATEGORY
export const deleteCategory = async (categoryId: string) => {
  const res = await axiosInstance.delete(
    `/menu/deleteCategory/${categoryId}`
  );
  return res.data;
};
