import React from "react";
import NewsBanner from "../../../assets/NewsBanner.jpg";
import Loader from "../../Common/Loader";
import { publishedDateFunc, publishedTimeFunc } from "../../Common/Date";
import NewsLogo from "../../../assets/newscommonlogo.jpg";
import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LinkButton } from "../../MiniComponents/MiniComponents";
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../Configuration/Atom';

function HomeLatest({ fetchedHomeLatest, loadingHomelatest }) {
  const [isDarkTheme] = useRecoilState(isDarkMode);

  return (
    <div className="overflow-hidden">
      <div className="text-2xl font-semibold flex justify-between items-center gap-4 mb-4">
        <h2>Latest Headlines</h2>
        <Link to="/Latest-News" className="text-xl flex items-center gap-2 pr-2">
          See More <IoArrowForwardSharp />
        </Link>
      </div>
      <div className="HomeLatest rounded-lg flex w-full overflow-x-auto">
        <div className="flex px- space-x-2 mb-4">
          {loadingHomelatest ? (
            <Loader />
          ) : fetchedHomeLatest && fetchedHomeLatest.length ? (
            fetchedHomeLatest.map((article, i) =>
              article.title !== "[Removed]" ? (
                <div key={i} className="w-72 flex flex-col justify-between gap-3 p-4 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={`https://img.logo.dev/${article.source.name.toLowerCase().replace(/\s+/g, "")}.com?token=pk_fopkV9gOSoW0P_nJDg6Xew`}
                        className="h-8 w-8 rounded-full border"
                        alt="Source logo"
                        onError={(e) => {
                          e.target.src = NewsLogo;
                        }}
                      />
                      <div className="flex flex-col">
                        <h1 className="text-lg font-semibold truncate">{article.source.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <h1>{publishedDateFunc(article.publishedAt)}</h1>
                          <span className="font-bold">&#x2022;</span>
                          <h1>{publishedTimeFunc(article.publishedAt)}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex justify-center mb-2">
                      <img
                        src={article.urlToImage || NewsBanner}
                        className="h-48 w-full aspect-square rounded-lg object-cover hover:scale-105 transition-all"
                        alt="News"
                        onError={(e) => {
                          e.target.src = NewsBanner;
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <LinkButton
                      isDarkTheme={isDarkTheme}
                      link={article.url}
                      ButtonName="Read From Source"
                    />
                  </div>
                </div>
              ) : null
            )
          ) : (
            <p>No trending news at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeLatest;
