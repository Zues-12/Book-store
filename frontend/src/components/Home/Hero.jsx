import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-zinc-900 h-auto lg:h-[89vh] w-full  flex flex-col lg:flex-row px-10 py-8 lg:py-0">
      <div className="w-full lg:w-3/6 h-[100%]  flex items-center justify-center ">
        <div className="w-full ">
          <h1 className="text-yellow-100 text-6xl font-semibold text-center lg:text-left">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-zinc-300 mt-5 text-center lg:text-left">
            Uncover captivating stories, enriching knowledge, and endless
            inspiration in our curated collection of books
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              to="/all-books"
              className=" my-5 lg:my-8 text-3xl bg-zinc-900 rounded-full py-3 px-8 flex items-center justify-center text-white font-semibold border border-yellow-100 hover:bg-zinc-800 transition-all duration-300"
            >
              Discover Books
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center  ">
        <img
          src="/hero.png"
          alt="hero"
          className=" h-auto lg:h-[100%] object-cover "
        />
      </div>
    </div>
  );
};

export default Hero;
