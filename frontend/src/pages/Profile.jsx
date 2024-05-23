import axios from "axios";
import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      history("/");
    } else {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:1000/api/v1/getUserData",
          { headers }
        );
        setProfileData(response.data);
      };
      fetch();
    }
  }, []);
  return (
    <>
      {!ProfileData && <Loader />}
      <div className="h-auto bg-zinc-900 px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
        {ProfileData && (
          <>
            <div className="h-auto lg:h-[80vh] w-full lg:w-1/6 bg-zinc-800 rounded-lg">
              <Sidebar ProfileData={ProfileData} />
            </div>
            {/* Mobile Bar  */}
            <MobileBar />
            <div className="h-[100%] w-full lg:w-5/6  rounded-lg">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
