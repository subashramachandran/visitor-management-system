
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  ClipboardList,
  LogIn,
  LogOut,
  FileText,
  Activity,
  UserCog
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const { user, logout } = useAuth();

  const menu = [

    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
      roles: [
        "Administrator",
        "Employee",
        "Receptionist"
      ]
    },

    {
      name: "Employees",
      path: "/employees",
      icon: <Users size={20} />,
      roles: [
        "Administrator"
      ]
    },

    {
      name: "Visitor Registration",
      path: "/visitor-registration",
      icon: <UserPlus size={20} />,
      roles: [
        "Receptionist",
        "Administrator"
      ]
    },

    {
      name: "Visitors",
      path: "/visitors",
      icon: <ClipboardList size={20} />,
      roles: [
        "Administrator",
        "Employee",
        "Receptionist"
      ]
    },

    {
      name: "Pending Requests",
      path: "/pending",
      icon: <ClipboardList size={20} />,
      roles: [
        "Employee",
        "Administrator"
      ]
    },

    {
      name: "Check In",
      path: "/check-in",
      icon: <LogIn size={20} />,
      roles: [
        "Receptionist",
        "Administrator"
      ]
    },

    {
      name: "Check Out",
      path: "/check-out",
      icon: <LogOut size={20} />,
      roles: [
        "Receptionist",
        "Administrator"
      ]
    },

    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={20} />,
      roles: [
        "Administrator",
        "Employee"
      ]
    },

    {
      name: "Activity History",
      path: "/activity",
      icon: <Activity size={20} />,
      roles: [
        "Administrator"
      ]
    },

    {
      name: "User Management",
      path: "/users",
      icon: <UserCog size={20} />,
      roles: [
        "Administrator"
      ]
    }

  ];

  const allowedMenu = menu.filter(item =>
    item.roles.includes(user?.role)
  );

  return (

    <aside className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      flex
      flex-col
      p-4
    ">

      {/* Logo */}

      <div className="mb-6">

        <h1 className="text-xl font-bold">
          Visitor Management
        </h1>

        <p className="text-sm text-blue-400 mt-1">
          {user?.role}
        </p>

      </div>


      {/* Menu */}

      <nav className="flex-1 space-y-2">

        {

          allowedMenu.map(item => (

            <NavLink

              key={item.name}

              to={item.path}

              className={({ isActive }) =>

                `

                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                transition-all
                duration-200

                ${

                  isActive

                  ?

                  "bg-blue-600 shadow-lg"

                  :

                  "hover:bg-gray-800 text-gray-300 hover:text-white"

                }

                `

              }

            >

              {item.icon}

              {item.name}

            </NavLink>

          ))

        }

      </nav>


      {/* Logged User */}

      <div className="border-t border-gray-700 pt-4 mt-4">

        <p className="text-xs text-gray-400">
          Logged in as
        </p>

        <p className="font-semibold truncate mb-3">
          {user?.name}
        </p>


        {/* Logout */}

        <button

          onClick={logout}

          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-3
            rounded-lg
            transition
            font-semibold
          "

        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>

  );

};

export default Sidebar;

