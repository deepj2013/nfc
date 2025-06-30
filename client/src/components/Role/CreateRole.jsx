import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { getStorageValue } from "../../services/LocalStorageServices";
import { roleCreationServices } from "../../redux/thunk/micellaneousServices";
import { successToast, errorToast } from "../../utils/Helper";
import axios from "axios";
import { employeeListServices } from "../../redux/thunk/useMangementServices";

const LEVEL_OPTIONS = ["Organisation", "Department"];

const CreateRole = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userDetails = getStorageValue("userDetails");

  const [formData, setFormData] = useState({
    role_name: "",
    role_description: "",
    is_active: true,
    level: "",
    supervisor: "",
    created_by:"",
    update_by:""
  });

  const [supervisorList, setSupervisorList] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch supervisors once
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const res = await dispatch(employeeListServices()).unwrap();
        setSupervisorList(res.result || []);
      } catch (err) {
        console.error("Error fetching supervisors", err);
      }
    };
    fetchSupervisors();
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role_name.trim())
      newErrors.role_name = "Role name is required.";
    if (!formData.role_description.trim())
      newErrors.role_description = "Description is required.";
    if (!formData.level) newErrors.level = "Level is required.";
    if (!formData.supervisor) newErrors.supervisor = "Select a supervisor.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, is_active: !prev.is_active }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      created_by: userDetails?.user_id,
      updated_by: userDetails?.user_id,
    };

    try {
      await dispatch(roleCreationServices(payload)).unwrap();
      successToast("Role created successfully.");
      onClose();
    } catch (err) {
      console.error("Role creation error:", err);
      errorToast("Something went wrong while creating the role.");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[999] ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white w-[95vw] max-w-md p-6 rounded-lg shadow-lg z-10 max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          <FaXmark size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Create Role</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Role Name"
            name="role_name"
            value={formData.role_name}
            onChange={handleChange}
            error={errors.role_name}
          />
          <FormInput
            label="Role Description"
            name="role_description"
            value={formData.role_description}
            onChange={handleChange}
            error={errors.role_description}
          />

          <div>
            <label className="block mb-1 font-medium">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Level</option>
              {LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Supervisor</label>
            <select
              name="supervisor"
              value={formData.supervisor}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Supervisor</option>
              {/* Universal Admin (manually added) */}
              <option value="1">Universal Admin (admin@nfc.in)</option>

              {/* Supervisor list from API */}
              {supervisorList.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.user_name || user.userName || user.email}
                </option>
              ))}
            </select>
            {errors.supervisor && (
              <p className="text-red-500 text-sm">{errors.supervisor}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label className="font-medium">Is Active</label>
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={handleToggle}
              className="h-5 w-5"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRole;

const FormInput = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
