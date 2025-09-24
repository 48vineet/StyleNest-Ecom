import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  updateUser,
  fetchAllUsers,
} from "../../redux/slices/adminSlices";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { users, loading, error } = useSelector((state) => state.admin);

  // Add this useEffect to fetch users
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllUsers()); // ADD THIS LINE
    }
  }, [user, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //? Default Role
  });

  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));

    //! Resets form after subbmision
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
    window.location.reload();
  };

  const handelRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handelDeleteUser = (userId) => {
    if (window.confirm("Are you sre you want to delete this user ?")) {
      dispatch(deleteUser(userId));
    }
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {loading && <p> Loading...</p>}
      {error && <p> Error : {error}</p>}
      {/* User Form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handelSubmit}>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handelChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handelChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handelChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handelChange}
              className="w-full p-4 border rounded-lg"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>
      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, id) => (
              <tr key={id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handelRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                    onClick={() => handelDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
