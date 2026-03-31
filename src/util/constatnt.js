
export const YOUTUBE_API_KEY = import.meta.env.VITE_API_KEY;

export const YOUTUBE_COMMENTS_API ="https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=";

export const YOUTUBE_VIDEO_URL="https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&chart=mostPopular&regionCode=IN&key="+ YOUTUBE_API_KEY;

export const YOTUBE_VIDEO_INFO="https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id="

export const YOUTUBE_POPULAR_VIDEO=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&key=${YOUTUBE_API_KEY}`

export const YOUTUBE_SEARCH='https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=';

// export const SEARCH_SUGGESTIONS="https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
export const SEARCH_SUGGESTIONS = "/api/search?q=";

export const YOUTUBE_LIVE_VIDEO=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&eventType=live&type=video&q=live&key=${YOUTUBE_API_KEY}`