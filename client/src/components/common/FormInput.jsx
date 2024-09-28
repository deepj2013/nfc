import { twMerge } from "tailwind-merge";

const FormInput = ({
    width,
    showButton,
    placeholder,
    name,
    onChange,
    value,
    type,
    errors,
  }) => {
    return (
      <div class={twMerge("mb-5 relative", width)}>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
          {placeholder}
        </label>
        <input
          onChange={onChange}
          value={value}
          name={name}
          type={type ? type : "text"}
          id="email"
          class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
          // chooseDate={date}
        />
        <span style={{ color: "red" }}>{errors}</span>
        {showButton && (
          <button className="text-sm bg-theme text-white absolute top-[34px] p-1.5 right-2 rounded-lg ">
            Genrate Code
          </button>
        )}
      </div>
    );
  };

  export default FormInput