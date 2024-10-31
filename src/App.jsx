import React, { useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import { useRecoilState } from 'recoil';
import { isDarkMode, CurrentPage } from './Components/Configuration/Atom';
import SideNavBar from './Components/SideBar/SideNavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import LatestNews from './Components/Pages/Latest News/LatestNews';
import CategoryPage from './Components/Pages/Category/CategoryPage';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkMode);
  const [page, setPage] = useRecoilState(CurrentPage);
  console.log(page)

  useEffect(() => {
    document.title = `${page} - NewsVibe` || 'NewsVibe';
  }, [page]);


  useEffect(() => {
    const storedTheme = localStorage.getItem("NewsVibeTheme");
    if (storedTheme) {
      setIsDarkTheme(JSON.parse(storedTheme));
    } else {
      setIsDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme !== null) {
      document.body.style.backgroundColor = isDarkTheme ? "#121212" : "#f9fafb";
    }
  }, [isDarkTheme]);

  if (isDarkTheme === null) {
    return null;
  }

  return (
    <div
      className={`h-screen w-screen font-mate flex flex-col transition-colors duration-500 overflow-hidden ${
        isDarkTheme ? 'bg-[#121212] text-white' : 'bg-[#f9fafb] text-black'
      }`}
    >
      <NavBar />
      <div className='flex-1 w-full flex overflow-hidden'>
        <aside className='sidebar hidden md:flex md:w-2/6 lg:w-1/4 xl:w-1/5 p-1 overflow-y-auto border-r'>
          <SideNavBar />
        </aside>
        <main className='NewsContainer h-full w-full md:w-4/6 lg:w-3/4 xl:w-4/5 overflow-y-auto'>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/Latest-News" element={<LatestNews />} />
            <Route path="/category/:categoryname" element={<CategoryPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
