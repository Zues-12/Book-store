import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  var links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },

    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const [Nav, setNav] = useState("hidden");
  if (isLoggedIn === false) {
    links.splice(2);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (role === "admin") {
    links.splice(3, 1);
  }

  return (
    <>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-zinc-800 py-2 text-white  lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2  w-3/6 lg:w-1/6">
            <Link
              to="/"
              className="flex text-2xl font-semibold items-center justify-center "
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                alt="logo"
                className="h-10 me-4"
              />{" "}
              BookHeaven
            </Link>
          </div>
          <div className=" w-1/6 block  lg:hidden">
            <button
              className="block border-0 bg-transparent px-2  hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0  lg:hidden"
              type="button"
              onClick={() => setNav(Nav === "hidden" ? "block" : "hidden")}
            >
              <span className="[&>svg]:w-7 [&>svg]:stroke-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
                </svg>
              </span>
            </button>
          </div>

          <div className="5/6 hidden lg:block">
            <div className="flex items-center">
              {links.map((items, i) => (
                <>
                  {items.title === "Profile" ||
                  items.title === "Admin Profile" ? (
                    <div
                      className=" rounded  hover:cursor-pointer border border-blue-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                      key={i}
                    >
                      <Link to={`${items.link}`} className="text-normal">
                        {items.title}
                      </Link>
                    </div>
                  ) : (
                    <div
                      className="mx-3 hover:text-blue-300  rounded transition-all duration-300 hover:cursor-pointer"
                      key={i}
                    >
                      <Link to={`${items.link}`} className="text-normal">
                        {items.title}{" "}
                      </Link>
                    </div>
                  )}
                </>
              ))}
              {isLoggedIn === false && (
                <>
                  <Link
                    to="/login"
                    className="rounded border border-blue-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded  bg-blue-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className={`5/6 ${Nav} lg:hidden bg-zinc-800  text-white px-12`}>
        <div className="flex flex-col items-center">
          {links.map((items, i) => (
            <>
              {items.title === "Profile" || items.title === "Admin Profile" ? (
                <div
                  className=" rounded  hover:cursor-pointer border border-blue-500 px-3 py-1 my-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
                  key={i}
                >
                  <Link
                    to={`${items.link}`}
                    className="text-normal"
                    onClick={() => setNav("hidden")}
                  >
                    {items.title}
                  </Link>
                </div>
              ) : (
                <div
                  className="mx-3 hover:text-blue-300  rounded transition-all duration-300 hover:cursor-pointer my-3"
                  key={i}
                >
                  <Link
                    to={`${items.link}`}
                    className="text-normal"
                    onClick={() => setNav("hidden")}
                  >
                    {items.title}{" "}
                  </Link>
                </div>
              )}
            </>
          ))}
          {isLoggedIn === false && (
            <>
              <Link
                to="/login"
                className="rounded border border-blue-500 px-3 py-1 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="rounded  bg-blue-500 px-3 py-1 my-4 md:my-0 mx-3 hover:bg-white hover:text-zinc-900 transition-all duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
