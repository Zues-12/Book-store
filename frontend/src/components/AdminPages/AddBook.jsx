import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [Data, setData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    category: "",
    qty: "",
    image: null, // Add this for the file
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setData((prevData) => ({
        ...prevData,
        [name]: files[0] // Store the file object
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        !Data.image || // Check if image is selected
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.qty === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const formData = new FormData();
        formData.append('image', Data.image);
        formData.append('title', Data.title);
        formData.append('author', Data.author);
        formData.append('price', Data.price);
        formData.append('desc', Data.desc);
        formData.append('language', Data.language);
        formData.append('category', Data.category);
        formData.append('qty', Data.qty);


        const response = await axios.post(
          "https://book-shlef-server.vercel.app/api/v1/add-book",
          formData,
          { headers }
        );

        setData({
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
          category: "",
          qty: "",
          image: null, // Reset the file input
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <form onSubmit={submit}>
          <div>
            <label htmlFor="image" className="text-zinc-400">
              Image
            </label>
            <input
              type="file"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="image"
              required
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="title" className="text-zinc-400">
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
            <label htmlFor="author" className="text-zinc-400">
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
              <label htmlFor="language" className="text-zinc-400">
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
              <label htmlFor="price" className="text-zinc-400">
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
            <label htmlFor="desc" className="text-zinc-400">
              Description of book
            </label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
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
            type="submit"
            className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
