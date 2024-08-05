import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import BookCard from "../components/Books/BookCard";
import axios from "axios";
import Loader from "./Loader";
const Category = () => {
    const { category } = useParams();
  const [Books, setBooks] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(
        `https://book-shlef-server.vercel.app/api/v1/get-book-by-category/${category}`
      );
      setBooks(response.data.data);
      console.log(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!Books && <Loader />}
      {Books && (
        <div className="h-auto px-12 py-8 bg-zinc-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Books.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.image}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
