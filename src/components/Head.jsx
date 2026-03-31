import YoutubeLogo from "../images/YouTube_Logo.webp";
import MenuIcon from "../images/Hamburger_icon.png";
import AvtarProfile from "../images/avtar_profile.avif";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openMenu, toggleMenu } from "../util/navslice";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SEARCH_SUGGESTIONS } from "../util/constatnt";
import { addcache } from "../util/searchslice";

const Head = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [result, setResult] = useState([]);
  const [mobileSearch, setMobileSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searcache = useSelector((store) => store.search);

  function handleclickmenu() {
    dispatch(toggleMenu());
  }

  function handlesearch() {
    const query = search.trim();
    if (!query) return;

    navigate(`/search?search_query=${query}`);
    setSearch("");
    setMobileSearch(false);
  }

  const fetchData = async () => {
    
    // const data = await fetch(`${SEARCH_SUGGESTIONS}${search}`);
    // const finaldata = await data.json();

    // setResult(finaldata[1]);
    if (!search.trim()) return;

  const url = import.meta.env.DEV
    ? `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${search}`
    : `${SEARCH_SUGGESTIONS}${search}`;

  const data = await fetch(url);
  const finaldata = await data.json();

  setResult(finaldata[1]);

    dispatch(
      addcache({
        [search]: finaldata[1],
      }),
    );
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 760) {
        dispatch(closeMenu());
      } else {
        dispatch(openMenu());
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searcache[search]) {
        setResult(searcache[search]);
      } else if (search) {
        fetchData();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center shadow-lg p-2">
        {/* LEFT */}
        <div className="flex gap-4 items-center">
          <img
            alt="menu"
            src={MenuIcon}
            className="h-7 md:h-8 cursor-pointer"
            onClick={handleclickmenu}
          />
          <Link to="/">
            <img alt="logo" src={YoutubeLogo} className="h-5 md:h-6" />
          </Link>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:block w-[40%] relative">
          <div className="flex w-full items-center">
            <input
              type="text"
              value={search}
              onFocus={() => setShow(true)}
              onBlur={() => setTimeout(() => setShow(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handlesearch()}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="h-10 w-full px-4 border border-gray-300 rounded-l-full focus:outline-none"
            />

            {search && (
              <FaTimes
                className="absolute right-20 text-gray-500 cursor-pointer"
                onClick={() => setSearch("")}
              />
            )}

            <button
              className="h-10 px-6 border border-gray-300 border-l-0 rounded-r-full bg-gray-100"
              onClick={handlesearch}
            >
              <FaSearch />
            </button>
          </div>

          {/* DESKTOP DROPDOWN */}
          {show && result.length > 0 && (
            <div className="absolute bg-white w-full mt-2 p-2 rounded-lg shadow-lg z-50">
              {result.map((s, index) => (
                <div
                  key={index}
                  onMouseDown={() => {
                    navigate(`/search?search_query=${s}`);
                    setSearch(s);
                  }}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  🔍 {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* MOBILE SEARCH ICON */}
          <FaSearch
            className="md:hidden text-lg cursor-pointer"
            onClick={() => setMobileSearch(true)}
          />

          <img
            src={AvtarProfile}
            alt="avatar"
            className="h-9 md:h-12 rounded-full"
          />
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {mobileSearch && (
        <div className="fixed inset-0 bg-white z-50 p-4">
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlesearch()}
              placeholder="Search..."
              className="flex-1 border p-2 rounded-full"
            />

            <FaTimes
              className="text-xl cursor-pointer"
              onClick={() => setMobileSearch(false)}
            />
          </div>

          {/* MOBILE RESULTS */}
          <div className="mt-4">
            {result.map((s, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/search?search_query=${s}`);
                  setMobileSearch(false);
                }}
                className="px-2 py-2 border-b cursor-pointer"
              >
                🔍 {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Head;
