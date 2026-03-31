const LiveVideo = ({ info, channelImg }) => {
  if (!info) return null;

  const { snippet } = info;
  const videoId = info?.id?.videoId;
  //  console.log(videoId);
  return (
    // <Link to={`{watch?v=${videoId}`}>
    <div className=" cursor-pointer">
      {/* Video Thumbnail / Player */}
      <div className="w-full aspect-video overflow-hidden sm:rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Details */}
      <div className="mt-3 flex gap-3">
        {/* Channel Icon (Dummy for now) */}
        
          <img
            src={channelImg}
            alt="channel"
            className="w-10 h-10 rounded-full"
          />
       

        {/* Text Content */}
        <div>
          <p className="font-semibold text-sm line-clamp-2 break-words">{snippet?.title}</p>

          <p className="text-sm text-gray-600 mt-1">{snippet?.channelTitle}</p>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default LiveVideo;
