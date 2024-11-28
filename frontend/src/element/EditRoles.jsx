import React, { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import "./styles.css";
import axios from "axios";

const EditRoles = ({ onClose }) => {
  const [rolesData, setRolesData] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [updatedPermissions, setUpdatedPermissions] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8000/roles/")
      .then((res) => setRolesData(res.data))
      .catch((err) => {
        console.error("Failed to fetch roles data:", err);
      });
  }, []);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleEdit = (role) => {
    setEditMode(role);

    const permissions = Array.isArray(rolesData[role]) ? rolesData[role] : [];
    setUpdatedPermissions([...permissions]);
  };

  const handlePermissionChange = (e, index) => {
    const newPermissions = [...updatedPermissions];
    newPermissions[index] = e.target.value;
    setUpdatedPermissions(newPermissions);
  };

  const handleAddPermission = () => {
    if (updatedPermissions.some((perm) => perm.trim() === "")) {
      alert("Permission cannot be empty!");
      return;
    }

    setUpdatedPermissions([...updatedPermissions, ""]);
  };

  const handleSave = (role) => {
    const updatedRolesData = { ...rolesData, [role]: updatedPermissions };

    setRolesData(updatedRolesData);
    setEditMode(null);

    axios
      .put("http://localhost:8000/roles/", updatedRolesData)
      .then(() => console.log("Permissions updated successfully"))
      .catch((err) => console.error("Failed to update permissions:", err));
  };

  const handleCancel = () => {
    setEditMode(null);
    setUpdatedPermissions([]);
  };

  const handleDelete = (role) => {
    const updatedRolesData = { ...rolesData };
    delete updatedRolesData[role];

    setRolesData(updatedRolesData);

    axios
      .put("http://localhost:8000/roles/", updatedRolesData)
      .then(() => console.log(`Role '${role}' deleted successfully`))
      .catch((err) => console.error(`Failed to delete role '${role}':`, err));
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-5 text-white bg-indigo-600 p-5 rounded-md shadow-lg">
        <button onClick={onClose} className="place-self-end text-white">
          <X />
        </button>
        <div className="">
          <table className="text-black">
            <thead>
              <tr>
                <th>Roles</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rolesData).map(([role, permissions]) => (
                <tr key={role}>
                  <td>{role}</td>
                  <td>
                    {editMode === role ? (
                      <div>
                        {updatedPermissions.map((perm, index) => (
                          <input
                            key={index}
                            type="text"
                            value={perm}
                            onChange={(e) => handlePermissionChange(e, index)}
                            className="text-black mb-2"
                          />
                        ))}
                        <button
                          onClick={handleAddPermission}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          + Add Permission
                        </button>
                      </div>
                    ) : permissions && Array.isArray(permissions) ? (
                      permissions.join(", ")
                    ) : (
                      "No permissions"
                    )}
                  </td>
                  <td>
                    {editMode === role ? (
                      <div>
                        <button
                          onClick={() => handleSave(role)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(role)}
                          className="bg-indigo-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(role)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditRoles;
