import React, { useState } from "react";

const Inventory = () => {
  const [inventory, setInventory] = useState([
    { itemName: "Printer", category: "Electronics", quantity: 10, purchaseDate: "2024-08-15" },
    { itemName: "Desk Chair", category: "Furniture", quantity: 5, purchaseDate: "2024-08-16" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: "",
    category: "",
    quantity: "",
    purchaseDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSave = () => {
    if (!newItem.itemName || !newItem.category || !newItem.quantity || !newItem.purchaseDate) {
      alert("Please fill all fields");
      return;
    }
    setInventory([...inventory, { ...newItem, quantity: parseInt(newItem.quantity) }]);
    setNewItem({ itemName: "", category: "", quantity: "", purchaseDate: "" });
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">INVENTORY</h2>

      {/* Add Inventory Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Add Inventory Item
      </button>

      {/* Inventory Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{item.itemName}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.purchaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Add Inventory Item</h2>

            {/* Item Name */}
            <label className="block mb-2">
              <span className="text-red-500">*</span> Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={newItem.itemName}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            />

            {/* Category */}
            <label className="block mb-2">
              <span className="text-red-500">*</span> Category
            </label>
            <select
              name="category"
              value={newItem.category}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Stationery">Stationery</option>
            </select>

            {/* Quantity */}
            <label className="block mb-2">
              <span className="text-red-500">*</span> Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            />

            {/* Purchase Date */}
            <label className="block mb-2">
              <span className="text-red-500">*</span> Purchase Date
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={newItem.purchaseDate}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
