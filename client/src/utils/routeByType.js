import { FaRegUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";

export const AdminRoutes = [
    {
        title: 'Dashboard',
        path: '/',
        // icon: <MdSpaceDashboard />

    },

    {
        title: 'Add SubAdmin',
        path: '/subadmin',
        // icon: <FaRegUser />


    },

    {
        title: 'Add Scheme',
        path: '/user',
        // icon: <FaBuildingUser />


    },

    {
        title: 'User',
        path: '/user',
        // icon: <RiFileUserFill />


    },

]


export const GatekeeperRoute = [
    {
        title: 'Dashboard',
        path: '/',
        // icon: <MdSpaceDashboard />

    },
    {
        title: 'Check In',
        path: '/',
        // icon: <MdSpaceDashboard />

    },

    {
        title: 'Check Out',
        path: '/subadmin',
        // icon: <FaRegUser />


    },

    {
        title: 'Employee Attendance',
        path: '/user',
        // icon: <FaBuildingUser />


    },

    {
        title: 'Visitor Entry',
        path: '/user',
        // icon: <RiFileUserFill />

    },
]