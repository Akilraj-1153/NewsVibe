import React from "react";
import { publishedDateFunc, publishedTimeFunc } from "../../Common/Date";
import NewsBanner from "../../../assets/NewsBanner.jpg";
import Loader from "../../Common/Loader";
import NewsLogo from "../../../assets/newscommonlogo.jpg";
import { MdOutlineRefresh } from "react-icons/md";
import { LinkButton } from "../../MiniComponents/MiniComponents";
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../Configuration/Atom';

function TrendingNews({ fetchedHomeTrending, loadingHomeTrending }) {
  const [isDarkTheme] = useRecoilState(isDarkMode);

  return (
    <div className="trendingblogContainer ">
      <div className="text-2xl font-semibold flex gap-4 mb-4 items-center">
        <h1 className="">Trending News</h1>
        <button onClick={() => window.location.reload()}>
          <MdOutlineRefresh size={30} />
        </button>
      </div>
      <div className=" rounded-lg">
        {loadingHomeTrending ? (
          <Loader />
        ) : fetchedHomeTrending && fetchedHomeTrending.length ? (
          <div className="mb-4 w-full flex flex-col lg:flex-row gap-4 p-4 rounded-lg border">
            <div className="flex-shrink-0 flex justify-center">
              <img
                src={fetchedHomeTrending[0].urlToImage || NewsBanner}
                className="max-w-sm w-full aspect-video rounded-lg object-cover"
                alt={fetchedHomeTrending[0].title}
                onError={(e) => {
                  e.target.src = NewsBanner;
                }}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={`https://img.logo.dev/${fetchedHomeTrending[0].source.name
                      .toLowerCase()
                      .replace(/\s+/g, "")}.com?token=pk_fopkV9gOSoW0P_nJDg6Xew`}
                    className="h-10 w-10 rounded-full border"
                    alt={`${fetchedHomeTrending[0].source.name} logo`}
                    onError={(e) => {
                      e.target.src = NewsLogo;
                    }}
                  />
                  <div className="flex flex-col md:flex-row gap-2 justify-center">
                    <h1 className="text-lg font-semibold truncate tracking-wider">
                      {fetchedHomeTrending[0].source.name}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <h1>{publishedDateFunc(fetchedHomeTrending[0].publishedAt)}</h1>
                      <span className="font-bold">&#x2022;</span>
                      <h1>{publishedTimeFunc(fetchedHomeTrending[0].publishedAt)}</h1>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {fetchedHomeTrending[0].title}
                </h3>
                <p className="mb-2">{fetchedHomeTrending[0].description}</p>
              </div>

              <div className="flex gap-2">
                <LinkButton
                  isDarkTheme={isDarkTheme}
                  link={fetchedHomeTrending[0].url}
                  ButtonName="Read From Source"
                />
              </div>
            </div>
          </div>
        ) : (
          <p>No trending news at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default TrendingNews;
