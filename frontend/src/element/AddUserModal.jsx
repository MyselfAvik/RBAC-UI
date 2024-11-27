import React, { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddUserModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => setData(res.data))
      .catch((er) => {
        console.log(er);
      });

    axios
      .get("http://localhost:8000/roles")
      .then((res) => setRoles(res.data))
      .catch((er) => {
        console.log("Failed to fetch roles data", er);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name || !status || !role) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    const id = data.length + 1;
    axios
      .post("http://localhost:8000/users", {
        id: id,
        name: name,
        email: email,
        role: role,
        status: status,
      })
      .then((res) => {
        location.reload();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-indigo-500 text-white rounded-xl px-10 py-8 flex flex-col gap-5 items-center w-full max-w-lg mx-4">
        <button onClick={onClose} className="self-end text-white">
          <X size={24} />
        </button>
        <h1 className="text-2xl font-semibold mb-4">Add User</h1>
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-600 text-sm text-center mb-4">{error}</div>
          )}
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Id"
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="role" className="text-sm">
            Role
          </label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
            className="p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Role</option>
            {Object.keys(roles).map((roleName) => (
              <option key={roleName} value={roleName}>
                {roleName}
              </option>
            ))}
          </select>
          <label htmlFor="status" className="text-sm">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
