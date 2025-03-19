import  { useEffect, useState } from "react";
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
// import CircleChart from "../../components/common/CircleChart";
// import DetailCard from "../../components/dashboard/DetailCard";
// import Table from "../../components/common/Table";

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
      <div className="flex justify-between bg-white mb-6 items-center relative h-40 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4">
          <img src={
              "https://preclinic.dreamstechnologies.com/html/template/assets/img/morning-img-01.png"
            } alt="Welcome" className="h-24 w-24 rounded-full" />
          <div>
            <p className="text-black font-semibold text-2xl">
              Good Morning, <span className="text-theme">{userDetails?.userName}</span>
            </p>
            <h5 className="text-base font-medium text-grayText mt-2">
              Have a nice day at work
            </h5>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <DetailCard />
        <Chart />
        <CircleChart />
        <Table />
      </div> */}
      {renderDashboard()}
    </div>
  );
}

export default Dashboard;
