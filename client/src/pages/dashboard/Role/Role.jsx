import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import CreateRole from "../../../components/Role/CreateRole";
import { getAllRoleServices } from "../../../redux/thunk/micellaneousServices";
import { useDispatch } from "react-redux";

function Role() {
  console.log("jaiho");
  const dispatch = useDispatch();

  const getRoleHandler = async () => {
    try {
      console.log("response9098765f");
      let response = await dispatch(getAllRoleServices()).unwrap();
      successToast("Add Sucessfully");
      // navigate("/members");
    } catch (error) {
      console.log(error);
      //   logger(error);
    }
  };

  useEffect(() => {
    getRoleHandler();
  }, []);

  const roleData = [
    {
      id: 1,
      name: "Admin",
      roleDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore placeat facilis maxime vel tempore alias quidem eius voluptate perspiciatis quaerat earum nostrum possimus doloribus distinctio repudiandae, eum quasi nihil delectus.",
    },
    {
      id: 2,
      name: "Manager",
      roleDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore placeat facilis maxime vel tempore alias quidem eius voluptate perspiciatis quaerat earum nostrum possimus doloribus distinctio repudiandae, eum quasi nihil delectus.",
    },
    {
      id: 3,
      name: "Employee",
      roleDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore placeat facilis maxime vel tempore alias quidem eius voluptate perspiciatis quaerat earum nostrum possimus doloribus distinctio repudiandae, eum quasi nihil delectus.",
    },
    {
      id: 3,
      name: "Gatekeeper",
      roleDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore placeat facilis maxime vel tempore alias quidem eius voluptate perspiciatis quaerat earum nostrum possimus doloribus distinctio repudiandae, eum quasi nihil delectus.",
    },
  ];

  const [isOpen, setisOpen] = useState(false);

  return (
    <div>
      <div className=" flex items-center justify-between">
        <p className="font-semibold h28">Role Management</p>
        <button
          onClick={() => setisOpen(true)}
          className="bg-theme text-white p-3 px-6 rounded-md
                            flex flex-row  items-center justify-center   py-3   lg:text-base font-medium leading-6 capitalize duration-100 transform  shadow cursor-pointer focus:ring-4 focus:ring-theme focus:ring-opacity-50 focus:outline-none sm:mb-0  lg:px-8   hover:shadow-lg hover:-translate-y-4>

                "
        >
          Add Role
        </button>
      </div>

      <div className="mt-10 flex gap-6 flex-wrap">
        {roleData.map((role) => (
          <div key={role.id} className="border py-3 px-4 bg-theme/10 w-[23%]">
            <div className="flex items-center justify-between">
              <p className="h28 font-semibold text-theme">{role.name}</p>

              <div className="flex gap-2">
                <label class="relative inline-block mr-8">
                  <input type="checkbox" class="peer invisible" />
                  <span class="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                  <span class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4"></span>
                </label>
                <FaRegEdit className="text-xl text-theme" />
                <MdDelete className="text-xl text-red-600" />
              </div>
            </div>
            <textarea
              rows={6}
              className="w-full my-2 bg-transparent text-sm"
              value={role?.roleDescription}
            />
            <p className="text-gray-600 font-medium text-xs">July 21st 2024</p>
          </div>
        ))}
      </div>

      <CreateRole
        isOpen={isOpen}
        onClose={() => {
          setisOpen(false);
        }}
      />
    </div>
  );
}

export default Role;
