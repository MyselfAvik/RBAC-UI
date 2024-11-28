import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await axios.get("http://localhost:8000/roles/");
        setRoles(rolesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/")
      .then((res) => setData(res.data))
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const handleSave = (userId) => {
    const user = data.find((u) => u.id === userId);
    if (!user) return;

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name cannot be empty.";
    if (!formData.email.trim()) {
      newErrors.email = "Email cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.role.trim()) newErrors.role = "Role must be selected.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const updatedData = { ...formData, status: user.status };

    axios
      .put(`http://localhost:8000/users/${userId}/`, updatedData)
      .then(() => {
        setData((prevData) =>
          prevData.map((u) => (u.id === userId ? { ...u, ...updatedData } : u))
        );
        setEditUserId(null);
      })
      .catch((err) => console.error(err));
  };

  const handleStatusChange = (userId) => {
    const user = data.find((u) => u.id === userId);
    if (!user) return;

    const updatedStatus = user.status === "Active" ? "Inactive" : "Active";

    setData((prevData) =>
      prevData.map((u) =>
        u.id === userId ? { ...u, status: updatedStatus } : u
      )
    );

    axios
      .patch(`http://localhost:8000/users/${userId}/`, {
        status: updatedStatus,
      })
      .then(() => console.log(`Status updated for user ID ${userId}`))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/users/${id}/`)
      .then(() =>
        setData((prevData) => prevData.filter((user) => user.id !== id))
      )
      .catch((er) => console.log(er));
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className=" mx-16 ">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input block w-full"
        />
      </div>
      <div className="table-container">
        <table>
          <thead className="">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                {editUserId === user.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <p className="error">{errors.name}</p>}
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </td>
                    <td>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="">Select an Option</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                      {errors.role && <p className="error">{errors.role}</p>}
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </>
                )}
                <td>[{roles[user.role]?.join(", ") || "No Permissions"}]</td>
                <td>
                  <div className="flex justify-between">
                    {user.status}
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.status === "Active"}
                        onChange={() => handleStatusChange(user.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </td>
                <td className="flex justify-around">
                  {editUserId === user.id ? (
                    <>
                      <button
                        onClick={() => handleSave(user.id)}
                        className="bg-green-500 p-2 rounded-xl text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUserId(null)}
                        className="bg-gray-500 p-2 rounded-xl text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-indigo-500 p-2 rounded-xl text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 p-2 rounded-xl text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
