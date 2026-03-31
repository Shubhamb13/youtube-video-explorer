import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { YOUTUBE_API_KEY } from "../util/constatnt";
import Buttonslists from "./Buttonslists";
import LiveVideo from "./LiveVideo";
// import { addMessages } from "../util/chatslice";
// import { generate } from "../util/helper";
const Category = () => {
  const [category, setCategory] = useState([]);
  const [channelImg, setchannelImg] = useState({});
  const param = useParams();
  // const dispatch = useDispatch();
  const isMenuOpen = useSelector((store) => store.nav.isMenuOpen);
  // const data = useSelector((store) => store.chat.messages);
  // console.log(data);

  const fetchData = async () => {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${param.name}&type=video&maxResults=20&key=${YOUTUBE_API_KEY}`,
    );
    const result = await data.json();
    setCategory(result.items);
    // console.log(result.items);
    const channleIDs = result?.items
      ?.map((item) => item.snippet.channelId)
      .join(",");
    //  console.log(channleIDs);
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channleIDs}&key=${YOUTUBE_API_KEY}`,
    );
    const res = await channelRes.json();
    // console.log(res)
    const channelmap = {};
    res.items.forEach((item) => {
      channelmap[item.id] = item.snippet.thumbnails.high.url;
    });

    setchannelImg(channelmap);
    // console.log(channelmap);
  };

  useEffect(() => {
    fetchData();
  }, [param]);

  return (
    <div
      className={`${
        isMenuOpen ? "w-[85%]" : "w-full"
      } transition-all duration-300`}
    >
      <Buttonslists />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {category.map((item) => (
          <Link to={`/watch?v=${item.id.videoId}`} key={item.id.videoId}>
            <LiveVideo
              channelImg={channelImg[item.snippet.channelId]}
              info={item}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Category;
