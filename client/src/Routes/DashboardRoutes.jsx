import React, { useState } from "react";
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
import FacilityManagement from "../pages/facilityManagement/FacilityManagement";

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
            <Route
              path="/facilitymanagement"
              element={<FacilityManagement />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashboardRoutes;
