import React, { useEffect, useState } from "react";
import Table from "../../../components/common/Table";
import CreateOrganization from "../../../components/Modal/CreateOrganization";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { organisationListservices } from "../../../redux/thunk/organizationMangementservices";
import { FaEdit } from "react-icons/fa";
import logo from "../../../assets/image/logo5.jpg";

function Organization() {
  const [isOpen, setisOpen] = useState(false);
  const { organisation } = useSelector(
    (state) => state.organisationMangementState
  );
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(organisationListservices());
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-semibold h28">Organization Management</p>
      </div>
      <div className="mt-10">
        <div className="flex flex-col">
          <div className=" overflow-x-auto pb-4">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden  shadow bg-white rounded-lg border-gray-300">
                <table className="table-auto min-w-full rounded-xl">
                  <thead>
                    <tr className="bg-gray-50">
                      {/* <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Organization{" "}
                      </th> */}
                      <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Organization Name{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Organization LOGO{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                      >
                        {" "}
                        Adress & website{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Contact Number{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Facilities{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        GST / TAN{" "}
                      </th>
                    
                      {/* <th
                        scope="col"
                        className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 ">
                    {organisation?.map((ele, ind) => {
                      return (
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                            {ele?.fullName}
                          </td>
                          {/* <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                            {ele?.name}
                          </td> */}
                          <td className=" px-5 py-3">
                            <div className="w-48 flex items-center gap-3">
                              <img
                                src={logo}
                                alt="Floyd image"
                                height={90}
                                width={90}
                              />
                            </div>
                          </td>
                          <td className=" px-5 py-3">
                            <div className="w-48 flex items-center gap-3">
                              <div className="data">
                                <p className="font-normal text-sm text-gray-900">
                                  {ele?.address}
                                </p>
                                <p className="font-normal text-xs leading-5 text-gray-400">
                                  {" "}
                                  {ele?.website}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {" "}
                            {ele?.phone}
                          </td>

                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            <div className="w-48 flex flex-wrap items-center gap-3">
                              {ele?.facilities?.map((facility, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-sm font-normal"
                                >
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            <div className="w-48 flex items-center gap-3">
                              <div className="data">
                                <p className="font-normal text-sm text-gray-900">
                                  {ele?.gst}
                                </p>
                                <p className="font-normal text-xs leading-5 text-gray-400">
                                  {" "}
                                  {ele?.tan}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* <td className="px-5">
                            <button
                              className="text-theme"
                              onClick={() => {
                                setSelectedOrganisation(ele);
                                setisOpen(true);
                              }}
                            >
                              <FaEdit />
                            </button>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* <Table data={organisation??[]} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateOrganization
        selectedOrganisation={selectedOrganisation}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
      />
    </div>
  );
}

export default Organization;
