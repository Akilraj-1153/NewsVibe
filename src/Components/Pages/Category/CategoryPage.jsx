import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { publishedDateFunc, publishedTimeFunc } from "../../Common/Date";
import NewsBanner from "../../../assets/NewsBanner.jpg";
import Loader from "../../Common/Loader";
import NewsLogo from "../../../assets/newscommonlogo.jpg";
import { MdOutlineRefresh } from "react-icons/md";
import { useRecoilState } from "recoil";
import {
  isDarkMode,
  CurrentPage,
  LatestNewsState,
} from "../../Configuration/Atom";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../MiniComponents/MiniComponents";

function CategoryPage() {
  const [fetchedNews, setFetchedNews] = useRecoilState(LatestNewsState);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const { categoryname } = useParams();
  const containerRef = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkMode);
  const [page, setPage] = useRecoilState(CurrentPage);

  // Fetch news function
  const fetchNews = async (page) => {
    if (page > 1) {
      setLoading(false);
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/fetchnewsbycategory`, 
        { pageno: page, category: categoryname }
      );
      console.log(data);

      setFetchedNews((prev) =>
        page === 1 ? data : { ...prev, articles: [...prev.articles, ...data.articles] }
      );
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle loading more news
  const handleLoadMore = () => {
    setPageNo((prev) => prev + 1);
  };

  // Effect for fetching news on page number or category change
  useEffect(() => {
    setFetchedNews({ articles: [], totalResults: 0 }); // Clear fetched news when category changes
    setPageNo(1); // Reset page number when category changes

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    setPage(categoryname);
    fetchNews(1); // Fetch new data for the first page
  }, [categoryname]);

  // Effect for loading more news when pageNo changes
  useEffect(() => {
    if (pageNo > 1) {
      fetchNews(pageNo);
    }
  }, [pageNo]);

  return (
    <div ref={containerRef} className="LatestBlogcontainer p-2">
      <div
        className={`text-2xl font-semibold flex gap-4 mb-4  `}
      >
        <h2 className="ml-4">Latest News - {categoryname}</h2>
        <div>
          <button onClick={() => window.location.reload()}>
            <MdOutlineRefresh />
          </button>
        </div>
      </div>
      <div className="md:px-4 flex flex-col gap-2 rounded-lg">
        {loading ? (
          <Loader />
        ) : fetchedNews && fetchedNews.articles?.length ? (
          fetchedNews.articles.map((article, i) =>
            article.title !== "[Removed]" && article.content !== "[Removed]" ? (
              <div
                key={i}
                className="w-full flex flex-col lg:flex-row gap-4 p-4 rounded-lg border"
              >
                <div className="flex-shrink-0 flex justify-center">
                  <img
                    src={article.urlToImage || NewsBanner}
                    className="max-w-sm min-w-96 w-full aspect-video rounded-lg object-cover"
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
                        .replace(/\s+/g, "")}.com?token=pk_fopkV9gOSoW0P_nJDg6Xew`}
                      className="h-10 w-10 rounded-full border"
                      alt={`${article.source.name} logo`}
                      onError={(e) => {
                        e.target.src = NewsLogo;
                      }}
                    />
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
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
        fetchedNews.articles.length !== fetchedNews.totalResults && (
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

export default CategoryPage;
