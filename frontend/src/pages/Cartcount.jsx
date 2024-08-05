import React, { useEffect, useState } from "react";
import axios from "axios";
const Cartcount = ({headers}) => {
   
  const [Count, setCount] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-shlef-server.vercel.app/api/v1/cart-item-count",{headers},
      );
      setCount(response.data.count);
    };
    fetch();
  }, []);

  return (
    <>
        <div className="bg-zinc-900 px-12 py-2">
          <h1 className="text-white text-xl">Currently {Count} people have this book in their cart</h1>
        </div>
    </>
  );
};

export default Cartcount;
