import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import axios from "axios";
const RecentlyAdded = () => {
  const [Books, setBooks] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-shlef-server.vercel.app/api/v1/get-recent-books"
      );
      setBooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {Books && (
        <div className="bg-black px-12 py-8">
          <h1 className="text-white font-bold text-3xl">Recently Added Books</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 mt-8">
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

export default RecentlyAdded;
