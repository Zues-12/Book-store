import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const MobileBar = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role !== "admin" && (
        <div className="w-full  items-center justify-center flex lg:hidden">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-800 rounded transition-all duration-300 active:bg-zinc-800 focus:bg-zinc-800 "
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full  py-2  text-center hover:bg-zinc-800 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full  py-2  text-center hover:bg-zinc-800 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full  items-center justify-center flex lg:hidden">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full  py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileBar;
