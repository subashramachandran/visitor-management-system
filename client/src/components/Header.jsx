
import { Bell, Menu, Search, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = ({ onMenuClick }) => {

  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <header className="
      bg-white
      border-b
      min-h-16
      px-3
      sm:px-4
      md:px-6
      flex
      items-center
      justify-between
      gap-3
    ">

      {/* Left */}

      <div className="flex items-center gap-2 sm:gap-4 min-w-0">

        {/* Mobile Menu */}

        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            p-2
            rounded-lg
            hover:bg-gray-100
            active:bg-gray-200
            transition
            shrink-0"
        >
          <Menu size={22} />
        </button>


        <div className="min-w-0">

          <h1 className="
            text-base
            sm:text-xl
            font-bold
            text-gray-800
            truncate
          ">
            Visitor Management System
          </h1>

          <p className="
            text-xs
            text-gray-500
            truncate
          ">
            {today}
          </p>

        </div>

      </div>


      {/* Search */}

      <div className="
        hidden
        md:flex
        items-center
        bg-gray-100
        rounded-xl
        px-4
        py-2
        w-64
        lg:w-96
      ">

        <Search
          className="text-gray-500 shrink-0"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            bg-transparent
            outline-none
            ml-3
            w-full
            text-sm
          "
        />

      </div>


      {/* Right */}

      <div className="
        flex
        items-center
        gap-2
        sm:gap-5
        shrink-0
      ">

        {/* Notification */}

        <button
          className="
            relative
            p-2
            rounded-full
            hover:bg-gray-100
            transition
          "
        >

          <Bell
            size={20}
            className="text-gray-600"
          />

          <span className="
            absolute
            top-1.5
            right-1.5
            w-2.5
            h-2.5
            rounded-full
            bg-red-500
            border-2
            border-white
          " />

        </button>


        {/* User */}

        <div className="
          flex
          items-center
          gap-2
          sm:gap-3
          border-l
          pl-2
          sm:pl-5
        ">

          <div className="hidden sm:block text-right">

            <p className="font-semibold text-gray-800">
              {user?.name || "Guest"}
            </p>

            <p className="text-sm text-blue-600">
              {user?.role || "User"}
            </p>

          </div>


          <div className="
            w-9
            h-9
            sm:w-11
            sm:h-11
            rounded-full
            bg-linear-to-r
            from-blue-600
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            shadow-md
            shrink-0
          ">

            {user?.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <User size={20} />
            )}

          </div>

        </div>

      </div>

    </header>

  );
};

export default Header;

