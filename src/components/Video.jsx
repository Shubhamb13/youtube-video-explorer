const Video = ({ info, channelImg }) => {
  if (!info) return null;

  const snippet = info.snippet;
  const statistics = info.statistics || {};

  const { thumbnails, title, channelTitle } = snippet;
  // console.log(channelImg);

  return (
     <div className="w-full cursor-pointer">
      
     
      <div className="w-full aspect-video overflow-hidden rounded-xl">
        <img
          src={thumbnails?.maxres?.url || thumbnails?.high?.url}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="mt-3 flex gap-2">
        
        
        <img
          src={channelImg}
          alt="channel"
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />

       
        <div className="flex flex-col min-w-0">
          
          
          <p className="text-sm font-semibold line-clamp-2 leading-snug wrap-break-word">
            {title}
          </p>

          
          <p className="text-xs text-gray-600 mt-1">
            {channelTitle}
          </p>

        
          {statistics?.viewCount && (
            <p className="text-xs text-gray-500">
              {Number(statistics?.viewCount).toLocaleString()} views
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
