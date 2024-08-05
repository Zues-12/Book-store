import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BookCard = ({ image, title, author, price, bookid, fav }) => {
  const headers = {
    bookid: bookid,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const removeFromFavourite = async () => {
    try {
      const response = await axios.put(
        "https://book-shlef-server.vercel.app/api/v1/remove-from-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full bg-gradient-to-t from-zinc-900 to-blue-500 text-zinc-100 rounded p-4 hover:scale-105 duration-150">
      <Link to={`/view-book-details/${bookid}`} className="">
        <div className="w-full flex items-center justify-center bg-zinc-900 ">
          <img src={`../uploads/${image}`} alt="book" className="h-40 object-cover" />
    </div>
        <h1 className="mt-4 text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-zinc-400 font-semibold">by {author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">Rs {price}</p>
      </Link>
      {fav === true && (
        <button
          className="mt-4 bg-red-100 w-full rounded text-red-600  py-2 font-semibold hover:bg-red-200 transition-all duration-300"
          onClick={removeFromFavourite}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
