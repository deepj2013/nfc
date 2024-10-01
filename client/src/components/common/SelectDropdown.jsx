import React from "react";

function SelectDropdown({
  data,
  handleSelectChange,
  selected,
  label,
  placeHolder,
  errors,
}) {
  console.log(data);
  return (
    <div>
      <div className="bg-white flex-col mt-4 mb-5">
        <label className="mb-5" htmlFor="employee-select">
          {label}{" "}
        </label>
        <select
          id="employee-select"
          onChange={handleSelectChange}
          className="w-full p-2 mt-2 border rounded-lg bg-gray-100"
          value={selected}
        >
          <option value=" ">{placeHolder}</option>
          {data &&
            data.map((item) => (
              <option key={item?.value} value={item?.value}>
                {item?.label}
              </option>
            ))}
        </select>
        <p className="text-red-600 mt-3">{errors}</p>
      </div>
    </div>
  );
}

export default SelectDropdown;
