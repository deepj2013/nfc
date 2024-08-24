import { FaRegUser, FaUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";

export const AdminRoutes = [
  {
    title: "Dashboard",
    path: "/",
    // icon: <MdSpaceDashboard />
  },

  {
    title: "Add SubAdmin",
    path: "/subadmin",
    // icon: <FaRegUser />
  },

  {
    title: "Add Scheme",
    path: "/user",
    // icon: <FaBuildingUser />
  },

  {
    title: "User",
    path: "/user",
    // icon: <RiFileUserFill />
  },
];

export const GatekeeperRoute = [
  {
    title: "Dashboard",
    path: "/",
    // icon: <FaUser className="text-black" />
  },
  {
    title: "Employee",
    path: "/employee",
    // icon: <MdSpaceDashboard />
  },
  {
    title: "Role Management",
    path: "/role",
    // icon: <MdSpaceDashboard />
  },
  {
    title: "Check In",
    path: "/",
    // icon: <MdSpaceDashboard />
  },

  {
    title: "Check Out",
    path: "/subadmin",
    // icon: <FaRegUser />
  },

  {
    title: "Employee Attendance",
    path: "/user",
    // icon: <FaBuildingUser />
  },

  {
    title: "Visitor Entry",
    path: "/user",
    // icon: <RiFileUserFill />
  },
];

export const universalAdmin = [
  {
    title: "Dashboard",
    path: "/",
    // icon: <FaUser className="text-black" />
  },
  {
    title: "Organisation",
    path: "/Organization",
    // icon: <FaUser className="text-black" />
  },
  {
    title: "Employee",
    path: "/employee",
    type: 2,
    subMenu: [
      {
        title: "Add Employee",
        path: "/employee",
      },
      {
        title: "Employee List",
        path: "/employee",
      },
    ],
  },

  {
    title: "Inventory",
    path: "/inventory",
    type: 2,
    subMenu: [
      {
        title: "Product",
        path: "/product",
      },
      {
        title: "Category",
        path: "/category",
      },
      {
        title: "Uints",
        path: "/units",
      },
      {
        title: "Inventory ",
        path: "/inventory",
      },
      {
        title: "vendor ",
        path: "/vendor",
      },
      ,
    ],
  },
];
