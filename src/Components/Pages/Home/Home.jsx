import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CurrentPage, isDarkMode,HomeLatestState,HomeTrending } from '../../Configuration/Atom';
import Logo from '../../../assets/Logo.png';
import Footer from './Footer';
import TrendingNews from './TrendingNews'
import HomeLatest from './HomeLatest'
import axios from 'axios'


const Home = () => {
  const [page, setPage] = useRecoilState(CurrentPage);
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkMode);
  const [fetchedHomeLatest, setFetchedHomeLatest] = useRecoilState(HomeLatestState);
  const [loadingHomeLatest, setLoadingHomeLatest] = useState(true);
  const [fetchedHomeTrending, setFetchedHomeTrending] = useRecoilState(HomeTrending);
  const [loadingHomeTrending, setLoadingHomeTrending] = useState(true);

  const fetchHomeTrending = async () => {
    if (fetchedHomeTrending && fetchedHomeTrending.length > 0) {
      setLoadingHomeTrending(false); 
      return;
    }

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/fetch_trending`);
      if (data && data.articles) {
        const validArticles = data.articles.filter(
          (article) => 
            article.title !== '[Removed]' && 
            article.content !== '[Removed]' && 
            article.description !== '[Removed]'
        );
        
        const firstValidArticle = validArticles[0] || null;
        setFetchedHomeTrending(firstValidArticle ? [firstValidArticle] : []);
      }
      setLoadingHomeTrending(false);
    } catch (error) {
      console.error("Error fetching trending news:", error);
      setLoadingHomeTrending(false);
    }
  };

  const fetchLatestNews = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/HomeLatest`);

      const filteredArticles = data.articles.filter(
        (article) => fetchedHomeTrending === null || article.title !== fetchedHomeTrending[0].title
      );
      


      setFetchedHomeLatest(filteredArticles);
      setLoadingHomeLatest(false);
    } catch (error) {
      console.error("Error fetching latest news:", error);
      setLoadingHomeLatest(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchHomeTrending(); 
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (fetchedHomeTrending) {
      fetchLatestNews();
    }
  }, [fetchedHomeTrending]);

  useEffect(() => {
    setPage("Home");
  }, [setPage]);

  return (
    <div className="h-full w-full p-2 flex flex-col gap-2">
      <header
        className={`text-center p-4 rounded-lg w-full mx-auto transition-colors duration-500 ${isDarkTheme ? 'bg-[#121212] text-white' : 'bg-[#f9fafb] text-black'}`}>
        <img className="mx-auto mb-4 max-h-28 w-auto" src={Logo} alt="NewsVibe Logo" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">NewsVibe</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Your Daily Dose of News</h2>
        <p className="text-center text-base sm:text-lg md:text-xl mt-4 max-w-4xl mx-auto">
          Welcome to <span className="font-semibold">NewsVibe</span> — your go-to source for the latest news, insights, and updates from around the world.
          Whether you're looking for breaking stories, in-depth analysis, or simply a daily roundup, we have you covered. Dive in, explore by category, and stay
          informed with NewsVibe's trusted news coverage!
        </p>
      </header>
      <main className='p-2'>
        <div>
          <TrendingNews fetchedHomeTrending={fetchedHomeTrending} loadingHomeTrending={loadingHomeTrending} />
        </div>

        <div>
          <HomeLatest fetchedHomeLatest={fetchedHomeLatest} loadingHomeLatest={loadingHomeLatest} />
        </div>
      </main>
      <footer className='pb-2'>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
