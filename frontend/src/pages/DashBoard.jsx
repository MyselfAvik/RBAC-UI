import React, { useState } from "react";
import FetchTable from "../element/FetchTable";
import Drawer from "../element/Drawer.jsx";
import AddUserModal from "../element/AddUserModal.jsx";
import EditRoles from "../element/EditRoles.jsx";
import AddRoles from "../element/AddRoles.jsx";
import Login from "./Login.jsx";
const DashBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [AddRoleModal, setAddRoleModal] = useState(false);
  console.log(Login.email);
  return (
    <>
      <div className="h-screen flex">
        <Drawer email={Login.email} />
        <div className="h-full w-full">
          <div className="bg-[#E9ECEF] flex justify-end gap-8 p-4">
            <div className="">
              <button
                onClick={() => {
                  setEditModal(true);
                }}
                className=" bg-blue-500 text-white rounded-xl px-8 py-3 font-semibold hover:bg-blue-600 transition"
              >
                Edit Roles
              </button>
              {showEditModal && (
                <EditRoles onClose={() => setEditModal(false)} />
              )}
            </div>
            <div className="">
              <button
                onClick={() => {
                  setAddRoleModal(true);
                }}
                className=" bg-green-500 text-white rounded-xl px-8 py-3 font-semibold hover:bg-green-600 transition"
              >
                Add Roles
              </button>
              {AddRoleModal && (
                <AddRoles onClose={() => setAddRoleModal(false)} />
              )}
            </div>
          </div>
          <div className=" w-full h-[88%]">
            <div className="h-[90%] bg-white shadow-lg rounded-lg overflow-y-auto p-4">
              <div className=" ">
                {/* <LiveSearch/> */}
                <FetchTable />
              </div>
            </div>
            <div className="w-full flex flex-row-reverse h-12">
              <button
                onClick={() => setShowModal(true)}
                className=" bg-blue-500 rounded-xl h-full px-8 my-2 text-white font-semibold"
              >
                Add User
              </button>
              {showModal && (
                <AddUserModal onClose={() => setShowModal(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoard;
