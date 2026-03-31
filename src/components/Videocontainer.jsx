import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { YOUTUBE_API_KEY, YOUTUBE_VIDEO_URL } from "../util/constatnt";
import Video from "./Video";

const Videocontainer = () => {
  const [video, setVideo] = useState([]);
  const [channelImg, setchannelImg] = useState({});
  const [nextpageToken, setNextpageTokken] = useState(null);
  const [loading, setLoading] = useState(false);

  const getvideos = async () => {
    if (loading) return;

    setLoading(true);

    const url = nextpageToken
      ? `${YOUTUBE_VIDEO_URL}&pageToken=${nextpageToken}`
      : `${YOUTUBE_VIDEO_URL}`;

    const Data = await fetch(url);
    const Videos = await Data.json();

    setVideo((prev) => {
      const existingIds = new Set(prev.map((v) => v.id?.videoId || v.id));

      const filtered = Videos.items.filter(
        (v) => !existingIds.has(v.id?.videoId || v.id),
      );

      return [...prev, ...filtered];
    });
    setNextpageTokken(Videos.nextPageToken);

    const channelId = Videos.items
      .map((item) => item.snippet.channelId)
      .join(",");

    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`,
    );

    const result = await channelRes.json();

    const channelMap = {};
    result?.items.forEach((item) => {
      channelMap[item.id] = item.snippet.thumbnails.high.url;
    });

    setchannelImg((prev) => ({ ...prev, ...channelMap }));

    setLoading(false);
  };

  useEffect(() => {
    getvideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        getvideos();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextpageToken, loading]);

  return (
    <div className="flex flex-wrap gap-1 justify-evenly">
      {video?.map((video) => (
        <Link
          key={video.id?.videoId || video.id}
          to={"watch?v=" + video.id}
          className="hover:scale-[1.02] hover:bg-amber-100 rounded-lg transition duration-200 md:w-95 w-full md:p-2"
        >
          <Video
            info={video}
            channelImg={channelImg[video.snippet.channelId]}
          />
        </Link>
      ))}

      {/* loader */}
      {loading && (
        <h1 className="text-center w-full text-lg font-semibold">Loading...</h1>
      )}
    </div>
  );
};

export default Videocontainer;
