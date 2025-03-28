import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import { Route, Routes } from "react-router";
import Dashboard from "../pages/dashboard/Dashboard";
import { twMerge } from "tailwind-merge";
import Employee from "../pages/dashboard/Employee/Employee";
import Role from "../pages/dashboard/Role/Role";
import Organization from "../pages/dashboard/AddOrganization/Organization";
import ProductList from "../pages/inventory/ProductList";
import AddProduct from "../pages/inventory/AddProduct";
import Category from "../pages/inventory/AddCategory";
import Inventory from "../pages/inventory/Inventory";
import Units from "../pages/inventory/Units";
import Vendor from "../pages/dashboard/Vendor/Vendor";
import AddVender from "../pages/dashboard/Vendor/AddVender";
import Member from "../pages/member/Member";
import AddMember from "../pages/member/AddMember";
import MenuCreationList from "../pages/superAdmin/MenuCreationList";
import MenuCreation from "../pages/superAdmin/MenuCreation";
import CreateMember from "../pages/member/CreateMember";
import BulkUploadMembers from "../pages/member/BulkUploadMembers"; // Bulk Upload Page
import FacilityManagement from "../pages/facilityManagement/FacilityManagement";
import TransactionHistory from "../pages/member/TransactionHistory";
import MemberCheckInCheckOut from "../pages/member/MemberCheckInCheckOut";
import EventBooking from "../pages/member/EventBooking";
import ClubManagement from "../pages/dashboard/ClubManagement/ClubManagement";
import Restaurant from "../pages/facilityManagement/Restaurant";
import MemberAction from "../pages/member/MemberAction";
import MenuManagement from "../pages/facilityManagement/RestaurantMenu";
import TableManagement from "../pages/facilityManagement/RestaurantTableManagement";
import POSBilling from "../pages/user/Biling";
import ThermalInvoice from "../pages/user/ThermaplePrint";
import KotPrint from "../pages/user/KotPrint";
// import MemberPassword from "../pages/member/MemberPasswordModal";

function DashboardRoutes() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className=" h-screen w-screen bg-bgColor ">
        <Sidebar open={open} setOpen={setOpen} />
        <div
          className={twMerge("pt-24 px-2 lg:px-8", open ? "ml-60" : "ml-20")}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usermanagement" element={<Employee />} />
            <Route path="/rolemanagement" element={<Role />} />
            <Route path="/managementcommity" element={<ClubManagement />} />
            <Route path="/organisation" element={<Organization />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/category" element={<Category />} />
            <Route path="/inventorymanagement" element={<Inventory />} />
            <Route path="/units" element={<Units />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/add-vender" element={<AddVender />} />
            <Route path="/members" element={<Member />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/menu-creation-list" element={<MenuCreationList />} />
            <Route path="/menu-creation" element={<MenuCreation />} />
            <Route path="/create-member" element={<CreateMember />} />
            <Route path="/bulk-upload-members" element={<BulkUploadMembers />} />
            {/* <Route path="/memberpassword" element={<MemberPassword />} /> */}
            <Route path="/transactionHistory" element={<TransactionHistory />} />
            <Route path="/membercheckinout" element={<MemberCheckInCheckOut />} />
            <Route path="/eventbookings" element={<EventBooking />} />
            <Route path="/facilitymanagement" element={<FacilityManagement />} />
            <Route path="/restaurantmanagement" element={<Restaurant />} />
            <Route path="/memberaction" element={<MemberAction />} />
            <Route path="/billing" element={<POSBilling />} />
            
            <Route path="/print/invoice/:billId" element={<ThermalInvoice />} />
            <Route path="/print/kot/:orderId" element={<KotPrint />} />
            
            {/* Dynamic Routes for Restaurant Features */}
            

            <Route path="/restaurant/:restaurantId/menu" element={<MenuManagement />} />
            <Route path="/restaurant/:restaurantId/tables" element={<TableManagement />} />
        {/* <Route path="/restaurant/:restaurantId/pos" element={<POSPage />} />
        <Route path="/restaurant/:restaurantId/kitchen" element={<KitchenPage />} /> */}

          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashboardRoutes;
