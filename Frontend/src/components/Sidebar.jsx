import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  LuBookLock,
  LuBookOpen,
  LuBookOpenCheck,
  LuBookPlus,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import LoginContext from "../context/LoginContext";

const Sidebar = () => {
  const {isLogin} = useContext(LoginContext);
  const location = useLocation();
  const applyStyles = (id) => {
    const elements = document.getElementsByTagName("a");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "";
      elements[i].style.color = "rgb(17 24 39)";
    }
    let element;
    switch (id) {
      case "addbook":
        element = document.querySelector(".b");
        element.style.backgroundColor = "rgba(0,0,0,0.8)";
        element.style.color = "white";

        break;
      case "showbooks":
        element = document.querySelector(".c");
        element.style.backgroundColor = "rgba(0,0,0,0.8)";
        element.style.color = "white";

        break;
      case "issuebook":
        element = document.querySelector(".d");
        element.style.backgroundColor = "rgba(0,0,0,0.8)";
        element.style.color = "white";

        break;
      case "issuedbooks":
        element = document.querySelector(".e");
        element.style.backgroundColor = "rgba(0,0,0,0.8)";
        element.style.color = "white";

        break;
      case "userregister":
        element = document.querySelector(".f");
        element.style.backgroundColor = "rgba(0,0,0,0.8)";
        element.style.color = "white";

        break;
      case "showusers":
        element = document.querySelector(".g");
        element.style.backgroundColor = "rgba(0,0,0,0.8)";
        element.style.color = "white";

        break;
      default:
        element = document.querySelector(".a");
        element.style.backgroundColor = "rgba(0,0,0,0.8)";
        element.style.color = "white";
        break;
    }
  };

  useEffect(() => {
    // Apply styles based on the initial URL path when component mounts
    const pathname = location.pathname;
    const currentPage = pathname.split("/")[1];
    applyStyles(currentPage);
  }, [location.pathname]);

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-[5.55rem] left-0 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 shadow-sm"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group a"
              >
                <MdOutlineSpaceDashboard className="text-2xl" />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            {isLogin && <li>
              <NavLink
                to="/addbook"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group b"
              >
                <LuBookPlus className="text-2xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">Add Book</span>
              </NavLink>
            </li>}
            <li>
              <NavLink
                to="/showbooks"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group c"
              >
                <LuBookOpen className="text-2xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Show Books
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/issuebook"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group d"
              >
                <LuBookOpenCheck className="text-2xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Issue Book
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/issuedbooks"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group e"
              >
                <LuBookLock className="text-2xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Issued Book History{" "}
                </span>
              </NavLink>
            </li>

           { isLogin && <li>
              <NavLink
                to="/userregister"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group f"
              >
                <LuUserPlus className="text-2xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  User Register{" "}
                </span>
              </NavLink>
            </li>}

            {isLogin && <li>
              <NavLink
                to="/showusers"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group g"
              >
                <LuUsers className="text-2xl" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Show Users{" "}
                </span>
              </NavLink>
            </li>}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
