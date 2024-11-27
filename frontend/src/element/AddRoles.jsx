import React, { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";

import axios from "axios";
const AddRoles = ({ onClose }) => {
  const [rolesData, setRolesData] = useState({});
  const [newRole, setNewRole] = useState("");
  const [newPermissions, setNewPermissions] = useState([]);
  const [permissionInput, setPermissionInput] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/roles")
      .then((res) => setRolesData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddPermission = () => {
    if (!permissionInput.trim()) {
      alert("Permission cannot be empty!");
      return;
    }
    if (newPermissions.includes(permissionInput.trim())) {
      alert("Duplicate permission is not allowed!");
      return;
    }
    setNewPermissions([...newPermissions, permissionInput.trim()]);
    setPermissionInput("");
  };

  const handleSaveRole = () => {
    if (!newRole.trim()) {
      alert("Role name cannot be empty!");
      return;
    }
    if (rolesData[newRole]) {
      alert("Role already exists!");
      return;
    }
    if (newPermissions.length === 0) {
      alert("Please add at least one permission!");
      return;
    }

    const updatedRolesData = { ...rolesData, [newRole]: newPermissions };

    setRolesData(updatedRolesData);
    setNewRole("");
    setNewPermissions([]);

    axios
      .put("http://localhost:8000/roles", updatedRolesData)
      .then(() => console.log("Role added successfully"))
      .catch((err) => console.error("Failed to add role:", err));
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
      <div className="mt-10 flex flex-col gap-5 text-black">
        <button onClick={onClose} className="place-self-end">
          <X />
        </button>
        <div className=" bg-indigo-600 rounded-xl">
          <div className="manage-roles-container">
            <div className="add-role-form text-white font-bold">
              <h1>Add New Role</h1>
              <input
                type="text"
                placeholder="Role Name"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="input-field mb-4 text-black"
              />
              <div className="permissions-section">
                <input
                  type="text"
                  placeholder="Add Permission"
                  value={permissionInput}
                  onChange={(e) => setPermissionInput(e.target.value)}
                  className="input-field mb-4 text-black"
                />
                <button
                  onClick={handleAddPermission}
                  className="add-permission-btn"
                >
                  + Add Permission
                </button>
                <ul>
                  {newPermissions.map((perm, index) => (
                    <li key={index} className="permission-item">
                      {perm}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={handleSaveRole} className="save-role-btn">
                Save Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoles;
