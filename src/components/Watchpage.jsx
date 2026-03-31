import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { closeMenu, openMenu } from "../util/navslice";
import {
  YOUTUBE_API_KEY,
  YOUTUBE_COMMENTS_API,
  YOUTUBE_POPULAR_VIDEO,
} from "../util/constatnt";
import Video from "./Video";

const Watchpage = () => {
  const [param] = useSearchParams();
  const videoId = param.get("v");
  const chatid = param.get("chatId");
  const [data, setData] = useState([]);
  const [VideoDescription, setVideoDescription] = useState(null);
  const [popularVideo, setPopularVideo] = useState([]);
  const [channeldata, setChanneldata] = useState({});
  const [chatMessages, setchatMessages] = useState([]);
  // console.log(videoId);
  const dispatch = useDispatch();
  const video = VideoDescription?.items?.[0];
  const snippet = video?.snippet;
  const statistics = video?.statistics;

  const chatRef = useRef(null);
  // console.log(chatid);
  // console.log(VideoDescription);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (!chatid) return;
    const fetchLiveData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${chatid}&part=snippet,authorDetails&key=${YOUTUBE_API_KEY}`,
      );
      const data = await res.json();
      console.log(data.items);
      setchatMessages((prev) => {
        const newMessages = data.items || [];

        const existingIds = new Set(prev.map((msg) => msg.id));

        const filtered = newMessages.filter((msg) => !existingIds.has(msg.id));

        const updated = [...prev, ...filtered];

        // sort by time (old → new)
        updated.sort(
          (a, b) =>
            new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt),
        );

        // keep last 30
        return updated.slice(-30);
      });
    };

    //  Call API every 2 seconds (polling)
    const i = setInterval(() => {
      fetchLiveData();
    }, 2000);
    fetchLiveData();
    return () => clearInterval(i);
  }, [chatid]);

  useEffect(() => {
    dispatch(closeMenu());

    const fetchData = async () => {
      const [VideoRes, VideoCommentsRes, PopularVideoRes] = await Promise.all([
        fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_API_KEY}`,
        ),
        fetch(`${YOUTUBE_COMMENTS_API}${videoId}&key=${YOUTUBE_API_KEY}`),
        fetch(YOUTUBE_POPULAR_VIDEO),
      ]);
      const VideoInfo = await VideoRes.json();
      const VideoComments = await VideoCommentsRes.json();
      const PopularVideo = await PopularVideoRes.json();

      //  Get all channel IDs
      const channelsID = PopularVideo?.items
        ?.map((item) => item.snippet.channelId)
        .join(",");
      //  console.log(channelsID);

      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelsID}&key=${YOUTUBE_API_KEY}`,
      );
      const data = await channelRes.json();
      // console.log(data.items);

      //  Map channelId -> image
      const channelMap = {};

      data?.items.forEach((items) => {
        channelMap[items.id] = items.snippet.thumbnails.high.url;
      });
      setChanneldata(channelMap);

      // console.log(PopularVideo.items);
      setVideoDescription(VideoInfo);
      setData(VideoComments.items);
      setPopularVideo(PopularVideo.items);
    };
    fetchData();

    return () => {
      dispatch(openMenu());
    };
  }, [videoId]);

  return (
    <div className="md:flex gap-6 p-2 w-full mx-auto">
      <div className="md:w-[70%] flex flex-col">
        <iframe
          className="w-full aspect-video rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <p className="mt-3 text-2xl font-semibold">
          {snippet?.localized?.title}
        </p>

        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <p>{statistics?.viewCount} views</p>
          <p>{statistics?.likeCount} likes</p>
          <p>{statistics?.commentCount} comments</p>
        </div>

        <div className="mt-3 text-sm text-gray-700 whitespace-pre-line wrap-break-word">
          {snippet?.description}
        </div>

        <div className="mt-6">
          {data?.map((item, index) => {
            const comment = item.snippet.topLevelComment.snippet;

            return (
              <div key={index} className="flex gap-3 mt-4">
                <img
                  src={comment.authorProfileImageUrl}
                  alt="img"
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="font-semibold text-sm">
                    {comment.authorDisplayName}
                  </p>

                  <p
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: comment.textDisplay }}
                  />

                  <p className="text-xs text-gray-500 mt-1">
                    👍 {comment.likeCount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:w-[30%] flex flex-col gap-4 pt-4">
        {chatid && <h2 className="font-semibold">Live Chat</h2>}
        {chatid && (
          <div
            className="h-80 overflow-y-scroll border rounded-xl p-2 bg-white shadow-sm "
            ref={chatRef}
          >
            {chatMessages.map((item) => (
              <div key={item.id} className="flex gap-2 items-start mb-3">
                
                <img
                  className="h-8 w-8 rounded-full"
                  src={item.authorDetails.profileImageUrl}
                  alt="profile img"
                />

              
                <div className="text-sm wrap-break-word">
                  
                  <span className="font-semibold mr-1">
                    {item.authorDetails.displayName}
                  </span>

                 
                  <span className="text-gray-800 ">
                    {item.snippet.displayMessage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {popularVideo?.map((items, index) => (
          <Link key={index} to={"/watch?v=" + items.id}>
            <Video
              info={items}
              channelImg={channeldata[items.snippet.channelId]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Watchpage;
