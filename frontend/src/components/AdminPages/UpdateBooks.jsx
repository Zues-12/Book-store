import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const UpdateBooks = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    category: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );

      setData({
        url: res.data.data.url,
        title: res.data.data.title,
        author: res.data.data.author,
        price: res.data.data.price,
        desc: res.data.data.desc,
        language: res.data.data.language,
        category: res.data.data.category,
        qty: res.data.data.qty,
      });
    };
    fetch();
  }, []);
  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const update = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""||
        Data.category === ""||
        Data.qty ===""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        alert(response.data.message);
        history(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="px-12 py-8 h-auto bg-zinc-900">
      <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description of book
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            rows="5"
            placeholder="description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        
          <div className="mt-4 flex gap-4">
            <div className="w-3/6 mt-4">
              <label htmlFor="category" className="text-zinc-400">Category</label>
              <select
                required
                value={Data.category}
                onChange={change}
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="category"
              >
                <option selected value="Novel">Novel</option>
                <option value="Travelogue">Travelogue</option>
                <option value="Biography">Biography</option>
                <option value="Short-Stories">Short-Stories</option>
                <option value="Poetry">Poetry</option>
                <option value="Misc">Misc</option>
                <option value="Essays">Essays</option>
              </select>
            </div>
            <div className="w-3/6 mt-4">
              <label htmlFor="qty" className="text-zinc-400 mt-2">
                Quantity
              </label>
              <input
                type="number"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Quantity of books"
                name="qty"
                required
                value={Data.qty}
                onChange={change}
              />
            </div>
          </div>


        <button
          className=" mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={update}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBooks;
