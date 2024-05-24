import React, { useState } from "react";
import axios from "axios";
const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    category: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""||
        Data.category === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
          category:"",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
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
        <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">Category
            </label>
            <select 
            required
            value={Data.category}
            onChange={change}
             className=" my-2 mx-4 p-2 bg-zinc-900 text-zinc-400 rounded-sm outline-none " name="category" id="categroy">
            <option value="Novel">Novel</option>
            <option value="Travelogue">Travelogue</option>
            <option value="Biography">Biography</option>
            <option value="Short-Stories">Short-Stories</option>
            <option value="Poetry">Poetry</option>
            <option value="Misc">Misc</option>
            <option value="Essays">Essays</option>
            

            
            </select>

          </div>

        <button
          className=" mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
