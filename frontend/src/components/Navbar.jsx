import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const Navbar = ({toggleSidebar}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

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


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchInput.trim() === "") {
        setSearchSuggestions([]);
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:1000/api/v1/search/${searchInput}`);
        const data = await response.json();
        setSearchSuggestions(data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };
  
    const debounceFetch = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchInput]);

  const handleSearchSuggestionClick = (url) => {
    window.location.href = url; // Reload the page with the new URL
  };
  
  

  return (
    <>
      <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-gradient-to-l from-zinc-900 to-blue-500 py-2 text-white  lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2  w-3/6 lg:w-1/6 flex justify-center items-center gap-5">
            <div className="hidden lg:block">
              <button className="h-10 w-10" onClick={toggleSidebar}>
            <IoMenuSharp className=" size-8 text-white" /></button>
            </div>
            <Link
              to="/"
              className="flex text-2xl font-semibold items-center justify-center "
            >
              <img
                src="../public/10433049.png"
                alt="logo"
                className="h-10 me-4"
              />{" "}
              <div className="font-LogoTitle">Books Shelf</div>
            </Link>
          </div>
          <div className=" w-1/6 lg:hidden flex items-center ">
            <button
              className="text-3xl lg:hidden"
              type="button"
              onClick={() => setNav(Nav === "hidden" ? "block" : "hidden")}
            >
              <IoMenuSharp/>
            </button>
          </div>
          <div className="w-4/6 px-10 lg:w-2/6 flex justify-items-center items-center">

            <form className="w-full lg:w-5/6 flex items-center justify-center">
            <input
                type="text"
                placeholder="Search books..."
                className="hidden lg:block w-full px-3 py-2 rounded bg-zinc-800 text-zinc-300 border border-blue-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={() => setTimeout(() => setSearchSuggestions([]), 200)}              />
              <button type="button"><IoSearchSharp className="text-white mx-2 size-5 hidden lg:block" /></button>
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-zinc-700 border border-blue-500 rounded mt-1 z-10">
                  {searchSuggestions.map((book) => (
                    <Link
                    to={`/view-book-details/${book._id}`}
                    key={book._id}
                    className="block px-3 py-2 hover:bg-zinc-800"
                    onClick={() => handleSearchSuggestionClick(`/view-book-details/${book._id}`)} // Pass book details page URL to click handler
                    >
                    {book.title} by {book.author}
                  </Link>
                  
                  ))}
                </div>
              )}

            </form>
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
