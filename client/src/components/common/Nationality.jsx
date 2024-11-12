// NationalityDropdown.js
import Select from 'react-select'; // Ensure this import is correct

const NationalityDropdown = ({ errors, placeholder, width, onChange, data = [] }) => {
  return (
    <div className={`${width}`}>
      <Select
        options={data}
        placeholder={placeholder}
        onChange={onChange}
        isClearable
        isSearchable
        className="basic-single"
        classNamePrefix="select"
      />
      {errors && <span className="text-red-500 text-sm">{errors}</span>}
    </div>
  );
};

export default NationalityDropdown;
