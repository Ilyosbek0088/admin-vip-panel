import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash, FiUpload, FiMoon, FiSun } from "react-icons/fi";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1200, image: null },
    { id: 2, name: "Smartphone", price: 800, image: null },
  ]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { id: Date.now(), ...newProduct }]);
      setNewProduct({ name: "", price: "", image: null });
    }
  };

  const handleEditProduct = () => {
    setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleFileChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (isEditing) {
        setEditingProduct({ ...editingProduct, image: imageUrl });
      } else {
        setNewProduct({ ...newProduct, image: imageUrl });
      }
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-700 text-white">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      {/* Add Product Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border rounded dark:bg-gray-700"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <FiUpload className="text-blue-500" />
            <span>Upload Image</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          {newProduct.image && <img src={newProduct.image} alt="Preview" className="w-20 h-20 rounded-lg" />}
          <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2 rounded flex items-center">
            <FiPlus className="mr-2" /> Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center bg-white dark:bg-gray-800">
                <td className="border p-2">
                  {product.image ? <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg" /> : "-"}
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-500 text-white p-2 rounded flex items-center"
                  >
                    <FiEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white p-2 rounded flex items-center"
                  >
                    <FiTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="p-2 border rounded dark:bg-gray-700"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="p-2 border rounded dark:bg-gray-700"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <FiUpload className="text-blue-500" />
                <span>Upload Image</span>
                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, true)} />
              </label>
              {editingProduct.image && <img src={editingProduct.image} alt="Preview" className="w-20 h-20 rounded-lg" />}
              <button onClick={handleEditProduct} className="bg-green-500 text-white p-2 rounded w-full">
                Save Changes
              </button>
              <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white p-2 rounded w-full">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
