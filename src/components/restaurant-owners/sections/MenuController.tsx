"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Edit, Trash2 } from "lucide-react";

import {
  addMenuItem,
  getAllMenuItems,
  deleteMenuItem,
  updateMenuItem,
} from "@/app/services/Restaurant/Menu/menuItemService";

import {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "@/app/services/Restaurant/Menu/menuCategoryService";

/* ================= TYPES ================= */

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number | string;
  isVeg: boolean;
  spiceLevel: "Mild" | "Medium" | "Spicy";
  available: boolean;
  image?: File | string;
}

/* ================= CONSTANT ================= */

const RESTAURANT_ID = "693d30df2da3de861d4648f9";

/* ================= COMPONENT ================= */

export default function MenuController() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);

  const [editingCategory, setEditingCategory] = useState(false);
  const [editingItem, setEditingItem] = useState(false);

  const [newCategory, setNewCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [newItem, setNewItem] = useState<MenuItem>({
    id: "",
    categoryId: "",
    name: "",
    description: "",
    price: "",
    isVeg: true,
    spiceLevel: "Medium",
    available: true,
    image: "",
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(
      data.map((c: any) => ({ ...c, id: c._id }))
    );
  };

  const fetchMenuItems = async () => {
    const data = await getAllMenuItems();
    setMenuItems(
      data.map((i: any) => ({ ...i, id: i._id }))
    );
  };

  /* ================= ANIMATION ================= */

  useEffect(() => {
    if (!menuItems.length) return;
    gsap.from(".menu-item-card", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
    });
  }, [menuItems]);

  /* ================= CATEGORY ================= */

  const saveCategory = async () => {
    if (!newCategory.name) return alert("Category name required");

    if (editingCategory) {
      const res = await updateCategory(newCategory.id, newCategory);
      setCategories((prev) =>
        prev.map((c) =>
          c.id === res.data._id ? { ...res.data, id: res.data._id } : c
        )
      );
    } else {
      const res = await addCategory({
        restaurantId: RESTAURANT_ID,
        name: newCategory.name,
        description: newCategory.description,
      });
      setCategories((prev) => [
        ...prev,
        { ...res.data, id: res.data._id },
      ]);
    }

    setShowCategoryForm(false);
    setEditingCategory(false);
    setNewCategory({ id: "", name: "", description: "" });
  };

  const deleteCat = async (id: string) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setMenuItems((prev) => prev.filter((i) => i.categoryId !== id));
  };

  /* ================= MENU ITEM ================= */

  const saveItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.categoryId)
      return alert("Fill all required fields");

    const payload = {
      restaurantId: RESTAURANT_ID,
      categoryId: newItem.categoryId,
      name: newItem.name,
      description: newItem.description,
      price: Number(newItem.price),
      isVeg: newItem.isVeg,
      spiceLevel: newItem.spiceLevel,
      available: true,
    };

    if (editingItem) {
      const res = await updateMenuItem(newItem.id, payload);
      setMenuItems((prev) =>
        prev.map((i) =>
          i.id === res.data._id ? { ...res.data, id: res.data._id } : i
        )
      );
    } else {
      const res = await addMenuItem(payload);
      setMenuItems((prev) => [
        ...prev,
        { ...res.data, id: res.data._id },
      ]);
    }

    setShowItemForm(false);
    setEditingItem(false);
    setNewItem({
      id: "",
      categoryId: "",
      name: "",
      description: "",
      price: "",
      isVeg: true,
      spiceLevel: "Medium",
      available: true,
      image: "",
    });
  };

  const deleteItem = async (id: string) => {
    await deleteMenuItem(id);
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ================= UI ================= */

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Menu Controller</h1>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowCategoryForm(true);
              setEditingCategory(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Category
          </button>
          <button
            onClick={() => {
              setShowItemForm(true);
              setEditingItem(false);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Item
          </button>
        </div>
      </div>

      {/* CATEGORY FORM */}
      {showCategoryForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <input
            placeholder="Category Name"
            className="border w-full p-2 mb-2"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <input
            placeholder="Description"
            className="border w-full p-2 mb-2"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                description: e.target.value,
              })
            }
          />
          <button
            onClick={saveCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Category
          </button>
        </div>
      )}

      {/* ITEM FORM */}
      {showItemForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <input
            placeholder="Item Name"
            className="border w-full p-2 mb-2"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="border w-full p-2 mb-2"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border w-full p-2 mb-2"
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: e.target.value })
            }
          />

          <select
            className="border w-full p-2 mb-2"
            value={newItem.categoryId}
            onChange={(e) =>
              setNewItem({ ...newItem, categoryId: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* VEG / NON VEG */}
          <div className="flex gap-4 mb-2">
            <label>
              <input
                type="radio"
                checked={newItem.isVeg}
                onChange={() =>
                  setNewItem({ ...newItem, isVeg: true })
                }
              />{" "}
              Veg 🌱
            </label>
            <label>
              <input
                type="radio"
                checked={!newItem.isVeg}
                onChange={() =>
                  setNewItem({ ...newItem, isVeg: false })
                }
              />{" "}
              Non-Veg 🍗
            </label>
          </div>

          <select
            className="border w-full p-2 mb-3"
            value={newItem.spiceLevel}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                spiceLevel: e.target.value as any,
              })
            }
          >
            <option value="Mild">Mild</option>
            <option value="Medium">Medium</option>
            <option value="Spicy">Spicy</option>
          </select>

          <button
            onClick={saveItem}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Item
          </button>
        </div>
      )}

      {/* MENU ITEMS */}
      <div className="grid md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-item-card bg-white p-4 rounded shadow"
          >
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-sm">{item.description}</p>
            <p className="mt-2">₹{item.price}</p>

            <div className="flex justify-end gap-3 mt-3">
              <Edit
                className="cursor-pointer"
                onClick={() => {
                  setNewItem(item);
                  setEditingItem(true);
                  setShowItemForm(true);
                }}
              />
              <Trash2
                className="cursor-pointer text-red-600"
                onClick={() => deleteItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
