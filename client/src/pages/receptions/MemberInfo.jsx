import React, { useState } from 'react';

function MemberInfo() {
  const [formData, setFormData] = useState({
    membershipNo: '',
    firstName: '',
    midName: '',
    lastName: '',
    corporateNo: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSearch = () => {
    // TODO: Add API logic
    console.log('Searching with', formData);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Search Member</h2>

      <div className="flex flex-wrap gap-4 items-end">
        {[
          { label: "Membership No.", name: "membershipNo" },
          { label: "First Name", name: "firstName" },
          { label: "Mid Name", name: "midName" },
          { label: "Last Name", name: "lastName" },
          { label: "Corporate No.", name: "corporateNo" }
        ].map(({ label, name }) => (
          <div key={name} className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-36 md:w-40 border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        ))}

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default MemberInfo;