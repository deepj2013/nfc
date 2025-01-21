import React, { useState } from "react";

function ClubManagement() {
  const [view, setView] = useState("current"); // Views: 'current', 'history', 'createRole'
  const [showAssignSection, setShowAssignSection] = useState(false); // Toggle for the Assign Role section
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [assignedRole, setAssignedRole] = useState("");
  const [assignedMember, setAssignedMember] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const roles = ["President", "Vice President", "Secretary", "Treasurer"];
  const members = [
    {
      id: 1,
      name: "John Doe",
      role: "President",
      contact: "123-456-7890",
      period: "2024-2025",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqPFy6o8g6IL8S33NQimn5uQRY-BdbjLNt2g&s",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Secretary",
      contact: "987-654-3210",
      period: "2024-2025",
      image:
        "https://img.freepik.com/premium-vector/avatar-business-women-vector-illustration-flat-2_764382-57434.jpg?semt=ais_hybrid",
    },
  ];
  const history = [
    {
      id: 3,
      name: "Mike Johnson",
      role: "President",
      contact: "555-555-5555",
      period: "2023-2024",
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/79/25/businessman-avatar-character-icon-vector-14197925.jpg",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Secretary",
      contact: "444-444-4444",
      period: "2023-2024",
      image:
        "https://cdn4.vectorstock.com/i/1000x1000/49/33/businessman-avatar-character-icon-vector-14344933.jpg",
    },
  ];

  const handleCreateRole = () => {
    alert(`Role Created: ${roleName}`);
    setRoleName("");
    setRoleDescription("");
  };

  const handleAssignRole = () => {
    alert(
      `Assigned ${assignedMember} to ${assignedRole} from ${startDate} to ${endDate}`
    );
    setAssignedRole("");
    setAssignedMember("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="h-screen overflow-scroll">
      {/* Header */}
      <div className="flex justify-between bg-white items-center h-28 px-8 py-4 rounded-lg shadow-lg mb-8">
        <div>
          <h1 className="text-2xl font-bold text-theme">
            {view === "createRole"
              ? "Create Role"
              : view === "history"
              ? "History"
              : "Club Management"}
          </h1>
          <p className="text-gray-600 mt-1">
            {view === "createRole"
              ? "Define roles, assign responsibilities, and manage assignments."
              : view === "history"
              ? "View the history of members and their roles."
              : "Manage your club's roles and members effortlessly."}
          </p>
        </div>
        <div>
          <img
            src="https://preclinic.dreamstechnologies.com/html/template/assets/img/morning-img-01.png"
            alt="Header Illustration"
            className="w-28"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      {view !== "createRole" && (
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setView("current")}
            className={`${
              view === "current"
                ? "bg-theme text-white"
                : "bg-gray-200 text-gray-700"
            } px-6 py-3 rounded-lg font-semibold shadow`}
          >
            Show Current Members
          </button>
          <button
            onClick={() => setView("history")}
            className={`${
              view === "history"
                ? "bg-theme text-white"
                : "bg-gray-200 text-gray-700"
            } px-6 py-3 rounded-lg font-semibold shadow`}
          >
            Show History
          </button>
          <button
            onClick={() => setView("createRole")}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow"
          >
            Create Roles
          </button>
        </div>
      )}

      {/* Main Content */}
      {view === "createRole" ? (
        <div className="grid grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Create a New Role</h3>
              <button
                onClick={() => setView("current")}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium shadow"
              >
                Back
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Role Name
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Authorities and Responsibilities
              </label>
              <textarea
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Describe the role's authorities and responsibilities"
                className="w-full px-4 py-2 border rounded-lg h-32"
              ></textarea>
            </div>
            <button
              onClick={handleCreateRole}
              className="bg-theme text-white px-6 py-3 rounded-lg font-semibold shadow"
            >
              Create Role
            </button>
          </div>

          {/* Role List Section */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Available Roles</h3>
            <ul className="list-disc pl-6">
              {roles.map((role, index) => (
                <li key={index} className="text-gray-700 mb-2">
                  {role}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAssignSection(!showAssignSection)}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow mt-4"
            >
              {showAssignSection ? "Hide Assign Role" : "Assign Role"}
            </button>
          </div>

          {/* Assign Role Section */}
          {showAssignSection && (
            <div className="col-span-3 bg-white p-6 rounded-2xl shadow mt-6">
              <h3 className="text-xl font-semibold mb-4">Assign Role</h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Select Role
                </label>
                <select
                  value={assignedRole}
                  onChange={(e) => setAssignedRole(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Role</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Select Member
                </label>
                <select
                  value={assignedMember}
                  onChange={(e) => setAssignedMember(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={handleAssignRole}
                className="bg-theme text-white px-6 py-3 rounded-lg font-semibold shadow"
              >
                Assign Role
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow">
          {/* Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-700">
                <th className="py-3">Member ID</th>
                <th className="py-3">Name</th>
                <th className="py-3">Image</th>
                <th className="py-3">Role</th>
                <th className="py-3">Contact</th>
                <th className="py-3">Period</th>
              </tr>
            </thead>
            <tbody>
              {(view === "current" ? members : history).map((member) => (
                <tr key={member.id} className="border-b text-gray-600">
                  <td className="py-3">{member.id}</td>
                  <td className="py-3">{member.name}</td>
                  <td className="py-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-full w-12 h-12"
                    />
                  </td>
                  <td className="py-3">{member.role}</td>
                  <td className="py-3">{member.contact}</td>
                  <td className="py-3">{member.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClubManagement;