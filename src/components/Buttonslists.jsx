
import Button from "./Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Buttonslists = () => {
  const param=useParams();
  const navigate=useNavigate();
  
  
  const list = [
    "All",
    "Songs",
    "Live",
    "Videos",
    "Shorts",
    "Sports",
    "News",
    "Gaming",
    "Movies",
    "Music",
    "Podcasts",
    "Technology",
    "Education",
    "Comedy",
    "Travel",
    "Food",
    "Fitness",
    "Fashion",
    "Science",
    "Programming",
  ];

  return (
    <div className="flex gap-3 overflow-x-auto whitespace-nowrap px-4 py-2 bg-white top-16 z-10 no-scrollbar">
      {list.map((item) => {
       const isActive = (item === "All" && !param.name) || param.name == item.toLocaleLowerCase()
        return (
        <Button onClickk={()=>navigate(`/category/${item.toLocaleLowerCase()}`)} className={`px-3 py-1 rounded-full ${
        isActive ? "bg-black text-white": "bg-gray-200"
      }`} name={item} key={item}></Button>
        
      )})}
    </div>
  );
};

export default Buttonslists;
