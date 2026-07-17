import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AddTransactionModal.css";
import toast from "react-hot-toast";

function AddTransactionModal({
  isOpen,
  onClose,
  onTransactionAdded,
  transaction = null,
}) {

  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "Expense",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title || "",
        amount: transaction.amount || "",
        category: transaction.category || "",
        type: transaction.type || "Expense",
        date: transaction.date || "",
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "Expense",
        date: "",
      });
    }
  }, [transaction, isOpen]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      if (transaction) {

        await api.put(
          `/transactions/${transaction.id}`,
          formData
        );

        toast.success("Transaction Updated Successfully");

      } else {

        await api.post(
          `/transactions/${userId}`,
          formData
        );

        toast.success("Transaction Added Successfully");

      }

      onTransactionAdded();
      onClose();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="transaction-modal">

        <div className="modal-header">
          <h2>
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="save-btn"
          >
            {transaction ? "Update Transaction" : "Add Transaction"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddTransactionModal;