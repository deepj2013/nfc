import React, { useEffect } from "react";
import Chart from "../../components/common/Chart";
import CircleChart from "../../components/common/CircleChart";
import DeatilCard from "../../components/dashboard/DeatilCard";
import Table from "../../components/common/Table";
import { getStorageValue } from "../../services/LocalStorageServices";
import { useMicellaneousServices } from "../../services/useMicellaneousServices";


function Dashboard() {
  let userDetails = getStorageValue('userDetails')

  

  return (
    <div className="h-screen overflow-scroll ">
      <div className="flex justify-between bg-white mb-6 items-center relative h-40 p-4 rounded-2xl shadow">
        <div>
          <p className="text-black font-semibold h28">
            Good Morning, <span className="text-theme">{userDetails?.userName}</span>
          </p>
          <h5 className=" text-base  font-medium  text-grayText  mt-2">
            Have a nice day at work
          </h5>
        </div>

        <div className="absolute right-0 bottom-0">
          <img
            src={
              "https://preclinic.dreamstechnologies.com/html/template/assets/img/morning-img-01.png"
            }
          />
        </div>
      </div>

      <div className="flex justify-between">
        <DeatilCard
          tittle={"Appointments"}
          icon={
            "https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/calendar.svg"
          }
        />
        <DeatilCard />
        <DeatilCard />
        <DeatilCard />
      </div>

      <div className="flex  mt-10">
        <div className="bg-white w-[100%]  p-6">
          <Chart />
        </div>
      </div>

      <div></div>

      <div>
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;
