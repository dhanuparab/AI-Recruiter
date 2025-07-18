'use client';

import { useState } from 'react';
import { Pencil, Trash2, Users, Phone, Activity, ShieldCheck, CreditCard, Database, Cloud } from 'lucide-react';

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { name: 'Greathire.team2', email: 'greathireteam2@gmail.com', role: 'Admin', status: 'Active', interviews: 45 },
    { name: 'Dhanshree Parab', email: 'dhanuparab6@gmail.com', role: 'Recruiter', status: 'Active', interviews: 12 },
    // { name: 'Mike Manager', email: 'mike@company.com', role: 'recruiter', status: 'inactive', interviews: 23 },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'recruiter',
    status: 'active',
    interviews: 0,
  });

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: '', email: '', role: 'Recruiter', status: 'Active', interviews: 0 });
  };

  const handleDelete = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        {/* 👩‍💼 */}
        <h1 className="text-2xl font-bold"> Admin Panel</h1>
        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">System Online</span>
      </div>

      {/* Top Summary Stats */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <Users className="mx-auto text-blue-500" />
          <div>Total Users</div>
          <strong>156</strong>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <Phone className="mx-auto text-green-500" />
          <div>Active Now</div>
          <strong>12</strong>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <Activity className="mx-auto text-purple-500" />
          <div>Today</div>
          <strong>34</strong>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <ShieldCheck className="mx-auto text-yellow-500" />
          <div>Uptime</div>
          <strong>99.9%</strong>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <CreditCard className="mx-auto text-fuchsia-600" />
          <div>Payment</div>
          <strong className="text-purple-600">Active</strong>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <Database className="mx-auto text-orange-500" />
          <div>Storage</div>
          <strong>2.1 GB</strong>
        </div>
      </div>

      {/* Tabs (Mock only) */}
      {/* <div className="flex space-x-6 border-b pb-2 text-sm text-gray-600">
        <button className="border-b-2 border-blue-500 text-blue-600 font-medium">User Management</button>
        <button className="hover:text-blue-500">Interview Settings</button>
        <button className="hover:text-blue-500">Calling System</button>
        <button className="hover:text-blue-500">Question Templates</button>
        <button className="hover:text-blue-500">System Settings</button>
      </div> */}

      {/* User Management Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add User
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            className="border p-2 rounded w-40"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            className="border p-2 rounded w-60"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* User Table */}
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Interviews</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span className="bg-gray-200 text-xs px-2 py-1 rounded">{user.role}</span>
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      user.status === 'active'
                        ? 'bg-black text-white'
                        : 'bg-gray-300 text-black'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3">{user.interviews}</td>
                <td className="p-3 space-x-2">
                  {/* <button className="p-1 hover:text-blue-600">
                    <Pencil size={16} />
                  </button> */}
                  <button
                    className="p-1 hover:text-red-600"
                    onClick={() => handleDelete(i)}
                  >
                    <Trash2 size={16} />
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

export default AdminPanel;
