import { twMerge } from "tailwind-merge";

const FormSelect = ({
    width,
    placeholder,
    name,
    onChange,
    value,
    options,
    errors,
  }) => {
    return (
      <div class={twMerge("mb-5 relative", width)}>
        <label
          htmlFor={name}
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          {placeholder}
        </label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          id={name}
          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span style={{ color: "red" }}>{errors}</span>
      </div>
    );
  };
  export default FormSelect