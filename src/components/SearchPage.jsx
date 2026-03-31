import { useSearchParams, Link } from "react-router-dom";
import { YOUTUBE_API_KEY, YOUTUBE_SEARCH } from "../util/constatnt";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [param] = useSearchParams();
  const query = param.get("search_query");

  const [result, setResult] = useState([]);

  useEffect(() => {
    const searchdata = async () => {
      const data = await fetch(
        `${YOUTUBE_SEARCH}${query}&key=${YOUTUBE_API_KEY}`,
      );
      const json = await data.json();
      setResult(json.items || []);
    };

    if (query) searchdata();
  }, [query]);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 px-3 sm:px-6">
  {result.map((video) => {
    const snippet = video.snippet;

    return (
      <Link
        key={video.id.videoId}
        to={"/watch?v=" + video.id.videoId}
        className="flex flex-col sm:flex-row gap-4 hover:bg-gray-100 p-3 rounded-xl transition duration-200"
      >
        {/* Thumbnail */}
        <div className="w-full sm:w-72 md:w-96 shrink-0">
          <img
            src={snippet.thumbnails.high.url}
            alt="thumbnail"
            className="rounded-xl w-full aspect-video object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-start">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
            {snippet.title}
          </h2>

          <p className="text-sm text-gray-600 mt-1 sm:mt-2">
            {snippet.channelTitle}
          </p>

          <p className="text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-3">
            {snippet.description}
          </p>
        </div>
      </Link>
    );
  })}
</div>
  );
};

export default SearchPage;
