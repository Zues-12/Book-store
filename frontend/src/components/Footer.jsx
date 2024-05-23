import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
  ];
  return (
    <div className="bg-blue-600 px-12 py-8  ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-zinc-100">BookHeaven</h2>
        <div className="flex flex-col md:flex-row">
          {links.map((items, i) => (
            <Link
              to={items.link}
              key={i}
              className="ms-4 text-zinc-300 hover:text-zinc-100"
            >
              {items.title}{" "}
            </Link>
          ))}
        </div>
      </div>
      <hr className="my-4" />
      <p className="text-center p-0 text-zinc-200">
        © 2024 BookHeaven. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
