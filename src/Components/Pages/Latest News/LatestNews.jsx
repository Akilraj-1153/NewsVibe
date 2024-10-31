import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { publishedDateFunc, publishedTimeFunc } from "../../Common/Date";
import NewsBanner from "../../../assets/NewsBanner.jpg";
import Loader from "../../Common/Loader";
import NewsLogo from "../../../assets/newscommonlogo.jpg";
import { MdOutlineRefresh } from "react-icons/md";
// import { sampledata } from "../Data/SampleData";
import { useRecoilState } from "recoil";
import { isDarkMode, CurrentPage,LatestNewsState } from "../../Configuration/Atom";
import { LinkButton } from "../../MiniComponents/MiniComponents";

function LatestNews() {
  const [fetchedNews, setFetchedNews] = useRecoilState(LatestNewsState);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkMode);

  const [page, setPage] = useRecoilState(CurrentPage);


  const containerRef = useRef(null);

  const fetchNews = async (page) => {
    if (page > 1) {
      setLoading(false);
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/fetch_latest`,
        { pageno: page }
      );
      console.log(data);

      setFetchedNews((prev) =>
        page === 1
          ? data
          : { ...prev, articles: [...prev.articles, ...data.articles] }
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPageNo((prev) => prev + 1);
  };

  useEffect(() => {
    if (pageNo === 1 && containerRef.current) {
      console.log(containerRef.current);
      containerRef.current.scrollTop = 0;
    }

    setPage("Latest News");
    fetchNews(pageNo);
  }, [pageNo]);

  return (
    <div ref={containerRef} className="LatestBlogcontainer p-2 ">
      <div
        className={`text-2xl font-semibold flex  gap-4 mb-4 `}
      >
        <h2 className="ml-4">Latest News</h2>
        <div>
          <button className="" onClick={() => window.location.reload()}>
            <MdOutlineRefresh></MdOutlineRefresh>
          </button>
        </div>
      </div>
      <div className="md:px-4 flex flex-col gap-2 rounded-lg ">
        {loading ? (
          <Loader />
        ) : fetchedNews && fetchedNews.articles?.length ? (
          fetchedNews.articles.map((article, i) =>
            article.title !== "[Removed]" || article.content!=="[Removed]" ? (
              <div
                key={i}
                className=" w-full flex flex-col lg:flex-row gap-4 p-4 rounded-lg border "
              >
                <div className="flex-shrink-0 flex  justify-center ">
                  <img
                    src={article.urlToImage || NewsBanner}
                    className="max-w-sm min-w-96 w-full aspect-video rounded-lg object-cover "
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = NewsBanner;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={`https://img.logo.dev/${article.source.name
                        .toLowerCase()
                        .replace(
                          /\s+/g,
                          ""
                        )}.com?token=pk_fopkV9gOSoW0P_nJDg6Xew`}
                      className="h-10 w-10 rounded-full border"
                      alt={`${article.source.name} logo`}
                      onError={(e) => {
                        e.target.src = NewsLogo;
                      }}
                    />
                     <div className="flex flex-col md:flex-row gap-2  justify-center">
                      <h1 className="text-lg font-semibold truncate">
                        {article.source.name}
                      </h1>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <h1>{publishedDateFunc(article.publishedAt)}</h1>
                        <span className="font-bold">&#x2022;</span>
                        <h1>{publishedTimeFunc(article.publishedAt)}</h1>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="mb-2">{article.description}</p>
                  <div className="flex gap-2">
                    <LinkButton
                      isDarkTheme={isDarkTheme}
                      link={article.url}
                      ButtonName="Read From Source"
                    />
                  </div>
                  
                </div>
              </div>
            ) : null
          )
        ) : (
          <p>No trending news at the moment.</p>
        )}
      </div>
      {fetchedNews &&
        fetchedNews.articles.length != fetchedNews.totalResults && (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Load More
            </button>
          </div>
        )}
    </div>
  );
}

export default LatestNews;
