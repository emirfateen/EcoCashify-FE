import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import topUp from "../assets/topup.svg";
import transfer from "../assets/transfer.svg";
import history from "../assets/history.svg";
import recycle from "../assets/recycle.svg";
import carbon from "../assets/carbon.svg";
import rank from "../assets/rank.svg";
import cardboard from "../assets/cardboard.svg";
import glass from "../assets/glass.svg";
import metal from "../assets/metal.svg";
import paper from "../assets/paper.svg";
import plastic from "../assets/plastic.svg";

const HomePage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userCookie = Cookies.get("user");
        const allCookies = Cookies.get();
        console.log("All cookies:", allCookies);
        console.log("User cookie found:", userCookie);

        if (userCookie) {
          const tempuser = JSON.parse(userCookie);
          tempuser.recycle = 1.2;
          tempuser.carbon = 1.78;
          tempuser.rank = 1;
          setUser(tempuser);
          console.log("User cookie found:", tempuser);
        } else {
          console.error("User cookie not found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const trashes = {
    cardboard: cardboard,
    glass: glass,
    metal: metal,
    paper: paper,
    plastic: plastic,
  };

  return (
    <div className="p-10 w-full pt-36 font-nunito">
      <header className="text-center text-white bg-main-green mx-auto max-w-[900px] rounded-3xl p-10 shadow-gray-500 shadow-md">
        <p>Total Balance</p>
        <div className="flex flex-row justify-center">
          <p className="font-semibold">Rp</p>
          <h1 className="text-5xl font-bold mt-3">{user ? user.balance : 0}</h1>
        </div>

        <div className="flex flex-row justify-center mt-3">
          <img src={topUp} alt="Top Up" className="w-12 h-12" />
          <img src={transfer} alt="Transfer" className="w-12 h-12 mx-5" />
          <img src={history} alt="History" className="w-12 h-12" />
        </div>
      </header>

      <div className="flex flex-col max-w-[900px] mt-10 mx-auto">
        <h1 className="text-2xl font-bold">Summary</h1>
        <div className="flex flex-row justify-between">
          <div className="flex-1 flex-col items-center mx-5 place-items-center border-r">
            <img src={recycle} alt="Recycle" className="w-12 h-12" />
            <p className="text-main-green font-bold text-xl">
              {user ? user.recycle : 0} kg
            </p>
            <p className="text-sm">Recycle</p>
          </div>
          <div className="flex-1 flex-col items-center mx-5 place-items-center">
            <img src={carbon} alt="carbon" className="w-12 h-12" />
            <p className="text-main-green font-bold text-xl">
              {user ? user.carbon : 0} gray
            </p>
            <p className="text-sm">Carbon</p>
          </div>
          <div className="flex-1 flex-col items-center mx-5 place-items-center border-l">
            <img src={rank} alt="rank" className="w-12 h-12" />
            <p className="text-main-green font-bold text-xl">
              #{user ? user.rank : 0}
            </p>
            <p className="text-sm">Recycle</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-[900px] mt-10 mx-auto">
        <h1 className="text-2xl font-bold">Materials</h1>
        <div className="flex flex-row justify-between flex-wrap">
          {Object.keys(trashes).map((key) => (
            <div className="mx-5 shadow-gray-500 shadow-md w-32 h-32 rounded-xl flex justify-center items-center">
              <img src={trashes[key]} alt={key} className="w-24 h-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
