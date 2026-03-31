// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LiveVideo from "./LiveVideo";
import { useState } from "react";
import { YOUTUBE_API_KEY, YOUTUBE_LIVE_VIDEO } from "../util/constatnt";
import { useSelector } from "react-redux";

const Livepage = () => {
  const [liveData, setLiveData] = useState([]);
  const [channelImages, setChannelImages] = useState({});
  const[livechtaMap,setlivechatMap]=useState({});
  const isopenMenu = useSelector((store) => store.nav.isMenuOpen);
  // console.log(isopenMenu);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(YOUTUBE_LIVE_VIDEO);
      const data = await result.json();
      setLiveData(data?.items);
      // console.log(data?.items);
      const channelIds = data?.items
        ?.map((item) => item.snippet.channelId)
        .join(",");
      // console.log(channelIds);
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${YOUTUBE_API_KEY}`,
      );
      const videoId=data?.items?.map((item)=>item.id.videoId).join(',')
      // console.log(videoId);
      const VideosRes=await fetch(`https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`)


      const VideoData=await VideosRes.json();
      
      const chatMap={};
      
      VideoData?.items?.forEach((item)=>{
        chatMap[item.id]=item.liveStreamingDetails.activeLiveChatId || null;
      })
      const channelData = await channelRes?.json();
      console.log(chatMap);
      setlivechatMap(chatMap);
      // console.log(channelData);
      const channelmap = {};

      channelData?.items?.forEach((item) => {
        channelmap[item.id] = item.snippet.thumbnails.default.url;
      });

      setChannelImages(channelmap);
    };
    fetchData();
  }, []);

  return (
    <div
      className={`${isopenMenu ? "w-[85%]" : "w-full"} grid md:grid-cols-3 gap-4`}
    >
      {liveData.map((item) => (
        <Link key={item.id.videoId} to={`/watch?v=${item.id.videoId}&chatId=${livechtaMap[item.id.videoId]}`}>
          <LiveVideo info={item} channelImg={channelImages[item.snippet.channelId]}/>
        </Link>
      ))}
    </div>
  );
};
export default Livepage;
