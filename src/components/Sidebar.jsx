import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaFire,
  FaGamepad,
  FaMusic,
  FaFilm,
  FaBroadcastTower,
} from "react-icons/fa";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.nav.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="md:w-[15%] w-[45%] absolute md:relative h-full p-4 overflow-y-auto border-r bg-white">
      <ul className="space-y-3">
        <Link to="/">
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaHome />
            Home
          </li>
        </Link>

        <Link to="/category/shorts">
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaFire />
            Shorts
          </li>
        </Link>

        <Link to="/live">
          {" "}
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaBroadcastTower />
            Live
          </li>
        </Link>

        <Link to="/category/videos">
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaFilm />
            Videos
          </li>
        </Link>
      </ul>

      <hr className="my-4" />

      <h2 className="font-semibold text-sm text-gray-600 mb-2">
        Subscriptions
      </h2>

      <ul className="space-y-3">
        <Link to="/category/music">
          {" "}
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaMusic />
            Music
          </li>
        </Link>

        <Link to="/category/gaming">
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaGamepad />
            Gaming
          </li>
        </Link>

        <Link to="/category/sports">
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaFire />
            Sports
          </li>
        </Link>

        <Link to="/category/movies">
          {" "}
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <FaFilm />
            Movies
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
