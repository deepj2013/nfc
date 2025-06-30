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
import { MemberDashboard } from "./DashboardComponent/MemberDashboard";

function Dashboard() {
  useEffect(() => {
    let user =
      getStorageValue("userDetails") || getStorageValue("memberDetails");
    if (user) {
      setUserDetails(user);
      setRoleId(user.role_id || 0);
    }
  }, []);
  const [userDetails, setUserDetails] = useState(null);
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    let getUserDetail = getStorageValue("userDetails");

    if (getUserDetail) {
      setUserDetails(getUserDetail);
      setRoleId(Number(getUserDetail.role_id)); // Directly setting roleId from local storage
    }
  }, []); // R

  const getISTGreeting = () => {
    const now = new Date();

    // Convert to IST (UTC+5:30)
    const utcOffsetInMinutes = now.getTimezoneOffset(); // e.g., -330 for IST
    const istOffsetInMinutes = 330; // IST is UTC+5:30
    const istTime = new Date(
      now.getTime() + (istOffsetInMinutes + utcOffsetInMinutes) * 60000
    );

    const hour = istTime.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };
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
      case 16:
        return <MemberDashboard />
      default:
        return <p className="text-gray-500">No Dashboard Available</p>; // Default to MemberDashboard if no role matches
    }
  };

  return (
    <div className="h-screen overflow-scroll">
      <div className="bg-white mb-6 p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:h-40">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src="https://www.shareicon.net/data/512x512/2017/02/15/878685_user_512x512.png"
            alt="Welcome"
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full"
          />
          <div className="text-center sm:text-left">
            <p className="text-black font-semibold text-xl sm:text-2xl">
              {getISTGreeting()},{" "}
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
