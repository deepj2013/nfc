import { useEffect, useState } from "react";
import { getStorageValue } from "../../services/LocalStorageServices";
import POSInchargeDashboard from "./DashboardComponent/PosInchargeDashboard";
import UniversalAdminDashboard from "./DashboardComponent/UniversalAdminDashboard";
import OrganisationAdminDashboard from "./DashboardComponent/OrganisationAdminDashboard";
import AdministrativeDashboard from "./DashboardComponent/AdministrativeDashboard";
import ReceptionistDashboard from "./DashboardComponent/ReceptionistDashboard";
import CaptainDashboard from "./DashboardComponent/CaptainDashboard";
import SportsActivityInchargeDashboard from "./DashboardComponent/SportsActivityInchargeDashboard";
import EventManagerDashboard from "./DashboardComponent/EventManagerDashboard";
import BookingManagerDashboard from "./DashboardComponent/BookingManagerDashboard";
import KitchenDashboard from "./DashboardComponent/KitchenDashboard";
import BowlingInchargeDashboard from "./DashboardComponent/BowlingInchargeDashboard";

function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    let getUserDetail = getStorageValue("userDetails");

    if (getUserDetail) {
      setUserDetails(getUserDetail);
      setRoleId(getUserDetail.role_id); // Directly setting roleId from local storage
    }
  }, []); // R
  const renderDashboard = () => {
    switch (roleId) {
      case 1:
        return <UniversalAdminDashboard />;
      case 2:
        return <OrganisationAdminDashboard />;
      case 3:
        return <AdministrativeDashboard />;
      case 5:
        return <ReceptionistDashboard />;
      case 7:
        return <CaptainDashboard />;
      case 8:
        return <POSInchargeDashboard />;
      case 10:
        return <SportsActivityInchargeDashboard />;
      case 11:
        return <EventManagerDashboard />;
      case 12:
        return <BookingManagerDashboard />;
      case 13:
        return <KitchenDashboard />;
      case 14:
        return <BowlingInchargeDashboard />;
      default:
        return <p className="text-gray-500">No Dashboard Available</p>;
    }
  };

  return (
    <div className="h-screen overflow-scroll">
      <div className="bg-white mb-6 p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:h-40">
     
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src="https://preclinic.dreamstechnologies.com/html/template/assets/img/morning-img-01.png"
            alt="Welcome"
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full"
          />
          <div className="text-center sm:text-left">
            <p className="text-black font-semibold text-xl sm:text-2xl">
              Good Morning,{" "}
              <span className="text-theme">
                {userDetails?.userName || "Guest"}
              </span>
            </p>
            <h5 className="text-sm sm:text-base font-medium text-grayText mt-2">
              Have a nice day at work
            </h5>
          </div>
        </div>
      </div>
      
      {renderDashboard()}
    </div>
  );
}

export default Dashboard;
