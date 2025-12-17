import axiosInstance from "../../axiosInstance";

/* ================= ITEM SERVICES ================= */

// ADD ITEM
export const addMenuItem = async (data: {
  name: string;
  price: number;
  categoryId: string;
  description?: string;
  image?: string;
  available?: boolean;
}) => {
  const res = await axiosInstance.post("/menu/item", data);
  return res.data;
};

// GET ALL ITEMS
export const getAllMenuItems = async () => {
  const res = await axiosInstance.get("/menu/items");

  
  return res.data.data;
};

// GET ITEM BY ID
export const getMenuItemById = async (itemId: string) => {
  const res = await axiosInstance.get(`/menu/item/${itemId}`);
  return res.data;
};

// UPDATE ITEM
export const updateMenuItem = async (
  itemId: string,
  data: {
    name?: string;
    price?: number;
    categoryId?: string;
    description?: string;
    image?: string;
    available?: boolean;
  }
) => {
  const res = await axiosInstance.put(
    `/menu/item/${itemId}`,
    data
  );
  return res.data;
};

// DELETE ITEM
export const deleteMenuItem = async (itemId: string) => {
  const res = await axiosInstance.delete(
    `/menu/itemDeleted/${itemId}`
  );
  return res.data;
};
/* ================= FULL MENU ================= */

// GET FULL MENU BY RESTAURANT ID
export const getFullMenuByRestaurant = async (restaurantId: string) => {
  const res = await axiosInstance.get(
    `/menu/fullmenu/${restaurantId}`
  );
  return res.data;
};
